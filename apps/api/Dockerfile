FROM node:22-alpine AS base
RUN corepack enable && apk add --no-cache openssl
WORKDIR /apps
FROM base AS pruner
COPY . .
RUN pnpm dlx turbo prune @uniconnect/api --docker

FROM base AS builder 
COPY --from=pruner /apps/api/ .

RUN pnpm install --frozen-lockfile

COPY --from=pruner /apps/api/ .
RUN pnpm --filter @uniconnect/api exec prisma generate && pnpm --filter @uniconnect/api build

RUN pnpm --filter @uniconnect/api deploy --prod /prod/api

FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /prod/api ./
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/prisma ./prisma
RUN pnpm exec prisma generate && addgroup -S app && adduser -S app -G app && chown -R app:app /app
USER app
EXPOSE 4000
HEALTHCHECK --interval=15s --timeout=3s --retries=5 CMD wget -qOhttp://localhost:4000/health || exit 1
CMD ["node", "dist/server.js"]
