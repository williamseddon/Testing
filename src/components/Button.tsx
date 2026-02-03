cat > rhot_app/src/components/Button.tsx <<'EOF'
import Link from 'next/link'
import type { ButtonHTMLAttributes, HTMLAttributeAnchorTarget, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'soft'
type Size = 'sm' | 'md' | 'lg'

type CommonProps = {
  children: ReactNode
  className?: string
  variant?: Variant
  size?: Size
  leftIcon?: ReactNode
}

type LinkButtonProps = CommonProps & {
  href: string
  target?: HTMLAttributeAnchorTarget
  rel?: string
  onClick?: never
  type?: never
  disabled?: never
}

type NativeButtonProps = CommonProps & {
  href?: never
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  disabled?: boolean
  target?: never
  rel?: never
}

export type ButtonProps = LinkButtonProps | NativeButtonProps

function classes(variant: Variant = 'primary', size: Size = 'md') {
  const base =
    'inline-flex items-center gap-2 rounded-xl2 px-4 py-2 text-sm font-medium transition ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 ' +
    'disabled:opacity-50 disabled:pointer-events-none'

  const variants: Record<Variant, string> = {
    primary: 'bg-black text-white hover:bg-black/90',
    secondary: 'bg-white text-black border border-black/10 hover:bg-black/5',
    ghost: 'bg-transparent text-black hover:bg-black/5',
    soft: 'bg-white/70 text-black border border-black/10 hover:bg-white',
  }

  const sizes: Record<Size, string> = {
    sm: 'h-9 px-3',
    md: 'h-10 px-4',
    lg: 'h-11 px-5 text-base',
  }

  return cn(base, variants[variant], sizes[size])
}

export function Button(props: ButtonProps) {
  const { children, className, variant = 'primary', size = 'md', leftIcon } = props

  if ('href' in props) {
    return (
      <Link
        href={props.href}
        target={props.target}
        rel={props.rel}
        className={cn(classes(variant, size), className)}
      >
        {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
        {children}
      </Link>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(classes(variant, size), className)}
    >
      {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
      {children}
    </button>
  )
}
EOF
