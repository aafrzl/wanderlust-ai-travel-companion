import { placeholderBlurhash } from "@/lib/utils";
import BlurImage from "../blur-image";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { getPhotoTravelAdvisor } from "@/lib/traveladvisor/travel-advisor-services";

interface Props {
  place: Place;
}

export default async function PlaceCard({ place }: Props) {
  const photo = await getPhotoTravelAdvisor(place.name, "");

  return (
    <Card className="flex flex-col sm:flex-row gap-x-2 w-full md:w-1/2">
      <div className="p-2">
        <BlurImage
          src={photo || "/placeholder-image.webp"}
          alt={place.name}
          width={160}
          height={160}
          className="sm:w-24 sm:h-24 w-full rounded-md hover:scale-95 transform transition-transform duration-500 ease-in-out object-cover"
          placeholder="blur"
          blurDataURL={placeholderBlurhash}
        />
      </div>
      <div className="flex flex-col items-start gap-2 sm:gap-4 flex-1 p-2">
        <div>
          <h3 className="text-lg font-semibold">{place.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {place.best_time_to_visit}
          </p>
        </div>
        <Separator />
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between w-full">
          {place.travel_time !== "N/A" && (
            <p className="text-muted-foreground text-xs">{place.travel_time}</p>
          )}
          <p className="text-muted-foreground text-xs">
            Ticket Price {place.ticket_pricing}
          </p>
        </div>
      </div>
    </Card>
  );
}
