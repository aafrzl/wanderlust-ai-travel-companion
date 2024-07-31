import { auth } from "@/auth";
import BlurImage from "@/components/blur-image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { readDetailTripById } from "@/helpers/functions/read-detail-trip-by-id";
import { getPhotoForPlace } from "@/lib/foursquare/foursquare";
import { getLocationImagesPixabay } from "@/lib/unsplash/generate-image-url";
import { formatCurrency, placeholderBlurhash } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";

import "@smastrom/react-rating/style.css";
import HotelCard from "@/components/cards/hotel-card";

interface Props {
  params: {
    trip_id: string;
  };
}

export default async function DetailTrip({ params }: Props) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const detailTrip = await readDetailTripById(
    params.trip_id,
    session.user?.id!
  );

  if (!detailTrip) {
    return notFound();
  }

  const budget = detailTrip.budget;

  // Fetch banner photo for the location
  const locationPhoto = await getLocationImagesPixabay(detailTrip.location);

  return (
    <section className="container mx-auto flex flex-col gap-8 py-[60px] lg:py-14">
      <div className="relative w-full h-[200px] sm:h-[400px]">
        <BlurImage
          src={locationPhoto[0].url || "/placeholder-image.webp"}
          alt={detailTrip.location}
          fill
          className="rounded-md object-cover aspect-video"
          placeholder="blur"
          blurDataURL={placeholderBlurhash}
        />
        <div className="absolute z-10 bottom-0 left-0 bg-black/75 rounded-tr-md text-white p-2 w-full sm:max-w-lg">
          <h1 className="text-lg lg:text-xl font-bold">
            Your trip to {detailTrip.location} for {detailTrip.days} days
          </h1>
        </div>
        <div className="absolute z-10 top-0 right-0 lg:bottom-0 lg:top-auto bg-black/75 rounded-bl-md rounded-tl-none lg:rounded-tl-md lg:rounded-bl-none text-white p-2">
          <p className="font-semibold text-muted-foreground text-xs lg:text-base">
            Photo by {locationPhoto[0].photographer} on{" "}
            <a
              href="https://pixabay.com"
              target="_blank"
            >
              PixaBay
            </a>
          </p>
        </div>
      </div>
      <p className="font-medium">
        {detailTrip.people} people are going on this trip with{" "}
        {budget === "high" || budget === "medium" || budget === "low" ? (
          <span>{budget.charAt(0).toUpperCase() + budget.slice(1)} Budget</span>
        ) : (
          <span>budget {formatCurrency(budget)}</span>
        )}
      </p>
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-xl font-bold tracking-tight">
          Recommendation Hotels
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {detailTrip.hotels.map((hotel, index) => (
            <HotelCard
              key={index}
              hotel={hotel}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start">
        <h2>Itenerary</h2>
      </div>
    </section>
  );
}
