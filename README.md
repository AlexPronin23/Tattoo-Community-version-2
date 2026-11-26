# 1. Название проекта

 Tattoo Community - веб приложение для взаимодействия тату мастеров и клиентов: поиск,заказы,отзывы,рейтинг.

 ![Main Screen](" <img width="1893" height="912" alt="Main Screen" src="https://github.com/user-attachments/assets/ab065c27-0b1e-4787-aae9-6c4994c79aa5" /> ")


# 2. Стек технологий

 + Frontend: React,Redux Toolkit, React Router
 + Backend: Node.js, Express.js, Sequielize
 + DataBase: Mysql


# 3. Как запустить

```bash

git clone https://github.com/AlexPronin23/Tattoo-Community-version-2.git

// client
cd client/Tattoo-Community
npm run dev

// server
cd server
npm start

```
# 4. Реализованные фичи

 ☑ Регистрация,авторизация, аутентификация пользователей в системе
 
 ☑ Личный кабинет пользователей (тату мастер и обычный пользователь)
 
 ☑ Создание анкеты мастера
 
 ☑ Добавление портфолио
 
 ☑ Создание услуг
 
 ☑ Отдельная страница мастера
 
 ☑ Система создание заказов (записей)
 
 ☑ Система создания отзывов
 
 ☑ Средний рейтинг мастера
 
 ☑ Средняя цена услуг мастера

# 5. Технические решения
 1. Пагинация и фильтрация на сервере (SQL LIMIT/OFFSET)
 2. Валидация данных на сервере
 3. Хранение полученных данных в Redux (для удобного управления данными, устаранение props drilling)

# 6. Что дальше
 1. Добавить тесты
 2. Развернуть проект на сервере

# 7. Структура проекта
  
  /server - API
  /client - React


# 9. Контакты

  GitHub - https://github.com/AlexPronin23?tab=repositories
  
  Telegram - @alexeypronin97
  
  ВК - https://vk.ru/proninofficial97
