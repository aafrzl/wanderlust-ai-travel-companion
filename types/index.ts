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
  wifiInformation: WifiInformation | null;
  emergencyNumbers: EmergencyNumbers | null;
  lifeQualityIndices: LifeQualityIndices | null;
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

type WifiInformation = {
  id: string;
  broadband: string;
  mobile: string;
  travelPlanId: string;
  createdAt: Date;
  updatedAt: Date;
};

type EmergencyNumbers = {
  id: string;
  fire: string;
  police: string;
  ambulance: string;
  travelPlanId: string;
  createdAt: Date;
  updatedAt: Date;
};

type LifeQualityIndices = {
  id: string;
  climate_index: number;
  safety_index: number;
  health_care_index: number;
  traffic_time_index: number;
  pollution_index: number;
  travelPlanId: string;
  createdAt: Date;
  updatedAt: Date;
};
