import React from 'react';
import StoreNavbar from '@/components/navigations/StoreNavbar';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailLoading() {
  return (
    <section className="w-full min-h-screen mb-10 lg:mb-10">
      <StoreNavbar />

      <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-6xl mx-auto mt-30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Gallery Skeleton */}
          <div className="flex flex-col gap-4">
            <Skeleton className="aspect-[4/5] w-full rounded-none border border-neutral-100 bg-neutral-100" />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Skeleton className="h-2 w-2 rounded-full bg-neutral-200" />
                <Skeleton className="h-2 w-2 rounded-full bg-neutral-200" />
                <Skeleton className="h-2 w-2 rounded-full bg-neutral-200" />
              </div>
            </div>
          </div>

          {/* Right Column - Info Skeleton */}
          <div className="flex flex-col gap-6">
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16 bg-neutral-100 rounded" />
              <span className="text-neutral-300 text-xs">/</span>
              <Skeleton className="h-4 w-24 bg-neutral-100 rounded" />
            </div>

            {/* Title & Price Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-9 w-4/5 bg-neutral-200 rounded" />
              <Skeleton className="h-7 w-1/3 bg-neutral-200 rounded" />
            </div>

            {/* Description Paragraph Skeleton */}
            <div className="space-y-2.5 pt-2">
              <Skeleton className="h-4 w-full bg-neutral-100 rounded" />
              <Skeleton className="h-4 w-11/12 bg-neutral-100 rounded" />
              <Skeleton className="h-4 w-3/4 bg-neutral-100 rounded" />
            </div>

            {/* Quantity Stepper Skeleton */}
            <div className="pt-2">
              <Skeleton className="h-10 w-32 bg-neutral-100 rounded" />
            </div>

            {/* Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Skeleton className="h-12 w-full bg-neutral-200 rounded" />
              <Skeleton className="h-12 w-full sm:w-14 shrink-0 bg-neutral-100 rounded" />
            </div>

            {/* Accordion / Details Skeleton */}
            <div className="border-t border-neutral-200 pt-6 space-y-4">
              <div className="flex justify-between items-center py-2">
                <Skeleton className="h-4 w-32 bg-neutral-100 rounded" />
                <Skeleton className="h-4 w-4 bg-neutral-100 rounded" />
              </div>
              <div className="flex justify-between items-center py-2 border-t border-neutral-100">
                <Skeleton className="h-4 w-24 bg-neutral-100 rounded" />
                <Skeleton className="h-4 w-4 bg-neutral-100 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

