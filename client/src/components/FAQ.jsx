import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const FAQ = () => {
  const { navigate } = useAppContext();
  
  // State to manage which FAQ item is expanded
  const [openIndex, setOpenIndex] = useState(null);

  // Sample FAQ data (can be moved to assets or fetched from API)
  const faqs = [
    {
      question: 'How does GroceryGo ensure the freshness of groceries?',
      answer: 'We partner with trusted local suppliers and use advanced logistics to ensure all groceries are delivered fresh to your door. Our quality control team checks every item before dispatch.'
    },
    {
      question: 'What payment methods are accepted on GroceryGo?',
      answer: 'We accept payments via Credit/Debit Cards, UPI, Net Banking, and Cash on Delivery (COD). All transactions are secured with industry-standard encryption.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order is confirmed, you can track it in real-time from the "My Orders" section in your account. You’ll also receive email and SMS updates on your order status.'
    },
    {
      question: 'What is GroceryGo’s return and refund policy?',
      answer: 'If you’re not satisfied with your order, you can request a return or refund within 7 days of delivery. Please visit our Return and Refund page for detailed instructions.'
    },
    {
      question: 'Can I become a seller on GroceryGo?',
      answer: 'Yes! If you’re a supplier or retailer, you can register as a seller by visiting the Seller Login page and following the onboarding process.'
    }
  ];

  // Toggle FAQ item expansion
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 text-center mb-12">
            Everything you need to know about shopping with{' '}
            <span className="text-primary">GroceryGo</span>.
          </p>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg bg-white shadow-sm"
              >
                <button
                  className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <span className="text-primary text-xl">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="p-4 pt-0">
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Still have questions?{' '}
              <span
                onClick={() => navigate('/contact')}
                className="text-primary hover:underline cursor-pointer"
              >
                Contact our support team
              </span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;