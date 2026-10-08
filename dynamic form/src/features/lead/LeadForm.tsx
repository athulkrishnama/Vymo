import { useState, type FormEvent } from "react";
import type { FieldConfig, FormErrors, FormTouched, FormValues } from "./types";
import { leadFormConfig, initialLeadFormValues } from "./config";
import { isFieldVisible, validateField, validateForm } from "./validation";
import { TextInput } from "../../design-system/atoms/TextInput/TextInput";
import { Select } from "../../design-system/atoms/Select/Select";
import { Textarea } from "../../design-system/atoms/Textarea/Textarea";
import { Checkbox } from "../../design-system/atoms/Checkbox/Checkbox";
import { Button } from "../../design-system/atoms/Button/Button";
import { Field } from "../../design-system/molecules/Field/Field";
import styles from "./LeadForm.module.css";

export interface LeadFormProps {
  config?: FieldConfig[];
  initialValues?: FormValues;
  onSubmitSuccess?: (values: FormValues) => void;
}

export function LeadForm({
  config = leadFormConfig,
  initialValues = initialLeadFormValues,
  onSubmitSuccess
}: LeadFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const handleValueChange = (name: string, value: string | boolean) => {
    const updatedValues = { ...values, [name]: value };
    setValues(updatedValues);

    // If already touched, re-validate on change
    if (touched[name]) {
      const field = config.find((f) => f.name === name);
      if (field) {
        const error = validateField(field, value, updatedValues);
        setErrors((prev) => {
          const next = { ...prev };
          if (error) {
            next[name] = error;
          } else {
            delete next[name];
          }
          return next;
        });
      }
    }

    // If changing a field that other fields depend on (e.g. leadType), clean up hidden fields' errors
    if (name === "leadType") {
      setErrors((prev) => {
        const next = { ...prev };
        config.forEach((f) => {
          if (f.visibleWhen && !isFieldVisible(f, updatedValues)) {
            delete next[f.name];
          }
        });
        return next;
      });
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const field = config.find((f) => f.name === name);
    if (field) {
      const error = validateField(field, values[name], values);
      setErrors((prev) => {
        const next = { ...prev };
        if (error) {
          next[name] = error;
        } else {
          delete next[name];
        }
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all visible fields as touched
    const allTouched: FormTouched = {};
    config.forEach((field) => {
      if (isFieldVisible(field, values)) {
        allTouched[field.name] = true;
      }
    });
    setTouched(allTouched);

    // Validate entire form against visible fields
    const formErrors = validateForm(config, values);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setSubmittedData(null);
      return;
    }

    // Clean data (only keep visible fields)
    const cleanedValues: FormValues = {};
    config.forEach((field) => {
      if (isFieldVisible(field, values)) {
        cleanedValues[field.name] = values[field.name];
      }
    });

    console.log("Form submitted successfully:", cleanedValues);
    setSubmittedData(cleanedValues);
    if (onSubmitSuccess) {
      onSubmitSuccess(cleanedValues);
    }
  };

  const renderControl = (field: FieldConfig, hasError: boolean) => {
    const value = values[field.name];
    const fieldId = `field-${field.name}`;

    switch (field.type) {
      case "text":
      case "email":
        return (
          <TextInput
            id={fieldId}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={typeof value === "string" ? value : ""}
            hasError={hasError}
            onChange={(e) => handleValueChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
          />
        );

      case "select":
        return (
          <Select
            id={fieldId}
            name={field.name}
            options={field.options}
            placeholder="Select..."
            value={typeof value === "string" ? value : ""}
            hasError={hasError}
            onChange={(e) => handleValueChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
          />
        );

      case "textarea":
        return (
          <>
            <Textarea
              id={fieldId}
              name={field.name}
              placeholder={field.placeholder}
              value={typeof value === "string" ? value : ""}
              hasError={hasError}
              onChange={(e) => handleValueChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field.name)}
            />
            {field.validations?.some((v) => v.type === "maxLength") && (
              <div className={styles.charCount}>
                {typeof value === "string" ? value.length : 0} /{" "}
                {field.validations.find((v) => v.type === "maxLength")?.value} characters
              </div>
            )}
          </>
        );

      case "checkbox":
        return (
          <Checkbox
            id={fieldId}
            name={field.name}
            checked={Boolean(value)}
            hasError={hasError}
            label={field.label}
            onChange={(e) => handleValueChange(field.name, e.target.checked)}
            onBlur={() => handleBlur(field.name)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.formCard}>
      <header className={styles.header}>
        <h2 className={styles.title}>Lead Generation</h2>
        <p className={styles.subtitle}>
          Please fill in the details below. Required fields are marked with an asterisk (*).
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {config.map((field) => {
          if (!isFieldVisible(field, values)) {
            return null;
          }

          const isRequired = field.validations?.some((v) => v.type === "required");
          const fieldError = touched[field.name] ? errors[field.name] : undefined;
          const hasError = Boolean(fieldError);
          const isFullWidth = field.layout === "full";
          const itemClass = `${styles.fieldItem} ${isFullWidth ? styles.fieldItemFull : ""}`.trim();
          const fieldId = `field-${field.name}`;

          // Checkbox renders its own label inside the atom
          if (field.type === "checkbox") {
            return (
              <div key={field.name} className={itemClass}>
                <Field error={fieldError}>
                  {renderControl(field, hasError)}
                </Field>
              </div>
            );
          }

          return (
            <div key={field.name} className={itemClass}>
              <Field
                label={field.label}
                htmlFor={fieldId}
                required={isRequired}
                error={fieldError}
              >
                {renderControl(field, hasError)}
              </Field>
            </div>
          );
        })}

        <div className={styles.submitContainer}>
          <Button type="submit" variant="primary">
            Submit Lead
          </Button>
        </div>
      </form>

      {submittedData && (
        <section className={styles.successCard} aria-live="polite">
          <div className={styles.successHeader}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Form submitted successfully</span>
          </div>
          <pre className={styles.jsonOutput}>
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </section>
      )}
    </div>
  );
}
