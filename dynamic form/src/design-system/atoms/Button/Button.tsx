import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export function Button({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  const buttonClass = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonClass}
      {...props}
    >
      {children}
    </button>
  );
}
