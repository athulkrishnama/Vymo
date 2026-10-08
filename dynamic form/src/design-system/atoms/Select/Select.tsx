import type { SelectHTMLAttributes } from "react";
import styles from "./Select.module.css";

export interface SelectOptionItem {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOptionItem[];
  placeholder?: string;
  hasError?: boolean;
}

export function Select({
  options = [],
  placeholder = "Select an option",
  hasError = false,
  className = "",
  value,
  ...props
}: SelectProps) {
  const selectClass = `${styles.select} ${hasError ? styles.error : ""} ${className}`.trim();

  return (
    <div className={styles.selectWrapper}>
      <select
        className={selectClass}
        value={value}
        aria-invalid={hasError ? "true" : "false"}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className={styles.chevron} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 8l4 4 4-4" />
        </svg>
      </div>
    </div>
  );
}
