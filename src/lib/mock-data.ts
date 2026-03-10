// Realistic Jules domain mock data

export interface Operation {
  id: string
  reference: string
  status: "draft" | "confirmed" | "in-progress" | "completed"
  commodity: string
  supplier: string
  buyer: string
  purchasePrice: number
  salePrice: number
  currency: string
  quantity: number
  unit: string
  containers: Container[]
  createdAt: string
}

export interface Container {
  id: string
  number: string
  status: "booked" | "loaded" | "in-transit" | "arrived" | "delivered"
  weight: number
  unit: string
  bookingRef?: string
  vessel?: string
  eta?: string
}

export interface Invoice {
  id: string
  type: "purchase" | "sale" | "freight"
  reference: string
  amount: number
  currency: string
  status: "draft" | "sent" | "paid"
  dueDate: string
}

export interface CostItem {
  id: string
  description: string
  amount: number
  currency: string
  category: "freight" | "insurance" | "commission" | "customs" | "other"
}

export interface Booking {
  id: string
  reference: string
  vessel: string
  departurePort: string
  arrivalPort: string
  departureDate: string
  arrivalDate: string
  containerIds: string[]
}

export interface DocumentComparison {
  id: string
  label: string
  fields: Record<string, string>
}

export const mockOperations: Operation[] = [
  {
    id: "op-001",
    reference: "OP-2025-0042",
    status: "in-progress",
    commodity: "PET Flakes (Clear)",
    supplier: "GreenCycle Vietnam Co.",
    buyer: "EcoPlast Europe GmbH",
    purchasePrice: 680,
    salePrice: 820,
    currency: "USD",
    quantity: 75,
    unit: "MT",
    containers: [
      { id: "c-001", number: "MSCU1234567", status: "in-transit", weight: 25, unit: "MT", bookingRef: "BK-44210", vessel: "Ever Given", eta: "2025-03-15" },
      { id: "c-002", number: "TCLU7654321", status: "loaded", weight: 25, unit: "MT", bookingRef: "BK-44210", vessel: "Ever Given", eta: "2025-03-15" },
      { id: "c-003", number: "MSKU9876543", status: "booked", weight: 25, unit: "MT" },
    ],
    createdAt: "2025-01-15",
  },
  {
    id: "op-002",
    reference: "OP-2025-0043",
    status: "confirmed",
    commodity: "HDPE Pellets (Natural)",
    supplier: "Shanghai Polymers Ltd",
    buyer: "Nordic Recycling AB",
    purchasePrice: 1050,
    salePrice: 1200,
    currency: "USD",
    quantity: 50,
    unit: "MT",
    containers: [
      { id: "c-004", number: "OOLU1122334", status: "arrived", weight: 25, unit: "MT", bookingRef: "BK-55102", vessel: "CMA CGM Marco Polo", eta: "2025-02-20" },
      { id: "c-005", number: "CMAU5566778", status: "in-transit", weight: 25, unit: "MT", bookingRef: "BK-55102", vessel: "CMA CGM Marco Polo", eta: "2025-02-25" },
    ],
    createdAt: "2025-02-01",
  },
  {
    id: "op-003",
    reference: "OP-2025-0044",
    status: "draft",
    commodity: "OCC Bales (Grade 11)",
    supplier: "Atlantic Paper Corp",
    buyer: "Karton Recycling Srl",
    purchasePrice: 180,
    salePrice: 220,
    currency: "EUR",
    quantity: 200,
    unit: "MT",
    containers: [],
    createdAt: "2025-02-10",
  },
  {
    id: "op-004",
    reference: "OP-2025-0038",
    status: "completed",
    commodity: "Copper Cathodes (Grade A)",
    supplier: "Zambia Mining Corp",
    buyer: "Deutsche Kupfer AG",
    purchasePrice: 8200,
    salePrice: 8650,
    currency: "USD",
    quantity: 100,
    unit: "MT",
    containers: [
      { id: "c-006", number: "MSCU2233445", status: "delivered", weight: 25, unit: "MT", vessel: "MSC Oscar", eta: "2025-01-20" },
      { id: "c-007", number: "MSCU3344556", status: "delivered", weight: 25, unit: "MT", vessel: "MSC Oscar", eta: "2025-01-20" },
      { id: "c-008", number: "MSCU4455667", status: "delivered", weight: 25, unit: "MT", vessel: "MSC Oscar", eta: "2025-01-20" },
      { id: "c-009", number: "MSCU5566778", status: "delivered", weight: 25, unit: "MT", vessel: "MSC Oscar", eta: "2025-01-20" },
    ],
    createdAt: "2024-12-05",
  },
]

export const mockCosts: CostItem[] = [
  { id: "cost-001", description: "Ocean Freight (Ho Chi Minh - Rotterdam)", amount: 2800, currency: "USD", category: "freight" },
  { id: "cost-002", description: "Marine Insurance", amount: 450, currency: "USD", category: "insurance" },
  { id: "cost-003", description: "Broker Commission (2%)", amount: 1230, currency: "USD", category: "commission" },
  { id: "cost-004", description: "Customs Clearance", amount: 350, currency: "USD", category: "customs" },
  { id: "cost-005", description: "Container Inspection", amount: 180, currency: "USD", category: "other" },
]

export const mockInvoices: Invoice[] = [
  { id: "inv-001", type: "purchase", reference: "INV-P-2025-0042", amount: 51000, currency: "USD", status: "paid", dueDate: "2025-02-28" },
  { id: "inv-002", type: "sale", reference: "INV-S-2025-0042", amount: 61500, currency: "USD", status: "sent", dueDate: "2025-03-30" },
  { id: "inv-003", type: "freight", reference: "INV-F-2025-0042", amount: 2800, currency: "USD", status: "paid", dueDate: "2025-02-15" },
  { id: "inv-004", type: "purchase", reference: "INV-P-2025-0043", amount: 52500, currency: "USD", status: "draft", dueDate: "2025-03-15" },
  { id: "inv-005", type: "sale", reference: "INV-S-2025-0043", amount: 60000, currency: "USD", status: "sent", dueDate: "2025-03-20" },
  { id: "inv-006", type: "freight", reference: "INV-F-2025-0043", amount: 3200, currency: "USD", status: "sent", dueDate: "2025-03-01" },
  { id: "inv-007", type: "purchase", reference: "INV-P-2025-0038", amount: 820000, currency: "USD", status: "paid", dueDate: "2025-01-15" },
  { id: "inv-008", type: "sale", reference: "INV-S-2025-0038", amount: 865000, currency: "USD", status: "paid", dueDate: "2025-02-15" },
]

export const mockBookings: Booking[] = [
  {
    id: "bk-001",
    reference: "BK-44210",
    vessel: "Ever Given",
    departurePort: "Ho Chi Minh City",
    arrivalPort: "Rotterdam",
    departureDate: "2025-02-20",
    arrivalDate: "2025-03-15",
    containerIds: ["c-001", "c-002"],
  },
  {
    id: "bk-002",
    reference: "BK-55102",
    vessel: "CMA CGM Marco Polo",
    departurePort: "Shanghai",
    arrivalPort: "Gothenburg",
    departureDate: "2025-02-05",
    arrivalDate: "2025-02-25",
    containerIds: ["c-004", "c-005"],
  },
]

export const mockDocuments: DocumentComparison[] = [
  {
    id: "doc-system",
    label: "Invoice (System)",
    fields: {
      "Invoice No.": "INV-S-2025-0042",
      "Supplier": "GreenCycle Vietnam Co.",
      "Buyer": "EcoPlast Europe GmbH",
      "Commodity": "PET Flakes (Clear)",
      "Quantity": "75 MT",
      "Unit Price": "USD 820.00/MT",
      "Total Amount": "USD 61,500.00",
      "Payment Terms": "Net 30",
      "Vessel": "Ever Given",
      "Port of Loading": "Ho Chi Minh City",
      "Port of Discharge": "Rotterdam",
    },
  },
  {
    id: "doc-uploaded",
    label: "Invoice (Uploaded)",
    fields: {
      "Invoice No.": "INV-S-2025-0042",
      "Supplier": "GreenCycle Vietnam Co.",
      "Buyer": "EcoPlast Europe GmbH",
      "Commodity": "PET Flakes (Clear)",
      "Quantity": "75 MT",
      "Unit Price": "USD 820.00/MT",
      "Total Amount": "USD 61,500.00",
      "Payment Terms": "Net 45",
      "Vessel": "Ever Given",
      "Port of Loading": "Ho Chi Minh",
      "Port of Discharge": "Rotterdam",
    },
  },
]

// Prototype registry for the homepage
export interface PrototypeEntry {
  slug: string
  name: string
  author: string
  description: string
  type: "feature" | "improvement" | "experiment"
  createdAt: string
  path: string
  externalUrl?: string
}

export const prototypeRegistry: PrototypeEntry[] = [
  {
    slug: "margin-calculator",
    name: "Margin Calculator",
    author: "jp",
    description: "Interactive margin calculation panel for an operation with commodity pricing (fixed vs indexed) and container cost breakdown.",
    type: "feature",
    createdAt: "2025-02-25",
    path: "/prototypes/jp/margin-calculator",
  },
  {
    slug: "dashboard",
    name: "Dashboard",
    author: "jp",
    description: "KPI dashboard with stat cards, recent operations, pending invoices, and container status breakdown.",
    type: "feature",
    createdAt: "2025-02-25",
    path: "/prototypes/jp/dashboard",
  },
  {
    slug: "operation-list",
    name: "Operation List",
    author: "jp",
    description: "Filterable operation list with search, status/commodity filters, and data table.",
    type: "feature",
    createdAt: "2025-02-25",
    path: "/prototypes/jp/operation-list",
  },
  {
    slug: "invoice-list",
    name: "Invoice List",
    author: "jp",
    description: "Invoice management list with summary stat cards, filters by type and status.",
    type: "feature",
    createdAt: "2025-02-25",
    path: "/prototypes/jp/invoice-list",
  },
  {
    slug: "operation-detail",
    name: "Operation Detail",
    author: "jp",
    description: "Tabbed operation detail view with general info, containers, invoices, and margin analysis.",
    type: "feature",
    createdAt: "2025-02-25",
    path: "/prototypes/jp/operation-detail",
  },
  {
    slug: "container-tracking",
    name: "Container Tracking",
    author: "jp",
    description: "Container tracking overview with timeline visualization and status filters.",
    type: "feature",
    createdAt: "2025-02-25",
    path: "/prototypes/jp/container-tracking",
  },
  {
    slug: "doc-comparison",
    name: "Document Comparison",
    author: "jp",
    description: "Side-by-side document comparison with split pane and difference highlighting.",
    type: "experiment",
    createdAt: "2025-02-25",
    path: "/prototypes/jp/doc-comparison",
  },
  {
    slug: "email-intelligence",
    name: "Email Intelligence",
    author: "jp",
    description: "AI-powered inbox that reviews operational emails, extracts actions, and lets traders approve or dismiss with one click.",
    type: "feature",
    createdAt: "2025-03-10",
    path: "/prototypes/jp/email-intelligence",
    externalUrl: "https://inbox-prototype-jp.vercel.app/inbox",
  },
]
