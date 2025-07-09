import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Todo List - Stay Organized & Productive',
  description: 'A modern, feature-rich todo list application to help you stay organized and boost your productivity. Track tasks, set priorities, and achieve your goals.',
  keywords: 'todo list, task manager, productivity, organization, task tracking',
  authors: [{ name: 'Todo List App' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
