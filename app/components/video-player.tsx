'use client'

import { useState } from 'react'

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }
  
  return (
    <div className="bg-[#232323] rounded-2xl p-8 w-full">
      <div className="aspect-video relative rounded-xl overflow-hidden bg-black">
        <video 
          className="w-full h-full object-cover"
          controls
          poster="/placeholder.svg?height=720&width=1280"
        >
          <source src="/tutorial.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}
