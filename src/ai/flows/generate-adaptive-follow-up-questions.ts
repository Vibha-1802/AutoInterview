'use server';

/**
 * @fileOverview Generates adaptive follow-up questions based on a candidate's previous answer.
 *
 * - generateAdaptiveFollowUpQuestions - A function that generates follow-up questions.
 * - GenerateAdaptiveFollowUpQuestionsInput - The input type for the generateAdaptiveFollowUpQuestions function.
 * - GenerateAdaptiveFollowUpQuestionsOutput - The return type for the generateAdaptiveFollowUpQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAdaptiveFollowUpQuestionsInputSchema = z.object({
  question: z.string().describe('The original interview question.'),
  answer: z.string().describe('The candidate\'s answer to the original question.'),
  role: z.string().describe('The role the candidate is interviewing for (e.g., SDE-DSA, Frontend, Backend, HR).'),
  difficulty: z.string().describe('The difficulty level of the interview (e.g., Easy, Medium, Hard).'),
});
export type GenerateAdaptiveFollowUpQuestionsInput = z.infer<typeof GenerateAdaptiveFollowUpQuestionsInputSchema>;

const GenerateAdaptiveFollowUpQuestionsOutputSchema = z.object({
  followUpQuestions: z.array(z.string()).describe('An array of follow-up questions based on the candidate\'s answer.'),
});
export type GenerateAdaptiveFollowUpQuestionsOutput = z.infer<typeof GenerateAdaptiveFollowUpQuestionsOutputSchema>;

export async function generateAdaptiveFollowUpQuestions(
  input: GenerateAdaptiveFollowUpQuestionsInput
): Promise<GenerateAdaptiveFollowUpQuestionsOutput> {
  return generateAdaptiveFollowUpQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAdaptiveFollowUpQuestionsPrompt',
  input: {schema: GenerateAdaptiveFollowUpQuestionsInputSchema},
  output: {schema: GenerateAdaptiveFollowUpQuestionsOutputSchema},
  prompt: `You are an AI interview conductor. Your role is to generate relevant and insightful follow-up questions based on the candidate\'s answer to an initial interview question. The goal is to assess the candidate\'s skills and knowledge in more depth.

Original Question: {{{question}}}
Candidate\'s Answer: {{{answer}}}
Role: {{{role}}}
Difficulty: {{{difficulty}}}

Generate 3-5 follow-up questions that delve deeper into the candidate\'s understanding and experience related to the original question and their answer. Ensure that the follow-up questions are relevant to the role and difficulty level specified. Return the follow up questions in array format.

Follow-up Questions:`,
});

const generateAdaptiveFollowUpQuestionsFlow = ai.defineFlow(
  {
    name: 'generateAdaptiveFollowUpQuestionsFlow',
    inputSchema: GenerateAdaptiveFollowUpQuestionsInputSchema,
    outputSchema: GenerateAdaptiveFollowUpQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
