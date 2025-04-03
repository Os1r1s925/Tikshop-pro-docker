FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Create necessary directories
RUN mkdir -p uploads/videos uploads/images uploads/thumbnails uploads/voiceovers

# Expose the port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "dev"]
