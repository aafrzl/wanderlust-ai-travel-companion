import { placeholderBlurhash, formatCurrency, cn } from "@/lib/utils";
import React from "react";
import BlurImage from "../blur-image";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Rating as ReactRating, RoundedStar } from "@smastrom/react-rating";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { CalendarCheck } from "lucide-react";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
  };

  return (
    <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg">
      <BlurImage
        src={hotel.photoUrl || "/placeholder-image.webp"}
        alt={hotel.name}
        width={600}
        height={400}
        className="w-full h-48 object-cover"
        placeholder="blur"
        blurDataURL={placeholderBlurhash}
      />
      <CardContent className="p-6 space-y-4">
        <h3 className="text-base sm:text-xl font-semibold">{hotel.name}</h3>
        <div className="flex items-center gap-1 text-primary">
          <ReactRating
            style={{ maxWidth: 100 }}
            value={hotel.rating}
            readOnly
            itemStyles={myStyles}
            halfFillMode="svg"
          />
          <span>{hotel.rating}</span>
        </div>
        <div className="flex items-center justify-between flex-wrap lg:flex-nowrap">
          <div className="text-lg sm:text-xl font-bold">
            {formatCurrency(hotel.price.toString())}
          </div>
          <div className="text-sm text-muted-foreground">per night</div>
        </div>
        <p className="text-muted-foreground text-sm">{hotel.description}</p>
        {hotel.web_url && (
          <CardFooter className="p-0">
            <Link
              href={hotel.web_url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({
                  variant: "secondary",
                }),
                "w-full font-medium flex items-center gap-x-2"
              )}
            >
              <CalendarCheck className="size-5" />
              <span>Book now</span>
            </Link>
          </CardFooter>
        )}
      </CardContent>
    </Card>
  );
}
