import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
  category: "Rider" | "Driver" | "Admin";
};

const faqs: FAQ[] = [
  // Rider
  {
    category: "Rider",
    question: "How do I request a ride?",
    answer:
      "Open the app, set your pickup and destination, then confirm your ride request.",
  },
  {
    category: "Rider",
    question: "Can I track my driver in real-time?",
    answer:
      "Yes, you can see your driver’s location and estimated arrival time on the map.",
  },
  {
    category: "Rider",
    question: "What payment options are available?",
    answer: "You can pay using credit card, debit card, or mobile wallets.",
  },

  // Driver
  {
    category: "Driver",
    question: "How do I accept or reject ride requests?",
    answer:
      "When a ride request comes in, you’ll receive a notification and can accept or reject directly from the app.",
  },
  {
    category: "Driver",
    question: "Where can I see my earnings?",
    answer:
      "Your earnings dashboard is available inside the driver app under 'Earnings'.",
  },
  {
    category: "Driver",
    question: "How do I update my profile?",
    answer:
      "You can edit your profile details and documents from the 'Profile Management' section.",
  },

  // Admin
  {
    category: "Admin",
    question: "How does ride management work?",
    answer:
      "Admins can view, edit, and monitor all rides through the admin dashboard.",
  },
  {
    category: "Admin",
    question: "Can admins manage users?",
    answer:
      "Yes, admins can activate, deactivate, or view details of all users.",
  },
  {
    category: "Admin",
    question: "Does the admin panel have analytics?",
    answer:
      "Yes, the dashboard includes reports on rides, revenue, and user activity.",
  },
];

const FAQ = () => {
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    acc[faq.category] = acc[faq.category] || [];
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);
  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-12 space-y-8">
      <section className="relative bg-gray-200 dark:bg-gray-900 text-primary px-6 py-16 text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-md md:text-xl max-w-2xl mx-auto mb-6">
          Have questions about our ride-sharing platform? Find answers for
          Riders, Drivers, and Admins below, or search for specific topics.
        </p>

        <Input
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 mx-auto"
        />
      </section>

      {/* FAQ Groups */}
      <div className="space-y-10">
        {Object.entries(groupedFaqs).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {category} FAQs
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {items.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`${category}-${index}`}
                  className="border rounded-lg px-4"
                >
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        {filteredFaqs.length === 0 && (
          <p className="text-center text-muted-foreground">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default FAQ;
