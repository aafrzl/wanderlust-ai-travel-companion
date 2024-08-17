import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function ButtonCTA({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  return (
    <Link
      href={url}
      className="bg-foreground text-background px-4 py-2 sm:px-6 sm:py-3 rounded-full text-base sm:text-lg uppercase font-medium flex items-center gap-x-2 w-fit group shadow-md shadow-black/50"
    >
      <span>{title}</span>
      <MoveRight
        size={24}
        className="ml-2 group-hover:ml-5 transition-all duration-200 ease-in-out"
      />
    </Link>
  );
}
