"use client"

import { useEffect } from "react"

import { useState } from "react"

import type React from "react"
import ComingSoonHero from "../../components/coming-soon/Hero"
import { ArrowRight, Target, TrendingUp, Bell, CheckCircle, Rocket, Brain, Building2 } from "lucide-react"

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Countdown timer (exemplo: 30 dias a partir de agora)
  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 30)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })

      if (distance < 0) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  const features = [
    {
      icon: Brain,
      title: "IA que Entende Seu Negócio",
      description: "Inteligência artificial que aprende com seus dados e sugere as melhores decisões.",
    },
    {
      icon: Target,
      title: "Foco no Que Importa",
      description: "Automatize tarefas repetitivas e concentre-se em fazer seu negócio crescer.",
    },
    {
      icon: TrendingUp,
      title: "Crescimento Acelerado",
      description: "Insights poderosos que revelam oportunidades ocultas no seu negócio.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold">Trampa AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-blue-300">
              <Building2 className="w-5 h-5" />
              <span className="text-sm font-medium">Em Desenvolvimento</span>
            </div>
          </div>
        </header>

        <ComingSoonHero />

        {/* Main Content */}
        <main className="px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm">
              <Rocket className="w-4 h-4 mr-2" />
              Revolucionando a Gestão de Negócios
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              O Futuro da
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Gestão Inteligente
              </span>
              Está Chegando
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Prepare-se para uma revolução na forma como você gerencia seu negócio.
              <strong className="text-white"> Trampa AI</strong> está prestes a transformar freelancers e pequenas
              empresas em máquinas de crescimento.
            </p>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
              {[
                { label: "Dias", value: timeLeft.days },
                { label: "Horas", value: timeLeft.hours },
                { label: "Min", value: timeLeft.minutes },
                { label: "Seg", value: timeLeft.seconds },
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {item.value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm text-slate-300 uppercase tracking-wider">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Email Signup */}
            <div className="max-w-md mx-auto mb-16">
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Seu melhor e-mail"
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Bell className="w-5 h-5" />
                    <span>Quero Ser o Primeiro a Saber</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-center space-x-3 text-emerald-300">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold">Você está na lista VIP!</span>
                  </div>
                  <p className="text-sm text-emerald-200 mt-2">
                    Prepare-se para receber acesso exclusivo antes de todo mundo.
                  </p>
                </div>
              )}
            </div>

            {/* Features Preview */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Social Proof */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                  <div className="text-slate-300">Profissionais na Lista</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">15+</div>
                  <div className="text-slate-300">Recursos Exclusivos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-400 mb-2">100%</div>
                  <div className="text-slate-300">Foco no Seu Sucesso</div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-slate-400 mb-4">
              Quer saber mais sobre o que estamos construindo?
              <a href="mailto:contato@trampaai.com" className="text-blue-400 hover:text-blue-300 ml-1 underline">
                Entre em contato
              </a>
            </p>
            <div className="flex justify-center space-x-6 text-sm text-slate-500">
              <span>© 2024 Trampa AI</span>
              <span>•</span>
              <a href="#" className="hover:text-slate-300 transition-colors">
                Privacidade
              </a>
              <span>•</span>
              <a href="#" className="hover:text-slate-300 transition-colors">
                Termos
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
