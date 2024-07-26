"use server";
import prisma from "@/lib/prisma";
import { getLocationImagesPixabay } from "@/lib/unsplash/generate-image-url";
import { TravelPlan } from "@prisma/client";

interface TravelPlanWithImage extends TravelPlan {
  imageUrl: string | null;
  photographer: string | null;
}

export async function readTravelPlans(user_id: string): Promise<TravelPlanWithImage[] | null> {
  if (user_id === undefined) {
    return null;
  }

  try {
    const travelPlans = await prisma.travelPlan.findMany({
      where: {
        userId: user_id,
      },
    });

    const travelPlansWithImages = await Promise.all(
      travelPlans.map(async (plan) => {
        try {
          const images = await getLocationImagesPixabay(plan.location);
          if (images.length > 0) {
            return {
              ...plan,
              imageUrl: images[0].url,
              photographer: images[0].photographer,
            };
          }
        } catch (error) {
          console.error(
            `Failed to fetch image for travel plan ${plan.id}: ${error}`
          );
        }
        return { ...plan, imageUrl: null, photographer: null };
      })
    );

    return travelPlansWithImages;
  } catch (error) {
    console.error(`Failed to fetch travel plans: ${error}`);
    return null;
  }
}
