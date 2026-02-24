import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  image: string;
  isStaffPick?: boolean;
}

const products: Product[] = [
  { id: '1', name: 'Studio Display', brand: 'Apple', category: 'Tech', price: '$1.599', image: '/bunga4.jpg' },
  { id: '2', name: '151 Stealth Backpack', brand: 'Grams28', category: 'Carry', price: '$299', image: '/bunga4.jpg' },
  { id: '3', name: 'Aeron', brand: 'Herman Miller', category: 'Workspace', price: '$1.395', image: '/bunga4.jpg' },
  { id: '4', name: 'Mechanical Keyboard', brand: 'WorkLouder', category: 'Tech', price: '$299', image: '/bunga4.jpg', isStaffPick: true },
  { id: '5', name: '911 Turbo S', brand: 'Porsche', category: 'Lifestyle', price: '$207.000', image: '/bunga4.jpg', isStaffPick: true },
  { id: '6', name: 'Speedmaster', brand: 'Omega', category: 'Lifestyle', price: '$6.400', image: '/bunga4.jpg', isStaffPick: true },
  { id: '7', name: 'iPhone Air', brand: 'Apple', category: 'Tech', price: '$599', image: '/bunga4.jpg' },
  { id: '8', name: 'iPhone 17 Pro', brand: 'Apple', category: 'Tech', price: '$1.199', image: '/bunga4.jpg' },
  { id: '9', name: 'Small Square in Orange Acrylic CE', brand: 'Bang', category: 'Home', price: '$85', image: '/bunga2.jpg' },
  { id: '10', name: 'Valet Tray', brand: 'Bionic', category: 'Home', price: '$125', image: '/bunga2.jpg' },
  { id: '11', name: 'Desktop Folder', brand: 'Blanked', category: 'Workspace', price: '$95', image: '/bunga2.jpg' },
  { id: '12', name: 'Industrial Bookstand', brand: 'Blanked', category: 'Workspace', price: '$145', image: '/bunga2.jpg' },
  { id: '13', name: 'Pulse (Tandem)', brand: 'Breda', category: 'Lifestyle', price: '$129', image: '/bunga2.jpg' },
  { id: '14', name: 'P–1 Pepper Mill', brand: 'Crust', category: 'Home', price: '$155', image: '/bunga2.jpg' },
  { id: '15', name: 'Solarcycle Morph', brand: 'Dyson', category: 'Home', price: '$649', image: '/bunga2.jpg' },
  { id: '16', name: 'Stagg EKG', brand: 'Fellow', category: 'Home', price: '$189', image: '/bunga2.jpg' },
  { id: '17', name: 'Roma', brand: 'Ferrari', category: 'Lifestyle', price: '$247.000', image: '/bunga4.jpg', isStaffPick: true },
  { id: '18', name: 'Salt', brand: 'Grau', category: 'Home', price: '$75', image: '/bunga2.jpg' },
];

export default function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterButtons = [
    { id: 'all', label: 'All' },
    { id: 'bookmarks', label: 'Bookmarks' },
    { id: 'new', label: 'New' },
    { id: 'picks', label: 'Picks' },
    { id: 'tech', label: 'Tech', count: 116 },
    { id: 'workspace', label: 'Workspace', count: 135 },
    { id: 'home', label: 'Home', count: 60 },
    { id: 'carry', label: 'Carry', count: 85 },
    { id: 'books', label: 'Books', count: 31 },
    { id: 'lifestyle', label: 'Lifestyle', count: 21 },
    { id: 'audio', label: 'Audio' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'photography', label: 'Photography' },
    { id: 'fashion', label: 'Fashion' },
  ];

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === activeFilter);

  return (
    <div>
      {/* Filter Section */}
      <div className="py-2 mt-[-1rem]">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-2 -mb-2 sm:flex-wrap sm:overflow-x-visible sm:pb-0 sm:-mb-0 max-w-[85vw]">
            {filterButtons.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full transition-colors duration-200 whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-white text-zinc-600 border-zinc-200/80 hover:bg-zinc-100 hover:border-zinc-300'
                }`}
              >
                <span>{filter.label}</span>
                {filter.count && (
                  <span className="text-xs text-zinc-400">{filter.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 mt-2">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 min-h-[400px]">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer focus-visible:outline-none"
              role="button"
              tabIndex={0}
              aria-label={`View details for ${product.name}`}
            >
              <div className="relative bg-zinc-100 rounded-lg sm:rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={product.image}
                />
                <div
                  className="absolute top-1 right-1 sm:top-2 sm:right-2 p-1.5 sm:p-2 bg-white/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-zinc-800"
                  >
                    <path d="M19.9264 22.2516V20.691C19.9264 20.288 20.0525 19.8966 20.2639 19.5531C21.7583 17.1245 22.2279 14.5196 21.9002 13.505C20.857 11.3418 17.3758 10.4907 15.76 10.2878L16.7966 5.12292C16.9705 4.30387 16.3513 3.47938 15.4135 3.28136C14.4758 3.08334 13.5746 3.58679 13.4007 4.40583L11.3462 14.0815L8.77462 12.4424C8.77462 12.4424 7.47969 11.406 6.44041 12.4424C5.40114 13.4788 6.44041 14.7701 6.44041 14.7701L10.3488 19.7776C10.6003 20.0997 10.7468 20.4908 10.7688 20.8984L10.8401 22.2177" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d="M9.867 4.36134C9.867 4.36134 10.1124 2.14335 9.867 1.90156M9.867 1.90156C9.54861 1.58797 7.32936 1.85194 7.32936 1.85194M9.867 1.90156L6.89808 4.84002M2.11005 7.08754C2.11005 7.08754 1.86463 9.30553 2.11005 9.54732M2.11005 9.54732C2.42845 9.86092 4.6477 9.59694 4.6477 9.59694M2.11005 9.54732L5.07898 6.60886" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </div>

                {product.isStaffPick && (
                  <div className="absolute top-1 left-1 sm:top-2 sm:left-2 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/50 backdrop-blur-sm rounded-full text-xs font-medium text-amber-900">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" color="currentColor" className="text-amber-600">
                      <path d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </svg>
                    <span className="hidden sm:inline">Staff Pick</span>
                  </div>
                )}

                <p className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/50 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold text-zinc-900">
                  {product.price}
                </p>
              </div>
              <div className="pt-2 sm:pt-3">
                <p className="text-xs text-zinc-500 line-clamp-1">
                  {product.brand} · {product.category}
                </p>
                <h3 className="text-xs sm:text-sm font-medium text-zinc-900 line-clamp-2">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}