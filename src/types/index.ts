// Organização: Empresa que emprega múltiplos profissionais (academia, clínica, etc.)
export interface Organizacao {
  id: string;
  nome: string;
  tipo: "academia" | "estudio" | "clinica";
  dono: string;
  email: string;
  telefone: string;
  endereco: string;
  contasAdmin: string[]; // Máximo 2 contas administrativas
}

// Profissional: Prestador de serviço (pode ser independente ou parte de uma organização)
export interface Profissional {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  especialidade: string;
  organizacaoId: string; // Se vazio, é profissional independente
  ativo: boolean;
  isIndependente?: boolean; // Flag para identificar se é independente
}

// Cliente: Usuário final que recebe serviços (aluno, paciente, etc.)
export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  planoAtual: string;
  profissionalResponsavel: string; // Profissional que atende este cliente
  status: "ativo" | "inativo";
  dataInicio: string;
  organizacaoId: string; // ID da organização (se aplicável) ou profissional independente
}

export interface Transacao {
  id: string;
  tipo: "entrada" | "saida";
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  organizacaoId: string;
}

export interface EventoAgenda {
  id: string;
  titulo: string;
  profissionalId: string;
  clienteId: string;
  data: string;
  hora: string;
  valorEsperado?: number;
  organizacaoId: string;
}

export interface KPI {
  titulo: string;
  valor: string;
  variacao?: string;
  tipo: "positivo" | "negativo" | "neutro";
}
