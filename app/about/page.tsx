import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Heart, Lightbulb, Target } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Passion-Driven",
      description:
        "We're genuinely passionate about storytelling and helping brands connect with their audiences in meaningful ways.",
    },
    {
      icon: Lightbulb,
      title: "Creative Innovation",
      description:
        "We constantly push creative boundaries to deliver fresh, innovative content that stands out in the digital landscape.",
    },
    {
      icon: Target,
      title: "Results-Focused",
      description: "Every strategy we develop is designed with clear objectives and measurable outcomes in mind.",
    },
    {
      icon: Users,
      title: "Collaborative Spirit",
      description: "We believe the best work comes from true collaboration between our team and our clients.",
    },
  ]

  const team = [
    {
      name: "Raghav Sharma",
      role: "Creative Director & Founder",
      description: "Former agency creative with 12+ years of experience in brand storytelling and content strategy.",
      image: "/images/rdp.png", // Updated image path
    },
    {
      name: "Meghna Kundu",
      role: "Strategy Lead",
      description: "Data-driven strategist specializing in content performance optimization and audience insights.",
      image: "/images/mdp.png", // Updated image path
    },
    {
      name: "Jordan Kim",
      role: "Content Manager",
      description: "Multi-platform content creator with expertise in video production and social media storytelling.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Sam Taylor",
      role: "Brand Strategist",
      description:
        "Brand voice specialist helping companies develop authentic, consistent messaging across all channels.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const milestones = [
    { year: "2019", event: "stuph studio founded with a vision to revolutionize content marketing" },
    { year: "2020", event: "Reached 50 successful projects and established our signature storytelling approach" },
    { year: "2021", event: "Expanded team and launched video content services" },
    { year: "2022", event: "Achieved 100+ client milestone and 98% satisfaction rate" },
    { year: "2023", event: "Launched strategic partnerships and international client base" },
    { year: "2024", event: "Celebrating 300+ projects and continued innovation in content marketing" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
                We Are
                <br />
                <span className="gradient-text">stuph studio</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                A passionate team of creatives, strategists, and storytellers dedicated to helping brands connect with
                their audiences through compelling content marketing.
              </p>
            </div>
            <div className="animate-fade-in-right">
              <div className="relative">
                {/* Background design elements */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <Image src="/images/design-elements.png" alt="" fill className="object-cover object-center" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-gray-500/10 rounded-3xl transform -rotate-3"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover-lift">
                  <div className="flex items-center justify-center h-64">
                    <div className="relative w-32 h-32">
                      <Image src="/images/stuph-logo.png" alt="stuph studio" fill className="object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-left relative">
              {/* Background design elements */}
              <div className="absolute -top-20 -left-20 w-40 h-40 opacity-3 pointer-events-none">
                <Image src="/images/design-elements.png" alt="" fill className="object-cover object-top-left" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-8 relative z-10">Our Story</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed relative z-10">
                <p>
                  stuph studio was born from a simple belief: every brand has a unique story worth telling. Founded in
                  2019, we started as a small team of creatives who were frustrated with the cookie-cutter approach to
                  content marketing.
                </p>
                <p>
                  We saw brands struggling to connect authentically with their audiences, drowning in a sea of generic
                  content. That's when we decided to do things differently – to focus on the 'stuff' that really
                  matters: genuine storytelling, strategic thinking, and measurable results.
                </p>
                <p>
                  Today, we've helped over 120 brands find their voice and tell their stories in ways that resonate,
                  engage, and drive real business growth. Our approach combines creative excellence with data-driven
                  strategy, ensuring every piece of content serves a purpose.
                </p>
              </div>
            </div>
            <div className="animate-fade-in-right">
              <div className="bg-gray-50 p-8 rounded-3xl hover-lift">
                <h3 className="text-2xl font-bold text-black mb-6">Our Mission</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  To help brands create authentic connections with their audiences through strategic, creative content
                  that drives meaningful engagement and measurable business results.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">300+</div>
                    <div className="text-sm text-gray-600">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">120+</div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">98%</div>
                    <div className="text-sm text-gray-600">Satisfaction Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-2">5</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and define how we collaborate with our clients and partners.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className={`bg-white border-gray-200 hover-lift animate-fade-in-up animate-delay-${(index + 1) * 100}`}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 hover-scale">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600">
              Key milestones that have shaped stuph studio into what we are today.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-start animate-fade-in-left animate-delay-${(index + 1) * 100}`}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg hover-scale">
                    {milestone.year}
                  </div>
                  <div className="ml-8 bg-gray-50 p-6 rounded-2xl hover-lift flex-1">
                    <p className="text-gray-700 leading-relaxed">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The creative minds and strategic thinkers behind stuph studio's success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className={`bg-white border-gray-200 overflow-hidden hover-lift animate-fade-in-up animate-delay-${(index + 1) * 100}`}
              >
                <div className="w-full aspect-square relative">
                  {" "}
                  {/* Changed to w-full aspect-square for responsive container */}
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto overflow-hidden rounded-full relative">
                    {" "}
                    {/* Added relative to this div */}
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-black mb-2">{member.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 font-medium">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Want to Work With Us?</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We're always excited to collaborate with brands that are ready to tell their story in a meaningful way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center"
              >
                Let's Talk
              </a>
              <a
                href="/portfolio"
                className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 inline-flex items-center justify-center"
              >
                See Our Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
