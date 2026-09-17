# 🔑 Ключевые изменения
# Было	Стало	Почему
# COPY composer.json ./	Убрано	bind mount уже монтирует файлы
# RUN composer install	Убрано	composer установится внутри контейнера вручную
# COPY . .	Убрано	bind mount монтирует всё автоматически
# RUN mkdir storage...	Убрано	Laravel создаст папки сам при composer create-project
# chmod 775 public	Убрано	Лишнее

# cd ~/Desktop/laravel_next_user_api/backend
# # Удаляем всё кроме Dockerfile
# find . -mindepth 1 ! -name 'Dockerfile' -exec rm -rf {} + 2>/dev/null
# # Проверяем
# ls -la
# cd ~/Desktop/laravel_next_user_api
# # Останавливаем контейнеры
# sudo docker compose down
# # Собираем PHP заново
# sudo docker compose build --no-cache php
# # Запускаем
# sudo docker compose up -d
# # Проверяем статус
# sudo docker compose ps

# Заходим в контейнер
# sudo docker exec -it laravel_php bash
# # Внутри контейнера
# cd /var/www/html
# # Устанавливаем Laravel
# composer create-project laravel/laravel . --no-interaction

# # Если composer ругается — очищаем и пробуем снова:
# # Внутри контейнера
# cd /var/www/html
# rm -rf * .[!.]* 2>/dev/null
# composer create-project laravel/laravel /tmp/laravel --no-interaction
# cp -a /tmp/laravel/. /var/www/html/
# rm -rf /tmp/laravel

FROM php:8.4-fpm

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql pdo_mysql mbstring exif pcntl bcmath gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

EXPOSE 9000
CMD ["php-fpm"]





# FROM php:8.4-fpm

# # Установка зависимостей
# RUN apt-get update && apt-get install -y \
#     git \
#     curl \
#     libpng-dev \
#     libonig-dev \
#     libxml2-dev \
#     zip \
#     unzip \
#     libpq-dev \
#     && docker-php-ext-install pdo_pgsql pdo_mysql mbstring exif pcntl bcmath gd

# # Установка Composer
# COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# WORKDIR /var/www/html

# # Копируем composer.json
# COPY composer.json ./

# # Устанавливаем зависимости (игнорируем ошибки если нет Laravel)
# RUN composer install --no-interaction --optimize-autoloader || true

# # Копируем все файлы
# COPY . .

# # Создаем папки если их нет
# RUN mkdir -p storage/framework/{sessions,views,cache} \
#     && mkdir -p bootstrap/cache \
#     && chown -R www-data:www-data /var/www/html \
#     && chmod -R 775 storage bootstrap/cache \
#     && chmod -R 775 public

# EXPOSE 9000
# CMD ["php-fpm"]