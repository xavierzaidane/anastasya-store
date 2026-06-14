'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FaqLanding() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'How does LearnIndo help me learn Indonesian?',
            answer:
            'LearnIndo combines interactive lessons, AI-powered conversations, pronunciation practice, and daily exercises to help you learn Indonesian naturally.',
        },
        {
            id: 'item-2',
            question: 'Is LearnIndo suitable for beginners?',
            answer:
            'Yes. LearnIndo is designed for learners of all levels, including complete beginners. You can start with basic greetings, pronunciation, and essential vocabulary.',
        },
        {
            id: 'item-3',
            question: 'How does the AI learning coach work?',
            answer:
            'Our AI coach personalizes your learning experience by analyzing your progress, strengths, and practice habits.',
        },
        {
            id: 'item-4',
            question: 'Can I practice speaking Indonesian?',
            answer:
            'Absolutely. LearnIndo includes conversation practice, pronunciation feedback, and real-life dialogue simulations designed to help you speak Indonesian more naturally and confidently in everyday situations.',
        },
        {
            id: 'item-5',
            question: 'Can I learn at my own pace?',
            answer:
            'Yes. LearnIndo is built for flexible learning, allowing you to study whenever and wherever you want. Short daily lessons and personalized recommendations make it easy to stay consistent without feeling overwhelmed.',
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