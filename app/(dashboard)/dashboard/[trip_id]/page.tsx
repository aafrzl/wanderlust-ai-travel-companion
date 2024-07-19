import React from "react";

interface Props {
  params: {
    trip_id: string;
  };
}

export default function DetailTrip({ params }: Props) {
  return (
    <div>
      <h1>Detail Trip</h1>
      {params.trip_id}
    </div>
  );
}
