import {
  Calendar,
  Check,
  ClipboardList,
  Clock,
  CreditCard,
  FileCheck,
  FileText,
  HandshakeIcon,
  User,
} from "lucide-react";
import { toast } from "sonner";

// Import API and Models
import { createServiceContract } from "@/api/professional";
import {
  CreateContractFormData,
  PaymentMethods,
  ServiceContractStatus,
} from "@/models/service-contract";
// Import the types from the store
import { WizardConfig } from "@/stores/useWizardStore";

import { SelectOption } from "../ui/Select";

// Import Step Components
import {
  AttendanceStep,
  PaymentStep,
  PreviewStep,
  SelectClientStep,
  SelectDatesStep,
  SelectPlanStep,
  SelectServiceStep,
  SuccessStep,
  TermsStep,
} from "./steps";

export const PAYMENT_METHOD_OPTIONS: SelectOption[] = [
  { value: PaymentMethods.CREDIT_CARD, label: "Cartão de Crédito" },
  { value: PaymentMethods.DEBIT_CARD, label: "Cartão de Débito" },
  { value: PaymentMethods.PIX, label: "PIX" },
  { value: PaymentMethods.CASH, label: "Dinheiro" },
];

export const CreateContractWizardConfig: WizardConfig = {
  initialFormData: {
    client: "",
    service: "",
    plan: "",
    startingDate: new Date().toISOString().substring(0, 10),
    endingDate: new Date().toISOString().substring(0, 10),
    attendance: [],
    status: ServiceContractStatus.PENDING_SIGNATURE,
    rescheduleTerms: "",
    cancellationTerms: "",
    paymentMethod: "",
    professional: "", // This should be set from the logged-in user
    installmentAmount: 0,
    firstPaymentDate: new Date().toISOString().substring(0, 10),
    installments: 1,
  },
  steps: [
    { id: "client", title: "Cliente", icon: User, component: SelectClientStep },
    {
      id: "service",
      title: "Serviço",
      icon: HandshakeIcon,
      component: SelectServiceStep,
    },
    {
      id: "plan",
      title: "Plano",
      icon: ClipboardList,
      component: SelectPlanStep,
    },
    {
      id: "dates",
      title: "Período",
      icon: Calendar,
      component: SelectDatesStep,
    },
    {
      id: "attendance",
      title: "Frequência",
      icon: Clock,
      component: AttendanceStep,
    },
    { id: "terms", title: "Termos", icon: FileText, component: TermsStep },
    {
      id: "payment",
      title: "Pagamento",
      icon: CreditCard,
      component: PaymentStep,
    },
    {
      id: "preview",
      title: "Revisão",
      icon: FileCheck,
      component: PreviewStep,
    },
    { id: "success", title: "Sucesso", icon: Check, component: SuccessStep },
  ],
  onSubmit: async (formData: any) => {
    // This function now lives with its configuration
    const contractData = { ...formData } as CreateContractFormData; // Cast to the correct type
    try {
      await createServiceContract(contractData);
      toast.success("Contrato criado com sucesso!");
    } catch (error: any) {
      toast.error(`Erro ao criar contrato: ${error.message}`);
      // Re-throw the error to be caught by the store's submit logic
      throw error;
    }
  },
};
