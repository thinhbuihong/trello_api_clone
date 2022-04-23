#!/bin/bash

# docker exec -it thinhbuihong/trello yarn test

# docker-compose up -d
docker exec -it $(docker ps -q) yarn test