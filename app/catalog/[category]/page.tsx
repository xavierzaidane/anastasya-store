'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProductsByCategory } from '@/data/products';
import StoreNavbar from '@/components/navigations/StoreNavbar';
import Footer from '@/components/navigations/Footer';
import { useProductDialogs } from '@/hooks/use-product-dialogs';
import { ProductDetailDialogAdvanced } from '@/components/products';

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;
  const products = getProductsByCategory(category);
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  const {
    selectedProduct,
    isProductDialogOpen,
    openProductDialog,
    closeProductDialog,
  } = useProductDialogs();

  if (products.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-['KoPub_Batang'] text-zinc-800 mb-4">
            Category not found
          </h1>
          <Link href="/catalog" className="text-orange-600 hover:text-orange-700">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full">
      <StoreNavbar />

      {/* Breadcrumbs */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-25">
        <nav className="flex items-center gap-2 text-sm text-zinc-600 mb-8 pointer-coarse:">
          <Link href="/catalog" className="hover:text-zinc-900 transition-colors">
            Browse
          </Link>
          <span className="text-zinc-400">/</span>
          <span className="text-zinc-900 font-medium">{categoryName}</span>
        </nav>
      </div>

      {/* Category Header */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 py-6 mt-[-3rem] flex justify-between items-start">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-mono text-zinc-900 tracking-tight mb-2">
            {categoryName} Collection
          </h1>
          <p className="text-sm sm:text-base text-zinc-600">
            Explore our {products.length} beautiful {categoryName.toLowerCase()} arrangements
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 mt-2">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 min-h-[400px] pb-16">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => openProductDialog(product)}
              className="group cursor-pointer focus-visible:outline-none"
              role="button"
              tabIndex={0}
              aria-label={`View details for ${product.name}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openProductDialog(product);
                }
              }}
            >
              {/* Image Container */}
              <div className="relative bg-zinc-100 rounded-lg sm:rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Tap/Click Indicator */}
                <div
                  className="absolute top-1 right-1 sm:top-2 sm:right-2 p-1.5 sm:p-2 bg-white/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-zinc-800 sm:w-4 sm:h-4"
                  >
                    <path
                      d="M19.9264 22.2516V20.691C19.9264 20.288 20.0525 19.8966 20.2639 19.5531C21.7583 17.1245 22.2279 14.5196 21.9002 13.505C20.857 11.3418 17.3758 10.4907 15.76 10.2878L16.7966 5.12292C16.9705 4.30387 16.3513 3.47938 15.4135 3.28136C14.4758 3.08334 13.5746 3.58679 13.4007 4.40583L11.3462 14.0815L8.77462 12.4424C8.77462 12.4424 7.47969 11.406 6.44041 12.4424C5.40114 13.4788 6.44041 14.7701 6.44041 14.7701L10.3488 19.7776C10.6003 20.0997 10.7468 20.4908 10.7688 20.8984L10.8401 22.2177"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M9.867 4.36134C9.867 4.36134 10.1124 2.14335 9.867 1.90156M9.867 1.90156C9.54861 1.58797 7.32936 1.85194 7.32936 1.85194M9.867 1.90156L6.89808 4.84002M2.11005 7.08754C2.11005 7.08754 1.86463 9.30553 2.11005 9.54732M2.11005 9.54732C2.42845 9.86092 4.6477 9.59694 4.6477 9.59694M2.11005 9.54732L5.07898 6.60886"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

              

                {/* Price Badge - Bottom Right */}
                <p className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/50 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold text-zinc-900">
                  {product.price}
                </p>
              </div>

              {/* Product Info */}
              <div className="pt-2 sm:pt-3">
                <p className="text-[10px] sm:text-xs text-zinc-500 line-clamp-1">
                  {product.category ? `${product.category}` : categoryName} · {product.reviews} reviews
                </p>
                <h3 className="text-xs sm:text-sm font-medium text-zinc-900 line-clamp-2 mt-0.5">
                  {product.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dialogs */}
      {selectedProduct && (
        <ProductDetailDialogAdvanced
          product={selectedProduct}
          open={isProductDialogOpen}
          onOpenChange={(open: boolean) => {
            if (!open) closeProductDialog();
          }}
        />
      )}

      <Footer />
    </section>
  );
}
