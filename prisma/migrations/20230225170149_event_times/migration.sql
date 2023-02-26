-- DropIndex
DROP INDEX "Event_endTime_key";

-- DropIndex
DROP INDEX "Event_startTime_key";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;
