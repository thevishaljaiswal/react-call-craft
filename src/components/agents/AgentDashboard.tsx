import { useState } from "react"
import { Users, Phone, Clock, UserCheck, UserX } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useAgentManagement } from "@/hooks/useAgentManagement"
import { AgentReassignDialog } from "./AgentReassignDialog"

export function AgentDashboard() {
  const { 
    agents, 
    assignAgentRoundRobin, 
    toggleAgentAvailability,
    getAvailableAgents 
  } = useAgentManagement()
  
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null)

  const handleTestAssignment = () => {
    const assignedAgent = assignAgentRoundRobin()
    if (assignedAgent) {
      console.log(`Assigned call to: ${assignedAgent.name}`)
    } else {
      console.log("No available agents")
    }
  }

  const availableCount = getAvailableAgents().length
  const totalCalls = agents.reduce((sum, agent) => sum + agent.currentCalls, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Agent Management</h2>
          <p className="text-muted-foreground">
            Monitor and manage agent availability and call assignments
          </p>
        </div>
        <Button onClick={handleTestAssignment} className="bg-gradient-to-r from-primary to-info text-primary-foreground">
          <Phone className="mr-2 h-4 w-4" />
          Test Round Robin
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <UserCheck className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Busy</CardTitle>
            <UserX className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.length - availableCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCalls}</div>
          </CardContent>
        </Card>
      </div>

      {/* Agents List */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-info flex items-center justify-center text-primary-foreground font-medium">
                    {agent.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{agent.name}</div>
                    <div className="text-sm text-muted-foreground">{agent.email}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge variant={agent.role === "supervisor" ? "default" : "secondary"}>
                    {agent.role}
                  </Badge>
                  
                  <div className="text-sm">
                    <div className="flex items-center space-x-1">
                      <Phone className="h-3 w-3" />
                      <span>{agent.currentCalls}/{agent.maxCalls}</span>
                    </div>
                  </div>

                  <Badge 
                    variant={agent.isAvailable ? "default" : "secondary"}
                    className={agent.isAvailable ? "bg-success" : "bg-muted"}
                  >
                    {agent.isAvailable ? "Available" : "Busy"}
                  </Badge>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Available</span>
                    <Switch
                      checked={agent.isAvailable}
                      onCheckedChange={() => toggleAgentAvailability(agent.id)}
                    />
                  </div>

                  {agent.currentCalls > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCallId(agent.id)}
                    >
                      Reassign
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AgentReassignDialog
        isOpen={!!selectedCallId}
        onClose={() => setSelectedCallId(null)}
        currentAgentId={selectedCallId || ""}
        agents={agents}
      />
    </div>
  )
}