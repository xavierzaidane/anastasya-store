"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden border-b">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center "
        style={{ backgroundImage: "url('/cover.png')" }}
      />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-20 flex flex-col items-center justify-center text-center">
        <motion.div
          className="max-w-4xl flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
      

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-medium leading-[0.9] tracking-tight text-zinc-900"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Where Nature
            <br />
            <span className="text-zinc-900 italic font-['Playfair_Display']">Meets Art.</span>
          </motion.h1>

          {/* Supporting text with better contrast */}
          <motion.div
            className="mt-8 sm:mt-10 max-w-lg space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-zinc-600 text-base sm:text-lg font-light leading-relaxed">
              We handpick the finest flowers from local growers to create arrangements that transform moments into memories.
            </p>
   
          </motion.div>

       
        </motion.div> 
      </div>
    </section>
  );
}