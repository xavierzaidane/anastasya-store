"use client"

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { mapApiProductToStorefront } from '@/lib/storefront-products'
import { StorefrontApiResponse, StorefrontPaginatedProducts, StorefrontProduct } from '@/types/storefront'

function LatestProduct() {
  const [products, setProducts] = useState<StorefrontProduct[]>([])
  const productLimit = 10
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = direction === 'left' ? -340 : 340
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  useEffect(() => {
    let mounted = true

    const fetchRecentProducts = async () => {
      try {
        const response = await fetch(`/api/products?limit=${productLimit}`, { cache: 'no-store' })
        if (!response.ok) return

        const result: StorefrontApiResponse<StorefrontPaginatedProducts> = await response.json()
        if (!result.success || !result.data || !mounted) return

        const mappedProducts = result.data.items.map((product) =>
          mapApiProductToStorefront(product)
        )

        setProducts(mappedProducts)
      } catch {
        // Keep the section empty if recent products cannot be loaded.
      }
    }

    fetchRecentProducts()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className='relative w-full'>
      <div className="grid-cols-2 gap-10 items-start pb-30">
                    
                    {/* Left Column */}
                    <div>
                       <h1 className="text-7xl font-medium tracking-tighter text-neutral-900 leading-[0.95] pb-5 text-center md:text-left">
                        Our Latest.
                    </h1>

                    <p className="hidden md:block text-base md:text-lg text-neutral-600 leading-relaxed max-w-xl">
                      Handcrafted bouquets made with fresh flowers and modern design, thoughtfully arranged to celebrate life&apos;s most meaningful moments.
                    </p>
                   
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col items-end text-left">
                    <p className="text-base text-center md:text-lg text-neutral-600 leading-relaxed max-w-xl">
                        Inspired by modern floristry, we create elegant bouquets that transform simple moments into memorable experiences.
                    </p>
                    </div>

                </div>

      <div className='mb-6 flex items-center justify-end'>
        <div className='flex gap-3 shrink-0 hidden'>
            <button
              onClick={() => scroll('left')}
              className='flex h-11 w-18 items-center justify-center  border border-zinc-200 transition-all duration-300 hover:bg-primary hover:text-white'
              aria-label='Scroll latest products left'
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className='flex h-11 w-18 items-center justify-center  border border-zinc-200 transition-all duration-300 hover:bg-primary hover:text-white'
              aria-label='Scroll latest products right'
            >
              <ChevronRight size={20} />
            </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className='-mx-6 flex gap-6 overflow-x-auto px-6 pb-2 scroll-smooth'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div key={product.id} className='w-45 sm:w-52 md:w-60 shrink-0'>
            <Link
              href={`/browse/${product.category}/${product.slug}`}
              className='group block focus-visible:outline-none'
              aria-label={`View details for ${product.name}`}
            >
              <div className='relative bg-zinc-100 overflow-hidden aspect-[3/4] sm:aspect-3/5'>
                <img
                  src={product.img}
                  alt={product.name}
                  className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                />

                <div
                  className='absolute top-1 right-1 sm:top-2 sm:right-2 p-1.5 sm:p-2 bg-white/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'
                  aria-hidden='true'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='14'
                    height='14'
                    viewBox='0 0 24 24'
                    fill='none'
                    color='currentColor'
                    className='text-zinc-800 sm:w-4 sm:h-4'
                  >
                    <path
                      d='M19.9264 22.2516V20.691C19.9264 20.288 20.0525 19.8966 20.2639 19.5531C21.7583 17.1245 22.2279 14.5196 21.9002 13.505C20.857 11.3418 17.3758 10.4907 15.76 10.2878L16.7966 5.12292C16.9705 4.30387 16.3513 3.47938 15.4135 3.28136C14.4758 3.08334 13.5746 3.58679 13.4007 4.40583L11.3462 14.0815L8.77462 12.4424C8.77462 12.4424 7.47969 11.406 6.44041 12.4424C5.40114 13.4788 6.44041 14.7701 6.44041 14.7701L10.3488 19.7776C10.6003 20.0997 10.7468 20.4908 10.7688 20.8984L10.8401 22.2177'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M9.867 4.36134C9.867 4.36134 10.1124 2.14335 9.867 1.90156M9.867 1.90156C9.54861 1.58797 7.32936 1.85194 7.32936 1.85194M9.867 1.90156L6.89808 4.84002M2.11005 7.08754C2.11005 7.08754 1.86463 9.30553 2.11005 9.54732M2.11005 9.54732C2.42845 9.86092 4.6477 9.59694 4.6477 9.59694M2.11005 9.54732L5.07898 6.60886'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                    />
                  </svg>
                </div>

                <p className='absolute bottom-1 right-1 sm:bottom-2 sm:right-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/50 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold text-zinc-900'>
                  {product.price}
                </p>
              </div>

              <div className='pt-2 sm:pt-3'>
                <p className='text-[10px] sm:text-xs text-zinc-500 line-clamp-1'>
                  {product.categoryName || product.category}
                </p>
                <h3 className='text-xs sm:text-sm font-medium text-zinc-900 line-clamp-2 mt-0.5'>
                  {product.name}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

    </div>
  )
}

export default LatestProduct