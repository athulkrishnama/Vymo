                                                                                                                                            import type { FieldConfig, FormValues } from "./types";

export const leadFormConfig: FieldConfig[] = [
  {
    name: "fullName",
    type: "text",
    label: "Full name",
    placeholder: "e.g. Jane Doe",
    validations: [
      { type: "required", message: "Full name is required" }
    ]
  },
  {
    name: "email",
    type: "email",                                                                                                                                                                          
    label: "Email address",
    placeholder: "e.g. jane@example.com",
    validations: [
      { type: "required", message: "Email is required" },
      { type: "email", message: "Please enter a valid email address" }
    ]
  },
  {
    name: "leadType",
    type: "select",
    label: "Lead type",
    options: [
      { label: "Individual", value: "individual" },
      { label: "Company", value: "company" }
    ],
    validations: [
      { type: "required", message: "Lead type is required" }
    ]
  },
  {
    name: "companyName",
    type: "text",
    label: "Company name",
    placeholder: "e.g. Acme Industries",
    visibleWhen: {
      field: "leadType",
      equals: "company"
    },
    validations: [
      { type: "required", message: "Company name is required" }
    ]
  },
  {
    name: "phone",
    type: "text",
    label: "Phone number",
    placeholder: "e.g. 9876543210",
    validations: [
      { type: "required", message: "Phone number is required" },
      { type: "phone", message: "Phone number must contain exactly 10 digits" }
    ]
  },
  {
    name: "notes",
    type: "textarea",
    label: "Notes",
    placeholder: "Add any additional context (up to 200 characters)",
    layout: "full",
    validations: [
      { type: "maxLength", value: 200, message: "Notes cannot exceed 200 characters" }
    ]
  },
  {
    name: "consent",
    type: "checkbox",
    label: "I agree to the terms of service and consent to be contacted",
    layout: "full",
    validations: [
      { type: "required", message: "You must provide consent" }
    ]
  }
];

export const initialLeadFormValues: FormValues = {
  fullName: "",
  email: "",
  leadType: "individual",
  companyName: "",
  phone: "",
  notes: "",
  consent: false
};
