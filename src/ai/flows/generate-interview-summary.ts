'use server';

/**
 * @fileOverview A flow to generate a summary of an interview, highlighting the candidate's strengths,
 * weaknesses, and overall suitability for the role.
 *
 * - generateInterviewSummary - A function that handles the interview summary generation process.
 * - GenerateInterviewSummaryInput - The input type for the generateInterviewSummary function.
 * - GenerateInterviewSummaryOutput - The return type for the generateInterviewSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInterviewSummaryInputSchema = z.object({
  interviewTranscript: z
    .string()
    .describe('The transcript of the interview.'),
  jobDescription: z
    .string()
    .describe('The description of the job the candidate is interviewing for.'),
});
export type GenerateInterviewSummaryInput = z.infer<
  typeof GenerateInterviewSummaryInputSchema
>;

const GenerateInterviewSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the interview.'),
  strengths: z.string().describe('The candidate\'s strengths.'),
  weaknesses: z.string().describe('The candidate\'s weaknesses.'),
  overallSuitability: z
    .string()
    .describe('The candidate\'s overall suitability for the role.'),
  recommendation: z
    .string()
    .describe('A recommendation on whether to hire the candidate.'),
});
export type GenerateInterviewSummaryOutput = z.infer<
  typeof GenerateInterviewSummaryOutputSchema
>;

export async function generateInterviewSummary(
  input: GenerateInterviewSummaryInput
): Promise<GenerateInterviewSummaryOutput> {
  return generateInterviewSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInterviewSummaryPrompt',
  input: {schema: GenerateInterviewSummaryInputSchema},
  output: {schema: GenerateInterviewSummaryOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing job interview transcripts for hiring managers.

  Given the interview transcript and job description, generate a concise summary of the interview,
  highlight the candidate's key strengths and weaknesses, assess their overall suitability for the role,
  and provide a clear recommendation on whether to hire the candidate.

  Interview Transcript: {{{interviewTranscript}}}

  Job Description: {{{jobDescription}}}

  Format your response as follows:

  Summary: [A brief overview of the interview and the candidate's performance]
  Strengths: [List of the candidate's key strengths demonstrated during the interview]
  Weaknesses: [List of the candidate's weaknesses or areas for improvement]
  Overall Suitability: [Your assessment of the candidate's fit for the role based on the interview]
  Recommendation: [Your recommendation on whether to hire the candidate (Strong Hire / Hire / Maybe / No Hire)]`,
});

const generateInterviewSummaryFlow = ai.defineFlow(
  {
    name: 'generateInterviewSummaryFlow',
    inputSchema: GenerateInterviewSummaryInputSchema,
    outputSchema: GenerateInterviewSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
