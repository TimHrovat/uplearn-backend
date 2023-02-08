-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "substituteEmployeeId" TEXT,
ALTER COLUMN "employeeId" DROP NOT NULL,
ALTER COLUMN "subjectAbbreviation" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_substituteEmployeeId_fkey" FOREIGN KEY ("substituteEmployeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
