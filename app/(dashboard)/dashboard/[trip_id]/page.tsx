import React from "react";

interface Props {
  params: {
    trip_id: string;
  };
}

export default function DetailTrip({ params }: Props) {
  return (
    <section className="container mx-auto flex flex-col gap-8 py-[60px] lg:py-14">
      <h1>Detail Trip</h1>
      {params.trip_id}
    </section>
  );
}
