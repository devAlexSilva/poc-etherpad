/*
  Warnings:

  - You are about to drop the column `creator_user` on the `pads` table. All the data in the column will be lost.
  - You are about to drop the column `name_hash` on the `pads` table. All the data in the column will be lost.
  - You are about to drop the column `private` on the `pads` table. All the data in the column will be lost.
  - You are about to drop the `subOfPad` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nameHash]` on the table `pads` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creatorUser` to the `pads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameHash` to the `pads` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pads" DROP CONSTRAINT "pads_creator_user_fkey";

-- DropForeignKey
ALTER TABLE "subOfPad" DROP CONSTRAINT "subOfPad_pad_id_fkey";

-- DropForeignKey
ALTER TABLE "subOfPad" DROP CONSTRAINT "subOfPad_user_id_fkey";

-- DropIndex
DROP INDEX "pads_name_hash_key";

-- AlterTable
ALTER TABLE "pads" DROP COLUMN "creator_user",
DROP COLUMN "name_hash",
DROP COLUMN "private",
ADD COLUMN     "creatorUser" INTEGER NOT NULL,
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nameHash" TEXT NOT NULL;

-- DropTable
DROP TABLE "subOfPad";

-- CreateTable
CREATE TABLE "subs_of_pad" (
    "userId" INTEGER NOT NULL,
    "padId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "sub_of_pad" ON "subs_of_pad"("userId", "padId");

-- CreateIndex
CREATE UNIQUE INDEX "pads_nameHash_key" ON "pads"("nameHash");

-- AddForeignKey
ALTER TABLE "pads" ADD CONSTRAINT "pads_creatorUser_fkey" FOREIGN KEY ("creatorUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subs_of_pad" ADD CONSTRAINT "subs_of_pad_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subs_of_pad" ADD CONSTRAINT "subs_of_pad_padId_fkey" FOREIGN KEY ("padId") REFERENCES "pads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
