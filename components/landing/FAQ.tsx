'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FaqLanding() {
    const faqItems = [
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
      'You can place an order through our website, social media channels, or by contacting our customer service team directly for assistance.',
  },
  {
    id: 'item-5',
    question: 'What occasions are your bouquets suitable for?',
    answer:
      'Our bouquets are perfect for birthdays, graduations, anniversaries, weddings, Valentine’s Day, Mother’s Day, and many other special celebrations.',
  },
]

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto w-full px-6">
                <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                    <div className="md:col-span-2 -mb-5">
                         <p className="text-muted-foreground mt-4 text-balance text-lg">Your questions answered</p>
                        <h2 className="text-foreground text-4xl font-medium">Frequently Asked Questions</h2>
                    </div>

                    <div className="md:col-span-3">
                        <Accordion
                            type="single"
                            collapsible>
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}>
                                    <AccordionTrigger className="cursor-pointer text-base hover:text-gray-700">{item.question}</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-base">{item.answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <p className="text-muted-foreground mt-6 md:hidden">
                        Can&apos;t find what you&apos;re looking for? Contact our{' '}
                        <Link
                            href="#"
                            className="text-primary font-medium hover:underline">
                            customer support team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}