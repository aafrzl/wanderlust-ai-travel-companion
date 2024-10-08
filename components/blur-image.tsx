"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

import type { ComponentProps } from "react";

export default function BlurImage(props: ComponentProps<typeof Image>) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      {...props}
      alt={props.alt}
      className={cn(
        props.className,
        "duration-700 ease-in-out",
        isLoading ? "blur-lg" : "blur-0"
      )}
      onLoad={() => setIsLoading(false)}
    />
  );
}
