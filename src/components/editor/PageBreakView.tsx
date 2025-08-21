import { NodeViewWrapper } from "@tiptap/react"

const PageBreakView = () => {
  return (
    <NodeViewWrapper className="page-break-wrapper my-8">
      <div className="relative">
        <div className="border-t-2 border-dashed border-blue-500 relative">
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 text-xs font-medium text-blue-600 border border-blue-200 rounded-full shadow-sm">
            Page Break
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  )
}

export default PageBreakView
