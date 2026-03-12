'use client';

import { usePathname } from 'next/navigation';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { AdminSidebar, AdminHeader, AdminThemeProvider } from '@/components/admin';

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
    return (
      <AdminThemeProvider>
        <div className="min-h-screen bg-background">{children}</div>
        <Toaster position="bottom-right" richColors/>
      </AdminThemeProvider>
    );
  }

  // Regular admin pages with sidebar
  return (
    <AdminThemeProvider>
      <SidebarProvider>
        <AdminSidebar />
        <main className="flex-1 flex flex-col min-h-screen">
          <AdminHeader />
          {/* Page Content */}
          <div className="flex-1 p-6">
            {children}
          </div>
        </main>
      </SidebarProvider>
      <Toaster position="bottom-right" richColors />
    </AdminThemeProvider>
  );
}
