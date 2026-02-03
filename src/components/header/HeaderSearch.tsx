'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function HeaderSearch() {
  const router = useRouter()
  const dialogTitleId = useId()

  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')

  // Open via Cmd/Ctrl+K, close via Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase()

      if ((e.ctrlKey || e.metaKey) && key === 'k') {
        e.preventDefault()
        setOpen(true)
        return
      }

      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Lock scroll + focus management when modal is open
  useEffect(() => {
    if (!open) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus input on open
    const t = window.setTimeout(() => inputRef.current?.focus(), 0)

    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = prevOverflow
      // Restore focus to the trigger
      triggerRef.current?.focus()
    }
  }, [open])

  // Click outside closes
  useEffect(() => {
    if (!open) return

    function onPointerDown(e: PointerEvent) {
      const dialog = dialogRef.current
      if (!dialog) return
      if (!dialog.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  // Focus trap (Tab cycles inside dialog)
  useEffect(() => {
    if (!open) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      const root = dialogRef.current
      if (!root) return

      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))

      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  function close() {
    setOpen(false)
  }

  function go() {
    const query = q.trim()
    if (!query) return
    close()
    router.push(`/deck?q=${encodeURIComponent(query)}`)
    setQ('')
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex h-10 items-center gap-2 rounded-2xl border border-black/10 bg-white/70 px-3 text-sm text-black/60',
          'hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30',
        )}
        aria-label="Search the deck"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search</span>
        <span className="hidden text-xs text-black/40 sm:inline">⌘K</span>
      </button>

      {open ? (
        <div
          className={cn(
            'fixed inset-0 z-[100] flex items-start justify-center bg-black/30 backdrop-blur-sm',
            // safe area + mobile spacing
            'p-4 pt-20 sm:pt-24',
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
        >
          <div
            ref={dialogRef}
            className="w-full max-w-xl rounded-2xl border border-black/10 bg-white p-3 shadow-glow"
          >
            {/* Visually hidden title for screen readers */}
            <h2 id={dialogTitleId} className="sr-only">
              Search the deck
            </h2>

            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-black/50" />

              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') go()
                  if (e.key === 'Escape') close()
                }}
                placeholder="Search cards, quotes, Housewives…"
                inputMode="search"
                className={cn(
                  'h-12 w-full rounded-2xl bg-black/5 px-4 text-base outline-none',
                  'placeholder:text-black/35 focus-visible:ring-2 focus-visible:ring-black/20',
                )}
              />

              <button
                type="button"
                onClick={close}
                className={cn(
                  'inline-flex h-10 w-10 items-center justify-center rounded-2xl',
                  'hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30',
                )}
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
