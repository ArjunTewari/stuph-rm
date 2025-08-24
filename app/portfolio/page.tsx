import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Eye, Heart, Target } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { caseStudies } from "@/lib/case-studies"

export default function PortfolioPage() {
  const categories = [
    "All Projects",
    "Brand Storytelling",
    "B2B SaaS",
    "Food & Beverage",
    "Health & Fitness",
    "Architecture & Design",
    "Education Technology",
  ]

  const testimonials = [
    {
      quote:
        "stuph studio didn't just create content for us – they helped us discover our authentic brand voice. The results have been transformational.",
      author: "Sarah Chen",
      role: "Founder, EcoVibe Lifestyle",
      avatar: "/placeholder-user.jpg",
    },
    {
      quote:
        "The strategic approach and creative execution from stuph studio exceeded all our expectations. Our engagement rates have never been higher.",
      author: "Marcus Rodriguez",
      role: "CMO, TechFlow Solutions",
      avatar: "/placeholder-user.jpg",
    },
    {
      quote:
        "Working with stuph studio was like having a creative partner who truly understood our vision. They brought our story to life beautifully.",
      author: "Emma Thompson",
      role: "Creative Director, Urban Design Studio",
      avatar: "/placeholder-user.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background design elements */}
        <div className="absolute top-10 right-10 w-64 h-64 opacity-4 pointer-events-none">
          <Image src="/images/design-elements.png" alt="" fill className="object-cover object-top-right" />
        </div>
        <div className="absolute bottom-10 left-10 w-48 h-48 opacity-4 pointer-events-none">
          <Image src="/images/design-elements.png" alt="" fill className="object-cover object-bottom-left" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Our <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore our recent work and discover how we've helped brands tell their stories, engage their audiences,
              and achieve remarkable results.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant="outline"
                className="rounded-full px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition-all duration-300 bg-transparent"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((project, index) => (
              <Card
                key={project.slug}
                className={`bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group animate-fade-in-up animate-delay-${(index + 1) * 100}`}
              >
                <Link href={`/portfolio/${project.slug}`} className="block" scroll={true}>
                  <div className="aspect-w-4 aspect-h-3 bg-gray-100 relative">
                    <Image
                      src={project.mainImage || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    {/* Logo above title - enlarged */}
                    {project.logoImage && (
                      <div className="flex justify-center mb-4">
                        <div className="relative w-32 h-16">
                          <Image
                            src={project.logoImage || "/placeholder.svg"}
                            alt={`${project.title} logo`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-black mb-2 text-center">{project.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.brief}</p>
                    <p className="text-pink-500 font-semibold text-sm mb-6">{project.category}</p>
                    <div className="text-center">
                      <span className="inline-block text-sm font-semibold text-purple-600 border border-purple-300 rounded-full px-6 py-2 transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white">
                        View case study
                      </span>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background design elements */}
        <div className="absolute inset-0 opacity-2 pointer-events-none">
          <Image src="/images/design-elements.png" alt="" fill className="object-cover object-center" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Client Love</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it – hear what our clients have to say about working with stuph studio.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`bg-white border-gray-200 hover-lift animate-fade-in-up animate-delay-${(index + 1) * 200}`}
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="flex text-black mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Heart key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 leading-relaxed italic">"{testimonial.quote}"</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mr-4 flex items-center justify-center">
                      <Users className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-black">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Create Your Success Story?</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Let's collaborate to create content that not only looks amazing but drives real, measurable results for
              your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                Start Your Project
                <Target className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 bg-transparent"
              >
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
