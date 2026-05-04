import React from 'react';
import { Zap, Battery, PlayCircle, CircleCheck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Category from './Category';
import LatestProduct from './LatestProduct';


// Component for the "Trusted by" avatars
const UserAvatars = () => {


  return (
    <div className="flex flex-col gap-3 mt-8 md:mt-12">
      <div className="flex items-center -space-x-3">
      </div>
      <p className="text-sm text-neutral-500 font-medium">
        Trusted by <span className="text-black font-bold">15K+ Loyal</span> Customers.
      </p>
    </div>
  );
};

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <div className="relative pt-20 overflow-hidden flex flex-col">
      {/* Content Container */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:block mb-35">
        
        {/* Top Section (Headlines) */}
        <div className="pt-12 md:pt-20 lg:w-[61%] px-0 md:px-8 lg:px-44 relative z-20 flex flex-col items-center md:items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-md font-semibold tracking-widest text-neutral-500 ">
              300+ Customer Favorites!
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl xl:text-6xl font-medium tracking-tighter text-neutral-900 leading-[0.95] mb-6 text-center md:text-left">
            Bring Meaning to Every Moment<span className="text-primary text-5xl md:text-7xl xl:text-6xl font-medium tracking-tighter "> with Bouquets</span>
          </h1>

          <p className="text-base md:text-lg text-neutral-600 max-w-md leading-relaxed mb-8 text-center md:text-left">
            We create fresh floral arrangements with a modern design touch.
          </p>

          <div className="flex flex-col undefined md:gap-6 gap-4">
            <button data-state="closed" className="md:mt-5 lg:w-[85%] h-fit font-dm">
              <div className="h-fit w-full flex items-center justify-center md:justify-end cta" style={{ translate: 'none', rotate: 'none', scale: 'none', opacity: 1, transform: 'translate(0px, 0px)' }}>
                <input
                  className="w-full rounded-md border border-input px-3 py-1 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-white h-14 pl-6 shadow-lg undefined hidden md:block pointer-events-none text-base"
                  placeholder="Enter your phone number"
                />
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow hover:bg-foreground h-9 md:absolute md:mr-2 bg-accent py-5 md:text-base text-lg lg:px-6 md:px-4 px-12">
                  Get Free Sample
                </button>
              </div>
            </button>

            <section className="flex gap-3 items-end animate-pulse md:flex-row-reverse md:pr-6 lg:w-[85%] justify-center cta" style={{ translate: 'none', rotate: 'none', scale: 'none', opacity: 1, transform: 'translate(0px, 0px)' }}>
              <img
                src="data:image/svg+xml,%3csvg%20width='104'%20height='38'%20viewBox='0%200%20104%2038'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11%206C11%206%2020%2044.5%2050%2027C80%209.5%2086.5%2036.5%20102%2036.5'%20stroke='black'%20stroke-width='3'%20stroke-linecap='round'%20stroke-dasharray='6%206'/%3e%3cpath%20d='M2.27303%2013.3374L10.4227%202.20938L21.1184%2010.9186'%20stroke='black'%20stroke-width='3'%20stroke-linecap='round'/%3e%3c/svg%3e"
                className="md:w-14 w-12 mb-2 md:scale-x-[-1] opacity-40 "
                alt=""
              />
              <div className="flex opacity-40">
                <p className="md:inline-block hidden">No min order,&nbsp;</p>
                <p>Contact us!</p>
              </div>
            </section>
          </div>

          <div className="md:hidden relative z-20 -mt-10 -mb-35 flex justify-center">
            <img
              src="/assets/iphone2.png"
              alt="Mobile preview"
              className="w-[190%] max-w-none h-auto object-contain"
            />
          </div>
        </motion.div>
      </div>

        <motion.div className="hidden md:block relative md:w-[50vw] mx-auto lg:mx-0 lg:absolute lg:right-[-2%] lg:left-[62%] lg:top-[10%] lg:w-[40vw] z-30 mt-16 lg:mt-0">
        <div className="relative w-full cursor-pointer duration-300 ">
          <img 
            src="/assets/Thumbel.png" 
            alt="flower bouquet" 
            className="w-full h-auto object-contain relative z-10"
          />
          {/* Ground shadow only */}
          <div 
            className="absolute top-215 bottom-0 left-2/2 -translate-x-1/2 z-0"
            style={{
              width: '75%',
              height: '40px',
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, transparent 70%)',
              filter: 'blur(8px)',
              transform: 'translateX(-50%) scaleY(0.4)',
            }}
          />
          
        </div>

  
      </motion.div>
      </div>

  <div className="md:hidden relative z-10 border-t border-x border-zinc-200 rounded-t-2xl px-4 pt-16 overflow-hidden">
    <div className="relative z-20 -mt-4">
      <Category />
    </div>
  </div>

  <div className="md:hidden px-4 pt-10 pb-16">
    <LatestProduct />
  </div>

      {/* Bottom Section - Reputation */}
      <div className="h-fit w-full bg-primary/10 md:flex hidden flex-col  reveal-text-container 3xl:px-36 px-74 pt-50 pb-12">
        {/* Features */}
        <div className="flex 3xl:pl-36 pl-0 pr-0 lg:pr-0 w-full lg:w-[60vw] items-center gap-14 -mt-40 pb-40 ">
          <div className="flex items-center gap-5">
            <div className="relative flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
            </svg>

            </div>
            <p className="text-neutral-600 font-medium ">Same Day Delivery</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
            </svg>
            </div>
            <p className="text-neutral-600 font-medium">No Minimum Order</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
          </svg>
            </div>
            <p className="text-neutral-600 font-medium">Quality Guarantee</p>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="w-[65vw] xl:w-[40vw] flex flex-col gap-6">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-brand-lime font-normal tracking-widest"
            >
              Our Reputation
              
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-medium text-black tracking-tight leading-[1.2]"
            >
              <span className="reveal-text-1">Since 2023, We Have </span>
              <span className="reveal-text-2">Served Hundreds of </span>
              <span className="reveal-text-3">Customers with <span className='text-primary'>Premium</span> </span>
              <span className="reveal-text-4 text-primary">Quality Products Always Available</span>
            </motion.p>
          </div>

          <div className="flex w-[45vw] xl:w-[30vw] mb-12 mt-20 self-end justify-between items-center gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="benefit-1"
            >
              <p className="text-3xl font-bold text-brand-lime">8+</p>
              <p className="text-lg text-neutral-600">Years of Experience</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="benefit-2"
            >
              <p className="text-3xl font-bold text-brand-lime">98.9%</p>
              <p className="text-lg text-neutral-600">Customer Satisfaction</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="benefit-3"
            >
              <p className="text-3xl font-bold text-brand-lime">200+</p>
              <p className="text-lg text-neutral-600">Color Combinations</p>
            </motion.div>
          </div>
        </div>

     
      </div>

      <div className="h-fit w-full md:flex hidden flex-col reveal-text-container 3xl:px-36 px-74 mt-50 -mb-45 ">
        <Category />
      </div>
      <div className="h-fit w-full md:flex hidden flex-col reveal-text-container 3xl:px-36 px-74 -mt-75 pb-20 ">
        <LatestProduct />
      </div>

    </div>
  );
};

export default Hero;