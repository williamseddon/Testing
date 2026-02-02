import Link from 'next/link'
import { cn } from '@/lib/utils'

type CommonProps = {
  variant?: 'primary' | 'ghost' | 'soft'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
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

export function Button(
  props:
    | (CommonProps & { href: string; onClick?: never })
    | (CommonProps & { href?: never; onClick?: () => void; type?: 'button' | 'submit' }),
) {
  const { variant = 'primary', size = 'md', className, children } = props

  if ('href' in props) {
    return (
      <Link href={props.href} className={cn(classes(variant, size), className)}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      className={cn(classes(variant, size), className)}
    >
      {children}
    </button>
  )
}
