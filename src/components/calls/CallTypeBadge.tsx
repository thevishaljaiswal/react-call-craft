import { Badge } from "@/components/ui/badge"
import { Phone, PhoneCall, PhoneMissed, PhoneOff } from "lucide-react"
import { cn } from "@/lib/utils"

type CallType = "incoming" | "outgoing" | "missed" | "failed"

interface CallTypeBadgeProps {
  type: CallType
  className?: string
}

const typeConfig = {
  incoming: {
    label: "Incoming",
    icon: PhoneCall,
    className: "bg-info/10 text-info border-info/20"
  },
  outgoing: {
    label: "Outgoing", 
    icon: Phone,
    className: "bg-primary/10 text-primary border-primary/20"
  },
  missed: {
    label: "Missed",
    icon: PhoneMissed,
    className: "bg-warning/10 text-warning border-warning/20"
  },
  failed: {
    label: "Failed",
    icon: PhoneOff,
    className: "bg-destructive/10 text-destructive border-destructive/20"
  }
}

export function CallTypeBadge({ type, className }: CallTypeBadgeProps) {
  const config = typeConfig[type]
  const Icon = config.icon
  
  return (
    <Badge 
      variant="outline" 
      className={cn(config.className, "gap-1", className)}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  )
}