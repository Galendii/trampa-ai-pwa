import Button from "./Button";

export const ActionConfirmationModal = ({
  onConfirm,
  onCancel,
  title = "Confirmação",
  message = "Tem certeza que deseja prosseguir com essa ação?",
}: {
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
}) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <p>{message}</p>
      <div className="flex justify-end mt-4">
        <Button onClick={onCancel}>Cancelar</Button>
        <Button onClick={onConfirm} variant="danger">
          Excluir
        </Button>
      </div>
    </div>
  );
};
