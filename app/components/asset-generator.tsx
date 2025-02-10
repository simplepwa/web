'use client'

import { useState, useRef } from 'react'
import { Upload, ImageIcon, Package } from 'lucide-react'
import JSZip from 'jszip'

interface GeneratedAsset {
  size: string
  blob: Blob
}

export default function AssetGenerator() {
  const [preview, setPreview] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [assets, setAssets] = useState<GeneratedAsset[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const iconSizes = [
    '72x72', '96x96', '128x128', '144x144', 
    '152x152', '192x192', '384x384', '512x512'
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
      setAssets([])
    }
    reader.readAsDataURL(file)
  }

  const generateAssets = async () => {
    if (!preview) return
    
    setIsGenerating(true)
    const generatedAssets: GeneratedAsset[] = []

    try {
      const img = new Image()
      img.src = preview
      await new Promise((resolve) => (img.onload = resolve))

      for (const size of iconSizes) {
        const [width, height] = size.split('x').map(Number)
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height)
          const blob = await new Promise<Blob>((resolve) => 
            canvas.toBlob((blob) => resolve(blob as Blob), 'image/png')
          )
          generatedAssets.push({ size, blob })
        }
      }

      setAssets(generatedAssets)
    } catch (error) {
      console.error('Error generating assets:', error)
    }
    
    setIsGenerating(false)
  }

  

  const downloadPackage = async () => {
    const zip = new JSZip()
    
    // Create assets folder
    const assetsFolder = zip.folder("assets")
    if (!assetsFolder) return

    // Add icons
    assets.forEach(({ size, blob }) => {
      assetsFolder.file(`icon-${size}.png`, blob)
    })

    // Add manifest
   

    // Add README
 

    // Generate and download zip
    const content = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(content)
    const a = document.createElement('a')
    a.href = url
    a.download = 'assets.zip'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-[#232323] rounded-2xl p-8 w-full space-y-8">
      <div className="text-center space-y-4">
        <h3 className="text-3xl font-bold text-white">
          PWA Asset Generator 🎨
        </h3>
        <p className="text-xl text-gray-400">
          Drop your logo and we&apos;ll create all the icons you need!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div 
            className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-[#ff00d4] transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={preview} 
                alt="Preview" 
                className="max-h-48 mx-auto rounded-lg"
              />
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 mx-auto text-gray-400" />
                <p className="text-gray-400 text-lg">
                  Click to upload your image<br />
                  <span className="text-sm">
                    (Recommended: 512x512 or larger)
                  </span>
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          <button
            onClick={generateAssets}
            disabled={!preview || isGenerating}
            className="w-full bg-[#ff00d4] text-white px-6 py-3 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#d600b0] transition-colors"
          >
            {isGenerating ? 'Generating...' : 'Generate Assets'}
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-black/30 rounded-xl p-6 h-[280px] overflow-y-auto">
            {assets.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {assets.map(({ size }) => (
                  <div 
                    key={size}
                    className="bg-black/30 p-4 rounded-lg text-center"
                  >
                    <ImageIcon className="w-6 h-6 mx-auto mb-2 text-[#ff00d4]" />
                    <p className="text-white text-sm">{size}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-lg text-center">
                {preview ? 
                  'Click Generate to create your assets' : 
                  'Upload an image to get started'}
              </div>
            )}
          </div>

          {assets.length > 0 && (
            <button
              onClick={downloadPackage}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              Download PWA Package
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

