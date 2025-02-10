'use client'

import { useState, useRef } from 'react'
import { Upload, ImageIcon, Package } from 'lucide-react'
import JSZip from 'jszip'

interface GeneratedAsset {
  name: string
  blob: Blob
}

export default function AssetGenerator() {
  const [preview, setPreview] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [assets, setAssets] = useState<GeneratedAsset[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const iconSizes = [
    { name: 'favicon-16x16.ico', size: 16 },
    { name: 'favicon-32x32.ico', size: 32 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'icon-48x48.png', size: 48 },
    { name: 'icon-72x72.png', size: 72 },
    { name: 'icon-96x96.png', size: 96 },
    { name: 'icon-128x128.png', size: 128 },
    { name: 'icon-144x144.png', size: 144 },
    { name: 'icon-152x152.png', size: 152 },
    { name: 'icon-192x192.png', size: 192 },
    { name: 'icon-384x384.png', size: 384 },
    { name: 'icon-512x512.png', size: 512 },
    { name: 'apple-touch-icon-57x57.png', size: 57 },
    { name: 'apple-touch-icon-60x60.png', size: 60 },
    { name: 'apple-touch-icon-72x72.png', size: 72 },
    { name: 'apple-touch-icon-76x76.png', size: 76 },
    { name: 'apple-touch-icon-114x114.png', size: 114 },
    { name: 'apple-touch-icon-120x120.png', size: 120 },
    { name: 'apple-touch-icon-144x144.png', size: 144 },
    { name: 'apple-touch-icon-152x152.png', size: 152 },
    { name: 'apple-touch-icon-180x180.png', size: 180 },
    { name: 'maskable_icon-192x192.png', size: 192 },
    { name: 'maskable_icon-512x512.png', size: 512 },
    { name: 'og-image.png', size: { width: 1200, height: 630 } },
    { name: 'twitter-card.png', size: { width: 1024, height: 512 } },
    { name: 'iPhone-X-XR-11-Pro-1125x2436.png', size: { width: 1125, height: 2436 } },
    { name: 'iPhone-XR-11-828x1792.png', size: { width: 828, height: 1792 } },
    { name: 'iPhone-XS-Max-11-Pro-Max-1242x2688.png', size: { width: 1242, height: 2688 } },
    { name: 'iPhone-6-6S-7-8-SE-750x1334.png', size: { width: 750, height: 1334 } },
    { name: 'iPad-Mini-Air-Pro-9.7-inch-1536x2048.png', size: { width: 1536, height: 2048 } },
    { name: 'iPad-Pro-11-inch-1668x2388.png', size: { width: 1668, height: 2388 } },
    { name: 'iPad-Pro-12.9-inch-2048x2732.png', size: { width: 2048, height: 2732 } }
  ];
  
  

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

      for (const { name, size } of iconSizes) {
        const sizeArray = Array.isArray(size) ? size : [size]

        for (const size of sizeArray) {
          const width = typeof size === 'object' ? size.width : size
          const height = typeof size === 'object' ? size.height : size
          const canvas = document.createElement('canvas')
          canvas.width = width!
          canvas.height = height!
          const ctx = canvas.getContext('2d')

          if (ctx) {
            ctx.drawImage(img, 0, 0, width!, height!)
            const blob = await new Promise<Blob>((resolve) =>
              canvas.toBlob((blob) => resolve(blob as Blob), 'image/png')
            )
            generatedAssets.push({ name, blob })
          }
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
    assets.forEach(({ name, blob }) => {
      assetsFolder.file(name, blob)
    })


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
                {assets.map(({ name }) => (
                  <div
                    key={name}
                    className="bg-black/30 p-4 rounded-lg text-center"
                  >
                    <ImageIcon className="w-6 h-6 mx-auto mb-2 text-[#ff00d4]" />
                    <p className="text-white text-sm">{name}</p>
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