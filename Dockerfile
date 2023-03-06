# Image base
FROM node:18

# Environment
ENV NODE_ENV=production

#Create a directory on the container's file system and set the appropriate permissions on that directory to ensure that your Node.js application has access to it.
RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#User
USER node

RUN npm install --production
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node . .

#Port
EXPOSE 4000

# Run the app
CMD [ "npm", "start" ]
