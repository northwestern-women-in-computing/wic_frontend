"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { AttendanceDialog } from "@/components/attendance-dialog"

// Mock events data - in real app, this would come from your database
// Remove the mock events array

const categoryColors = {
  "Tech Talk": "bg-blue-100 text-blue-800",
  Workshop: "bg-green-100 text-green-800",
  Networking: "bg-purple-100 text-purple-800",
  Hackathon: "bg-red-100 text-red-800",
  Career: "bg-yellow-100 text-yellow-800",
  Panel: "bg-indigo-100 text-indigo-800",
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatTime(timeString: string) {
  const [hours, minutes] = timeString.split(":")
  const date = new Date()
  date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("http://localhost:5000/api/events")
        if (!res.ok) throw new Error("Failed to fetch events")
        const data = await res.json()
        setEvents(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading events...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-muted/50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Events Calendar</h1>
          <p className="text-muted-foreground">
            Discover upcoming events and workshops. Attend events to earn points and climb the leaderboard!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={categoryColors[event.category as keyof typeof categoryColors]}
                        variant="secondary"
                      >
                        {event.category}
                      </Badge>
                      <Badge variant="outline">{event.points} points</Badge>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </div>
                  <div className="flex space-x-2">
                    <Button>RSVP</Button>
                    <AttendanceDialog>
                      <Button variant="outline">Register Attendance</Button>
                    </AttendanceDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">{event.description}</CardDescription>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{formatTime(event.time)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>
                      {event.attendees}/{event.maxAttendees} attendees
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {event.maxAttendees - event.attendees} spots remaining
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Calendar Legend */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Event Categories</CardTitle>
            <CardDescription>Different types of events and their typical point values</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(categoryColors).map(([category, colorClass]) => (
                <div key={category} className="flex items-center space-x-2">
                  <Badge className={colorClass} variant="secondary">
                    {category}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                <strong>Points Guide:</strong>
              </p>
              <p>• Tech Talks & Panels: 10-15 points</p>
              <p>• Workshops & Career Events: 10-15 points</p>
              <p>• Networking Events: 20 points</p>
              <p>• Hackathons & Special Events: 50+ points</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
