"use client";

import { useState } from "react";

const faqs = [
  {
    question: "When will NearBy launch?",
    answer:
      "We're in active development and plan to launch in select neighborhoods first. Join the waitlist to be notified the moment your area is added. We're prioritizing communities where demand is strongest.",
  },
  {
    question: "How is NearBy different from Facebook Marketplace or Craigslist?",
    answer:
      "Facebook Marketplace and Craigslist connect you with anyone — often strangers you'll never see again. NearBy is restricted to verified residents of your actual neighborhood. Every member has confirmed their home address, creating a layer of accountability that anonymous platforms simply cannot offer.",
  },
  {
    question: "Is my address kept private?",
    answer:
      "Yes. Your exact address is never shown to other users. We verify it behind the scenes to confirm you belong to a neighborhood, but your listing shows only your general area — not your front door.",
  },
  {
    question: "What does it cost to use NearBy?",
    answer:
      "NearBy will be free for basic buying and selling. We may introduce optional premium features in the future, but the core marketplace — listing items, browsing, messaging neighbors — will always be free.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-4 block">
            FAQ
          </span>
          <h2 className="heading-serif text-section-title text-charcoal">
            Honest Answers
          </h2>
          <div className="section-divider mx-auto mt-6" />
        </div>

        {/* FAQ items */}
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-charcoal/10 last:border-b-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-5 text-left group"
                aria-expanded={openIndex === index}
              >
                <span className="heading-serif text-lg text-charcoal group-hover:text-gold transition-colors duration-200 pr-4">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:border-gold/30 transition-colors duration-200">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className={`text-charcoal/40 transition-transform duration-300 ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                  >
                    <line x1="7" y1="1" x2="7" y2="13" />
                    <line x1="1" y1="7" x2="13" y2="7" />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${
                  openIndex === index ? "max-h-48 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-sm leading-relaxed text-charcoal/55 font-light pr-12">
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
