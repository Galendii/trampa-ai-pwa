"use client";

import { useGetClients } from "@/hooks/api/professional/useProfessional";
import Header from "../../../components/Header";
import { Plus, Search, Eye, Edit, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { ClientUserModel } from "@/models/user";
import { StringHelper } from "@/helpers/string-helper";
import { ClientsTable } from "@/components/ui/tables/ClientsTable";

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const stringHelper = new StringHelper();

  const [statusFilter, setStatusFilter] = useState<
    "todos" | "ativo" | "inativo"
  >("todos");
  const { data: clients } = useGetClients();

  const filteredClients: ClientUserModel[] = (clients || []).filter(
    (client) => {
      const matchesSearch =
        client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "todos" ||
        (client.professionalReferralCode ? "ativo" : "inativo") ===
          statusFilter;
      return matchesSearch && matchesStatus;
    }
  );

  const getStatusBadge = (status: string) => {
    return status === "ativo" ? "status-badge-active" : "status-badge-inactive";
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <Header title="Clientes" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1 w-full sm:w-auto">
          {/* Busca */}
          <div className="relative flex-1 max-w-md w-full">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Tabela de Clientes
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Cliente</th>
                <th className="table-header">Plano Atual</th>
                <th className="table-header">Profissional Responsável</th>
                <th className="table-header">Status</th>
                <th className="table-header">Data de Início</th>
                <th className="table-header text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {client.firstName} {client.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {client.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {stringHelper.formatAsPhoneNumber(client.phone)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {stringHelper.formatAsCPF(client.cpf)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                      N/A
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    N/A
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                        client.professionalReferralCode ? "ativo" : "inativo"
                      )}`}
                    >
                      {client.professionalReferralCode ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(client.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="text-gray-400 hover:text-gray-600 p-1"
                        aria-label="Ver detalhes"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="text-gray-400 hover:text-gray-600 p-1"
                        aria-label="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-600 p-1"
                        aria-label="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                Nenhum cliente encontrado
              </h3>
              <p className="text-sm text-gray-500">
                {searchTerm || statusFilter !== "todos"
                  ? "Tente ajustar os filtros de busca."
                  : "Comece adicionando seu primeiro cliente."}
              </p>
            </div>
          </div>
        )}
      </div> */}

      <ClientsTable clients={filteredClients} />
      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="card text-center">
          <div className="text-xl sm:text-2xl font-bold text-gray-900">
            {clients?.filter((c) => c.professionalReferralCode).length}
          </div>
          <div className="text-sm text-gray-600">Clientes Ativos</div>
        </div>
        <div className="card text-center">
          <div className="text-xl sm:text-2xl font-bold text-gray-900">
            {clients?.filter((c) => !c.professionalReferralCode).length}
          </div>
          <div className="text-sm text-gray-600">Clientes Inativos</div>
        </div>
        <div className="card text-center">
          <div className="text-xl sm:text-2xl font-bold text-gray-900">
            {clients?.length}
          </div>
          <div className="text-sm text-gray-600">Total de Clientes</div>
        </div>
      </div>
    </div>
  );
}
