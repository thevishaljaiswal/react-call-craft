import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus } from "lucide-react"
import { callFormSchema, type CallFormData } from "@/schemas/forms"
import { TagsInput } from "./TagsInput"
import { UserSelect } from "./UserSelect"
import { useAgentManagement } from "@/hooks/useAgentManagement"
import { useToast } from "@/hooks/use-toast"

interface AddCallFormProps {
  onSubmit: (data: CallFormData & { assignedTo?: string }) => void
}

export function AddCallForm({ onSubmit }: AddCallFormProps) {
  const [open, setOpen] = useState(false)
  const [useRoundRobin, setUseRoundRobin] = useState(true)
  const { assignAgentRoundRobin, assignAgentBySkill } = useAgentManagement()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CallFormData>({
    resolver: zodResolver(callFormSchema),
    defaultValues: {
      callType: "incoming",
      direction: "inbound",
      status: "open",
      disposition: "pending",
      tags: [],
      assignedTo: "",
    },
  })

  const watchedTags = watch("tags") || []

  const handleFormSubmit = (data: CallFormData) => {
    let assignedAgent = null

    // Auto-assign agent based on settings
    if (useRoundRobin) {
      assignedAgent = assignAgentRoundRobin()
      if (assignedAgent) {
        toast({
          title: "Agent assigned",
          description: `Call assigned to ${assignedAgent.name} via round robin`,
        })
      } else {
        toast({
          title: "No available agents",
          description: "Call created without assignment - all agents are busy",
          variant: "destructive",
        })
      }
    } else {
      // Manual assignment or skill-based
      assignedAgent = assignAgentBySkill()
      if (assignedAgent) {
        toast({
          title: "Agent assigned",
          description: `Call assigned to ${assignedAgent.name} (best available)`,
        })
      }
    }

    onSubmit({
      ...data,
      assignedTo: assignedAgent?.name || "Unassigned",
    })
    
    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-info text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          Add Call
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Call Log</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="callType">Call Type</Label>
              <Select onValueChange={(value) => setValue("callType", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select call type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incoming">Incoming</SelectItem>
                  <SelectItem value="outgoing">Outgoing</SelectItem>
                  <SelectItem value="missed">Missed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              {errors.callType && (
                <p className="text-sm text-destructive">{errors.callType.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="direction">Direction</Label>
              <Select onValueChange={(value) => setValue("direction", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inbound">Inbound</SelectItem>
                  <SelectItem value="outbound">Outbound</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="callerName">Caller Name</Label>
              <Input
                id="callerName"
                {...register("callerName")}
                placeholder="Enter caller name"
              />
              {errors.callerName && (
                <p className="text-sm text-destructive">{errors.callerName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="callerNumber">Caller Number</Label>
              <Input
                id="callerNumber"
                {...register("callerNumber")}
                placeholder="Enter phone number"
              />
              {errors.callerNumber && (
                <p className="text-sm text-destructive">{errors.callerNumber.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="receiverName">Receiver Name</Label>
              <Input
                id="receiverName"
                {...register("receiverName")}
                placeholder="Enter receiver name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="receiverNumber">Receiver Number</Label>
              <Input
                id="receiverNumber"
                {...register("receiverNumber")}
                placeholder="Enter receiver number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Add call notes..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <TagsInput
              value={watchedTags}
              onChange={(tags) => setValue("tags", tags)}
              placeholder="Add tags..."
            />
          </div>

          {/* Agent Assignment Settings */}
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium">Agent Assignment</h4>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Use Round Robin Assignment</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically assign to next available agent
                </p>
              </div>
              <Switch
                checked={useRoundRobin}
                onCheckedChange={setUseRoundRobin}
              />
            </div>

            {!useRoundRobin && (
              <div className="space-y-2">
                <Label>Manual Assignment</Label>
                <UserSelect
                  value={watch("assignedTo") || ""}
                  onChange={(value) => setValue("assignedTo", value)}
                  placeholder="Select agent manually"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-primary to-info text-primary-foreground">
              Create Call
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}