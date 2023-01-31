/*
  Warnings:

  - The primary key for the `Subject_SubjectList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `classSubjectListId` on the `Subject_SubjectList` table. All the data in the column will be lost.
  - You are about to drop the column `lessonsPerWeek` on the `Subject_SubjectList` table. All the data in the column will be lost.
  - Added the required column `subjectListId` to the `Subject_SubjectList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subject_SubjectList" DROP CONSTRAINT "Subject_SubjectList_classSubjectListId_fkey";

-- AlterTable
ALTER TABLE "Subject_SubjectList" DROP CONSTRAINT "Subject_SubjectList_pkey",
DROP COLUMN "classSubjectListId",
DROP COLUMN "lessonsPerWeek",
ADD COLUMN     "subjectListId" TEXT NOT NULL,
ADD CONSTRAINT "Subject_SubjectList_pkey" PRIMARY KEY ("subjectAbbreviation", "subjectListId");

-- AddForeignKey
ALTER TABLE "Subject_SubjectList" ADD CONSTRAINT "Subject_SubjectList_subjectListId_fkey" FOREIGN KEY ("subjectListId") REFERENCES "SubjectList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
