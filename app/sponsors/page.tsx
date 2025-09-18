import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

// Mock sponsors data - in real app, this would come from your database
const sponsors = [
  {
    id: 1,
    name: "Microsoft",
    logoUrl: "/placeholder.svg?height=100&width=200",
    websiteUrl: "https://microsoft.com",
    tier: "Platinum",
    description: "Leading technology company supporting women in tech through mentorship and career opportunities.",
  },
  {
    id: 2,
    name: "Google",
    logoUrl: "/placeholder.svg?height=100&width=200",
    websiteUrl: "https://google.com",
    tier: "Platinum",
    description: "Empowering the next generation of women technologists through innovative programs and resources.",
  },
  {
    id: 3,
    name: "Meta",
    logoUrl: "/placeholder.svg?height=100&width=200",
    websiteUrl: "https://meta.com",
    tier: "Gold",
    description: "Building the future of social technology while fostering diversity and inclusion in engineering.",
  },
  {
    id: 4,
    name: "Apple",
    logoUrl: "/placeholder.svg?height=100&width=200",
    websiteUrl: "https://apple.com",
    tier: "Gold",
    description: "Creating innovative products while championing equality and opportunity for all.",
  },
  {
    id: 5,
    name: "Amazon",
    logoUrl: "/placeholder.svg?height=100&width=200",
    websiteUrl: "https://amazon.com",
    tier: "Silver",
    description: "Committed to building a diverse and inclusive workplace in technology and beyond.",
  },
  {
    id: 6,
    name: "Salesforce",
    logoUrl: "/placeholder.svg?height=100&width=200",
    websiteUrl: "https://salesforce.com",
    tier: "Silver",
    description: "Driving equality and empowerment for women in technology through various initiatives.",
  },
]

const tierColors = {
  Platinum: "bg-slate-100 text-slate-800 border-slate-300",
  Gold: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Silver: "bg-gray-100 text-gray-800 border-gray-300",
  Bronze: "bg-amber-100 text-amber-800 border-amber-300",
}

const tierOrder = ["Platinum", "Gold", "Silver", "Bronze"]

export default function SponsorsPage() {
  const sponsorsByTier = tierOrder.reduce(
    (acc, tier) => {
      acc[tier] = sponsors.filter((sponsor) => sponsor.tier === tier)
      return acc
    },
    {} as Record<string, typeof sponsors>,
  )

  return (
    <div className="min-h-screen bg-muted/50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Our Sponsors</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            We&apos;re grateful for the support of these amazing companies who share our mission of empowering women in
            technology.
          </p>
        </div>

        {/* Sponsor Tiers */}
        {tierOrder.map((tier) => {
          const tierSponsors = sponsorsByTier[tier]
          if (!tierSponsors || tierSponsors.length === 0) return null

          return (
            <div key={tier} className="mb-12">
              <div className="flex items-center justify-center mb-8">
                <Badge className={`${tierColors[tier as keyof typeof tierColors]} text-lg px-4 py-2`} variant="outline">
                  {tier} Sponsors
                </Badge>
              </div>

              <div
                className={`grid gap-6 ${
                  tier === "Platinum"
                    ? "grid-cols-1 md:grid-cols-2"
                    : tier === "Gold"
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {tierSponsors.map((sponsor) => (
                  <Card key={sponsor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center pb-4">
                      <div className="flex justify-center mb-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm border">
                          <Image
                            src={sponsor.logoUrl || "/placeholder.svg"}
                            alt={`${sponsor.name} logo`}
                            width={200}
                            height={100}
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <CardTitle className="text-xl">{sponsor.name}</CardTitle>
                      <Badge className={tierColors[sponsor.tier as keyof typeof tierColors]} variant="outline">
                        {sponsor.tier}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center mb-4">{sponsor.description}</CardDescription>
                      <div className="flex justify-center">
                        <Link href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="flex items-center space-x-2">
                            <span>Visit Website</span>
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}

        {/* Partnership Information */}
        <Card className="mt-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Partner With Us</CardTitle>
            <CardDescription>
              Join our mission to empower women in technology at Northwestern University
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-lg mb-2">Platinum Partnership</h3>
                <p className="text-sm text-muted-foreground">
                  Premium branding, exclusive events, and direct access to our top talent
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Gold Partnership</h3>
                <p className="text-sm text-muted-foreground">
                  Prominent visibility, networking opportunities, and recruitment access
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Silver Partnership</h3>
                <p className="text-sm text-muted-foreground">
                  Brand recognition, event participation, and community engagement
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Interested in supporting Northwestern Women in Computing? We offer various partnership opportunities to
                help your organization connect with talented women in technology.
              </p>
              <Button size="lg">Contact Us About Partnerships</Button>
            </div>
          </CardContent>
        </Card>

        {/* Impact Stats */}
        <Card className="mt-8">
          <CardHeader className="text-center">
            <CardTitle>Our Impact</CardTitle>
            <CardDescription>See how our sponsors help make a difference</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-600">200+</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-muted-foreground">Events Per Year</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">85%</div>
                <div className="text-sm text-muted-foreground">Job Placement Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">15+</div>
                <div className="text-sm text-muted-foreground">Industry Partners</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
