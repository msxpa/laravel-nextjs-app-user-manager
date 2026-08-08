import './globals.css'

export const metadata = {
  title: 'Next.js + Tailwind',
  description: 'Тестовое задание',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}