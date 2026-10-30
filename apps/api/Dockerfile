FROM node:22-alpine AS base
RUN corepack enable && apk add --no-cache openssl
WORKDIR /apps

FROM base AS pruner
COPY . .
RUN npm install -g turbo
RUN turbo prune @uniconnect/api --docker

FROM base AS builder 

COPY --from=pruner /apps/out/json/ .


RUN pnpm install --frozen-lockfile


COPY --from=pruner /apps/out/full/ .


RUN pnpm --filter @uniconnect/api exec prisma generate 
RUN pnpm --filter @uniconnect/api build

RUN pnpm --filter @uniconnect/api deploy --prod --legacy /prod/api

FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /prod/api ./
COPY --from=builder /apps/apps/api/prisma ./prisma

RUN pnpm exec prisma generate && addgroup -S app && adduser -S app -G app && chown -R app:app /app
USER app
EXPOSE 4000
#HEALTHCHECK --interval=15s --timeout=3s --retries=5 CMD wget -qO http://localhost:4000/health || exit 1

CMD ["node", "dist/index.js"]