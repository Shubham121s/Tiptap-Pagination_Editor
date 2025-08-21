import type React from "react"

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-[#1E1E2D] text-white flex flex-col justify-between p-4">
      <div>
        <h1 className="text-xl font-bold mb-6">Vettam.AI</h1>

        <nav>
          <ul className="space-y-3">
            <li className="text-gray-400 hover:text-white cursor-pointer transition-colors">Workspace</li>
            <li className="text-gray-400 hover:text-white cursor-pointer transition-colors">Research</li>
            <li className="text-gray-400 hover:text-white cursor-pointer transition-colors">Translate</li>
            <li className="text-white font-medium">Write</li>
          </ul>
        </nav>

        <div className="mt-8">
          <h2 className="text-sm mb-3 text-gray-300">Recent Documents</h2>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="hover:text-white cursor-pointer transition-colors">Document 1</li>
            <li className="hover:text-white cursor-pointer transition-colors">Document 2</li>
            <li className="hover:text-white cursor-pointer transition-colors">Document 3</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-600 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm">MS</div>
          <div className="text-sm">
            <div className="text-white">Michael Smith</div>
            <div className="text-xs text-gray-400">Free Plan</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
