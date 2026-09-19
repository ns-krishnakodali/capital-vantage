# AGENTS.md

## Role

Act as a senior frontend developer specializing in Next.js, React, TypeScript, and Tailwind CSS. Focus on building performant, scalable, responsive, and visually polished UI aligned with the application's theme and user experience goals.

---

## Core Objectives

- Deliver high-quality, interactive UI with strong visual consistency
- Ensure responsiveness across devices and screen sizes
- Maintain clean, maintainable, and scalable code
- Use TypeScript properly with clear and reusable types
- Align all UI decisions with the application's theme and product goals
- Prefer simple, direct implementations over unnecessary abstraction
- Keep the codebase easy to understand, extend, and review

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

---

## Project Structure

```txt
src/
  app/
  components/
  constants/
  hooks/
  services/
  types/
  utils/
```

### Folder Rules

- `app/` - Next.js routes, layouts, loading states, and page-level files
- `components/` - Small, reusable UI components used across the application
- `modules/` - Page-level or feature-level building blocks composed of multiple components, hooks, and logic
- `lib/` - API wrappers, data access logic, and external service integrations
- `constants/` - Shared static values, options, labels, and configuration constants
- `types/` - Shared TypeScript types, interfaces, enums, and reusable type utilities
- `utils/` - Shared helper functions and generic utility logic

---

## Index Exports

Use `index.ts` files for reusable folders such as `components/`, `constants/`, `hooks/`, `services/`, `types/`, and `utils/`.

Example:

```txt
components/
  button/
    index.tsx
  index.ts
```

```ts
export * from "./button";
```

Always import reusable modules from the folder root when possible.

```ts
import { Button } from "@/components";
import { APP_ROUTES } from "@/constants";
import type { UserProfile } from "@/types";
```

Avoid importing directly from deep internal paths unless there is a clear reason.

---

## TypeScript Standards

- Use TypeScript strictly and define types clearly
- Do not use `any` unless absolutely necessary
- Prefer `unknown` over `any` for external or uncertain data, then narrow it safely
- Define explicit types for component props
- Define reusable types in `src/types/` when shared across multiple files
- Keep feature-specific types close to the feature when they are not reused elsewhere
- Use `type` for unions, component props, API payloads, and simple object shapes
- Use `interface` when extension or declaration merging is useful
- Use type-only imports with `import type`
- Avoid duplicated type definitions
- Avoid overly complex generic types unless they clearly improve safety and reuse
- Do not create unnecessary types for simple values that TypeScript can infer clearly

Example:

```ts
type UserDetails = {
  name: string;
  email: string;
};

type UserDetailsFormProps = {
  initialValues?: UserDetails;
  onSubmit: (values: UserDetails) => void;
};

const UserDetailsForm = ({ initialValues, onSubmit }: UserDetailsFormProps) => {
  ...
};
```

---

## Coding Standards

- Use modern ES6+ syntax
- Use arrow functions consistently
- Use destructuring for component props when it improves readability
- Keep logic direct and easy to follow
- Avoid unnecessary abstractions
- Avoid variables that are only used once unless they improve readability or avoid repeated expensive work
- Inline simple one-time expressions
- Remove redundant branches, duplicate conditions, and unused code
- Add validation only at real boundaries, such as user input, route params, external API responses, or nullable optional data
- Do not add unnecessary guards, fallbacks, or defensive checks when the data shape is guaranteed internally

---

## Naming Conventions

- Use `camelCase` for variables and functions
- Use `PascalCase` for React components and type names
- Use `kebab-case` for folders and files
- Use clear and descriptive names
- Avoid vague names such as `data`, `item`, `temp`, or `value` unless the context is obvious

---

## Imports Order

Use the following import order:

1. Styling imports
2. Next.js and React imports.
3. External libraries in alphabetical order
4. Local imports in alphabetical order and grouped by folder
5. Type-only imports where appropriate

Example:

```ts
import "./globals.css";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button, Header } from "@/components";
import { APP_ROUTES } from "@/constants";
import { formatDate } from "@/utils";

import type { UserProfile } from "@/types";
```

---

## Components

- Keep components small and focused
- Define component props with clear TypeScript types
- Prefer composition over complex component logic
- Extract reusable logic into hooks only when reused or when it meaningfully simplifies the component
- Avoid deeply nested components
- Do not create wrapper components unless they reduce duplication or improve clarity
- Keep page-level logic in `app/` and reusable UI in `components/`
- Keep data-fetching and external calls out of presentational components when possible

---

## Styling

- Use Tailwind CSS for styling
- Avoid inline styles unless they are simpler or necessary for dynamic values
- Maintain consistent spacing, sizing, typography, and layout patterns
- Use responsive classes intentionally
- Keep visual hierarchy clear
- Avoid cluttered layouts
- Use transitions and microinteractions where they improve the experience

---

## UI and UX Expectations

- UI should feel modern, polished, and responsive
- Maintain consistency across pages, components, spacing, and typography
- Align design decisions with the application's theme
- Prioritize clarity, usability, and accessibility
- Use subtle animations where appropriate
- Avoid over-designed or distracting UI elements

---

## Error Handling

- Use `err` or a clear prefixed name such as `apiErr` or `formErr`
- Handle async errors properly
- Log important errors with `console.error`
- Avoid silent failures
- Do not add try/catch blocks around code that cannot reasonably fail
- Do not add fallback UI or recovery logic unless there is a real failure case

---

## Comments

- Keep comments minimal
- Do not add obvious comments
- Add a short comment only when the logic is complex or non-obvious

Example:

```ts
// Normalizes API response data before rendering it in the UI
const normalizeResponse = (response: ApiResponse): UserProfile => {
  ...
};
```

---

## Restrictions

- Do not use emojis unless already present in the existing code
- Do not use em-dashes
- Do not include unnecessary explanations in output
- Do not add yourself as part of the implementation

## Commit Messages

Use lowercase commit messages in the format `<tag>: <message>`.

Allowed tags:

- `fix`: bug fixes
- `feat`: backwards-compatible enhancements or rule changes that add reported problems
- `docs`: documentation-only changes
- `chore`: non-user-facing changes
- `build`: build-process-only changes
- `refactor`: changes that do not affect APIs or user experience
- `test`: test-only changes
- `ci`: CI configuration or script changes
- `perf`: performance improvements
- Do not add unnecessary variables
- Do not add unnecessary validations, guards, fallbacks, or defensive checks
- Do not over-engineer simple logic
- Do not introduce new libraries unless clearly needed
- Do not run `npm run dev`
