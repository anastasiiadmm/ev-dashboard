FROM node:18-slim as build

WORKDIR /app_build

COPY . /app_build

RUN yarn install

RUN yarn build
RUN yarn global add serve

FROM umputun/nginx-le:latest

WORKDIR /app

COPY --from=build /app_build /app
