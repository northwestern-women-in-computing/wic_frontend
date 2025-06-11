"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Notification = {
  id: number
  title: string
  message: string
  link?: string
  date: string
  isRead: boolean
}

export function NotificationBell() {
  // In a real app, these would come from your API
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Hackathon Registration Open",
      message: "Registration for our annual hackathon is now open! Sign up before spots fill up.",
      link: "/calendar",
      date: "2 hours ago",
      isRead: false,
    },
    {
      id: 2,
      title: "Resume Workshop Reminder",
      message: "Don't forget about the resume workshop tomorrow at 5 PM in the Career Services Center.",
      link: "/calendar",
      date: "1 day ago",
      isRead: false,
    },
    {
      id: 3,
      title: "New Sponsor Announcement",
      message: "We're excited to announce our new Platinum sponsor, Microsoft!",
      link: "/sponsors",
      date: "3 days ago",
      isRead: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-medium">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "border-b last:border-0 p-4 cursor-pointer hover:bg-muted/50",
                  !notification.isRead && "bg-muted/30",
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">{notification.title}</h5>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{notification.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{notification.date}</span>
                      {notification.link && (
                        <Link href={notification.link} className="text-xs text-purple-600 hover:underline">
                          View
                        </Link>
                      )}
                    </div>
                  </div>
                  {!notification.isRead && <div className="h-2 w-2 rounded-full bg-purple-600 mt-1.5" />}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-2 border-t">
          <Link href="/notifications" className="block text-center text-xs text-muted-foreground hover:underline p-2">
            View all notifications
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  )
}
