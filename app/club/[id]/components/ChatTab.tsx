'use client'

import { MessageSquare } from 'lucide-react'

interface ChatTabProps {
  clubId: string
}

export function ChatTab({ clubId }: ChatTabProps) {
  return (
    <div className="h-[600px] bg-white rounded-lg shadow overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Club Chat</h3>
              <p className="text-sm text-gray-600">Real-time communication with your club members</p>
            </div>
            <a 
              href={`/club/${clubId}/chat`}
              className="btn btn-primary"
            >
              Open Chat
            </a>
          </div>
        </div>
        
        <div className="flex-1 p-6 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Discord-like Chat Interface</h4>
            <p className="text-gray-600 mb-6 max-w-md">
              Click "Open Chat" to access the full Discord-like experience with channels, 
              real-time messaging, member status, and voice/video capabilities.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-sm">
              <div className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Real-time messaging
              </div>
              <div className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Multiple channels
              </div>
              <div className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Member status
              </div>
              <div className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                Voice & video
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
