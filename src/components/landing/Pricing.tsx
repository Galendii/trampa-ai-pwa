import Link from "next/link"
import { CheckCircle, Users, Crown, Zap } from "lucide-react"

export default function Pricing() {
  const plans = [
    {
      name: "Profissional Solo",
      price: "R$ 49",
      period: "/mês",
      description: "Para profissionais independentes (personal trainers, fisioterapeutas, nutricionistas)",
      features: [
        "Até 30 clientes",
        "Dashboard completo",
        "Controle financeiro",
        "Agenda integrada",
        "Relatórios básicos",
        "Suporte por email",
        "Backup automático",
      ],
      highlighted: false,
      icon: Users,
      maxClients: "30",
    },
    {
      name: "Profissional Plus",
      price: "R$ 99",
      period: "/mês",
      description: "Para profissionais com maior volume de clientes",
      features: [
        "Até 60 clientes",
        "Dashboard avançado",
        "Relatórios detalhados",
        "Suporte prioritário",
        "Integrações avançadas",
        "Recursos de marketing",
        "Análise de desempenho",
      ],
      highlighted: true,
      icon: Crown,
      maxClients: "60",
    },
    {
      name: "Organização",
      price: "R$ 15",
      period: "/cliente/mês",
      description: "Para academias, clínicas e estúdios com múltiplos profissionais",
      features: [
        "Clientes ilimitados",
        "Múltiplos profissionais",
        "Gestão de equipe",
        "Painel administrativo",
        "API personalizada",
        "Suporte 24/7",
        "White label disponível",
        "Implementação assistida",
      ],
      highlighted: false,
      icon: Zap,
      maxClients: "Ilimitado",
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Planos para cada fase do seu negócio</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Escolha o plano ideal para o seu negócio. <strong>Seus clientes sempre acessam gratuitamente</strong>,
            independente do plano escolhido.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <div
                key={index}
                className={`
                  rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-lg relative
                  ${
                    plan.highlighted
                      ? "border-blue-500 bg-blue-50 scale-105"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }
                `}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-600 text-white text-sm font-medium px-6 py-2 rounded-full">
                      Mais Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{plan.name}</h3>
                  <p className="text-slate-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                    {plan.period && <span className="text-slate-600 ml-1">{plan.period}</span>}
                  </div>
                  {plan.maxClients && (
                    <div className="mt-2 text-sm text-slate-500">
                      {plan.maxClients === "Ilimitado" ? "Clientes ilimitados" : `Até ${plan.maxClients} clientes`}
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.name === "Organização" ? (
                  <button className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 text-center bg-slate-100 hover:bg-slate-200 text-slate-700">
                    Falar com Vendas
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className={`
                      w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 text-center block
                      ${
                        plan.highlighted
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }
                    `}
                  >
                    Começar Agora
                  </Link>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold text-blue-800 mb-2">💡 Como funciona o acesso para clientes?</h3>
            <p className="text-blue-700 text-sm leading-relaxed">
              <strong>Seus clientes nunca pagam:</strong> Independente do plano que você escolher, seus clientes têm
              acesso gratuito ao aplicativo móvel para acompanhar seu progresso, visualizar agendamentos e se comunicar
              com você.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
