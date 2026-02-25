import { Badge } from "@/components/ui/badge"
import { cn, formatContainerNumber } from "@/lib/utils"
import { containerStatusColors } from "@/lib/design-tokens"
import type { Container } from "@/lib/mock-data"
import { Ship, Calendar } from "lucide-react"

interface ContainerRowProps {
  container: Container
  className?: string
}

const statusToBadgeVariant: Record<Container["status"], "default" | "confirmed" | "in-progress" | "completed" | "success"> = {
  booked: "default",
  loaded: "confirmed",
  "in-transit": "in-progress",
  arrived: "success",
  delivered: "completed",
}

export function ContainerRow({ container, className }: ContainerRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-sm border border-jules-border px-3 py-2",
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="font-mono text-sm text-jules-text-primary">
          {formatContainerNumber(container.number)}
        </span>
        <Badge variant={statusToBadgeVariant[container.status]}>
          {container.status}
        </Badge>
      </div>

      <div className="flex items-center gap-4 text-xs text-jules-text-secondary">
        <span>{container.weight} {container.unit}</span>
        {container.vessel && (
          <span className="flex items-center gap-1">
            <Ship className="h-3 w-3" />
            {container.vessel}
          </span>
        )}
        {container.eta && (
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            ETA {container.eta}
          </span>
        )}
      </div>
    </div>
  )
}
