import FeatureCard from "@/components/cards/feature-card";
import { features } from "@/constants";

export default function FeaturesSection() {
  return (
    <section className="flex flex-col gap-8 py-28 sm:py-14 px-2 sm:px-10 relative my-10">
      <div className="text-center space-y-2">
        <h2 className="text-4xl sm:text-5xl font-bold">
          Revolutionize Your Travel Plans with AI
        </h2>
        <p className="text-muted-foreground">
          Effortless Itineraries and Stress-Free Travel—All in One Smart
          Platform.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {features.map((feature, idx) => (
          <FeatureCard
            key={idx}
            title={feature.title}
            description={feature.description}
            icon={<feature.icon className="size-12" />}
            index={idx}
          />
        ))}
      </div>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] rounded-2xl shadow-xl shadow-card" />
    </section>
  );
}
