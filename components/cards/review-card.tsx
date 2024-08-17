/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  img: string;
  name: string;
  username: string;
  body: string;
}

export default function ReviewCard({
  img,
  name,
  username,
  body,
}: ReviewCardProps) {
  return (
    <figure
      className={cn(
        "relative w-80 cursor-pointer overflow-hidden rounded-xl border p-4 shadow-md shadow-card",
        "border-primary/[.1] bg-card hover:bg-secondary/50"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <img
          src={img}
          alt={name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-foreground">{name}</figcaption>
          <p className="text-xs font-medium text-muted-foreground">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
}
