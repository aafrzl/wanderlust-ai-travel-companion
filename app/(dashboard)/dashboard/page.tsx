import { auth } from "@/auth";
import TravelPlanCard from "@/components/cards/travel-plan-card";
import CreateTravelPlan from "@/components/modals/create-travel-plan";
import { readTravelPlans } from "@/helpers/functions/read-travel-plans";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const name = session.user?.name;

  const travelPlans = await readTravelPlans();

  return (
    <section className="container mx-auto flex flex-col gap-8 py-[60px] lg:py-14">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tighter">
          Welcome, {name}👋🏻
        </h1>
        <p>Let&apos;s get started by generating your travel plan. 🚀</p>
      </div>
      {travelPlans?.length === 0 && (
        <p className="text-lg font-semibold">
          You don&apos;t have any travel plans yet.
        </p>
      )}
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
          />
        ))}
      </div>
    </section>
  );
}
