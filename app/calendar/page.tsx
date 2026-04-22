/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
//import { useEffect } from "react";
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

function formatDate(dateString: string) {
  if (!dateString || dateString === "1970-01-01") return "TBD";

  let date = new Date(dateString);

  if (isNaN(date.getTime()) && dateString.includes('/')) {
    const [month, day, year] = dateString.split('/').map(Number);
    date = new Date(year, month - 1, day);
  }

  if (isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(dateTimeOrTime?: string) {
  if (!dateTimeOrTime) return "";

  if (dateTimeOrTime.includes("AM") || dateTimeOrTime.includes("PM")) {
    return dateTimeOrTime;
  }

  const isoString = dateTimeOrTime.includes("T")
    ? dateTimeOrTime
    : `1970-01-01T${dateTimeOrTime}:00`;
    
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return dateTimeOrTime;

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

        const processed = data.map((ev: any, index: number) => {
          // Normalize the data from Google Sheets CSV
          const title = ev.title || ev.Event || "Untitled Event";
          const status = (ev.status || "").toLowerCase();
          
          // Ensure we have a unique ID for the 'key' prop
          const id = ev.id || `event-${index}`;

          return {
            ...ev,
            id,
            title,
            status,
            date: ev.date || "1970-01-01",
            time: ev.time || "00:00",
          };
        });

        // Updated status list to include 'confirmed' (common in Google Sheets)
        const validStatuses = [
          "done",
          "cancelled",
          "registration open",
          "confirmed",
          "live"
        ];

        const filteredEvents = processed.filter(
          (ev: any) =>
            ev.title && 
            (validStatuses.includes(ev.status) || ev.status === "")
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
    now.setHours(0, 0, 0, 0); // Start of today
    
    const upcoming: any[] = [];
    const past: any[] = [];
    
    events.forEach((event) => {
      let eventDate: Date | null = null;

      if (event.date && event.date !== "1970-01-01") {
        // Handle "4/15/2026" or "2026-04-15"
        if (event.date.includes('/')) {
          const [m, d, y] = event.date.split('/').map(Number);
          eventDate = new Date(y, m - 1, d);
        } else {
          eventDate = new Date(event.date);
        }
      }
      
      if (eventDate && !isNaN(eventDate.getTime())) {
        eventDate.setHours(0, 0, 0, 0);
        // Comparison logic
        if (eventDate >= now) {
          upcoming.push(event);
        } else {
          past.push(event);
        }
      } else {
        // If date is totally missing or invalid, assume it's a TBD future event
        upcoming.push(event);
      }
    });
    
    // Sort logic remains the same (Upcoming = soonest first, Past = newest first)
    upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
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
            Discover upcoming events and workshops. Earn points and check your status on the
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
            
                      {event.points > 0 && (
                        <Badge variant="outline">{event.points} point</Badge>
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
                      {formatTime(event.time)}
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
                          {event.points > 0 && (
                            <Badge variant="outline">{event.points} point</Badge>
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
                          {formatTime(event.time)}
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

        {/* <Card className="mt-8">
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
        </Card> */}
      </div>
    </div>
  );
}
