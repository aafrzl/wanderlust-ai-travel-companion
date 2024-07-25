"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { TravelPlan } from "@prisma/client";

export async function readTravelPlans() {
  //Get session
  const session = await auth();

  if (!session || session.user?.id === undefined) {
    return Error("Unauthorized");
  }

  try {
    const travelPlans = await prisma.travelPlan.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return travelPlans as TravelPlan[];
  } catch (error) {
    console.error(`Failed to fetch travel plans: ${error}`);
    return null;
  }
}
