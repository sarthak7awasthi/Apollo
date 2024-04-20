#!/bin/bash

# Creating a docker network. Will explain reasoning later
docker network create custom-network

# C environment container
docker build -t cenv -f CodeEnvironment/Dockerfile CodeEnvironment


docker run -d --name cenv --network custom-network cenv

# main container (frontend and backend)
docker build -t myapp .


docker run -d --name myapp --network my-network -p 8000:8000 -p 3000:3000 myapp

