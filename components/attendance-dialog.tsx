"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, Key, Award, Lock } from "lucide-react"
import Link from "next/link"

// Mock data - in real app, this would come from your API
const mockEvents = [
  {
    id: 1,
    title: "Tech Talk: Women Leaders in AI",
    date: "2024-02-15",
    points: 10,
    attendance_key: "AI2024",
  },
  {
    id: 2,
    title: "Coding Workshop: Web Development",
    date: "2024-02-22",
    points: 15,
    attendance_key: "WEB2024",
  },
  {
    id: 3,
    title: "Networking Night with Industry Professionals",
    date: "2024-03-01",
    points: 20,
    attendance_key: "NET2024",
  },
  {
    id: 4,
    title: "Hackathon: Women in Tech Challenge",
    date: "2024-03-15",
    points: 50,
    attendance_key: "HACK2024",
  },
]

interface AttendanceDialogProps {
  children: React.ReactNode
}

export function AttendanceDialog({ children }: AttendanceDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [attendanceKey, setAttendanceKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState<{
    eventTitle: string
    points: number
  } | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Check authentication status when dialog opens
    if (isOpen) {
      const isSignedIn = localStorage.getItem("isSignedIn") === "true"
      const userData = localStorage.getItem("userData")

      if (isSignedIn && userData) {
        setIsAuthenticated(true)
        setUser(JSON.parse(userData))
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess(null)

    try {
      // Simulate API call - in real app, this would verify the key and record attendance
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find matching event
      const matchingEvent = mockEvents.find((event) => event.attendance_key === attendanceKey.toUpperCase())

      if (matchingEvent) {
        // Check if already attended (mock check)
        const alreadyAttended = false // In real app, check database

        if (alreadyAttended) {
          setError("You have already registered attendance for this event.")
        } else {
          setSuccess({
            eventTitle: matchingEvent.title,
            points: matchingEvent.points,
          })
          toast({
            title: "Attendance registered!",
            description: `You earned ${matchingEvent.points} points for attending "${matchingEvent.title}".`,
          })
        }
      } else {
        setError("Invalid attendance key. Please check the key and try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setAttendanceKey("")
    setError("")
    setSuccess(null)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      // Reset form when dialog closes
      resetForm()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              {isAuthenticated ? (
                <Key className="h-6 w-6 text-purple-600" />
              ) : (
                <Lock className="h-6 w-6 text-red-600" />
              )}
            </div>
          </div>
          <DialogTitle className="text-center">
            {isAuthenticated ? "Register Attendance" : "Sign In Required"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isAuthenticated
              ? `Welcome, ${user?.name}! Enter the attendance key provided at the event.`
              : "You need to be signed in to register event attendance and earn points."}
          </DialogDescription>
        </DialogHeader>

        {!isAuthenticated ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Please sign in to your Northwestern WiC account to continue.
            </p>
            <div className="space-y-2">
              <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Sign In</Button>
              </Link>
              <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        ) : success ? (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">Attendance Registered!</h3>
              <p className="text-sm text-muted-foreground">You have successfully registered your attendance for:</p>
              <p className="font-medium mt-2">{success.eventTitle}</p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <Award className="h-5 w-5 text-purple-600" />
                <span className="font-medium">+{success.points} points earned</span>
              </div>
            </div>
            <div className="space-y-4">
              <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="attendanceKey">Attendance Key</Label>
              <Input
                id="attendanceKey"
                type="text"
                placeholder="Enter the key provided at the event"
                value={attendanceKey}
                onChange={(e) => setAttendanceKey(e.target.value)}
                className="text-center text-lg font-mono tracking-wider"
                required
                autoComplete="off"
              />
              <p className="text-xs text-muted-foreground text-center">
                Keys are case-insensitive and typically 6-8 characters long
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || !attendanceKey.trim()}>
              {isLoading ? "Verifying..." : "Register Attendance"}
            </Button>

            {/* Demo Keys */}
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-xs font-medium mb-2">Demo Keys (For Testing):</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <code className="bg-background px-1 rounded">AI2024</code> - 10 pts
                </div>
                <div>
                  <code className="bg-background px-1 rounded">WEB2024</code> - 15 pts
                </div>
                <div>
                  <code className="bg-background px-1 rounded">NET2024</code> - 20 pts
                </div>
                <div>
                  <code className="bg-background px-1 rounded">HACK2024</code> - 50 pts
                </div>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}