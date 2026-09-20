import type { Metadata } from 'next';
import StoreNavbar from '@/components/navigations/StoreNavbar';
import OrderGuide from '@/components/guide/OrderGuide';

export const metadata: Metadata = {
  title: 'Order Guide | Anastasya Bouquets',
  description: 'How to order, bouquet size chart, and pick-up & delivery guidelines for Anastasya Bouquets.',
};

export default function GuidePage() {
  return (
    <section className="w-full min-h-screen">
      <StoreNavbar />
      <main className="container mx-auto px-6 md:px-10 lg:px-12 max-w-7xl pt-32 sm:pt-36 md:pt-40 pb-20">
        <OrderGuide />
      </main>
    </section>
  );
}

