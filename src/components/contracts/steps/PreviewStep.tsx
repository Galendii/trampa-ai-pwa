"use client";

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { format } from "date-fns";
import { FileCheck, Loader2, Printer } from "lucide-react";

// Components
import Button from "@/components/ui/Button";
// Hooks & Context
import { useGetByClientId } from "@/hooks/api/professional/useClients";
import { useGetPlanById } from "@/hooks/api/professional/usePlans";
import { useGetServiceById } from "@/hooks/api/professional/useService";
import { useUser } from "@/hooks/api/useUsers";
import { useWizardStore } from "@/stores/useWizardStore";

import { PAYMENT_METHOD_OPTIONS } from "../create-contract-wizard";

// Helper for weekday labels
const WEEKDAY_LABELS: { [key: string]: string } = {
  monday: "Segunda-feira",
  tuesday: "Terça-feira",
  wednesday: "Quarta-feira",
  thursday: "Quinta-feira",
  friday: "Sexta-feira",
  saturday: "Sábado",
  sunday: "Domingo",
};

const PreviewStep = () => {
  const { formData } = useWizardStore();
  const { service, plan, client } = formData;
  const contractRef = useRef<HTMLDivElement>(null);

  // --- Aggregate Data from Hooks ---
  const { data: professional, isLoading: isLoadingProf } = useUser();
  const { data: clientData, isLoading: isLoadingClient } =
    useGetByClientId(client);
  const { data: serviceData, isLoading: isLoadingService } =
    useGetServiceById(service);
  const { data: planData, isLoading: isLoadingPlan } = useGetPlanById(
    plan,
    service
  );

  const isLoading =
    isLoadingProf || isLoadingClient || isLoadingService || isLoadingPlan;

  // --- Print and Download Handlers ---
  const handlePrint = useReactToPrint({
    contentRef: contractRef,
    documentTitle: `Contrato-${clientData?.firstName}-${serviceData?.name}`,
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          <span className="ml-4 text-slate-700">
            Gerando prévia do contrato...
          </span>
        </div>
      );
    }

    if (!professional || !clientData || !serviceData || !planData) {
      return (
        <p className="text-center text-red-500 py-8">
          Não foi possível carregar os dados. Por favor, verifique os passos
          anteriores.
        </p>
      );
    }

    return (
      <>
        <div className="flex justify-end gap-2 mb-4 print:hidden">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" /> Imprimir
          </Button>
        </div>

        <div
          ref={contractRef}
          className="p-6 border rounded-lg bg-white text-sm text-slate-700 contract-preview"
        >
          <h2 className="text-center font-bold text-xl mb-6 text-slate-900">
            CONTRATO DE PRESTAÇÃO DE SERVIÇOS
          </h2>

          <div className="space-y-4 mb-6">
            <div>
              <h3 className="font-bold text-slate-800">CONTRATANTE:</h3>
              <p>
                {clientData.firstName} {clientData.lastName}, portador(a) do CPF
                nº {clientData.cpf}.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">CONTRATADO(A):</h3>
              <p>
                {professional.firstName} {professional.lastName}, portador(a) do
                CPF nº {professional.cpf}.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-justify">
            <p>
              <strong className="text-slate-800">
                CLÁUSULA 1ª - DO OBJETO:
              </strong>{" "}
              O presente contrato tem por objeto a prestação de serviços de{" "}
              <strong>{serviceData.name}</strong>, referente ao{" "}
              <strong>{planData.name}</strong>.
            </p>

            <p>
              <strong className="text-slate-800">
                CLÁUSULA 2ª - DA FREQUÊNCIA E HORÁRIOS:
              </strong>{" "}
              As sessões ocorrerão nos seguintes dias e horários:{" "}
              {formData.attendance
                .map((a: any) => `${WEEKDAY_LABELS[a.weekday]} às ${a.time}`)
                .join(", ")}
              .
            </p>

            <p>
              <strong className="text-slate-800">
                CLÁUSULA 3ª - DO PRAZO:
              </strong>{" "}
              O contrato terá vigência de{" "}
              <strong>{planData.duration} meses</strong>, iniciando em{" "}
              <strong>
                {format(new Date(formData.startingDate), "dd/MM/yyyy")}
              </strong>{" "}
              e terminando em{" "}
              <strong>
                {format(new Date(formData.endingDate), "dd/MM/yyyy")}
              </strong>
              .
            </p>

            <p>
              <strong className="text-slate-800">
                CLÁUSULA 4ª - DO PAGAMENTO:
              </strong>{" "}
              O valor total de{" "}
              <strong>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(planData.price)}
              </strong>{" "}
              será pago em <strong>{formData.installments} parcela(s)</strong>{" "}
              de{" "}
              <strong>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(formData.installmentAmount)}
              </strong>
              , via{" "}
              <strong>
                {
                  PAYMENT_METHOD_OPTIONS.find(
                    (p) => p.value === formData.paymentMethod
                  )?.label
                }
              </strong>
              . O primeiro pagamento será em{" "}
              <strong>
                {format(new Date(formData.firstPaymentDate), "dd/MM/yyyy")}
              </strong>
              .
            </p>

            <p>
              <strong className="text-slate-800">
                CLÁUSULA 5ª - DO REAGENDAMENTO:
              </strong>{" "}
              {formData.rescheduleTerms}.
            </p>
            <p>
              <strong className="text-slate-800">
                CLÁUSULA 6ª - DO CANCELAMENTO:
              </strong>{" "}
              {formData.cancellationTerms}.
            </p>
          </div>

          <div className="mt-24 flex flex-col gap-y-16 justify-around text-start">
            <div>
              <p className="border-t pt-2 w-64">Assinatura do CONTRATANTE</p>
              <p className="text-xs">
                {clientData.firstName} {clientData.lastName}
              </p>
            </div>
            <div>
              <p className="border-t pt-2 w-64">Assinatura do CONTRATADO(A)</p>
              <p className="text-xs">
                {professional.firstName} {professional.lastName}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6 print:hidden">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileCheck className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Revise e Confirme o Contrato
        </h3>
        <p className="text-slate-600">
          Confira todos os detalhes abaixo. Se tudo estiver correto, finalize a
          criação do contrato.
        </p>
      </div>
      {renderContent()}
    </div>
  );
};

export default PreviewStep;
