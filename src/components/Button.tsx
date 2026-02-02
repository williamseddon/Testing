// src/components/Button.tsx
import * as React from 'react'
import Link from 'next/link'

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(' ')
}

type Variant = 'primary' | 'secondary' | 'ghost' | 'soft'
type Size = 'sm' | 'md' | 'lg'

type CommonProps = {
  children: React.ReactNode
  className?: string
  variant?: Variant
  size?: Size
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

type AnchorProps = CommonProps & {
  href: string
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
  onClick?: never
  type?: never
  disabled?: never
}

type BtnProps = CommonProps & {
  href?: never
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit'
  disabled?: boolean
}

export type ButtonProps = AnchorProps | BtnProps

const base =
  'inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 ' +
  'active:translate-y-[0.5px] disabled:opacity-50 disabled:pointer-events-none ' +
  'select-none'

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-base', // good mobile tap size
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-black text-white hover:bg-black/90 shadow-sm border border-black/10',
  secondary:
    'bg-white text-black hover:bg-black/[0.03] border border-black/15 shadow-sm',
  ghost:
    'bg-transparent text-black hover:bg-black/[0.05] border border-transparent',
  soft:
    'bg-black/[0.06] text-black hover:bg-black/[0.10] border border-black/10',
}

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = 'primary',
    size = 'md',
    leftIcon,
    rightIcon,
  } = props

  const classes = cn(base, sizeClasses[size], variantClasses[variant], className)

  // ✅ Clean, type-safe narrowing: link branch
  if ('href' in props) {
    const { href, target, rel } = props
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
        <span>{children}</span>
        {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
      </Link>
    )
  }

  // ✅ Button branch: type is valid here
  const { onClick, disabled } = props
  return (
    <button
      type={props.type ?? 'button'}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
      <span>{children}</span>
      {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
    </button>
  )
}
