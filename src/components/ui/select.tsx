import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { ChevronDown } from "lucide-react"

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-")

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-jules-text-primary"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full appearance-none border border-jules-border rounded-sm px-3 py-2 pr-9 text-sm bg-white",
              "focus:outline-none focus:ring-2 focus:ring-jules-primary/20 focus:border-jules-primary",
              "disabled:opacity-50 disabled:bg-jules-surface",
              error && "border-jules-danger focus:ring-jules-danger/20 focus:border-jules-danger",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-jules-text-secondary pointer-events-none" />
        </div>
        {error && (
          <p className="text-xs text-jules-danger">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = "Select"
