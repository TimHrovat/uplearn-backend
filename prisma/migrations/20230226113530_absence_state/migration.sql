-- CreateEnum
CREATE TYPE "AbsenceState" AS ENUM ('EXCUSED', 'UNEXCUSED');

-- AlterTable
ALTER TABLE "Absence" ADD COLUMN     "state" "AbsenceState" NOT NULL DEFAULT 'UNEXCUSED';
