import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Footer from "../Components/Footer.jsx";

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "Simply enter your email address and continue. If you are new, an account will be created automatically for you.",
  },
  {
    question: "Do I need to verify my email?",
    answer:
      "Yes, we will send a verification link to your email to secure your account.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We support UPI, Credit/Debit Cards, Net Banking, and popular wallets.",
  },
  {
    question: "Can I return or cancel an order?",
    answer:
      "Yes, orders can be cancelled or returned within the return policy period mentioned on the product page.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
    <section className="max-w-5xl mx-auto px-4 py-20">
      <h2 className="text-4xl font-extrabold text-center mb-4 text-amber-500">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-gray-500 mb-12">
        Quick answers to common questions
      </p>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`rounded-3xl overflow-hidden transition-all duration-500 shadow-md border ${
              activeIndex === index
                ? "bg-amber-50 border-amber-400 shadow-amber-200"
                : "bg-white border-gray-200"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-6 text-left group"
            >
              <span className="text-lg font-semibold text-gray-800 group-hover:text-amber-500 transition-colors">
                {faq.question}
              </span>

              <span
                className={`flex items-center justify-center h-10 w-10 rounded-full transition-all duration-500 ${
                  activeIndex === index
                    ? "bg-amber-400 text-white rotate-180 scale-110"
                    : "bg-amber-100 text-amber-600"
                }`}
              >
                <ChevronDown className="h-5 w-5" />
              </span>
            </button>

            <div
              className={`grid transition-all duration-500 ease-in-out ${
                activeIndex === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden px-6 pb-6 text-gray-700 leading-relaxed">
                <div className="h-1 w-16 bg-amber-400 rounded-full mb-4 animate-pulse" />
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
     <Footer/>
    </>
  );
}
