"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import CommandPalette, { type CommandItem } from "@/components/ui/command-palette";
import { formatRupiah } from "@/lib/storefront-products";
import { useLanguage } from "@/contexts/LanguageContext";

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
  data: {
    items: SearchProduct[];
  } | null;
}

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const { t, isID } = useLanguage();
  const router = useRouter();
  const [products, setProducts] = useState<SearchProduct[]>([]);

  // Pre-fetch initial popular/recent products when modal is opened
  useEffect(() => {
    if (!open) return;

    const controller = new AbortController();
    fetch("/api/products?limit=10", { signal: controller.signal })
      .then((res) => res.json())
      .then((payload: SearchResponse) => {
        if (payload.success && payload.data?.items) {
          setProducts(payload.data.items);
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, [open]);

  const defaultCommands: CommandItem[] = useMemo(
    () => [
      { id: "nav-discover", label: isID ? "Beranda" : "Discover Home", hint: isID ? "Halaman" : "Page", href: "/", shortcut: ["G", "H"] },
      { id: "nav-browse", label: isID ? "Jelajahi Produk" : "Browse Products", hint: isID ? "Katalog" : "Catalog", href: "/browse", shortcut: ["G", "B"] },
      { id: "nav-guide", label: isID ? "Panduan Pesan" : "Order Guide", hint: isID ? "Panduan" : "Guide", href: "/guide", shortcut: ["G", "G"] },
      { id: "nav-blog", label: isID ? "Baca Artikel" : "Read Blog", hint: isID ? "Artikel" : "Articles", href: "/blog", shortcut: ["G", "L"] },
    ],
    [isID]
  );

  const items = useMemo<CommandItem[]>(() => {
    const productItems: CommandItem[] = products.map((p) => ({
      id: `product-${p.id}`,
      label: p.name,
      hint: `${p.category?.name || (isID ? "Produk" : "Product")} · ${formatRupiah(p.price)}`,
      keywords: `${p.name} ${p.category?.name || ""}`,
      href: `/browse/${p.category?.slug || "general"}/${p.slug}`,
    }));

    return [...defaultCommands, ...productItems];
  }, [products, defaultCommands, isID]);

  const handleSelect = (item: CommandItem) => {
    onOpenChange(false);
    if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <CommandPalette
      open={open}
      items={items}
      autoFocus={open}
      placeholder={t.search.placeholder}
      emptyLabel={t.search.noResults}
      onDismiss={() => onOpenChange(false)}
      onSelect={handleSelect}
    />
  );
}
