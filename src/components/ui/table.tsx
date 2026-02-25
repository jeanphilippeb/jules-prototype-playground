import { cn } from "@/lib/utils"

interface TableComponentProps {
  children: React.ReactNode
  className?: string
}

export function Table({ children, className }: TableComponentProps) {
  return (
    <div className={cn("overflow-auto rounded-md border border-jules-border", className)}>
      <table className="w-full text-sm">{children}</table>
    </div>
  )
}

export function TableHeader({ children, className }: TableComponentProps) {
  return (
    <thead className={cn("bg-jules-surface border-b border-jules-border", className)}>
      {children}
    </thead>
  )
}

export function TableBody({ children, className }: TableComponentProps) {
  return (
    <tbody className={cn("divide-y divide-jules-border", className)}>
      {children}
    </tbody>
  )
}

export function TableRow({ children, className }: TableComponentProps & React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn("hover:bg-jules-surface/50 transition-colors", className)}>
      {children}
    </tr>
  )
}

export function TableHead({ children, className }: TableComponentProps & React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={cn("px-4 py-2.5 text-left text-xs font-medium text-jules-text-secondary", className)}>
      {children}
    </th>
  )
}

export function TableCell({ children, className }: TableComponentProps & React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn("px-4 py-3 text-jules-text-primary", className)}>
      {children}
    </td>
  )
}
