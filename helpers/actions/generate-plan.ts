"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { TravelPlanSchema, TravelPlanType } from "@/schema";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { Prisma, TravelPlan } from "@prisma/client";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

type AIGeneratedTravelPlan = {
  location: string;
  days: number;
  people: number;
  budget: string;
  hotels: Array<{
    name: string;
    price: number;
    latitude: string;
    longitude: string;
    rating: number;
    description: string;
  }>;
  itinerary: Array<{
    day: number;
    places: Array<{
      name: string;
      details: string;
      latitude: string;
      longitude: string;
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

  const { location, days, people, budget } = data;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      'Create an AI Travel Planner that takes user inputs for location, number of days for traveling, number of people, and budget. The budget should be categorized into three options: low (0-3,000,000 IDR), medium (3,000,000-5,000,000 IDR), and high (5,000,000+ IDR) or entered as a custom amount in IDR. The AI should provide the best options for hotels and a suggested itinerary, formatted as JSON do not adding some note just JSON. The JSON output should include:\n\nHotels:\n\nHotel name\nPrice per night (in IDR)\nGeo coordinates (latitude and longitude)\nRating\nDescription\nItinerary:\n\nDay-by-day plan with:\nPlace name\nDetails (description)\nGeo coordinates (latitude and longitude)\nTicket pricing (in IDR)\nTravel time between locations\nBest time to visit\n\nThe JSON structure should be as follows :\n{\n  "location": "User input location",\n  "days": Number of days user input,\n  "people": Number of people traveling,\n  "budget": "User input budget (low, medium, high) or custom amount user input",\n  "hotels": [\n    {\n      "name": "Hotel name",\n      "price": Price per night in IDR,\n       "latitude": "Latitude",\n       "longitude": "Longitude",\n      "rating": Hotel rating (float),\n      "description": "Hotel description"\n    },\n    ...\n  ],\n  "itinerary": [\n    {\n      "day": 1,\n      "places": [\n        {\n          "name": "Place name",\n          "details": "Place description",\n           "latitude": "Latitude",\n           "longitude": "Longitude"\n          "ticket_pricing": "Ticket price in IDR or Free",\n          "travel_time": "Travel time from previous location",\n          "best_time_to_visit": "Best time to visit"\n        },\n        ...\n      ]\n    },\n    ...\n  ]\n}',
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
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [
    {
      text: `Generate a travel plan for ${location} for ${days} days with ${people} people and a ${budget} budget.`,
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

    const createdPlan = await prisma.travelPlan.create({
      data: {
        location: travelPlan.location,
        days: travelPlan.days,
        people: travelPlan.people,
        budget: travelPlan.budget,
        userId: session.user?.id as string,
        hotels: {
          create: travelPlan.hotels.map(
            (hotel): Prisma.HotelCreateWithoutTravelPlanInput => ({
              name: hotel.name,
              price: hotel.price,
              latitude: hotel.latitude,
              longitude: hotel.longitude,
              rating: hotel.rating,
              description: hotel.description,
            })
          ),
        },
        itinerary: {
          create: travelPlan.itinerary.map(
            (day): Prisma.ItineraryCreateWithoutTravelPlanInput => ({
              day: day.day,
              places: {
                create: day.places.map(
                  (place): Prisma.PlaceCreateWithoutItineraryInput => ({
                    name: place.name,
                    details: place.details,
                    latitude: place.latitude,
                    longitude: place.longitude,
                    tickerPricing: place.ticket_pricing,
                    travelTime: place.travel_time,
                    bestTimeToVisit: place.best_time_to_visit,
                  })
                ),
              },
            })
          ),
        },
      },
      include: {
        hotels: true,
        itinerary: {
          include: {
            places: true,
          },
        },
      },
    });

    return createdPlan;
  } catch (error) {
    console.error("Error generate travel plan", error);
    throw new Error("Error generate travel plan");
  }
}
