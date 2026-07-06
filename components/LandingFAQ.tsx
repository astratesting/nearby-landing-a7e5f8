'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'How is NearBy different from Facebook Marketplace?',
    answer:
      'Facebook Marketplace connects you with strangers — often anonymous accounts with no verification. NearBy requires government ID verification, limits transactions to a 2-mile radius, and ensures you\'re dealing with verified neighbors who have a real stake in your community.',
  },
  {
    question: 'What kind of items can I sell?',
    answer:
      'Baby gear, furniture, electronics, household items, clothing, sports equipment, and more — as long as it\'s legal and local. We focus on the items neighbors actually need and use every day.',
  },
  {
    question: 'Is there a fee?',
    answer:
      'NearBy charges a small buyer-side service fee (5%) to keep the platform safe, verified, and spam-free. Listing items is free. No hidden costs, no subscription — just a transparent fee that funds trust and verification.',
  },
  {
    question: 'When will NearBy launch in my neighborhood?',
    answer:
      'We\'re launching in select neighborhoods soon and rolling out based on demand. Join the waitlist and we\'ll notify you the moment your area goes live. The more neighbors from your area who sign up, the sooner you get access.',
  },
  {
    question: 'How does the ID verification work?',
    answer:
      'You upload a government-issued ID plus proof of address. We verify your identity, confirm you reside within your stated neighborhood, and issue a Neighborhood Badge. Your personal information is never shared with other users — we only confirm that you\'re a verified resident.',
  },
];

export default function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-warm-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-[11px] font-semibold tracking-[0.2em] uppercase text-honey mb-4 block"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            FAQ
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-product-charcoal"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Honest Answers
          </h2>
          <div className="w-12 h-[2px] bg-honey/30 mx-auto mt-6" />
        </div>

        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-stone-100 last:border-b-0">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-5 text-left group"
                aria-expanded={openIndex === index}
              >
                <span
                  className="text-base md:text-lg font-semibold text-product-charcoal group-hover:text-violet transition-colors duration-200 pr-4"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {faq.question}
                </span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center group-hover:border-violet/30 transition-colors">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className={`text-product-charcoal/30 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-45' : ''
                    }`}
                  >
                    <line x1="7" y1="1" x2="7" y2="13" />
                    <line x1="1" y1="7" x2="13" y2="7" />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${
                  openIndex === index ? 'max-h-96 pb-5' : 'max-h-0'
                }`}
              >
                <p
                  className="text-sm leading-relaxed text-product-charcoal/55 pr-12"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}