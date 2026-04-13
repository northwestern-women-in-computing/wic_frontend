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
        name: "Natalie Hong",
        position: "Internal President",
        bio: "Natalie is a junior majoring in Computer Science & Economics, and leads WiC’s internal operations.",
        imageUrl: "/natalie.png",
        email: "nataliehong2027@northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/natalienhong",
        year: "Junior",
        major: "Computer Science & Economics",
        displayOrder: 1,
    },
    {
        id: 2,
        name: "Sasha Boico",
        position: "External President",
        bio: "Sasha is a junior majoring in Computer Science & Chinese, and she’s active in the business fraternity AKPsi. She has a passion for startups, technology and consulting. In her WiC role she forges partnerships with companies and other organizations to support WiC members.",
        imageUrl: "/sasha.png",
        email: "sashaboico2027@northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/alexandraboico/",
        year: "Junior",
        major: "Computer Science & Chinese",
        displayOrder: 2,
    },
    {
        id: 3,
        name: "Grace He",
        position: "Treasurer",
        bio: "Grace studies Computer Science & Economics at Northwestern, overseeing WiC’s finances, ensuring fiscal responsibility for events and initiatives.",
        imageUrl: "/grace.jpeg",
        email: "gracehe2027@northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/grace-he-915983225",
        year: "Junior",
        major: "Computer Science & Economics",
        displayOrder: 3,
    },
    {
        id: 4,
        name: "Maria Bejjani",
        position: "Corporate Relations Chair",
        bio: "Maria cultivates relationships with corporate partners and sponsors to provide networking and career-development opportunities for WiC members.",
        imageUrl: "/maria.jpeg",
        email: "mariabejjani2027@u.northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/mariabejjani-/",
        year: "Junior",
        major: "Industrial Engineering",
        displayOrder: 4,
    },
    {
        id: 5,
        name: "Amie Masih",
        position: "Programming Co-Chair",
        bio: "Amie is a third-year studying Computer Science. She co-leads WiC’s technical events alongside Sophia.",
        imageUrl: "/amie.jpeg",
        email: "amiemasih2027@u.northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/amiemasih/",
        year: "Junior",
        major: "Computer Science",
        displayOrder: 5,
    },
    {
        id: 6,
        name: "Sophia Zeng",
        position: "Programming Co-Chair",
        bio: "Sophia is a second-year majoring in Computer Science. She co-leads WiC’s technical events alongside Amie.",
        imageUrl: "/sophia.jpeg",
        email: "sophiazeng2028@u.northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/nicole-lu-056306325/",
        year: "Sophomore",
        major: "Computer Science & Math",
        displayOrder: 6,
    },
    {
        id: 7,
        name: "Tais Martinez",
        position: "Community Outreach Chair",
        bio: "Tais is a sophomore studying Computer Science & Data Science. As Community Outreach Chair she expands WiC’s reach through service and social events.",
        imageUrl: "/tais.jpeg",
        email: "taismartinez2028.1@u.northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/taismartinez/",
        year: "Sophomore",
        major: "CS & Data Science",
        displayOrder: 7,
    },
    {
        id: 8,
        name: "Ester Borges Frickes Ricardo",
        position: "Internal Relations Chair",
        bio: "Ester is a freshman majoring in Computer Science & Learning Sciences. In her WiC role she focuses on fostering engagement and connection among members.",
        imageUrl: "/ester.png",
        email: "esterborgesfrickesricardo2029@u.northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/ester-borges-frickes/",
        year: "Freshman",
        major: "CS & Learning Sciences",
        displayOrder: 8,
    },
    {
        id: 9,
        name: "Rio Nagai",
        position: "Public Relations Chair",
        bio: "Rio handles marketing and promotion.",
        imageUrl: "/rio.jpeg",
        email: "rionagai2029@u.northwestern.edu",
        //linkedinUrl: "https://www.linkedin.com/in/ziye-wang-150a50251/",
        year: "Freshman",
        major: "Data Science",
        displayOrder: 9,
    },
    {
        id: 10,
        name: "Chloe Lu",
        position: "Historian",
        bio: "Chloe is a junior studying CS. As WiC’s historian she documents events and preserves the organization’s history through photos and archives.",
        imageUrl: "/chloe.jpeg",
        email: "chloelu@northwestern.edu",
        linkedinUrl: "https://www.linkedin.com/in/chloelu05/",
        year: "Junior",
        major: "Computer Science",
        displayOrder: 10,
    },
    {
        id: 11,
        name: "Maha Somji",
        position: "Membership Director",
        bio: "Maha oversees member recruitment and retention. She strives to create an inclusive environment for all WiC members.",
        imageUrl: "/maha.png",
        email: "mahnumsomji2028@u.northwestern.edu",
        //linkedinUrl: "https://www.linkedin.com/in/sofia-flores-202704nu/",
        year: "Sophomore",
        major: "Computer Science",
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
                {member.linkedinUrl && (
                  <Link href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn</span>
                    </Button>
                  </Link>
                )}
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
              <Button disabled size="lg">Exec Positions open Winter 2027!</Button>
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
