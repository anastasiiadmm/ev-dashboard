FROM node:18-slim as build

ARG VITE_API_URL
ARG VITE_API_SENTRY_DSN

ENV VITE_API_URL=${VITE_API_URL:-local}
ENV VITE_API_SENTRY_DSN=${VITE_API_SENTRY_DSN}

WORKDIR /app

COPY package.json .

RUN yarn install --inline-builds

COPY . .

RUN yarn build
RUN yarn global add serve
