import type { TextareaHTMLAttributes } from "react";
import styles from "./Textarea.module.css";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export function Textarea({
  hasError = false,
  className = "",
  rows = 4,
  ...props
}: TextareaProps) {
  const textareaClass = `${styles.textarea} ${hasError ? styles.error : ""} ${className}`.trim();

  return (
    <textarea
      rows={rows}
      className={textareaClass}
      aria-invalid={hasError ? "true" : "false"}
      {...props}
    />
  );
}
