import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  hasError?: boolean;
  label?: ReactNode;
}

export function Checkbox({
  checked = false,
  hasError = false,
  disabled = false,
  label,
  className = "",
  id,
  ...props
}: CheckboxProps) {
  const containerClass = `${styles.checkboxContainer} ${disabled ? styles.disabled : ""} ${className}`.trim();
  const controlClass = `${styles.control} ${checked ? styles.checked : ""} ${hasError ? styles.error : ""}`.trim();

  return (
    <label className={containerClass} htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        className={styles.input}
        aria-invalid={hasError ? "true" : "false"}
        {...props}
      />
      <span className={controlClass} aria-hidden="true">
        {checked && (
          <svg className={styles.checkmark} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="4 11 8 15 16 6" />
          </svg>
        )}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
