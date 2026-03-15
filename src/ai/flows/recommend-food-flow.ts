"use server";

import { ai } from "../genkit";
import { z } from "zod";

export const recommendFood = ai.defineFlow(
  {
    name: "recommendFood",
    inputSchema: z.object({
      preference: z.string()
    }),
    outputSchema: z.string()
  } as any, 

  async ({ preference }) => {
    const response = await ai.generate({
      // Ensure your model is specified here
      prompt: `Suggest a menu item from Slice & Spice for someone who likes ${preference}`
    });

    // CHANGE: Removed the () from text()
    return response.text; 
  }
);