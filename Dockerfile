# Use an official OpenJDK 8 runtime as a parent image
FROM openjdk:8-jdk-slim

# Install Ant, optipng, libjpeg-turbo-progs, and npm
RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  ant \
  optipng \
  libjpeg-turbo-progs \
  npm && \
  rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the project files into the container
COPY . /app

# Set the working directory to dev for the build
WORKDIR /app/dev

# Run the Ant build script
# The build script creates a 'publish' directory in /app/dev
RUN ant -f build/build.xml

# Install a simple HTTP server to serve the static files
RUN npm install -g http-server

# Expose port 8080
EXPOSE 8080

# Serve the publish directory
CMD [ "http-server", "/app/dev/publish", "-p", "8080" ]

