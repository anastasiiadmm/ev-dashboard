FROM node:18-slim as build

ARG VITE_API_URL

ENV VITE_API_URL=${VITE_API_URL:-local}

WORKDIR /app

COPY package.json .

RUN yarn install --inline-builds

COPY . .

RUN yarn build
RUN yarn global add serve
