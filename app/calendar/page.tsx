/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_ENDPOINTS } from "@/lib/api-config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

// Category color mapping
const categoryColors: Record<string, string> = {
  "Tech Talk": "bg-blue-100 text-blue-800",
  Workshop: "bg-green-100 text-green-800",
  Networking: "bg-purple-100 text-purple-800",
  Hackathon: "bg-red-100 text-red-800",
  Career: "bg-yellow-100 text-yellow-800",
  Panel: "bg-indigo-100 text-indigo-800",
};

function formatDate(dateString: string) {
  const [datePart] = dateString.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(dateTimeOrTime?: string) {
  if (!dateTimeOrTime) return "";
  const isoString = dateTimeOrTime.includes("T")
    ? dateTimeOrTime
    : `1970-01-01T${dateTimeOrTime}:00`;
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(API_ENDPOINTS.events);
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        // console.log("📡 Backend response:", data);

        const processed = data.map((ev: any) => {
          let dateOnly = ev.date;
          let timeOnly = ev.time ?? "";
          const status = ev.status ?? "";
          // console.log(ev.status);

          if (
            !timeOnly &&
            typeof ev.date === "string" &&
            ev.date.includes("T")
          ) {
            const [d, t] = ev.date.split("T");
            dateOnly = d;
            timeOnly = t.split(".")[0].slice(0, 5);
          }

          return {
            ...ev,
            date: dateOnly,
            time: timeOnly,
            status: status.toLowerCase(),
          };
        });

        // Filter out any events missing required fields or with unwanted status
        const validStatuses = [
          "done",
          "cancelled",
          "registration open",
          "confirmed",
        ];
        const filteredEvents = processed
          .map((ev: any) => ({
            ...ev,
            category: ev.category || "Event",
            location: ev.location || "TBD",
            format: ev.format || "In-Person",
            date: ev.date || "1970-01-01",
            time: ev.time || "00:00"
          }))
          .filter(
            (ev: any) =>
              ev.id &&
              ev.title &&
              validStatuses.includes(ev.status)
          );

        setEvents(filteredEvents);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // Separate events into upcoming and past
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to start of today for comparison
    
    const upcoming: any[] = [];
    const past: any[] = [];
    
    events.forEach((event) => {
      const eventDate = event.date && event.date !== "1970-01-01" 
        ? new Date(`${event.date}T${event.time ?? "00:00"}:00`)
        : null;
      
      if (eventDate && !isNaN(eventDate.getTime())) {
        eventDate.setHours(0, 0, 0, 0);
        if (eventDate >= now) {
          upcoming.push(event);
        } else {
          past.push(event);
        }
      } else {
        // Events without valid dates go to upcoming (assume they're future)
        upcoming.push(event);
      }
    });
    
    // Sort upcoming events ascending (earliest first)
    upcoming.sort((a, b) => {
      const da = a.date && a.date !== "1970-01-01"
        ? new Date(`${a.date}T${a.time ?? "00:00"}:00`).getTime()
        : Number.MAX_SAFE_INTEGER;
      const db = b.date && b.date !== "1970-01-01"
        ? new Date(`${b.date}T${b.time ?? "00:00"}:00`).getTime()
        : Number.MAX_SAFE_INTEGER;
      return da - db;
    });
    
    // Sort past events descending (most recent first)
    past.sort((a, b) => {
      const da = a.date && a.date !== "1970-01-01"
        ? new Date(`${a.date}T${a.time ?? "00:00"}:00`).getTime()
        : 0;
      const db = b.date && b.date !== "1970-01-01"
        ? new Date(`${b.date}T${b.time ?? "00:00"}:00`).getTime()
        : 0;
      return db - da; // Descending for past events
    });
    
    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading events...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-muted/50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Events Calendar</h1>
          <p className="text-muted-foreground mt-2">
            Discover upcoming events and workshops. Earn points and climb the
            leaderboard!
          </p>
        </div>

        {/* Upcoming Events Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {upcomingEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={`bg-${event.categoryColor}-100 text-${event.categoryColor}-800`}
                        variant="secondary"
                      >
                      {event.category}
                      </Badge>
                      {event.format && event.format !== "0" && event.format !== 0 && String(event.format).trim() && (
                        <Badge variant="secondary">{event.format}</Badge>
                      )}
                      {event.points > 0 && (
                        <Badge variant="outline">{event.points} points</Badge>
                      )}
                      {event.status && (
                        <Badge
                          className={`bg-${event.statusColor}-100 text-${event.statusColor}-800`}
                          variant="secondary"
                        >
                          {event.status.charAt(0).toUpperCase() +
                            event.status.slice(1)}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </div>
                  {event.attendanceForm && typeof event.attendanceForm === 'string' && event.attendanceForm.trim() && (
                    <div>
                      <Button asChild>
                        <a href={event.attendanceForm} target="_blank" rel="noopener noreferrer">
                          RSVP
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {event.description && (
                  <CardDescription className="text-base mb-4">
                    {event.description}
                  </CardDescription>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {formatTime(
                        event.date + "T" + (event.time ?? "00:00") + ":00"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{event.location && event.location !== "0" ? event.location : "TBD"}</span>
                  </div>
                </div>
                {event.maxAttendees != null && Number(event.maxAttendees) > 0 && (
                  <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>
                        {event.attendees || 0}/{event.maxAttendees}
                      </span>
                    </div>
                    <div>
                      {Math.max(0, Number(event.maxAttendees) - (event.attendees || 0))} spots remaining
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground text-lg">
                No upcoming events scheduled at this time.
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Check back soon for new events!
              </p>
            </div>
          )}
        </div>

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Past Events</h2>
            <div className="grid grid-cols-1 gap-6">
              {pastEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={`bg-${event.categoryColor}-100 text-${event.categoryColor}-800`}
                            variant="secondary"
                          >
                          {event.category}
                          </Badge>
                          {event.format && event.format !== "0" && event.format !== 0 && String(event.format).trim() && (
                            <Badge variant="secondary">{event.format}</Badge>
                          )}
                          {event.points > 0 && (
                            <Badge variant="outline">{event.points} points</Badge>
                          )}
                          {event.status && (
                            <Badge
                              className={`bg-${event.statusColor}-100 text-${event.statusColor}-800`}
                              variant="secondary"
                            >
                              {event.status.charAt(0).toUpperCase() +
                                event.status.slice(1)}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                      </div>
                      {event.attendanceForm && typeof event.attendanceForm === 'string' && event.attendanceForm.trim() && (
                        <div>
                          <Button asChild>
                            <a href={event.attendanceForm} target="_blank" rel="noopener noreferrer">
                              RSVP
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {event.description && (
                      <CardDescription className="text-base mb-4">
                        {event.description}
                      </CardDescription>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {formatTime(
                            event.date + "T" + (event.time ?? "00:00") + ":00"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{event.location && event.location !== "0" ? event.location : "TBD"}</span>
                      </div>
                    </div>
                    {event.maxAttendees != null && Number(event.maxAttendees) > 0 && (
                      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>
                            {event.attendees || 0}/{event.maxAttendees}
                          </span>
                        </div>
                        <div>
                          {Math.max(0, Number(event.maxAttendees) - (event.attendees || 0))} spots remaining
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {upcomingEvents.length === 0 && pastEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No events found.</p>
          </div>
        )}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Event Categories</CardTitle>
            <CardDescription>
              Different types of events & their points
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(categoryColors).map(([category, colorClass]) => (
                <Badge
                  key={category}
                  className={colorClass}
                  variant="secondary"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
