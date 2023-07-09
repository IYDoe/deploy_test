# Этап базового образа
ARG NODE_VERSION=16
FROM node:$NODE_VERSION-buster as base

# Установка глобальной зависимости - lerna
RUN yarn global add lerna

# Рабочая директория
WORKDIR /app

# Этап builder
FROM base as builder

# Копирование package.json и yarn.lock для установки зависимостей
COPY package.json yarn.lock ./

# Установка зависимостей для корневой папки
RUN yarn install --frozen-lockfile

# Копирование всех файлов
COPY . .

# Установка зависимостей для пакета client
RUN cd packages/client && yarn install --frozen-lockfile

# Установка зависимостей для пакета server
RUN cd packages/server && yarn install --frozen-lockfile

# Сборка клиентского приложения
RUN cd packages/client && yarn build

# Этап production
FROM nginx:latest as production

# Рабочая директория
WORKDIR /app

# Копирование собранного клиентского приложения
COPY --from=builder /app/packages/client/dist/ /app/

# Копирование конфигурационного файла nginx
COPY --from=builder /app/packages/client/nginx.conf /etc/nginx/nginx.conf

# Открытие порта для клиентского приложения
EXPOSE 3001

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]
