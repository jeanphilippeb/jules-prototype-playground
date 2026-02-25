import type { Metadata } from "next"
import "@/styles/globals.css"
import { Toaster } from "@/components/ui/toast"

export const metadata: Metadata = {
  title: "Jules Prototype Playground",
  description: "Shared prototype playground for the Jules product team",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
