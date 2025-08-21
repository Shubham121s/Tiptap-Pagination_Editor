import { NodeViewWrapper } from "@tiptap/react"

const PageBreakComponent = () => {
  return (
    <NodeViewWrapper className="page-break-wrapper">
      <div className="page-break-line border-t-2 border-dashed border-blue-400 my-4 relative">
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-blue-600 font-medium">
          Page Break
        </span>
      </div>
    </NodeViewWrapper>
  )
}

export default PageBreakComponent
