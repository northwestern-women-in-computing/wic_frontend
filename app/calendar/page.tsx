"use client"
import { useEffect, useState, useMemo } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { AttendanceDialog } from "@/components/attendance-dialog"

// Category color mapping
const categoryColors: Record<string, string> = {
  "Tech Talk": "bg-blue-100 text-blue-800",
  Workshop: "bg-green-100 text-green-800",
  Networking: "bg-purple-100 text-purple-800",
  Hackathon: "bg-red-100 text-red-800",
  Career: "bg-yellow-100 text-yellow-800",
  Panel: "bg-indigo-100 text-indigo-800",
}

function formatDate(dateString: string) {
  const [datePart] = dateString.split("T")
  const [year, month, day] = datePart.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatTime(dateTimeOrTime?: string) {
  if (!dateTimeOrTime) return ""
  const isoString = dateTimeOrTime.includes("T")
    ? dateTimeOrTime
    : `1970-01-01T${dateTimeOrTime}:00`
  const date = new Date(isoString)
  if (isNaN(date.getTime())) return ""
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("http://localhost:5000/api/events")
        if (!res.ok) throw new Error("Failed to fetch events")
        const data = await res.json()
        console.log("📡 Backend response:", data)

        const processed = data.map((ev: any) => {
          let dateOnly = ev.date
          let timeOnly = ev.time ?? ''
          let status = ev.status ?? ''
          console.log(ev.status)

          if (!timeOnly && typeof ev.date === 'string' && ev.date.includes('T')) {
            const [d, t] = ev.date.split('T')
            dateOnly = d
            timeOnly = t.split('.')[0].slice(0, 5)
          }

          return {
            ...ev,
            date: dateOnly,
            time: timeOnly,
            status: status.toLowerCase(),
          }
        })

        // Filter out any events missing required fields or with unwanted status
        const validStatuses = [
          'done',
          'cancelled',
          'registration open',
          'confirmed',
        ]
        const filteredEvents = processed.filter((ev : any) =>
          ev.id &&
          ev.title &&
          ev.date &&
          ev.category &&
          ev.location &&
          ev.format &&
          validStatuses.includes(ev.status)
        );

        setEvents(filteredEvents)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const da = new Date(a.date + 'T' + (a.time ?? '00:00') + ':00').getTime()
      const db = new Date(b.date + 'T' + (b.time ?? '00:00') + ':00').getTime()
      return sortOrder === 'asc' ? da - db : db - da
    })
  }, [events, sortOrder])

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Loading events...</div>
  if (error)
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-muted/50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Events Calendar</h1>
            <p className="text-muted-foreground">
              Discover upcoming events and workshops. Earn points and climb the leaderboard!
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-muted-foreground">Sort:</span>
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}>
              <SelectTrigger className="w-52">
                <SelectValue>
                  {sortOrder === 'asc' ? 'Date ↑ (Earliest First)' : 'Date ↓ (Latest First)'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Date ↑ (Earliest First)</SelectItem>
                <SelectItem value="desc">Date ↓ (Latest First)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {sortedEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={categoryColors[event.category]} variant="secondary">
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
                    <span>{formatTime(event.date + 'T' + (event.time ?? '00:00') + ':00')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees}/{event.maxAttendees}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {event.maxAttendees - event.attendees} spots remaining
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Event Categories</CardTitle>
            <CardDescription>Different types of events & their points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(categoryColors).map(([category, colorClass]) => (
                <Badge key={category} className={colorClass} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
