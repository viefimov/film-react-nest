FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm i --omit=dev
COPY --from=builder /app/dist ./dist
CMD ["sh", "-c", "sleep 10 && node dist/main"]
