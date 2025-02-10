"use client"

import { useState, useEffect } from "react"
import { Copy } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function PackageCard() {
  const [copied, setCopied] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const packageCommand = "npm i -g @simplepwa/nextjs-pwa-setup"

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
    <motion.div
      className="gradient-card p-8 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <motion.span
          className="text-3xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
        >
          🏃
        </motion.span>
        <h2 className="text-3xl text-black font-bold">Let&apos;s go!</h2>
      </div>

      <div className="space-y-6">
        <motion.div
          className="package-box p-4 cursor-pointer group relative"
          onClick={copyToClipboard}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <code className="text-lg">{packageCommand}</code>
            <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
              <Copy className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
            </motion.div>
          </div>
          <AnimatePresence>
            {copied && (
              <motion.div
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                Copied!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.button
          className="w-full bg-blue-600 text-white rounded-lg py-4 text-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Let&apos;s get started
          <motion.span
            className="text-2xl"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  )
}

