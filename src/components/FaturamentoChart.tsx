"use client"

import { faturamentoMensal } from "../lib/mock-data"

export default function FaturamentoChart() {
  const maxValue = Math.max(...faturamentoMensal.map((item) => item.valor))

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Evolução do Faturamento</h3>
      <div className="flex items-end justify-between h-64 space-x-3">
        {faturamentoMensal.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-gradient-to-t from-blue-600 to-blue-500 rounded-t-lg transition-all duration-500 hover:from-blue-700 hover:to-blue-600 shadow-sm"
              style={{
                height: `${(item.valor / maxValue) * 200}px`,
                minHeight: "24px",
              }}
            />
            <div className="mt-3 text-center">
              <p className="text-xs font-semibold text-slate-700">{item.mes}</p>
              <p className="text-xs text-slate-500 mt-0.5">R$ {(item.valor / 1000).toFixed(1)}k</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
