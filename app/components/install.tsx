// import type React from "react"
// import { useState, useEffect } from "react"

// interface BeforeInstallPromptEvent extends Event {
//   prompt: () => Promise<void>
//   userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
// }

// const InstallPrompt: React.FC = () => {
//   const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
//   const [showPrompt, setShowPrompt] = useState(false)
//   const userAgent = window.navigator.userAgent

//   const isIOSDevice = /ipad|iphone|ipod/.test(userAgent) && !("MSStream" in window)

//   useEffect(() => {
//     window.addEventListener("beforeinstallprompt", (e: Event) => {
//       e.preventDefault()
//       setDeferredPrompt(e as BeforeInstallPromptEvent)
//       setShowPrompt(true)
//     })

//     return () => {
//       window.removeEventListener("beforeinstallprompt", () => {})
//     }
//   }, [])

//   const handleInstall = async () => {
//     if (deferredPrompt) {
//       deferredPrompt.prompt()
//       const choiceResult = await deferredPrompt.userChoice
//       console.log(choiceResult)
//       setDeferredPrompt(null)
//       setShowPrompt(false)
//     }
//   }

//   if (showPrompt) {
//     return (
//       <div>
//         <button onClick={handleInstall}>Install</button>
//       </div>
//     )
//   }

//   return null
// }

// export default InstallPrompt

