import TravelPlanCard from "@/components/cards/travel-plan-card";
import CreateTravelPlan from "@/components/modals/create-travel-plan";
import { readTravelPlans } from "@/helpers/functions/read-travel-plans";

export default async function TravelPlans({ user_id }: { user_id: string }) {
  const travelPlans = await readTravelPlans(user_id!);

  return travelPlans?.length! > 0 ? (
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
