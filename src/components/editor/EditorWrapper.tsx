"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import { PageBreak } from "../extensions/PageBreakExtension"
import EditorToolbar from "./EditorToolbar"
import Page from "./Page"

const EditorWrapper: React.FC = () => {
  const [pages, setPages] = useState<string[]>([""])
  const [currentPage, setCurrentPage] = useState(0)

  const editor = useEditor({
    extensions: [StarterKit, Underline, PageBreak],
    content: "<p>Start writing your document...</p>",
    onUpdate: ({ editor }) => {
      // Split content by page breaks
      const html = editor.getHTML()
      const pageBreaks = html.split('<div data-type="page-break"')

      if (pageBreaks.length > 1) {
        const newPages = pageBreaks.map((content, index) => {
          if (index === 0) return content
          return '<div data-type="page-break"' + content
        })
        setPages(newPages)
      } else {
        setPages([html])
      }
    },
  })

  // Auto-pagination based on content height (simplified approach)
  useEffect(() => {
    if (!editor) return

    const checkPagination = () => {
      const content = editor.view.dom
      const contentHeight = content.scrollHeight
      const pageHeight = 297 * 3.78 // A4 height in pixels (approximate)
      const estimatedPages = Math.ceil(contentHeight / pageHeight)

      if (estimatedPages > pages.length && !editor.getHTML().includes('data-type="page-break"')) {
        // Auto-insert page break if content exceeds page height
        const currentContent = editor.getHTML()
        const words = currentContent.split(" ")
        const midPoint = Math.floor(words.length / 2)

        // This is a simplified approach - in production, you'd want more sophisticated logic
        if (words.length > 100) {
          const firstHalf = words.slice(0, midPoint).join(" ")
          const secondHalf = words.slice(midPoint).join(" ")

          editor.commands.setContent(firstHalf + '<div data-type="page-break"></div>' + secondHalf)
        }
      }
    }

    const timer = setTimeout(checkPagination, 1000)
    return () => clearTimeout(timer)
  }, [editor, pages.length])

  const renderPages = () => {
    if (pages.length <= 1) {
      return (
        <Page pageNumber={1} totalPages={1} headerTitle="Document Title">
          <EditorContent editor={editor} />
        </Page>
      )
    }

    return pages.map((pageContent, index) => (
      <Page key={index} pageNumber={index + 1} totalPages={pages.length} headerTitle="Document Title">
        <div dangerouslySetInnerHTML={{ __html: pageContent }} className="prose max-w-none" />
      </Page>
    ))
  }

  return (
    <div className="flex flex-col h-full p-4">
      <EditorToolbar editor={editor} />

      <div className="flex-1 overflow-y-auto px-12 py-6 bg-gray-100">
        {pages.length <= 1 ? (
          <Page pageNumber={1} totalPages={1} headerTitle="Document Title">
            <EditorContent editor={editor} />
          </Page>
        ) : (
          renderPages()
        )}
      </div>

      {/* Page Navigation */}
      {pages.length > 1 && (
        <div className="flex items-center justify-center gap-4 py-4 bg-white border-t">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="px-3 py-1 text-sm border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage + 1} of {pages.length}
          </span>

          <button
            onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
            disabled={currentPage === pages.length - 1}
            className="px-3 py-1 text-sm border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default EditorWrapper
