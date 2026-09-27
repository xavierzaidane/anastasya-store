'use client'

import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { BlurredStagger } from '@/components/ui/text-reveal-faqs'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FaqLanding() {
  const { isID } = useLanguage()

  const faqItems = isID
    ? [
        {
          id: 'item-1',
          question: 'Produk apa saja yang tersedia di Anastasya Bouquet?',
          answer:
            'Anastasya Bouquet menyediakan berbagai buket bunga segar, buket wisuda, buket hadiah, dan desain bunga kustom untuk berbagai momen spesial.',
        },
        {
          id: 'item-2',
          question: 'Apakah saya bisa memesan buket dengan desain kustom?',
          answer:
            'Ya, tentu saja. Kami menyediakan layanan kustomisasi sesuai jenis bunga, palet warna, anggaran, dan tema acara yang Anda inginkan.',
        },
        {
          id: 'item-3',
          question: 'Apakah tersedia layanan pengiriman?',
          answer:
            'Ya. Anastasya Bouquet menyediakan pengiriman kurir GoSend instan untuk memastikan rangkaian bunga Anda tiba dalam kondisi segar dan rapi.',
        },
        {
          id: 'item-4',
          question: 'Bagaimana cara melakukan pemesanan?',
          answer:
            'Anda dapat memilih buket langsung melalui situs ini dan melanjutkan pemesanan cepat via WhatsApp resmi kami.',
        },
        {
          id: 'item-5',
          question: 'Untuk momen apa saja buket bunga ini cocok?',
          answer:
            'Buket kami sangat ideal untuk ulang tahun, kelulusan/wisuda, anniversary, pernikahan, hari ibu, maupun kejutan berharga lainnya.',
        },
      ]
    : [
        {
          id: 'item-1',
          question: 'What products does Anastasya Bouquet offer?',
          answer:
            'Anastasya Bouquet offers a variety of fresh flower bouquets, gift bouquets, graduation bouquets, and custom floral designs for special occasions.',
        },
        {
          id: 'item-2',
          question: 'Can I request a custom bouquet design?',
          answer:
            'Yes. We provide custom bouquet services based on your preferred flowers, colors, budget, and occasion to create a personalized arrangement.',
        },
        {
          id: 'item-3',
          question: 'Do you provide delivery services?',
          answer:
            'Yes. Anastasya Bouquet offers delivery services to ensure your flowers arrive fresh and beautifully arranged at the desired location.',
        },
        {
          id: 'item-4',
          question: 'How do I place an order?',
          answer:
            'You can place an order through our website and easily complete it via our official WhatsApp customer service.',
        },
        {
          id: 'item-5',
          question: 'What occasions are your bouquets suitable for?',
          answer:
            'Our bouquets are perfect for birthdays, graduations, anniversaries, weddings, Valentine’s Day, Mother’s Day, and many other special celebrations.',
        },
      ]

  return (
    <section className="py-16 md:py-24 ">
      <div className="mx-auto w-full px-6 text-center md:text-left">
        <div className="grid gap-8 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-2">
            <h2 className="text-neutral-900 text-4xl md:text-5xl font-normal tracking-tighter leading-[0.95]">
              {isID ? 'Pertanyaan Umum (FAQ)' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-muted-foreground mt-4 text-balance text-lg">
              {isID
                ? 'Segala hal yang perlu Anda ketahui tentang Anastasya Bouquet'
                : 'Everything you need to know about Anastasya Bouquet'}
            </p>
          </div>

          <div className="md:col-span-3">
            <Accordion
              type="single"
              collapsible>
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-gray-200 dark:border-gray-600">
                  <AccordionTrigger className="cursor-pointer text-base font-medium hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <BlurredStagger text={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <p className="text-muted-foreground mt-6 md:hidden">
            {isID ? (
              <>
                Tidak menemukan jawaban yang Anda cari? Hubungi{' '}
                <Link
                  href="/contact"
                  className="text-primary font-medium hover:underline">
                  tim layanan pelanggan kami
                </Link>
              </>
            ) : (
              <>
                Can&apos;t find what you&apos;re looking for? Contact our{' '}
                <Link
                  href="/contact"
                  className="text-primary font-medium hover:underline">
                  customer support team
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  )
}