FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app
FROM base AS pruner
COPY . .
RUN npx turbo prune @uniconnect/web --docker
FROM base AS builder
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
RUN pnpm --filter @uniconnect/web build
FROM nginx:1.27-alpine AS runner
COPY docker/nginx-web.conf /etc/nginx/conf.d/default.conf

