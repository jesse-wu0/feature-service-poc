# syntax = docker/dockerfile:1.0-experimental

FROM node:16-alpine3.13 AS builder
WORKDIR /app
COPY ./package*.json ./
COPY ./prepare.sh ./

# Install build dependencies
RUN apk update -q && apk add --no-cache \
  python3=~3.8.10 \
  make=~4.3 \
  g++=~10.2.1

# We're using DockerBuildKit to inject the NPM_TOKEN safely to .npmrc file
RUN --mount=type=secret,id=NPM_TOKEN,dst=/app/.npmrc --mount=type=cache,target=~/.npm npm install
COPY . .
RUN npm run build

FROM node:16-alpine3.13
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prepare.sh ./
RUN --mount=type=secret,id=NPM_TOKEN,dst=/app/.npmrc --mount=type=cache,target=~/.npm npm install --production

ENV PORT=3000
EXPOSE $PORT

ARG app_version
ENV APP_VERSION=$app_version

CMD ["npm", "run", "start:prod"]
