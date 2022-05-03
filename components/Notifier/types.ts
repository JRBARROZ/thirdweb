export interface Notifier {
  open: boolean;
  severity: "success" | "warning" | "error";
  text: string;
}
