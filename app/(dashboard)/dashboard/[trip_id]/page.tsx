import { auth } from "@/auth";
import BlurImage from "@/components/blur-image";
import { readDetailTripById } from "@/helpers/functions/read-detail-trip-by-id";
import { getLocationImagesPixabay } from "@/lib/unsplash/generate-image-url";
import {
  budgetEstimate,
  formatCurrency,
  placeholderBlurhash,
  statusLifeQuality,
} from "@/lib/utils";
import { notFound, redirect } from "next/navigation";

import HotelCard from "@/components/cards/hotel-card";
import { TimelineLayout } from "@/components/layouts/timeline-layout";
import { getPhotoTravelAdvisor } from "@/lib/traveladvisor/travel-advisor-services";
import "@smastrom/react-rating/style.css";
import { HeartHandshakeIcon, Phone, Wifi } from "lucide-react";
import HeadingIcon from "../../_components/heading-icon";
import HeadingTitle from "../../_components/heading-title";
import console from "console";

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

  // Fetch photo for the hotels
  const hotelPhotos = await Promise.all(
    detailTrip.hotels.map((hotel) =>
      getPhotoTravelAdvisor(hotel.name, "hotels")
    )
  );

  const hotels = detailTrip.hotels.map((hotel, index) => ({
    ...hotel,
    photo: hotelPhotos[index],
  }));

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
            <p className="text-muted-foreground text-justify sm:text-pretty">
              {detailTrip.description}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="grid grid-cols-1 gap-2">
              <div className="space-y-2">
                <HeadingIcon
                  title="Wifi Information"
                  icon={<Wifi className="w-5 h-5 shrink-0 text-muted" />}
                />
                <ul className="list-disc ml-10">
                  <li className="text-muted-foreground">
                    Broadband: {detailTrip.wifiInformation?.broadband}
                  </li>
                  <li className="text-muted-foreground">
                    Mobile: {detailTrip.wifiInformation?.mobile}
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <HeadingIcon
                  title="Emergency Information"
                  icon={<Phone className="w-5 h-5 shrink-0 text-muted" />}
                />
                <ul className="list-disc ml-10">
                  <li className="text-muted-foreground">
                    Police: {detailTrip.emergencyNumbers?.police}
                  </li>
                  <li className="text-muted-foreground">
                    Ambulance: {detailTrip.emergencyNumbers?.ambulance}
                  </li>
                  <li className="text-muted-foreground">
                    Fire: {detailTrip.emergencyNumbers?.fire}
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <HeadingIcon
                  title="Life Quality Indices"
                  icon={
                    <HeartHandshakeIcon className="w-5 h-5 shrink-0 text-muted" />
                  }
                />
                <ul className="list-disc ml-10 space-y-2">
                  <li className="text-muted-foreground">
                    <span>
                      Safety: {detailTrip.lifeQualityIndices?.safety_index}
                    </span>
                    <span className="mx-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      {statusLifeQuality(
                        Number(detailTrip.lifeQualityIndices?.safety_index)
                      )}
                    </span>
                  </li>
                  <li className="text-muted-foreground">
                    <span>
                      Healthcare:{" "}
                      {detailTrip.lifeQualityIndices?.health_care_index}
                    </span>
                    <span className="mx-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      {statusLifeQuality(
                        Number(detailTrip.lifeQualityIndices?.health_care_index)
                      )}
                    </span>
                  </li>
                  <li className="text-muted-foreground">
                    <span>
                      Climate: {detailTrip.lifeQualityIndices?.climate_index}
                    </span>
                    <span className="mx-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      {statusLifeQuality(
                        Number(detailTrip.lifeQualityIndices?.climate_index)
                      )}
                    </span>
                  </li>
                  <li className="text-muted-foreground">
                    <span>
                      Traffic Time Index:{" "}
                      {detailTrip.lifeQualityIndices?.traffic_time_index}
                    </span>
                    <span className="mx-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      {statusLifeQuality(
                        Number(
                          detailTrip.lifeQualityIndices?.traffic_time_index
                        )
                      )}
                    </span>
                  </li>
                  <li className="text-muted-foreground">
                    <span>
                      Pollution Index:{" "}
                      {detailTrip.lifeQualityIndices?.pollution_index}
                    </span>
                    <span className="mx-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      {statusLifeQuality(
                        Number(detailTrip.lifeQualityIndices?.pollution_index)
                      )}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold tracking-tight sm:text-lg md:text-xl">
                  Budget for the trip
                </h3>
                <p className="text-muted-foreground">
                  <span className="mr-1">
                    {budget === "high" ||
                    budget === "medium" ||
                    budget === "low"
                      ? budget.charAt(0).toUpperCase() + budget.slice(1)
                      : formatCurrency(budget)}
                  </span>
                  {budgetEstimate(budget)}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold tracking-tight sm:text-lg md:text-xl">
                  Duration of the trip
                </h3>
                <p className="text-muted-foreground">{detailTrip.days} Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-8 py-5">
        <div className="flex flex-col gap-4">
          <HeadingTitle
            title={`Recomedation hotels in ${detailTrip.location}`}
            description="Here are some of the best hotels in the location. Book your stay now!"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotels.map((hotel) => (
              <HotelCard
                hotel={hotel}
                key={hotel.id}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <HeadingTitle
            title="Itenerary for the trip"
            description="Here is the itenerary for the trip. Enjoy your trip!"
          />
          {/* Timeline days Itenerary with grid card places */}
          <TimelineLayout items={detailTrip.itinerary} />
        </div>
      </div>
    </section>
  );
}
