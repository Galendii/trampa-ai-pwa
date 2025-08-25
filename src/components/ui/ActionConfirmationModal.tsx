import Button from "./Button";

export const ActionConfirmationModal = ({
  onConfirm,
  onCancel,
  title = "Confirmação",
  message = "Tem certeza que deseja prosseguir com essa ação?",
  isLoading = false,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
  isLoading?: boolean;
}) => {
  const handleConfirmation = () => {
    try {
      onConfirm();
    } catch (error) {
      console.error(error);
    } finally {
      onCancel();
    }
  };
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <p>{message}</p>
      <div className="flex justify-end mt-4">
        <Button disabled={isLoading} className="mr-4" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          onClick={handleConfirmation}
          variant="danger"
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
};
