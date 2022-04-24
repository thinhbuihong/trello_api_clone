FROM node:16 as builder

WORKDIR '/app'

COPY package.json .
RUN ["yarn","--prod"] 

COPY . .
RUN ["yarn","build"]

# EXPOSE 4000
CMD ["node","dist"]
