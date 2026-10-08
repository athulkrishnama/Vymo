export type FieldType =
  | "text"
  | "email"
  | "select"
  | "textarea"
  | "checkbox";

export type ValidationRule =
  | { type: "required"; message?: string }
  | { type: "email"; message?: string }
  | { type: "phone"; message?: string }
  | { type: "maxLength"; value: number; message?: string };

export interface SelectOption {
  label: string;
  value: string;
}

export interface VisibleCondition {
  field: string;
  equals: string;
}

export interface FieldConfig {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  options?: SelectOption[];
  layout?: "default" | "full";
  visibleWhen?: VisibleCondition;
  validations?: ValidationRule[];
}

export type FormValues = Record<string, string | boolean | undefined>;

export type FormErrors = Record<string, string>;

export type FormTouched = Record<string, boolean>;

export interface LeadFormData {
  fullName: string;
  email: string;
  leadType: "individual" | "company" | string;
  companyName?: string;
  phone: string;
  notes?: string;
  consent: boolean;
}
