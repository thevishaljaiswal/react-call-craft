import { useState } from "react"
import { FollowUp } from "@/types/additional"
import { FollowUpFormData } from "@/schemas/forms"

// Mock follow-ups data
const mockFollowUps: FollowUp[] = [
  {
    id: "fu-1",
    title: "Call back about product inquiry",
    description: "Customer interested in premium package",
    contactId: "c-1",
    contactName: "John Smith",
    contactPhone: "+1 (555) 123-4567",
    callId: "call-1",
    dueDate: new Date(2024, 11, 15, 14, 30),
    priority: "high",
    status: "pending",
    assignedTo: "Alice Johnson",
    createdAt: new Date(2024, 11, 10),
    createdBy: "system",
  },
  {
    id: "fu-2", 
    title: "Follow up on complaint resolution",
    description: "Ensure customer satisfaction with resolution",
    contactId: "c-2",
    contactName: "Jane Doe",
    contactPhone: "+1 (555) 987-6543",
    callId: "call-2",
    dueDate: new Date(2024, 11, 14, 10, 0),
    priority: "medium",
    status: "completed",
    assignedTo: "Bob Wilson",
    createdAt: new Date(2024, 11, 8),
    createdBy: "Alice Johnson",
  },
  {
    id: "fu-3",
    title: "Schedule demo call",
    description: "Potential client wants to see product demo",
    contactId: "c-3",
    contactName: "Mike Johnson",
    contactPhone: "+1 (555) 555-1234",
    callId: "call-3",
    dueDate: new Date(2024, 11, 12, 16, 0),
    priority: "low",
    status: "overdue",
    assignedTo: "Charlie Brown",
    createdAt: new Date(2024, 11, 5),
    createdBy: "Bob Wilson",
  },
]

export function useFollowUps() {
  const [followUps, setFollowUps] = useState<FollowUp[]>(mockFollowUps)

  const addFollowUp = (data: FollowUpFormData) => {
    const newFollowUp: FollowUp = {
      id: `fu-${Date.now()}`,
      title: data.title,
      description: data.description,
      contactId: `c-${Date.now()}`,
      contactName: data.contactName,
      contactPhone: data.contactPhone,
      callId: undefined,
      dueDate: data.dueDate,
      priority: data.priority,
      status: "pending",
      assignedTo: data.assignedTo,
      createdAt: new Date(),
      createdBy: "current-user",
    }

    setFollowUps(prev => [newFollowUp, ...prev])
  }

  const updateFollowUp = (id: string, updates: Partial<FollowUp>) => {
    setFollowUps(prev =>
      prev.map(followUp =>
        followUp.id === id ? { ...followUp, ...updates } : followUp
      )
    )
  }

  const deleteFollowUp = (id: string) => {
    setFollowUps(prev => prev.filter(followUp => followUp.id !== id))
  }

  return {
    followUps,
    addFollowUp,
    updateFollowUp,
    deleteFollowUp,
  }
}