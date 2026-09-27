import Header from "@/components/header";
import Hero from "@/components/hero";
import Features from "@/components/features";
import AIDemo from "@/components/ai-demo";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <AIDemo />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
