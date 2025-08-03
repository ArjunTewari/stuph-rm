"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Calendar, Coffee } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
    newsletter: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", formData)
    alert("Thank you for reaching out! We'll get back to you within 24 hours.")
    setIsSubmitting(false)

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      website: "",
      service: "",
      budget: "",
      timeline: "",
      message: "",
      newsletter: false,
    })
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: MessageCircle,
      title: "Let's Chat",
      details: "raghav@stuph.co",
      description: "Drop us a line anytime",
      color: "from-blue-100 to-blue-200",
    },
    {
      icon: Phone,
      title: "Give Us a Call",
      details: "+91 7600920359",
      description: "Mon-Fri, 9am-6pm EST",
      color: "from-green-100 to-green-200",
    },
    {
      icon: MapPin,
      title: "Visit Our Studio",
      details: "Bangalore, India",
      description: "Coffee meetings welcome",
      color: "from-purple-100 to-purple-200",
    },
    {
      icon: Clock,
      title: "Quick Response",
      details: "Within 24 hours",
      description: "We're pretty speedy",
      color: "from-orange-100 to-orange-200",
    },
  ]

  const faqs = [
    {
      question: "How quickly can we get started?",
      answer:
        "We typically kick off new projects within 1-2 weeks of signing. For urgent projects, we can often start sooner – just let us know your timeline!",
    },
    {
      question: "Do you work with our industry?",
      answer:
        "We've worked across many industries – from tech startups to established brands. Our approach adapts to your unique audience and market, regardless of sector.",
    },
    {
      question: "What's included in your content strategy?",
      answer:
        "Our strategy includes brand voice development, audience research, competitive analysis, content planning, editorial calendars, and performance metrics setup.",
    },
    {
      question: "How do you measure success?",
      answer:
        "We track metrics that matter to your business – engagement rates, lead generation, brand awareness, website traffic, and ultimately, ROI. We provide detailed monthly reports with actionable insights.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background design elements */}
        <div className="absolute top-0 left-0 w-72 h-72 opacity-3 pointer-events-none">
          <Image src="/images/design-elements.png" alt="" fill className="object-cover object-top-left" />
        </div>
        <div className="absolute bottom-0 right-0 w-80 h-80 opacity-3 pointer-events-none">
          <Image src="/images/design-elements.png" alt="" fill className="object-cover object-bottom-right" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
                Let's Create
                <br />
                <span className="gradient-text">Something Amazing</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Ready to tell your story in a way that truly connects? We'd love to hear about your project and explore
                how we can help bring your vision to life.
              </p>
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image src="/images/stuph-logo.png" alt="stuph studio" fill className="object-contain" />
                </div>
                <div>
                  <p className="font-semibold text-black">stuph studio</p>
                  <p className="text-gray-600">Creative Content Marketing</p>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-right">
              <div className="relative">
                {/* Background design elements */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <Image src="/images/design-elements.png" alt="" fill className="object-cover object-center" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-gray-500/5 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover-lift">
                  <div className="grid grid-cols-2 gap-4">
                    {contactInfo.map((info, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-2xl bg-gradient-to-br ${info.color} text-center hover-scale`}
                      >
                        <info.icon className="h-8 w-8 text-black mx-auto mb-2" />
                        <p className="font-semibold text-black text-sm">{info.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${info.color} border-0 text-center hover-lift animate-fade-in-up animate-delay-${(index + 1) * 100}`}
              >
                <CardContent className="p-8">
                  <info.icon className="h-12 w-12 text-black mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-black mb-2">{info.title}</h3>
                  <p className="text-black font-medium mb-1">{info.details}</p>
                  <p className="text-gray-700 text-sm">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white border-gray-200 shadow-2xl hover-lift animate-fade-in-up">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-4xl font-bold text-black mb-4">Start Your Project</CardTitle>
              <p className="text-gray-600 leading-relaxed">
                Tell us about your vision, and we'll craft a custom proposal that brings your story to life. Every great
                project starts with a conversation.
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-fade-in-up animate-delay-100">
                    <Label htmlFor="firstName" className="text-black font-medium mb-2 block">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="border-gray-300 focus:border-black focus:ring-black rounded-xl transition-all duration-300"
                      placeholder="Your first name"
                    />
                  </div>
                  <div className="animate-fade-in-up animate-delay-200">
                    <Label htmlFor="lastName" className="text-black font-medium mb-2 block">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="border-gray-300 focus:border-black focus:ring-black rounded-xl transition-all duration-300"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-fade-in-up animate-delay-300">
                    <Label htmlFor="email" className="text-black font-medium mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-gray-300 focus:border-black focus:ring-black rounded-xl transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="animate-fade-in-up animate-delay-400">
                    <Label htmlFor="phone" className="text-black font-medium mb-2 block">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="border-gray-300 focus:border-black focus:ring-black rounded-xl transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Company Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-fade-in-up animate-delay-500">
                    <Label htmlFor="company" className="text-black font-medium mb-2 block">
                      Company Name *
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="border-gray-300 focus:border-black focus:ring-black rounded-xl transition-all duration-300"
                      placeholder="Your company"
                    />
                  </div>
                  <div className="animate-fade-in-up animate-delay-600">
                    <Label htmlFor="website" className="text-black font-medium mb-2 block">
                      Website URL
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      className="border-gray-300 focus:border-black focus:ring-black rounded-xl transition-all duration-300"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                {/* Service, Budget, Timeline */}
                <Label htmlFor="website" className="text-black font-medium mb-2 block">Tell us about your project</Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    placeholder="Share your vision, goals, challenges, and what success looks like for your project. The more details, the better we can help!"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="border-gray-300 focus:border-black focus:ring-black rounded-xl transition-all duration-300"
                  />

                {/* Newsletter Checkbox */}
                <div className="flex items-center space-x-3 animate-fade-in-up animate-delay-1100">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                    className="border-gray-300"
                  />
                  <Label htmlFor="newsletter" className="text-gray-600 text-sm leading-relaxed">
                    Yes, I'd love to receive content marketing tips and insights from stuph studio
                  </Label>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-4 animate-fade-in-up animate-delay-1200">
                  <Button type="submit" disabled={isSubmitting} className="btn-primary px-12 py-4 text-lg group">
                    {isSubmitting ? (
                      <>
                        <span className="loading-dots">Sending</span>
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background design elements */}
        <div className="absolute top-1/4 right-0 w-60 h-60 opacity-3 pointer-events-none">
          <Image src="/images/design-elements.png" alt="" fill className="object-cover object-center" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Common Questions</h2>
            <p className="text-xl text-gray-600">
              Quick answers to help you understand our process and what to expect.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className={`bg-gray-50 border-gray-200 hover-lift animate-fade-in-up animate-delay-${(index + 1) * 200}`}
              >
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-black mb-4">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      
    </div>
  )
}
