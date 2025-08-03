"use client"

import { notFound } from "next/navigation"
import { caseStudies } from "@/lib/case-studies"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { useEffect } from "react"
import Image from "next/image"

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((s) => s.slug === params.slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!study) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-600 font-semibold mb-4 animate-fade-in-up">{study.category}</p>
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight animate-fade-in-up animate-delay-100">
            {study.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            {study.brief}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* The Problem */}
        <section className="animate-fade-in-up animate-delay-300">
          <h2 className="text-3xl font-bold text-black mb-6">The Problem</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{study.problem}</p>
        </section>

        {/* Our Role */}
        <section className="animate-fade-in-up animate-delay-400">
          <h2 className="text-3xl font-bold text-black mb-8">Our Role</h2>
          <div className="space-y-4">
            {study.role.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed text-lg">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Outcome */}
        <section className="animate-fade-in-up animate-delay-500">
          <h2 className="text-3xl font-bold text-black mb-8">The Outcome</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {study.outcome.map((item, index) => (
              <Card key={index} className="bg-gray-50 border-gray-200 hover-lift">
                <CardContent className="p-6">
                  <p className="text-gray-800 font-medium text-lg">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ITC Right Shift specific sections */}
        {study.slug === "itc-right-shift" && (
          <>
            {/* Social Section */}
            <section className="animate-fade-in-up animate-delay-600">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">Social</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Our innovative social media campaign for ITC Right Shift featured creative toy package-style personas
                representing different lifestyle segments. This unique approach made healthy eating relatable and
                engaging across diverse demographics, from fitness enthusiasts to busy professionals.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/images/itc-social-sporty-grandad.jpeg"
                    alt="Sporty Grandad - ITC Right Shift Social Campaign"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">Sporty Grandad</h3>
                    <p className="text-sm text-gray-600 mt-1">Active seniors lifestyle persona</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/images/itc-social-on-the-go-mom.jpeg"
                    alt="On-The-Go Mom - ITC Right Shift Social Campaign"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">On-The-Go Mom</h3>
                    <p className="text-sm text-gray-600 mt-1">Busy professional mother persona</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/images/itc-social-sprinter-aunty.jpeg"
                    alt="Sprinter Aunty - ITC Right Shift Social Campaign"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">Sprinter Aunty</h3>
                    <p className="text-sm text-gray-600 mt-1">Fitness-focused middle-aged persona</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/images/itc-social-hiker-dad.jpeg"
                    alt="Hiker Dad - ITC Right Shift Social Campaign"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">Hiker Dad</h3>
                    <p className="text-sm text-gray-600 mt-1">Adventure-loving father persona</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/images/itc-social-advice-anuradha.jpeg"
                    alt="Real Customer Story - Anuradha"
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">Customer Stories</h3>
                    <p className="text-sm text-gray-600 mt-1">Real testimonials and advice</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Promotion Section */}
            <section className="animate-fade-in-up animate-delay-700">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">Promotion</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Strategic promotional campaigns highlighting the nutritional benefits and unique positioning of ITC
                Right Shift products. Our messaging focused on the "Softer, Stronger, Smarter" proposition with
                compelling health benefits.
              </p>

              {/* Main Product Positioning */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 mb-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Who knew Healthier could be</h3>
                  <h2 className="text-4xl font-bold text-green-900">ATTA</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <h4 className="text-xl font-bold text-green-800 mb-2">SOFTER</h4>
                      <p className="text-sm text-gray-700">No compromise on taste</p>
                      <p className="text-sm text-gray-700">As soft as regular rotis</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <h4 className="text-xl font-bold text-green-800 mb-2">STRONGER</h4>
                      <p className="text-sm text-gray-700 mb-2">30% MORE PROTEIN THAN REGULAR ATTA</p>
                      <div className="space-y-1">
                        <p className="text-lg font-semibold text-green-700">18g PROTEIN</p>
                        <p className="text-lg font-semibold text-green-700">15g FIBRE</p>
                        <p className="text-xs text-gray-600">*RDA per serve (4 rotis)</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <h4 className="text-xl font-bold text-green-800 mb-2">SMARTER</h4>
                      <p className="text-sm text-gray-700 mb-2">Low GI Food</p>
                      <p className="text-xs text-gray-600">Tested for low GI</p>
                      <p className="text-xs text-gray-600">Regulates blood sugar levels</p>
                      <p className="text-xs text-gray-600">Keeps you active for longer</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center">
                  <p className="text-sm font-semibold text-green-800 mb-2">CURATED BY CHEFS AND NUTRITION EXPERTS</p>
                  <p className="text-xs text-gray-600">SCAN TO BUY OUR PRODUCT RANGE</p>
                </div>
              </div>

              {/* Nutritional Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-blue-50">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-blue-800 mb-4">Daily Nutrition in 4 Rotis</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Daily Protein</span>
                        <span className="text-xl font-bold text-blue-800">33%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Daily Fibre</span>
                        <span className="text-xl font-bold text-blue-800">50%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-orange-800 mb-4">Low GI Benefits</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-orange-700">• Regulates blood sugar levels</p>
                      <p className="text-sm text-orange-700">• Keeps you active for longer</p>
                      <p className="text-sm text-orange-700">• Tested for low GI</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Product Range */}
              <Card className="bg-purple-50">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-purple-800 mb-4">ALSO TRY - Complete Product Range</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <h5 className="font-semibold text-purple-700">HIGH PROTEIN OATS</h5>
                      <p className="text-xs text-gray-600">Goodness of millets and seeds</p>
                      <p className="text-xs text-gray-600">0% maida, 0% refined sugar</p>
                    </div>
                    <div className="text-center">
                      <h5 className="font-semibold text-purple-700">JAGGERY COOKIES</h5>
                      <p className="text-xs text-gray-600">Natural sweetness</p>
                    </div>
                    <div className="text-center">
                      <h5 className="font-semibold text-purple-700">ROASTED NAMKEEN</h5>
                      <p className="text-xs text-gray-600">70% less sat fat*</p>
                      <p className="text-xs text-gray-500">*than regular fried namkeens</p>
                    </div>
                    <div className="text-center">
                      <h5 className="font-semibold text-purple-700">COMPLETE RANGE</h5>
                      <p className="text-xs text-gray-600">Scan to buy our product range</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Packaging Section */}
            <section className="animate-fade-in-up animate-delay-800">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">Packaging</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Comprehensive packaging design system for the entire ITC Right Shift product range. Each package
                features consistent branding with the distinctive "V" checkmark, vibrant color coding for different
                categories, and clear communication of health benefits and nutritional information.
              </p>

              {/* Breakfast Cereals & Oats */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Breakfast Cereals & Oats</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-spinach-oats.jpeg"
                      alt="Millet Masala Oats - Spinach and Corn"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Millet Masala Oats</h4>
                      <p className="text-sm text-gray-600 mt-1">Spinach and Corn</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-oats-plus.jpeg"
                      alt="Oats++ with Millets and Seeds"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Oats++</h4>
                      <p className="text-sm text-gray-600 mt-1">With Millets and Seeds</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-tangy-tomato-oats.jpeg"
                      alt="Millet Masala Oats - Tangy Tomato"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Millet Masala Oats</h4>
                      <p className="text-sm text-gray-600 mt-1">Tangy Tomato</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-millet-oatmeal.jpeg"
                      alt="Millet Oatmeal with Fruits, Nuts and Seeds"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Millet Oatmeal</h4>
                      <p className="text-sm text-gray-600 mt-1">With Fruits, Nuts and Seeds</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flour & Atta */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Flour & Atta</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-multigrain-atta.jpeg"
                      alt="Multi grain+ Atta"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Multi grain+ Atta</h4>
                      <p className="text-sm text-gray-600 mt-1">With Soya, Chana and Oats</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-multi-millet-mix.jpeg"
                      alt="Multi-Millet Mix"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Multi-Millet Mix</h4>
                      <p className="text-sm text-gray-600 mt-1">With Jowar, Navane, Bajra, Ragi, Quinoa</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Snacks & Namkeen */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Snacks & Namkeen</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-navrattan-namkeen.jpeg"
                      alt="Navrattan Multigrain Mixture"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Navrattan Multigrain Mixture</h4>
                      <p className="text-sm text-gray-600 mt-1">With Chana, Masur & Oats</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-khatta-meetha.jpeg"
                      alt="Khatta Meetha Millets Chana Mixture"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Khatta Meetha Millets</h4>
                      <p className="text-sm text-gray-600 mt-1">Chana Mixture</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cookies & Desserts */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Cookies & Desserts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-jaggery-cookies.jpeg"
                      alt="Jaggery Oats Cookies"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Jaggery Oats Cookies</h4>
                      <p className="text-sm text-gray-600 mt-1">With Almond and Seeds</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-kheer-mix.jpeg"
                      alt="Millet Oats Kheer Mix"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Millet Oats Kheer Mix</h4>
                      <p className="text-sm text-gray-600 mt-1">With Nuts, Dates and Raisins</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* E-Commerce Section */}
            <section className="animate-fade-in-up animate-delay-900">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">E-Commerce</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Strategic e-commerce campaigns designed for major online platforms including Amazon, Flipkart, and
                direct-to-consumer channels. Our approach combines festival marketing, seasonal promotions, and
                platform-specific optimization to drive online sales and brand visibility.
              </p>

              {/* Festival & Seasonal Campaigns */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Festival & Seasonal Campaigns</h3>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-ecommerce-holi-banner.png"
                      alt="Holi Festival E-commerce Campaign - Right Shift"
                      width={800}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Holi Festival Campaign</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        "Rang Barse, Junk Na Barse" - Creative festival campaign promoting healthy alternatives during
                        celebrations
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          Festival Marketing
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          15% OFF Promotion
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          Multi-Product Display
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Marketplace Banners */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Marketplace Optimization</h3>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-ecommerce-amazon-banner.png"
                      alt="Amazon Store Banner - Right Shift Multigrain Atta"
                      width={800}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Amazon Store Banner</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Platform-optimized banner highlighting key product benefits with visual strength metaphors
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                          Amazon Optimization
                        </span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                          Product Focus
                        </span>
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                          Benefit Highlighting
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* E-commerce Strategy Overview */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">E-Commerce Strategy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Platform Optimization</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Amazon storefront design</li>
                        <li>• Flipkart marketplace banners</li>
                        <li>• Platform-specific sizing</li>
                        <li>• SEO-optimized content</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Seasonal Campaigns</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Festival-themed promotions</li>
                        <li>• Seasonal discount campaigns</li>
                        <li>• Cultural relevance</li>
                        <li>• Limited-time offers</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Conversion Focus</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Clear call-to-action</li>
                        <li>• Benefit-driven messaging</li>
                        <li>• Visual product showcase</li>
                        <li>• Trust indicators</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Tify specific sections */}
        {study.slug === "tify" && (
          <>
            {/* Social Section */}
            <section className="animate-fade-in-up animate-delay-600">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">Social</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Our social media strategy for Tify focused on educating consumers about western pickles and their
                culinary applications. We created engaging content that balanced food humor with educational value,
                making consumers aware of the versatility and unique taste profiles of western pickles.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-100 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                  <p className="text-gray-500">Educational Content</p>
                  <p className="text-sm text-gray-400 mt-2">Recipe videos and usage tips</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                  <p className="text-gray-500">Food Humor</p>
                  <p className="text-sm text-gray-400 mt-2">Relatable food memes and content</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                  <p className="text-gray-500">Product Showcase</p>
                  <p className="text-sm text-gray-400 mt-2">Visual storytelling of pickle varieties</p>
                </div>
              </div>
            </section>

            {/* Retail Branding Section */}
            <section className="animate-fade-in-up animate-delay-700">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">Retail Branding</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Comprehensive retail branding strategy designed to establish Tify's presence across multiple touchpoints
                - from mobile marketing and trade shows to educational materials and product showcases. Our approach
                focused on creating memorable brand experiences that drive product trial and purchase intent.
              </p>

              {/* Mobile Marketing */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Mobile Marketing</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/tify-mobile-truck-mockup.jpeg"
                      alt="Tify Mobile Food Truck Marketing Campaign"
                      width={800}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Mobile Food Truck Campaign</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        "Tify in a Jiffy!" mobile marketing campaign featuring branded food trucks with QR code
                        integration for instant ordering and promotional offers
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                          Mobile Marketing
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          QR Code Integration
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          20% OFF Promotion
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/tify-mobile-marketing-panel.jpeg"
                      alt="Tify Mobile Marketing Side Panel Design"
                      width={800}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Mobile Marketing Panels</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Eye-catching side panel designs for mobile marketing vehicles featuring energetic brand
                        messaging and product integration
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                          Brand Energy
                        </span>
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                          Product Integration
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          Mobile Advertising
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exhibition & Trade Shows */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Exhibition & Trade Shows</h3>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/images/tify-exhibition-stall-mockup.jpeg"
                    alt="Tify Exhibition Stall Design - 36 sq.mtr"
                    width={1000}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Trade Show Stall Design</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Comprehensive 36 sq.mtr exhibition stall design featuring strategic product displays, interactive
                      chef demonstration area, and optimized customer flow for maximum engagement
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <h5 className="font-semibold text-gray-700">Total Area</h5>
                        <p className="text-sm text-gray-600">36 sq.mtr</p>
                      </div>
                      <div className="text-center">
                        <h5 className="font-semibold text-gray-700">Chef Table</h5>
                        <p className="text-sm text-gray-600">2mtr x 2mtr</p>
                      </div>
                      <div className="text-center">
                        <h5 className="font-semibold text-gray-700">Display Area</h5>
                        <p className="text-sm text-gray-600">7 mtr frontage</p>
                      </div>
                      <div className="text-center">
                        <h5 className="font-semibold text-gray-700">Storage</h5>
                        <p className="text-sm text-gray-600">Multiple zones</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Interactive Design
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        Chef Demonstrations
                      </span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                        Product Sampling
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        Brand Experience
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Educational Materials */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Educational Materials</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/tify-burger-education-poster.jpeg"
                      alt="Tify Burger Recipe Educational Poster"
                      width={600}
                      height={800}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Recipe Education Poster</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        "Make Your Burger, A Buh-Gahhh" - Creative educational poster showing how multiple Tify products
                        can enhance burger preparation with detailed ingredient breakdown
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Recipe Education
                        </span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                          Product Usage
                        </span>
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full">Visual Learning</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/tify-product-showcase-banner.jpeg"
                      alt="Tify Product Range Showcase Banner"
                      width={800}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Product Showcase Banner</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        "Fresh on the Block. Filled with Flavour!" - Comprehensive product range display showcasing the
                        complete Tify portfolio including pickles, sauces, and condiments
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                          Product Portfolio
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          Brand Messaging
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          Visual Impact
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategy Overview */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-100 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Retail Branding Strategy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Mobile Activation</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Food truck campaigns</li>
                        <li>• QR code integration</li>
                        <li>• Location-based marketing</li>
                        <li>• Instant promotional offers</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Trade Show Presence</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Interactive stall design</li>
                        <li>• Live chef demonstrations</li>
                        <li>• Product sampling programs</li>
                        <li>• Customer engagement zones</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Consumer Education</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Recipe demonstration posters</li>
                        <li>• Product usage guides</li>
                        <li>• Visual learning materials</li>
                        <li>• Brand storytelling</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Packaging Section */}
            <section className="animate-fade-in-up animate-delay-800">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">Packaging</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Modern packaging design that positioned Tify as a premium clean-label food brand. Our design approach
                emphasized the natural, nutritious qualities while ensuring strong shelf appeal and easy product
                navigation across different SKUs.
              </p>

              {/* Packaging Design Principles */}

              {/* Product Showcase */}
              <div className="mb-12">
                {/* Sauces & Pastes */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Sauces & Pastes</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src="/images/tify-pizza-pasta-sauce-packaging.jpeg"
                        alt="Tify Pizza Pasta Sauce - Front and Back Packaging"
                        width={400}
                        height={500}
                        className="w-full h-auto object-cover"
                      />
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src="/images/tify-ginger-paste-front.jpeg"
                        alt="Tify Ginger Paste - Front Packaging"
                        width={400}
                        height={500}
                        className="w-full h-auto object-cover"
                      />
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src="/images/tify-ginger-paste-back.jpeg"
                        alt="Tify Ginger Paste - Back Packaging with Nutritional Information"
                        width={400}
                        height={500}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Chutneys & Condiments */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Chutneys & Condiments</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src="/images/tify-desi-hari-chutney-promo.png"
                        alt="Tify Desi Hari Chutney - Dilli Style Promotional Design"
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                      />
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src="/images/tify-tamarind-dates-chutney.png"
                        alt="Tify Tamarind & Dates Chutney - 100% Desi Imli Chutney"
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Packaging Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-gradient-to-br from-green-50 to-green-100">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-green-800 mb-4">Functional Benefits</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Tamper-evident sealing</li>
                      <li>• Extended shelf life protection</li>
                      <li>• Easy-open mechanisms</li>
                      <li>• Portion control sizing</li>
                      <li>• Stackable design</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-blue-800 mb-4">Brand Communication</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Clean-label messaging</li>
                      <li>• Ingredient transparency</li>
                      <li>• Usage suggestions</li>
                      <li>• Brand story integration</li>
                      <li>• Quality certifications</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
          </>
        )}

        {/* Gastronomix specific sections */}
        {study.slug === "gastronomix" && (
          <>
            {/* Nippu Kodi Section */}
            <section className="animate-fade-in-up animate-delay-600">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">Nippu Kodi</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Nippu Kodi represents our fiery approach to spicy chicken preparations, combining traditional South
                Indian flavors with contemporary presentation. Our campaign focused on the authentic taste experience
                while appealing to modern food enthusiasts who crave bold, spicy flavors.
              </p>

              {/* Brand Identity */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Brand Identity & Visual Language</h3>
                <div className="bg-gradient-to-br from-red-50 to-orange-100 rounded-xl p-8 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <h4 className="text-lg font-bold text-red-800 mb-2">Fiery Aesthetics</h4>
                        <p className="text-sm text-gray-700">
                          Bold red and orange color palette representing heat and spice
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <h4 className="text-lg font-bold text-orange-800 mb-2">Authentic Typography</h4>
                        <p className="text-sm text-gray-700">
                          Traditional Telugu script elements with modern readability
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <h4 className="text-lg font-bold text-yellow-800 mb-2">Spice Iconography</h4>
                        <p className="text-sm text-gray-700">
                          Visual elements inspired by chilies and traditional spices
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Menu Design */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Menu Design & Food Photography</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-red-50 to-red-100">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold text-red-800 mb-4">Signature Dishes</h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Guntur Kodi Fry - Traditional spicy chicken fry</li>
                        <li>• Nippu Biryani - Fiery chicken biryani</li>
                        <li>• Kodi Iguru - Spicy chicken curry</li>
                        <li>• Pepper Chicken - Black pepper specialty</li>
                        <li>• Chili Chicken - Indo-Chinese fusion</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold text-orange-800 mb-4">Photography Style</h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• High-contrast lighting to emphasize texture</li>
                        <li>• Steam and smoke effects for heat visualization</li>
                        <li>• Traditional serving vessels and garnishes</li>
                        <li>• Close-up shots highlighting spice coating</li>
                        <li>• Action shots of cooking process</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Marketing Campaigns */}
              <div className="bg-gradient-to-br from-yellow-50 to-red-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Marketing Campaigns</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">"Challenge Your Taste Buds"</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Interactive social media campaign encouraging customers to share their spice tolerance levels and
                      reactions to our fiery dishes.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full">Social Engagement</span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                        User Generated Content
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">"Authentic Andhra Flavors"</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Educational content series highlighting the traditional cooking methods and spice blends used in
                      authentic Andhra cuisine.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                        Educational Content
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Cultural Heritage
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Content */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Social Media Content</h3>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/nippu-kodi-blood-vessels.jpeg"
                      alt="Nippu Kodi Creative Social Media Post - Microscopic Blood Vessels"
                      width={800}
                      height={800}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Viral Social Media Campaign</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        "Microscopic view of my blood vessels" - Creative visual metaphor showing chicken skewers
                        floating among blood cells, suggesting that Nippu Kodi's spicy food is literally in your
                        bloodstream. This humorous approach to food addiction resonated strongly with spice lovers.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full">Viral Content</span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                          Visual Metaphor
                        </span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Food Humor</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          Brand Engagement
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* El Chaapo Section */}
            <section className="animate-fade-in-up animate-delay-700">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">El Chaapo</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                El Chaapo embodies our affordable dining concept that doesn't compromise on taste or quality. Our
                branding strategy focused on creating a fun, accessible Mexican-inspired food experience that appeals to
                budget-conscious food lovers without sacrificing the authentic flavors and vibrant atmosphere.
              </p>

              {/* Brand Positioning */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Brand Positioning & Identity</h3>
                <div className="bg-gradient-to-br from-green-50 to-yellow-100 rounded-xl p-8 mb-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-green-800 mb-2">¡Sabor Auténtico, Precio Increíble!</h3>
                    <p className="text-lg text-gray-700">Authentic Flavor, Incredible Price!</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <h4 className="text-xl font-bold text-green-800 mb-2">AFFORDABLE</h4>
                        <p className="text-sm text-gray-700">Quality Mexican food at unbeatable prices</p>
                        <p className="text-sm text-gray-700">Student-friendly portions and pricing</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <h4 className="text-xl font-bold text-yellow-800 mb-2">AUTHENTIC</h4>
                        <p className="text-sm text-gray-700">Traditional Mexican recipes and ingredients</p>
                        <p className="text-sm text-gray-700">Fresh salsas and handmade tortillas</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <h4 className="text-xl font-bold text-red-800 mb-2">ACCESSIBLE</h4>
                        <p className="text-sm text-gray-700">Casual dining atmosphere</p>
                        <p className="text-sm text-gray-700">Quick service for busy lifestyles</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Menu Categories */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Menu Design & Categories</h3>

                {/* Tacos & Burritos */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Tacos & Burritos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-red-50 to-red-100">
                      <CardContent className="p-6">
                        <h5 className="font-semibold text-red-800 mb-2">Street Tacos</h5>
                        <p className="text-sm text-gray-600 mb-2">₹49 - ₹79</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Carnitas (Slow-cooked pork)</li>
                          <li>• Pollo Asado (Grilled chicken)</li>
                          <li>• Carne Asada (Grilled beef)</li>
                          <li>• Vegetariano (Grilled vegetables)</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
                      <CardContent className="p-6">
                        <h5 className="font-semibold text-yellow-800 mb-2">Burritos</h5>
                        <p className="text-sm text-gray-600 mb-2">₹99 - ₹149</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• El Chaapo Special</li>
                          <li>• Bean & Rice Burrito</li>
                          <li>• Chicken Fajita Burrito</li>
                          <li>• Breakfast Burrito</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100">
                      <CardContent className="p-6">
                        <h5 className="font-semibold text-green-800 mb-2">Quesadillas</h5>
                        <p className="text-sm text-gray-600 mb-2">₹79 - ₹119</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Cheese Quesadilla</li>
                          <li>• Chicken Quesadilla</li>
                          <li>• Veggie Quesadilla</li>
                          <li>• Spicy Jalapeño</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Sides & Beverages */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Sides & Beverages</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
                      <CardContent className="p-6">
                        <h5 className="font-semibold text-orange-800 mb-3">Sides & Appetizers</h5>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                          <div>• Guacamole & Chips</div>
                          <div>• Mexican Rice</div>
                          <div>• Refried Beans</div>
                          <div>• Jalapeño Poppers</div>
                          <div>• Nachos Supreme</div>
                          <div>• Elote (Mexican Corn)</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardContent className="p-6">
                        <h5 className="font-semibold text-blue-800 mb-3">Beverages</h5>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                          <div>• Horchata</div>
                          <div>• Agua Fresca</div>
                          <div>• Mexican Coke</div>
                          <div>• Fresh Lime Soda</div>
                          <div>• Iced Tea</div>
                          <div>• Coffee de Olla</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Marketing Strategy */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Marketing Strategy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Student Outreach</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Campus food festivals</li>
                        <li>• Student discount programs</li>
                        <li>• Late-night delivery specials</li>
                        <li>• Group meal deals</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Social Media Presence</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Instagram food photography</li>
                        <li>• TikTok recipe videos</li>
                        <li>• Customer review features</li>
                        <li>• Daily specials announcements</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Community Engagement</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Local event catering</li>
                        <li>• Taco Tuesday promotions</li>
                        <li>• Loyalty reward programs</li>
                        <li>• Cultural celebration menus</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </>
        )}
        {/* End of Gastronomix specific sections */}
      </div>
    </div>
  )
}
