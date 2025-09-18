import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

// Mock sponsors data - in real app, this would come from your database
const sponsors =
    [
        {
            id: 1,
            name: "Google",
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            websiteUrl: "https://google.com",
            tier: "Silver",
            description: "Multinational technology company.",
        },
        {
            id: 2,
            name: "Accenture",
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/326px-Accenture.svg.png?20241209170218",
            websiteUrl: "https://accenture.com",
            tier: "Silver",
            description: "Leading technology consulting company.",
        },
        {
            id: 3,
            name: "IMC",
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/IMC_Logo.svg/356px-IMC_Logo.svg.png?20190413011724",
            websiteUrl: "https://imc.com",
            tier: "Silver",
            description: "Global market maker.",
        },
        {
            id: 4,
            name: "CDW",
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/CDW_Logo.svg/1599px-CDW_Logo.svg.png?20161105232554",
            websiteUrl: "https://cdw.com",
            tier: "Silver",
            description: "Technology solutions provider.",
        },
        {
            id: 5,
            name: "Jane Street",
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Jane_Street_Capital_Logo.svg/208px-Jane_Street_Capital_Logo.svg.png?20190402162020",
            websiteUrl: "https://janestreet.com",
            tier: "Bronze",
            description: "Quantitative trading firm.",
        },
        {
            id: 6,
            name: "DE Shaw & Co",
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/D._E._Shaw_%26_Co._Logo.svg/1024px-D._E._Shaw_%26_Co._Logo.svg.png?20240819123328",
            websiteUrl: "https://deshaw.com",
            tier: "Bronze",
            description: "Investment and technology development firm.",
        },
        {
            id: 7,
            name: "Duolingo",
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Duolingo_logo_%282019%29.svg",
            websiteUrl: "https://duolingo.com",
            tier: "Bronze",
            description: "Powering people all over the world with language learning and education services.",
        }
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
                  tier === "Silver"
                    ? "grid-cols-1 md:grid-cols-2"
                    : tier === "Bronze"
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
                      <Badge className={`${tierColors[sponsor.tier as keyof typeof tierColors]} flex items-center justify-center`}
                             variant="outline">
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
                <h3 className="font-semibold text-lg mb-2">Gold Partnership</h3>
                <p className="text-sm text-muted-foreground">
                  Premium branding, exclusive events, and direct access to our top talent
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Silver Partnership</h3>
                <p className="text-sm text-muted-foreground">
                  Prominent visibility, networking opportunities, and recruitment access
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Bronze Partnership</h3>
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
                <Button size="lg">
                    <Link href="https://bpb-us-e1.wpmucdn.com/sites.northwestern.edu/dist/7/6119/files/2025/05/Northwestern_Women_in_Computing_Sponsorship_Package.pdf">Contact Us About Partnerships</Link>
                </Button>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-center">
              <div>
                <div className="text-3xl font-bold text-purple-600">100+</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">30+</div>
                <div className="text-sm text-muted-foreground">Events Per Year</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">5+</div>
                <div className="text-sm text-muted-foreground">Industry Partners</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
