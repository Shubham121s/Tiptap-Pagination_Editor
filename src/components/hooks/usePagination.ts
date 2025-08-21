"use client"

import { useState, useEffect, useCallback } from "react"
import type { Editor } from "@tiptap/react"

interface PageContent {
  id: string
  content: string
  wordCount: number
}

export const usePagination = (editor: Editor | null) => {
  const [pages, setPages] = useState<PageContent[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [isAutoBreaking, setIsAutoBreaking] = useState(false)
  const [manualMode, setManualMode] = useState(false)
  const [manualPages, setManualPages] = useState<PageContent[]>([
    { id: "page-0", content: "<p>Start writing on this page...</p>", wordCount: 0 },
  ])

  const WORDS_PER_PAGE = 400
  const MIN_WORDS_FOR_BREAK = 50

  // Add manual page management functions
  const addManualPage = useCallback(() => {
    const newPage: PageContent = {
      id: `page-${Date.now()}`,
      content: "<p>New page content...</p>",
      wordCount: 0,
    }
    setManualPages((prev) => [...prev, newPage])
    setCurrentPage(manualPages.length)
  }, [manualPages.length])

  const deleteManualPage = useCallback(
    (pageIndex: number) => {
      if (manualPages.length <= 1) return

      setManualPages((prev) => prev.filter((_, index) => index !== pageIndex))
      setCurrentPage(Math.max(0, Math.min(currentPage, manualPages.length - 2)))
    },
    [manualPages.length, currentPage],
  )

  const updateManualPageContent = useCallback((pageIndex: number, content: string) => {
    const wordCount = content
      .replace(/<[^>]*>/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 0).length

    setManualPages((prev) => prev.map((page, index) => (index === pageIndex ? { ...page, content, wordCount } : page)))
  }, [])

  const splitContentIntoPages = useCallback(() => {
    if (!editor || manualMode) return

    const html = editor.getHTML()
    const pageBreakSections = html.split('<div data-type="page-break"')

    const newPages: PageContent[] = pageBreakSections.map((section, index) => {
      const content = index === 0 ? section : '<div data-type="page-break"' + section
      const wordCount = content
        .replace(/<[^>]*>/g, "")
        .split(/\s+/)
        .filter((word) => word.length > 0).length

      return {
        id: `page-${index}`,
        content,
        wordCount,
      }
    })

    setPages(newPages)
  }, [editor, manualMode])

  const autoInsertPageBreaks = useCallback(() => {
    if (!editor || isAutoBreaking || manualMode) return

    setIsAutoBreaking(true)

    const content = editor.getHTML()
    const text = content.replace(/<[^>]*>/g, "")
    const words = text.split(/\s+/).filter((word) => word.length > 0)

    if (words.length > WORDS_PER_PAGE && !content.includes('data-type="page-break"')) {
      const targetPosition = Math.floor(words.length / 2)
      const breakPoint = Math.max(MIN_WORDS_FOR_BREAK, targetPosition)

      const firstHalf = words.slice(0, breakPoint).join(" ")
      const secondHalf = words.slice(breakPoint).join(" ")

      if (firstHalf && secondHalf) {
        const newContent = `<p>${firstHalf}</p><div data-type="page-break"></div><p>${secondHalf}</p>`
        editor.commands.setContent(newContent)
      }
    }

    setTimeout(() => setIsAutoBreaking(false), 100)
  }, [editor, isAutoBreaking, manualMode, WORDS_PER_PAGE, MIN_WORDS_FOR_BREAK])

  useEffect(() => {
    if (!editor || manualMode) return

    const handleUpdate = () => {
      splitContentIntoPages()
      const timer = setTimeout(autoInsertPageBreaks, 2000)
      return () => clearTimeout(timer)
    }

    editor.on("update", handleUpdate)
    splitContentIntoPages()

    return () => {
      editor.off("update", handleUpdate)
    }
  }, [editor, splitContentIntoPages, autoInsertPageBreaks, manualMode])

  return {
    pages: manualMode ? manualPages : pages,
    currentPage,
    setCurrentPage,
    totalPages: manualMode ? manualPages.length : pages.length,
    splitContentIntoPages,
    manualMode,
    setManualMode,
    addManualPage,
    deleteManualPage,
    updateManualPageContent,
    manualPages,
  }
}
