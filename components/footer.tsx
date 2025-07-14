import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 animate-fade-in-up">
            <div className="flex items-center mb-6">
              <div className="relative w-12 h-12 mr-3">
                <Image src="/images/stuph-logo.png" alt="stuph studio" fill className="object-contain filter invert" />
              </div>
              <span className="text-2xl font-semibold">stuph studio</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              We craft compelling content marketing strategies that tell your story, engage your audience, and drive
              meaningful business results.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 hover:text-white transition-colors duration-300">
                <Mail className="h-4 w-4 mr-3" />
                <span>hello@stuphstudio.com</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-white transition-colors duration-300">
                <Phone className="h-4 w-4 mr-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-white transition-colors duration-300">
                <MapPin className="h-4 w-4 mr-3" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up animate-delay-200">
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="animate-fade-in-up animate-delay-300">
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                "Content Strategy",
                "Brand Storytelling",
                "Social Media",
                "SEO Content",
                "Video Production",
                "Email Marketing",
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0 animate-fade-in-up animate-delay-400">
            {[
              { icon: Instagram, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Linkedin, href: "#" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-sm animate-fade-in-up animate-delay-500">
            © 2024 stuph studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
