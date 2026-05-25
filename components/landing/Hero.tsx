import React from 'react';
import { motion } from 'framer-motion';
import Category from './Category';
import LatestProduct from './LatestProduct';
import CTA from './CTA';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 lg:px-12 max-w-8xl">
        <div className="grid gap-12 py-40 md:py-20 lg:py-35">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-7xl sm:text-5xl md:text-6xl lg:text-[10rem] font-medium tracking-tighter text-neutral-900 leading-[0.95] text-center lg:text-left">
              Anastasya Bouquets
            </h1>
            <div className="grid gap-6 md:gap-170 md:grid-cols-2">
              
              <p className="text-base md:text-lg text-neutral-600 leading-relaxed text-center lg:text-left pt-2 md:pt-10">
                
                We create fresh floral arrangements with a modern design touch. We create fresh floral arrangements with a modern design touch. 
              </p>

              <p className="hidden md:block text-base md:text-lg text-neutral-600 leading-relaxed text-center lg:text-left pt-2 md:pt-10">
                Each bouquet is curated to feel modern, refined, and ready for any celebration or quiet moment.
              </p>
            </div>
            <div className="flex justify-center lg:justify-start pt-6 md:pt-10">
              <button
                type="button"
                className="inline-flex items-center justify-center border border-zinc-200 px-5 py-3 md:px-5 md:py-4 text-sm font-medium uppercase tracking-wide text-zinc-900 transition-colors hover:bg-primary hover:text-white"
              >
                View Bouquets
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-[800px]">
              <div className="relative w-full">
                <img
                  src="/assets/bungahero.png"
                  alt="flower bouquet"
                  className="w-full h-auto object-contain relative z-10 -top-6 sm:-top-10 lg:-top-112"
                />
              </div>
            </div>
          </motion.div>
        </div>

         <div className=" border-neutral-200 pt-113 md:pt-12 -mb-15 -mt-159">
          <CTA />
        </div>

        <div className=" border-neutral-200 pt-32 pb-10 ">
          <Category />
        </div>

        <div className="pb-16 pt-50">
          <LatestProduct />
        </div>
      </div>
    </section>
  );
};

export default Hero;