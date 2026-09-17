import React from 'react'
import Link from 'next/link'
import RippleLink from '@/components/ui/ripple-link'

function CTA() {
  return (
    <section className="border-t border-neutral-200 py-12 reveal-text-container">
      <div className="grid gap-10 pt-10 md:grid-cols-2 items-start mt-15">
        <div className="flex flex-col gap-3 text-center md:text-left">
           <h2 className="text-7xl md:text-6xl font-normal tracking-tighter text-neutral-900 leading-[0.95]">
            Order Here
          </h2>
          <p className="mt-3 text-base text-neutral-600 leading-relaxed max-w-xl">
         Ready to send something unforgettable? Choose your favorite handcrafted bouquet below and place your order in just a few simple steps.
        </p>
          <div className="relative flex justify-center md:justify-start pt-6 pb-12 sm:pb-8">
            <div className="relative inline-flex items-center">
              {/* Hand-drawn "order here" and curved arrow pointing to the button */}
              <div className="absolute -bottom-11 -left-10 sm:-bottom-20 sm:-left-24 md:-left-28 flex items-center select-none pointer-events-none z-10">
                <span className="font-handwriting text-xl sm:text-3xl text-neutral-500 dark:text-neutral-400 -rotate-12 tracking-wider font-normal sm:pt-16">
                  Click me!
                </span>
                <svg
                  className="w-14 h-10 sm:w-18 sm:h-12 text-neutral-400 dark:text-neutral-500 -mt-2 -ml-0.5 sm:ml-0"
                  viewBox="0 0 85 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M 8 44 C 26 38 52 24 78 8"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 64 8 L 78 8 L 73 21"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <RippleLink
                href="/browse"
                className="inline-flex items-center justify-center border border-zinc-200 px-5 py-3 text-sm font-medium uppercase tracking-wide text-zinc-900"
              >
                Browse collection
              </RippleLink>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center md:text-right gap-5">
          
        </div>
      </div>
    </section>
  )
}

export default CTA