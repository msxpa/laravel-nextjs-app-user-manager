import './globals.css'

export const metadata = {
  title: 'Регистрация — Тестовое задание',
  description: 'Laravel 13 + Next.js 14 + PostgreSQL',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="bg-gray-50 min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}