import { useState } from "react"
import { Save, Bell, Phone, Users, Shield, Database } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function Settings() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    // General Settings
    companyName: "Acme Corp",
    timezone: "America/New_York",
    dateFormat: "MM/dd/yyyy",
    
    // Call Settings
    autoRecord: true,
    callTimeout: 30,
    maxCallDuration: 3600,
    defaultDisposition: "completed",
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    missedCallAlerts: true,
    followUpReminders: true,
    
    // User Settings
    defaultAssignee: "unassigned",
    autoAssignCalls: false,
    
    // Integration Settings
    crmIntegration: false,
    webhookUrl: "",
    apiKey: "",
  })

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    })
  }

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Configure your call management system
          </p>
        </div>
        <Button onClick={handleSave} className="bg-gradient-to-r from-primary to-info text-primary-foreground">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={settings.companyName}
                onChange={(e) => updateSetting("companyName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select value={settings.dateFormat} onValueChange={(value) => updateSetting("dateFormat", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Call Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Call Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Record Calls</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically record all calls
                </p>
              </div>
              <Switch
                checked={settings.autoRecord}
                onCheckedChange={(checked) => updateSetting("autoRecord", checked)}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="callTimeout">Call Timeout (seconds)</Label>
              <Input
                id="callTimeout"
                type="number"
                value={settings.callTimeout}
                onChange={(e) => updateSetting("callTimeout", parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxCallDuration">Max Call Duration (seconds)</Label>
              <Input
                id="maxCallDuration"
                type="number"
                value={settings.maxCallDuration}
                onChange={(e) => updateSetting("maxCallDuration", parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultDisposition">Default Disposition</Label>
              <Select value={settings.defaultDisposition} onValueChange={(value) => updateSetting("defaultDisposition", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="interested">Interested</SelectItem>
                  <SelectItem value="not-interested">Not Interested</SelectItem>
                  <SelectItem value="callback">Call Back Later</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive SMS notifications
                </p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Missed Call Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Alert when calls are missed
                </p>
              </div>
              <Switch
                checked={settings.missedCallAlerts}
                onCheckedChange={(checked) => updateSetting("missedCallAlerts", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Follow-up Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Remind about scheduled follow-ups
                </p>
              </div>
              <Switch
                checked={settings.followUpReminders}
                onCheckedChange={(checked) => updateSetting("followUpReminders", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* User Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="defaultAssignee">Default Assignee</Label>
              <Select value={settings.defaultAssignee} onValueChange={(value) => updateSetting("defaultAssignee", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  <SelectItem value="auto">Auto Assign</SelectItem>
                  <SelectItem value="alice">Alice Johnson</SelectItem>
                  <SelectItem value="bob">Bob Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Assign Calls</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically assign incoming calls
                </p>
              </div>
              <Switch
                checked={settings.autoAssignCalls}
                onCheckedChange={(checked) => updateSetting("autoAssignCalls", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Integration Settings */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Integrations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>CRM Integration</Label>
                <p className="text-sm text-muted-foreground">
                  Connect with your CRM system
                </p>
              </div>
              <Switch
                checked={settings.crmIntegration}
                onCheckedChange={(checked) => updateSetting("crmIntegration", checked)}
              />
            </div>

            {settings.crmIntegration && (
              <>
                <Separator />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      placeholder="https://your-crm.com/webhook"
                      value={settings.webhookUrl}
                      onChange={(e) => updateSetting("webhookUrl", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="Your API key"
                      value={settings.apiKey}
                      onChange={(e) => updateSetting("apiKey", e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}