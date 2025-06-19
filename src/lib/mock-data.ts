import type { Organizacao, Profissional, Cliente, Transacao, EventoAgenda, KPI } from "@/types"

export const organizacao: Organizacao = {
  id: "1",
  nome: "Academia Força Total",
  tipo: "academia",
  dono: "José da Silva",
  email: "jose@forcatotal.com.br",
  telefone: "(11) 99999-9999",
  endereco: "Rua das Flores, 123 - São Paulo, SP",
}

export const profissionais: Profissional[] = [
  {
    id: "1",
    nome: "Maria Santos",
    email: "maria@forcatotal.com.br",
    telefone: "(11) 88888-8888",
    especialidade: "Personal Trainer",
    organizacaoId: "1",
    ativo: true,
  },
  {
    id: "2",
    nome: "Carlos Oliveira",
    email: "carlos@forcatotal.com.br",
    telefone: "(11) 77777-7777",
    especialidade: "Nutricionista",
    organizacaoId: "1",
    ativo: true,
  },
  {
    id: "3",
    nome: "Ana Costa",
    email: "ana@forcatotal.com.br",
    telefone: "(11) 66666-6666",
    especialidade: "Fisioterapeuta",
    organizacaoId: "1",
    ativo: false,
  },
]

export const clientes: Cliente[] = [
  {
    id: "1",
    nome: "João Pedro",
    email: "joao@email.com",
    telefone: "(11) 55555-5555",
    planoAtual: "Premium",
    profissionalResponsavel: "Maria Santos",
    status: "ativo",
    dataInicio: "2024-01-15",
    organizacaoId: "1",
  },
  {
    id: "2",
    nome: "Fernanda Lima",
    email: "fernanda@email.com",
    telefone: "(11) 44444-4444",
    planoAtual: "Básico",
    profissionalResponsavel: "Carlos Oliveira",
    status: "ativo",
    dataInicio: "2024-02-01",
    organizacaoId: "1",
  },
  {
    id: "3",
    nome: "Roberto Silva",
    email: "roberto@email.com",
    telefone: "(11) 33333-3333",
    planoAtual: "Premium",
    profissionalResponsavel: "Maria Santos",
    status: "inativo",
    dataInicio: "2023-12-10",
    organizacaoId: "1",
  },
  {
    id: "4",
    nome: "Carla Mendes",
    email: "carla@email.com",
    telefone: "(11) 22222-2222",
    planoAtual: "Intermediário",
    profissionalResponsavel: "Ana Costa",
    status: "ativo",
    dataInicio: "2024-03-05",
    organizacaoId: "1",
  },
]

export const transacoes: Transacao[] = [
  {
    id: "1",
    tipo: "entrada",
    descricao: "Mensalidade - João Pedro",
    valor: 150.0,
    data: "2024-01-15",
    categoria: "Mensalidade",
    organizacaoId: "1",
  },
  {
    id: "2",
    tipo: "entrada",
    descricao: "Personal Training - Fernanda Lima",
    valor: 80.0,
    data: "2024-01-14",
    categoria: "Personal",
    organizacaoId: "1",
  },
  {
    id: "3",
    tipo: "saida",
    descricao: "Conta de Luz",
    valor: 320.0,
    data: "2024-01-13",
    categoria: "Despesas Fixas",
    organizacaoId: "1",
  },
  {
    id: "4",
    tipo: "entrada",
    descricao: "Mensalidade - Carla Mendes",
    valor: 120.0,
    data: "2024-01-12",
    categoria: "Mensalidade",
    organizacaoId: "1",
  },
  {
    id: "5",
    tipo: "saida",
    descricao: "Equipamentos",
    valor: 450.0,
    data: "2024-01-10",
    categoria: "Equipamentos",
    organizacaoId: "1",
  },
]

export const eventosAgenda: EventoAgenda[] = [
  {
    id: "1",
    titulo: "Personal Training - João Pedro",
    profissionalId: "1",
    clienteId: "1",
    data: "2024-01-16",
    hora: "08:00",
    valorEsperado: 80.0,
    organizacaoId: "1",
  },
  {
    id: "2",
    titulo: "Consulta Nutricional - Fernanda Lima",
    profissionalId: "2",
    clienteId: "2",
    data: "2024-01-16",
    hora: "10:30",
    valorEsperado: 120.0,
    organizacaoId: "1",
  },
  {
    id: "3",
    titulo: "Avaliação Física - Carla Mendes",
    profissionalId: "1",
    clienteId: "4",
    data: "2024-01-17",
    hora: "14:00",
    valorEsperado: 50.0,
    organizacaoId: "1",
  },
]

export const kpis: KPI[] = [
  {
    titulo: "Faturamento do Mês",
    valor: "R$ 12.450,00",
    variacao: "+15%",
    tipo: "positivo",
  },
  {
    titulo: "Despesas Totais",
    valor: "R$ 8.320,00",
    variacao: "-5%",
    tipo: "positivo",
  },
  {
    titulo: "Lucro Líquido",
    valor: "R$ 4.130,00",
    variacao: "+22%",
    tipo: "positivo",
  },
  {
    titulo: "Clientes Ativos",
    valor: "127",
    variacao: "+8",
    tipo: "positivo",
  },
]

export const faturamentoMensal = [
  { mes: "Ago", valor: 8500 },
  { mes: "Set", valor: 9200 },
  { mes: "Out", valor: 10100 },
  { mes: "Nov", valor: 11300 },
  { mes: "Dez", valor: 10800 },
  { mes: "Jan", valor: 12450 },
]
