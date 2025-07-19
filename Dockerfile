# Base image
FROM node:18.16-alpine

# Install dependencies for building native modules
RUN apk add --no-cache --virtual .gyp python3 make g++

# Install global npm packages
RUN npm i -g @nestjs/cli
RUN npm i -g mocha

# Create and set the working directory
RUN mkdir /app
WORKDIR /app

# Copy package.json and tsconfig.build.json to the container
COPY package.json ./
COPY tsconfig.build.json ./

# Install dependencies
RUN npm install

# Copy the entire source code to the container
COPY . .

# Build the application
RUN npm run build

# Copy i18n directory to the appropriate build location
#COPY src/i18n /app/dist/i18n

# Expose the port that the application will run on
EXPOSE 6001

# Command to run the application
CMD ["node", "/app/dist/src/main"]
