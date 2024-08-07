import { Card, CardContent } from "../ui/card";

interface Props {
  img?: string;
  place: Place;
}

export default function PlaceCard({ img, place }: Props) {
  return (
    <Card className="w-full max-w-sm">
      <img
        src="/placeholder-image.webp"
        alt={place.name}
        className="rounded-t-lg object-cover w-full aspect-[2/1]"
        width="400"
        height="200"
      />
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{place.name}</h3>
          <p className="text-muted-foreground text-sm">{place.details}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="font-medium">Travel Time</div>
            <div className="text-sm text-muted-foreground">
              {place.travel_time}
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-medium">Best Time to Visit</div>
            <div className="text-sm text-muted-foreground">
              {place.best_time_to_visit}
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-medium">Ticket Pricing</div>
            <div className="text-sm text-muted-foreground">
              {place.ticket_pricing}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
