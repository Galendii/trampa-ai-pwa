import type { KPI } from "../types"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface KPICardProps {
  kpi: KPI
}

export default function KPICard({ kpi }: KPICardProps) {
  const getIcon = () => {
    switch (kpi.tipo) {
      case "positivo":
        return <TrendingUp className="w-4 h-4 text-emerald-600" />
      case "negativo":
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-slate-400" />
    }
  }

  const getVariationColor = () => {
    switch (kpi.tipo) {
      case "positivo":
        return "text-emerald-600"
      case "negativo":
        return "text-red-500"
      default:
        return "text-slate-400"
    }
  }

  const getBackgroundColor = () => {
    switch (kpi.tipo) {
      case "positivo":
        return "bg-gradient-to-br from-emerald-50 to-emerald-100/50"
      case "negativo":
        return "bg-gradient-to-br from-red-50 to-red-100/50"
      default:
        return "bg-gradient-to-br from-slate-50 to-slate-100/50"
    }
  }

  return (
    <div className={`card border-0 ${getBackgroundColor()}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{kpi.titulo}</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">{kpi.valor}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-white/60 backdrop-blur-sm">{getIcon()}</div>
          {kpi.variacao && <span className={`text-sm font-semibold ${getVariationColor()}`}>{kpi.variacao}</span>}
        </div>
      </div>
    </div>
  )
}
