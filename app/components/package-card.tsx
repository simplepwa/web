'use client'

import { useState, useEffect } from 'react'
import { Copy } from 'lucide-react'

export default function PackageCard() {
  const [copied, setCopied] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const packageCommand = 'npm install PWA-simple'

  useEffect(() => {
    setIsClient(true)
  }, [])

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(packageCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!isClient) {
    return null // Or a loading skeleton
  }

  return (
    <div className="gradient-card p-8 w-full max-w-md">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">🏃</span>
        <h2 className="text-3xl text-black font-bold">Let&apos;s go!</h2>
      </div>
      
      <div className="space-y-6">
        <div 
          className="package-box p-4 cursor-pointer group relative"
          onClick={copyToClipboard}
        >
          <div className="flex items-center justify-between">
            <code className="text-lg">{packageCommand}</code>
            <Copy className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
          </div>
          {copied && (
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-sm">
              Copied!
            </div>
          )}
        </div>
        
        <button className="w-full bg-blue-600 text-white rounded-lg py-4 text-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          Let&apos;s get started <span className="text-2xl">→</span>
        </button>
      </div>
    </div>
  )
}