# Use official Node.js image with LTS
FROM node:20-bullseye-slim

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm@10 && pnpm install --frozen-lockfile --prod=false

# Copy rest of the app
COPY . .

# Build
RUN pnpm build

# Production image
FROM node:20-bullseye-slim
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app/.next ./.next
COPY --from=0 /usr/src/app/node_modules ./node_modules
COPY --from=0 /usr/src/app/package.json ./package.json

EXPOSE 3000
ENV NODE_ENV=production
CMD ["pnpm", "start"]
