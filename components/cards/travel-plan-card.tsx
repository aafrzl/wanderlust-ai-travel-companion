import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, placeholderBlurhash } from "@/lib/utils";
import { Calendar, UsersIcon, Wallet } from "lucide-react";
import Link from "next/link";
import BlurImage from "../blur-image";
import AlertModalDelete from "../modals/alert-modal-delete";
import { Badge } from "../ui/badge";

interface Props {
  location: string;
  imageUrl: string | null;
  photographer: string | null;
  days: number;
  budget: string;
  people: string;
  travelPlanId: string;
}

export default function TravelPlanCard({
  location,
  imageUrl,
  photographer,
  days,
  budget,
  people,
  travelPlanId,
}: Props) {
  return (
    <Card className="h-full max-w-[450px] cursor-pointer hover:border-primary transition-all duration-300 ease-in-out relative">
      <CardHeader>
        {imageUrl && (
          <div className="relative w-full h-48 mb-4">
            <Link href={`/dashboard/${travelPlanId}`}>
              <BlurImage
                alt={location}
                src={imageUrl || "placeholder-image.webp"}
                fill
                className="rounded-md object-cover"
                placeholder="blur"
                blurDataURL={placeholderBlurhash}
              />
            </Link>
            <div className="absolute bottom-0 right-0 bg-black bg-opacity-75 text-xs p-2 rounded-tl-md rounded-br-md text-white">
              {photographer ? `Photo by ${photographer} on` : ""}
              <a
                href="https://pixalbay.com/"
                target="_blank"
                className="m-1"
              >
                Pixabay
              </a>
            </div>
          </div>
        )}
        <Link href={`/dashboard/${travelPlanId}`}>
          <CardTitle className="text-xl">{location}</CardTitle>
        </Link>
      </CardHeader>
      <Link href={`/dashboard/${travelPlanId}`}>
        <CardContent className="flex flex-wrap items-center gap-2">
          <Badge className="flex items-center gap-2">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{days} Days</span>
          </Badge>
          <Badge className="flex items-center gap-2">
            <Wallet className="w-4 h-4 shrink-0" />
            {budget === "high" || budget === "medium" || budget === "low" ? (
              <span>
                {budget.charAt(0).toUpperCase() + budget.slice(1)} Budget
              </span>
            ) : (
              <span>{formatCurrency(budget)}</span>
            )}
          </Badge>
          <Badge className="flex items-center gap-2">
            <UsersIcon className="w-4 h-4 shrink-0" />
            <span>{people} People</span>
          </Badge>
        </CardContent>
      </Link>
      <div className="absolute top-5 right-5">
        <AlertModalDelete travelPlanId={travelPlanId} />
      </div>
    </Card>
  );
}
