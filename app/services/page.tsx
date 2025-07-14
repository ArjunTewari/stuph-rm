import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  ArrowRight,
  PenTool,
  Search,
  Share2,
  Mail,
  Video,
  BookOpen,
  Sparkles,
  Target,
  Users,
} from "lucide-react"
import Image from "next/image"

export default function ServicesPage() {
  const services = [
    {
      icon: BookOpen,
      title: "Content Strategy & Planning",
      description:
        "Comprehensive content strategies that align with your brand goals and resonate with your target audience.",
      features: [
        "Brand voice & tone development",
        "Content audit & competitive analysis",
        "Editorial calendar creation",
        "Performance metrics & KPI setup",
        "Content governance guidelines",
      ],
      price: "Starting at $3,000/month",
      popular: false,
    },
    {
      icon: PenTool,
      title: "Brand Storytelling & Voice",
      description:
        "Authentic brand narratives that connect emotionally with your audience and differentiate your brand.",
      features: [
        "Brand story development",
        "Voice & messaging framework",
        "Narrative architecture",
        "Storytelling workshops",
        "Brand guidelines creation",
      ],
      price: "Starting at $4,500/project",
      popular: true,
    },
    {
      icon: Search,
      title: "SEO Content Writing",
      description: "Search-optimized content that ranks well and provides genuine value to your audience.",
      features: [
        "Keyword research & strategy",
        "Long-form blog content",
        "Landing page optimization",
        "Technical SEO implementation",
        "Content performance tracking",
      ],
      price: "Starting at $200/article",
      popular: false,
    },
    {
      icon: Share2,
      title: "Social Media Content",
      description: "Engaging social content that builds community and drives meaningful interactions with your brand.",
      features: [
        "Platform-specific content creation",
        "Social media strategy",
        "Community management",
        "Influencer collaboration",
        "Social advertising content",
      ],
      price: "Starting at $2,000/month",
      popular: false,
    },
    {
      icon: Video,
      title: "Video Content Creation",
      description: "Compelling video content that tells your story and engages audiences across all platforms.",
      features: [
        "Concept development & scripting",
        "Video production & editing",
        "Motion graphics & animation",
        "Platform optimization",
        "Video series development",
      ],
      price: "Starting at $1,800/video",
      popular: false,
    },
    {
      icon: Mail,
      title: "Email Marketing Campaigns",
      description: "Strategic email campaigns that nurture relationships and drive conversions through storytelling.",
      features: [
        "Email strategy & segmentation",
        "Campaign design & copywriting",
        "Automation setup",
        "A/B testing & optimization",
        "Performance analytics",
      ],
      price: "Starting at $1,200/month",
      popular: false,
    },
  ]

  const process = [
    {
      step: "01",
      title: "Discovery & Research",
      description:
        "We dive deep into your brand, audience, and goals to understand what makes your story unique and compelling.",
      icon: Target,
    },
    {
      step: "02",
      title: "Strategy Development",
      description:
        "We create a comprehensive content strategy that aligns with your business objectives and resonates with your audience.",
      icon: Sparkles,
    },
    {
      step: "03",
      title: "Content Creation",
      description:
        "Our team brings your story to life through high-quality, engaging content across all chosen channels and formats.",
      icon: PenTool,
    },
    {
      step: "04",
      title: "Optimization & Growth",
      description:
        "We continuously monitor performance and optimize content based on data insights to maximize your ROI.",
      icon: Users,
    },
  ]

  const packages = [
    {
      name: "Starter",
      description: "Perfect for small businesses ready to establish their content presence",
      price: "$2,500",
      period: "/month",
      features: [
        "Content strategy development",
        "4 blog posts per month",
        "Social media content (2 platforms)",
        "Monthly performance reports",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Growth",
      description: "Ideal for growing companies looking to scale their content marketing",
      price: "$5,000",
      period: "/month",
      features: [
        "Comprehensive content strategy",
        "8 blog posts per month",
        "Social media management (4 platforms)",
        "Email marketing campaigns",
        "Video content (2 per month)",
        "Bi-weekly strategy calls",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For established brands requiring full-scale content marketing solutions",
      price: "Custom",
      period: "",
      features: [
        "Full content marketing strategy",
        "Unlimited content creation",
        "Multi-channel campaign management",
        "Dedicated account manager",
        "Custom integrations",
        "Weekly strategy sessions",
        "24/7 priority support",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background design elements */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-3 pointer-events-none">
          <Image src="/images/design-elements.png" alt="" fill className="object-cover object-top-right" />
        </div>
        <div className="absolute bottom-0 left-0 w-80 h-80 opacity-3 pointer-events-none">
          <Image src="/images/design-elements.png" alt="" fill className="object-cover object-bottom-left" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive content marketing solutions designed to tell your story, engage your audience, and drive
              meaningful business results.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`relative bg-white border-gray-200 hover-lift h-full animate-fade-in-up animate-delay-${(index + 1) * 100} ${
                  service.popular ? "ring-2 ring-black" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-4 hover-scale">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-black">{service.title}</CardTitle>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6 flex-1">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-black mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-2xl font-bold text-black mb-4">{service.price}</p>
                    <Button className="w-full btn-primary group">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background design elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-2 pointer-events-none">
          <Image src="/images/design-elements.png" alt="" fill className="object-cover object-center" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures every project delivers exceptional results and exceeds expectations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className={`text-center animate-fade-in-up animate-delay-${(index + 1) * 100}`}>
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-black text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4 hover-scale">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto -mt-6 shadow-lg">
                    <item.icon className="h-6 w-6 text-black" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-black mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Choose Your Package</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible pricing options designed to grow with your business and content marketing needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative hover-lift animate-fade-in-up animate-delay-${(index + 1) * 200} ${
                  pkg.popular ? "bg-black text-white border-black scale-105" : "bg-white border-gray-200"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">Recommended</span>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className={`text-2xl font-bold mb-2 ${pkg.popular ? "text-white" : "text-black"}`}>
                    {pkg.name}
                  </CardTitle>
                  <p className={`mb-6 ${pkg.popular ? "text-gray-300" : "text-gray-600"}`}>{pkg.description}</p>
                  <div className="mb-6">
                    <span className={`text-5xl font-bold ${pkg.popular ? "text-white" : "text-black"}`}>
                      {pkg.price}
                    </span>
                    <span className={`text-lg ${pkg.popular ? "text-gray-300" : "text-gray-600"}`}>{pkg.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle
                          className={`h-4 w-4 mr-3 mt-0.5 flex-shrink-0 ${pkg.popular ? "text-white" : "text-black"}`}
                        />
                        <span className={`text-sm leading-relaxed ${pkg.popular ? "text-gray-300" : "text-gray-600"}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full group ${pkg.popular ? "bg-white text-black hover:bg-gray-100" : "btn-primary"}`}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Let's discuss which services are right for your brand and create a custom strategy that drives results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-semibold transition-all duration-300"
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
