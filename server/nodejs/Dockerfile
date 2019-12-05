FROM node:10-alpine

RUN mkdir -p /srv/app/home-server
# Create app directory
WORKDIR /srv/app/home-server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /srv/app/home-server
COPY package-lock.json /srv/app/home-server

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /srv/app/home-server

# EXPOSE 8080
CMD [ "npm", "start" ]