"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section
      className="text-left min-h-screen relative flex items-center justify-start"
      style={{
        backgroundImage: "url('/bungahero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <motion.div
        className="px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-8xl font-heading tracking-tight text-white max-w-3xl">
          Discover Our Flower Shop&apos;s Delightful Collection
        </h1>



        <form 
          onSubmit={handleSearch}
          className="mt-8 max-w-md flex items-center backdrop-blur-sm border border-zinc-200/10 rounded-full pr-3"
        >
          <input
            placeholder="Search products..."
            className="grow bg-transparent px-5 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="px-3 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </motion.div>
    </section>
  );
}
