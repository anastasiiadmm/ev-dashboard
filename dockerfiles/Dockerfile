FROM node:18-alpine3.16 as build
RUN apk add --update python3 make g++\ && rm -rf /var/cache/apk/*

WORKDIR /app_build

COPY . /app_build

RUN yarn install

RUN yarn build
RUN yarn global add serve

FROM umputun/nginx-le:latest

WORKDIR /app

COPY --from=build /app_build /app
