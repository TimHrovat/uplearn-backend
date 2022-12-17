/*
  Warnings:

  - A unique constraint covering the columns `[classId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('principal', 'admin');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "classId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teaches" (
    "employeeID" INTEGER NOT NULL,
    "subjectID" INTEGER NOT NULL,

    CONSTRAINT "teaches_pkey" PRIMARY KEY ("employeeID","subjectID")
);

-- CreateTable
CREATE TABLE "TeachesClass" (
    "employeeID" INTEGER NOT NULL,
    "subjectID" INTEGER NOT NULL,
    "classID" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "class_teacher" (
    "classID" INTEGER NOT NULL,
    "employeeID" INTEGER NOT NULL,

    CONSTRAINT "class_teacher_pkey" PRIMARY KEY ("classID","employeeID")
);

-- CreateTable
CREATE TABLE "substitute_class_teacher" (
    "classID" INTEGER NOT NULL,
    "employeeID" INTEGER NOT NULL,

    CONSTRAINT "substitute_class_teacher_pkey" PRIMARY KEY ("classID","employeeID")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolHour" (
    "id" SERIAL NOT NULL,
    "hour" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "schoolHourID" INTEGER NOT NULL,
    "classID" INTEGER NOT NULL,
    "classRoomID" INTEGER NOT NULL,
    "employeeID" INTEGER NOT NULL,
    "subjectID" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "teaches_employeeID_key" ON "teaches"("employeeID");

-- CreateIndex
CREATE UNIQUE INDEX "teaches_subjectID_key" ON "teaches"("subjectID");

-- CreateIndex
CREATE UNIQUE INDEX "TeachesClass_employeeID_key" ON "TeachesClass"("employeeID");

-- CreateIndex
CREATE UNIQUE INDEX "TeachesClass_subjectID_key" ON "TeachesClass"("subjectID");

-- CreateIndex
CREATE UNIQUE INDEX "TeachesClass_classID_key" ON "TeachesClass"("classID");

-- CreateIndex
CREATE UNIQUE INDEX "class_teacher_classID_key" ON "class_teacher"("classID");

-- CreateIndex
CREATE UNIQUE INDEX "class_teacher_employeeID_key" ON "class_teacher"("employeeID");

-- CreateIndex
CREATE UNIQUE INDEX "substitute_class_teacher_classID_key" ON "substitute_class_teacher"("classID");

-- CreateIndex
CREATE UNIQUE INDEX "substitute_class_teacher_employeeID_key" ON "substitute_class_teacher"("employeeID");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolHour_hour_key" ON "SchoolHour"("hour");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolHour_startTime_key" ON "SchoolHour"("startTime");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_schoolHourID_key" ON "Lesson"("schoolHourID");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_classID_key" ON "Lesson"("classID");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_classRoomID_key" ON "Lesson"("classRoomID");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_employeeID_key" ON "Lesson"("employeeID");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_subjectID_key" ON "Lesson"("subjectID");

-- CreateIndex
CREATE UNIQUE INDEX "Student_classId_key" ON "Student"("classId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teaches" ADD CONSTRAINT "teaches_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teaches" ADD CONSTRAINT "teaches_subjectID_fkey" FOREIGN KEY ("subjectID") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachesClass" ADD CONSTRAINT "TeachesClass_employeeID_subjectID_fkey" FOREIGN KEY ("employeeID", "subjectID") REFERENCES "teaches"("employeeID", "subjectID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachesClass" ADD CONSTRAINT "TeachesClass_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_teacher" ADD CONSTRAINT "class_teacher_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_teacher" ADD CONSTRAINT "class_teacher_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "substitute_class_teacher" ADD CONSTRAINT "substitute_class_teacher_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "substitute_class_teacher" ADD CONSTRAINT "substitute_class_teacher_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_schoolHourID_fkey" FOREIGN KEY ("schoolHourID") REFERENCES "SchoolHour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_classRoomID_fkey" FOREIGN KEY ("classRoomID") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_employeeID_subjectID_fkey" FOREIGN KEY ("employeeID", "subjectID") REFERENCES "teaches"("employeeID", "subjectID") ON DELETE RESTRICT ON UPDATE CASCADE;
