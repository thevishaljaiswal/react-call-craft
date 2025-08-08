import { 
  Phone, 
  PhoneCall, 
  PhoneMissed, 
  PhoneOff, 
  Clock,
  TrendingUp,
  Users,
  Target
} from "lucide-react"
import { CallStatsCard } from "@/components/dashboard/CallStatsCard"
import { CallsTable } from "@/components/calls/CallsTable"
import { mockCalls, mockStats } from "@/data/mockCalls"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const recentCalls = mockCalls.slice(0, 5)
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your call management activities
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-info text-primary-foreground">
          <Phone className="mr-2 h-4 w-4" />
          Make Call
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CallStatsCard
          title="Total Calls"
          value={mockStats.totalCalls}
          icon={Phone}
          description="All calls today"
          trend={{ value: 12, isPositive: true }}
        />
        <CallStatsCard
          title="Completed"
          value={mockStats.completedCalls}
          icon={Target}
          description="Successfully completed"
          variant="success"
          trend={{ value: 8, isPositive: true }}
        />
        <CallStatsCard
          title="Missed Calls"
          value={mockStats.missedCalls}
          icon={PhoneMissed}
          description="Requires follow-up"
          variant="warning"
          trend={{ value: -5, isPositive: false }}
        />
        <CallStatsCard
          title="Failed Calls"
          value={mockStats.failedCalls}
          icon={PhoneOff}
          description="Technical issues"
          variant="destructive"
          trend={{ value: -2, isPositive: false }}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <CallStatsCard
          title="Avg Call Duration"
          value={formatDuration(mockStats.averageDuration)}
          icon={Clock}
          description="Average time per call"
          variant="info"
        />
        <CallStatsCard
          title="Incoming Calls"
          value={mockStats.incomingCalls}
          icon={PhoneCall}
          description="Received today"
          variant="info"
        />
        <CallStatsCard
          title="Outgoing Calls"
          value={mockStats.outgoingCalls}
          icon={Phone}
          description="Made today"
          variant="default"
        />
      </div>

      {/* Recent Calls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Call Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CallsTable 
            calls={recentCalls}
            onStatusUpdate={(callId, status) => {
              console.log("Update status:", callId, status)
            }}
            onRetryCall={(callId) => {
              console.log("Retry call:", callId)
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}