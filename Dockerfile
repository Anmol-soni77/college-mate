# Use the official Node.js image as the base image
FROM node:12

# Set the working directory in the container
WORKDIR /src

# Install the application dependencies
RUN npm install

EXPOSE 8000

# Define the entry point for the container
CMD ["npm", "start"]