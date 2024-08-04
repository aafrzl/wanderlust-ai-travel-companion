/*
  Warnings:

  - A unique constraint covering the columns `[travelPlanId]` on the table `EmergencyNumbers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[travelPlanId]` on the table `LifeQualityIndices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[travelPlanId]` on the table `WifiInformation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EmergencyNumbers_travelPlanId_key" ON "EmergencyNumbers"("travelPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "LifeQualityIndices_travelPlanId_key" ON "LifeQualityIndices"("travelPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "WifiInformation_travelPlanId_key" ON "WifiInformation"("travelPlanId");
