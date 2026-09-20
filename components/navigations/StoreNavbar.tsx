"use client";
import React, { useEffect, useState } from 'react';
import { Handbag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSavedItems } from '@/hooks/use-saved-items';
import { CurvedNavbar, type iNavItem } from '@/components/ui/curved-menu';
import { SavedItemsSheet } from '../products/SavedItemsSheet';
import SearchModal from '../products/SearchModal';

const storeNavItems: iNavItem[] = [
  { heading: "Discover", href: "/" },
  { heading: "Browse", href: "/browse" },
  { heading: "Guide", href: "/guide" },
  { heading: "Blog", href: "/blog" },
];

export default function StoreNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { getTotalItems } = useSavedItems();
  const [savedItemsSheetOpen, setSavedItemsSheetOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const totalItems = getTotalItems();
  const isTypingTarget = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false;
    return (
      target.tagName.toLowerCase() === 'input' ||
      target.tagName.toLowerCase() === 'textarea' ||
      target.isContentEditable
    );
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setSearchModalOpen(true);
        return;
      }

      if (event.key === '/' && !isTypingTarget(event.target)) {
        event.preventDefault();
        setSearchModalOpen(true);
        return;
      }

      if (event.key === 'Escape') {
        setSearchModalOpen(false);
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path) && !pathname.startsWith('/admin')) return true;
    return false;
  };

  const navLinks = [
    { name: 'Discover', href: '/' },
    { name: 'Browse', href: '/browse' },
    { name: 'Guide', href: '/guide' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-30 bg-background h-20 flex items-center">
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
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="text-sm font-medium transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-lime after:transition-all hover:after:w-full text-neutral-500 hover:text-black flex items-center gap-2"
            >
              Search
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-neutral-200 bg-neutral-100 text-neutral-500 ml-2">
                ⌘ K
              </kbd>
            </button>
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

          {/* Mobile Right Controls (when at top of page) */}
          <div className="flex md:hidden items-center gap-1 z-40">
            <button 
              onClick={() => setSavedItemsSheetOpen(true)}
              className="relative p-2 text-neutral-600 hover:text-neutral-900 transition-colors rounded-lg" 
              aria-label="Saved items"
            >
              <Handbag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 min-w-4 h-4 flex items-center justify-center px-1 text-[10px] font-semibold rounded-full text-white bg-neutral-900">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* Hamburger Button inside top navbar (hidden when floating trigger is active) */}
            {!isScrolled && !isOpen && (
              <button 
                className="p-2 text-black cursor-pointer focus:outline-none"
                onClick={() => setIsOpen(true)}
                aria-label="Open navigation menu"
              >
                <div className="relative w-6 h-4.5 flex flex-col justify-between items-center">
                  <span className="block h-0.5 w-6 bg-black" />
                  <span className="block h-0.5 w-6 bg-black" />
                  <span className="block h-0.5 w-6 bg-black" />
                </div>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Floating Sidebar Trigger (Appears when scrolled down on desktop & mobile, or when menu is open) */}
      <AnimatePresence>
        {(isScrolled || isOpen) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setIsOpen(!isOpen)}
            className="fixed top-4 right-4 md:top-5 md:right-8 z-[60] w-12 h-12 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <div className="relative w-6 h-4.5 flex flex-col justify-between items-center">
              <span
                className={`block h-0.5 w-5 bg-neutral-900 dark:bg-white transition-transform duration-300 ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-neutral-900 dark:bg-white transition-opacity duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-neutral-900 dark:bg-white transition-transform duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Curved Menu Overlay (Works on both desktop & mobile) */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
            />
            {/* Curved Navbar Slide-over */}
            <CurvedNavbar
              setIsActive={setIsOpen}
              navItems={storeNavItems}
            />
          </>
        )}
      </AnimatePresence>

      <SearchModal open={searchModalOpen} onOpenChange={setSearchModalOpen} />

      <SavedItemsSheet 
        open={savedItemsSheetOpen} 
        onOpenChange={setSavedItemsSheetOpen} 
      />
    </>
  );
}
