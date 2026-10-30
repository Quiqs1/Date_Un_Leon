# Date_Un_Leon
Es una aplicacion para conectar gente de la universidad , combinando sus gustos e intereses

Pasos para tener los servicios de postgres, prisma y todos los paquetes:

cp .env.example .env

pnpm install

docker compose up -d postgres

pnpm --filter @uniconnect/api exec prisma migrate dev