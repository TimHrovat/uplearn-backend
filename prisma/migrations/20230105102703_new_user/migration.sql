/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassTeacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Classroom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SchoolHour` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubstituteClassTeacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeachesClass` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeachesSubject` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('employee', 'student', 'admin');

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
ALTER TABLE "Student" DROP CONSTRAINT "Student_classID_fkey";

-- DropForeignKey
ALTER TABLE "SubstituteClassTeacher" DROP CONSTRAINT "SubstituteClassTeacher_classID_fkey";

-- DropForeignKey
ALTER TABLE "SubstituteClassTeacher" DROP CONSTRAINT "SubstituteClassTeacher_employeeID_fkey";

-- DropForeignKey
ALTER TABLE "TeachesClass" DROP CONSTRAINT "TeachesClass_classID_fkey";

-- DropForeignKey
ALTER TABLE "TeachesClass" DROP CONSTRAINT "TeachesClass_employeeID_subjectID_fkey";

-- DropForeignKey
ALTER TABLE "TeachesSubject" DROP CONSTRAINT "TeachesSubject_employeeID_fkey";

-- DropForeignKey
ALTER TABLE "TeachesSubject" DROP CONSTRAINT "TeachesSubject_subjectID_fkey";

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "ClassTeacher";

-- DropTable
DROP TABLE "Classroom";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "Lesson";

-- DropTable
DROP TABLE "SchoolHour";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "Subject";

-- DropTable
DROP TABLE "SubstituteClassTeacher";

-- DropTable
DROP TABLE "TeachesClass";

-- DropTable
DROP TABLE "TeachesSubject";

-- DropEnum
DROP TYPE "EmployeeRole";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "firstPassword" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
