/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { MessageCircle, FileText, CreditCard, PackageCheck } from 'lucide-react';

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
  const steps = [
    {
      number: 1,
      icon: MessageCircle,
      content: (
        <span>
          Contact our Admin during operational hours at{' '}
          <a
            href="https://wa.me/62895375681188"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            +62 895-3756-81188
          </a>
        </span>
      ),
    },
    {
      number: 2,
      icon: FileText,
      content: <span>Fill out the order form provided by the admin</span>,
    },
    {
      number: 3,
      icon: CreditCard,
      content: (
        <span>
          Once the admin issues the invoice, the client can make the payment{' '}
          <span className="text-muted-foreground font-medium">(2-hour grace period)</span>
        </span>
      ),
    },
    {
      number: 4,
      icon: PackageCheck,
      content: (
        <span>
          The client&apos;s order will be processed after payment is made{' '}
          <span className="text-muted-foreground font-medium">(2-hour assembly time)</span>
        </span>
      ),
    },
  ];

  const deliveryPoints = [
    'Self Pick-up/GoSend Delivery available from 07:00 to 16:00 WIB',
    'Pick-up/Delivery available at least 2 hours after payment',
    'Delivery fee is paid together with the bouquet payment; please ensure the fee matches the delivery destination address',
  ];

  return (
    <div className="w-full space-y-12 md:space-y-16">
      {/* Page Header */}
      <div className="text-center space-y-3 border-b pb-30">
        <h1 className="text-4xl sm:text-5xl md:text-5xl font-normal tracking-tighter text-neutral-900 dark:text-neutral-100 leading-[0.95]">
          Order Guide
        </h1>

      </div>

      {/* 1. "How to Order" Section */}
      <section className="space-y-6 -pt-10 ">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100">
            How to Order
          </h2>
        </div>

        {/* 4 Steps arranged vertically: [sequence number] + [small icon] + [step text] */}
        <div className="space-y-3 sm:space-y-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex items-center gap-3 sm:gap-4 py-2 sm:py-2.5 group"
              >
                {/* [sequence number] */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary text-secondary-foreground font-semibold text-xs sm:text-sm flex items-center justify-center shrink-0">
                  {step.number}
                </div>

                {/* [small icon] */}
                <div className="w-5 h-5 flex items-center justify-center text-primary shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* [step text] */}
                <div className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-snug">
                  {step.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Small disclaimer text (italicized) */}
        <p className="text-xs sm:text-sm text-muted-foreground italic pt-2">
          Disclaimer: If payment is not made within the grace period, the order will be automatically cancelled.
        </p>
      </section>

      {/* Subtle Divider */}
      <div className="border-t border-border/60" />

      {/* 2. "Size Chart" Section */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100">
            Size Chart
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
                  className="h-full w-full object-contain  group-hover:border"

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
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100">
            Pick up &amp; Delivery
          </h2>
        </div>

        {/* Numbered list (1, 2, 3) */}
        <div className="space-y-3 sm:space-y-4">
          {deliveryPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-3 sm:gap-4 py-1.5 sm:py-2"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-secondary text-secondary-foreground font-semibold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {point}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
