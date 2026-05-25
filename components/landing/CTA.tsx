import React from 'react'

function CTA() {
  return (
    <section className="border-t border-neutral-200 py-12 reveal-text-container">
      <div className="grid gap-10 pt-10 md:grid-cols-2 items-start mt-15">
        <div className="flex flex-col gap-6">
          <p className="text-base  md:text-lg hidden md:block text-neutral-600 leading-relaxed max-w-xl">
            Our bouquets are designed to express emotions through flowers, combining premium blooms with refined craftsmanship. Whether celebrating a milestone or brightening someone&apos;s day.
          </p>
          <div className="flex justify-center md:justify-start pt-5">
            <button
              type="button"
              className="inline-flex items-center justify-center border border-zinc-200 px-5 py-3 text-sm font-medium uppercase tracking-wide text-zinc-900 transition-colors hover:bg-primary hover:text-white"
            >
              Browse collection
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-5">
          <h2 className="text-7xl font-medium tracking-tighter text-neutral-900 leading-[0.95]">
            Collections.
          </h2>
          <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-xl">
            We create fresh floral arrangements with a modern design touch.
          </p>
        </div>
      </div>
    </section>
  )
}

export default CTA