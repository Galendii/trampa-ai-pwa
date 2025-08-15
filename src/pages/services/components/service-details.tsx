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
  PencilIcon,
  PlusCircleIcon,
  TextSelectIcon,
  TrashIcon,
} from "lucide-react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ServiceDetailsProps = {
  selectedService?: ServiceModel | null;
};
const UpdateServiceSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  selectedService = null,
}) => {
  type UpdateServiceFormData = z.infer<typeof UpdateServiceSchema>;
  const [selectedPlan, setSelectedPlan] = useState<PlanModel | null>(null);
  const [editionEnabled, setEditionEnabled] = useState<boolean>(false);
  const { mutate, isPending } = useUpdateService();
  const {
    formState: { isDirty, isSubmitting, errors },
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    register,
  } = useForm<UpdateServiceFormData>({
    resolver: zodResolver(UpdateServiceSchema),
    defaultValues: {
      name: selectedService?.name || "",
      description: selectedService?.description || "",
    },
  });

  // ✨ This useEffect is the fix. It resets the form whenever a new service is selected.
  useEffect(() => {
    if (selectedService) {
      reset({
        name: selectedService.name,
        description: selectedService.description,
      });
    } else {
      // Also reset if the selection is cleared
      reset({
        name: "",
        description: "",
      });
    }
  }, [selectedService, reset]);

  const onSubmit = useCallback(
    (data: UpdateServiceFormData) => {
      // Only run the mutation if the form has been changed
      if (isDirty) {
        // Validate name and then mutate
        if (!data.name) {
          setError("name", { type: "manual", message: "Nome é obrigatório" });
          return;
        }

        mutate(
          {
            serviceData: data,
            serviceId: selectedService?.id!,
          },
          {
            // This onSuccess callback is a good place to reset the form state
            onSuccess: () => {
              setEditionEnabled(false);
            },
          }
        );
      }
    },
    [isDirty, mutate, selectedService, setError]
  );

  const handleToggleEdition = useCallback(() => {
    // If we are in edit mode and the form is dirty, submit the form.
    if (editionEnabled) {
      handleSubmit(onSubmit)();
    } else {
      // If we are not in edit mode, just enable it
      setEditionEnabled(true);
    }
  }, [editionEnabled, handleSubmit, onSubmit]);

  if (!selectedService) {
    return (
      <div className="flex flex-col items-center gap-2 border w-1/3 border-slate-300 p-4 rounded-md">
        <TextSelectIcon className="h-12 w-12" />
        <p className="text-md text-neutral-800">Nenhum plano selecionado</p>
      </div>
    );
  }
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <div className="w-full h-full">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <div className="flex items-center justify-between  mb-4">
            <Button
              type="submit"
              variant="outline"
              onClick={handleToggleEdition}
              isLoading={isPending}
            >
              {!editionEnabled ? (
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
            <Button variant="outline">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              <span className="text-sm">Criar Plano </span>
            </Button>
          </div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-neutral-700 "
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

        {/* Plans */}
        {selectedService.plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => {
              setSelectedPlan(plan);
            }}
            className={clsx(
              "border-slate-300 hover:border-primary-300 border border-l-4 cursor-pointer p-2 rounded transition-all duration-300 my-4",
              {
                "border-l-[10px] border-primary-500 hover:border-primary-500":
                  plan.id === selectedPlan?.id,
              }
            )}
          >
            <div className="flex items-center relative">
              {/* Plan details */}
              <div>
                <p className="text-md text-neutral-800">{plan.name}</p>
                <p className="text-sm md:text-md text-neutral-800 my-2">
                  {Intl.NumberFormat("pt-Br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(plan.price))}{" "}
                  - {plan.duration} meses - {plan.frequency}x por semana
                </p>
                {/* Tag */}
                <div
                  className={clsx("rounded w-fit mb-2 bg-slate-300 p-2", {
                    "bg-primary-300": plan.active,
                  })}
                >
                  <p className="text-xs md:text-sm text-neutral-800">
                    {plan.active ? "Ativo" : "Inativo"}
                  </p>
                </div>
                {/* Actions row */}
                {plan.id === selectedPlan?.id && (
                  <div className="flex items-center gap-2 w-full">
                    <button className="hover:bg-slate-200 p-1 transition-all">
                      <PencilIcon className="h-4 w-4 " />
                    </button>
                    <button className="hover:bg-slate-200 p-1 transition-all">
                      <TrashIcon className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Suspense>
  );
};

export default ServiceDetails;
