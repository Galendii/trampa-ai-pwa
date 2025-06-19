"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Bell, CheckCircle, Rocket } from "lucide-react"

export default function ComingSoonHero() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <main className="px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-6 py-3 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm">
          <Rocket className="w-4 h-4 mr-2" />
          Revolucionando a Gestão de Negócios
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          A Revolução da
          <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Gestão Inteligente
          </span>
          Está Chegando
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
          Imagine nunca mais se preocupar com planilhas, controles manuais ou clientes perdidos.
          <strong className="text-white"> Trampa AI</strong> vai transformar freelancers e pequenas empresas em máquinas
          de crescimento automatizadas.
        </p>

        {/* Value Propositions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-2xl mb-2">🧠</div>
            <h3 className="font-semibold text-white mb-2">IA que Pensa por Você</h3>
            <p className="text-slate-300 text-sm">Decisões automáticas baseadas nos seus dados</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-white mb-2">Crescimento Acelerado</h3>
            <p className="text-slate-300 text-sm">Identifica oportunidades que você nem sabia que existiam</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-white mb-2">Foco Total</h3>
            <p className="text-slate-300 text-sm">Automatiza o chato, libera você para o que importa</p>
          </div>
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
                <span>Quero Acesso Exclusivo</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-slate-400">
                Seja um dos primeiros a descobrir como a IA pode revolucionar seu negócio
              </p>
            </form>
          ) : (
            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-3 text-emerald-300">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Você está na lista VIP!</span>
              </div>
              <p className="text-sm text-emerald-200 mt-2">
                Prepare-se para receber insights exclusivos sobre o futuro da gestão inteligente.
              </p>
            </div>
          )}
        </div>

        {/* Social Proof */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">1.2k+</div>
              <div className="text-slate-300">Profissionais Aguardando</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">25+</div>
              <div className="text-slate-300">Recursos Revolucionários</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400 mb-2">100%</div>
              <div className="text-slate-300">Focado no Seu Sucesso</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
