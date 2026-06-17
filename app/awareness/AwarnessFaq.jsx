"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import FAQS from "../constants/FAQ";
function FAQItem({ faq, isOpen, onToggle }) {
    return (
        <div
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen
                    ? "border-blue-600 bg-blue-900/20"
                    : "border-gray-700 bg-gray-900 hover:border-gray-900"
                }`}
        >
            {/* Question row */}
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
                <span
                    className={`text-sm font-semibold leading-snug ${isOpen
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-100"
                        }`}
                >
                    {faq.question}
                </span>
                <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen
                            ? "rotate-180 text-blue-500"
                            : "text-gray-400"
                        }`}
                />
            </button>

            {/* Answer */}
            <div
                className={`grid transition-all duration-200 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
            >
                <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function FAQSection() {
    const [openId, setOpenId] = useState(1); // first open by default

    return (
        <section className="w-full bg-gray-50 dark:bg-gray-950">
            {/* Constrained content */}
            <div className="max-w-4xl mx-auto px-4 py-12">

                {/* Header */}
                <div className="flex flex-col items-center text-center gap-3 mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-700 bg-purple-900/20 text-purple-400 text-xs font-semibold uppercase tracking-widest">
                        <HelpCircle className="w-3.5 h-3.5" />
                        FAQ
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-sm text-gray-400 max-w-md">
                        Quick answers to the most common flood safety questions.
                    </p>
                </div>

                {/* Accordion */}
                <div className="flex flex-col gap-3">
                    {FAQS.map((faq) => (
                        <FAQItem
                            key={faq.id}
                            faq={faq}
                            isOpen={openId === faq.id}
                            onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
