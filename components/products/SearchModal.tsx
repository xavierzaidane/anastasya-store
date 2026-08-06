"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import CommandPalette, { type CommandItem } from "@/components/ui/command-palette";
import { formatRupiah } from "@/lib/storefront-products";

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

const DEFAULT_COMMANDS: CommandItem[] = [
  { id: "nav-discover", label: "Discover Home", hint: "Page", href: "/", shortcut: ["G", "H"] },
  { id: "nav-browse", label: "Browse Products", hint: "Catalog", href: "/browse", shortcut: ["G", "B"] },
  { id: "nav-blog", label: "Read Blog", hint: "Articles", href: "/blog", shortcut: ["G", "L"] },
];

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
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

  const items = useMemo<CommandItem[]>(() => {
    const productItems: CommandItem[] = products.map((p) => ({
      id: `product-${p.id}`,
      label: p.name,
      hint: `${p.category?.name || "Product"} · ${formatRupiah(p.price)}`,
      keywords: `${p.name} ${p.category?.name || ""}`,
      href: `/browse/${p.category?.slug || "general"}/${p.slug}`,
    }));

    return [...DEFAULT_COMMANDS, ...productItems];
  }, [products]);

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
      placeholder="Search products or navigate store..."
      emptyLabel="No products or commands found"
      onDismiss={() => onOpenChange(false)}
      onSelect={handleSelect}
    />
  );
}
