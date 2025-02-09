"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <motion.div
      className="bg-[#232323] rounded-2xl p-8 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="aspect-video relative rounded-xl overflow-hidden bg-black"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster="/placeholder.svg?height=720&width=1280"
          onClick={togglePlay}
        >
          <source src="/tutorial.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <AnimatePresence>
          {isHovering && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                className="bg-white bg-opacity-20 rounded-full p-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

