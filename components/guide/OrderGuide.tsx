/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingBag,
  CheckCircle2,
  MessageCircle,
  FileText,
  CreditCard,
  Flower2,
  Truck,
  Clock,
  MapPin,
} from 'lucide-react';
import Timeline, { type TimelineItem } from '@/components/ui/timeline-04';
import { useLanguage } from '@/contexts/LanguageContext';

export interface SizeOption {
  label: string;
  imageSrc: string;
  alt: string;
}

const defaultSizeOptions: SizeOption[] = [
  {
    label: 'S',
    imageSrc: '/assets/smallsize.png',
    alt: 'Size S bouquet size chart',
  },
  {
    label: 'M',
    imageSrc: '/assets/mediumsize.png',
    alt: 'Size M bouquet size chart',
  },
  {
    label: 'L',
    imageSrc: '/assets/largesize.png',
    alt: 'Size L bouquet size chart',
  },
];

export default function OrderGuide() {
  const { t } = useLanguage();

  const orderSteps: TimelineItem[] = [
    {
      title: t.guide.orderSteps.step1Title,
      icon: Search,
      description: (
        <span>
          {t.guide.orderSteps.step1Desc.split('catalog')[0]}
          <Link
            href="/browse"
            className="text-primary font-medium underline underline-offset-4 hover:opacity-80"
          >
            {t.nav.browse.toLowerCase()}
          </Link>
          {t.guide.orderSteps.step1Desc.includes('catalog')
            ? t.guide.orderSteps.step1Desc.split('catalog')[1]
            : ''}
        </span>
      ),
    },
    {
      title: t.guide.orderSteps.step2Title,
      icon: ShoppingBag,
      description: <span>{t.guide.orderSteps.step2Desc}</span>,
    },
    {
      title: t.guide.orderSteps.step3Title,
      icon: CheckCircle2,
      description: <span>{t.guide.orderSteps.step3Desc}</span>,
    },
    {
      title: t.guide.orderSteps.step4Title,
      icon: MessageCircle,
      description: (
        <span>
          {t.guide.orderSteps.step4Desc}{' '}
          <a
            href="https://wa.me/62895375681188"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium underline underline-offset-4 hover:opacity-80"
          >
            +62 895-3756-81188
          </a>
        </span>
      ),
    },
    {
      title: t.guide.orderSteps.step5Title,
      icon: FileText,
      description: <span>{t.guide.orderSteps.step5Desc}</span>,
    },
    {
      title: t.guide.orderSteps.step6Title,
      icon: CreditCard,
      description: <span>{t.guide.orderSteps.step6Desc}</span>,
    },
    {
      title: t.guide.orderSteps.step7Title,
      icon: Flower2,
      description: <span>{t.guide.orderSteps.step7Desc}</span>,
    },
  ];

  const deliverySteps: TimelineItem[] = [
    {
      title: t.guide.deliverySteps.step1Title,
      icon: Clock,
      description: <span>{t.guide.deliverySteps.step1Desc}</span>,
    },
    {
      title: t.guide.deliverySteps.step2Title,
      icon: Truck,
      description: <span>{t.guide.deliverySteps.step2Desc}</span>,
    },
    {
      title: t.guide.deliverySteps.step3Title,
      icon: MapPin,
      description: <span>{t.guide.deliverySteps.step3Desc}</span>,
    },
  ];

  return (
    <div className="w-full space-y-12 md:space-y-16">
      {/* Page Header */}
      <div className="text-center space-y-3 border-b pb-12 sm:pb-16 md:pb-20">
        <h1 className="text-4xl sm:text-5xl md:text-5xl font-normal tracking-tighter text-neutral-900 dark:text-neutral-100 leading-[0.95]">
          {t.guide.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          {t.guide.subtitle}
        </p>
      </div>

      {/* 1. "How to Order" Section */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100">
            {t.guide.howToOrderTitle}
          </h2>
        </div>

        {/* Timeline representation for steps */}
        <div className="pt-2">
          <Timeline items={orderSteps} />
        </div>

        {/* Small disclaimer text (italicized) */}
        <p className="text-xs sm:text-sm text-muted-foreground italic pt-2 pl-4 sm:pl-5">
          {t.guide.disclaimer}
        </p>
      </section>

      {/* Subtle Divider */}
      <div className="border-t border-border/60" />

      {/* 2. "Size Chart" Section */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100">
            {t.guide.sizeChartTitle}
          </h2>
        </div>

        {/* 3 images arranged horizontally (3-column grid) */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {defaultSizeOptions.map((size) => (
            <div key={size.label} className="group flex flex-col items-center cursor-pointer">
              <div className="relative w-full overflow-hidden bg-transparent aspect-2/3 sm:aspect-3/4">
                <img
                  src={size.imageSrc}
                  alt={size.alt}
                  className="h-full w-full object-contain group-hover:border"
                />
              </div>
              <span className="mt-2 sm:mt-3 text-base sm:text-lg font-medium text-foreground tracking-wide text-center">
                {size.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="border-t border-border/60" />

      {/* 3. "Pick up & Delivery" Section */}
      <section className="space-y-6 pb-6">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100">
            {t.guide.pickupDeliveryTitle}
          </h2>
        </div>

        {/* Timeline representation for delivery points */}
        <div className="pt-2">
          <Timeline items={deliverySteps} />
        </div>
      </section>
    </div>
  );
}

