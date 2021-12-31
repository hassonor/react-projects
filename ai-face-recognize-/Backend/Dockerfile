FROM node:16.13.0

# Create app directory
RUN mkdir -p /usr/src/ai-face-recognize-api
WORKDIR /usr/src/ai-face-recognize-api

# Install app dependencies
COPY package.json /usr/src/ai-face-recognize-api
RUN npm install

# Bundle app source
COPY . /usr/src/ai-face-recognize-api

# Build arguments
ARG NODE_VERSION=16.13.0

# Environment
ENV NODE_VERSION $NODE_VERSION