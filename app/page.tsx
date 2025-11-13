"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Lightbulb, Network, Calendar as CalendarIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { API_ENDPOINTS } from "@/lib/api-config"

export default function HomePage() {
  // Types for events fetched and displayed
  type FetchedEvent = {
    id: string | number
    title: string
    date: string
    time?: string
    location: string
    category: string
    format: string
    status?: string
    description?: string
    attendanceForm?: string
  }

  type WicEvent = {
    id: string | number
    title: string
    date: string
    time: string
    location: string
    category: string
    format: string
    status: string
    description?: string
    attendanceForm?: string
  }

  // 1) state to hold the fetched events
  const [upcomingEvents, setUpcomingEvents] = useState<WicEvent[]>([])

  // 2) fetch + process
  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch(API_ENDPOINTS.events)
        if (!res.ok) {
          console.error("Failed to fetch events:", res.status, res.statusText)
          return
        }
        const raw = (await res.json()) as unknown

        if (!Array.isArray(raw)) {
          console.error("Events data is not an array:", raw)
          return
        }

        // Filter & sort like CalendarPage
        const validStatuses = [
          "done",
          "cancelled",
          "registration open",
          "confirmed",
        ]
        const evs = (raw as FetchedEvent[])
          .map((ev): FetchedEvent & { time: string } => {
            // Handle date - provide default if missing
            const dateStr = ev.date || ""
            const [d, t] = dateStr.includes("T")
              ? dateStr.split("T")
              : [dateStr || "1970-01-01", "00:00"]
            return { 
              ...ev, 
              date: d || "1970-01-01", 
              time: (t ?? "00:00").slice(0,5),
              category: ev.category || "Event",
              location: ev.location || "TBD",
              format: ev.format || "In-Person"
            }
          })
          .filter((ev): ev is WicEvent =>
            Boolean(
            ev.id &&
            ev.title &&
            validStatuses.includes((ev.status ?? "").toLowerCase())
            )
          )
          .filter((ev) => {
            // Only show upcoming events on home page
            if (!ev.date || ev.date === "1970-01-01") return true; // Include events without dates
            const eventDate = new Date(`${ev.date}T${ev.time}:00`);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= today; // Only upcoming events
          })
          .sort((a, b) => {
            // Sort by date if available, otherwise keep original order
            const dateA = a.date && a.date !== "1970-01-01" 
              ? new Date(`${a.date}T${a.time}:00`).getTime() 
              : Number.MAX_SAFE_INTEGER
            const dateB = b.date && b.date !== "1970-01-01"
              ? new Date(`${b.date}T${b.time}:00`).getTime()
              : Number.MAX_SAFE_INTEGER
            return dateA - dateB
          })
        setUpcomingEvents(evs.slice(0, 6))
      } catch (error) {
        console.error("Error fetching events:", error)
      }
    }
    loadEvents()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Northwestern
              <span className="block text-purple-200">Women in Computing</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-purple-100">
              Empowering women in technology through community, mentorship, and professional development at Northwestern
              University. Open to all enrolled NU students.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="https://forms.gle/tR7fbRQsSEsGtSb47">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
                  Join Our Community
                </Button>
              </Link>
              <Link href="/calendar">
                <Button size="lg" variant="outline" className="bg-white text-purple-700 hover:bg-purple-50">
                  View Events
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button size="lg" variant="outline" className="bg-white text-purple-700 hover:bg-purple-50">
                  View Leaderboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">100+</div>
              <div className="mt-2 text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">30+</div>
              <div className="mt-2 text-sm text-muted-foreground">Events Per Year</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">5+</div>
              <div className="mt-2 text-sm text-muted-foreground">Industry Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">What We Offer</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive support for women and non-binary folks pursuing careers in technology
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Network className="h-6 w-6 text-purple-600" />
                  <CardTitle>Networking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with peers, alumni, and industry professionals through our exclusive networking events and
                  mentorship programs.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Code className="h-6 w-6 text-purple-600" />
                  <CardTitle>Technical Workshops</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Enhance your skills with hands-on workshops covering the latest technologies, programming languages,
                  and industry tools.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-6 w-6 text-purple-600" />
                  <CardTitle>Career Development</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get career guidance, resume reviews, interview preparation, and access to exclusive internship and job
                  opportunities. (+ free GHC trip anyone?)
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Upcoming Events</h2>
              <Link href="/calendar">
                <Button variant="outline">View All Events</Button>
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {upcomingEvents.map(event => {
                const eventDate = new Date(`${event.date}T${event.time}:00`)
                const formattedDate = eventDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                const formattedTime = eventDate.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
                return (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{formattedDate}</Badge>
                        <Badge>{event.category}</Badge>
                      </div>
                      <CardTitle className="text-lg mt-2">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {event.description && (
                        <CardDescription className="mb-4">{event.description}</CardDescription>
                      )}
                      <div className="mt-4 flex items-center text-sm text-muted-foreground">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        {formattedTime} • {event.location}
                      </div>
                      {event.attendanceForm && typeof event.attendanceForm === 'string' && event.attendanceForm.trim() && (
                        <div className="mt-4">
                          <Button asChild size="sm">
                            <a href={event.attendanceForm} target="_blank" rel="noopener noreferrer">
                              RSVP
                            </a>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-purple-600 px-6 py-16 text-center text-white sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight">Ready to Join Our Community?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-purple-100">
              Take the first step towards building your career in technology with the support of an amazing community.
            </p>
            <div className="mt-8">
              <Link href="https://forms.gle/tR7fbRQsSEsGtSb47">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
                  Sign Up Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
