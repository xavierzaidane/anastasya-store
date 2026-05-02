import React, { useEffect, useState, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'scale-up';
  duration?: number;
  threshold?: number;
  rootMargin?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  delay = 0, 
  className = "",
  animation = 'fade-up',
  duration = 1000,
  threshold = 0.15,
  rootMargin = "0px 0px -50px 0px"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const getAnimationClass = () => {
    // Premium animation states: subtle movement (translate-y-8 instead of 12)
    switch(animation) {
      case 'fade-in': return isVisible ? 'opacity-100' : 'opacity-0';
      case 'scale-up': return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95';
      case 'fade-up': default: return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
    }
  }

  return (
    <div
      ref={ref}
      // Using a custom cubic-bezier for a "silky" feel (similar to easeOutQuart)
      className={`transition-all ease-[cubic-bezier(0.2,0,0.2,1)] transform ${getAnimationClass()} ${className}`}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms` 
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;