/*
  Warnings:

  - The primary key for the `Employee_Subject_Class` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Employee_Subject_Class" DROP CONSTRAINT "Employee_Subject_Class_pkey",
ADD CONSTRAINT "Employee_Subject_Class_pkey" PRIMARY KEY ("subjectAbbreviation", "className");
