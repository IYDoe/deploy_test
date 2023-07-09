ARG NODE_VERSION=16
ARG SERVER_PORT=3001

FROM node:$NODE_VERSION-buster as base

WORKDIR /app

FROM base as builder

COPY package.json yarn.lock
RUN yarn install --frozen-lockfile
RUN yarn global add lerna

COPY . .

RUN yarn lerna bootstrap
RUN rm -rf /app/packages/server/dist/ && yarn build --scope=server


FROM node:$NODE_VERSION-buster-slim as production
WORKDIR /app

COPY --from=builder /app/packages/server/dist/ /app/
COPY --from=builder /app/packages/server/package.json /app/package.json
COPY --from=builder /app/packages/client/dist-ssr/client.cjs /app/ssr/
RUN yarn install --production=true

EXPOSE $SERVER_PORT
CMD [ "node", "/app/index.js" ]
