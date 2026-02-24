'use client';

import { Bell, Search } from 'lucide-react';

interface AdminHeaderProps {
  title?: string;
  description?: string;
}

export default function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left: Title & Description */}
        <div>
          {title && (
            <h1 className="text-xl font-semibold text-white">{title}</h1>
          )}
          {description && (
            <p className="text-sm text-zinc-500">{description}</p>
          )}
        </div>

        {/* Right: Search & Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full"></span>
          </button>

          {/* View Store */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            View Store
          </a>
        </div>
      </div>
    </header>
  );
}
