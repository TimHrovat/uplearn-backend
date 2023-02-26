/*
  Warnings:

  - You are about to drop the `Event_Teacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event_Teacher" DROP CONSTRAINT "Event_Teacher_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Event_Teacher" DROP CONSTRAINT "Event_Teacher_eventId_fkey";

-- DropTable
DROP TABLE "Event_Teacher";

-- CreateTable
CREATE TABLE "Event_Employee" (
    "eventId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "Event_Employee_pkey" PRIMARY KEY ("eventId","employeeId")
);

-- AddForeignKey
ALTER TABLE "Event_Employee" ADD CONSTRAINT "Event_Employee_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event_Employee" ADD CONSTRAINT "Event_Employee_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
