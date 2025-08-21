"use client"

import type React from "react"
import { ChevronLeft, ChevronRight, FileText } from "lucide-react"

interface PageNavigatorProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  manualMode?: boolean
}

const PageNavigator: React.FC<PageNavigatorProps> = ({ currentPage, totalPages, onPageChange, manualMode = false }) => {
  if (totalPages <= 1 && !manualMode) return null

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-2 flex items-center gap-3 z-20 print:hidden">
      <button
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Previous Page"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="flex items-center gap-2 text-sm">
        <FileText size={14} className="text-gray-500" />
        <span className="font-medium">
          {currentPage + 1} of {totalPages}
        </span>
        {manualMode && <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">Manual</span>}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage === totalPages - 1}
        className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Next Page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}

export default PageNavigator
