import { Badge } from "@/components/ui/badge"
import { cn, formatCurrency, formatDate } from "@/lib/utils"
import type { Invoice } from "@/lib/mock-data"
import { FileText, Receipt, Truck } from "lucide-react"

interface InvoiceLineProps {
  invoice: Invoice
  onClick?: () => void
  className?: string
}

const typeIcons: Record<Invoice["type"], React.ReactNode> = {
  purchase: <FileText className="h-4 w-4 text-jules-text-secondary" />,
  sale: <Receipt className="h-4 w-4 text-jules-text-secondary" />,
  freight: <Truck className="h-4 w-4 text-jules-text-secondary" />,
}

const statusToBadgeVariant: Record<Invoice["status"], "default" | "confirmed" | "success"> = {
  draft: "default",
  sent: "confirmed",
  paid: "success",
}

export function InvoiceLine({ invoice, onClick, className }: InvoiceLineProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-sm border border-jules-border px-3 py-2",
        onClick && "cursor-pointer hover:bg-jules-surface/50 transition-colors",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter") onClick() } : undefined}
    >
      <div className="flex items-center gap-3 min-w-0">
        {typeIcons[invoice.type]}
        <span className="text-sm text-jules-text-primary truncate">
          {invoice.reference}
        </span>
        <Badge variant={statusToBadgeVariant[invoice.status]}>
          {invoice.status}
        </Badge>
      </div>

      <div className="flex items-center gap-4 text-sm shrink-0">
        <span className="font-mono text-jules-text-primary">
          {formatCurrency(invoice.amount, invoice.currency)}
        </span>
        <span className="text-xs text-jules-text-secondary">
          {formatDate(invoice.dueDate)}
        </span>
      </div>
    </div>
  )
}
