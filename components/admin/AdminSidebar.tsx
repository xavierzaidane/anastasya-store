'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  items?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Products',
    url: '/admin/products',
    icon: Package,
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

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === '/admin' && pathname === '/admin') return true;
    if (url !== '/admin' && pathname.startsWith(url)) return true;
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
