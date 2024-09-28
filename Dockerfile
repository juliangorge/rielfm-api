FROM node:22.9.0-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Build the TypeScript files
RUN yarn build

# Expose port 8080
EXPOSE 8080

# Start the app
CMD yarn start
