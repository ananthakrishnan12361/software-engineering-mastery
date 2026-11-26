import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "small" | "primary" | "secondary" | "danger" | "pill" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  small: "btn-small",
  primary: "btn-primary",
  secondary: "btn-secondary",
  danger: "btn-danger",
  pill: "pill-btn",
  icon: "icon-btn"
};

export function Button({ variant = "small", className = "", type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={`${VARIANT_CLASS[variant]} ${className}`.trim()} {...rest} />;
}
