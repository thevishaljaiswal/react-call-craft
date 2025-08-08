import { useState } from "react"
import { Search, Filter, Download, Plus } from "lucide-react"
import { CallsTable } from "@/components/calls/CallsTable"
import { mockCalls } from "@/data/mockCalls"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CallLog } from "@/types/call"

export default function AllCalls() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredCalls = mockCalls.filter((call) => {
    const matchesSearch = 
      call.callerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.callerNumber.includes(searchTerm) ||
      call.receiverName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = filterType === "all" || call.callType === filterType
    const matchesStatus = filterStatus === "all" || call.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Calls</h1>
          <p className="text-muted-foreground">
            Manage and track all your call activities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-primary to-info text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" />
            Log Call
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, number, or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Call Type Filter */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Call Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="incoming">Incoming</SelectItem>
                <SelectItem value="outgoing">Outgoing</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredCalls.length} of {mockCalls.length} calls
        </p>
        {(searchTerm || filterType !== "all" || filterStatus !== "all") && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setSearchTerm("")
              setFilterType("all")
              setFilterStatus("all")
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Calls Table */}
      <CallsTable 
        calls={filteredCalls}
        onStatusUpdate={(callId, status) => {
          console.log("Update status:", callId, status)
        }}
        onRetryCall={(callId) => {
          console.log("Retry call:", callId)
        }}
      />
    </div>
  )
}