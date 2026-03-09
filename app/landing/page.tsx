"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from '@/components/landing/Hero'
import ProductGrid from '@/components/landing/Product';

function LandingPage() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="relative overflow-x-hidden">

      <div className="relative z-10">
        <Hero />
        <ProductGrid />
      </div>
    </div>
  )
}



export default LandingPage