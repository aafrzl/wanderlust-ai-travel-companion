import { auth } from "@/auth";
import CreateTravelPlan from "@/components/modals/create-travel-plan";
import { readTravelPlans } from "@/helpers/functions/read-travel-plans";
import { redirect } from "next/navigation";

//TODO: Show data travel plan in dashboard
//TODO: Make cards for each travel plan data and show photo of the location using (Google Photo API)

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const name = session.user?.name;

  const travelPlans = await readTravelPlans();

  return (
    <section className="container flex flex-col gap-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tighter">
          Welcome, {name}👋🏻
        </h1>
        <p>Let&apos;s get started by generating your travel plan. 🚀</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CreateTravelPlan />
      </div>
    </section>
  );
}
