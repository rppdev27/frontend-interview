# Use Node.js 18 as the base image
FROM node:18-alpine

# Install sharp's dependencies for Alpine
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# First do a clean install to generate a clean lock file
RUN npm install

# Then run ci for a clean install using the updated lock file
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the port the app will run on
EXPOSE 3099

# Start the application
CMD ["npm", "start"]