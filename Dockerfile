FROM node:22-alpine

LABEL org.opencontainers.image.title="tp-docker-api" \
      org.opencontainers.image.version="1.0.0" \
      org.opencontainers.image.description="API REST Livres - Node.js, Express et MongoDB"

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY src ./src

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

USER node

CMD ["node", "src/server.js"]
