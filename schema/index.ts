import { z } from "zod";

export type TravelPlanType = z.infer<typeof TravelPlanSchema>;

export const TravelPlanSchema = z.object({
  location: z.string().min(1, { message: "Location required" }),
  days: z
    .number()
    .int()
    .positive()
    .min(1, { message: "Days must be at least 1" }),
  activities: z.array(z.string()),
  people: z.string().min(1, { message: "People required" }),
  budget: z.union([z.enum(["low", "medium", "high"]), z.string().optional()]),
});
