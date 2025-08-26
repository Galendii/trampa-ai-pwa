"use client";
import CTA from "../../components/landing/CTA";
import Features from "../../components/landing/Features";
import Footer from "../../components/landing/Footer";
import Hero from "../../components/landing/Hero";
import Navigation from "../../components/landing/Navigation";
import Pricing from "../../components/landing/Pricing";
import Testimonials from "../../components/landing/Testimonials";
import PWAInstallBanner from "../../components/PWAInstallBanner";

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
  );
}
