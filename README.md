```
bash
# В контейнере Laravel
php artisan make:model User -m
php artisan make:controller Api/AuthController
php artisan make:controller Api/ProfileController
```


```
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```