FROM node:lts-alpine as dependency
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm ci

FROM node:lts-alpine as builder
WORKDIR /app
COPY --from=dependency /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:lts-alpine as running
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/*.json ./
COPY --from=builder /app/*.config.* ./
COPY --from=builder /app/.env* ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "run", "start"]