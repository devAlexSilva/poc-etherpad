-- CreateTable
CREATE TABLE "pads" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "name_hash" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "key" TEXT NOT NULL,
    "creator_user" INTEGER NOT NULL,

    CONSTRAINT "pads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subOfPad" (
    "user_id" INTEGER NOT NULL,
    "pad_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "pads_name_hash_key" ON "pads"("name_hash");

-- CreateIndex
CREATE UNIQUE INDEX "subs_of_pad" ON "subOfPad"("user_id", "pad_id");

-- AddForeignKey
ALTER TABLE "pads" ADD CONSTRAINT "pads_creator_user_fkey" FOREIGN KEY ("creator_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subOfPad" ADD CONSTRAINT "subOfPad_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subOfPad" ADD CONSTRAINT "subOfPad_pad_id_fkey" FOREIGN KEY ("pad_id") REFERENCES "pads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
