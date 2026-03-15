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
  },

  async ({ preference }) => {
    const response = await ai.generate({
      prompt: `Suggest a menu item from Slice & Spice for someone who likes ${preference}`
    });

    return response.text();
  }
);