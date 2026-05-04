"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow"

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
          <h3 className="text-xs font-normal text-muted-foreground tracking-tighter">
            Category
          </h3>
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

      <HoverSlider className="hidden md:block min-h-auto md:min-h-svh text-[#3d3929]">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-normal text-muted-foreground tracking-tighter">
            Category
          </h3>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:flex-wrap md:items-center md:justify-start md:gap-16 lg:gap-115">
          <div className="flex flex-col space-y-2 md:space-y-4">
            {items.map((item, index) => (
              <Link
                key={item.id}
                href={`/browse/${item.slug}`}
                onClick={() => undefined}
                className="cursor-pointer text-2xl sm:text-3xl md:text-4xl font-medium uppercase tracking-tighter"
              >
                <TextStaggerHover index={index} text={item.title} />
              </Link>
            ))}
          </div>

          <HoverSliderImageWrap>
            {items.map((item, index) => (
              <div key={item.id} className="">
                <Link href={`/browse/${item.slug}`}>
                  <HoverSliderImage
                    index={index}
                    imageUrl={item.imageUrl}
                    src={item.imageUrl}
                    alt={item.title}
                    className="size-full max-h-72 sm:max-h-80 md:max-h-96 object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </Link>
              </div>
            ))}
          </HoverSliderImageWrap>
        </div>
      </HoverSlider>
    </>
  )
}
