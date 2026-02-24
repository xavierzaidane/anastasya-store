'use client';

import { usePathname } from 'next/navigation';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Pages that should not show the sidebar (auth pages)
const authPages = ['/admin/login', '/admin/register'];

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = authPages.some((page) => pathname.startsWith(page));

  // Auth pages render without sidebar
  if (isAuthPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  // Regular admin pages with sidebar
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header with Sidebar Trigger - Always visible */}
        <header className="sticky top-0 z-40 flex items-center gap-4 h-15 px-4 border-b bg-primary-foreground">
          <SidebarTrigger className="h-8 w-8" />
         <div className="relative flex-1 max-w-xs ">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            placeholder="Search products..."
           
            className="pl-9 h-9 rounded-full bg-white border-neutral-200 shadow-none focus-visible:ring-0 focus-visible:border-neutral-300"
          />
        </div>
        </header>
        {/* Page Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
