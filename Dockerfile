ARG NODE_VERSION=16
ARG CLIENT_PORT=3001

FROM node:$NODE_VERSION-buster as base

RUN yarn global add lerna
RUN yarn lerna bootstrap

WORKDIR /app

FROM base as builder

COPY package.json yarn.lock
RUN yarn install --frozen-lockfile

COPY . .


RUN rm -rf /app/packages/server/dist/ && yarn build --scope=client


FROM nginx:latest as production
WORKDIR /app

COPY --from=builder /app/packages/client/dist/ /app/
COPY --from=builder /app/packages/client/nginx.conf /etc/nginx/nginx.conf

EXPOSE $CLIENT_PORT
CMD [ "nginx", "-g", "daemon off;" ]
