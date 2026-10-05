"use client";
import Hero from '@/components/landing/Hero';
import { MotionConfig } from 'motion/react';

function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative overflow-x-hidden">
        <div className="relative z-10">
          <Hero />
        </div>
      </div>
    </MotionConfig>
  );
}



export default LandingPage