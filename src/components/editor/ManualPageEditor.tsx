"use client"

import type React from "react"
import { useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"

interface ManualPageEditorProps {
  content: string
  onUpdate: (content: string) => void
  isActive: boolean
}

const ManualPageEditor: React.FC<ManualPageEditorProps> = ({ content, onUpdate, isActive }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
    ],
    content: content || "<p></p>",
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[200px]",
      },
    },
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML())
    },
  })

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [editor, content])

  // Focus management for active page
  useEffect(() => {
    if (editor && isActive) {
      editor.commands.focus()
    }
  }, [editor, isActive])

  if (!editor) {
    return (
      <div className="manual-page-editor">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`manual-page-editor ${isActive ? "active" : ""}`}>
      <EditorContent editor={editor} />

      {/* Page-specific controls */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white px-2 py-1 rounded shadow">
          <span>{editor.getText().length || 0} chars</span>
          <span>•</span>
          <span>
            {editor
              .getText()
              .split(/\s+/)
              .filter((word) => word.length > 0).length || 0}{" "}
            words
          </span>
        </div>
      </div>
    </div>
  )
}

export default ManualPageEditor
