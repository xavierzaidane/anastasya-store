"use client";
import { useState } from "react";
import {SearchIcon, Handbag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSavedItems } from "@/hooks/use-saved-items";
import { SavedItemsSheet } from "../products/SavedItemsSheet";

export default function StoreNavbar() {
  const pathname = usePathname();
  const { getTotalItems, savedItems } = useSavedItems();
  const [savedItemsSheetOpen, setSavedItemsSheetOpen] = useState(false);
  const totalItems = getTotalItems();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path) && !pathname.startsWith('/admin')) return true;
    return false;
  };

  const navItems = [
    { href: '/', label: 'Discover' },
    { href: '/catalog', label: 'Browse' }, 
    { href: '/blog', label: 'Blog' },

  ];

  return (
    <nav className="w-full absolute top-0 z-50 py-4 sm:py-6">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="p-2 rounded-full hover:bg-zinc-100 transition-colors duration-200">
                <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              color="currentColor"
              className="text-zinc-900 mb-6"
            >
              <path
                d="M12 7.5V16.5M15.8971 9.75L8.10289 14.25M15.897 14.25L8.10275 9.75"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d="M6.47867 6.76926C2.20958 10.8137 1.22078 16.4342 4.27013 19.323C6.87609 21.7918 11.5879 21.4667 15.5675 18.7956L20 20.5L18.0841 16.6688C21.8721 12.6801 22.6403 7.43426 19.7299 4.67697C16.6805 1.78811 10.7478 2.72486 6.47867 6.76926Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
            </Link>
          </div>

          <div className="shrink-0">
            <div className="flex items-center bg-white border border-zinc-200/80 rounded-full p-1 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-zinc-100 text-zinc-900'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-end gap-1 sm:gap-2">
            <button className="p-2 rounded-full  transition-colors duration-200" aria-label="Search">
              <SearchIcon className="w-5 h-5 text-zinc-500" />
            </button>
            
            <button 
              onClick={() => setSavedItemsSheetOpen(true)}
              className="relative p-2 rounded-full hover:bg-zinc-100 transition-colors duration-200" 
              aria-label="Saved items"
            >
              <Handbag className="w-5 h-5 text-zinc-500" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 flex items-center justify-center px-1 text-[10px] font-semibold text-white bg-zinc-900 rounded-full">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <SavedItemsSheet 
        open={savedItemsSheetOpen} 
        onOpenChange={setSavedItemsSheetOpen} 
      />
    </nav>
  );
}
