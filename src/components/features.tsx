import { BarChart, Cpu, Lightbulb } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: <Cpu className="h-8 w-8 text-primary" />,
    title: "Reveal Tech Stacks",
    description: "Instantly identify the frameworks, libraries, and services your competitors are built on.",
    delay: "0.2s",
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "Identify Key Features",
    description: "Our AI dissects websites to highlight core functionalities and unique value propositions.",
    delay: "0.4s",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: "Gain Actionable Insights",
    description: "Receive strategic recommendations to inform your product roadmap and marketing strategy.",
    delay: "0.6s",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-12 sm:py-24 bg-card/20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            Uncover What Powers Your Competition
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            CompetitorLens goes beyond the surface to give you a strategic advantage.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: feature.delay }}>
              <Card className="h-full bg-card/50 text-center transition-transform duration-300 hover:scale-105 hover:shadow-primary/10 shadow-lg">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-headline">{feature.title}</CardTitle>
                  <CardDescription className="pt-2">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
