# Select a base image
FROM node:20-slim

# Create a working directory
WORKDIR /app
# Copy package.json and install dependencies
COPY package.json package-lock.json ./

RUN npm install
# Copy the rest of the files
COPY . .

# RUN npm run build

# Expose the port   
EXPOSE 7700
# Run the server
CMD ["node", server.js"]