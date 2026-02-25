import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
}

const variantStyles: Record<string, string> = {
  primary: "bg-jules-primary text-white hover:bg-blue-700 shadow-sm",
  secondary: "bg-white text-jules-text-primary border border-jules-border hover:bg-jules-surface",
  ghost: "text-jules-text-secondary hover:bg-jules-surface hover:text-jules-text-primary",
  danger: "bg-jules-danger text-white hover:bg-red-700",
}

const sizeStyles: Record<string, string> = {
  sm: "px-2.5 py-1.5 text-xs",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-2.5 text-sm",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-jules-primary/20 disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
