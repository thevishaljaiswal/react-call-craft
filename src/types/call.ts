export interface CallLog {
  id: string
  callType: "incoming" | "outgoing" | "missed" | "failed"
  direction: "inbound" | "outbound"
  callerName: string
  callerNumber: string
  receiverName: string
  receiverNumber: string
  startTime: Date
  endTime?: Date
  duration?: number // in seconds
  status: "open" | "in-progress" | "completed" | "escalated" | "failed" | "missed"
  statusUpdateBy?: string
  disposition?: string
  notes?: string
  recordingUrl?: string
  tags: string[]
  linkedTicketId?: string
  callSource: "phone" | "webrtc" | "mobile" | "voip"
  missedReason?: string
}

export interface CallStats {
  totalCalls: number
  completedCalls: number
  missedCalls: number
  failedCalls: number
  averageDuration: number
  incomingCalls: number
  outgoingCalls: number
}