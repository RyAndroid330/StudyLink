# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the frontend source code
COPY . .

# Build the Nuxt app
RUN npm run build

# Expose the Nuxt default port
EXPOSE 3000

# Start the Nuxt app
CMD ["npm", "run", "start"]
