# STAGE 1: Сборка приложения (Builder)

# Базовый образ с Node.js (легкая версия Alpine Linux)
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# STAGE 2: Production образ

FROM node:20-alpine

RUN npm install -g serve

WORKDIR /app

# Копируем ТОЛЬКО собранные файлы из Stage 1
# Это делает финальный образ маленьким
COPY --from=builder /app/dist ./dist

EXPOSE 5173

# Запускаем сервер
# -s = single-page application (для React Router)
# -l = listen на порту 5173
CMD ["serve", "-s", "dist", "-l", "5173"]