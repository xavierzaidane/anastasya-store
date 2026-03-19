"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <footer className="relative min-h-screen overflow-hidden border-t">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/cover footer.png')" }}
      />
      

      
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 h-full">
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

            <div className="mb-6 w-full max-w-md">
              <form onSubmit={handleSubscribe} className="flex gap-0 rounded-full border border-zinc-300 bg-zinc-50 backdrop-blur-sm p-1">
                <input
                  placeholder="name@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-full text-zinc-900 placeholder-zinc-400 focus:outline-none text-sm bg-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-colors duration-200 text-sm font-medium whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-zinc-600 mt-1 text-center">
                Subscribe to get notified about new products and discounts.
              </p>
            </div>

            <p className="text-sm text-zinc-700 mb-auto">
              We craft beautiful floral arrangements for every occasion. From intimate moments to grand celebrations, our fresh flowers and expert designs bring joy and elegance to your special days.
            </p>
            <p className="text-sm text-zinc-600 mt-auto pt-8">© 2025 Flower Bliss. All rights reserved.</p>
          </div>

          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-medium text-zinc-900 mb-4 tracking-tight">Navigation</h3>
                <ul className="space-y-1">
                  <li><Link href="/" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Discover</Link></li>
                  <li><Link href="/browse" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Browse</Link></li>
                  <li><Link href="/blog" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Blog</Link></li>
                  <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Care Guide</a></li>
                  <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-zinc-900 mb-4 tracking-tight">About</h3>
                <ul className="space-y-1">
                  <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">About Us</a></li>
                  <li><Link href="/blog" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Blog</Link></li>
                  <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Shipping Info</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-zinc-900 mb-4 tracking-tight">Contact</h3>
                <ul className="space-y-1">
                  <li><a href="https://wa.me/62" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">WhatsApp</a></li>
                  <li><a href="mailto:hello@flowerbliss.com" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Email</a></li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-auto">
              <div>
                <h3 className="font-medium text-zinc-900 mb-4 tracking-tight">Flower Types</h3>
                <ul className="space-y-1">
                  <li><Link href="/browse?type=roses" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Roses</Link></li>
                  <li><Link href="/browse?type=tulips" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Tulips</Link></li>
                  <li><Link href="/browse?type=lilies" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Lilies</Link></li>
                  <li><Link href="/browse?type=daisies" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Daisies</Link></li>
                  <li><Link href="/browse?type=sunflowers" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Sunflowers</Link></li>
                  <li><Link href="/browse?type=orchids" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Orchids</Link></li>
                  <li><Link href="/browse?type=carnations" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Carnations</Link></li>
                  <li><Link href="/browse?type=mixed" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Mixed Bouquets</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-zinc-900 mb-4 tracking-tight">Occasions</h3>
                <ul className="space-y-1">
                  <li><Link href="/browse?occasion=birthday" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Birthday</Link></li>
                  <li><Link href="/browse?occasion=wedding" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Wedding</Link></li>
                  <li><Link href="/browse?occasion=anniversary" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Anniversary</Link></li>
                  <li><Link href="/browse?occasion=congratulations" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Congratulations</Link></li>
                  <li><Link href="/browse?occasion=sympathy" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Sympathy</Link></li>
                  <li><Link href="/browse?occasion=get-well" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Get Well</Link></li>
                  <li><Link href="/browse?occasion=love" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Love & Romance</Link></li>
                  <li><Link href="/browse?occasion=just-because" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Just Because</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-zinc-900 mb-4 tracking-tight">Collections</h3>
                <ul className="space-y-1">
                  <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Romantic Bliss</a></li>
                  <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Vibrant Garden</a></li>
                  <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Elegant Arrangement</a></li>
                  <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Minimalist Chic</a></li>
                  <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Luxury Premium</a></li>
                  <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Pastel Dreams</a></li>
                  <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Bold & Beautiful</a></li>
                  <li><a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 text-sm">Seasonal Picks</a></li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-zinc-600 mt-auto pt-8 justify-center md:justify-end">
              <span>Made by</span>
              <a
                href="#"
                className="hover:text-zinc-900 transition-colors duration-200 font-medium tracking-tight"
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