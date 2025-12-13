# Multi-stage Dockerfile for Next.js app (production)
# Builds the app and produces a lean runtime image that runs `npm start` (next start)

FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (use package-lock if present)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only what's needed to run
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# Optional config files (skip copying to avoid build errors if missing)

EXPOSE 3000
CMD ["npm", "start"]
