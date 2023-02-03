/*
  Warnings:

  - You are about to drop the column `schoolHourNum` on the `Lesson` table. All the data in the column will be lost.
  - The primary key for the `SchoolHour` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `num` on the `SchoolHour` table. All the data in the column will be lost.
  - Added the required column `schoolHourId` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `SchoolHour` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_schoolHourNum_fkey";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "schoolHourNum",
ADD COLUMN     "schoolHourId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SchoolHour" DROP CONSTRAINT "SchoolHour_pkey",
DROP COLUMN "num",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SchoolHour_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_schoolHourId_fkey" FOREIGN KEY ("schoolHourId") REFERENCES "SchoolHour"("id") ON DELETE CASCADE ON UPDATE CASCADE;
