import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type CommonProps = {
  variant?: 'primary' | 'ghost' | 'soft'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: ReactNode
}

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'> & {
    href: string
    prefetch?: boolean
  }

type ActionButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: never
  }

function classes(variant: CommonProps['variant'], size: CommonProps['size']) {
  const v =
    variant === 'ghost'
      ? 'bg-transparent hover:bg-black/5'
      : variant === 'soft'
        ? 'bg-black/5 hover:bg-black/10'
        : 'bg-black text-white hover:bg-black/90'

  const s =
    size === 'sm'
      ? 'h-9 px-3 text-sm'
      : size === 'lg'
        ? 'h-12 px-5 text-base'
        : 'h-10 px-4 text-sm'

  return cn(
    'inline-flex items-center justify-center gap-2 rounded-xl2 border border-black/10 transition',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
    v,
    s,
  )
}

function isExternalHref(href: string) {
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  )
}

export function Button(props: LinkButtonProps | ActionButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props
  const cls = cn(classes(variant, size), className)

  // Link button
  if ('href' in props && typeof props.href === 'string') {
    const {
      href,
      prefetch,
      // Strip our custom props so they don't get forwarded to the DOM.
      variant: _variant,
      size: _size,
      className: _className,
      children: _children,
      ...rest
    } = props

    // External links (or anything that should be a literal <a>)
    if (isExternalHref(href) || rest.target) {
      return (
        <a href={href} className={cls} {...rest}>
          {children}
        </a>
      )
    }

    // Internal links (Next.js)
    return (
      <Link href={href} prefetch={prefetch} className={cls}>
        {children}
      </Link>
    )
  }

  // Action button
  const {
    type = 'button',
    variant: _variant,
    size: _size,
    className: _className,
    children: _children,
    ...rest
  } = props

  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  )
}
