
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    showPercentage?: boolean;
    animated?: boolean;
  }
>(({ className, value, showPercentage = false, animated = false, ...props }, ref) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  // Smooth animation effect
  React.useEffect(() => {
    if (animated && value !== undefined) {
      const timer = setTimeout(() => {
        setDisplayValue(value);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayValue(value || 0);
    }
  }, [value, animated]);

  return (
    <div className="relative">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-secondary border border-border/50",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out relative",
            animated && "animate-pulse"
          )}
          style={{ 
            transform: `translateX(-${100 - displayValue}%)`,
            background: displayValue > 80 
              ? "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))"
              : "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary))/0.8)"
          }}
        >
          {/* Shimmer effect for completed sections */}
          {displayValue > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          )}
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
      
      {/* Percentage display */}
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-white drop-shadow-md">
            {Math.round(displayValue)}%
          </span>
        </div>
      )}
    </div>
  )
});
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
