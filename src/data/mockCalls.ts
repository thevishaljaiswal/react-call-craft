import { CallLog, CallStats } from "@/types/call"

// Mock data for development
export const mockCalls: CallLog[] = [
  {
    id: "call-001",
    callType: "incoming",
    direction: "inbound",
    callerName: "Sarah Johnson",
    callerNumber: "+1 (555) 123-4567",
    receiverName: "John Smith",
    receiverNumber: "+1 (555) 987-6543",
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    endTime: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000), // 5 min duration
    duration: 300,
    status: "completed",
    disposition: "Interested",
    notes: "Customer interested in premium package",
    tags: ["lead", "premium"],
    callSource: "phone",
    statusUpdateBy: "John Smith"
  },
  {
    id: "call-002", 
    callType: "outgoing",
    direction: "outbound",
    callerName: "Mike Davis",
    callerNumber: "+1 (555) 987-6543",
    receiverName: "Alice Brown", 
    receiverNumber: "+1 (555) 456-7890",
    startTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 4 * 60 * 60 * 1000 + 2 * 60 * 1000),
    duration: 120,
    status: "completed",
    disposition: "Follow-up scheduled",
    tags: ["follow-up"],
    callSource: "webrtc"
  },
  {
    id: "call-003",
    callType: "missed",
    direction: "inbound", 
    callerName: "Robert Wilson",
    callerNumber: "+1 (555) 234-5678",
    receiverName: "Emma Davis",
    receiverNumber: "+1 (555) 876-5432",
    startTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
    status: "missed",
    missedReason: "No answer",
    tags: ["callback-needed"],
    callSource: "phone"
  },
  {
    id: "call-004",
    callType: "failed",
    direction: "outbound",
    callerName: "Lisa Anderson", 
    callerNumber: "+1 (555) 876-5432",
    receiverName: "David Miller",
    receiverNumber: "+1 (555) 345-6789",
    startTime: new Date(Date.now() - 30 * 60 * 1000),
    status: "failed",
    missedReason: "Network error",
    tags: ["technical-issue"],
    callSource: "voip"
  },
  {
    id: "call-005",
    callType: "incoming",
    direction: "inbound",
    callerName: "James Taylor",
    callerNumber: "+1 (555) 567-8901", 
    receiverName: "Sophie Clark",
    receiverNumber: "+1 (555) 765-4321",
    startTime: new Date(Date.now() - 15 * 60 * 1000),
    status: "in-progress",
    tags: ["support"],
    callSource: "mobile"
  },
  {
    id: "call-006",
    callType: "outgoing",
    direction: "outbound",
    callerName: "Jennifer Lee",
    callerNumber: "+1 (555) 765-4321",
    receiverName: "Mark Johnson",
    receiverNumber: "+1 (555) 678-9012",
    startTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 6 * 60 * 60 * 1000 + 8 * 60 * 1000),
    duration: 480,
    status: "completed",
    disposition: "Not interested", 
    notes: "Customer not interested at this time",
    tags: ["rejection"],
    callSource: "phone"
  }
]

export const mockStats: CallStats = {
  totalCalls: 156,
  completedCalls: 124,
  missedCalls: 18,
  failedCalls: 14,
  averageDuration: 245, // seconds
  incomingCalls: 89,
  outgoingCalls: 67
}