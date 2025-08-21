"use client"

import type React from "react"
import { useState } from "react"
import type { Editor } from "@tiptap/react"
import { Bold, Italic, Underline, FileText, Printer, Download } from "lucide-react"

interface EditorToolbarProps {
  editor: Editor | null
  onPrint?: () => void
  onExport?: () => void
  manualMode?: boolean
  onToggleManualMode?: () => void
  onAddPage?: () => void
  currentPage?: number
  totalPages?: number
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  editor,
  onPrint,
  onExport,
  manualMode = false,
  onToggleManualMode,
  onAddPage,
  currentPage = 0,
  totalPages = 1,
}) => {
  const [selectedFont, setSelectedFont] = useState("Times New Roman")
  const [selectedSize, setSelectedSize] = useState("12pt")

  if (!editor) return null

  const handleFontChange = (fontFamily: string) => {
    setSelectedFont(fontFamily)
    // Apply font to the entire editor
    const editorElement = editor.view.dom as HTMLElement
    editorElement.style.fontFamily = fontFamily

    // Also apply to any selected text
    editor.chain().focus().run()
  }

  const handleSizeChange = (fontSize: string) => {
    setSelectedSize(fontSize)
    // Apply font size to the entire editor
    const editorElement = editor.view.dom as HTMLElement
    editorElement.style.fontSize = fontSize

    // Also apply to any selected text
    editor.chain().focus().run()
  }

  const handlePrint = () => {
    window.print()
    onPrint?.()
  }

  const handleExport = () => {
    // Simple HTML export - in production, you'd want PDF generation
    const content = editor.getHTML()
    const blob = new Blob([content], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "document.html"
    a.click()
    URL.revokeObjectURL(url)
    onExport?.()
  }

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {/* Writing Mode Toggle */}
          <div className="flex items-center gap-2 mr-4 px-3 py-1.5 bg-gray-50 rounded-lg">
            <button
              type="button"
              onClick={onToggleManualMode}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                !manualMode ? "bg-blue-600 text-white" : "bg-transparent text-gray-600 hover:bg-gray-200"
              }`}
            >
              Auto Flow
            </button>
            <button
              type="button"
              onClick={onToggleManualMode}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                manualMode ? "bg-blue-600 text-white" : "bg-transparent text-gray-600 hover:bg-gray-200"
              }`}
            >
              Write Manually
            </button>
          </div>

          {/* Manual Mode Controls */}
          {manualMode && (
            <div className="flex items-center gap-2 mr-4">
              <span className="text-xs text-gray-500">
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                type="button"
                onClick={onAddPage}
                className="px-2 py-1 text-xs bg-green-100 text-green-700 hover:bg-green-200 rounded transition-colors"
                title="Add New Page"
              >
                + Page
              </button>
            </div>
          )}

          {/* Font Family Selector */}
          <select
            value={selectedFont}
            onChange={(e) => handleFontChange(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Times New Roman">Times New Roman</option>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Georgia">Georgia</option>
            <option value="Calibri">Calibri</option>
            <option value="Verdana">Verdana</option>
          </select>

          {/* Font Size Selector */}
          <select
            value={selectedSize}
            onChange={(e) => handleSizeChange(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
          >
            <option value="8pt">8pt</option>
            <option value="9pt">9pt</option>
            <option value="10pt">10pt</option>
            <option value="11pt">11pt</option>
            <option value="12pt">12pt</option>
            <option value="14pt">14pt</option>
            <option value="16pt">16pt</option>
            <option value="18pt">18pt</option>
            <option value="20pt">20pt</option>
            <option value="24pt">24pt</option>
            <option value="28pt">28pt</option>
            <option value="32pt">32pt</option>
          </select>

          <div className="w-px h-6 bg-gray-300 mx-3" />

          {/* Formatting */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded-md transition-colors ${
              editor.isActive("bold") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded-md transition-colors ${
              editor.isActive("italic") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded-md transition-colors ${
              editor.isActive("underline") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"
            }`}
            title="Underline (Ctrl+U)"
          >
            <Underline size={16} />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-3" />

          {/* Page Break */}
          {!manualMode && (
            <button
              type="button"
              onClick={() => editor.chain().focus().setPageBreak().run()}
              className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              title="Insert Page Break (Ctrl+Enter)"
            >
              <FileText size={14} />
              Page Break
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            title="Print (Ctrl+P)"
          >
            <Printer size={14} />
            Print
          </button>

          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
            title="Export Document"
          >
            <Download size={14} />
            Export
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditorToolbar
