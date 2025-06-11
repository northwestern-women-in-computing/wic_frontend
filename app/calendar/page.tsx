import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { AttendanceDialog } from "@/components/attendance-dialog"

// Mock events data - in real app, this would come from your database
const events = [
  {
    id: 1,
    title: "Tech Talk: Women Leaders in AI",
    description:
      "Join us for an inspiring talk with women leaders from top AI companies discussing their career journeys and the future of artificial intelligence.",
    date: "2024-02-15",
    time: "18:00",
    location: "Tech Building Room 101",
    points: 10,
    attendees: 45,
    maxAttendees: 60,
    category: "Tech Talk",
  },
  {
    id: 2,
    title: "Coding Workshop: Web Development",
    description: "Hands-on workshop covering HTML, CSS, and JavaScript fundamentals. Perfect for beginners!",
    date: "2024-02-22",
    time: "19:00",
    location: "Computer Lab A",
    points: 15,
    attendees: 25,
    maxAttendees: 30,
    category: "Workshop",
  },
  {
    id: 3,
    title: "Networking Night with Industry Professionals",
    description:
      "Connect with alumni and industry professionals over dinner and meaningful conversations about career paths in tech.",
    date: "2024-03-01",
    time: "18:30",
    location: "University Center",
    points: 20,
    attendees: 35,
    maxAttendees: 50,
    category: "Networking",
  },
  {
    id: 4,
    title: "Hackathon: Women in Tech Challenge",
    description:
      "24-hour hackathon focused on creating solutions that empower women in technology. Prizes and mentorship included!",
    date: "2024-03-15",
    time: "09:00",
    location: "Innovation Hub",
    points: 50,
    attendees: 20,
    maxAttendees: 40,
    category: "Hackathon",
  },
  {
    id: 5,
    title: "Resume Review and Interview Prep",
    description:
      "Get your resume reviewed by industry professionals and practice technical interviews in a supportive environment.",
    date: "2024-03-22",
    time: "17:00",
    location: "Career Services Center",
    points: 10,
    attendees: 15,
    maxAttendees: 25,
    category: "Career",
  },
  {
    id: 6,
    title: "Panel: Entrepreneurship in Tech",
    description:
      "Hear from successful women entrepreneurs about starting tech companies, securing funding, and building diverse teams.",
    date: "2024-04-05",
    time: "18:00",
    location: "Auditorium B",
    points: 15,
    attendees: 30,
    maxAttendees: 100,
    category: "Panel",
  },
]

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
