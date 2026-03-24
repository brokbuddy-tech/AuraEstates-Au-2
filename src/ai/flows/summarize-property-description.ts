'use server';
/**
 * @fileOverview A Genkit flow for summarizing property descriptions.
 *
 * - summarizePropertyDescription - A function that generates a concise, AI-generated summary of property descriptions.
 * - PropertyDescriptionInput - The input type for the summarizePropertyDescription function.
 * - PropertySummaryOutput - The return type for the summarizePropertyDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PropertyDescriptionInputSchema = z.object({
  description: z
    .string()
    .describe('The full, detailed description of a property.'),
});
export type PropertyDescriptionInput = z.infer<
  typeof PropertyDescriptionInputSchema
>;

const PropertySummaryOutputSchema = z.object({
  summary: z.array(z.string()).describe('A list of concise bullet points summarizing the property description, highlighting key features and selling points.'),
});
export type PropertySummaryOutput = z.infer<typeof PropertySummaryOutputSchema>;

export async function summarizePropertyDescription(
  input: PropertyDescriptionInput
): Promise<PropertySummaryOutput> {
  return summarizePropertyDescriptionFlow(input);
}

const summarizePropertyDescriptionPrompt = ai.definePrompt({
  name: 'summarizePropertyDescriptionPrompt',
  input: {schema: PropertyDescriptionInputSchema},
  output: {schema: PropertySummaryOutputSchema},
  prompt: `You are an expert real estate agent tasked with summarizing property descriptions.

Read the following property description and extract the most important key features and selling points.
Present these as a concise list of bullet points.

Property Description:
{{{description}}}`,
});

const summarizePropertyDescriptionFlow = ai.defineFlow(
  {
    name: 'summarizePropertyDescriptionFlow',
    inputSchema: PropertyDescriptionInputSchema,
    outputSchema: PropertySummaryOutputSchema,
  },
  async (input) => {
    const {output} = await summarizePropertyDescriptionPrompt(input);
    return output!;
  }
);
