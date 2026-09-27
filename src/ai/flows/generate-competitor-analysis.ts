'use server';
/**
 * @fileOverview AI competitor analysis flow that analyzes a competitor's website and identifies their tech stack and key features.
 *
 * - generateCompetitorAnalysis - A function that initiates the competitor analysis process.
 * - GenerateCompetitorAnalysisInput - The input type for the generateCompetitorAnalysis function.
 * - GenerateCompetitorAnalysisOutput - The return type for the generateCompetitorAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCompetitorAnalysisInputSchema = z.object({
  competitorUrl: z.string().url().describe('The URL of the competitor website to analyze.'),
});
export type GenerateCompetitorAnalysisInput = z.infer<typeof GenerateCompetitorAnalysisInputSchema>;

const GenerateCompetitorAnalysisOutputSchema = z.object({
  techStack: z.string().describe('A summary of the technologies used by the competitor website.'),
  keyFeatures: z.string().describe('A description of the key features offered by the competitor website.'),
  actionableInsights: z.string().describe('Actionable insights derived from the competitor analysis.'),
});
export type GenerateCompetitorAnalysisOutput = z.infer<typeof GenerateCompetitorAnalysisOutputSchema>;


const fetchWebsiteContentTool = ai.defineTool(
    {
      name: 'fetchWebsiteContent',
      description: 'Fetches the HTML content of a given URL.',
      inputSchema: z.object({ url: z.string().url() }),
      outputSchema: z.string(),
    },
    async ({ url }: { url: string }) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
      } catch (e: unknown) {
        // Return a descriptive error message to the model.
        const errorMessage = e instanceof Error ? e.message : 'Unknown error';
        return `Failed to fetch content from ${url}. Error: ${errorMessage}`;
      }
    }
  );

export async function generateCompetitorAnalysis(input: GenerateCompetitorAnalysisInput): Promise<GenerateCompetitorAnalysisOutput> {
  return generateCompetitorAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'competitorAnalysisPrompt',
  input: {schema: GenerateCompetitorAnalysisInputSchema},
  output: {schema: GenerateCompetitorAnalysisOutputSchema},
  tools: [fetchWebsiteContentTool],
  prompt: `You are an AI expert in analyzing competitor websites.
  Your goal is to analyze the given competitor website URL and identify their tech stack, key features, and provide actionable insights.

  First, use the fetchWebsiteContent tool to get the HTML content of the website: {{{competitorUrl}}}
  Then, analyze the HTML content to determine the technologies used, the main features, and derive actionable insights.

  Provide the analysis in the following format:
  {
    "techStack": "A summary of the technologies used by the competitor website.",
    "keyFeatures": "A description of the key features offered by the competitor website.",
    "actionableInsights": "Actionable insights derived from the competitor analysis."
  }`,
});

const generateCompetitorAnalysisFlow = ai.defineFlow(
  {
    name: 'generateCompetitorAnalysisFlow',
    inputSchema: GenerateCompetitorAnalysisInputSchema,
    outputSchema: GenerateCompetitorAnalysisOutputSchema,
  },
  async (input: GenerateCompetitorAnalysisInput) => {
    const {output} = await prompt(input);
    return output!;
  }
);
