import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { useCreateService } from "@/hooks/api/professional/useService";
import { useCallback } from "react";
import { CreateServiceModel } from "@/models/service";
import Button from "@/components/ui/Button";

type CreateServiceModalProps = {};

const CreateServiceSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .max(500, "Descrição não pode exceder 500 caracteres"),
});

const CreateServiceModal: React.FC<CreateServiceModalProps> = ({}) => {
  type CreateServiceFormData = z.infer<typeof CreateServiceSchema>;
  const { mutate, isError, isSuccess, error } = useCreateService();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<CreateServiceFormData>({
    resolver: zodResolver(CreateServiceSchema),
  });

  // The function that will be called on form submission if validation passes
  const onSubmit = useCallback((data: CreateServiceModel) => {
    mutate(data);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Service Name Input */}
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
          className={`block w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          error={errors.name?.message}
          onChange={(e) => setValue("name", e.target.value)}
          value={watch("name") || ""}
        />
        <label
          htmlFor="description"
          className="block text-sm font-medium text-neutral-700 "
        >
          Descrição do Serviço
        </label>
        {/* Service Description Input */}
        <TextArea
          id="description"
          placeholder="Descreva o serviço..."
          className={` ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          onChange={(e) => setValue("description", e.target.value)}
          value={watch("description") || ""}
          error={errors.description?.message}
        />

        {/* Submission Button */}
        <Button type="submit" disabled={isSubmitting}>
          Salvar Serviço
        </Button>
      </form>
    </div>
  );
};

export default CreateServiceModal;
