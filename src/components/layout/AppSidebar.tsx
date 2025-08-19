import { useState } from "react"
import { 
  BarChart3, 
  Phone, 
  PhoneCall, 
  PhoneMissed, 
  PhoneOff, 
  Users, 
  Settings,
  Calendar
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "All Calls", url: "/calls", icon: Phone },
  { title: "Incoming", url: "/calls/incoming", icon: PhoneCall },
  { title: "Outgoing", url: "/calls/outgoing", icon: Phone },
  { title: "Missed", url: "/calls/missed", icon: PhoneMissed },
  { title: "Failed", url: "/calls/failed", icon: PhoneOff },
  { title: "Contacts", url: "/contacts", icon: Users },
  { title: "Follow-ups", url: "/follow-ups", icon: Calendar },
  { title: "Agent Management", url: "/agents", icon: Users },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/"
    return currentPath.startsWith(path)
  }
  
  const getNavCls = (path: string) =>
    isActive(path) 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-accent text-muted-foreground hover:text-foreground"

  return (
    <Sidebar
      className={collapsed ? "w-16" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="border-r bg-card">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Phone className="w-4 h-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-foreground">CallTracker</h2>
                <p className="text-sm text-muted-foreground">CRM System</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={`${getNavCls(item.url)} flex items-center gap-3 rounded-lg px-3 py-2 transition-all`}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}