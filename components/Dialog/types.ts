export interface IDialogProps {
  children: React.ReactNode;
  open: boolean;
  title: string;
  onClose: () => void;
}
