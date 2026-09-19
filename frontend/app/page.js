'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    gender: 'male',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Валидация email
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    // === ФРОНТ-ВАЛИДАЦИЯ ===
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Введите корректный email' });
      setLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      setErrors({ password: 'Пароль должен быть минимум 8 символов' });
      setLoading(false);
      return;
    }

    try {
      // === ЗАПРОС ===
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // === ЛОГИ В КОНСОЛЬ (требование ТЗ) ===
      console.log('📦 REQUEST:', formData);
      console.log('📦 RESPONSE:', data);

      if (response.ok) {
        // Сохраняем токен
        localStorage.setItem('auth_token', data.data.token);
        // Переход на страницу профиля
        router.push('/profile');
      } else {
        setErrors({
          general: data.message || 'Ошибка регистрации',
          ...(data.errors || {}),
        });
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setErrors({ general: 'Ошибка соединения с сервером' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          📝 Регистрация
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="example@mail.com"
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Минимум 8 символов"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Показать пароль"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Gender */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пол
            </label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">👨 Мужской</option>
              <option value="female">👩 Женский</option>
              <option value="other">🌈 Другой</option>
            </select>
          </div>

          {/* Общая ошибка */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          {/* Кнопка */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors text-lg"
          >
            {loading ? '⏳ Отправка...' : 'Зарегистрироваться'}
          </button>
        </form>
      </div>
    </div>
  );
}