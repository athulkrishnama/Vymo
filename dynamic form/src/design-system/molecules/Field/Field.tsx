import type { ReactNode } from "react";
import styles from "./Field.module.css";

export interface FieldProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required = false,
  children,
  className = ""
}: FieldProps) {
  const containerClass = `${styles.fieldWrapper} ${className}`.trim();

  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={htmlFor} className={styles.label}>
          {label}
          {required && (
            <span className={styles.requiredAsterisk} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className={styles.control}>{children}</div>

      {error ? (
        <span className={styles.error} role="alert">
          {error}
        </span>
      ) : hint ? (
        <span className={styles.hint}>{hint}</span>
      ) : null}
    </div>
  );
}
