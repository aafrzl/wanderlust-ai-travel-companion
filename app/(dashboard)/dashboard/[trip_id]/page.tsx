import { auth } from "@/auth";
import BlurImage from "@/components/blur-image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { readDetailTripById } from "@/helpers/functions/read-detail-trip-by-id";
import { getPhotoForPlace } from "@/lib/foursquare/foursquare";
import { getLocationImagesPixabay } from "@/lib/unsplash/generate-image-url";
import {
  budgetEstimate,
  formatCurrency,
  placeholderBlurhash,
} from "@/lib/utils";
import { notFound, redirect } from "next/navigation";

import "@smastrom/react-rating/style.css";
import HotelCard from "@/components/cards/hotel-card";
import { HeartHandshakeIcon, Phone, Wifi } from "lucide-react";

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
    <section className="flex flex-col gap-8">
      <div className="relative w-full h-[200px] sm:h-[400px]">
        <BlurImage
          src={locationPhoto[0].url || "/placeholder-image.webp"}
          alt={detailTrip.location}
          fill
          className="object-cover aspect-video"
          placeholder="blur"
          blurDataURL={placeholderBlurhash}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
        <div className="absolute z-10 bottom-0 right-0 bg-black/75 rounded-tl-md text-white p-2">
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
        <div className="absolute z-10 bottom-3 left-4 sm:bottom-5 sm:left-5 max-w-2xl space-y-3 text-white">
          <p className="font-semibold text-base sm:text-lg">Destination Trip</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl uppercase">
            {detailTrip.location}
          </h1>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-8 py-5">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">
              About {detailTrip.location}
            </h2>
            <p className="text-muted-foreground">{detailTrip.description}</p>
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-x-2">
              <div className="p-1 rounded-full bg-card-foreground/75">
                <Wifi className="w-5 h-5 shrink-0 text-muted" />
              </div>
              <h3 className="text-base font-semibold tracking-tight sm:text-lg md:text-xl">
                Wifi Information
              </h3>
            </div>
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-x-2">
              <div className="p-1 rounded-full bg-card-foreground/75">
                <Phone className="w-5 h-5 shrink-0 text-muted" />
              </div>
              <h3 className="text-base font-semibold tracking-tight sm:text-lg md:text-xl">
                Emergency Information
              </h3>
            </div>
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-x-2">
              <div className="p-1 rounded-full bg-card-foreground/75">
                <HeartHandshakeIcon className="w-5 h-5 shrink-0 text-muted" />
              </div>
              <h3 className="text-base font-semibold tracking-tight sm:text-lg md:text-xl">
                Life Quality Indices
              </h3>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">
            Details of the trip
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-semibold tracking-tight sm:text-lg md:text-xl">
                Budget for the trip :
              </h3>
              <p className="text-muted-foreground">
                <span className="mr-1">
                  {budget === "high" || budget === "medium" || budget === "low"
                    ? budget.charAt(0).toUpperCase() + budget.slice(1)
                    : formatCurrency(budget)}
                </span>
                {budgetEstimate(budget)}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:m-auto">
              <h3 className="text-base font-semibold tracking-tight sm:text-lg md:text-xl">
                Duration of the trip :
              </h3>
              <p className="text-muted-foreground">{detailTrip.days} Days</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
