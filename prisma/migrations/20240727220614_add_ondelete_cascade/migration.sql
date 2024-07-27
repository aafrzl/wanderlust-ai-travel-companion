-- DropForeignKey
ALTER TABLE "Hotel" DROP CONSTRAINT "Hotel_travelPlanId_fkey";

-- DropForeignKey
ALTER TABLE "Itinerary" DROP CONSTRAINT "Itinerary_travelPlanId_fkey";

-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_itineraryId_fkey";

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_travelPlanId_fkey" FOREIGN KEY ("travelPlanId") REFERENCES "TravelPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_travelPlanId_fkey" FOREIGN KEY ("travelPlanId") REFERENCES "TravelPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
