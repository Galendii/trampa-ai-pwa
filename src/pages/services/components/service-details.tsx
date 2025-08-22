import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { useUpdateService } from "@/hooks/api/professional/useService";
import { PlanModel } from "@/models/plan";
import { CreateServiceModel, ServiceModel } from "@/models/service";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import {
  CheckIcon,
  EditIcon,
  Loader2,
  PencilIcon,
  PlusCircleIcon,
  TextSelectIcon,
  TrashIcon,
} from "lucide-react";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PlanModal from "./modals/plan-modal";
import { useModalContext } from "@/contexts/ModalContext";
import { useGetPlans } from "@/hooks/api/professional/usePlans";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { getPlans } from "@/api/professional/services/plans";

type ServiceDetailsProps = {
  selectedService?: ServiceModel | null;
};

const UpdateServiceSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string(),
});

const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  selectedService = null,
}) => {
  type UpdateServiceFormData = z.infer<typeof UpdateServiceSchema>;
  const [selectedPlan, setSelectedPlan] = useState<PlanModel | null>(null);
  const [editionEnabled, setEditionEnabled] = useState<boolean>(false);
  const { closeModal, openModal } = useModalContext();
  const { mutate, isPending } = useUpdateService();

  const {
    formState: { isDirty, isSubmitting, errors },
    handleSubmit,
    reset,
    register,
    setValue,
  } = useForm<UpdateServiceFormData>({
    resolver: zodResolver(UpdateServiceSchema),
    defaultValues: {
      name: selectedService?.name || "",
      description: selectedService?.description || "",
    },
  });

  // Atualiza os dados do formulário quando o serviço selecionado mudar
  useEffect(() => {
    if (selectedService) {
      reset({
        name: selectedService.name,
        description: selectedService.description,
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
    // Ao mudar o serviço, desabilita a edição
    setEditionEnabled(false);
    setSelectedPlan(null);
  }, [selectedService, reset]);

  const handlePlanCreationModal = useCallback(() => {
    if (!selectedService) {
      return;
    }
    openModal(
      <PlanModal
        serviceId={selectedService.id}
        onSuccess={() => {
          closeModal();
        }}
      />
    );
  }, [selectedService, openModal, closeModal]);

  const handlePlanUpdateModal = useCallback(() => {
    if (!selectedService || !selectedPlan) {
      return;
    }
    openModal(
      <PlanModal
        key={selectedPlan.id}
        serviceId={selectedService.id}
        plan={selectedPlan}
        onSuccess={closeModal}
      />
    );
  }, [selectedService, selectedPlan, openModal, closeModal]);

  const onSubmit = useCallback(
    (data: UpdateServiceFormData) => {
      if (isDirty) {
        if (!data.name) {
          // Note: use of setError is removed in the form, as Zod resolver handles it
          return;
        }
        mutate({
          serviceData: data,
          serviceId: selectedService?.id!,
        });
      }
    },
    [isDirty, mutate, selectedService]
  );

  const handleToggleEdition = useCallback(() => {
    if (editionEnabled) {
      handleSubmit(onSubmit)();
    } else {
      setEditionEnabled(true);
    }
  }, [editionEnabled, handleSubmit, onSubmit]);

  const renderPlansList = useCallback(
    (plan: PlanModel): React.ReactElement => {
      return (
        <div
          key={`plan-${plan.id}`}
          onClick={() => setSelectedPlan(plan)}
          className={clsx(
            "border-slate-300 hover:border-primary-300 border border-l-4 cursor-pointer p-2 rounded transition-all duration-300 my-4",
            {
              "border-l-[10px] border-primary-500 hover:border-primary-500":
                plan.id === selectedPlan?.id,
            }
          )}
        >
          <div className="flex items-center relative">
            <div>
              <p className="text-md text-neutral-800">{plan.name}</p>
              <p className="text-sm md:text-md text-neutral-800 my-2">
                {Intl.NumberFormat("pt-Br", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(plan.price))}{" "}
                - {plan.duration} meses - {plan.frequency}x por semana
              </p>
              <div
                className={clsx("rounded w-fit mb-2 p-2", {
                  "bg-green-200 text-green-800": plan.active,
                  "bg-gray-200 text-gray-800": !plan.active,
                })}
              >
                <p className="text-xs md:text-sm">
                  {plan.active ? "Ativo" : "Inativo"}
                </p>
              </div>
              {plan.id === selectedPlan?.id && (
                <div className="flex items-center gap-2 w-full">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanUpdateModal();
                    }}
                    className="hover:bg-slate-200 p-1 transition-all"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="hover:bg-slate-200 p-1 transition-all"
                  >
                    <TrashIcon className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    },
    [handlePlanUpdateModal, selectedPlan, selectedService]
  );

  if (!selectedService) {
    return (
      <div className="flex flex-col items-center gap-2 border w-1/3 border-slate-300 p-4 rounded-md">
        <TextSelectIcon className="h-12 w-12" />
        <p className="text-md text-neutral-800">Nenhum serviço selecionado</p>
      </div>
    );
  }

  // Define a lista de planos a ser renderizada:
  // 1. Prioriza os dados do React Query (plansData).
  // 2. Se a query estiver carregando, usa a lista inicial de service.plans.
  // Isso evita o "flicker" e mantém a UI responsiva.

  return (
    <div className="w-full h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            type="submit"
            variant="outline"
            onClick={handleToggleEdition}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : !editionEnabled ? (
              <EditIcon className="h-4 w-4 mr-2" />
            ) : (
              <CheckIcon className="h-4 w-4 mr-2" />
            )}
            {!editionEnabled ? (
              <span className="text-sm">Editar Serviço</span>
            ) : (
              <span className="text-sm">Salvar</span>
            )}
          </Button>
          <Button onClick={handlePlanCreationModal} variant="outline">
            <PlusCircleIcon className="h-4 w-4 mr-2" />
            <span className="text-sm">Criar Plano</span>
          </Button>
        </div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-neutral-700"
        >
          Nome do Serviço
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Ex: Treino Personalizado"
          className={`mt-2 mb-4 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          error={errors.name?.message}
          {...register("name")}
          disabled={!editionEnabled}
        />
        <label
          htmlFor="description"
          className="block text-sm font-medium text-neutral-700 my-2"
        >
          Descrição do Serviço
        </label>
        <TextArea
          id="description"
          placeholder="Descreva o serviço..."
          className={` ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          {...register("description")}
          disabled={!editionEnabled}
        />
      </form>

      {/* Plans Section */}
      <h2 className="text-xl font-bold mt-8 mb-4">Planos</h2>
      <InfiniteScroll<PlanModel>
        key={selectedService.id}
        fetchData={(pageData: any) => getPlans(selectedService.id, pageData)}
        className="mt-4"
        queryKey={["service-plans", selectedService.id]}
        renderData={renderPlansList}
        disabled={!selectedService}
      />
    </div>
  );
};

export default ServiceDetails;
