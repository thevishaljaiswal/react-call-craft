import { z } from "zod"

export const callFormSchema = z.object({
  callType: z.enum(["incoming", "outgoing", "missed", "failed"]),
  direction: z.enum(["inbound", "outbound"]),
  callerName: z.string().min(1, "Caller name is required"),
  callerNumber: z.string().min(1, "Caller number is required"),
  receiverName: z.string().min(1, "Receiver name is required"),
  receiverNumber: z.string().min(1, "Receiver number is required"),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
  duration: z.number().optional(),
  status: z.enum(["open", "in-progress", "completed", "escalated", "failed", "missed"]),
  disposition: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
  callSource: z.enum(["phone", "webrtc", "mobile", "voip"]).default("phone"),
  missedReason: z.string().optional(),
  assignedTo: z.string().optional(),
})

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email().optional().or(z.literal("")),
  company: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
})

export const followUpSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  contactName: z.string().min(1, "Contact name is required"),
  contactPhone: z.string().min(1, "Contact phone is required"),
  dueDate: z.date(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  assignedTo: z.string().min(1, "Assigned user is required"),
})

export type CallFormData = z.infer<typeof callFormSchema>
export type ContactFormData = z.infer<typeof contactFormSchema>
export type FollowUpFormData = z.infer<typeof followUpSchema>