/*
  Warnings:

  - Added the required column `subjectAbbreviation` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Grade" ADD COLUMN     "subjectAbbreviation" TEXT NOT NULL,
ALTER COLUMN "value" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_subjectAbbreviation_fkey" FOREIGN KEY ("subjectAbbreviation") REFERENCES "Subject"("abbreviation") ON DELETE CASCADE ON UPDATE CASCADE;
