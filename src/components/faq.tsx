import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is CompetitorLens?",
    answer:
      "CompetitorLens is an AI-powered tool that analyzes your competitors' websites. It provides valuable insights into their technology stack, key features, and overall strategy, helping you make smarter business decisions.",
  },
  {
    question: "How does the AI analysis work?",
    answer:
      "Our advanced AI models scan the provided website URL, examining its code, structure, and content. It identifies known technologies, extracts key user-facing features, and synthesizes this information into actionable insights about the competitor's strategy.",
  },
  {
    question: "Who is this tool for?",
    answer:
      "CompetitorLens is designed for entrepreneurs, product managers, marketers, and developers who want to gain a competitive edge. It's perfect for market research, feature planning, and understanding the competitive landscape.",
  },
  {
    question: "When will CompetitorLens be available?",
    answer:
      "We are working hard to launch soon! By joining our waitlist, you'll be the first to know when we go live and will receive an exclusive early-bird discount.",
  },
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
};

export default function FAQ() {
  return (
    <section id="faq" className="py-12 sm:py-24 bg-card/20">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions? We have answers.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-lg text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
