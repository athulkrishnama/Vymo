import type { InputHTMLAttributes } from "react";
import styles from "./TextInput.module.css";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export function TextInput({
  hasError = false,
  className = "",
  type = "text",
  ...props
}: TextInputProps) {
  const inputClass = `${styles.input} ${hasError ? styles.error : ""} ${className}`.trim();

  return (
    <input
      type={type}
      className={inputClass}
      aria-invalid={hasError ? "true" : "false"}
      {...props}
    />
  );
}
