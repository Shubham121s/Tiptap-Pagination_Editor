"use client"

import type React from "react"

interface ThumbnailsSidebarProps {
  pages?: number
  currentPage?: number
  onPageSelect?: (page: number) => void
}

const ThumbnailsSidebar: React.FC<ThumbnailsSidebarProps> = ({ pages = 2, currentPage = 0, onPageSelect }) => {
  return (
    <aside className="w-60 bg-gray-50 border-l p-4 overflow-y-auto">
      <h2 className="text-sm font-semibold mb-4">Pages ({pages})</h2>

      <div className="space-y-4">
        {Array.from({ length: pages }, (_, index) => (
          <div
            key={index}
            onClick={() => onPageSelect?.(index)}
            className={`w-full aspect-[210/297] bg-white shadow border cursor-pointer transition-all hover:shadow-md ${
              currentPage === index ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="h-full p-2 flex flex-col">
              {/* Thumbnail header */}
              <div className="h-2 bg-gray-200 rounded mb-2"></div>

              {/* Thumbnail content lines */}
              <div className="space-y-1 flex-1">
                <div className="h-1 bg-gray-300 rounded w-full"></div>
                <div className="h-1 bg-gray-300 rounded w-4/5"></div>
                <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                <div className="h-1 bg-gray-300 rounded w-full"></div>
                <div className="h-1 bg-gray-300 rounded w-2/3"></div>
              </div>

              {/* Thumbnail footer */}
              <div className="h-1 bg-gray-200 rounded mt-2"></div>
            </div>

            {/* Page number */}
            <div className="text-xs text-center text-gray-500 mt-1">{index + 1}</div>
          </div>
        ))}
      </div>

      {/* Add Page Button */}
      <button className="w-full mt-4 py-2 border-2 border-dashed border-gray-300 rounded text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
        + Add Page
      </button>
    </aside>
  )
}

export default ThumbnailsSidebar

