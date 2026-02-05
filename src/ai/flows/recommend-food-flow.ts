'use server';
/**
 * @fileOverview AI Food Recommendation Flow for Slice & Spice.
 * 
 * This flow takes user preferences and suggests the best items from the Slice & Spice menu.
 * Includes retry logic to handle transient API quota or rate limit errors.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecommendFoodInputSchema = z.object({
  preference: z.string().describe('User preference, e.g., "something spicy", "healthy lunch", "party for 4"'),
});

const RecommendFoodOutputSchema = z.object({
  recommendations: z.array(z.object({
    itemId: z.number(),
    reason: z.string().describe('Why this item fits the preference'),
  })),
  pairingTip: z.string().describe('A suggestion for a drink or spice pairing'),
});

export type RecommendFoodInput = z.infer<typeof RecommendFoodInputSchema>;
export type RecommendFoodOutput = z.infer<typeof RecommendFoodOutputSchema>;

const prompt = ai.definePrompt({
  name: 'recommendFoodPrompt',
  input: { schema: RecommendFoodInputSchema },
  output: { schema: RecommendFoodOutputSchema },
  prompt: `You are the Slice & Spice Taste Assistant. Your goal is to help users find the perfect meal.
  
  Current Menu Items:
  1. Classic Margherita (Pizza) - $14.99: Fresh basil, buffalo mozzarella.
  2. Fiery Pepperoni (Pizza) - $16.99: Spicy pepperoni, chili flakes.
  3. Signature Gold Burger (Burger) - $18.99: Aged beef, truffle mayo.
  4. Crispy Sriracha Chicken (Burger) - $15.99: Double-breaded, honey sriracha.
  5. Truffle Fries (Snack) - $7.99: Double-fried, truffle oil.
  6. Giant Onion Rings (Snack) - $6.99: Golden beer batter.
  7. Artisanal Latte (Drink) - $5.49: Locally roasted.
  8. Fresh Mint Lemonade (Drink) - $4.99: Cold-pressed.

  User Preference: {{{preference}}}

  Provide 2 recommendations from the menu and a specific pairing tip that highlights our bold flavors. Be enthusiastic and premium in your tone.`,
});

/**
 * Helper to retry a function if it fails due to rate limits or quota issues.
 */
async function retryWithBackoff<T>(fn: () => Promise<T>, retries = 2, delay = 2000): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    const errorMessage = error.message?.toLowerCase() || '';
    const isRetryable = errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('rate limit');
    
    if (retries > 0 && isRetryable) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryWithBackoff(fn, retries - 1, delay * 1.5);
    }
    throw error;
  }
}

export async function recommendFood(input: RecommendFoodInput): Promise<RecommendFoodOutput> {
  const result = await retryWithBackoff(() => prompt(input));
  if (!result.output) throw new Error('AI failed to generate recommendation');
  return result.output;
}
