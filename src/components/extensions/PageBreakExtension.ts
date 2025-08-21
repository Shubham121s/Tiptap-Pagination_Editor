import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import PageBreakView from "../../components/editor/PageBreakView"

export interface PageBreakOptions {
  HTMLAttributes: Record<string, any>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    pageBreak: {
      setPageBreak: () => ReturnType
    }
  }
}

export const PageBreak = Node.create<PageBreakOptions>({
  name: "pageBreak",

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: "block",

  parseHTML() {
    return [
      {
        tag: 'div[data-type="page-break"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "page-break",
        class: "page-break-element",
        style: "page-break-after: always; break-after: page;",
      }),
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(PageBreakView)
  },

  addCommands() {
    return {
      setPageBreak:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
          })
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setPageBreak(),
      "Ctrl-Shift-Enter": () => this.editor.commands.setPageBreak(),
    }
  },
})
