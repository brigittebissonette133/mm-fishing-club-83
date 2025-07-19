
import * as React from "react"
import { cn } from "@/lib/utils"

const GameCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'ocean' | 'forest' | 'achievement'
    floating?: boolean
  }
>(({ className, variant = 'default', floating = false, children, ...props }, ref) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'ocean':
        return 'ocean-gradient text-white border-white/20'
      case 'forest':
        return 'forest-gradient text-white border-white/20'
      case 'achievement':
        return 'bg-gradient-to-br from-yellow-400/90 to-yellow-600/90 text-white border-yellow-300/30'
      default:
        return 'game-card'
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl",
        getVariantStyles(),
        floating && "float-animation",
        "hover:scale-[1.02] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
GameCard.displayName = "GameCard"

const GameCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
GameCardHeader.displayName = "GameCardHeader"

const GameCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-none tracking-tight drop-shadow-sm",
      className
    )}
    {...props}
  />
))
GameCardTitle.displayName = "GameCardTitle"

const GameCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
GameCardContent.displayName = "GameCardContent"

export { GameCard, GameCardHeader, GameCardTitle, GameCardContent }
