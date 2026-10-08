# Dynamic Lead Form

A modular, config-driven dynamic form application built with React, TypeScript, Vite, and CSS Modules.

## Run

```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```

## Structure

```text
src/
├── design-system/
│   ├── tokens/
│   │   ├── colors.css
│   │   ├── spacing.css
│   │   ├── typography.css
│   │   └── breakpoints.css
│   ├── atoms/
│   │   ├── TextInput/
│   │   ├── Select/
│   │   ├── Textarea/
│   │   ├── Checkbox/
│   │   └── Button/
│   └── molecules/
│       └── Field/
│
├── features/
│   └── lead/
│       ├── config.ts
│       ├── types.ts
│       ├── validation.ts
│       ├── LeadForm.tsx
│       ├── LeadForm.module.css
│       └── LeadPage.tsx
│
├── App.tsx
└── main.tsx
```

## Architecture

- **Configuration (`src/features/lead/config.ts`)**: Defines the form fields, labels, layout types (`default` or `full`), conditional visibility rules (`visibleWhen`), and validation rules. Adding or modifying a field only requires editing this config.
- **Pure Validation Engine (`src/features/lead/validation.ts`)**: Framework-agnostic validation layer checking required, email, 10-digit phone number, and maxLength rules. Visibility evaluation (`isFieldVisible`) skips hidden fields from both rendering and validation.
- **Design System (`src/design-system/`)**:
  - `tokens/`: Centralized CSS variables for colors, typography, spacing, and breakpoints.
  - `atoms/`: Dumb presentational components (`TextInput`, `Select`, `Textarea`, `Checkbox`, `Button`) without business or validation logic.
  - `molecules/`: Reusable `Field` molecule standardizing label, required indicator, control container, hint, and error message rendering.
- **Dynamic Form Renderer (`src/features/lead/LeadForm.tsx`)**: Maps config fields to atoms, manages form state (`values`, `errors`, `touched`), dynamically evaluates conditional visibility, and displays submitted payload upon success.

## Responsive Layout

- Desktop uses a 2-column CSS Grid (`grid-template-columns: repeat(2, minmax(0, 1fr))`) with full-width spans for textarea, consent, and submit container.
- Mobile (< 768px) switches to a single-column grid with a sticky bottom submit bar for mobile accessibility.
