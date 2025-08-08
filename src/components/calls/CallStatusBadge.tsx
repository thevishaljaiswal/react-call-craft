import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type CallStatus = "completed" | "in-progress" | "missed" | "failed" | "open" | "escalated"

interface CallStatusBadgeProps {
  status: CallStatus
  className?: string
}

const statusConfig = {
  completed: {
    label: "Completed",
    className: "bg-success text-success-foreground hover:bg-success/80"
  },
  "in-progress": {
    label: "In Progress", 
    className: "bg-info text-info-foreground hover:bg-info/80"
  },
  missed: {
    label: "Missed",
    className: "bg-warning text-warning-foreground hover:bg-warning/80"
  },
  failed: {
    label: "Failed",
    className: "bg-destructive text-destructive-foreground hover:bg-destructive/80"
  },
  open: {
    label: "Open",
    className: "bg-muted text-muted-foreground hover:bg-muted/80"
  },
  escalated: {
    label: "Escalated",
    className: "bg-destructive/20 text-destructive hover:bg-destructive/30"
  }
}

export function CallStatusBadge({ status, className }: CallStatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <Badge 
      variant="secondary" 
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  )
}