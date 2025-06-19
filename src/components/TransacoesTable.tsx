import { transacoes } from "../lib/mock-data"
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react"

export default function TransacoesTable() {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Transações Recentes</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="table-header">Tipo</th>
              <th className="table-header">Descrição</th>
              <th className="table-header">Categoria</th>
              <th className="table-header">Data</th>
              <th className="table-header text-right">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transacoes.map((transacao) => (
              <tr key={transacao.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {transacao.tipo === "entrada" ? (
                      <div className="p-1.5 rounded-lg bg-emerald-100">
                        <ArrowUpCircle className="w-4 h-4 text-emerald-600" />
                      </div>
                    ) : (
                      <div className="p-1.5 rounded-lg bg-red-100">
                        <ArrowDownCircle className="w-4 h-4 text-red-500" />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">
                  {transacao.descricao}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600">
                    {transacao.categoria}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {new Date(transacao.data).toLocaleDateString("pt-BR")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold">
                  <span className={transacao.tipo === "entrada" ? "text-emerald-600" : "text-red-500"}>
                    {transacao.tipo === "entrada" ? "+" : "-"}R$ {transacao.valor.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
