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
      { id: "c-004", number: "OOLU1122334", status: "booked", weight: 25, unit: "MT" },
      { id: "c-005", number: "CMAU5566778", status: "booked", weight: 25, unit: "MT" },
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
]
