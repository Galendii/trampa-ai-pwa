import { BarChart3, DollarSign, Calendar, Users, FileText, Target } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: BarChart3,
      title: "Dashboard Inteligente",
      description: "Visualize seus números de forma clara e tome decisões baseadas em dados reais.",
    },
    {
      icon: DollarSign,
      title: "Controle Financeiro",
      description: "Gerencie receitas, despesas e fluxo de caixa com simplicidade e precisão.",
    },
    {
      icon: Calendar,
      title: "Agenda Integrada",
      description: "Organize seus compromissos e nunca mais perca uma oportunidade de negócio.",
    },
    {
      icon: Users,
      title: "Gestão de Clientes",
      description: "Mantenha um relacionamento próximo e organizado com todos os seus clientes.",
    },
    {
      icon: FileText,
      title: "Relatórios Automáticos",
      description: "Relatórios detalhados gerados automaticamente para facilitar sua gestão.",
    },
    {
      icon: Target,
      title: "Metas e Objetivos",
      description: "Defina metas claras e acompanhe seu progresso em tempo real.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Tudo que você precisa para crescer</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Uma plataforma completa para profissionais e organizações gerenciarem seus clientes, enquanto seus clientes
            acompanham seu progresso - tudo de forma integrada.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
