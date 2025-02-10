"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import PackageCard from "./package-card"

export default function Navbar() {
  const [isClient, setIsClient] = useState(false)
  const [showPackageCard, setShowPackageCard] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full py-5 px-8"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="text-2xl text-white font-bold tracking-wide">
              PWA-SIMPle
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center gap-10">
            {["how-it-works", "asset", "package"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item === "package" ? "#" : `#${item}`}
                  className="text-lg text-gray-300 hover:text-white font-comic relative group"
                  onClick={(e) => {
                    if (item === "package") {
                      e.preventDefault()
                      setShowPackageCard(!showPackageCard)
                    }
                  }}
                >
                  {item === "how-it-works" ? "How it works" : item === "asset" ? "PWA-Asset" : "Package"}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
                    initial={false}
                    animate={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.nav>

      {showPackageCard && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowPackageCard(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <PackageCard />
          </div>
        </motion.div>
      )}
    </>
  )
}

