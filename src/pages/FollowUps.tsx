import { useState } from "react"
import { format } from "date-fns"
import { Calendar, Clock, Plus, MoreHorizontal, Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AddFollowUpForm } from "@/components/forms/AddFollowUpForm"
import { useFollowUps } from "@/hooks/useFollowUps"

export default function FollowUps() {
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { followUps, addFollowUp, updateFollowUp, deleteFollowUp } = useFollowUps()

  const filteredFollowUps = followUps.filter((followUp) => {
    if (filterStatus === "all") return true
    return followUp.status === filterStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-warning text-warning-foreground"
      case "completed": return "bg-success text-success-foreground"
      case "overdue": return "bg-destructive text-destructive-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground"
      case "medium": return "bg-warning text-warning-foreground"
      case "low": return "bg-success text-success-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Follow-ups</h1>
          <p className="text-muted-foreground">
            Manage scheduled follow-up tasks and callbacks
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-info text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Schedule Follow-up
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Follow-up</DialogTitle>
            </DialogHeader>
            <AddFollowUpForm 
              onSubmit={(data) => {
                addFollowUp(data)
                setIsAddDialogOpen(false)
              }}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredFollowUps.length} follow-ups
        </p>
      </div>

      {/* Follow-ups Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b">
              <TableHead>Task</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFollowUps.map((followUp) => (
              <TableRow key={followUp.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-foreground">
                      {followUp.title}
                    </div>
                    {followUp.description && (
                      <div className="text-sm text-muted-foreground">
                        {followUp.description}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {followUp.contactName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {followUp.contactPhone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-1">
                      <div className="text-sm">
                        {format(followUp.dueDate, "MMM dd, yyyy")}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {format(followUp.dueDate, "HH:mm")}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary"
                    className={getPriorityColor(followUp.priority)}
                  >
                    {followUp.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary"
                    className={getStatusColor(followUp.status)}
                  >
                    {followUp.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{followUp.assignedTo}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {followUp.status === "pending" && (
                      <>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateFollowUp(followUp.id, { status: "completed" })}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateFollowUp(followUp.id, { status: "overdue" })}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuItem>
                          Edit Follow-up
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => deleteFollowUp(followUp.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}