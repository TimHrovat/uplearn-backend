/*
  Warnings:

  - You are about to drop the column `classId` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_classId_fkey";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "role" SET DEFAULT 'teacher';

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "classId",
ADD COLUMN     "classID" TEXT;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
