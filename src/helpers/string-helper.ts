export class StringHelper {
  constructor() {}

  public removeSpecialCharacters(text: string): string {
    return text.replace(/[^\w]/gi, "");
  }
  public formatAsPhoneNumber(text: string): string {
    return text.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  public formatAsCPF(text: string): string {
    return text.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
}
