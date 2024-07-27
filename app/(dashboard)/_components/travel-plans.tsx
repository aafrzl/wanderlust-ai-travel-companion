import TravelPlanCard from "@/components/cards/travel-plan-card";
import CreateTravelPlan from "@/components/modals/create-travel-plan";
import { TravelPlan } from "@prisma/client";
import React from "react";

interface TravelPlanWithImage extends TravelPlan {
  imageUrl: string | null;
  photographer: string | null;
}

interface Props {
  travelPlans: TravelPlanWithImage[];
}

export default function TravelPlans({ travelPlans }: Props) {
  return travelPlans.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <CreateTravelPlan />
      {travelPlans?.map((plan) => (
        <TravelPlanCard
          key={plan.id}
          imageUrl={plan.imageUrl}
          location={plan.location}
          days={plan.days}
          people={plan.people}
          budget={plan.budget}
          photographer={plan.photographer}
          travelPlanId={plan.id}
        />
      ))}
    </div>
  ) : (
    <CreateTravelPlan />
  );
}
