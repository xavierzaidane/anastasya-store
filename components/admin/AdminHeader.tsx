'use client';

import { Search, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ModeToggle from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 flex items-center gap-4 h-15 px-4 border-b bg-sidebar">
      <SidebarTrigger className="h-8 w-8" />
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="pl-9 h-9 rounded-full bg-primary-foreground dark:bg-muted border shadow-none focus-visible:ring-0"
        />
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <Button variant="ghost" size="sm" asChild className="gap-2 text-xs">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3.5 w-3.5" />
            View Store
          </a>
        </Button>
        <ModeToggle />
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'h-8 w-8',
            },
          }}
        />
      </div>
    </header>
  );
}
