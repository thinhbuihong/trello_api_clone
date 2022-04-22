#!/bin/bash

docker run -p 3000:4000 -v /app/node_modules -v $(pwd):/app thinhbuihong/trello
# -v $(pwd):/app map folder app inside container => pwd outside
# -v /app/node_modules don't map this folder