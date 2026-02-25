Convert a Figma design into a Jules prototype component.

## Instructions

1. The user will provide a Figma URL or describe the design.
2. If a Figma URL is provided, use the Figma MCP tools to get design context (get_design_context).
3. Analyze the design structure, spacing, colors, and typography.
4. Map Figma styles to Jules design tokens:
   - Colors → `jules-primary`, `jules-surface`, `jules-border`, etc.
   - Spacing → Tailwind spacing scale (p-2, p-3, p-4, gap-2, etc.)
   - Typography → `text-sm`, `text-xs`, `font-medium`, `font-semibold`
   - Borders → `border border-jules-border rounded-sm`
5. Build the component using existing Jules UI components (Card, Badge, Button, etc.).
6. Use realistic mock data from `@/lib/mock-data` where appropriate.
7. Ensure the result is pixel-close to the Figma design while staying within the Jules design system.

## Rules

- Always use Jules design tokens, never hardcode hex values.
- Prefer existing shared components over custom HTML.
- If a component doesn't exist yet, create it in `src/components/ui/` or `src/components/domain/`.
- Use `cn()` from `@/lib/utils` for conditional classes.

$ARGUMENTS
