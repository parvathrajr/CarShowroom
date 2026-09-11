FROM node:20-alpine AS client-build

WORKDIR /app/client

COPY client/package*.json ./

RUN npm ci

COPY client/ ./

RUN npm run build

FROM node:20-alpine AS runtime

ENV NODE_ENV=production
ENV PORT=5000

WORKDIR /app/server

COPY server/package*.json ./

RUN npm ci

COPY server/ ./

COPY --from=client-build /app/client/dist ./client-dist

EXPOSE 5000

CMD ["node", "server.js"]