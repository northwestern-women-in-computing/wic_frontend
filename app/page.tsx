import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Code, Lightbulb, Network } from "lucide-react"

export default function HomePage() {
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
              University.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
                  Join Our Community
                </Button>
              </Link>
              <Link href="/calendar">
                <Button size="lg" variant="outline" className="bg-white text-purple-700 hover:bg-purple-50">
                  View Events
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
              <div className="text-3xl font-bold text-purple-600">200+</div>
              <div className="mt-2 text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">50+</div>
              <div className="mt-2 text-sm text-muted-foreground">Events This Year</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">15+</div>
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
              Comprehensive support for women pursuing careers in technology
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
                  opportunities.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-16 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Upcoming Events</h2>
            <Link href="/calendar">
              <Button variant="outline">View All Events</Button>
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Feb 15</Badge>
                  <Badge>10 pts</Badge>
                </div>
                <CardTitle className="text-lg">Tech Talk: Women Leaders in AI</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join us for an inspiring talk with women leaders from top AI companies.
                </CardDescription>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  6:00 PM • Tech Building Room 101
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Feb 22</Badge>
                  <Badge>15 pts</Badge>
                </div>
                <CardTitle className="text-lg">Coding Workshop: Web Development</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Hands-on workshop covering HTML, CSS, and JavaScript fundamentals.</CardDescription>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  7:00 PM • Computer Lab A
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Mar 1</Badge>
                  <Badge>20 pts</Badge>
                </div>
                <CardTitle className="text-lg">Networking Night</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Connect with alumni and industry professionals over dinner.</CardDescription>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  6:30 PM • University Center
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-purple-600 px-6 py-16 text-center text-white sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight">Ready to Join Our Community?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-purple-100">
              Take the first step towards building your career in technology with the support of an amazing community.
            </p>
            <div className="mt-8">
              <Link href="/auth/signup">
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
