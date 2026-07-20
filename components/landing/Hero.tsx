import React from 'react';
import { motion } from 'framer-motion';
import Category from './Category';
import LatestProduct from './LatestProduct';
import StaffPicks from './StaffPicks';
import CTA from './CTA';
import FAQ from './FAQ';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 lg:px-12 max-w-8xl">
        <div className="grid gap-10 md:gap-10 lg:gap-12 py-16 md:py-28 lg:py-35">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 pt-10"
          >
            <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-medium tracking-tighter text-neutral-900 leading-[0.95] text-center md:text-left">
              Anastasya <br/>
              Bouquets
            </h1>
            {/* MOBILE + TABLET + WEB modes handled by breakpoints */}
            <div className="grid gap-4 md:gap-5 lg:gap-7 lg:grid-cols-2">
              
                <div className="max-w-1xl text-sm md:text-base lg:text-lg text-neutral-500 leading-relaxed text-center md:text-left lg:text-left pt-1 md:pt-4 lg:pt-8 space-y-4">

  <p className="hidden md:block">
    We create fresh floral arrangements with a modern and elegant design touch, carefully crafted to bring beauty and sophistication to every occasion. Every bouquet and floral decoration is thoughtfully arranged using fresh, high-quality flowers to deliver a luxurious and memorable impression.
  </p>


</div>

            </div>
            <div className="flex justify-center md:justify-start pt-6 md:pt-8 lg:pt-10 items-center">
              <Link
                href="/browse"
                className="inline-flex items-center justify-center border border-zinc-200 px-4 py-3 md:px-5 md:py-4 text-sm font-medium uppercase tracking-wide text-zinc-900 transition-colors hover:bg-primary hover:text-white"
              >
                View Bouquets
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-[300px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[600px] xl:max-w-[790px]">
              <div className="relative w-full">
                <img
                  src="/assets/bungahero.png"
                  alt="flower bouquet"
                  className="w-full h-auto object-contain relative z-10 left-0 lg:left-58 top-2 sm:top-0 md:-top-8 lg:-top-206"
                />
              </div>
            </div>
          </motion.div>
        </div>

         <div className=" border-neutral-200 pt-228 md:pt-206 lg:pt-1 -mb-15 -mt-242">
          <CTA />
        </div>

      

        <div className=" border-neutral-200 pt-16 pb-10 ">
          <Category />
        </div>
          <StaffPicks />
        <div className="pb-16 pt-10">
          <FAQ />
        </div>
      </div>
    </section>
  );
};

export default Hero;
