import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "startAdornment"> {
  label?: string
  error?: string
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, startAdornment, endAdornment, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-")

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-jules-text-primary"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {startAdornment && (
            <span className="absolute left-3 text-sm text-jules-text-secondary pointer-events-none">
              {startAdornment}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full border border-jules-border rounded-sm px-3 py-2 text-sm bg-white",
              "placeholder:text-jules-text-secondary/60",
              "focus:outline-none focus:ring-2 focus:ring-jules-primary/20 focus:border-jules-primary",
              "disabled:opacity-50 disabled:bg-jules-surface",
              error && "border-jules-danger focus:ring-jules-danger/20 focus:border-jules-danger",
              startAdornment && "pl-8",
              endAdornment && "pr-8",
              className
            )}
            {...props}
          />
          {endAdornment && (
            <span className="absolute right-3 text-sm text-jules-text-secondary pointer-events-none">
              {endAdornment}
            </span>
          )}
        </div>
        {error && (
          <p className="text-xs text-jules-danger">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"
