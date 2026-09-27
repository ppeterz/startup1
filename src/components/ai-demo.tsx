"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { runAnalysis, type AnalysisState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Cpu, Lightbulb, Zap, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const initialState: AnalysisState = {
  data: {
    techStack: "Example: React, Next.js, Vercel, Tailwind CSS, Stripe.",
    keyFeatures: "Example: AI-driven analysis, Real-time data, PDF exports, Team collaboration.",
    actionableInsights: "Example: Competitor A focuses on enterprise clients, suggesting a gap in the SMB market.",
  },
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto rounded-xl">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        "Analyze"
      )}
    </Button>
  );
}

export default function AIDemo() {
  const [state, formAction] = useActionState(runAnalysis, initialState);

  return (
    <section id="demo" className="py-12 sm:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            See the Magic in Action
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Enter a competitor&apos;s URL to see how CompetitorLens instantly
            delivers powerful insights.
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <form action={formAction} className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <div className="flex-grow">
                <Input
                  name="competitorUrl"
                  placeholder="e.g., https://stripe.com"
                  className="h-12 rounded-xl text-base"
                  required
                />
                 {state?.errors?.competitorUrl && (
                  <p className="text-sm text-destructive mt-1">{state.errors.competitorUrl[0]}</p>
                 )}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
        
        {state?.message && !state.data && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Analysis Failed</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{state?.data?.techStack}</p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{state?.data?.keyFeatures}</p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Actionable Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{state?.data?.actionableInsights}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
