/*
  Warnings:

  - You are about to drop the column `className` on the `Event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_className_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "className";

-- CreateTable
CREATE TABLE "Event_Class" (
    "eventId" TEXT NOT NULL,
    "className" TEXT NOT NULL,

    CONSTRAINT "Event_Class_pkey" PRIMARY KEY ("eventId","className")
);

-- AddForeignKey
ALTER TABLE "Event_Class" ADD CONSTRAINT "Event_Class_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event_Class" ADD CONSTRAINT "Event_Class_className_fkey" FOREIGN KEY ("className") REFERENCES "Class"("name") ON DELETE CASCADE ON UPDATE CASCADE;
