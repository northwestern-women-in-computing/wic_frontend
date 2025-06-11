import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, GraduationCap, BookOpen } from "lucide-react"

// Mock exec board data - in real app, this would come from your database
const execBoard = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "President",
    bio: "Computer Science major passionate about increasing diversity in tech. Previously interned at Google and Microsoft, and loves organizing events that bring the community together.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    email: "sarah.johnson@northwestern.edu",
    linkedinUrl: "https://linkedin.com/in/sarahjohnson",
    year: "Senior",
    major: "Computer Science",
    displayOrder: 1,
  },
  {
    id: 2,
    name: "Emily Chen",
    position: "Vice President",
    bio: "Data Science enthusiast with experience in machine learning and AI. Advocates for women in STEM education and mentors underclassmen in technical skills.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    email: "emily.chen@northwestern.edu",
    linkedinUrl: "https://linkedin.com/in/emilychen",
    year: "Junior",
    major: "Data Science",
    displayOrder: 2,
  },
  {
    id: 3,
    name: "Maya Patel",
    position: "Secretary",
    bio: "Software engineering student with a focus on web development and user experience design. Passionate about creating inclusive digital experiences.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    email: "maya.patel@northwestern.edu",
    linkedinUrl: "https://linkedin.com/in/mayapatel",
    year: "Sophomore",
    major: "Computer Science",
    displayOrder: 3,
  },
  {
    id: 4,
    name: "Jessica Rodriguez",
    position: "Treasurer",
    bio: "Information Systems major with expertise in cybersecurity and financial technology. Manages our budget and ensures financial transparency.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    email: "jessica.rodriguez@northwestern.edu",
    linkedinUrl: "https://linkedin.com/in/jessicarodriguez",
    year: "Junior",
    major: "Information Systems",
    displayOrder: 4,
  },
  {
    id: 5,
    name: "Amanda Kim",
    position: "Events Coordinator",
    bio: "Computer Engineering student passionate about organizing tech talks and networking events. Loves connecting members with industry professionals and creating memorable experiences.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    email: "amanda.kim@northwestern.edu",
    linkedinUrl: "https://linkedin.com/in/amandakim",
    year: "Sophomore",
    major: "Computer Engineering",
    displayOrder: 5,
  },
  {
    id: 6,
    name: "Rachel Thompson",
    position: "Outreach Director",
    bio: "Biomedical Engineering major bridging the gap between technology and healthcare innovation. Focuses on community outreach and building partnerships with other organizations.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    email: "rachel.thompson@northwestern.edu",
    linkedinUrl: "https://linkedin.com/in/rachelthompson",
    year: "Senior",
    major: "Biomedical Engineering",
    displayOrder: 6,
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
              We're always looking for passionate individuals who want to make a difference in the tech community.
              Executive board positions become available each spring, and we encourage all members to consider applying.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="text-left">
                <h3 className="font-semibold mb-2">What We Look For:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Passion for supporting women in tech</li>
                  <li>• Leadership experience or potential</li>
                  <li>• Commitment to the organization's mission</li>
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
              We're always happy to hear from our members and the broader Northwestern community.
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
