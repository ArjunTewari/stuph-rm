"use client" // Keep this if you plan to add client-side interactivity later, otherwise it can be removed for a purely static background video.

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Target, Sparkles, Zap, Heart } from "lucide-react"
// Removed: import ReactPlayer from "react-player/lazy"

export default function HomePage() {
  const coFounders = [
    {
      name: "Raghav Sharma",
      imageSrc: "/images/alice.jpg",
      intro:
        "I was once asked if I were a brand, what would be my tagline. I replied - 'Getting things done since 1992. I derive some ungodly pleasure in building brands - the more unknown they are, the better. Because that allows me to shape them exactly how they should be. Apart from Stuph, I run a Mental Fitness Startup - Whistl. In the past, I scaled up Yoga Bar as a Brand & Product Lead to their eventual acquisition by ITC. And created branded content for MTV India (ever heard of MTV Hustle?). I have also worked as Brand Manager in Real Estate where I was selling luxury residential properties in Tata Housing.",
    },
    {
      name: "Meghna Kundu",
      imageSrc: "/images/bob.jpg",
      intro:
        "Born to make weird art. Forced to sell soaps and shampoos to make a living. But since the world wants to force me to do things I don't want to. I try to infuse my weird art into everything I can as a sort of silent rebellion against conformation. When people point to something and say it's cool. I want to say I made that.Ex: Edelman, BBH, Pahadi Local.",
    },
  ]
  const features = [
    {
      icon: Sparkles,
      title: "Brand & Content Studio",
      description:
        "Build a brand people actually care about. From campaigns to content, we craft stories that stick and scale.",
    },
    {
      icon: Target,
      title: "AI Labs",
      description:
        "Don’t just catch up with AI — leap ahead. Use AI to create smart, high-volume content without losing the human touch or budgets.",
    },
    {
      icon: Zap,
      title: "Venture Builder",
      description:
        "Have a great idea? Let’s build it together. We go beyond marketing: helping you shape the product, test the market, and grow your business from scratch. We specialize in 0 to 1.",
    },
    {
      icon: Heart,
      title: "Performance Marketing",
      description:
        "Stop burning budgets. Start driving results. We manage paid media across Google, Meta, Amazon, and more with one goal: ROI that makes sense.",
    },
  ]

  const stats = [
    { number: "300+", label: "Projects Delivered" },
    { number: "120+", label: "Happy Clients" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "4.2x", label: "Average ROI" },
  ]

  const services = [
    "Content Strategy & Planning",
    "Brand Storytelling & Voice",
    "Social Media Content",
    "SEO-Optimized Writing",
    "Video Content Creation",
    "Email Marketing Campaigns",
  ]

  const cards = [
    {
      title: "ITC RIGHT SHIFT",
      description:
        "We managed the launch of ITC’s foray into Health Food segment by launching and scaling Right Shift.",
    },
    {
      title: "FLIPKART",
      description:
        "We launched Flipkart’s influencer affiliate program with a banger of a film. Shot & Edited in 72 hours!",
    },
    {
      title: "VOYAAH",
      description: "We took this luxury holiday brand from 500 followers to 50k followers in a year!",
    },
  ]

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden flex items-center justify-center">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-[-1]"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/video-poster.png" // Fallback image if video fails to load
          onError={(e) => console.error("Video load error:", e)}
        >
          <source
            src="https://qjutt1eqzqjulne5.public.blob.vercel-storage.com/stuph_showreel.mp4" // Using the Vercel Blob URL
            type="video/mp4"
          />
          Your browser does not support this video.
        </video>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              We make good
              <span className="gradient-text-white"> Stuph</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Here for the brands that want to be remembered, not tolerated.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary group">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 hover:border-white bg-transparent"
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">What we do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine creativity with strategy to deliver content that not only looks great but drives real results.
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

      {/* Stats Section */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center animate-scale-in animate-delay-${(index + 1) * 100}`}>
                <div className="text-4xl md:text-6xl font-bold mb-2 gradient-text">{stat.number}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the range of services we offer to help your brand thrive.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white border-gray-200 p-6 rounded-lg hover-lift animate-fade-in-up animate-delay-{(idx + 1) * 100}"
              >
                <p className="text-gray-600 leading-relaxed">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-Founders Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Meet the Co-Founders</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">The visionaries behind our brand and technology.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coFounders.map((founder, idx) => (
              <Card
                key={idx}
                className={`bg-white border-gray-200 hover-lift animate-fade-in-up animate-delay-${(idx + 1) * 100}`}
              >
                <div className="relative h-64">
                  <Image
                    src={founder.imageSrc || "/placeholder.svg"}
                    alt={founder.name}
                    fill
                    className="object-cover rounded-t-2xl"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-black mb-2">{founder.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{founder.intro}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
              <Card
                key={card.title}
                className={`bg-white border-gray-200 overflow-hidden hover-lift 
        animate-fade-in-up animate-delay-${(idx + 1) * 200}`}
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-black mb-2">{card.title}</h3>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                </CardContent>
              </Card>
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
  )
}
