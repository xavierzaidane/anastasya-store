'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products, Product } from '@/data/products';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  ArrowUpDown,
} from 'lucide-react';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [sortField, setSortField] = useState<keyof Product | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(sortedProducts.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: number, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'small':
        return 'secondary';
      case 'medium':
        return 'default';
      case 'large':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold font-mono text-neutral-900">Products</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage your flower bouquet inventory
          </p>
        </div>
        <Button asChild className="gap-2 rounded-xl">
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50 hover:bg-neutral-50">
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedProducts.length === sortedProducts.length &&
                    sortedProducts.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-20">Image</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 hover:text-neutral-900"
                >
                  Product
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>
              <TableHead>             
                  Items    
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center gap-1 hover:text-neutral-900"
                >
                  Category
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center gap-1 hover:text-neutral-900"
                >
                  Price
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>

              <TableHead className="text-center pr-4">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <p className="text-neutral-500">No products found</p>
                </TableCell>
              </TableRow>
            ) : (
              sortedProducts.map((product) => (
                <TableRow
                  key={product.id}
                  className={
                    selectedProducts.includes(product.id)
                      ? 'bg-neutral-50'
                      : ''
                  }
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={(checked) =>
                        handleSelectProduct(product.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-100">
                      <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-neutral-900">
                        {product.name}
                      </span>
                      <span className="text-xs text-neutral-500 truncate max-w-50">
                        {product.description}
                      </span>
                    </div>
                  </TableCell>
                     <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs text-neutral-500 truncate max-w-50">
                        {product.items}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getCategoryBadgeVariant(product.category)}>
                      {product.category.charAt(0).toUpperCase() +
                        product.category.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-neutral-900">
                      {product.price}
                    </span>
                  </TableCell>

                  <TableCell className="text-center pr-1">
                    <div className="inline-flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-4 text-xs rounded-full shadow-none"
                        asChild
                      >
                        <Link
                          href={`/catalog/${product.category}/${product.slug}`}
                          target="_blank"
                        >
                          View
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-4 text-xs rounded-full shadow-none"
                        asChild
                      >
                        <Link href={`/admin/products/${product.slug}/edit`}>
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-4 text-xs rounded-full shadow-none text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Table Footer / Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200 bg-neutral-50">
          <p className="text-sm text-neutral-500">
            Showing <span className="font-medium">{sortedProducts.length}</span> of{' '}
            <span className="font-medium">{products.length}</span> products
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
