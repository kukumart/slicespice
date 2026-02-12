'use server';
/**
 * @fileOverview AI Food Recommendation Flow for Slice & Spice.
 * 
 * This flow takes user preferences and suggests the best items from the Slice & Spice menu.
 * Simplified for easy reading by everyone.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecommendFoodInputSchema = z.object({
  preference: z.string().describe('What the user likes, e.g., "cheesy pizza", "juicy burger"'),
  userName: z.string().optional().describe('The name of the user'),
});

const RecommendFoodOutputSchema = z.object({
  recommendations: z.array(z.object({
    itemId: z.number(),
    reason: z.string().describe('Why this food is good for them'),
    chefsNote: z.string().describe('A fun fact about the food'),
  })),
  pairingTip: z.string().describe('A suggestion for a yummy drink to go with it'),
});

export type RecommendFoodInput = z.infer<typeof RecommendFoodInputSchema>;
export type RecommendFoodOutput = z.infer<typeof RecommendFoodOutputSchema>;

/**
 * Fallback data if the AI is busy.
 */
const FALLBACK_RECOMMENDATION: RecommendFoodOutput = {
  recommendations: [
    { 
      itemId: 1, 
      reason: "Everyone loves our cheese pizza!", 
      chefsNote: "We let our pizza dough rest for a long time so it's super soft." 
    },
    { 
      itemId: 3, 
      reason: "Our gold burger is big and super juicy.", 
      chefsNote: "The bread is colored like real gold and tastes amazing." 
    }
  ],
  pairingTip: "Try it with our fresh lemonade for a perfect meal!"
};

const recommendFoodPrompt = ai.definePrompt({
  name: 'recommendFoodPrompt',
  input: { schema: RecommendFoodInputSchema },
  output: { schema: RecommendFoodOutputSchema },
  prompt: `You are the Slice & Spice Head Chef. Your goal is to help {{#if userName}}{{userName}}{{else}}our friend{{/if}} find the perfect yummy meal.
  
  Use simple and friendly words that a 10-year-old would understand.

  Current Menu Items:
  1. Cheese Pizza - $14.99: Lots of cheese and fresh tomato sauce.
  2. Spicy Meat Pizza - $16.99: Spicy meat and lots of cheese.
  3. Special Gold Burger - $18.99: Juicy beef with gold-colored bread.
  4. Crunchy Chicken Burger - $15.99: Crunchy fried chicken with a little spicy sauce.
  5. Special Tasty Fries - $7.99: Crunchy potato fries with yummy oil.
  6. Crunchy Onion Rings - $6.99: Fried onion circles.
  7. Fluffy Coffee - $5.49: Warm coffee with fluffy milk.
  8. Minty Lemonade - $4.99: Cold lemon juice with mint.

  What they like: {{{preference}}}

  Give 2 suggestions. For each, include a "chefsNote" that tells them something fun about the food. Be very friendly and welcoming.`,
});

const recommendFoodFlow = ai.defineFlow(
  {
    name: 'recommendFoodFlow',
    inputSchema: RecommendFoodInputSchema,
    outputSchema: RecommendFoodOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await recommendFoodPrompt(input);
      if (!output) return FALLBACK_RECOMMENDATION;
      return output;
    } catch (error) {
      console.warn("AI busy, using fallback:", error);
      return FALLBACK_RECOMMENDATION;
    }
  }
);

export async function recommendFood(input: RecommendFoodInput): Promise<RecommendFoodOutput> {
  const hasKey = !!(process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY);
  
  if (!hasKey) {
    return FALLBACK_RECOMMENDATION;
  }

  try {
    return await recommendFoodFlow(input);
  } catch (error: any) {
    console.error("AI Flow error:", error);
    return FALLBACK_RECOMMENDATION;
  }
}
