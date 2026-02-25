# Jules Prototype Playground

## What is this?
A shared Next.js app for the Jules AI product team to rapidly prototype features.
Each team member has a namespace under `src/app/prototypes/[name]/`.
Prototypes use shared components that match the Jules design system.

## Tech stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui as base (customized to Jules DS)
- Bun as package manager
- Deployed on Vercel

## Jules Product Context
Jules is a vertical SaaS ERP for recycling and waste commodity trading.
It is built by MineHub Technologies (TSX.V: MHUB).

### Core domain entities:
- **Operation**: A trade deal (buy + sell) with one or more containers
- **Container**: Physical unit of goods (identified by container number, e.g. MSCU1234567)
- **Invoice**: Financial document linked to an operation (purchase invoice, sale invoice, freight invoice)
- **Booking**: Shipping logistics linked to containers
- **Letter of Credit (LC)**: Payment guarantee document
- **Commodity**: The traded material (e.g., PET flakes, HDPE pellets, OCC bales, copper cathodes)
- **Contact**: Trading partners (suppliers, buyers, freight forwarders, banks)

### Key business logic:
- Margins = Sale price - Purchase price - Costs (freight, insurance, commissions, etc.)
- Pricing can be fixed or indexed (linked to commodity price indices like ICIS, Fastmarkets)
- Operations flow: Draft -> Confirmed -> In Progress -> Completed
- Container statuses: Booked -> Loaded -> In Transit -> Arrived -> Delivered
- Multi-currency support (USD, EUR, GBP, CNY primarily)

### UI patterns in Jules:
- Left sidebar navigation with collapsible sections
- Data tables with inline editing, filters, column sorting
- Detail pages with tabbed sections (General, Containers, Invoices, Documents, Margin)
- Status badges with color coding (draft=gray, confirmed=blue, in-progress=orange, completed=green)
- Split-pane views for document comparison
- Margin computation panels with real-time calculation
- Dashboard cards with KPIs and sparklines

## Design System Tokens

### Colors (placeholder -- extract from Figma for exact values):
- Primary: #2563EB (blue-600)
- Secondary: #64748B (slate-500)
- Success: #16A34A (green-600)
- Warning: #D97706 (amber-600)
- Danger: #DC2626 (red-600)
- Background: #FFFFFF
- Surface: #F8FAFC (slate-50)
- Border: #E2E8F0 (slate-200)
- Text primary: #0F172A (slate-900)
- Text secondary: #64748B (slate-500)

### Typography:
- Font family: Inter (fallback: system-ui, sans-serif)
- Headings: Semi-bold
- Body: Regular, 14px base
- Small/labels: 12px
- Mono (for numbers/codes): JetBrains Mono

### Spacing scale:
- Uses 4px grid (4, 8, 12, 16, 20, 24, 32, 40, 48, 64)

### Border radius:
- Small: 4px (inputs, badges)
- Medium: 8px (cards, dialogs)
- Large: 12px (modals, panels)

## Coding conventions
- Use TypeScript strict mode
- Functional components with hooks
- Use Tailwind utility classes, avoid custom CSS
- Component files: PascalCase (e.g., OperationCard.tsx)
- Utility files: camelCase (e.g., formatCurrency.ts)
- Use `cn()` utility for conditional class merging (from shadcn)
- Mock data in `src/lib/mock-data.ts` -- keep it realistic

## When creating a new prototype:
1. Create a folder under `src/app/prototypes/[your-name]/[prototype-name]/`
2. Add a `page.tsx` as the entry point
3. Use shared components from `src/components/`
4. Add mock data if needed to `src/lib/mock-data.ts`
5. Register the prototype in the homepage listing

## Important rules:
- NEVER modify another person's prototype directory
- ALWAYS use the shared design tokens (don't hardcode colors)
- Prototypes should be self-contained (no shared state between prototypes)
- Use realistic mock data that reflects actual Jules usage
- Include edge cases: empty states, loading states, error states, long text, multi-currency

## After building:
- Run ESLint and fix any errors
- Run TypeScript type checking
- Open the prototype in Chrome to verify it works
- If browser MCP is available, navigate to the prototype URL and verify visually
