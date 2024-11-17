# Use Node.js 18 as the base image
FROM node:18-alpine

# Install dependencies required for building
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
# Note: We can skip the double install (npm install + npm ci) and just use npm ci
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the application
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]