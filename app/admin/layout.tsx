'use client';

import { Suspense } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { AdminSidebar, AdminHeader, AdminThemeProvider } from '@/components/admin';

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminThemeProvider>
      <SidebarProvider>
        <Suspense fallback={<div className="w-[260px] border-r bg-background shrink-0" />}>
          <AdminSidebar />
        </Suspense>
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
