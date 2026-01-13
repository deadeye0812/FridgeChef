# =========================================
# Stage 1: Build the React.js Application
# =========================================
ARG NODE_VERSION=24.7.0-alpine
ARG NGINX_VERSION=alpine3.22

# Use a lightweight Node.js image for building (customizable via ARG)
FROM node:${NODE_VERSION} AS builder

# Set the working directory inside the container
WORKDIR /inventorymanagementfrontend

# Copy package-related files first to leverage Docker's caching mechanism
COPY package*.json ./

# Install project dependencies using npm ci (ensures a clean, reproducible install)
RUN npm install

# Copy the rest of the application source code into the container
COPY . .

# Build the React.js application (outputs to /app/dist)
EXPOSE 3000

CMD ["npm", "start"]