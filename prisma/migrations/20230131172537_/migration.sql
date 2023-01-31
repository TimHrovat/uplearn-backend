/*
  Warnings:

  - A unique constraint covering the columns `[classTeacherId]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[substituteClassTeacherId]` on the table `Class` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Class_classTeacherId_key" ON "Class"("classTeacherId");

-- CreateIndex
CREATE UNIQUE INDEX "Class_substituteClassTeacherId_key" ON "Class"("substituteClassTeacherId");
