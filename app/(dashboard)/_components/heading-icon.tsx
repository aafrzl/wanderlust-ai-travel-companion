import React from "react";

interface Props {
  title: string;
  icon: React.ReactNode;
}

export default function HeadingIcon({ title, icon }: Props) {
  return (
    <div className="inline-flex items-center gap-x-2">
      <div className="p-1 rounded-full bg-card-foreground/75">{icon}</div>
      <h3 className="text-base font-semibold tracking-tight sm:text-lg md:text-xl">
        {title}
      </h3>
    </div>
  );
}
