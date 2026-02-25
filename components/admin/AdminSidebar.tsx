'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, ExternalLink } from 'lucide-react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  Settings,
  ChevronRight,
  MoreVertical,
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
    items: [
      {
        title: 'All Products',
        url: '/admin/products',
        icon: Package,
      },
      {
        title: 'Categories',
        url: '/admin/products/categories',
        icon: Package,
      },
    ],
  },
  {
    title: 'Blog',
    url: '/admin/blog',
    icon: FileText,
  },
  {
    title: 'Users',
    url: '/admin/users',
    icon: Users,
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings,
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

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Sidebar className="border-r  ">
      <SidebarHeader className="px-4 py-5 border-b h-15 ">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-base font-semibold text-neutral-900 tracking-tight">Anastasya</span>
            <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">Admin</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <div className="mb-2 px-3">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Menu</span>
        </div>
        <SidebarMenu className="space-y-1">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.url}>
              {item.items ? (
                <details className="group" open={isParentActive(item)}>
                  <summary className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
                    isParentActive(item) 
                      ? 'bg-neutral-100 text-neutral-900' 
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}>
                    <item.icon className="h-4.5 w-4.5" />
                    <span className="flex-1 text-sm font-medium">{item.title}</span>
                    <ChevronRight className="h-4 w-4 text-neutral-400 transition-transform duration-200 group-open:rotate-90" />
                  </summary>
                  <SidebarMenuSub className="mt-1 ml-4 border-l border-neutral-200 pl-3 space-y-0.5">
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.url}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive(subItem.url)}
                          className={`rounded-md px-3 py-2 text-sm transition-all duration-200 ${
                            isActive(subItem.url)
                              ? 'bg-neutral-900 text-white font-medium'
                              : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
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
                      ? 'bg-neutral-900 text-white font-medium shadow-sm'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
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

      <SidebarFooter className="p-3 border-t ">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full rounded-lg px-3 py-2.5 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                      A
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-neutral-900">Admin</span>
                      <span className="text-[11px] text-neutral-400">admin@anastasya.com</span>
                    </div>
                  </div>
                  <MoreVertical className="h-4 w-4 text-neutral-400" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56 rounded-xl shadow-lg border border-neutral-200 bg-white">
                <div className="px-3 py-2 border-b border-neutral-100">
                  <p className="text-sm font-medium text-neutral-900">Admin User</p>
                  <p className="text-xs text-neutral-500">admin@anastasya.com</p>
                </div>
                <div className="p-1">
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link href="/admin/settings" className="flex items-center gap-2 text-neutral-700">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-neutral-700">
                      <ExternalLink className="h-4 w-4" />
                      View Store
                    </a>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className="bg-neutral-100" />
                <div className="p-1">
                  <DropdownMenuItem onClick={handleLogout} className="rounded-lg cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
