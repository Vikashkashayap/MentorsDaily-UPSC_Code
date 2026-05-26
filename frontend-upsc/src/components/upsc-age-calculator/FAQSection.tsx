import { memo } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { FAQ_ITEMS } from "./faqData";

function FAQSectionComponent() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16" aria-labelledby="faq-heading">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2
          id="faq-heading"
          className="mb-2 text-center text-3xl font-bold text-gray-900 dark:text-white"
        >
          UPSC Age Calculator — FAQs
        </h2>
        <p className="mb-8 text-center text-gray-600 dark:text-gray-400">
          Common questions about UPSC age limit, eligibility by DOB, and attempts
        </p>
        <Accordion type="single" collapsible className="rounded-2xl border border-gray-200/80 bg-white/80 px-6 dark:border-gray-700 dark:bg-gray-900/60">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}

export const FAQSection = memo(FAQSectionComponent);
