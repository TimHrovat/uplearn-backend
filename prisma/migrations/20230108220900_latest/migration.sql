/*
  Warnings:

  - You are about to drop the column `studentUserId` on the `Absence` table. All the data in the column will be lost.
  - The primary key for the `ClassTeacher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `employeeUserId` on the `ClassTeacher` table. All the data in the column will be lost.
  - You are about to drop the column `employeeUserId` on the `Employee_Subject` table. All the data in the column will be lost.
  - You are about to drop the column `schoolYearEndDate` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `schoolYearStartDate` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `studentUserId` on the `Grade` table. All the data in the column will be lost.
  - The primary key for the `SchoolYear` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SubstituteClassTeacher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `employeeUserId` on the `SubstituteClassTeacher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeId]` on the table `ClassTeacher` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeId]` on the table `SubstituteClassTeacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `schoolYearId` to the `Absence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolYearId` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `SchoolYear` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Absence" DROP CONSTRAINT "Absence_studentId_studentUserId_fkey";

-- DropForeignKey
ALTER TABLE "ClassTeacher" DROP CONSTRAINT "ClassTeacher_employeeId_employeeUserId_fkey";

-- DropForeignKey
ALTER TABLE "Employee_Subject" DROP CONSTRAINT "Employee_Subject_employeeId_employeeUserId_fkey";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_schoolYearStartDate_schoolYearEndDate_fkey";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_studentId_studentUserId_fkey";

-- DropForeignKey
ALTER TABLE "SubstituteClassTeacher" DROP CONSTRAINT "SubstituteClassTeacher_employeeId_employeeUserId_fkey";

-- DropIndex
DROP INDEX "ClassTeacher_employeeId_employeeUserId_key";

-- DropIndex
DROP INDEX "SubstituteClassTeacher_employeeId_employeeUserId_key";

-- AlterTable
ALTER TABLE "Absence" DROP COLUMN "studentUserId",
ADD COLUMN     "schoolYearId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ClassTeacher" DROP CONSTRAINT "ClassTeacher_pkey",
DROP COLUMN "employeeUserId",
ADD CONSTRAINT "ClassTeacher_pkey" PRIMARY KEY ("className", "employeeId");

-- AlterTable
ALTER TABLE "Employee_Subject" DROP COLUMN "employeeUserId";

-- AlterTable
ALTER TABLE "Grade" DROP COLUMN "schoolYearEndDate",
DROP COLUMN "schoolYearStartDate",
DROP COLUMN "studentUserId",
ADD COLUMN     "schoolYearId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SchoolYear" DROP CONSTRAINT "SchoolYear_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SchoolYear_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SubstituteClassTeacher" DROP CONSTRAINT "SubstituteClassTeacher_pkey",
DROP COLUMN "employeeUserId",
ADD CONSTRAINT "SubstituteClassTeacher_pkey" PRIMARY KEY ("className", "employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "ClassTeacher_employeeId_key" ON "ClassTeacher"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "SubstituteClassTeacher_employeeId_key" ON "SubstituteClassTeacher"("employeeId");

-- AddForeignKey
ALTER TABLE "Employee_Subject" ADD CONSTRAINT "Employee_Subject_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassTeacher" ADD CONSTRAINT "ClassTeacher_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubstituteClassTeacher" ADD CONSTRAINT "SubstituteClassTeacher_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_schoolYearId_fkey" FOREIGN KEY ("schoolYearId") REFERENCES "SchoolYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_schoolYearId_fkey" FOREIGN KEY ("schoolYearId") REFERENCES "SchoolYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
