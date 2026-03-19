"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0e1b08]">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-20">
        <motion.div
          className="max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
      

          {/* Bold headline with refined typography */}
          <motion.h1
            className="text-5xl sm:text-7xl lg:text-[7rem] xl:text-[10rem] font-heading font-medium leading-[0.85] tracking-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Where Nature
            <br />
            <span className="text-[#c8deb0] italic font-['Playfair_Display']">Meets Art</span>
          </motion.h1>

          {/* Supporting text with better contrast */}
          <motion.div
            className="mt-10 sm:mt-14 max-w-xl space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-white/90 text-lg sm:text-xl font-light leading-relaxed">
              Every bloom tells a story. We handpick the finest flowers from local growers to create arrangements that transform moments into memories.
            </p>
   
          </motion.div>

       
        </motion.div> 
      </div>
    </section>
  );
}