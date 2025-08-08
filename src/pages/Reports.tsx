import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts"
import { CalendarDays, Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const callVolumeData = [
  { name: "Mon", incoming: 45, outgoing: 32, missed: 8 },
  { name: "Tue", incoming: 52, outgoing: 28, missed: 12 },
  { name: "Wed", incoming: 38, outgoing: 41, missed: 6 },
  { name: "Thu", incoming: 61, outgoing: 35, missed: 15 },
  { name: "Fri", incoming: 48, outgoing: 39, missed: 9 },
  { name: "Sat", incoming: 24, outgoing: 18, missed: 4 },
  { name: "Sun", incoming: 19, outgoing: 12, missed: 3 },
]

const callStatusData = [
  { name: "Completed", value: 342, color: "hsl(var(--success))" },
  { name: "Missed", value: 87, color: "hsl(var(--warning))" },
  { name: "Failed", value: 23, color: "hsl(var(--destructive))" },
  { name: "In Progress", value: 45, color: "hsl(var(--info))" },
]

const performanceData = [
  { name: "Week 1", callsHandled: 156, avgDuration: 4.2, satisfaction: 4.1 },
  { name: "Week 2", callsHandled: 178, avgDuration: 3.8, satisfaction: 4.3 },
  { name: "Week 3", callsHandled: 165, avgDuration: 4.1, satisfaction: 4.0 },
  { name: "Week 4", callsHandled: 192, avgDuration: 3.9, satisfaction: 4.4 },
]

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your call management performance
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="last7days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last30days">Last 30 days</SelectItem>
              <SelectItem value="last90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
          <Button className="bg-gradient-to-r from-primary to-info text-primary-foreground">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Call Volume Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Call Volume by Day</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={callVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="incoming" fill="hsl(var(--primary))" name="Incoming" />
                <Bar dataKey="outgoing" fill="hsl(var(--info))" name="Outgoing" />
                <Bar dataKey="missed" fill="hsl(var(--warning))" name="Missed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Call Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Call Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={callStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {callStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Trends */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="callsHandled" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Calls Handled"
                />
                <Line 
                  type="monotone" 
                  dataKey="avgDuration" 
                  stroke="hsl(var(--info))" 
                  strokeWidth={2}
                  name="Avg Duration (min)"
                />
                <Line 
                  type="monotone" 
                  dataKey="satisfaction" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="Satisfaction Rating"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls This Week</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">497</div>
            <p className="text-xs text-muted-foreground">
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Call Duration</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4:02</div>
            <p className="text-xs text-muted-foreground">
              -8% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2/5</div>
            <p className="text-xs text-muted-foreground">
              +0.3 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89.2%</div>
            <p className="text-xs text-muted-foreground">
              +5.1% from last week
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}