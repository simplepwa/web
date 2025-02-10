"use client"
import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import Navbar from "./components/navbar"
import PackageCard from "./components/package-card"
import VideoPlayer from "./components/video-player"
import AssetGenerator from "./components/asset-generator"

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, {
    once: true,
    amount: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.main className="min-h-screen" initial="hidden" animate="visible" variants={containerVariants}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <motion.div className="space-y-8" variants={containerVariants}>
            {/* Rating and Tagline */}
            <motion.div className="space-y-2" variants={itemVariants}>
              <div className="flex items-center gap-1">
                {Array(5)
                  .fill("⭐")
                  .map((star, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {star}
                    </motion.span>
                  ))}
                <motion.span
                  className="text-white ml-2 text-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  in need of your reviews
                </motion.span>
              </div>
              <motion.p className="text-white text-xl" variants={itemVariants}>
                do real work and leave this to us
              </motion.p>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-6xl md:text-7xl text-white leading-none tracking-tight font-bold"
              variants={textVariants}
            >
              create{" "}
              <motion.span
                className="magnifier inline-block"
                whileHover={{ scale: 1.2, rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                🔍
              </motion.span>{" "}
              PWA
              <br />
              in
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                ⚡
              </motion.span>
              minutes.
            </motion.h1>

            {/* Subheadline */}
            <motion.p className="text-2xl text-gray-400 leading-relaxed" variants={itemVariants}>
              Get a web apps <span className="highlight">faster.</span> Create a pwa, add package and{" "}
              <span className="highlight">quickly </span> to thousands of <span className="highlight">start</span> free
              from hassle.
            </motion.p>

            {/* Feature List */}
            <motion.ul className="space-y-4 text-xl" variants={containerVariants}>
              {[
                'Numbers of <span class="feature-link">verified</span> package user',
                '5 minute <span class="feature-link">application</span> process',
                '<span class="feature-link">create</span> within 2 min',
                '<span class="feature-link">Secure</span> and safe',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-4 text-gray-400"
                  variants={itemVariants}
                  whileHover={{ x: 10, color: "#ff00d4" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.span
                    className="text-white"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ✓
                  </motion.span>{" "}
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="absolute -top-6 right-0 bg-[#ff00d4] text-white px-6 py-2.5 rounded-full text-xl font-bold flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ⚡ Now up to 10x faster!
            </motion.div>

            <PackageCard />
          </motion.div>
        </div>

        {/* Video Showcase Section */}
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="mt-32 space-y-12"
          id="how-it-works"
        >
          <motion.div className="text-center space-y-6" variants={containerVariants}>
            <motion.h2 className="text-6xl md:text-7xl font-bold text-white leading-none" variants={itemVariants}>
              Watch the <span className="text-[#ff00d4]">magic</span> ✨
            </motion.h2>
            <motion.p className="text-2xl text-gray-400 max-w-2xl mx-auto" variants={itemVariants}>
              Seriously, it&apos;s so easy you might think we&apos;re using magic tricks 🎩
              <br />
              But nope, just some really cool tech!
            </motion.p>
          </motion.div>

          <VideoPlayer />

          <motion.div className="grid md:grid-cols-3 gap-6" variants={containerVariants}>
            {[
              {
                title: "Grab the package 📦",
                description: 'Just a quick <span class="text-[#ff00d4]">npm install</span> and you&apos;re ready!',
              },
              {
                title: "Add some spice 🌶️",
                description: 'Drop in your <span class="text-[#ff00d4]">config</span> - it&apos;s that simple!',
              },
              {
                title: "Launch it 🚀",
                description: 'Hit <span class="text-[#ff00d4]">deploy</span> and watch it fly!',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-[#232323] p-8 rounded-xl space-y-4"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-14 h-14 bg-[#ff00d4] rounded-full flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-2xl font-bold">{index + 1}</span>
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    <p className="text-xl text-gray-400 mt-2" dangerouslySetInnerHTML={{ __html: step.description }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center pt-8" variants={containerVariants}>
            <motion.p className="text-2xl text-gray-400 mb-8" variants={itemVariants}>
              Still reading? Come on, your PWA is waiting to be born! 🐣
            </motion.p>
            <motion.button
              className="bg-[#ff00d4] text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-[#d600b0] transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 0, 212, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Let&apos;s create something awesome →
            </motion.button>
          </motion.div>

          {/* Asset Generator Section */}
          <motion.div
            className="mt-32 space-y-12"
            id="asset"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          >
            <motion.div className="text-center space-y-6" variants={containerVariants}>
              <motion.h2 className="text-6xl md:text-7xl font-bold text-white leading-none" variants={itemVariants}>
                Need PWA <span className="text-[#ff00d4]">icons</span>? 🎯
              </motion.h2>
              <motion.p className="text-2xl text-gray-400 max-w-2xl mx-auto" variants={itemVariants}>
                Don&apos;t waste time creating different sizes manually!
                <br />
                Our magic wand will do it for you ✨
              </motion.p>
            </motion.div>

            <AssetGenerator />
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  )
}

