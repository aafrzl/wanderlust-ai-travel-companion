import { BackgroundBeams } from "@/components/ui/background-beams";
import ButtonCTA from "@/components/ui/button-cta";
import { Session } from "next-auth";

export default function CTASection({ session }: { session: Session | null }) {
  return (
    <div className="flex py-28 sm:py-14 px-2 sm:px-10 mt-4">
      <div className="flex items-center justify-center p-8 bg-secondary rounded-xl text-center w-full relative">
        <div className="flex flex-col items-center text-center gap-4 max-w-xl z-10">
          <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight">
            Ready to Plan Your
            <br /> Next Adventure?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Unlock the power of personalized travel planning with our AI Travel
            Planner. Start your journey today and make your next trip
            unforgettable.
          </p>
          {session ? (
            <ButtonCTA
              url="/dashboard"
              title="Create Your First Trip"
            />
          ) : (
            <ButtonCTA
              url="/auth/login"
              title="Get Started Now"
            />
          )}
        </div>
        <BackgroundBeams />
      </div>
    </div>
  );
}
