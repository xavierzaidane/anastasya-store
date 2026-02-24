"use client";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      className="text-center py-20 sm:py-28"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-8xl font-light font-mono tracking-tight text-zinc-900 max-w-3xl mx-auto">
          Discover Our Flower Shop's Delightful Collection
        </h1>

        <p className="mt-3 max-w-xl mx-auto text-base text-zinc-500">
          Welcome to our enchanting flower emporium, where beauty blossoms and
          dreams take shape. Step into a world of vibrant colors, captivating
          fragrances.
        </p>

        <form className="mt-8 max-w-md mx-auto flex items-center bg-white border border-zinc-200/80 rounded-full  pr-2">
          <input
            placeholder="Search products..."
            className="grow bg-transparent px-5 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none"
            type="text"
          />
          <button
            type="submit"
            className="px-3 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>
    </motion.section>
  );
}
