"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, Loader2, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatRupiah } from '@/lib/storefront-products';

interface SearchProduct {
  id: number;
  slug: string;
  name: string;
  price: number | string;
  category?: {
    slug: string;
    name: string;
  } | null;
}

interface SearchResponse {
  success: boolean;
  message: string;
  data: {
    items: SearchProduct[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    } | null;
  } | null;
}

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!open) {
      abortRef.current?.abort();
      setQuery('');
      setDebouncedQuery('');
      setResults([]);
      setError(null);
      setHasSearched(false);
      setIsLoading(false);
      return;
    }

    const id = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (!debouncedQuery) {
      setResults([]);
      setHasSearched(false);
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    setIsLoading(true);
    setHasSearched(true);
    setError(null);

    const searchProducts = async () => {
      try {
        const response = await fetch(
          `/api/products?search=${encodeURIComponent(debouncedQuery)}&limit=8`,
          {
            method: 'GET',
            cache: 'no-store',
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to search products (${response.status})`);
        }

        const payload: SearchResponse = await response.json();
        if (!payload.success || !payload.data) {
          throw new Error(payload.message || 'Unable to search products');
        }

        setResults(payload.data.items || []);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === 'AbortError') {
          return;
        }
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to search products');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchProducts();

    return () => {
      controller.abort();
    };
  }, [debouncedQuery, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Search products</DialogTitle>
          <DialogDescription>
            Search by product name or category.
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type a product name or category..."
            className="w-full h-11 pl-10 pr-11 rounded-lg border bg-transparent text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
        </div>

        <div className="max-h-96 overflow-y-auto border rounded-lg divide-y">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Searching…
            </div>
          ) : error ? (
            <p className="p-4 text-sm text-red-600">{error}</p>
          ) : hasSearched && results.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">
              No products found for "{debouncedQuery}".
            </p>
          ) : !hasSearched ? (
            <p className="p-4 text-sm text-muted-foreground">
              Start typing to search by product name or category.
            </p>
          ) : (
            results.map((product) => (
              <Link
                key={product.id}
                href={`/browse/${product.category?.slug || 'general'}/${product.slug}`}
                onClick={() => onOpenChange(false)}
                className="flex items-center justify-between py-3 px-3 text-sm hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.category?.name || 'General'}
                  </p>
                </div>
                <p className="text-sm font-medium whitespace-nowrap">
                  {formatRupiah(product.price)}
                </p>
              </Link>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
