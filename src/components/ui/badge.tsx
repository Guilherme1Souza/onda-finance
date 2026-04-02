import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium font-display transition-colors',
  {
    variants: {
      variant: {
        default: 'border-green/20 bg-green/10 text-green',
        credit: 'border-green/20 bg-green/10 text-green',
        debit: 'border-red-500/20 bg-red-500/10 text-red-400',
        transfer: 'border-blue-500/20 bg-blue-500/10 text-blue-400',
        pending: 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400',
        failed: 'border-red-500/20 bg-red-500/10 text-red-400',
        completed: 'border-green/20 bg-green/10 text-green',
        outline: 'border-border text-text-muted bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
