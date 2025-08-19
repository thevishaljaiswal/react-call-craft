import { useState, useCallback } from "react"
import { User } from "@/types/additional"

// Mock agents data with availability status
const mockAgents: (User & { isAvailable: boolean; currentCalls: number; maxCalls: number })[] = [
  {
    id: "alice",
    name: "Alice Johnson",
    email: "alice@company.com",
    role: "agent",
    isActive: true,
    isAvailable: true,
    currentCalls: 2,
    maxCalls: 5,
  },
  {
    id: "bob",
    name: "Bob Wilson",
    email: "bob@company.com",
    role: "agent",
    isActive: true,
    isAvailable: true,
    currentCalls: 1,
    maxCalls: 4,
  },
  {
    id: "charlie",
    name: "Charlie Brown",
    email: "charlie@company.com",
    role: "agent",
    isActive: true,
    isAvailable: false,
    currentCalls: 0,
    maxCalls: 3,
  },
  {
    id: "diana",
    name: "Diana Smith",
    email: "diana@company.com",
    role: "supervisor",
    isActive: true,
    isAvailable: true,
    currentCalls: 0,
    maxCalls: 8,
  },
]

let roundRobinIndex = 0

export function useAgentManagement() {
  const [agents, setAgents] = useState(mockAgents)

  const getAvailableAgents = useCallback(() => {
    return agents.filter(agent => 
      agent.isActive && 
      agent.isAvailable && 
      agent.currentCalls < agent.maxCalls
    )
  }, [agents])

  const assignAgentRoundRobin = useCallback(() => {
    const availableAgents = getAvailableAgents()
    
    if (availableAgents.length === 0) {
      return null
    }

    // Round robin assignment
    const selectedAgent = availableAgents[roundRobinIndex % availableAgents.length]
    roundRobinIndex = (roundRobinIndex + 1) % availableAgents.length

    // Update agent's current call count
    setAgents(prev => prev.map(agent => 
      agent.id === selectedAgent.id 
        ? { ...agent, currentCalls: agent.currentCalls + 1 }
        : agent
    ))

    return selectedAgent
  }, [getAvailableAgents])

  const assignAgentBySkill = useCallback((requiredSkill?: string) => {
    const availableAgents = getAvailableAgents()
    
    if (availableAgents.length === 0) {
      return null
    }

    // For demo, just return the agent with lowest current calls
    const bestAgent = availableAgents.reduce((best, current) => 
      current.currentCalls < best.currentCalls ? current : best
    )

    // Update agent's current call count
    setAgents(prev => prev.map(agent => 
      agent.id === bestAgent.id 
        ? { ...agent, currentCalls: agent.currentCalls + 1 }
        : agent
    ))

    return bestAgent
  }, [getAvailableAgents])

  const releaseAgent = useCallback((agentId: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, currentCalls: Math.max(0, agent.currentCalls - 1) }
        : agent
    ))
  }, [])

  const toggleAgentAvailability = useCallback((agentId: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, isAvailable: !agent.isAvailable }
        : agent
    ))
  }, [])

  const reassignCall = useCallback((fromAgentId: string, toAgentId: string) => {
    const toAgent = agents.find(a => a.id === toAgentId)
    
    if (!toAgent || !toAgent.isAvailable || toAgent.currentCalls >= toAgent.maxCalls) {
      throw new Error("Target agent is not available for assignment")
    }

    setAgents(prev => prev.map(agent => {
      if (agent.id === fromAgentId) {
        return { ...agent, currentCalls: Math.max(0, agent.currentCalls - 1) }
      }
      if (agent.id === toAgentId) {
        return { ...agent, currentCalls: agent.currentCalls + 1 }
      }
      return agent
    }))

    return toAgent
  }, [agents])

  return {
    agents,
    getAvailableAgents,
    assignAgentRoundRobin,
    assignAgentBySkill,
    releaseAgent,
    toggleAgentAvailability,
    reassignCall,
  }
}