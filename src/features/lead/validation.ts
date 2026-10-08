import type { FieldConfig, FormErrors, FormValues } from "./types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;

export function isFieldVisible(field: FieldConfig, values: FormValues): boolean {
  if (!field.visibleWhen) {
    return true;
  }

  const dependentValue = values[field.visibleWhen.field];
  return dependentValue === field.visibleWhen.equals;
}

export function validateField(
  field: FieldConfig,
  value: unknown,
  values: FormValues = {}
): string | undefined {
  if (!isFieldVisible(field, values)) {
    return undefined;
  }

  if (!field.validations || field.validations.length === 0) {
    return undefined;
  }

  for (const rule of field.validations) {
    if (rule.type === "required") {
      if (field.type === "checkbox") {
        if (value !== true) {
          return rule.message || `${field.label} is required`;
        }
      } else {
        if (value === undefined || value === null || String(value).trim() === "") {
          return rule.message || `${field.label} is required`;
        }
      }
    }

    // For non-required validations, skip if value is empty
    const stringValue = value !== undefined && value !== null ? String(value).trim() : "";
    if (stringValue === "") {
      continue;
    }

    if (rule.type === "email") {
      if (!EMAIL_REGEX.test(stringValue)) {
        return rule.message || "Please enter a valid email address";
      }
    }

    if (rule.type === "phone") {
      // Must contain exactly 10 digits
      const digitsOnly = stringValue.replace(/\D/g, "");
      if (!PHONE_REGEX.test(stringValue) && digitsOnly.length !== 10) {
        return rule.message || "Phone number must contain 10 digits";
      }
      if (!/^\d{10}$/.test(digitsOnly)) {
        return rule.message || "Phone number must contain 10 digits";
      }
    }

    if (rule.type === "maxLength") {
      if (String(value).length > rule.value) {
        return rule.message || `${field.label} cannot exceed ${rule.value} characters`;
      }
    }
  }

  return undefined;
}

export function validateForm(
  config: FieldConfig[],
  values: FormValues
): FormErrors {
  const errors: FormErrors = {};

  for (const field of config) {
    if (!isFieldVisible(field, values)) {
      continue;
    }

    const value = values[field.name];
    const error = validateField(field, value, values);

    if (error) {
      errors[field.name] = error;
    }
  }

  return errors;
}
