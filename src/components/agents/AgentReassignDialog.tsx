import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useAgentManagement } from "@/hooks/useAgentManagement"
import { useToast } from "@/hooks/use-toast"
import { User } from "@/types/additional"

interface AgentReassignDialogProps {
  isOpen: boolean
  onClose: () => void
  currentAgentId: string
  agents: (User & { isAvailable: boolean; currentCalls: number; maxCalls: number })[]
}

export function AgentReassignDialog({
  isOpen,
  onClose,
  currentAgentId,
  agents,
}: AgentReassignDialogProps) {
  const [selectedAgentId, setSelectedAgentId] = useState("")
  const { reassignCall } = useAgentManagement()
  const { toast } = useToast()

  const currentAgent = agents.find(a => a.id === currentAgentId)
  const availableAgents = agents.filter(agent => 
    agent.id !== currentAgentId && 
    agent.isAvailable && 
    agent.currentCalls < agent.maxCalls
  )

  const handleReassign = () => {
    if (!selectedAgentId) return

    try {
      const newAgent = reassignCall(currentAgentId, selectedAgentId)
      toast({
        title: "Call reassigned",
        description: `Call successfully reassigned to ${newAgent.name}`,
      })
      onClose()
      setSelectedAgentId("")
    } catch (error) {
      toast({
        title: "Reassignment failed",
        description: error instanceof Error ? error.message : "Failed to reassign call",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reassign Call</DialogTitle>
          <DialogDescription>
            Reassign call from {currentAgent?.name} to another available agent.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Agent</label>
            <div className="flex items-center space-x-2 p-2 border rounded">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-info flex items-center justify-center text-primary-foreground text-sm">
                {currentAgent?.name.charAt(0)}
              </div>
              <span>{currentAgent?.name}</span>
              <Badge variant="secondary">
                {currentAgent?.currentCalls}/{currentAgent?.maxCalls} calls
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Reassign to</label>
            <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
              <SelectTrigger>
                <SelectValue placeholder="Select available agent" />
              </SelectTrigger>
              <SelectContent>
                {availableAgents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    <div className="flex items-center space-x-2">
                      <span>{agent.name}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {agent.currentCalls}/{agent.maxCalls}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {availableAgents.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No available agents for reassignment
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleReassign}
            disabled={!selectedAgentId}
            className="bg-gradient-to-r from-primary to-info text-primary-foreground"
          >
            Reassign Call
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}