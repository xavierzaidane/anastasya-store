import React from 'react';
import ProductDetailPageClient from '@/components/products/ProductDetailPageClient';
import StoreNavbar from '@/components/navigations/StoreNavbar';
import Footer from '@/components/navigations/Footer';
import { mapApiProductToStorefront } from '@/lib/storefront-products';
import prisma from '@/lib/prisma';
import { StorefrontApiProduct } from '@/types/storefront';

interface PageProps {
  params: Promise<{ products: string; slug: string }>;
}

export default async function ProductDetail({ params }: PageProps) {
  const { slug, products } = await params;

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const apiProduct: StorefrontApiProduct = {
      ...(product as unknown as StorefrontApiProduct),
      price: Number(product.price),
    };

    const storefront = mapApiProductToStorefront(apiProduct, product.category?.slug || products || 'general');

    return (
      <section className="w-full min-h-screen">
        <StoreNavbar />

        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto mt-20">
          <ProductDetailPageClient initialProduct={storefront} />
        </div>

    
      </section>
    );
  } catch (err) {
    return (
      <section className="w-full min-h-screen">
        <StoreNavbar />

        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto mt-20 flex items-center justify-center min-h-[50vh]">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
            <p className="text-sm text-zinc-600">Unable to load product details.</p>
          </div>
        </div>

    
      </section>
    );
  }
}
