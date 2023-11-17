# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build TypeScript code
RUN npm run build

# Expose any necessary ports
EXPOSE 3000

# Run the TypeScript app
CMD ["node", "dist/index.html"]
