'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Product, ApiResponse, PaginatedData, Category } from '@/types/api';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUpDown, Loader2 } from 'lucide-react';
import CreateProductDialog from '@/components/admin/products/CreateProductDialog';
import ViewProductDialog from '@/components/admin/products/ViewProductDialog';
import EditProductDialog from '@/components/admin/products/EditProductDialog';
import DeleteProductDialog from '@/components/admin/products/DeleteProductDialog';


export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [sortField, setSortField] = useState<keyof Product | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchCategories = useCallback(async () => {
    try {
      setIsCategoriesLoading(true);
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const result: ApiResponse<Category[]> = await response.json();
      setCategories(result.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setIsCategoriesLoading(false);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Find category slug if selectedCategory is set
      let categorySlug = '';
      if (selectedCategory) {
        const category = categories.find(c => c.id.toString() === selectedCategory);
        categorySlug = category?.slug || '';
      }

      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchQuery && { search: searchQuery }),
        ...(categorySlug && { category: categorySlug }),
      });
      
      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const result: ApiResponse<PaginatedData<Product>> = await response.json();
      setProducts(result.data.items);
      setTotalPages(result.data.totalPages);
      setTotal(result.data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [page, searchQuery, selectedCategory, categories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleProductCreated = () => {
    fetchProducts();
  };

  const handleProductUpdated = () => {
    fetchProducts();
  };

  const handleProductDeleted = () => {
    fetchProducts();
  };

  // Filter products based on search query (client-side filtering for sorting)
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  const getCategoryBadgeVariant = (categoryId: number) => {
    const variants: Array<'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'> = [
      'default',
      'secondary',
      'destructive',
      'outline',
      'ghost',
      'link',
    ];
    return variants[categoryId % variants.length];
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold font-mono text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your flower bouquet inventory
          </p>
        </div>
        <CreateProductDialog onProductCreated={handleProductCreated} />
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-foreground">Filter by Category:</label>
        <Select value={selectedCategory} onValueChange={(value) => {
          setSelectedCategory(value === 'all' ? '' : value);
          setPage(1);
        }}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
          <p className="text-destructive">{error}</p>
          <Button variant="outline" size="sm" onClick={fetchProducts} className="mt-2">
            Try Again
          </Button>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
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
                  className="flex items-center gap-1 hover:text-foreground"
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
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  Category
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  Price
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </TableHead>

              <TableHead className="text-center pr-4">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    <span className="text-muted-foreground">Loading products...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : sortedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <p className="text-muted-foreground">No products found</p>
                </TableCell>
              </TableRow>
            ) : (
              sortedProducts.map((product) => (
                <TableRow
                  key={product.id}
                  className={
                    selectedProducts.includes(product.id)
                      ? 'bg-muted'
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
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          No img
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {product.name}
                      </span>
                      <span className="text-xs text-muted-foreground truncate max-w-50">
                        {product.description}
                      </span>
                    </div>
                  </TableCell>
                     <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground truncate max-w-50">
                        {product.items?.length > 0 ? `${product.items.length} items` : 'No items'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getCategoryBadgeVariant(product.category?.id || 0)}>
                      {product.category?.name || 'Uncategorized'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-light font-mono text-foreground">
                      {formatPrice(product.price)}
                    </span>
                  </TableCell>

                  <TableCell className="text-center pr-1">
                    <div className="inline-flex items-center gap-3">
                      <ViewProductDialog product={product}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-4 text-xs rounded-full shadow-none"
                        >
                          View
                        </Button>
                      </ViewProductDialog>
                      <EditProductDialog product={product} onProductUpdated={handleProductUpdated}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-4 text-xs rounded-full shadow-none"
                        >
                          Edit
                        </Button>
                      </EditProductDialog>
                      <DeleteProductDialog product={product} onProductDeleted={handleProductDeleted}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-4 text-xs rounded-full shadow-none bg-destructive text-primary-foreground dark:text-destructive hover:text-destructive-foreground hover:bg-destructive-50 border"
                        >
                          Delete
                        </Button>
                      </DeleteProductDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Table Footer / Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-muted">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{sortedProducts.length}</span> of{' '}
            <span className="font-medium">{total}</span> products
          </p>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={page <= 1 || isLoading}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={page >= totalPages || isLoading}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
