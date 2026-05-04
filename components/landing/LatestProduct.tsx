"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNavigation } from '../ui/carousel'
import { mapApiProductToStorefront } from '@/lib/storefront-products'
import { StorefrontApiResponse, StorefrontPaginatedProducts, StorefrontProduct } from '@/types/storefront'

function LatestProduct() {
  const [products, setProducts] = useState<StorefrontProduct[]>([])

  useEffect(() => {
    let mounted = true

    const fetchRecentProducts = async () => {
      try {
        const response = await fetch('/api/products?limit=5', { cache: 'no-store' })
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
      <div className='flex flex-col '>
        <h3 className='text-xs sm:text-sm font-normal text-muted-foreground'>
          Recent Bouquets
        </h3>
        <h2 className='text-2xl sm:text-3xl font-normal text-gray-900 mb-6 sm:mb-10'>
          Our Latest Product
        </h2>
      </div>

      <Carousel>
        <CarouselContent className='-ml-4'>
          {products.map((product) => (
            <CarouselItem key={product.id} className='basis-[82%] sm:basis-1/2 md:basis-1/3 pl-4'>
              <Link
                href={`/browse/${product.category}/${product.slug}`}
                className='group block focus-visible:outline-none'
                aria-label={`View details for ${product.name}`}
              >
                <div className='relative bg-zinc-100 overflow-hidden aspect-square '>
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNavigation
          className='absolute -bottom-16 sm:-bottom-20 left-auto top-auto hidden w-full justify-end gap-2 md:flex'
          classNameButton='bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800'
          alwaysShow
        />
      </Carousel>
    </div>
  )
}

export default LatestProduct