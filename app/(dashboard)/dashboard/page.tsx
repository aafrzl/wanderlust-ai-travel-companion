import { auth } from "@/auth";
import CreateTravelPlan from "@/components/modals/create-travel-plan";
import { readTravelPlans } from "@/helpers/functions/read-travel-plans";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import TravelPlans from "../_components/travel-plans";
import { TravelPlanCardSkeleton } from "../_components/travel-skeleton-card";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const name = session.user?.name;
  const user_id = session.user?.id;

  return (
    <section className="container mx-auto flex flex-col gap-8 py-[60px] lg:py-14">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tighter">
          Welcome, {name}👋🏻
        </h1>
        <p className="text-base sm:text-lg font-medium">
          Let&apos;s get started by generating your travel plan. 🚀
        </p>
      </div>
      <Suspense fallback={<TravelPlansSkeletonLoader />}>
        <TravelPlans user_id={user_id!} />
      </Suspense>
    </section>
  );
}

function TravelPlansSkeletonLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <CreateTravelPlan />
      {[...Array(5)].map((_, index) => (
        <TravelPlanCardSkeleton key={index} />
      ))}
    </div>
  );
}
