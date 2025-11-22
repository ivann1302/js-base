https://js-base-blond.vercel.app/

# JS Base

Проект представляет собой базу знаний в сфере frontend-разработки и смежных областях.

## Технологии

### Основной стек

- React 18
- TypeScript 5.6
- Vite 6
- React Router 7

### Управление состоянием

- Redux Toolkit
- React Query (TanStack Query)

### Стилизация

- SCSS
- CSS Modules

### Валидация и нормализация

- Zod
- Normalizr

### HTTP клиент

- Axios

### Инструменты разработки

- ESLint
- Prettier
- TypeScript ESLint
- Commitizen

### Деплой

- GitHub Actions
- Vercel

### Контейнеризация

- Docker
- Docker Compose

## Структура проекта

Проект организован по методологии Feature-Sliced Design:

- app - инициализация приложения, провайдеры, роутинг
- pages - страницы приложения
- widgets - крупные UI компоненты
- features - функциональные возможности
- entities - бизнес-сущности
- shared - переиспользуемые компоненты и утилиты

## Команды

- `npm run dev` - запуск dev сервера
- `npm run build` - сборка проекта
- `npm run lint` - проверка кода линтером
- `npm run format` - форматирование кода
- `npm run check` - полная проверка (формат, линт, типы)
- `npm run docker:dev` - запуск в Docker для разработки
- `npm run docker:prod` - запуск production версии в Docker
