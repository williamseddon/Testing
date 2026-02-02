'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function HeaderSearch() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function go() {
    const query = q.trim()
    if (!query) return
    setOpen(false)
    router.push(`/deck?q=${encodeURIComponent(query)}`)
    setQ('')
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center gap-2 rounded-xl2 border border-black/10 bg-white/70 px-3 text-sm text-black/60 hover:bg-white"
        aria-label="Search the deck"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search</span>
        <span className="hidden text-xs text-black/40 sm:inline">⌘K</span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/30 p-4 pt-24 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-xl rounded-2xl border border-black/10 bg-white p-3 shadow-glow">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-black/50" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') go()
                }}
                placeholder="Search cards, quotes, Housewives…"
                className={cn(
                  'h-12 w-full rounded-xl2 bg-black/5 px-4 text-base outline-none',
                  'placeholder:text-black/35',
                )}
              />
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl2 hover:bg-black/5"
                aria-label="Close search"
              >
                <X className="h-5 w-5 text-black/60" />
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between px-1 text-xs text-black/45">
              <span>Press Enter to search</span>
              <span>Esc to close</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
