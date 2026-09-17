Установка Laravel (13)  
```
composer create-project laravel/laravel ./ --no-interaction
```

Проверка миграций   
```
sudo docker exec -it laravel_database psql -U laravel -d laravel -c "\dt"
```

Запусти миграции  
```
sudo docker exec -it laravel_php bash -c "cd /var/www/html && php artisan migrate:fresh --force"
```