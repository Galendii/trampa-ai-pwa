import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const copyToClipboard = async (text: string) => {
  if (!text) {
    return;
  }

  // Modern way: The Clipboard API
  // Works only in secure contexts (HTTPS)
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Código copiado para a área de transferência");
      return; // Exit if successful
    } catch (error) {
      console.error("Falha ao copiar com a API Clipboard: ", error);
      // If it fails, it will proceed to the fallback method.
    }
  }

  // Fallback way: execCommand
  // This is the older, more widely supported method.
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Make the textarea invisible
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    document.execCommand("copy");
    document.body.removeChild(textArea);

    toast.success("Código copiado para a área de transferência");
  } catch (error) {
    console.error("Falha ao copiar com o método fallback: ", error);
    toast.error("Não foi possível copiar o código.");
  }
};
