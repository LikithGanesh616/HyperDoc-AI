'use client'
import { useState, useEffect } from 'react'

export default function Header() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved === 'dark' || (!saved && prefers)
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggle = () => {
    document.documentElement.classList.toggle('dark', !dark)
    localStorage.setItem('theme', !dark ? 'dark' : 'light')
    setDark(!dark)
  }

  return (
    <header className="flex items-center justify-between p-4 bg-primary text-white">
      <h1 className="text-2xl font-bold">🚀 HyperDoc AI</h1>
      <button
        onClick={toggle}
        className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 transition"
      >
        {dark ? '🌞 Light' : '🌙 Dark'}
      </button>
    </header>
  )
}