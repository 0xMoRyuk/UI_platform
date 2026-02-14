import { cn } from "../lib/utils"

function Skeleton({
  className,
  ...props
}: { className?: string } & Record<string, unknown>) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
