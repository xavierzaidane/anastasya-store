import { LandingAccordionItem } from "@/components/ui/interactive-image-accordion";
import { MobileCategoryCarousel } from "@/components/ui/mobile-category-carousel";

export default function Category() {
  return (
    <div className="w-full mx-auto mt-8 md:w-container md:-mt-20">
      {/* Mobile Carousel */}
      <div className="md:hidden">
        <div className="flex flex-col gap-4">
          <div className="-px-1">
            <h2 className="text-2xl font-normal">Our Category</h2>
            <p className="text-sm text-foreground/50">Explore our collection</p>
          </div>
          <MobileCategoryCarousel />
        </div>
      </div>

      {/* Desktop Accordion */}
      <div className="hidden md:block">
        <LandingAccordionItem />
      </div>
    </div>
  );
}
