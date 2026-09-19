'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      router.push('/');
      return;
    }

    fetch('/api/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Лог в консоль (требование ТЗ)
        console.log('👤 PROFILE RESPONSE:', data);

        if (data.success) {
          setProfile(data.data);
        } else {
          setError('Ошибка загрузки профиля');
          localStorage.removeItem('auth_token');
          setTimeout(() => router.push('/'), 2000);
        }
      })
      .catch((err) => {
        console.error('Profile error:', err);
        setError('Ошибка соединения');
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md text-center">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            На главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          👤 Профиль пользователя
        </h1>

        {profile && (
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-600 font-medium">ID</span>
              <span className="text-gray-900 font-mono">#{profile.id}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-600 font-medium">Email</span>
              <span className="text-gray-900">{profile.email}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-600 font-medium">Пол</span>
              <span className="text-gray-900">
                {profile.gender === 'male' && '👨 Мужской'}
                {profile.gender === 'female' && '👩 Женский'}
                {profile.gender === 'other' && '🌈 Другой'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">
                Дата регистрации
              </span>
              <span className="text-gray-900 text-sm">
                {profile.created_at}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          🚪 Выйти
        </button>
      </div>
    </div>
  );
}