import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CallLog } from "@/types/call"
import { CallStatusBadge } from "./CallStatusBadge"
import { CallTypeBadge } from "./CallTypeBadge"
import { MoreHorizontal, Play, Phone, Calendar } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDistanceToNow, format } from "date-fns"

interface CallsTableProps {
  calls: CallLog[]
  onStatusUpdate?: (callId: string, status: CallLog["status"]) => void
  onRetryCall?: (callId: string) => void
}

export function CallsTable({ calls, onStatusUpdate, onRetryCall }: CallsTableProps) {
  const formatDuration = (seconds?: number) => {
    if (!seconds) return "-"
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b">
            <TableHead>Call Info</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Participants</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calls.map((call) => (
            <TableRow key={call.id} className="hover:bg-muted/50">
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium text-foreground">
                    {call.callerNumber}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ID: {call.id.slice(0, 8)}...
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <CallTypeBadge type={call.callType} />
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm font-medium">
                    From: {call.callerName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    To: {call.receiverName}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm">
                    {format(call.startTime, "MMM dd, HH:mm")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(call.startTime, { addSuffix: true })}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm font-mono">
                  {formatDuration(call.duration)}
                </div>
              </TableCell>
              <TableCell>
                <CallStatusBadge status={call.status} />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover">
                    {call.recordingUrl && (
                      <DropdownMenuItem>
                        <Play className="mr-2 h-4 w-4" />
                        Play Recording
                      </DropdownMenuItem>
                    )}
                    {(call.status === "missed" || call.status === "failed") && (
                      <DropdownMenuItem 
                        onClick={() => onRetryCall?.(call.id)}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Retry Call
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Follow-up
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}