  Date Un León

Date Un León** es una aplicación diseñada para conectar a estudiantes dentro de la comunidad universitaria, facilitando el encuentro con personas afines mediante la combinación de sus gustos, pasatiempos e intereses en común.

---

Instalación y configuración del entorno

Sigue estos pasos para levantar la base de datos en PostgreSQL, ejecutar las migraciones con Prisma e instalar todas las dependencias del proyecto:

bash
cp .env.example .env

pnpm install

docker compose up -d postgres

pnpm --filter @uniconnect/api exec prisma migrate dev
