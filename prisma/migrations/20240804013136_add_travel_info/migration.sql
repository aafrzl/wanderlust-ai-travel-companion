/*
  Warnings:

  - Added the required column `updatedAt` to the `EmergencyNumbers` table without a default value. This is not possible if the table is not empty.
  - Made the column `travelPlanId` on table `EmergencyNumbers` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `LifeQualityIndices` table without a default value. This is not possible if the table is not empty.
  - Made the column `travelPlanId` on table `LifeQualityIndices` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `WifiInformation` table without a default value. This is not possible if the table is not empty.
  - Made the column `travelPlanId` on table `WifiInformation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EmergencyNumbers" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "travelPlanId" SET NOT NULL;

-- AlterTable
ALTER TABLE "LifeQualityIndices" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "travelPlanId" SET NOT NULL;

-- AlterTable
ALTER TABLE "WifiInformation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "travelPlanId" SET NOT NULL;
