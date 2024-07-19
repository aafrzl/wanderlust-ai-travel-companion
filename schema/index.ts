import { z } from "zod";

export type TravelPlanType = z.infer<typeof TravelPlanSchema>;

export const TravelPlanSchema = z.object({
  location: z.string().min(1, { message: "Location required" }),
  days: z
    .number()
    .int()
    .positive()
    .min(1, { message: "Days must be at least 1" }),
  people: z.coerce
    .number()
    .int()
    .positive()
    .min(1, { message: "People must be at least 1" }),
  budget: z.union([
    z.enum(["low", "medium", "high"]),
    z.string().optional(),
  ]),
});
