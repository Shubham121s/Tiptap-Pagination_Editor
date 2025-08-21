"use client"

import type React from "react"

interface DocumentPageProps {
  children: React.ReactNode
  pageNumber: number
  totalPages: number
  title?: string
  author?: string
  date?: string
  isActive?: boolean
  onDelete?: () => void
}

const DocumentPage: React.FC<DocumentPageProps> = ({
  children,
  pageNumber,
  totalPages,
  title = "Untitled Document",
  author = "Author",
  date = new Date().toLocaleDateString(),
  isActive = false,
  onDelete,
}) => {
  return (
    <div
      className={`document-page w-[210mm] min-h-[297mm] bg-white shadow-lg mx-auto mb-6 relative print:shadow-none print:mb-0 print:break-after-page group ${
        isActive ? "ring-2 ring-blue-500 ring-opacity-50" : ""
      }`}
    >
      {/* Manual mode controls */}
      {onDelete && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 print:hidden">
          <button
            onClick={onDelete}
            className="w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors flex items-center justify-center"
            title="Delete Page"
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8 py-4 border-b border-gray-200 text-sm text-gray-600 print:border-gray-400">
        <div className="font-medium">{title}</div>
        <div>{date}</div>
      </header>

      {/* Content Area */}
      <main className="pt-16 pb-16 px-8 min-h-[calc(297mm-8rem)]">
        <div className="prose prose-sm max-w-none leading-relaxed">{children}</div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-between px-8 py-4 border-t border-gray-200 text-sm text-gray-500 print:border-gray-400">
        <div>{author}</div>
        <div className="font-medium">
          Page {pageNumber} of {totalPages}
        </div>
      </footer>
    </div>
  )
}

export default DocumentPage
