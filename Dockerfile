# Базовый образ Node.js для этапа base
ARG NODE_VERSION=16
FROM node:$NODE_VERSION-buster as base

# Установка lerna
RUN yarn global add lerna

# Рабочая директория для этапа builder
WORKDIR /app

# Этап builder
FROM base as builder

# Копирование package.json и yarn.lock
COPY package.json yarn.lock ./

# Установка зависимостей
RUN yarn install --frozen-lockfile

# Копирование остальных файлов
COPY . .

# Запуск lerna bootstrap
RUN lerna bootstrap

# Удаление предыдущей сборки клиентского приложения и запуск сборки
RUN rm -rf /app/packages/client/dist/ && yarn build --scope=client

# Этап production
FROM nginx:latest as production

# Рабочая директория для этапа production
WORKDIR /app

# Копирование собранного клиентского приложения и конфигурации Nginx
COPY --from=builder /app/packages/client/dist/ /app/
COPY --from=builder /app/packages/client/nginx.conf /etc/nginx/nginx.conf

# Открытие порта для клиентского приложения
ARG CLIENT_PORT=3001
EXPOSE $CLIENT_PORT

# Запуск Nginx
CMD [ "nginx", "-g", "daemon off;" ]
