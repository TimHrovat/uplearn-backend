/*
  Warnings:

  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ClassTeacher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Classroom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SchoolHour` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TeachesClass` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TeachesSubject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `substitute_class_teacher` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "EmployeeRole" ADD VALUE 'teacher';

-- DropForeignKey
ALTER TABLE "ClassTeacher" DROP CONSTRAINT "ClassTeacher_classID_fkey";

-- DropForeignKey
ALTER TABLE "ClassTeacher" DROP CONSTRAINT "ClassTeacher_employeeID_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_classID_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_classRoomID_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_employeeID_subjectID_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_schoolHourID_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_classId_fkey";

-- DropForeignKey
ALTER TABLE "TeachesClass" DROP CONSTRAINT "TeachesClass_classID_fkey";

-- DropForeignKey
ALTER TABLE "TeachesClass" DROP CONSTRAINT "TeachesClass_employeeID_subjectID_fkey";

-- DropForeignKey
ALTER TABLE "TeachesSubject" DROP CONSTRAINT "TeachesSubject_employeeID_fkey";

-- DropForeignKey
ALTER TABLE "TeachesSubject" DROP CONSTRAINT "TeachesSubject_subjectID_fkey";

-- DropForeignKey
ALTER TABLE "substitute_class_teacher" DROP CONSTRAINT "substitute_class_teacher_classID_fkey";

-- DropForeignKey
ALTER TABLE "substitute_class_teacher" DROP CONSTRAINT "substitute_class_teacher_employeeID_fkey";

-- DropIndex
DROP INDEX "Lesson_classID_key";

-- DropIndex
DROP INDEX "Lesson_classRoomID_key";

-- DropIndex
DROP INDEX "Lesson_employeeID_key";

-- DropIndex
DROP INDEX "Lesson_schoolHourID_key";

-- DropIndex
DROP INDEX "Lesson_subjectID_key";

-- DropIndex
DROP INDEX "Student_classId_key";

-- AlterTable
ALTER TABLE "Class" DROP CONSTRAINT "Class_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Class_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Class_id_seq";

-- AlterTable
ALTER TABLE "ClassTeacher" DROP CONSTRAINT "ClassTeacher_pkey",
ALTER COLUMN "classID" SET DATA TYPE TEXT,
ALTER COLUMN "employeeID" SET DATA TYPE TEXT,
ADD CONSTRAINT "ClassTeacher_pkey" PRIMARY KEY ("classID", "employeeID");

-- AlterTable
ALTER TABLE "Classroom" DROP CONSTRAINT "Classroom_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Classroom_id_seq";

-- AlterTable
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_pkey",
ADD COLUMN     "role" "EmployeeRole" NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Employee_id_seq";

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "schoolHourID" SET DATA TYPE TEXT,
ALTER COLUMN "classID" SET DATA TYPE TEXT,
ALTER COLUMN "classRoomID" SET DATA TYPE TEXT,
ALTER COLUMN "employeeID" SET DATA TYPE TEXT,
ALTER COLUMN "subjectID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Lesson_pkey" PRIMARY KEY ("schoolHourID", "classID", "classRoomID", "subjectID", "date");

-- AlterTable
ALTER TABLE "SchoolHour" DROP CONSTRAINT "SchoolHour_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SchoolHour_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SchoolHour_id_seq";

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "classId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Student_id_seq";

-- AlterTable
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Subject_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Subject_id_seq";

-- AlterTable
ALTER TABLE "TeachesClass" DROP CONSTRAINT "TeachesClass_pkey",
ALTER COLUMN "employeeID" SET DATA TYPE TEXT,
ALTER COLUMN "subjectID" SET DATA TYPE TEXT,
ALTER COLUMN "classID" SET DATA TYPE TEXT,
ADD CONSTRAINT "TeachesClass_pkey" PRIMARY KEY ("employeeID", "subjectID", "classID");

-- AlterTable
ALTER TABLE "TeachesSubject" DROP CONSTRAINT "TeachesSubject_pkey",
ALTER COLUMN "employeeID" SET DATA TYPE TEXT,
ALTER COLUMN "subjectID" SET DATA TYPE TEXT,
ADD CONSTRAINT "TeachesSubject_pkey" PRIMARY KEY ("employeeID", "subjectID");

-- DropTable
DROP TABLE "substitute_class_teacher";

-- CreateTable
CREATE TABLE "SubstituteClassTeacher" (
    "classID" TEXT NOT NULL,
    "employeeID" TEXT NOT NULL,

    CONSTRAINT "SubstituteClassTeacher_pkey" PRIMARY KEY ("classID","employeeID")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubstituteClassTeacher_classID_key" ON "SubstituteClassTeacher"("classID");

-- CreateIndex
CREATE UNIQUE INDEX "SubstituteClassTeacher_employeeID_key" ON "SubstituteClassTeacher"("employeeID");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachesSubject" ADD CONSTRAINT "TeachesSubject_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachesSubject" ADD CONSTRAINT "TeachesSubject_subjectID_fkey" FOREIGN KEY ("subjectID") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachesClass" ADD CONSTRAINT "TeachesClass_employeeID_subjectID_fkey" FOREIGN KEY ("employeeID", "subjectID") REFERENCES "TeachesSubject"("employeeID", "subjectID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachesClass" ADD CONSTRAINT "TeachesClass_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassTeacher" ADD CONSTRAINT "ClassTeacher_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassTeacher" ADD CONSTRAINT "ClassTeacher_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubstituteClassTeacher" ADD CONSTRAINT "SubstituteClassTeacher_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubstituteClassTeacher" ADD CONSTRAINT "SubstituteClassTeacher_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_schoolHourID_fkey" FOREIGN KEY ("schoolHourID") REFERENCES "SchoolHour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_classRoomID_fkey" FOREIGN KEY ("classRoomID") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_employeeID_subjectID_fkey" FOREIGN KEY ("employeeID", "subjectID") REFERENCES "TeachesSubject"("employeeID", "subjectID") ON DELETE RESTRICT ON UPDATE CASCADE;
