"use client"

import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, GraduationCap, BookOpen } from "lucide-react"

const execBoard = [
    {
        id: 1,
        name: "Laura Saraiva Félix",
        position: "Internal President",
        bio: "Laura majors in Computer Science & Russian, and she leads WiC’s internal operations. Incoming SWE I at Duolingo.",
        imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQHUohEXCgoDKA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1682140583605?e=1761177600&v=beta&t=jbXEd-8BG0mgCooWPpE5966rgynjkNdUeFR3iHS979Q",
        email: "laurafelix2026@northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/laurasfelix28",
        year: "Senior",
        major: "Computer Science & Russian",
        displayOrder: 1,
    },
    {
        id: 2,
        name: "Irena Liu",
        position: "External President",
        bio: "Irena is a Computer Science major. Through Northwestern’s TIILT lab she researches technology-enhanced education and social entrepreneurship, and she loves exploring Chicago and playing volleyball. As External President she forges partnerships with companies and other organizations to support WiC members.",
        imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQHfCoiN1kawtw/profile-displayphoto-shrink_400_400/B56ZVpahaGGQAk-/0/1741230316073?e=1761177600&v=beta&t=zoalnPs9eMDi3f1rlvlEvSteKh6ABTf7KhsJiTnheg8",
        email: "irenaliu2026@northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/irena-liu",
        year: "Senior",
        major: "Computer Science & Business",
        displayOrder: 2,
    },
    {
        id: 3,
        name: "Grace He",
        position: "Treasurer",
        bio: "Grace studies Computer Science & Economics at Northwestern, overseeing WiC’s finances, ensuring fiscal responsibility for events and initiatives.",
        imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQEFaPkCvu-Leg/profile-displayphoto-shrink_400_400/B56ZSUHB8PHEAk-/0/1737651658858?e=1761177600&v=beta&t=_UqHeUwk6cSkFT8fJV4NVdnB21LcJCv5ySnms6TTmTc",
        email: "gracehe2027@northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/grace-he-915983225",
        year: "Junior",
        major: "Computer Science & Economics",
        displayOrder: 3,
    },
    {
        id: 4,
        name: "Natalie Hong",
        position: "Corporate Relations Chair",
        bio: "Natalie cultivates relationships with corporate partners and sponsors to provide networking and career-development opportunities for WiC members.",
        imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQEGi-uMT0EWdA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1712208767901?e=1761177600&v=beta&t=0EDNQWpUULVJDK9xNlNlanjI3A2RQ6KwwVTPbAMY-Ss",
        email: "nataliehong2027@northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/natalienhong",
        year: "Junior",
        major: "Computer Science & Economics",
        displayOrder: 4,
    },
    {
        id: 5,
        name: "Vivian Chen",
        position: "Programming Co-Chair",
        bio: "Vivian, a student at Northwestern majoring in Computer Science & Data Science, won a 2024 SBB Research Group Foundation STEM scholarship and interned at Amazon. She leverages her software engineering experience to coordinate hands-on technical workshops and hackathons for WiC.",
        imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQEfMbLtuAFx7w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1686712001071?e=1761177600&v=beta&t=FNy935nCfEcrkWlG80iAD0ceSgS9vx848PbZOy9dULw",
        email: "vivianchen2026@northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/vivianchen12",
        year: "Senior",
        major: "Computer Science & Data Science",
        displayOrder: 5,
    },
    {
        id: 6,
        name: "Nicole Lu",
        position: "Programming Co-Chair",
        bio: "Nicole is a third-year Computer Science major in the McCormick School. At Northwestern’s Design, Technology and Research (DTR) lab she explores how interactive systems can support learning and collaboration, and she enjoys rock climbing and binge-watching TV. She co-leads WiC’s technical events alongside Vivian.",
        imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQFJLjmkDkS9tw/profile-displayphoto-shrink_400_400/B56ZXseDgiHoAg-/0/1743429057074?e=1761177600&v=beta&t=xU6oVGwrjf-JI94K8TkiRo2BmaAcZ3h_-nz1Qnq_hII",
        email: "nicolelu2027@northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/nicole-lu-056306325/",
        year: "Junior",
        major: "Computer Science",
        displayOrder: 6,
    },
    {
        id: 7,
        name: "Sydney Hoppenworth",
        position: "Community Outreach Chair",
        bio: "Sydney is CS student plus the Segal Design Certificate. She is passionate about inclusive design and community-building. As Community Outreach Chair she expands WiC’s reach through service and social events.",
        imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQHXJ-wJpcG3Lw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1705731757219?e=1761177600&v=beta&t=vhHpItbhciMK0jvQ2GCO2AadlrEtXZ64fZlIg0DBmQI",
        email: "sydneyhoppenworth2026@northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/sydhopp",
        year: "Senior",
        major: "Computer Science + Design Certificate",
        displayOrder: 7,
    },
    {
        id: 8,
        name: "Sasha Boico",
        position: "Internal Relations Chair",
        bio: "Sasha is a junior majoring in Computer Science & Chinese, and she’s active in the business fraternity AKPsi. She has a passion for startups, technology and consulting. In her WiC role she focuses on fostering engagement and connection among members.",
        imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQE2wkw2TqCakA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1712726408299?e=1761177600&v=beta&t=aSfrFZUFp855DtSOJR8RtAflbb-FnrxOeaMErqtFW8M",
        email: "sashaboico2027@northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/alexandraboico/",
        year: "Junior",
        major: "Computer Science & Chinese",
        displayOrder: 8,
    },
    {
        id: 9,
        name: "Ziye Wang",
        position: "Public Relations Chair",
        bio: "Ziye is a junior pursuing a BA in Computer Science. A recipient of the Scholastic Gold Medal for Art and the Susan Phillips Award for music, she mentors with CovEducation and works as a photographer for Northwestern’s student newspaper. She’s also building her own app startup, and at WiC she handles marketing and promotion.",
        imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQGVAvxyk6F-lg/profile-displayphoto-shrink_400_400/B56ZVndJz2GUAg-/0/1741197451138?e=1761177600&v=beta&t=_p4znhBD2F31I-4KbxjGLHNifcFoITfuusqJS9KAYWc",
        email: "ziyewang2027@northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/ziye-wang-150a50251/",
        year: "Junior",
        major: "Computer Science",
        displayOrder: 9,
    },
    {
        id: 10,
        name: "Xiaolin Liu",
        position: "Historian",
        bio: "Xiaolin is a senior studying CS. As WiC’s historian she documents events and preserves the organization’s history through photos and archives.",
        imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQF6PWLpJBq81g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1722920980524?e=1761177600&v=beta&t=kwZch1_nella2WioqPQQ9j84Scaz-OiAAPcdsax-tsw",
        email: "xiaolinliu2026@northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/xiaolin-liu-a975231b8/",
        year: "Senior",
        major: "Computer Science",
        displayOrder: 10,
    },
    {
        id: 11,
        name: "Sofia Flores",
        position: "Membership Director",
        bio: "Sofia is a junior MechE major who oversees member recruitment and retention. She strives to create an inclusive environment for all WiC members.",
        imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQEPK44DEf9SBg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730265802616?e=1761177600&v=beta&t=HtxVsI4_x3gQWhVW3nOsD0atlzihBggGz0hMHMgKzeA",
        email: "sofiaflores2027@northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/sofia-flores-202704nu/",
        year: "Junior",
        major: "Mechanical Engineering",
        displayOrder: 11,
    },
];



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
          {execBoard.map((member) => {
            const MemberImage = () => {
              const [imgSrc, setImgSrc] = useState(member.imageUrl || "/placeholder.svg");
              const [hasError, setHasError] = useState(false);

              const handleError = () => {
                if (!hasError) {
                  setHasError(true);
                  setImgSrc("/placeholder.svg");
                }
              };

              return (
                <img
                  src={hasError ? "/placeholder.svg" : imgSrc}
                  alt={`${member.name} profile photo`}
                  width={200}
                  height={200}
                  className="rounded-full object-cover border-4 border-purple-100 w-[200px] h-[200px]"
                  onError={handleError}
                />
              );
            };

            return (
            <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <MemberImage />
                  </div>
                </div>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge className="bg-purple-100 text-purple-800 flex items-center justify-center text-center" variant="secondary">
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
            );
          })}
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
              Executive board positions become available each winter, and we encourage all members to consider applying.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-2xl mx-auto">
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
              <Button disabled size="lg">Exec Positions open Winter 2026!</Button>
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
                <Link href="mailto:wic@u.northwestern.edu">
                    <Button variant="outline">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Executive Board
                    </Button>
                </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
