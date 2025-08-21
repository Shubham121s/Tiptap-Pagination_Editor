"use client"

import type React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
// import { PageBreak } from "../extensions/PageBreakExtension"
import { PageBreak } from "../components/extensions/PageBreakExtension"
// import { usePagination } from "../hooks/usePagination"
import { usePagination } from "../components/hooks/usePagination"
// import EditorToolbar from "./EditorToolbar"
import EditorToolbar from "../components/editor/EditorToolbar"
// import DocumentPage from "./DocumentPage"
import DocumentPage from "../components/editor/DocumentPage"
// import PageNavigator from "./PageNavigator"
import PageNavigator from "../components/editor/PageNavigator"
// import ManualPageEditor from "./ManualPageEditor"
import ManualPageEditor from "../components/editor/ManualPageEditor"



const DocumentEditor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      PageBreak,
    ],
    content: `
      <h1>Document Title</h1>
      <p>Choose your writing mode:</p>
      <p><strong>Auto Flow:</strong> Content automatically flows between pages with smart page breaks.</p>
      <p><strong>Write Manually:</strong> You control exactly what goes on each page - perfect for precise layouts, forms, or structured documents.</p>
      <p>Toggle between modes using the toolbar above. In manual mode, you can add new pages and write specific content for each page.</p>
    `,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none",
      },
    },
  })

  const {
    pages,
    currentPage,
    setCurrentPage,
    totalPages,
    manualMode,
    setManualMode,
    addManualPage,
    deleteManualPage,
    updateManualPageContent,
    manualPages,
  } = usePagination(editor)

  const handleManualPageUpdate = (pageIndex: number, content: string) => {
    updateManualPageContent(pageIndex, content)
  }

  const renderContent = () => {
    if (manualMode) {
      return manualPages.map((page, index) => (
        <DocumentPage
          key={page.id}
          pageNumber={index + 1}
          totalPages={totalPages}
          isActive={currentPage === index}
          onDelete={totalPages > 1 ? () => deleteManualPage(index) : undefined}
        >
          <ManualPageEditor
            content={page.content}
            onUpdate={(content: string) => handleManualPageUpdate(index, content)}
            isActive={currentPage === index}
          />
        </DocumentPage>
      ))
    }

    if (pages.length <= 1) {
      return (
        <DocumentPage pageNumber={1} totalPages={1}>
          <EditorContent editor={editor} />
        </DocumentPage>
      )
    }

    return pages.map((page, index) => (
      <DocumentPage key={page.id} pageNumber={index + 1} totalPages={totalPages}>
        <div dangerouslySetInnerHTML={{ __html: page.content }} className="prose prose-sm max-w-none" />
      </DocumentPage>
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EditorToolbar
        editor={editor}
        manualMode={manualMode}
        onToggleManualMode={() => setManualMode(!manualMode)}
        onAddPage={addManualPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <div className="py-8">
        <div className="max-w-[210mm] mx-auto">{renderContent()}</div>
      </div>

      <PageNavigator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        manualMode={manualMode}
      />
    </div>
  )
}

export default DocumentEditor
