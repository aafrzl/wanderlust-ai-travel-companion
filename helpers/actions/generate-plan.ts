"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getPhotoTravelAdvisor } from "@/lib/traveladvisor/travel-advisor-services";
import { TravelPlanSchema, TravelPlanType } from "@/schema";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

type AIGeneratedTravelPlan = {
  location: string;
  description: string;
  days: number;
  people: string;
  budget: string;
  wifi_information: {
    broadband: string;
    mobile: string;
  };
  emergency_numbers: {
    fire: string;
    police: string;
    ambulance: string;
  };
  life_quality_indices: {
    climate_index: number;
    safety_index: number;
    health_care_index: number;
    traffic_time_index: number;
    pollution_index: number;
  };
  hotels: Array<{
    name: string;
    price: number;
    rating: number;
    description: string;
  }>;
  itinerary: Array<{
    day: number;
    places: Array<{
      name: string;
      details: string;
      ticket_pricing: string;
      travel_time: string;
      best_time_to_visit: string;
    }>;
  }>;
};

export async function generatePlan(data: TravelPlanType) {
  //validate data
  const validatedData = TravelPlanSchema.safeParse(data);

  if (!validatedData.success) {
    throw new Error(validatedData.error.errors[0].message);
  }

  // validate session userId
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const { location, days, people, budget, activities } = data;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      'Create an Travel Plan according on location, number of days for traveling, how many people, some activities kind and budget. The people options: solo, couple, family and group friends. The budget should be categorized into three options: low (0-3,000,000 IDR), medium (3,000,000-5,000,000 IDR), and high (5,000,000+ IDR) or entered as a custom amount in IDR. User can choose the activities options: sightseeing, Adventure, Cultural Experiences, Historical, Relaxation, Nature, Shopping and Nightlife. You should provide the best options for hotels and a suggested itinerary and data about city location like WiFi information, Emergency Numbers, Life Quality Indices with max score 5, formatted as JSON. The JSON output should include:\n\nHotels:\nHotel name\nPrice per night (in IDR)\nRating\nDescription\n\nItinerary:\nDay-by-day plan with:\nPlace name\nDetails (description)\nTicket pricing (in IDR) or Free\nTravel time between locations\nBest time to visit\n\nThe JSON structure should be as follows :\n{\n  "location": "User input location",\n  "description": "Make long max 1 paragraph description about location",\n  "days": Number of days user input,\n  "people": Number of people traveling,\n  "budget": "User input budget (low, medium, high) or custom amount user input",\n   "wifi_information": {\n    "broadband": "information speed wifi broadband on trip location (Mbps)",\n    "mobile": "information speed wifi mobile on trip location (Mbps)"\n  },\n  "emergency_numbers" : {\n   "fire": "information emergency number firefighter",\n   "police": "information emergency number police",\n   "ambulance": "information emergency number ambulance"\n},\n"life_quality_indices": {\n "climate_index": index of climate in float,\n "safety_index": index of safety in float,\n "health_care_index": index of health in float,\n "traffic_time_index": index of traffic time in float,\n "pollution_index": index of pollution in float,\n},\n  "hotels": [\n    {\n      "name": "Hotel name",\n      "price": Price per night in int or number (IDR),\n      "rating": Hotel rating in float,\n      "description": "Hotel description"\n    },\n    ...\n  ],\n  "itinerary": [\n    {\n      "day": 1,\n      "places": [\n        {\n          "name": "Place name",\n          "details": "Place description",\n          "ticket_pricing": "Ticket price or Free",\n          "travel_time": "Travel time from previous location",\n          "best_time_to_visit": "Best time to visit"\n        },\n        ...\n      ]\n    },\n    ...\n  ]\n}',
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const activitiesData = data.activities.join(", ");

  const parts = [
    {
      text: `Generate a travel plan for ${location} for ${days} days with ${people} people for ${activitiesData} with ${budget} budget`,
    },
  ];

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;

    const travelPlan: AIGeneratedTravelPlan = JSON.parse(response.text());

    //Fetch and add photo url for hotels
    const hotelsWithPhotos = await Promise.all(
      travelPlan.hotels.map(async (hotel) => {
        const photoUrl = await getPhotoTravelAdvisor(hotel.name, "hotels");
        return { ...hotel, photoUrl };
      })
    );

    //Fetch and add photo url for places
    const itineraryWithPhotos = await Promise.all(
      travelPlan.itinerary.map(async (day) => {
        const placesWithPhotos = await Promise.all(
          day.places.map(async (place) => {
            const photoUrl = await getPhotoTravelAdvisor(place.name, "");
            return { ...place, photoUrl };
          })
        );
        return { ...day, places: placesWithPhotos };
      })
    );

    const createdPlan = await prisma.travelPlan.create({
      data: {
        location: travelPlan.location,
        description: travelPlan.description,
        days: travelPlan.days,
        people: travelPlan.people,
        budget: travelPlan.budget.toString().toLocaleLowerCase(),
        userId: session.user?.id as string,
        wifiInformation: {
          create: {
            broadband: travelPlan.wifi_information.broadband,
            mobile: travelPlan.wifi_information.mobile,
          },
        },
        emergencyNumbers: {
          create: {
            fire: travelPlan.emergency_numbers.fire,
            police: travelPlan.emergency_numbers.police,
            ambulance: travelPlan.emergency_numbers.ambulance,
          },
        },
        lifeQualityIndices: {
          create: {
            climate_index: travelPlan.life_quality_indices.climate_index,
            safety_index: travelPlan.life_quality_indices.safety_index,
            health_care_index:
              travelPlan.life_quality_indices.health_care_index,
            traffic_time_index:
              travelPlan.life_quality_indices.traffic_time_index,
            pollution_index: travelPlan.life_quality_indices.pollution_index,
          },
        },
        hotels: {
          create: hotelsWithPhotos.map(
            (hotel): Prisma.HotelCreateWithoutTravelPlanInput => ({
              name: hotel.name,
              price: hotel.price,
              rating: hotel.rating,
              description: hotel.description,
              photoUrl: hotel.photoUrl,
            })
          ),
        },
        itinerary: {
          create: itineraryWithPhotos.map(
            (day): Prisma.ItineraryCreateWithoutTravelPlanInput => ({
              day: day.day,
              places: {
                create: day.places.map(
                  (place): Prisma.PlaceCreateWithoutItineraryInput => ({
                    name: place.name.toString(),
                    details: place.details.toString(),
                    ticket_pricing: place.ticket_pricing.toString(),
                    travel_time: place.travel_time.toString(),
                    best_time_to_visit: place.best_time_to_visit.toString(),
                    photoUrl: place.photoUrl,
                  })
                ),
              },
            })
          ),
        },
      },
      include: {
        wifiInformation: true,
        emergencyNumbers: true,
        lifeQualityIndices: true,
        hotels: true,
        itinerary: {
          include: {
            places: true,
          },
        },
      },
    });

    revalidatePath("/dashboard");

    return createdPlan;
  } catch (error) {
    console.error("Error generate travel plan", error);
    throw new Error("Error generate travel plan");
  }
}
