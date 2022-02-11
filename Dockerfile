# syntax=docker/dockerfile:1
FROM node:16 as base

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

# dev
FROM base as dev

EXPOSE 3000

EXPOSE 5000

CMD yarn dev

# test
FROM base as test

CMD ["yarn", "test"]
