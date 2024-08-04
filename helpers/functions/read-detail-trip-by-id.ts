"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function readDetailTripById(
  trip_id: string,
  user_id: string
): Promise<TravelPlan | null> {
  if (user_id === undefined) redirect("/auth/login");

  if (trip_id === undefined) return null;

  try {
    const travelPlan = await prisma.travelPlan.findUnique({
      where: {
        id: trip_id,
        userId: user_id,
      },
      include: {
        EmergencyNumbers: true,
        LifeQualityIndices: true,
        WifiInformation: true,
        hotels: true,
        itinerary: {
          include: {
            places: true,
          },
        },
      },
    });

    return travelPlan;
  } catch (error) {
    console.error(`Failed to fetch travel plans: ${error}`);
    return null;
  }
}
