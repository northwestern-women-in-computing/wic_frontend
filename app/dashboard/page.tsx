import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, TrendingUp, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AttendanceDialog } from "@/components/attendance-dialog"

// Mock data - in real app, this would come from your database
const memberData = {
  name: "Demo User",
  email: "demo@northwestern.edu",
  year: "Junior",
  major: "Computer Science",
  points: 45,
  rank: 12,
  totalMembers: 200,
  eventsAttended: 6,
  nextEvent: "Tech Talk: Women Leaders in AI",
}

const leaderboard = [
  { rank: 1, name: "Sarah Johnson", points: 150, year: "Senior" },
  { rank: 2, name: "Emily Chen", points: 135, year: "Junior" },
  { rank: 3, name: "Maya Patel", points: 120, year: "Sophomore" },
  { rank: 4, name: "Jessica Rodriguez", points: 110, year: "Junior" },
  { rank: 5, name: "Amanda Kim", points: 95, year: "Sophomore" },
  { rank: 6, name: "Rachel Thompson", points: 85, year: "Senior" },
  { rank: 7, name: "Lisa Wang", points: 75, year: "Junior" },
  { rank: 8, name: "Maria Garcia", points: 65, year: "Sophomore" },
  { rank: 9, name: "Jennifer Lee", points: 55, year: "Senior" },
  { rank: 10, name: "Ashley Brown", points: 50, year: "Junior" },
  { rank: 11, name: "Nicole Davis", points: 48, year: "Sophomore" },
  { rank: 12, name: "Demo User", points: 45, year: "Junior", isCurrentUser: true },
]

export default function DashboardPage() {
  const progressToNext = memberData.rank > 1 ? (memberData.points / leaderboard[memberData.rank - 2].points) * 100 : 100

  return (
    <div className="min-h-screen bg-muted/50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {memberData.name}!</h1>
          <p className="text-muted-foreground">Here's your Northwestern WiC dashboard</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/attendance">
                  <Button className="w-full" variant="outline">
                    Register Attendance
                  </Button>
                </Link>
                <Link href="/calendar">
                  <Button className="w-full" variant="outline">
                    View Events
                  </Button>
                </Link>
                <Link href="/sponsors">
                  <Button className="w-full" variant="outline">
                    View Sponsors
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#{memberData.rank}</div>
              <p className="text-xs text-muted-foreground">out of {memberData.totalMembers} members</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{memberData.points}</div>
              <p className="text-xs text-muted-foreground">
                {leaderboard[memberData.rank - 2]?.points - memberData.points || 0} points to next rank
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{memberData.eventsAttended}</div>
              <p className="text-xs text-muted-foreground">This academic year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Member Since</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2023</div>
              <p className="text-xs text-muted-foreground">Sophomore year</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Progress to Next Rank</CardTitle>
              <CardDescription>Keep attending events to climb the leaderboard!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current: #{memberData.rank}</span>
                  <span>Next: #{memberData.rank - 1}</span>
                </div>
                <Progress value={progressToNext} className="h-2" />
              </div>
              <div className="text-sm text-muted-foreground">
                You need {leaderboard[memberData.rank - 2]?.points - memberData.points || 0} more points to reach rank #
                {memberData.rank - 1}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Top members by points earned this year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((member) => (
                  <div
                    key={member.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      member.isCurrentUser ? "bg-purple-50 border border-purple-200" : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                          member.rank === 1
                            ? "bg-yellow-500 text-white"
                            : member.rank === 2
                              ? "bg-gray-400 text-white"
                              : member.rank === 3
                                ? "bg-amber-600 text-white"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {member.rank}
                      </div>
                      <div>
                        <div className={`font-medium ${member.isCurrentUser ? "text-purple-700" : ""}`}>
                          {member.name} {member.isCurrentUser && "(You)"}
                        </div>
                        <div className="text-sm text-muted-foreground">{member.year}</div>
                      </div>
                    </div>
                    <Badge variant={member.isCurrentUser ? "default" : "secondary"}>{member.points} pts</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Your Northwestern WiC member information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span> {memberData.name}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span> {memberData.email}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Year:</span> {memberData.year}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Major:</span> {memberData.major}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Engagement Stats</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Points:</span> {memberData.points}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Current Rank:</span> #{memberData.rank}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Events Attended:</span> {memberData.eventsAttended}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Next Event:</span> {memberData.nextEvent}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
