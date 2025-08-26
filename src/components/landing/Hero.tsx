"use client";

import Link from "next/link";

import { ArrowRight, CheckCircle, Play, Zap } from "lucide-react";

import PWAInstallBanner from "../PWAInstallBanner";

export default function Hero() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Gestão Inteligente para Seu Negócio
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Sua gestão,
              <span className="text-blue-600"> clara como o dia</span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Transforme a gestão do seu negócio com inteligência artificial.
              Controle financeiro, agenda e clientes em uma plataforma simples e
              poderosa.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-emerald-800">
                  Clientes Sempre Grátis
                </h3>
              </div>
              <p className="text-emerald-700 text-sm leading-relaxed">
                <strong>Seus clientes nunca pagam nada!</strong> Eles têm acesso
                gratuito ao aplicativo para acompanhar seu progresso,
                agendamentos e comunicação direta com você.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/login"
                className="btn-primary text-lg px-8 py-4 flex items-center justify-center"
              >
                Começar Agora
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <button className="flex items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:border-slate-400 transition-colors">
                <Play className="mr-2" size={20} />
                Ver Demonstração
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6 text-sm text-slate-600">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                Planos a partir de R$49/mês
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                Clientes acessam gratuitamente
              </div>
            </div>

            {/* PWA Install Card */}
            <div className="mt-8">
              <PWAInstallBanner variant="card" />
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200/60">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Dashboard
                  </h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-700">
                      R$ 12.5k
                    </div>
                    <div className="text-sm text-emerald-600">Faturamento</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">127</div>
                    <div className="text-sm text-blue-600">Clientes</div>
                  </div>
                </div>

                <div className="h-32 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg opacity-80"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
