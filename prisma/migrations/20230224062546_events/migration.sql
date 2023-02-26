-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('ACT', 'HOLLIDAY');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "startTime" TIME,
    "endTime" TIME,
    "type" "EventType" NOT NULL,
    "description" TEXT NOT NULL,
    "className" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_startTime_key" ON "Event"("startTime");

-- CreateIndex
CREATE UNIQUE INDEX "Event_endTime_key" ON "Event"("endTime");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_className_fkey" FOREIGN KEY ("className") REFERENCES "Class"("name") ON DELETE CASCADE ON UPDATE CASCADE;
