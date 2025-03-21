export interface ButtonProps {
  title: string;
  onClick?: ((e?: React.MouseEvent) => void) | (() => void);
  type?: "button" | "submit" | "reset";
  icon?: boolean;
  oval?: boolean;
  disabled?: boolean;
}