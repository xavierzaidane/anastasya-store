"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"


type CategoryItem = {
  id: number
  slug: string
  title: string
  imageUrl: string
}

type CategoriesApiResponse = {
  success: boolean
  message: string
  data:
    | Array<{
        id: number
        slug: string
        name: string
        image: string | null
      }>
    | null
}

// Desktop accordion / hover slider that uses backend categories
export default function CategorySlider() {
  const [items, setItems] = useState<CategoryItem[]>([])

  useEffect(() => {
    let mounted = true

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories", { cache: "no-store" })
        if (!response.ok) return

        const result: CategoriesApiResponse = await response.json()
        if (!result.success || !result.data || !mounted) return

        const mapped = result.data.map((c) => ({
          id: c.id,
          slug: c.slug,
          title: c.name,
          imageUrl: c.image || "/bunga1.jpg",
        }))

        setItems(mapped)
      } catch {
        // keep empty UI on error
      }
    }

    fetchCategories()

    return () => {
      mounted = false
    }
  }, [])

  if (items.length === 0) {
    return (
      <div className="min-h-60 flex items-center justify-center">
        <p className="text-sm text-neutral-500">No categories found</p>
      </div>
    )
  }

  return (
    <>
      <div className="md:hidden flex flex-col gap-4 text-[#3d3929]">
        <div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-neutral-900 leading-[0.95] text-center ">
              Collections.
            </h1>
            </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/browse/${item.slug}`}
              className="group flex items-center gap-3 border border-zinc-200 bg-white p-3 shadow-sm transition-transform duration-300 active:scale-[0.99]"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-16 w-16 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Browse
                </p>
                <h4 className="truncate text-base font-medium text-zinc-900">
                  {item.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="hidden md:block text-[#3d3929]">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item, index) => (
            <Link
              key={item.id}
              href={`/browse/${item.slug}`}
              onClick={() => undefined}
              className="group flex flex-col gap-3"
            >
              <div className="relative w-full overflow-hidden  bg-transparent aspect-2/3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 transform-gpu group-hover:border "
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="text-center">
        
                <h4 className="text-base md:text-lg text-neutral-600 max-w-xl leading-relaxed text-center ">
                  {item.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
