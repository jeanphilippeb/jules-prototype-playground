"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MarginIndicator } from "@/components/domain/margin-indicator"
import { ContainerRow } from "@/components/domain/container-row"
import { CommodityBadge } from "@/components/domain/commodity-badge"
import { mockOperations, mockCosts, type CostItem } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import {
  Calculator,
  TrendingUp,
  Package,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

type PricingMode = "fixed" | "indexed"

export default function MarginCalculatorPage() {
  const operation = mockOperations[0] // OP-2025-0042: PET Flakes
  const [pricingMode, setPricingMode] = useState<PricingMode>("fixed")
  const [purchasePrice, setPurchasePrice] = useState(operation.purchasePrice)
  const [salePrice, setSalePrice] = useState(operation.salePrice)
  const [indexDelta, setIndexDelta] = useState(0)
  const [showCosts, setShowCosts] = useState(true)
  const [costs, setCosts] = useState<CostItem[]>(mockCosts)

  const effectivePurchase = pricingMode === "indexed" ? purchasePrice + indexDelta : purchasePrice
  const effectiveSale = pricingMode === "indexed" ? salePrice + indexDelta : salePrice

  const grossMarginPerMt = effectiveSale - effectivePurchase
  const totalGrossMargin = grossMarginPerMt * operation.quantity
  const totalCosts = costs.reduce((sum, c) => sum + c.amount, 0)
  const netMargin = totalGrossMargin - totalCosts
  const netMarginPerMt = operation.quantity > 0 ? netMargin / operation.quantity : 0

  return (
    <AppShell>
      <PageHeader
        title="Margin Calculator"
        description={`${operation.reference} \u2014 ${operation.commodity}`}
        actions={
          <div className="flex items-center gap-2">
            <Badge variant={operation.status}>{operation.status}</Badge>
            <CommodityBadge commodity={operation.commodity} />
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column: Pricing */}
        <div className="lg:col-span-2 space-y-4">
          {/* Pricing Mode Toggle */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-jules-text-secondary" />
                  <span className="text-sm font-medium">Pricing</span>
                </div>
                <div className="flex rounded-sm border border-jules-border overflow-hidden">
                  <button
                    onClick={() => setPricingMode("fixed")}
                    className={`px-3 py-1 text-xs font-medium transition-colors ${
                      pricingMode === "fixed"
                        ? "bg-jules-primary text-white"
                        : "bg-white text-jules-text-secondary hover:bg-jules-surface"
                    }`}
                  >
                    Fixed
                  </button>
                  <button
                    onClick={() => setPricingMode("indexed")}
                    className={`px-3 py-1 text-xs font-medium transition-colors ${
                      pricingMode === "indexed"
                        ? "bg-jules-primary text-white"
                        : "bg-white text-jules-text-secondary hover:bg-jules-surface"
                    }`}
                  >
                    Indexed
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <PriceInput
                  label="Purchase Price"
                  sublabel={`per ${operation.unit}`}
                  value={purchasePrice}
                  onChange={setPurchasePrice}
                  currency={operation.currency}
                />
                <PriceInput
                  label="Sale Price"
                  sublabel={`per ${operation.unit}`}
                  value={salePrice}
                  onChange={setSalePrice}
                  currency={operation.currency}
                />
              </div>

              {pricingMode === "indexed" && (
                <div className="mt-4 rounded-sm border border-jules-border bg-jules-surface p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-jules-text-secondary">
                      Index Delta (simulation)
                    </span>
                    <span className="text-xs text-jules-text-secondary">
                      {indexDelta >= 0 ? "+" : ""}{indexDelta} {operation.currency}/MT
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-200}
                    max={200}
                    step={5}
                    value={indexDelta}
                    onChange={(e) => setIndexDelta(Number(e.target.value))}
                    className="w-full accent-jules-primary"
                  />
                  <div className="flex justify-between text-xs text-jules-text-secondary mt-1">
                    <span>-200</span>
                    <span>0</span>
                    <span>+200</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card>
            <CardHeader>
              <button
                onClick={() => setShowCosts(!showCosts)}
                className="flex w-full items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-jules-text-secondary" />
                  <span className="text-sm font-medium">
                    Costs ({costs.length} items)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-jules-text-primary">
                    {formatCurrency(totalCosts, operation.currency)}
                  </span>
                  {showCosts ? (
                    <ChevronUp className="h-4 w-4 text-jules-text-secondary" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-jules-text-secondary" />
                  )}
                </div>
              </button>
            </CardHeader>
            {showCosts && (
              <CardContent>
                <div className="space-y-2">
                  {costs.map((cost) => (
                    <div
                      key={cost.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="default">{cost.category}</Badge>
                        <span className="text-jules-text-primary">
                          {cost.description}
                        </span>
                      </div>
                      <span className="text-jules-text-primary font-medium">
                        {formatCurrency(cost.amount, cost.currency)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Containers */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-jules-text-secondary" />
                <span className="text-sm font-medium">
                  Containers ({operation.containers.length})
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {operation.containers.map((c) => (
                <ContainerRow key={c.id} container={c} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right column: Margin Summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-jules-text-secondary" />
                <span className="text-sm font-medium">Margin Summary</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <SummaryRow
                label="Quantity"
                value={`${operation.quantity} ${operation.unit}`}
              />
              <SummaryRow
                label="Purchase"
                value={`${formatCurrency(effectivePurchase, operation.currency)}/${operation.unit}`}
              />
              <SummaryRow
                label="Sale"
                value={`${formatCurrency(effectiveSale, operation.currency)}/${operation.unit}`}
              />

              <div className="border-t border-jules-border pt-3">
                <SummaryRow
                  label="Gross Margin/MT"
                  value={
                    <MarginIndicator
                      purchasePrice={effectivePurchase}
                      salePrice={effectiveSale}
                      currency={operation.currency}
                      size="sm"
                    />
                  }
                />
                <SummaryRow
                  label="Total Gross"
                  value={formatCurrency(totalGrossMargin, operation.currency)}
                  className="mt-2"
                />
              </div>

              <div className="border-t border-jules-border pt-3">
                <SummaryRow
                  label="Total Costs"
                  value={
                    <span className="text-jules-danger">
                      -{formatCurrency(totalCosts, operation.currency)}
                    </span>
                  }
                />
              </div>

              <div className="border-t border-jules-border pt-3">
                <SummaryRow
                  label="Net Margin"
                  value={
                    <span
                      className={`text-base font-semibold ${
                        netMargin >= 0 ? "text-jules-success" : "text-jules-danger"
                      }`}
                    >
                      {formatCurrency(netMargin, operation.currency)}
                    </span>
                  }
                />
                <SummaryRow
                  label="Net Margin/MT"
                  value={
                    <span
                      className={`font-medium ${
                        netMarginPerMt >= 0 ? "text-jules-success" : "text-jules-danger"
                      }`}
                    >
                      {formatCurrency(netMarginPerMt, operation.currency)}/{operation.unit}
                    </span>
                  }
                  className="mt-2"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm" className="w-full">
                Export to PDF
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <StatBox
                  label="Margin %"
                  value={`${effectivePurchase > 0 ? ((netMarginPerMt / effectivePurchase) * 100).toFixed(1) : "0.0"}%`}
                  positive={netMarginPerMt >= 0}
                />
                <StatBox
                  label="Revenue"
                  value={formatCurrency(effectiveSale * operation.quantity, operation.currency)}
                />
                <StatBox
                  label="COGS"
                  value={formatCurrency(effectivePurchase * operation.quantity, operation.currency)}
                />
                <StatBox
                  label="Cost Ratio"
                  value={`${totalGrossMargin > 0 ? ((totalCosts / totalGrossMargin) * 100).toFixed(0) : "N/A"}%`}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}

function PriceInput({
  label,
  sublabel,
  value,
  onChange,
  currency,
}: {
  label: string
  sublabel: string
  value: number
  onChange: (v: number) => void
  currency: string
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-jules-text-secondary mb-1">
        {label} <span className="font-normal">({sublabel})</span>
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-jules-text-secondary">
          {currency}
        </span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-sm border border-jules-border bg-white py-2 pl-12 pr-3 text-sm text-jules-text-primary focus:border-jules-primary focus:outline-none focus:ring-2 focus:ring-jules-primary/20"
        />
      </div>
    </div>
  )
}

function SummaryRow({
  label,
  value,
  className,
}: {
  label: string
  value: React.ReactNode
  className?: string
}) {
  return (
    <div className={`flex items-center justify-between ${className ?? ""}`}>
      <span className="text-xs text-jules-text-secondary">{label}</span>
      <span className="text-sm text-jules-text-primary">{value}</span>
    </div>
  )
}

function StatBox({
  label,
  value,
  positive,
}: {
  label: string
  value: string
  positive?: boolean
}) {
  return (
    <div className="rounded-sm border border-jules-border p-2.5">
      <p className="text-xs text-jules-text-secondary">{label}</p>
      <p
        className={`text-sm font-semibold mt-0.5 ${
          positive !== undefined
            ? positive
              ? "text-jules-success"
              : "text-jules-danger"
            : "text-jules-text-primary"
        }`}
      >
        {value}
      </p>
    </div>
  )
}
