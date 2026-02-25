"use client"

import { cn } from "@/lib/utils"
import { useState, useMemo } from "react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
  align?: "left" | "center" | "right"
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyField: keyof T
  onRowClick?: (item: T) => void
  className?: string
  emptyMessage?: string
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  keyField,
  onRowClick,
  className,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const sortedData = useMemo(() => {
    if (!sortKey) return data
    return [...data].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal == null || bVal == null) return 0
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [data, sortKey, sortDir])

  const alignClass: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  if (data.length === 0) {
    return (
      <div className={cn("rounded-md border border-jules-border px-6 py-10 text-center text-sm text-jules-text-secondary", className)}>
        {emptyMessage}
      </div>
    )
  }

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className={cn(
                col.align && alignClass[col.align],
                col.sortable && "cursor-pointer select-none"
              )}
            >
              {col.sortable ? (
                <button
                  type="button"
                  onClick={() => handleSort(col.key)}
                  className="inline-flex items-center gap-1 hover:text-jules-text-primary transition-colors"
                >
                  {col.header}
                  {sortKey === col.key ? (
                    sortDir === "asc" ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : (
                      <ArrowDown className="h-3 w-3" />
                    )
                  ) : (
                    <ArrowUpDown className="h-3 w-3 opacity-40" />
                  )}
                </button>
              ) : (
                col.header
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((item) => (
          <TableRow
            key={String(item[keyField])}
            className={cn(onRowClick && "cursor-pointer")}
            onClick={onRowClick ? () => onRowClick(item) : undefined}
          >
            {columns.map((col) => (
              <TableCell key={col.key} className={col.align ? alignClass[col.align] : undefined}>
                {col.render ? col.render(item) : (item[col.key] as React.ReactNode)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
