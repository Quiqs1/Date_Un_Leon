/*
  Warnings:

  - You are about to alter the column `correo` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[nombre]` on the table `Carrera` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_id_seguido_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_id_seguidor_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "correo" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "celular" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Post" (
    "id_post" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id_post")
);

-- CreateTable
CREATE TABLE "Like" (
    "id_like" SERIAL NOT NULL,
    "id_usuario_origen" INTEGER NOT NULL,
    "id_usuario_destino" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id_like")
);

-- CreateTable
CREATE TABLE "Match" (
    "id_match" SERIAL NOT NULL,
    "usuario_1" INTEGER NOT NULL,
    "usuario_2" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id_match")
);

-- CreateIndex
CREATE INDEX "Post_id_user_created_at_idx" ON "Post"("id_user", "created_at" DESC);

-- CreateIndex
CREATE INDEX "Like_id_usuario_destino_idx" ON "Like"("id_usuario_destino");

-- CreateIndex
CREATE UNIQUE INDEX "Like_id_usuario_origen_id_usuario_destino_key" ON "Like"("id_usuario_origen", "id_usuario_destino");

-- CreateIndex
CREATE INDEX "Match_usuario_2_idx" ON "Match"("usuario_2");

-- CreateIndex
CREATE UNIQUE INDEX "Match_usuario_1_usuario_2_key" ON "Match"("usuario_1", "usuario_2");

-- CreateIndex
CREATE UNIQUE INDEX "Carrera_nombre_key" ON "Carrera"("nombre");

-- CreateIndex
CREATE INDEX "Follow_id_seguido_idx" ON "Follow"("id_seguido");

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_id_seguidor_fkey" FOREIGN KEY ("id_seguidor") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_id_seguido_fkey" FOREIGN KEY ("id_seguido") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_id_usuario_origen_fkey" FOREIGN KEY ("id_usuario_origen") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_id_usuario_destino_fkey" FOREIGN KEY ("id_usuario_destino") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_usuario_1_fkey" FOREIGN KEY ("usuario_1") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_usuario_2_fkey" FOREIGN KEY ("usuario_2") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Follow" ADD CONSTRAINT "follow_no_self" CHECK ("id_seguidor" <> "id_seguido");
ALTER TABLE "Like" ADD CONSTRAINT "like_no_self" CHECK ("id_usuario_origen" <> "id_usuario_destino");
ALTER TABLE "Match" ADD CONSTRAINT "match_ordered_users" CHECK ("usuario_1" < "usuario_2");