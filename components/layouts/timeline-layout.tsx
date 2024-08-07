"use client";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";
import PlaceCard from "../cards/place-card";

interface TimelineLayoutProps {
  items: Itinerary[]; // Replace any[] with the actual type of items.
}

export const TimelineLayout = ({ items }: TimelineLayoutProps) => {
  return (
    <Timeline>
      {items.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineIcon />
            <TimelineTitle className="text-2xl font-bold">
              Day {item.day}
            </TimelineTitle>
          </TimelineHeader>
          <TimelineContent>
            {item.places.map((place, index) => (
              <PlaceCard
                key={index}
                place={place}
              />
            ))}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
