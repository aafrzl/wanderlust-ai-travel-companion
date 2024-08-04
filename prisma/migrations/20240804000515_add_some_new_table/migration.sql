/*
  Warnings:

  - You are about to drop the column `createAt` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `bestTimeToVisit` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `tickerPricing` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `travelTime` on the `Place` table. All the data in the column will be lost.
  - Added the required column `best_time_to_visit` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_pricing` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `travel_time` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `TravelPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "createAt",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Place" DROP COLUMN "bestTimeToVisit",
DROP COLUMN "createAt",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "tickerPricing",
DROP COLUMN "travelTime",
ADD COLUMN     "best_time_to_visit" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ticket_pricing" TEXT NOT NULL,
ADD COLUMN     "travel_time" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TravelPlan" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "people" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "WifiInformation" (
    "id" TEXT NOT NULL,
    "broadband" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "travelPlanId" TEXT,

    CONSTRAINT "WifiInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyNumbers" (
    "id" TEXT NOT NULL,
    "fire" TEXT NOT NULL,
    "police" TEXT NOT NULL,
    "ambulance" TEXT NOT NULL,
    "travelPlanId" TEXT,

    CONSTRAINT "EmergencyNumbers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LifeQualityIndices" (
    "id" TEXT NOT NULL,
    "climate_index" DOUBLE PRECISION NOT NULL,
    "safety_index" DOUBLE PRECISION NOT NULL,
    "health_care_index" DOUBLE PRECISION NOT NULL,
    "traffic_time_index" DOUBLE PRECISION NOT NULL,
    "pollution_index" DOUBLE PRECISION NOT NULL,
    "travelPlanId" TEXT,

    CONSTRAINT "LifeQualityIndices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WifiInformation" ADD CONSTRAINT "WifiInformation_travelPlanId_fkey" FOREIGN KEY ("travelPlanId") REFERENCES "TravelPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyNumbers" ADD CONSTRAINT "EmergencyNumbers_travelPlanId_fkey" FOREIGN KEY ("travelPlanId") REFERENCES "TravelPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LifeQualityIndices" ADD CONSTRAINT "LifeQualityIndices_travelPlanId_fkey" FOREIGN KEY ("travelPlanId") REFERENCES "TravelPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
