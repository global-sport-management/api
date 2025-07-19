FROM node:18.16-alpine

# Build dependencies for native modules
RUN apk add --no-cache --virtual .gyp python3 make g++

# Global Nest CLI
RUN npm install -g @nestjs/cli

# App directory
WORKDIR /app

# Install only production deps
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build NestJS app
RUN npm run build

# Expose app port
EXPOSE 6001

# Start app
CMD ["node", "dist/src/main"]
