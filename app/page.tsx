/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Navbar from './components/navbar'
import PackageCard from './components/package-card'
import VideoPlayer from './components/video-player'
import AssetGenerator from './components/asset-generator'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                {'⭐'.repeat(5)}
                <span className="text-white ml-2 text-xl">in need of your reviews</span>
              </div>
              <p className="text-white text-xl">
                do real work and leave this to us
              </p>
            </div>
            
            <h1 className="text-6xl md:text-7xl text-white leading-none tracking-tight font-bold">
              create <span className="magnifier">🔍</span> PWA<br />
              in⚡minutes.
            </h1>
            
            <p className="text-2xl text-gray-400 leading-relaxed">
              Get a web apps <span className="highlight">faster.</span> Create a pwa, add package and{' '}
              <span className="highlight">quickly </span> to thousands of{' '}
              <span className="highlight">start</span> free from hassle.
            </p>
            
            <ul className="space-y-4 text-xl">
              <li className="flex items-center gap-4 text-gray-400">
                <span className="text-white">✓</span> 
                Numbers of <span className="feature-link">verified</span> package user
              </li>
              <li className="flex items-center gap-4 text-gray-400">
                <span className="text-white">✓</span> 
                5 minute <span className="feature-link">application</span> process
              </li>
              <li className="flex items-center gap-4 text-gray-400">
                <span className="text-white">✓</span> 
                <span className="feature-link">create</span> within 2 min 
              </li>
              <li className="flex items-center gap-4 text-gray-400">
                <span className="text-white">✓</span> 
                <span className="feature-link">Secure</span> and safe
              </li>
            </ul>
          </div>
          
          <div className="relative">
            <div className="absolute -top-6 right-0 bg-[#ff00d4] text-white px-6 py-2.5 rounded-full text-xl font-bold flex items-center gap-2">
              ⚡ Now up to 10x faster!
            </div>
            
            <PackageCard />
          </div>
        </div>

        {/* Video Showcase Section */}
        <div className="mt-32 space-y-12" id="how-it-works">
          <div className="text-center space-y-6">
            <h2 className="text-6xl md:text-7xl font-bold text-white leading-none">
              Watch the <span className="text-[#ff00d4]">magic</span> ✨
            </h2>
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
              Seriously, it's so easy you might think we're using magic tricks 🎩
              <br />But nope, just some really cool tech! 
            </p>
          </div>

          <VideoPlayer />

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#232323] p-8 rounded-xl space-y-4 transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#ff00d4] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Grab the package 📦</h3>
                  <p className="text-xl text-gray-400 mt-2">
                    Just a quick <span className="text-[#ff00d4]">npm install</span> and you're ready!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#232323] p-8 rounded-xl space-y-4 transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#ff00d4] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Add some spice 🌶️</h3>
                  <p className="text-xl text-gray-400 mt-2">
                    Drop in your <span className="text-[#ff00d4]">config</span> - it's that simple!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#232323] p-8 rounded-xl space-y-4 transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#ff00d4] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Launch it 🚀</h3>
                  <p className="text-xl text-gray-400 mt-2">
                    Hit <span className="text-[#ff00d4]">deploy</span> and watch it fly!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-8">
            <p className="text-2xl text-gray-400 mb-8">
              Still reading? Come on, your PWA is waiting to be born! 🐣
            </p>
            <button className="bg-[#ff00d4] text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-[#d600b0] transition-all transform hover:scale-105">
              Let's create something awesome →
            </button>
          </div>

          {/* Asset Generator Section */}
          <div className="mt-32 space-y-12" id="asset">
            <div className="text-center space-y-6">
              <h2 className="text-6xl md:text-7xl font-bold text-white leading-none">
                Need PWA <span className="text-[#ff00d4]">icons</span>? 🎯
              </h2>
              <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
                Don't waste time creating different sizes manually!<br />
                Our magic wand will do it for you ✨
              </p>
            </div>

            <AssetGenerator />
          </div>
        </div>
      </div>
    </main>
  )
}

