import { useState } from "react"
import { Contact } from "@/types/additional"
import { ContactFormData } from "@/schemas/forms"

// Mock contacts data
const mockContacts: Contact[] = [
  {
    id: "c-1",
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "john.smith@company.com",
    company: "Tech Corp",
    tags: ["lead", "enterprise"],
    createdAt: new Date(2024, 10, 1),
    updatedAt: new Date(2024, 10, 15),
  },
  {
    id: "c-2",
    name: "Jane Doe",
    phone: "+1 (555) 987-6543", 
    email: "jane.doe@startup.com",
    company: "Startup Inc",
    tags: ["customer", "support"],
    createdAt: new Date(2024, 10, 5),
    updatedAt: new Date(2024, 10, 20),
  },
  {
    id: "c-3",
    name: "Mike Johnson",
    phone: "+1 (555) 555-1234",
    email: "mike@freelancer.com",
    company: "Freelance",
    tags: ["prospect"],
    createdAt: new Date(2024, 10, 10),
    updatedAt: new Date(2024, 10, 25),
  },
]

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts)

  const addContact = (data: ContactFormData) => {
    const newContact: Contact = {
      id: `c-${Date.now()}`,
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      company: data.company || undefined,
      notes: data.notes || undefined,
      tags: data.tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setContacts(prev => [newContact, ...prev])
  }

  const updateContact = (id: string, updates: Partial<Contact>) => {
    setContacts(prev =>
      prev.map(contact =>
        contact.id === id
          ? { ...contact, ...updates, updatedAt: new Date() }
          : contact
      )
    )
  }

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id))
  }

  const getContactByPhone = (phone: string) => {
    return contacts.find(contact => contact.phone === phone)
  }

  return {
    contacts,
    addContact,
    updateContact,
    deleteContact,
    getContactByPhone,
  }
}