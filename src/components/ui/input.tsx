import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-lg border bg-surface2 px-4 py-2 text-sm text-text font-body',
          'placeholder:text-text-subtle transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green/40',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error
            ? 'border-red-500/50 focus:ring-red-500/30'
            : 'border-border hover:border-green/20',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
