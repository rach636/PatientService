# Multi-purpose Dockerfile for PatientService
# Uses Node 20.11 (Alpine) and runs the app as a non-root user

FROM node:20.11-alpine

# Patch OS first
RUN apk update && apk upgrade --no-cache bash coreutils

WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json* ./

# Install production dependencies and fix vulnerabilities inside the image
RUN npm install --production --no-audit --no-fund && \
    npm audit fix --production || true

# Copy source
COPY . .

# Use a non-root user
RUN addgroup -S app && adduser -S app -G app
USER app

# Environment defaults
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start the service
CMD ["npm", "start"]
