import WaitlistForm from "./waitlist-form";

export default function Hero() {
  return (
    <section id="hero" className="py-20 sm:py-32">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline">
            See Your Competitors&apos; Next Move,{" "}
            <span className="text-primary">Before They Make It.</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            Join the waitlist for CompetitorLens and unlock the power of AI to
            decode any website&apos;s tech stack, features, and strategy. Gain an
            unfair advantage.
          </p>
        </div>
        <div id="waitlist" className="mt-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
