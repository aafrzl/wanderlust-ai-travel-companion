import { auth } from "@/auth";
import FormGeneratePlan from "@/components/forms/form-generate-plan";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const name = session.user?.name;

  return (
    <section className="container flex flex-col gap-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tighter">
          Welcome, {name}👋🏻
        </h1>
        <p>Let&apos;s get started by generating your travel plan. 🚀</p>
      </div>
      <div className="p-6 border rounded-md shadow-md">
        <FormGeneratePlan />
      </div>
    </section>
  );
}
