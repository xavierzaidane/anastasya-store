"use client";
import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <footer className=" border-t border-zinc-200/80 mt-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="flex flex-col">
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

            {/* Newsletter Subscription */}
            <div className="mb-6 w-full max-w-md">
              <form onSubmit={handleSubscribe} className="flex gap-0 rounded-full border border-zinc-200 bg-white p-1">
                <input
                  placeholder="name@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-full text-zinc-900 placeholder-zinc-500 focus:outline-none text-sm bg-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-colors duration-200 text-sm font-medium whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-zinc-500 mt-1 text-center">
                Subscribe to get notified about new products and discounts.
              </p>
            </div>

            <p className="text-sm text-zinc-600 mb-auto">
              I built this because I was inspired by UI designs I've seen on the internet, with some of my own tweaks and creativity. This page currently serves no purpose other than an experiment.
            </p>
            <p className="text-sm text-zinc-500 mt-auto pt-8">© 2025 Curated Supply. All rights reserved.</p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            {/* Navigation, About, Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-medium text-zinc-600 mb-4 tracking-tight">Navigation</h3>
                <ul className="space-y-1">
                  <li><a href="/discover" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Discover</a></li>
                  <li><a href="/lists" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Lists</a></li>
                  <li><a href="/brands" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Brands</a></li>
                  <li><a href="/categories" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Categories</a></li>
                  <li><a href="/index" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Index</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-zinc-600 mb-4 tracking-tight">About</h3>
                <ul className="space-y-1">
                  <li><a href="/info" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Info</a></li>
                  <li><a href="/blog" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Blog</a></li>
                  <li><a href="/legal" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Legal</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-zinc-600 mb-4 tracking-tight">Contact</h3>
                <ul className="space-y-1">
                  <li><a href="https://twitter.com/mantha_dev" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Twitter</a></li>
                  <li><a href="mailto:" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Email</a></li>
                </ul>
              </div>
            </div>

            {/* Categories, Brands, Lists */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-auto">
              <div>
                <h3 className="font-medium text-zinc-600 mb-4 tracking-tight">Categories</h3>
                <ul className="space-y-1">
                  <li><a href="/categories/tech" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Tech</a></li>
                  <li><a href="/categories/home" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Home</a></li>
                  <li><a href="/categories/workspace" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Workspace</a></li>
                  <li><a href="/categories/carry" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Carry</a></li>
                  <li><a href="/categories/lifestyle" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Lifestyle</a></li>
                  <li><a href="/categories/personal" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Personal</a></li>
                  <li><a href="/categories/books" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Books</a></li>
                  <li><a href="/categories/travel" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Travel</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-zinc-600 mb-4 tracking-tight">Brands</h3>
                <ul className="space-y-1">
                  <li><a href="/brands/apple" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Apple</a></li>
                  <li><a href="/brands/nomad" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Nomad</a></li>
                  <li><a href="/brands/grovemade" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Grovemade</a></li>
                  <li><a href="/brands/dyson" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Dyson</a></li>
                  <li><a href="/brands/herman-miller" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Herman Miller</a></li>
                  <li><a href="/brands/ferrari" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Ferrari</a></li>
                  <li><a href="/brands/omega" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Omega</a></li>
                  <li><a href="/brands/rolex" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Rolex</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-zinc-600 mb-4 tracking-tight">Lists</h3>
                <ul className="space-y-1">
                  <li><a href="/lists/brutalist-picks" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Brutalist Picks</a></li>
                  <li><a href="/lists/cult-of-coffee" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Cult of Coffee</a></li>
                  <li><a href="/lists/for-your-coffee-table" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">For Your Coffee Table</a></li>
                  <li><a href="/lists/minimalist-objects" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Minimalist Objects</a></li>
                  <li><a href="/lists/audiophile-core" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Audiophile Core</a></li>
                  <li><a href="/lists/home-office-goals" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Home Office Goals</a></li>
                  <li><a href="/lists/black-only" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Black Only</a></li>
                  <li><a href="/lists/deskworthy" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Deskworthy</a></li>
                </ul>
              </div>
            </div>

            {/* Creator Info */}
            <div className="flex items-center gap-1.5 text-sm text-zinc-500 mt-auto pt-8 justify-center md:justify-end">
              <span>Made by</span>
              <a
                href="https://mantha.vercel.app/"
                className="hover:text-zinc-900 transition-colors duration-200 font-medium tracking-tight"
                target="_blank"
                rel="noopener noreferrer"
              >
                @xavierzdn
              </a>
             
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}