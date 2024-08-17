import ReviewCard from "@/components/cards/review-card";
import Marquee from "@/components/ui/marquee";
import { reviews } from "@/constants";
import React from "react";

export default function TestimonialSection() {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  const thirdRow = reviews.slice(reviews.length / 2);

  return (
    <section className="flex flex-col gap-4 py-28 sm:py-14 px-2 sm:px-10 mt-4">
      <div className="space-y-2">
        <h2 className="text-4xl sm:text-5xl font-bold">
          See What Our Users Are Saying
        </h2>
        <p className="text-muted-foreground">
          Discover how our AI Travel Planner is transforming travel experiences
          for users like you.
        </p>
      </div>
      <div className="relative flex h-[500px] w-full flex-col gap-4 items-center justify-center overflow-hidden">
        <Marquee
          pauseOnHover
          className="[--duration:120s]"
        >
          {firstRow.map((review, idx) => (
            <ReviewCard
              key={idx}
              img={review.img}
              name={review.name}
              username={review.username}
              body={review.body}
            />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          className="[--duration:120s]"
        >
          {secondRow.map((review, idx) => (
            <ReviewCard
              key={idx}
              img={review.img}
              name={review.name}
              username={review.username}
              body={review.body}
            />
          ))}
        </Marquee>
        <Marquee
          pauseOnHover
          className="[--duration:120s]"
        >
          {thirdRow.map((review, idx) => (
            <ReviewCard
              key={idx}
              img={review.img}
              name={review.name}
              username={review.username}
              body={review.body}
            />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-muted" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-muted" />
      </div>
    </section>
  );
}
