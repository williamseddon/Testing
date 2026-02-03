'use client'

import { useEffect, useState } from 'react'
import type { ComponentType } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight, Sparkles, Layers, Shuffle, ShoppingBag, Mail, Info } from 'lucide-react'

import { cn } from '@/lib/utils'

type Item = {
  href: string
  label: string
  icon?: ComponentType<{ className?: string }>
}

const primary: Item[] = [
  { href: '/get-started', label: 'Get started', icon: Sparkles },
  { href: '/about', label: 'About', icon: Info },
  { href: '/deck', label: 'Deck', icon: Layers },
  { href: '/read', label: 'Spreads', icon: Shuffle },
  { href: '/store', label: 'Store', icon: ShoppingBag },
]

const secondary: Item[] = [{ href: '/contact', label: 'Contact', icon: Mail }]

export function MobileMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  // Lock body scroll when menu is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Esc to close
  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-xl2 border border-black/10 bg-white/70 text-black/70 hover:bg-white',
          className,
        )}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[110] bg-black/30 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute inset-x-0 top-0 mx-auto w-full max-w-md rounded-b-2xl border border-black/10 bg-white shadow-glow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-black/5 p-4">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-black/85">Menu</div>
                <div className="mt-1 text-xs text-black/50">Navigate the guide</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl2 hover:bg-black/5"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-black/60" />
              </button>
            </div>

            <nav className="p-3">
              <ul className="space-y-1">
                {primary.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl2 px-3 py-3 text-sm font-medium text-black/80 hover:bg-black/5"
                      >
                        {Icon ? <Icon className="h-4 w-4 text-black/60" /> : null}
                        <span className="flex-1">{item.label}</span>
                        <ArrowRight className="h-4 w-4 text-black/40" />
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <div className="my-3 border-t border-black/5" />

              <ul className="space-y-1">
                {secondary.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl2 px-3 py-3 text-sm font-medium text-black/80 hover:bg-black/5"
                      >
                        {Icon ? <Icon className="h-4 w-4 text-black/60" /> : null}
                        <span className="flex-1">{item.label}</span>
                        <ArrowRight className="h-4 w-4 text-black/40" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  )
}
