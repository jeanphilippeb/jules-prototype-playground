// Jules Design System Tokens
// These match the values in tailwind.config.ts and CLAUDE.md

export const colors = {
  primary: "#2563EB",
  secondary: "#64748B",
  success: "#16A34A",
  warning: "#D97706",
  danger: "#DC2626",
  background: "#FFFFFF",
  surface: "#F8FAFC",
  border: "#E2E8F0",
  textPrimary: "#0F172A",
  textSecondary: "#64748B",
} as const

export const statusColors = {
  draft: "bg-gray-100 text-gray-700",
  confirmed: "bg-blue-100 text-blue-700",
  "in-progress": "bg-orange-100 text-orange-700",
  completed: "bg-green-100 text-green-700",
} as const

export const containerStatusColors = {
  booked: "bg-gray-100 text-gray-700",
  loaded: "bg-blue-100 text-blue-700",
  "in-transit": "bg-orange-100 text-orange-700",
  arrived: "bg-green-100 text-green-700",
  delivered: "bg-emerald-100 text-emerald-700",
} as const

export type OperationStatus = keyof typeof statusColors
export type ContainerStatus = keyof typeof containerStatusColors
