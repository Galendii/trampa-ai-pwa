"use client"
import Navigation from "../../components/landing/Navigation"
import Hero from "../../components/landing/Hero"
import Features from "../../components/landing/Features"
import Testimonials from "../../components/landing/Testimonials"
import Pricing from "../../components/landing/Pricing"
import CTA from "../../components/landing/CTA"
import Footer from "../../components/landing/Footer"
import PWAInstallBanner from "../../components/PWAInstallBanner"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
      <PWAInstallBanner />
    </div>
  )
}
