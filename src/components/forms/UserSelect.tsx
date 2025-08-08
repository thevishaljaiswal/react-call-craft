import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock users data
const users = [
  { id: "alice", name: "Alice Johnson" },
  { id: "bob", name: "Bob Wilson" },
  { id: "charlie", name: "Charlie Brown" },
  { id: "diana", name: "Diana Smith" },
]

interface UserSelectProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function UserSelect({ value, onChange, placeholder = "Select user" }: UserSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.name}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}