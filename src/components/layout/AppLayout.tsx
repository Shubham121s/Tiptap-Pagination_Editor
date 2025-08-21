import type React from "react"
import Sidebar from "./Sidebar"
import EditorWrapper from "../editor/EditorWrapper"
import ThumbnailsSidebar from "../editor/ThumbnailsSidebar"

const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col bg-gray-100">
        <EditorWrapper />
      </main>

      <ThumbnailsSidebar />
    </div>
  )
}

export default AppLayout

