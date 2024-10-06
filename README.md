# Vibe

**Vibe** — это социальная платформа, которая позволяет пользователям делиться своими любимыми атмосферными местами с друзьями. Она использует современные технологии для создания удобного пользовательского интерфейса, где можно исследовать, подключаться и рекомендовать "vibe" места в вашем регионе или по всему миру.

## Содержание

- [Особенности](#особенности)
- [Технологический стек](#технологический-стек)
- [Установка](#установка)
- [Использование](#использование)
- [Вклад в проект](#вклад-в-проект)

## Особенности

- **Карта атмосферных мест**: Исследуйте карту с добавленными пользователями атмосферными местами.
- **Система друзей**: Добавляйте друзей и приглашайте их на новые места.
- **Описание мест**: Просматривайте детальные описания мест с фотографиями, комментариями и оценками.
- **Персонализированные рекомендации**: Получайте рекомендации на основе вашей активности и предпочтений.
- **Приглашение друзей**: Делитесь атмосферными местами с друзьями через социальные функции платформы.

## Технологический стек

- **Backend**:

  - [Node.js](https://nodejs.org/)
  - [Nest.js](https://nestjs.com/) — Фреймворк для построения масштабируемых серверных приложений.
  - [Sequelize](https://sequelize.org/) — ORM для управления базой данных PostgreSQL.

- **Frontend**:

  - [React.js](https://reactjs.org/) — Библиотека для построения пользовательских интерфейсов.

- **База данных**:
  - [PostgreSQL](https://www.postgresql.org/) — Реляционная система управления базами данных.

## Установка

### Необходимые условия

Перед началом работы убедитесь, что у вас установлены следующие инструменты:

- Node.js (v14 или выше)
- PostgreSQL (v12 или выше)
- NPM или Yarn (для управления зависимостями)

### Настройка

1. **Клонируйте репозиторий**:

   ```bash
   git clone https://github.com/ysayonnar/vibe.git
   cd vibe
   ```

2. **Установите зависимости**:

   ```bash
   cd server
   npm i
   cd ../client
   npm i
   ```

   или, если используете Yarn:

   ```bash
   yarn install
   ```

3. **Настройте базу данных**:

   Создайте файл `.env` в корневой директории и добавьте параметры подключения к вашей базе данных PostgreSQL:

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=vibe_db
   ```

4. **Запустите миграции базы данных**:

   Используйте Sequelize для запуска миграций:

   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Запустите приложение**:

   Запустите сервер на стороне backend:

   ```bash
   npm run start:dev
   ```

   Запустите клиентское приложение:

   ```bash
   cd client
   npm start
   ```

6. **Доступ к приложению**:

   Откройте браузер и перейдите по адресу `http://localhost:3000`.

## Использование

1. **Зарегистрируйтесь и войдите в систему**, чтобы создать аккаунт.
2. **Добавляйте друзей** для обмена местами и рекомендациями.
3. **Исследуйте карту**, чтобы найти интересные места, добавленные другими пользователями.
4. **Добавляйте новые места** с описанием, фотографиями и оценками.
5. **Получайте персонализированные рекомендации** на основе ваших предпочтений.

## Вклад в проект

Если хотите внести вклад в проект Vibe, отправьте pull request. Пожалуйста, следуйте существующим стилям кодирования и конвенциям. Также можете открыть issue, если нашли ошибку или у вас есть запрос на новую функцию!

1. Форкните репозиторий.
2. Создайте новую ветку: `git checkout -b feature/your-feature-name`.
3. Сделайте изменения и закоммитьте их: `git commit -m 'Add some feature'`.
4. Запушьте ветку: `git push origin feature/your-feature-name`.
5. Откройте pull request.
