import React from "react";

interface Props {
  title: string;
  description: string;
}

export default function HeadingTitle({ title, description }: Props) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">
        {title}
      </h2>
      <p className="text-muted-foreground text-justify sm:text-pretty">
        {description}
      </p>
    </div>
  );
}
