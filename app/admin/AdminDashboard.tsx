"use client";

import { useEffect, useState } from 'react';
import { StorefrontApiProduct } from '@/types/storefront';
import { ApiBlog } from '@/types/blog';
import AnalyticsAreaChart from '@/components/admin/AnalyticsAreaChart';


export default function AdminDashboard() {
  const [recentProducts, setRecentProducts] = useState<StorefrontApiProduct[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<ApiBlog[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsResponse, blogsResponse, categoriesResponse] = await Promise.all([
          fetch('/api/products?limit=5'),
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
        setRecentBlogs(blogEntries.slice(0, 5));

        const categoryEntries = categoriesData.data || [];
        setTotalCategories(categoryEntries.length || 0);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    {
      label: 'Total Products',
      value: totalProducts,
      description: 'Active inventory across your product portfolio.',
    },
    {
      label: 'Blog Posts',
      value: totalBlogs,
      description: 'Published content driving customer engagement and loyalty.',
    },
    {
      label: 'Categories',
      value: totalCategories,
      description: 'Product classifications optimizing storefront navigation.',
    },
  ];

 

  return (
    <div className="min-h-screen space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
     

      <div className="grid grid-cols-12 gap-8 auto-rows-min">
        
        {/* Stats Row - High Contrast Mono Style */}
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`col-span-12 sm:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-10 transition-all duration-700 hover:border-primary/40 hover:bg-muted/30`}
          >
            <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity translate-x-4 -translate-y-4">
              <span className="text-9xl font-black tracking-tighter text-primary select-none font-mono">0{index + 1}</span>
            </div>
            
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-bold font-mono uppercase tracking-tighter text-foreground mt-1 mb-6">
                  {stat.label}
                </h3>
              </div>
              
              <div className="mt-auto">
                <div className="flex items-baseline gap-2">
                  <p className="text-7xl font-semibold tracking-[-0.08em] text-foreground font-mono leading-none">
                    {loading ? (
                      <span className="inline-block w-24 h-16 bg-muted/50 rounded-2xl animate-pulse" />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <span className="text-xl text-primary/30 font-black font-mono tracking-tighter shrink-0 mb-2 underline decoration-primary/20">UNIT</span>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-4">
                  <p className="text-[9px] font-bold text-muted-foreground/50 leading-relaxed uppercase tracking-[0.2em] max-w-[160px] font-mono">
                    {stat.description}
                  </p>
                  <div className="w-8 h-8 rounded-full border border-border/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                    <span className="text-sm">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Analytics Chart - The Primary Metric */}
        <div className="col-span-12 lg:col-span-8 rounded-[2.5rem] border border-border/60 bg-card p-2 transition-all duration-700 hover:border-primary/20">
          <div className="p-10 pb-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                  <h2 className="text-3xl font-semibold tracking-tighter text-foreground  font-mono leading-none">Analytics Overview</h2>
                </div>
                <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em] font-mono ml-4">Transactional volatility & user flow</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] font-mono font-black text-foreground tracking-tighter">DATASET_V2</span>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 pt-0 min-h-28 overflow-hidden rounded-b-[2.5rem]">
            <AnalyticsAreaChart />
          </div>
        </div>

        {/* New Grid Element: Quick Action Intelligence */}
        <div className="col-span-12 lg:col-span-4 rounded-[2.5rem] border border-border/60 bg-card p-10 flex flex-col justify-between transition-all duration-700 hover:border-primary/20 group">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60 font-mono block mb-2 underline decoration-primary/20 underline-offset-8">INTELLIGENCE</span>
            <h2 className="text-3xl font-semibold tracking-tighter text-foreground  font-mono leading-tight mt-6">
              SYSTEM<br/>TERMINAL
            </h2>
            <div className="mt-8 space-y-3">
              {[
                { label: 'Cloud Distribution', val: '98%', color: 'bg-emerald-500' },
                { label: 'Server Load', val: '12ms', color: 'bg-primary' },
                { label: 'Uptime Protocol', val: 'STABLE', color: 'bg-sky-500' }
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-2xl bg-muted/30 border border-border/20 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-foreground font-mono">{item.val}</span>
                    <div className={`w-1 h-3 ${item.color} rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="mt-10 w-full py-6 bg-primary text-background rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] font-mono hover:bg-primary hover:text-black transition-all shadow-2xl shadow-black/10 active:scale-95">
            INITIATE_PROCEDURE
          </button>
        </div>

      </div>
    </div>
  );
}