# Specify the node base image with your desired version
FROM node:18

RUN mkdir -p /usr/src/app
# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Install git
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y curl

# Install PM2 globally in the image
# RUN npm install pm2 -g

# Copy files to the working directory
# COPY package*.json ./
COPY . .

# Install app dependencies
RUN npm install --audit=false

CMD [ "npm", "run", "start" ]
