/*
  Warnings:

  - You are about to drop the `ClassTeacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubstituteClassTeacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClassTeacher" DROP CONSTRAINT "ClassTeacher_className_fkey";

-- DropForeignKey
ALTER TABLE "ClassTeacher" DROP CONSTRAINT "ClassTeacher_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "SubstituteClassTeacher" DROP CONSTRAINT "SubstituteClassTeacher_className_fkey";

-- DropForeignKey
ALTER TABLE "SubstituteClassTeacher" DROP CONSTRAINT "SubstituteClassTeacher_employeeId_fkey";

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "classTeacherId" TEXT,
ADD COLUMN     "substituteClassTeacherId" TEXT;

-- DropTable
DROP TABLE "ClassTeacher";

-- DropTable
DROP TABLE "SubstituteClassTeacher";

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_classTeacherId_fkey" FOREIGN KEY ("classTeacherId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_substituteClassTeacherId_fkey" FOREIGN KEY ("substituteClassTeacherId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
