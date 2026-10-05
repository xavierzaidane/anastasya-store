export type Language = 'en' | 'id';

export const translations = {
  en: {
    // Navigation
    nav: {
      discover: 'Discover',
      browse: 'Browse',
      guide: 'Guide',
      blog: 'Blog',
      search: 'Search',
      savedItems: 'Saved Items',
      menu: 'Menu',
      close: 'Close',
    },
    // Hero
    hero: {
      titleLine1: 'Anastasya',
      titleLine2: 'Bouquets',
      description:
        'We create fresh floral arrangements with a modern and elegant design touch, carefully crafted to bring beauty and sophistication to every occasion. Every bouquet and floral decoration is thoughtfully arranged using fresh, high-quality flowers to deliver a luxurious and memorable impression.',
      viewBouquets: 'View Bouquets',
      shopNow: 'Shop Now!',
      flowerBouquetAlt: 'flower bouquet',
    },
    // CTA & Category Section
    cta: {
      orderHere: 'Order Here',
      orderHereDesc:
        'Ready to send something unforgettable? Choose your favorite handcrafted bouquet below and place your order in just a few simple steps.',
      clickMe: 'Click me!',
      browseCollection: 'Browse collection',
      orderHereMobile: 'Order Here.',
      noCategories: 'No categories found',
    },
    // Staff Picks / Best Selling
    staffPicks: {
      title: 'Our Best Selling',
      subtitle:
        'Explore our hand-curated collection of floral favorites, personally selected by our experienced lead florists.',
      staffPickBadge: 'Staff Pick',
    },
    // Latest Products
    latestProducts: {
      title: 'Our Latest.',
      subtitle1:
        "Handcrafted bouquets made with fresh flowers and modern design, thoughtfully arranged to celebrate life's most meaningful moments.",
      subtitle2:
        'Inspired by modern floristry, we create elegant bouquets that transform simple moments into memorable experiences.',
    },
    // FAQ
    faq: {
      badge: 'Frequently Asked Questions',
      title: 'Everything You Need to Know',
      subtitle:
        'Everything you need to know about Anastasya Bouquet — from placing orders and custom designs to delivery and flower care.',
    },
    // Order Guide Page
    guide: {
      title: 'Order Guide',
      subtitle: 'Simple steps to order, choose bouquet sizes, and arrange delivery.',
      howToOrderTitle: 'How to Order',
      sizeChartTitle: 'Size Chart',
      pickupDeliveryTitle: 'Pick up & Delivery',
      orderSteps: {
        step1Title: 'Choose Bouquet',
        step1Desc: 'Browse our catalog and select your favorite bouquet.',
        step2Title: 'Add to Bag or Order Directly',
        step2Desc: 'Click "Save for Later" to bag multiple items, or tap "Order via WhatsApp" for single-item order.',
        step3Title: 'Review in Bag',
        step3Desc: 'Open the Saved Items bag in the navbar to check items and tap "Checkout".',
        step4Title: 'Send to WhatsApp',
        step4Desc: 'Send the auto-filled order message to our Admin on WhatsApp.',
        step5Title: 'Fill Form & Get Invoice',
        step5Desc: 'Fill in card message and delivery address, then receive your invoice.',
        step6Title: 'Make Payment',
        step6Desc: 'Complete payment within the 2-hour grace period.',
        step7Title: 'Crafting & Delivery',
        step7Desc: 'We craft your fresh bouquet and dispatch it for pick-up or delivery (ready in 2 hours).',
      },
      deliverySteps: {
        step1Title: 'Operational Hours',
        step1Desc: 'Pick-up and GoSend delivery are available from 07:00 to 16:00 WIB.',
        step2Title: 'Ready Time',
        step2Desc: 'Orders are ready at least 2 hours after payment is confirmed.',
        step3Title: 'Delivery Fee',
        step3Desc: 'Delivery fee is calculated by address and paid together with the invoice.',
      },
      disclaimer: 'Note: Orders without payment after 2 hours will be cancelled automatically.',
    },
    // Browse & Products
    browse: {
      browseByCategory: 'Browse by Category',
      categoriesCount: 'Categories',
      selectCategoryToExplore: 'Select a category to explore products',
      noCategories: 'No categories available.',
      itemsCount: 'items',
      products: 'Products',
      page: 'Page',
      of: 'of',
      noProductsMatch: 'No products match your active filters.',
      clearFilters: 'Clear filters',
      reset: 'Reset',
      filter: 'Filter',
      prev: 'Previous',
      next: 'Next',
      backToCatalog: 'Back to Catalog',
      unableToLoad: 'Unable to load category',
      categoryNotFound: 'Category not found',
    },
    // Filter tokens
    filters: {
      price: 'Price',
      under100k: 'Under Rp 100.000',
      between100k250k: 'Rp 100.000 – Rp 250.000',
      between250k500k: 'Rp 250.000 – Rp 500.000',
      above500k: 'Above Rp 500.000',
      staffPick: 'Staff Pick',
      staffPicksOnly: 'Staff Picks Only',
      allProducts: 'All Products',
      flower: 'Flower',
      sort: 'Sort',
      priceLowToHigh: 'Price: Low to High',
      priceHighToLow: 'Price: High to Low',
      nameAToZ: 'Name: A to Z',
      staffPicksFirst: 'Staff Picks First',
    },
    // Product Detail Page
    productDetail: {
      saveForLater: 'Save for Later',
      savedInBag: 'Saved in Bag',
      addToCart: 'Save to Bag',
      clickButtonBelow: 'Click button below',
      orderViaWhatsApp: 'Order via WhatsApp',
      openingWhatsApp: 'Opening WhatsApp...',
      quantity: 'Quantity',
      description: 'Description',
      productDetails: 'Product Details',
      category: 'Category',
      priceLabel: 'Price',
      itemsIncluded: "What's Included",
      sizeGuide: 'Size Guide',
      staffPick: 'Staff Pick',
      productNotFound: 'Product Not Found',
      backToProducts: 'Back to Products',
    },
    // Saved Items Cart Drawer
    cart: {
      title: 'Saved Items',
      emptyTitle: 'Your bag is empty',
      emptyDesc: 'Save bouquets while browsing to view and checkout together here.',
      exploreCatalog: 'Explore Catalog',
      subtotal: 'Subtotal',
      total: 'Total',
      each: 'each',
      clearAll: 'Clear all items',
      checkout: 'Checkout',
      continueShopping: 'Continue Shopping',
      openingWhatsApp: 'Opening...',
    },
    // Search Modal
    search: {
      placeholder: 'Search products by name or flower...',
      noResults: 'No products found matching your search.',
      quickSearch: 'Popular Searches',
    },
    // Blog
    blog: {
      title: 'Blogs',
      noPosts: 'No blog posts available.',
      minRead: 'min read',
      read: 'READ →',
      backToBlog: 'Back to Blog',
      suggestedArticles: 'Suggested Articles',
    },
    // Footer
    footer: {
      tagline: 'Fresh handcrafted bouquets with contemporary elegance.',
      feedback: 'Have feedback? Feel free to send us a message.',
      craftedBy: 'Crafted by',
      rights: 'All rights reserved.',
      quickLinks: 'Quick Links',
      home: 'Home',
      bouquets: 'Bouquets',
      contact: 'Contact',
      resources: 'Resources',
      orderGuide: 'Order Guide',
      floralTips: 'Floral Tips',
      careGuide: 'Care Guide',
      helpCenter: 'Help Center',
      legal: 'Legal',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      madeIn: 'Made in',
    },
  },
  id: {
    // Navigation
    nav: {
      discover: 'Beranda',
      browse: 'Katalog',
      guide: 'Panduan',
      blog: 'Artikel',
      search: 'Cari',
      savedItems: 'Tas Belanja',
      menu: 'Menu',
      close: 'Tutup',
    },
    // Hero
    hero: {
      titleLine1: 'Anastasya',
      titleLine2: 'Bouquets',
      description:
        'Kami menghadirkan rangkaian bunga segar dengan sentuhan desain modern dan elegan, dirangkai sepenuh hati untuk menghadirkan keindahan di setiap momen istimewa. Setiap buket dan dekorasi bunga dirangkai menggunakan bunga segar pilihan berkualitas tinggi untuk memberikan kesan mewah dan tak terlupakan.',
      viewBouquets: 'Lihat Buket',
      shopNow: 'Pesan Sekarang!',
      flowerBouquetAlt: 'buket bunga',
    },
    // CTA & Category Section
    cta: {
      orderHere: 'Pesan Di Sini',
      orderHereDesc:
        'Siap mengirimkan hadiah yang tak terlupakan? Pilih buket favorit buatan tangan kami di bawah ini dan pesan hanya dalam beberapa langkah mudah.',
      clickMe: 'Klik di sini!',
      browseCollection: 'Lihat Koleksi',
      orderHereMobile: 'Pesan Di Sini.',
      noCategories: 'Kategori tidak ditemukan',
    },
    // Staff Picks / Best Selling
    staffPicks: {
      title: 'Produk Terlaris',
      subtitle:
        'Jelajahi koleksi bunga favorit pilihan kurasi florist berpengalaman kami.',
      staffPickBadge: 'Pilihan Florist',
    },
    // Latest Products
    latestProducts: {
      title: 'Koleksi Terbaru.',
      subtitle1:
        'Rangkaian buket bunga segar buatan tangan dengan desain modern, dirangkai sepenuh hati untuk merayakan momen paling berharga Anda.',
      subtitle2:
        'Terinspirasi oleh seni merangkai bunga modern, kami menciptakan buket elegan yang mengubah setiap momen sederhana menjadi istimewa.',
    },
    // FAQ
    faq: {
      badge: 'Pertanyaan Umum (FAQ)',
      title: 'Segala Hal yang Perlu Anda Ketahui',
      subtitle:
        'Segala hal yang perlu Anda ketahui tentang Anastasya Bouquet — mulai dari pemesanan, kustomisasi buket, pengiriman, hingga panduan perawatan bunga.',
    },
    // Order Guide Page
    guide: {
      title: 'Panduan Pemesanan',
      subtitle: 'Langkah mudah memesan, memilih ukuran buket, dan mengatur pengiriman.',
      howToOrderTitle: 'Cara Pemesanan',
      sizeChartTitle: 'Panduan Ukuran (Size Chart)',
      pickupDeliveryTitle: 'Pengambilan & Pengiriman',
      orderSteps: {
        step1Title: 'Pilih Buket',
        step1Desc: 'Jelajahi katalog kami dan pilih buket bunga favorit Anda.',
        step2Title: 'Simpan ke Tas atau Pesan Langsung',
        step2Desc: 'Klik "Simpan" untuk memilih beberapa item, atau klik "Pesan via WhatsApp" untuk satu buket.',
        step3Title: 'Cek di Tas Belanja',
        step3Desc: 'Buka menu Tas Belanja di bilah atas untuk memeriksa pesanan lalu klik "Checkout".',
        step4Title: 'Kirim ke WhatsApp',
        step4Desc: 'Kirim pesan rincian pesanan otomatis ke WhatsApp Admin kami.',
        step5Title: 'Isi Data & Terima Faktur',
        step5Desc: 'Isi pesan kartu ucapan dan alamat pengiriman, kemudian terima faktur/invoice.',
        step6Title: 'Lakukan Pembayaran',
        step6Desc: 'Selesaikan pembayaran dalam batas waktu 2 jam.',
        step7Title: 'Perangkaian & Pengiriman',
        step7Desc: 'Kami merangkai bunga segar dan menyiapkan pengambilan atau pengiriman (siap dalam 2 jam).',
      },
      deliverySteps: {
        step1Title: 'Jam Operasional',
        step1Desc: 'Pengambilan langsung dan pengiriman GoSend tersedia pukul 07:00 – 16:00 WIB.',
        step2Title: 'Waktu Proses',
        step2Desc: 'Pesanan siap diambil atau dikirim minimal 2 jam setelah pembayaran dikonfirmasi.',
        step3Title: 'Biaya Pengiriman',
        step3Desc: 'Ongkos kirim disesuaikan dengan alamat tujuan dan dibayarkan bersamaan dengan faktur.',
      },
      disclaimer: 'Catatan: Pesanan tanpa pembayaran setelah 2 jam akan dibatalkan secara otomatis.',
    },
    // Browse & Products
    browse: {
      browseByCategory: 'Jelajahi Berdasarkan Kategori',
      categoriesCount: 'Kategori',
      selectCategoryToExplore: 'Pilih kategori untuk melihat produk buket',
      noCategories: 'Belum ada kategori tersedia.',
      itemsCount: 'produk',
      products: 'Produk',
      page: 'Halaman',
      of: 'dari',
      noProductsMatch: 'Tidak ada produk yang cocok dengan filter aktif.',
      clearFilters: 'Hapus filter',
      reset: 'Reset',
      filter: 'Filter',
      prev: 'Sebelumnya',
      next: 'Selanjutnya',
      backToCatalog: 'Kembali ke Katalog',
      unableToLoad: 'Gagal memuat kategori',
      categoryNotFound: 'Kategori tidak ditemukan',
    },
    // Filter tokens
    filters: {
      price: 'Harga',
      under100k: 'Di bawah Rp 100.000',
      between100k250k: 'Rp 100.000 – Rp 250.000',
      between250k500k: 'Rp 250.000 – Rp 500.000',
      above500k: 'Di atas Rp 500.000',
      staffPick: 'Pilihan Florist',
      staffPicksOnly: 'Hanya Pilihan Florist',
      allProducts: 'Semua Produk',
      flower: 'Jenis Bunga',
      sort: 'Urutkan',
      priceLowToHigh: 'Harga: Rendah ke Tinggi',
      priceHighToLow: 'Harga: Tinggi ke Rendah',
      nameAToZ: 'Nama: A sampai Z',
      staffPicksFirst: 'Pilihan Florist Pertama',
    },
    // Product Detail Page
    productDetail: {
      saveForLater: 'Simpan ke Tas',
      savedInBag: 'Tersimpan di Tas',
      addToCart: 'Simpan ke Tas',
      clickButtonBelow: 'Klik tombol di bawah',
      orderViaWhatsApp: 'Pesan via WhatsApp',
      openingWhatsApp: 'Membuka WhatsApp...',
      quantity: 'Jumlah',
      description: 'Deskripsi',
      productDetails: 'Detail Produk',
      category: 'Kategori',
      priceLabel: 'Harga',
      itemsIncluded: 'Rincian Bunga & Item',
      sizeGuide: 'Panduan Ukuran',
      staffPick: 'Pilihan Florist',
      productNotFound: 'Produk Tidak Ditemukan',
      backToProducts: 'Kembali ke Produk',
    },
    // Saved Items Cart Drawer
    cart: {
      title: 'Tas Belanja',
      emptyTitle: 'Tas belanja Anda masih kosong',
      emptyDesc: 'Simpan buket saat menjelajah untuk melihat dan checkout bersamaan di sini.',
      exploreCatalog: 'Jelajahi Katalog',
      subtotal: 'Subtotal',
      total: 'Total',
      each: 'satuan',
      clearAll: 'Kosongkan tas',
      checkout: 'Checkout',
      continueShopping: 'Lanjut Belanja',
      openingWhatsApp: 'Membuka...',
    },
    // Search Modal
    search: {
      placeholder: 'Cari produk berdasarkan nama atau jenis bunga...',
      noResults: 'Tidak ada produk yang cocok dengan pencarian Anda.',
      quickSearch: 'Pencarian Populer',
    },
    // Blog
    blog: {
      title: 'Artikel & Berita',
      noPosts: 'Belum ada artikel yang dipublikasikan.',
      minRead: 'menit baca',
      read: 'BACA →',
      backToBlog: 'Kembali ke Artikel',
      suggestedArticles: 'Artikel Pilihan Lainnya',
    },
    // Footer
    footer: {
      tagline: 'Rangkaian buket bunga segar buatan tangan dengan estetika kontemporer.',
      feedback: 'Punya masukan atau pertanyaan? Hubungi kami kapan saja.',
      craftedBy: 'Dibuat oleh',
      rights: 'Hak cipta dilindungi undang-undang.',
      quickLinks: 'Tautan Cepat',
      home: 'Beranda',
      bouquets: 'Buket Bunga',
      contact: 'Kontak',
      resources: 'Informasi',
      orderGuide: 'Panduan Pesan',
      floralTips: 'Tips Bunga',
      careGuide: 'Panduan Perawatan',
      helpCenter: 'Pusat Bantuan',
      legal: 'Legalitas',
      privacyPolicy: 'Kebijakan Privasi',
      termsOfService: 'Syarat & Ketentuan',
      madeIn: 'Dibuat di',
    },
  },
} as const;

type DeepString<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepString<T[K]> : string;
};

export type TranslationKeys = DeepString<typeof translations.en>;
