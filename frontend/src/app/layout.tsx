// frontend/src/app/layout.tsx
import './globals.css'
import Header from '@/components/Header'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Hyperdoc AI',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen transition-colors duration-300">
        <Header />
        <main className="p-4">{children}</main>
      </body>
    </html>
  )
}