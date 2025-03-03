FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm install -g typescript
RUN which tsc
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./

RUN npm i --omit=dev
COPY --from=builder /app/dist ./dist