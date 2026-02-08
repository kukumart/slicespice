'use server';
/**
 * @fileOverview AI Food Recommendation Flow for Slice & Spice.
 * 
 * This flow takes user preferences and suggests the best items from the Slice & Spice menu.
 * Enhanced with robust fallbacks to prevent Internal Server Errors when AI is unavailable.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecommendFoodInputSchema = z.object({
  preference: z.string().describe('User preference, e.g., "something spicy", "healthy lunch"'),
  userName: z.string().optional().describe('The name of the user for personalization'),
});

const RecommendFoodOutputSchema = z.object({
  recommendations: z.array(z.object({
    itemId: z.number(),
    reason: z.string().describe('Why this item fits the preference'),
    chefsNote: z.string().describe('A premium insight from the head chef about this item'),
  })),
  pairingTip: z.string().describe('A suggestion for a drink or spice pairing'),
});

export type RecommendFoodInput = z.infer<typeof RecommendFoodInputSchema>;
export type RecommendFoodOutput = z.infer<typeof RecommendFoodOutputSchema>;

/**
 * Recommended fallback data in case AI services are unavailable or keys are missing.
 */
const FALLBACK_RECOMMENDATION: RecommendFoodOutput = {
  recommendations: [
    { 
      itemId: 1, 
      reason: "Our most beloved masterpiece, perfect for any mood.", 
      chefsNote: "Our 48-hour fermented sourdough is the soul of our pizza, providing a complex flavor profile that standard dough lacks." 
    },
    { 
      itemId: 3, 
      reason: "The definition of luxury and our signature bold burger.", 
      chefsNote: "The truffle oil we use is sourced from the heart of Umbria, ensuring the ultimate gold standard of infusion." 
    }
  ],
  pairingTip: "Pair with our Fresh Mint Lemonade for a crisp, artisanal finish."
};

const recommendFoodPrompt = ai.definePrompt({
  name: 'recommendFoodPrompt',
  input: { schema: RecommendFoodInputSchema },
  output: { schema: RecommendFoodOutputSchema },
  prompt: `You are the Slice & Spice Head Taste Curator. Your goal is to guide {{#if userName}}{{userName}}{{else}}our guest{{/if}} to the perfect meal masterpiece.
  
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

  Provide 2 curated recommendations. For each, include a "chefsNote" that explains a technical culinary detail. Be sophisticated, authoritative, and welcoming.`,
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
      console.warn("AI Generation unavailable, using Gold Standard fallback:", error);
      return FALLBACK_RECOMMENDATION;
    }
  }
);

export async function recommendFood(input: RecommendFoodInput): Promise<RecommendFoodOutput> {
  // Check for API keys before attempting flow to prevent server-side crash
  const hasKey = !!(process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY);
  
  if (!hasKey) {
    return FALLBACK_RECOMMENDATION;
  }

  try {
    return await recommendFoodFlow(input);
  } catch (error: any) {
    console.error("AI Flow Execution Failure:", error);
    return FALLBACK_RECOMMENDATION;
  }
}
