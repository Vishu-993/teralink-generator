# Use the official Node.js image from the Docker Hub
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Set the command to run your application
CMD ["node", "api/generate-link.js"]
