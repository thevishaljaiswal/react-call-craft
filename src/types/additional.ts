export interface Contact {
  id: string
  name: string
  phone: string
  email?: string
  company?: string
  avatar?: string
  notes?: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface FollowUp {
  id: string
  title: string
  description?: string
  contactId: string
  contactName: string
  contactPhone: string
  callId?: string
  dueDate: Date
  priority: "low" | "medium" | "high"
  status: "pending" | "completed" | "overdue"
  assignedTo: string
  createdAt: Date
  createdBy: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "agent" | "supervisor"
  avatar?: string
  isActive: boolean
}

export interface CallFilter {
  searchTerm: string
  callType: string
  status: string
  dateRange: {
    from: Date | null
    to: Date | null
  }
  assignedTo: string
  tags: string[]
}