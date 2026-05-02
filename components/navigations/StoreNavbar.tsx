"use client";
import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Handbag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSavedItems } from '@/hooks/use-saved-items';
import { SavedItemsSheet } from '../products/SavedItemsSheet';

export default function StoreNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { getTotalItems } = useSavedItems();
  const [savedItemsSheetOpen, setSavedItemsSheetOpen] = useState(false);
  const totalItems = getTotalItems();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path) && !pathname.startsWith('/admin')) return true;
    return false;
  };

  const navLinks = [
    { name: 'Discover', href: '/' },
    { name: 'Browse', href: '/browse' },
    { name: 'Search', href: '/search' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b h-20 flex items-center">
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="p-1.5 rounded-full text-black group-hover:bg-brand-lime group-hover:text-black transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M12 7.5V16.5M15.8971 9.75L8.10289 14.25M15.897 14.25L8.10275 9.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.47867 6.76926C2.20958 10.8137 1.22078 16.4342 4.27013 19.323C6.87609 21.7918 11.5879 21.4667 15.5675 18.7956L20 20.5L18.0841 16.6688C21.8721 12.6801 22.6403 7.43426 19.7299 4.67697C16.6805 1.78811 10.7478 2.72486 6.47867 6.76926Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-lime after:transition-all hover:after:w-full ${
                  isActive(link.href)
                    ? 'text-neutral-900 after:w-full'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => setSavedItemsSheetOpen(true)}
              className="relative p-2.5 text-neutral-600 hover:text-neutral-900 transition-colors rounded-lg hover:bg-neutral-100" 
              aria-label="Saved items"
            >
              <Handbag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center px-1 text-xs font-semibold rounded-full text-white bg-neutral-900">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-neutral-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-20 left-0 right-0 bg-white border-b border-neutral-100 overflow-hidden shadow-xl z-40"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-lg font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-neutral-900'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-neutral-100" />
              <button 
                onClick={() => {
                  setSavedItemsSheetOpen(true);
                  setIsOpen(false);
                }}
                className="w-full py-3 font-semibold rounded-lg flex justify-center items-center gap-2 text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors"
              >
                <Handbag className="w-5 h-5" />
                Saved Items {totalItems > 0 && `(${totalItems > 99 ? '99+' : totalItems})`}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SavedItemsSheet 
        open={savedItemsSheetOpen} 
        onOpenChange={setSavedItemsSheetOpen} 
      />
    </>
  );
}
