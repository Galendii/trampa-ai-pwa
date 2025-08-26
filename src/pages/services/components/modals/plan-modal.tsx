import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle, Save } from "lucide-react";
import { z } from "zod";

import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  useCreatePlan,
  useUpdatePlan,
} from "@/hooks/api/professional/usePlans";
import { PlanCreateModel, PlanModel } from "@/models/plan";

// ----------------------------------------------------
// Define o esquema de validação do formulário com Zod
// ----------------------------------------------------
const PlanSchema = z.object({
  name: z.string().min(1, "O nome do plano é obrigatório"),
  price: z.number().min(1, "O preço é obrigatório"),
  duration: z.number().min(1, "A duração deve ser no mínimo 1"),
  frequency: z.number().min(1, "A frequência deve ser no mínimo 1"),
});

type PlanModalProps = {
  plan?: PlanModel; // A prop opcional para edição
  onSuccess: () => void; // Callback para quando a operação for bem-sucedida
  serviceId: string;
};

// ----------------------------------------------------
// Componente principal PlanModal
// ----------------------------------------------------
const PlanModal: React.FC<PlanModalProps> = ({
  plan,
  onSuccess,
  serviceId,
}) => {
  type PlanFormData = z.infer<typeof PlanSchema>;

  const { mutate: createPlan, isPending: isCreating } =
    useCreatePlan(serviceId);
  const { mutate: updatePlan, isPending: isUpdating } =
    useUpdatePlan(serviceId);

  const isEditing = !!plan;
  const isSubmitting = isCreating || isUpdating;

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<PlanFormData>({
    resolver: zodResolver(PlanSchema),
  });

  // UseEffect para preencher o formulário se o modo for de edição
  useEffect(() => {
    if (plan) {
      // Usa reset para preencher o formulário com os dados do plano
      reset({
        name: plan.name,
        price: plan.price,
        duration: plan.duration,
        frequency: plan.frequency,
      });
    }
  }, [plan, reset]);

  // Função chamada na submissão do formulário
  const onSubmit = useCallback(
    (data: PlanFormData) => {
      try {
        if (isEditing) {
          // Lógica para edição: chama o hook de atualização com o ID do plano
          updatePlan({ ...data, service: serviceId, id: plan.id });
        } else {
          // Lógica para criação: chama o hook de criação
          createPlan({ ...data, service: serviceId } as PlanCreateModel);
        }
        onSuccess(); // Chama o callback de sucesso
      } catch (error) {
        console.error("Erro na submissão do formulário:", error);
        // Exemplo: mostrar um toast de erro ou mensagem para o usuário
      }
    },
    [isEditing, plan, createPlan, updatePlan, onSuccess]
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6 text-neutral-800">
        {isEditing ? "Editar Plano" : "Criar Novo Plano"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nome do Plano */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-neutral-700"
          >
            Nome do Plano
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Ex: Plano Bronze Mensal"
            className={`${errors.name ? "border-red-500" : "border-gray-300"}`}
            error={errors.name?.message}
            onChange={(e) => setValue("name", e.target.value)}
            value={watch("name") || ""}
          />
        </div>

        {/* Preço */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-neutral-700"
          >
            Preço (R$)
          </label>
          <Input
            id="price"
            type="number"
            placeholder="Ex: 99.90"
            className={`${errors.price ? "border-red-500" : "border-gray-300"}`}
            error={errors.price?.message}
            onChange={(e) => setValue("price", Number(e.target.value))}
            value={watch("price") || ""}
          />
        </div>

        {/* Duração */}
        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-neutral-700"
          >
            Duração (em meses)
          </label>
          <Input
            id="duration"
            type="number"
            placeholder="Ex: 4"
            className={`${
              errors.duration ? "border-red-500" : "border-gray-300"
            }`}
            error={errors.duration?.message}
            onChange={(e) => setValue("duration", e.target.valueAsNumber)}
            value={watch("duration") || ""}
          />
        </div>

        {/* Frequência */}
        <div>
          <label
            htmlFor="frequency"
            className="block text-sm font-medium text-neutral-700"
          >
            Frequência (aulas por semana)
          </label>
          <Input
            id="frequency"
            type="number"
            placeholder="Ex: 3"
            className={`${
              errors.frequency ? "border-red-500" : "border-gray-300"
            }`}
            error={errors.frequency?.message}
            onChange={(e) => setValue("frequency", e.target.valueAsNumber)}
            value={watch("frequency") || ""}
          />
        </div>

        {/* Botão de Submissão */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : isEditing ? (
            <div className="flex items-center gap-2">
              <Save size={20} /> Salvar Alterações
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <PlusCircle size={20} /> Criar Plano
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default PlanModal;
