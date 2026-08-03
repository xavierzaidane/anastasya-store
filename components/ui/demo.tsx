"use client";

// demo.tsx
import { ProductDetailPage, ProductDetailPageProps } from "@/components/ui/product-detail-page";
import { Tag, Ruler, Users, Info } from "lucide-react";

// Mock data to be passed into the component
const demoProps: ProductDetailPageProps = {
  breadcrumbs: [
    { label: "Market", href: "#" },
    { label: "Clothing", href: "#" },
    { label: "Lightweight Brown Bomber Jacket", href: "#" },
  ],
  product: {
    name: "Lightweight Brown Bomber Jacket",
    price: 70,
    shippingCost: 5.60,
    currency: "€",
    images: [
      "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss4157-02_3.jpg?v=1756928497&quality=80?q=80&w=2000&auto=format&fit=crop",
      "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss4157-02_1.jpg?v=1756928497&quality=80?q=80&w=2000&auto=format&fit=crop",
      "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss4157-02_6.jpg?v=1756920149&quality=80?q=80&w=2000&auto=format&fit=crop",
    ],
    description: "A stylish light bomber jacket, perfect for the transitional seasons. Made from breathable, water-resistant material with a zip-up front, side pockets, and a sleeve zip pocket for small essentials. Ideal for layering in spring or fall.",
    tags: [
      { label: "Brown", icon: Tag },
      { label: "L Size", icon: Ruler },
      { label: "Women", icon: Users },
      { label: "New", icon: Info },
    ],
  },
  seller: {
    name: "Maria Johansson",
    avatarUrl: "https://i.pravatar.cc/150?u=maria",
    rating: 4.9,
  },
};

// The demo component that renders the product page
const ProductPageDemo = () => {
  // Data for the "You might also like" section
  const relatedProducts = [
    { id: 1, src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFja2V0fGVufDB8fDB8fHww?q=80&w=800&auto=format&fit=crop", alt: "Similar Jacket" },
    { id: 2, src: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvc2V8ZW58MHx8MHx8fDA%3D?q=80&w=800&auto=format&fit=crop", alt: "Running Shoes" },
    { id: 3, src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop", alt: "Modern Watch" },
    { id: 4, src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop", alt: "Stylish Sunglasses" },
  ];

  return (
    <div className="bg-muted/30">
        {/* This container simulates the card-like appearance from the UI design */}
        <div className="max-w-screen-xl mx-auto p-4 sm:p-6 md:p-8">
            <div className="bg-card rounded-2xl shadow-sm">
                <ProductDetailPage 
                    product={demoProps.product}
                    seller={demoProps.seller}
                    breadcrumbs={demoProps.breadcrumbs}
                />
                
                {/* "You might also like" section with real images */}
                <div className="px-4 md:px-8 pb-8">
                    <h2 className="text-2xl font-bold tracking-tight">You might also like</h2>
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {relatedProducts.map((item) => (
                             <div key={item.id} className="bg-muted/50 rounded-lg aspect-square overflow-hidden group">
                                <img 
                                  src={item.src} 
                                  alt={item.alt}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                             </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductPageDemo;
