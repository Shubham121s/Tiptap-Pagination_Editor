import type React from "react"

interface PageProps {
  children: React.ReactNode
  pageNumber: number
  totalPages: number
  headerTitle?: string
}

const Page: React.FC<PageProps> = ({ children, pageNumber, totalPages, headerTitle = "Document Title" }) => {
  return (
    <div className="a4-page w-[210mm] h-[297mm] mx-auto bg-white shadow-lg mb-8 relative print:shadow-none print:mb-0">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 h-[20mm] flex items-center justify-center border-b border-gray-200 print:border-gray-400">
        <div className="text-sm text-gray-600 font-medium px-[20mm]">{headerTitle}</div>
      </header>

      {/* Content Area */}
      <main className="absolute top-[20mm] left-[20mm] right-[20mm] bottom-[20mm] overflow-hidden">
        <div className="h-full overflow-y-auto print:overflow-visible">{children}</div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 h-[20mm] flex items-center justify-between border-t border-gray-200 print:border-gray-400 px-[20mm]">
        <div className="text-xs text-gray-500">{new Date().toLocaleDateString()}</div>
        <div className="text-xs text-gray-500">
          Page {pageNumber} of {totalPages}
        </div>
      </footer>
    </div>
  )
}

export default Page
