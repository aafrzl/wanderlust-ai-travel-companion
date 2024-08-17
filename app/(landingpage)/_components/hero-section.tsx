"use client";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import ButtonCTA from "@/components/ui/button-cta";
import { Calendar } from "@/components/ui/calendar";
import { globeConfig, sampleDataArcs } from "@/constants";
import {
  CalendarIcon,
  GlobeIcon,
  MoveRight,
  PlaneIcon,
  WalletIcon,
} from "lucide-react";
import { Session } from "next-auth";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const World = dynamic(() => import("@/components/world").then((m) => m.World), {
  ssr: false,
});

const features = [
  {
    Icon: PlaneIcon,
    name: "Plan your trip",
    description: "Our AI will help you plan your trip.",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/75 to-transparent z-10" />
        <Image
          src="/hero-card-image-1.jpg"
          fill
          className="absolute inset-0 object-cover"
          alt="Budget your trip"
        />
      </div>
    ),
  },
  {
    Icon: GlobeIcon,
    name: "Explore the world",
    description: "Discover new places and cultures.",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute top-0 w-full h-[40rem]">
        <World
          globeConfig={globeConfig}
          data={sampleDataArcs}
        />
      </div>
    ),
  },
  {
    Icon: WalletIcon,
    name: "Budget your trip",
    description: "Set your budget and let us do the rest.",
    background: (
      <div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/75 to-transparent z-10" />
        <Image
          src="/hero-card-image-2.jpg"
          fill
          className="absolute inset-0 object-cover"
          alt="Budget your trip"
        />
      </div>
    ),
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: CalendarIcon,
    name: "Choose a date",
    description: "Select a date for your trip.",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
];

export default function HeroSection({ session }: { session: Session | null }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-40 sm:py-36 px-2 sm:px-10">
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl sm:text-5xl font-bold text-foreground tracking-tight">
          Create Your Travel Plan With Us AI Travel{" "}
          <span className="text-4xl sm:text-7xl tracking-normal word-animation font-extrabold uppercase">
            Companion.
          </span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed py-8">
          A smart solution for{" "}
          <span className="font-semibold underline">savvy travelers</span> and
          companies, offering personalized AI-driven travel planning worldwide.
        </p>
        {session ? (
          <ButtonCTA
            url="/dashboard"
            title="Start Your Plan"
          />
        ) : (
          <ButtonCTA
            url="/auth/login"
            title="Get Started"
          />
        )}
      </div>
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard
            key={idx}
            {...feature}
          />
        ))}
      </BentoGrid>
    </section>
  );
}