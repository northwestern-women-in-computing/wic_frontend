import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, GraduationCap, BookOpen } from "lucide-react"

// Mock exec board data - in real app, this would come from your database
const execBoard = [{
        id: 1,
        name: "Laura Felix",
        position: "Internal President",
        bio: "Computer Science major passionate about increasing diversity in tech and fostering internal community growth within Northwestern WiC.",
        imageUrl: "/placeholder.svg?height=300&width=300",
        email: "laurafelix2026@northwestern.edu",
        linkedinUrl: "https://linkedin.com/in/laurafelix",
        year: "Senior",
        major: "Computer Science",
        displayOrder: 1,
    },
    {
        id: 2,
        name: "Irena Liu",
        position: "External President",
        bio: "Data Science enthusiast focused on building external partnerships and representing Northwestern WiC in the broader tech community.",
        imageUrl: "/placeholder.svg?height=300&width=300",
        email: "irenaliu2026@northwestern.edu",
        linkedinUrl: "https://linkedin.com/in/irenaliu",
        year: "Senior",
        major: "Computer Science",
        displayOrder: 2,
    },
    {
        id: 3,
        name: "Grace He",
        position: "Treasurer",
        bio: "Computer Science student with expertise in financial management and ensuring fiscal responsibility for all Northwestern WiC activities.",
        imageUrl: "/placeholder.svg?height=300&width=300",
        email: "gracehe2027@northwestern.edu",
        linkedinUrl: "https://linkedin.com/in/gracehe",
        year: "Junior",
        major: "Computer Science",
        displayOrder: 3,
    },
    {
        id: 4,
        name: "Natalie Hong",
        position: "Corporate Relations Chair",
        bio: "Information Systems major specializing in building and maintaining relationships with corporate partners and sponsors.",
        imageUrl: "/placeholder.svg?height=300&width=300",
        email: "nataliehong2027@northwestern.edu",
        linkedinUrl: "https://linkedin.com/in/nataliehong",
        year: "Junior",
        major: "Computer Science",
        displayOrder: 4,
    },
    {
        id: 5,
        name: "Vivian Chen",
        position: "Programming Co-Chair",
        bio: "Computer Engineering student passionate about organizing technical workshops and educational programming for our members.",
        imageUrl: "/placeholder.svg?height=300&width=300",
        email: "vivian.chen@northwestern.edu",
        linkedinUrl: "https://linkedin.com/in/vivianchen",
        year: "Senior",
        major: "Computer Science",
        displayOrder: 5,
    },
    {
        id: 6,
        name: "Nicole Lu",
        position: "Programming Co-Chair",
        bio: "Computer Science major focused on creating engaging technical content and hands-on learning experiences for Northwestern WiC members.",
        imageUrl: "/placeholder.svg?height=300&width=300",
        email: "nicole.lu@northwestern.edu",
        linkedinUrl: "https://linkedin.com/in/nicolelu",
        year: "Junior",
        major: "Computer Science",
        displayOrder: 6,
    },
    {
        id: 7,
        name: "Sydney Hoppenworth",
        position: "Community Outreach Chair",
        bio: "Biomedical Engineering major dedicated to expanding Northwestern WiC's reach and building connections with the broader community.",
        imageUrl: "/placeholder.svg?height=300&width=300",
        email: "sydney.hoppenworth@northwestern.edu",
        linkedinUrl: "https://linkedin.com/in/sydneyhoppenworth",
        year: "Senior",
        major: "Biomedical Engineering",
        displayOrder: 7,
    },
    {
        id: 8,
        name: "Sasha Boico",
        position: "Internal Relations Chair",
        bio: "Computer Science student focused on strengthening relationships within our organization and fostering member engagement.",
        imageUrl: "/placeholder.svg?height=300&width=300",
        email: "sasha.boico@northwestern.edu",
        linkedinUrl: "https://linkedin.com/in/sashaboico",
        year: "Junior",
        major: "Computer Science",
        displayOrder: 8,
    },
    {
        id: 9,
        name: "Ziye Wang",
        position: "Public Relations Chair",
        bio: "Information Systems major specializing in marketing, communications, and promoting Northwestern WiC's mission and events.",
        imageUrl: "/placeholder.svg?height=300&width=300",
        email: "ziye.wang@northwestern.edu",
        linkedinUrl: "https://linkedin.com/in/ziyewang",
        year: "Junior",
        major: "Information Systems",
        displayOrder: 9,
    },
    {
        id: 10,
        name: "Xiaolin Liu",
        position: "Historian",
        bio: "Computer Engineering student responsible for documenting and preserving the history and memories of Northwestern WiC events and achievements.",
        imageUrl: "/placeholder.svg?height=300&width=300",
        email: "xiaolin.liu@northwestern.edu",
        linkedinUrl: "https://linkedin.com/in/xiaolinliu",
        year: "Sophomore",
        major: "Computer Engineering",
        displayOrder: 10,
    },
    {
        id: 11,
        name: "Sofia Flores",
        position: "Membership Director",
        bio: "Data Science major focused on member recruitment, retention, and ensuring an inclusive experience for all Northwestern WiC members.",
        imageUrl: "/placeholder.svg?height=300&width=300",
        email: "sofia.flores@northwestern.edu",
        linkedinUrl: "https://linkedin.com/in/sofiaflores",
        year: "Junior",
        major: "Data Science",
        displayOrder: 11,
    },
    ]


export default function ExecBoardPage() {
  return (
    <div className="min-h-screen bg-muted/50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Executive Board</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Meet the dedicated leaders who make Northwestern Women in Computing possible. Our executive board works
            tirelessly to create opportunities and build community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {execBoard.map((member) => (
            <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Image
                      src={member.imageUrl || "/placeholder.svg"}
                      alt={`${member.name} profile photo`}
                      width={200}
                      height={200}
                      className="rounded-full object-cover border-4 border-purple-100"
                    />
                  </div>
                </div>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <Badge className="bg-purple-100 text-purple-800" variant="secondary">
                  {member.position}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <GraduationCap className="h-4 w-4" />
                    <span>{member.year}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{member.major}</span>
                  </div>
                </div>

                <CardDescription className="text-center">{member.bio}</CardDescription>

                <div className="flex justify-center space-x-2">
                  <Link href={`mailto:${member.email}`}>
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </Button>
                  </Link>
                  <Link href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Join the Team Section */}
        <Card className="mt-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Join Our Team</CardTitle>
            <CardDescription>Interested in becoming part of the Northwestern WiC executive board?</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We&apos;re always looking for passionate individuals who want to make a difference in the tech community.
              Executive board positions become available each spring, and we encourage all members to consider applying.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="text-left">
                <h3 className="font-semibold mb-2">What We Look For:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Passion for supporting women in tech</li>
                  <li>• Leadership experience or potential</li>
                  <li>• Commitment to the organization&apos;s mission</li>
                  <li>• Strong communication skills</li>
                  <li>• Collaborative mindset</li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-2">Benefits of Joining:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Develop leadership skills</li>
                  <li>• Build your professional network</li>
                  <li>• Make a meaningful impact</li>
                  <li>• Gain event planning experience</li>
                  <li>• Enhance your resume</li>
                </ul>
              </div>
            </div>
            <div className="pt-4">
              <Button size="lg">Learn About Open Positions</Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="mt-8">
          <CardHeader className="text-center">
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>Have questions or want to connect with our executive board?</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              We&apos;re always happy to hear from our members and the broader Northwestern community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Contact Executive Board
              </Button>
              <Button variant="outline">Schedule Office Hours</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
