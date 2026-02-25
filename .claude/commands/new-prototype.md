Create a new prototype in the Jules Prototype Playground.

## Instructions

1. Read CLAUDE.local.md to get the current user's username.
2. Ask for the prototype name and a brief description.
3. Generate a kebab-case slug from the name.
4. Create the prototype page at `src/app/prototypes/{username}/{slug}/page.tsx`.
5. Use the AppShell layout, PageHeader, and Jules design tokens.
6. Import realistic mock data from `@/lib/mock-data` where relevant.
7. Add the prototype to the `prototypeRegistry` array in `src/lib/mock-data.ts`.
8. Run `bun dev` to verify the prototype renders correctly.

## Template

The page should be a "use client" component that:
- Wraps content in `<AppShell>` with a `<PageHeader>`
- Uses Jules UI components (Card, Badge, Button, etc.)
- Includes interactive state with useState where appropriate
- Shows realistic Jules domain data (operations, containers, margins)
- Is responsive (mobile-first with Tailwind breakpoints)

$ARGUMENTS
