"use server"
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deletePlan(travelPlanId: string) {
  if (!travelPlanId) {
    throw new Error("Travel Plan ID is required");
  }

  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.travelPlan.delete({
      where: {
        id: travelPlanId,
        userId: session.user?.id,
      },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error when deleting travel plan", error);
    throw new Error("Error when deleting travel plan");
  }
}
