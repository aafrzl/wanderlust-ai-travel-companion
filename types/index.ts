type TravelPlan = {
  id: string;
  location: string;
  description: string;
  days: number;
  people: string;
  budget: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  hotels: Hotel[];
  itinerary: Itinerary[];
};

type Hotel = {
  id: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  travelPlanId: string;
  createdAt: Date;
  updatedAt: Date;
};

type Itinerary = {
  id: string;
  day: number;
  travelPlanId: string;
  createdAt: Date;
  updatedAt: Date;
  places: Place[];
};

type Place = {
  id: string;
  name: string;
  details: string;
  ticket_pricing: string;
  travel_time: string;
  best_time_to_visit: string;
  itineraryId: string;
  createdAt: Date;
  updatedAt: Date;
};
