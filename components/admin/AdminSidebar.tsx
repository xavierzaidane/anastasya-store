'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  ChevronRight,
} from 'lucide-react';
import { Category } from '@/types/api';

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  items?: NavItem[];
}

export function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const res = await response.json();
          if (res.success && Array.isArray(res.data)) {
            setCategories(res.data);
          }
        }
      } catch (err) {
        console.error('Error fetching categories in sidebar:', err);
      }
    }
    fetchCategories();
  }, []);

  const navItems = useMemo<NavItem[]>(() => {
    const productsSubmenu: NavItem[] = [
      {
        title: 'All Products',
        url: '/admin/products',
        icon: Package,
      },
      ...categories.map((cat) => ({
        title: cat.name,
        url: `/admin/products?category=${cat.id}`,
        icon: Package,
      })),
    ];

    return [
      {
        title: 'Dashboard',
        url: '/admin',
        icon: LayoutDashboard,
      },
      {
        title: 'Products',
        url: '/admin/products',
        icon: Package,
        items: productsSubmenu,
      },
      {
        title: 'Blog',
        url: '/admin/blog',
        icon: FileText,
      },
      {
        title: 'Categories',
        url: '/admin/categories',
        icon: Users,
      },
    ];
  }, [categories]);

  const isActive = (url: string) => {
    const urlObj = new URL(url, 'http://localhost');
    const targetPathname = urlObj.pathname;

    if (targetPathname === '/admin') {
      return pathname === '/admin';
    }

    if (pathname.startsWith(targetPathname)) {
      const categoryParam = urlObj.searchParams.get('category');
      const currentCategoryParam = searchParams.get('category');

      if (categoryParam) {
        return categoryParam === currentCategoryParam;
      }

      if (targetPathname === '/admin/products' && currentCategoryParam) {
        return false;
      }

      return true;
    }
    return false;
  };

  const isParentActive = (item: NavItem) => {
    if (item.items) {
      return item.items.some((sub) => isActive(sub.url));
    }
    return isActive(item.url);
  };

  return (
    <Sidebar className="border-r  ">
      <SidebarHeader className="px-4 py-5 border-b h-15 ">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-base font-bold font-mono text-foreground tracking-tight">Anastasya Inc.</span> 
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <div className="mb-2 px-3">
          <span className="text-[11px] font-semibold font-mono text-muted-foreground uppercase tracking-wider">Menu</span>
        </div>
        <SidebarMenu className="space-y-1">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.url}>
              {item.items ? (
                <details className="group" open={isParentActive(item)}>
                  <summary className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
                    isParentActive(item) 
                      ? 'bg-muted text-foreground' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}>
                    <item.icon className="h-4.5 w-4.5" />
                    <span className="flex-1 text-sm font-medium">{item.title}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-open:rotate-90" />
                  </summary>
                  <SidebarMenuSub className="mt-1 ml-4 border-l border-border pl-3 space-y-0.5">
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.url}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive(subItem.url)}
                          className={`rounded-md px-3 py-2 text-sm transition-all duration-200 ${
                            isActive(subItem.url)
                              ? 'bg-primary text-primary-foreground font-medium'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                        >
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </details>
              ) : (
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.url)}
                  className={`rounded-lg px-3 py-2.5 transition-all duration-200 ${
                    isActive(item.url)
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <item.icon className="h-4.5 w-4.5" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t">
        <div className="px-3 py-2 text-center">
          <span className="text-xs text-muted-foreground">© 2026 Anastasya Bouquet</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

