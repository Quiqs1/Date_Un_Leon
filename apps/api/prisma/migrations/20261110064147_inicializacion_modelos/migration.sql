-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "nombre" VARCHAR(45) NOT NULL,
    "apellidos" VARCHAR(45) NOT NULL,
    "username" VARCHAR(45) NOT NULL,
    "password" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "celular" VARCHAR(15) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_carrera" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Follow" (
    "id_seguidor" INTEGER NOT NULL,
    "id_seguido" INTEGER NOT NULL,
    "fecha_de_follow" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id_seguidor","id_seguido")
);

-- CreateTable
CREATE TABLE "Carrera" (
    "id_carrera" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,

    CONSTRAINT "Carrera_pkey" PRIMARY KEY ("id_carrera")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_correo_key" ON "User"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "User_celular_key" ON "User"("celular");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_carrera_fkey" FOREIGN KEY ("id_carrera") REFERENCES "Carrera"("id_carrera") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_id_seguidor_fkey" FOREIGN KEY ("id_seguidor") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_id_seguido_fkey" FOREIGN KEY ("id_seguido") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
