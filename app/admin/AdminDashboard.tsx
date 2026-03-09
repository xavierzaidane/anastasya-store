"use client";

import { useEffect, useState } from 'react';
import { Package, FileText, Layers } from 'lucide-react';
import DashboardChart from '@/components/admin/DashboardChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StorefrontApiProduct } from '@/types/storefront';
import { ApiBlog } from '@/types/blog';

export default function AdminDashboard() {
  const [recentProducts, setRecentProducts] = useState<StorefrontApiProduct[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<ApiBlog[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [loading, setLoading] = useState(true);

  // Optionally, add types for API responses for better type safety
  // interface ProductsApiResponse {
  //   data: { items: StorefrontApiProduct[]; total: number };
  // }
  // interface BlogsApiResponse {
  //   data: ApiBlog[];
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productsResponse, blogsResponse, categoriesResponse] = await Promise.all([
          fetch('/api/products?limit=4'),
          fetch('/api/blogs'),
          fetch('/api/categories'),
        ]);

        const [productsData, blogsData, categoriesData] = await Promise.all([
          productsResponse.json(),
          blogsResponse.json(),
          categoriesResponse.json(),
        ]);

        const productItems = productsData.data?.items || [];
        const productTotal = productsData.data?.pagination?.total || productItems.length;
        setRecentProducts(productItems);
        setTotalProducts(productTotal);

        const blogEntries = blogsData.data || [];
        setTotalBlogs(blogEntries.length || 0);
        setRecentBlogs(blogEntries.slice(0, 4));

        const categoryEntries = categoriesData.data || [];
        setTotalCategories(categoryEntries.length || 0);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Dynamic data from API
  const stats = [
    {
      label: 'Total Products',
      value: totalProducts,
      icon: Package,
      iconColor: 'text-primary',
    },
    {
      label: 'Blog Posts',
      value: totalBlogs,
      icon: FileText,
      iconColor: 'text-primary',
    },
    {
      label: 'Categories',
      value: totalCategories,
      icon: Layers,
      iconColor: 'text-primary',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-9 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="col-span-12 sm:col-span-6 lg:col-span-3 bg-card border border-border rounded-2xl p-4"
          >
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-2xl bg-muted">
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <span className="text-xs font-medium text-muted-foreground">+2 this month</span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-semibold font-mono text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-12 gap-4">
        {/* Chart - Left Side */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-mono">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <DashboardChart />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity - Right Side */}
        <div className="col-span-12 lg:col-span-4 max-h-800 ">
          <Card>

            <CardContent>
              {loading ? (
                <div className="space-y-6">
                  {[0, 1].map((section) => (
                    <div key={`skeleton-${section}`} className="space-y-3">
                      <div className="h-4 w-32 rounded bg-muted animate-pulse" />
                      <div className="rounded-2xl border border-border/70">
                        {[0, 1, 2].map((row) => (
                          <div
                            key={`row-${section}-${row}`}
                            className="grid grid-cols-12 gap-3 px-4 py-3 border-t border-border/70 first:border-t-0"
                          >
                            <div className="col-span-8">
                              <div className="h-3.5 w-32 rounded bg-muted animate-pulse" />
                            </div>
                            <div className="col-span-4">
                              <div className="h-3.5 w-20 rounded bg-muted animate-pulse ml-auto" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium font-mono text-muted-foreground">New Products</h3>
                      <span className="text-xs text-muted-foreground">Last 4 entries</span>
                    </div>
                    <div className="rounded-2xl border border-border/70 overflow-hidden">
                      <div className="grid grid-cols-12 gap-3 px-4 py-2 bg-muted/50 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        <span className="col-span-8">Product</span>
                        <span className="col-span-4 text-right">Price</span>
                      </div>
                      <div>
                        {recentProducts.length ? (
                          recentProducts.map((product) => (
                            <div
                              key={product.id}
                              className="grid grid-cols-12 gap-3 px-4 py-3 text-sm border-t border-border/70 first:border-t-0 hover:bg-muted/40 transition-colors"
                            >
                              <div className="col-span-8 flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                                  <Package className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <span className="truncate text-foreground">{product.name}</span>
                              </div>
                              <div className="col-span-4 text-right text-sm text-muted-foreground">
                                {product.price}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-6 text-center text-sm text-muted-foreground">No products yet.</div>
                        )}
                      </div>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium font-mono text-muted-foreground">Latest Blog Posts</h3>
                      <span className="text-xs text-muted-foreground">Top 4 entries</span>
                    </div>
                    <div className="rounded-2xl border border-border/70 overflow-hidden">
                      <div className="grid grid-cols-12 gap-3 px-4 py-2 bg-muted/50 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        <span className="col-span-9">Title</span>
                        <span className="col-span-3 text-right">Read time</span>
                      </div>
                      <div>
                        {recentBlogs.length ? (
                          recentBlogs.map((blog) => (
                            <div
                              key={blog.id}
                              className="grid grid-cols-12 gap-3 px-4 py-3 text-sm border-t border-border/70 first:border-t-0 hover:bg-muted/40 transition-colors"
                            >
                              <div className="col-span-9 flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                                  <FileText className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <span className="truncate text-foreground">{blog.title}</span>
                              </div>
                              <div className="col-span-3 text-right text-sm text-muted-foreground">
                                {blog.readTime} min
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-6 text-center text-sm text-muted-foreground">No blog posts yet.</div>
                        )}
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}