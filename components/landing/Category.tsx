
import { MobileCategoryCarousel } from "@/components/ui/mobile-category-carousel";
import CategorySlider from "./CategorySlider";


export default function Category() {
  return (
    <div className="w-full mx-auto mt-8 md:w-container md:-mt-10">
      {/* Mobile Carousel */}
      <div className="md:hidden">
        <div className="flex flex-col gap-4 -mt-10">
          <MobileCategoryCarousel />
        </div>
      </div>

      {/* Desktop Accordion */}
      <div className="hidden md:block">
        <div>
              
            </div>
        <CategorySlider />
      </div>
    </div>
  );
}
