import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Target,
  Zap,
  Heart,
  Briefcase,
  MessageCircle,
  PenTool,
  BarChart3,
  Video,
  Mail,
  IndianRupee,
} from "lucide-react"
import LogoCarousel from "@/components/logo-carousel"
import HeroVideo from "@/components/hero-video"

export default function HomePage() {
  const coFounders = [
    {
      name: "Raghav Sharma",
      imageSrc: "/images/rdp.png",
      intro:
        "I was once asked if I were a brand, what would be my tagline. I replied - 'Getting things done since 1992'. I derive some ungodly pleasure in building brands - the more unknown they are, the better. In the past, I scaled up Yoga Bar as a Brand & Product Lead to their eventual acquisition by ITC. And created branded content for MTV India (ever heard of MTV Hustle?). I have also worked as Brand Manager in Real Estate where I was selling luxury residential properties in Tata Housing.",
    },
    {
      name: "Meghna Kundu",
      imageSrc: "/images/mdp.png",
      intro:
        "Born to make weird art. Forced to sell soaps and shampoos to make a living. But since the world wants to force me to do things I don't want to, I try to infuse my weird art into everything I can as a sort of silent rebellion against conformation. When people point to something and say it's cool. I want to say I made that. Ex: Edelman, BBH, Pahadi Local.",
    },
  ]
  const features = [
    {
      icon: Heart,
      title: "Brand & Content Studio",
      description:
        "Build a brand people actually care about. From campaigns to content, we craft stories that stick and scale.",
    },
    {
      icon: Target,
      title: "AI Labs",
      description:
        "Don't just catch up with AI — leap ahead. Use AI to create smart, high-volume content without losing the human touch or budgets.",
    },
    {
      icon: Zap,
      title: "Venture Builder",
      description:
        "Have a great idea? Let's build it together. We go beyond marketing: helping you shape the product, test the market, and grow your business from scratch. We specialize in 0 to 1.",
    },
    {
      icon: IndianRupee,
      title: "Performance Marketing",
      description:
        "Stop burning budgets. Start driving results. We manage paid media across Google, Meta, Amazon, and more with one goal: ROI that makes sense.",
    },
  ]

  const services = [
    { title: "Content Strategy & Planning", icon: Briefcase },
    { title: "Brand Storytelling & Voice", icon: MessageCircle },
    { title: "Social Media Content", icon: PenTool },
    { title: "SEO-Optimized Writing", icon: BarChart3 },
    { title: "Video Content Creation", icon: Video },
    { title: "Email Marketing Campaigns", icon: Mail },
  ]

  const cards = [
    {
      title: "ITC RIGHT SHIFT",
      description:
        "We managed the launch of ITC's foray into Health Food segment by launching and scaling Right Shift.",
      imageSrc: "/images/ITC_Right_Shift_Logo.png", // Updated image path
      slug: "itc-right-shift",
    },
    {
      title: "FLIPKART",
      description:
        "We launched Flipkart's influencer affiliate program with a banger of a film. Shot & Edited in 72 hours!",
      imageSrc: "/images/Flipkart-Logo.wine.png",
      slug: "flipkart",
    },
    {
      title: "HDFC Sky",
      description: "Akshaya Tritiya Print Ad but make it sexy. Stuph: Hold my beer..",
      imageSrc:
        "https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/Hdfc%20sky%2Flogo%2015.png?alt=media&token=be92ada7-8222-4cf5-8761-6eec88ba9c8f",
      slug: "hdfc-sky",
    },
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-white pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full items-center">
            {/* Left side - Text Content */}
            <div className="flex flex-col justify-center space-y-8 animate-fade-in-left order-1 lg:order-1">
              <div>
                <h1 className="text-black text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  We make good
                  <span className="gradient-text"> Stuph</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Here for the brands that want to be remembered, not tolerated.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4"></div>
            </div>

            {/* Right side - Video */}
            <HeroVideo />
          </div>
        </div>
      </section>

      {/* New wrapper for the rest of the page */}
      <div className="bg-white">
        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">What we do</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We combine creativity with strategy to deliver content that not only looks great but drives real
                results.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`bg-white border-gray-200 hover-lift animate-fade-in-up animate-delay-${(index + 1) * 100}`}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 hover-scale">
                      {feature.icon && <feature.icon className="h-8 w-8 text-white" />}
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Logo Carousel */}
        <LogoCarousel />

        {/* Portfolio Teaser */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Recent Work</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Take a look at some of our recent projects and the results we've achieved for our clients.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cards.map((card, idx) => (
                <Link key={card.title} href={`/portfolio/${card.slug}`}>
                  <Card
                    className={`bg-white border-gray-200 overflow-hidden hover-lift animate-fade-in-up animate-delay-${(idx + 1) * 200} cursor-pointer transition-all duration-300 hover:shadow-lg`}
                  >
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
                      <Image
                        src={card.imageSrc || "/placeholder.svg"}
                        alt={`${card.title} logo`}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-black mb-2">{card.title}</h3>
                      <p className="text-gray-600 mb-4">{card.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12 animate-fade-in-up animate-delay-800">
              <Link href="/portfolio">
                <Button className="btn-primary group">
                  View Full Portfolio
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Co‑Founders Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Meet the Founders</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coFounders.map((founder, idx) => (
                <Card
                  key={idx}
                  className={`bg-white border-gray-200 hover-lift animate-fade-in-up animate-delay-${(idx + 1) * 100}`}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 overflow-hidden rounded-full">
                      <Image
                        src={founder.imageSrc || "/placeholder.svg"}
                        alt={founder.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-black">{founder.name}</h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">{founder.intro}</p>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Create Something Amazing?</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Let's collaborate to tell your story in a way that resonates with your audience and drives real results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 bg-transparent"
                  >
                    View Our Work
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
