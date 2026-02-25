import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import type { Operation } from "@/lib/mock-data"
import { Package, Ship, ArrowRight } from "lucide-react"

interface OperationCardProps {
  operation: Operation
  onClick?: () => void
}

export function OperationCard({ operation, onClick }: OperationCardProps) {
  const margin = operation.salePrice - operation.purchasePrice
  const marginPercent = ((margin / operation.purchasePrice) * 100).toFixed(1)
  const activeContainers = operation.containers.filter(
    (c) => c.status !== "delivered"
  ).length

  return (
    <Card
      className={onClick ? "cursor-pointer hover:border-jules-primary/30 transition-colors" : ""}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium text-jules-text-primary truncate">
            {operation.reference}
          </span>
          <Badge variant={operation.status}>{operation.status}</Badge>
        </div>
        <span className="text-xs text-jules-text-secondary whitespace-nowrap">
          {operation.createdAt}
        </span>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium text-jules-text-primary">
            {operation.commodity}
          </p>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-jules-text-secondary">
            <span>{operation.supplier}</span>
            <ArrowRight className="h-3 w-3" />
            <span>{operation.buyer}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="text-jules-text-secondary">
              {operation.quantity} {operation.unit}
            </span>
            <span className="text-jules-text-secondary">
              Buy {formatCurrency(operation.purchasePrice, operation.currency)}
            </span>
            <span className="text-jules-text-secondary">
              Sell {formatCurrency(operation.salePrice, operation.currency)}
            </span>
          </div>
          <span className="font-medium text-jules-success">
            +{formatCurrency(margin, operation.currency)}/MT ({marginPercent}%)
          </span>
        </div>

        {operation.containers.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-jules-text-secondary">
            <Package className="h-3.5 w-3.5" />
            <span>
              {operation.containers.length} container{operation.containers.length > 1 ? "s" : ""}
            </span>
            {activeContainers > 0 && (
              <>
                <Ship className="h-3.5 w-3.5 ml-1" />
                <span>{activeContainers} in transit</span>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
