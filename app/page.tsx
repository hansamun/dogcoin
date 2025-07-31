"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function Component() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [backgroundColor, setBackgroundColor] = useState("from-sky-300 to-sky-400")
  const [currentPage, setCurrentPage] = useState("home") // home, about, tokenomics, memes
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const clouds = [
    { id: 1, top: "15%", left: "10%", size: "w-20 h-16", image: "/cloud1.png", duration: "25s", delay: "0s" },
    { id: 2, top: "8%", left: "75%", size: "w-24 h-18", image: "/cloud2.png", duration: "30s", delay: "3s" },
    { id: 3, top: "12%", left: "45%", size: "w-18 h-14", image: "/cloud3.png", duration: "20s", delay: "6s" },
    { id: 4, top: "18%", left: "85%", size: "w-22 h-16", image: "/cloud1.png", duration: "35s", delay: "9s" },
    { id: 5, top: "10%", left: "25%", size: "w-20 h-16", image: "/cloud2.png", duration: "28s", delay: "12s" },
    { id: 6, top: "75%", left: "60%", size: "w-16 h-12", image: "/cloud3.png", duration: "22s", delay: "15s" },
    { id: 7, top: "80%", left: "15%", size: "w-20 h-16", image: "/cloud1.png", duration: "32s", delay: "18s" },
    { id: 8, top: "85%", left: "90%", size: "w-18 h-14", image: "/cloud2.png", duration: "26s", delay: "21s" },
    { id: 9, top: "75%", left: "35%", size: "w-22 h-16", image: "/cloud3.png", duration: "24s", delay: "24s" },
    { id: 10, top: "45%", left: "5%", size: "w-24 h-18", image: "/cloud1.png", duration: "29s", delay: "27s" },
    { id: 11, top: "45%", left: "70%", size: "w-20 h-16", image: "/cloud2.png", duration: "27s", delay: "30s" },
    { id: 12, top: "85%", left: "50%", size: "w-16 h-12", image: "/cloud3.png", duration: "23s", delay: "33s" },
    { id: 13, top: "25%", left: "95%", size: "w-18 h-14", image: "/cloud1.png", duration: "31s", delay: "36s" },
    { id: 14, top: "65%", left: "20%", size: "w-20 h-16", image: "/cloud2.png", duration: "33s", delay: "39s" },
    { id: 15, top: "35%", left: "80%", size: "w-22 h-16", image: "/cloud3.png", duration: "21s", delay: "42s" },
    { id: 16, top: "55%", left: "40%", size: "w-18 h-14", image: "/cloud1.png", duration: "26s", delay: "45s" },
    { id: 17, top: "30%", left: "65%", size: "w-20 h-16", image: "/cloud2.png", duration: "28s", delay: "48s" },
    { id: 18, top: "70%", left: "10%", size: "w-16 h-12", image: "/cloud3.png", duration: "24s", delay: "51s" },
  ]

  const colorCircles = [
    {
      color: "bg-yellow-400",
      gradient: "from-yellow-300 to-yellow-500",
      name: "yellow",
    },
    {
      color: "bg-red-500",
      gradient: "from-red-400 to-red-600",
      name: "red",
    },
    {
      color: "bg-purple-500",
      gradient: "from-purple-400 to-purple-600",
      name: "purple",
    },
    {
      color: "bg-gray-400",
      gradient: "from-gray-300 to-gray-500",
      name: "gray",
    },
    {
      color: "bg-pink-400",
      gradient: "from-pink-300 to-pink-500",
      name: "pink",
    },
    {
      color: "bg-orange-500",
      gradient: "from-orange-400 to-orange-600",
      name: "orange",
    },
    {
      color: "bg-green-500",
      gradient: "from-green-400 to-green-600",
      name: "green",
    },
    {
      color: "bg-blue-500",
      gradient: "from-sky-300 to-sky-400",
      name: "blue",
    },
  ]

  const memes = [
    { id: 1, src: "/memes/meme1.jpeg", title: "Starry Night Dog" },
    { id: 2, src: "/memes/meme2.jpeg", title: "Zen Master Dog" },
    { id: 3, src: "/memes/meme3.jpeg", title: "Grumpy Dog" },
    { id: 4, src: "/memes/meme4.jpeg", title: "Space Explorer Dog" },
    { id: 5, src: "/memes/meme5.jpeg", title: "Astronaut Dog" },
    { id: 6, src: "/memes/meme6.jpeg", title: "Rich Dog" },
    { id: 7, src: "/memes/meme7.jpeg", title: "Super Dog" },
    { id: 8, src: "/memes/meme8.jpeg", title: "Green Candle Dog" },
    { id: 9, src: "/memes/meme9.jpeg", title: "Bull Market Dog" },
    { id: 10, src: "/memes/meme10.jpeg", title: "Street Dog" },
  ]

  const handleColorChange = (gradient: string) => {
    setBackgroundColor(gradient)
  }

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
  }

  const initializeAudio = () => {
    if (!audioRef) {
      const audio = new Audio("/song.mp3")
      audio.volume = volume
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration)
      })
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime)
      })
      audio.addEventListener("ended", () => {
        setIsPlaying(false)
        setCurrentTime(0)
      })
      setAudioRef(audio)
      return audio
    }
    return audioRef
  }

  const togglePlayPause = () => {
    const audio = initializeAudio()
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = initializeAudio()
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = initializeAudio()
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newVolume = clickX / rect.width
    audio.volume = newVolume
    setVolume(newVolume)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const renderHomePage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 relative z-10">
      {/* Logo */}
      <div className="text-center mb-6 md:mb-8 px-2">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-white mb-2 md:mb-4 tracking-wider drop-shadow-lg"
          style={{
            fontFamily: "Fredoka One, cursive",
            textShadow: "2px 2px 0px #1E40AF, 4px 4px 0px #1E3A8A",
          }}
        >
          <span className="inline-block transform hover:scale-105 transition-transform duration-300">DOGCOIN</span>
        </h1>
        <p
          className="text-blue-600 text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-widest px-4"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          THE SPIRIT OF LOYALTY
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8 px-4">
        {[
          { label: "BUY", action: () => {} },
          { label: "TG", action: () => {} },
          { label: "X", action: () => {} },
          { label: "DEX", action: () => {} },
          { label: "ABOUT", action: () => handleNavigation("about") },
          { label: "TOKENOMIC", action: () => handleNavigation("tokenomics") },
          { label: "MEMES", action: () => handleNavigation("memes") },
          { label: "MUSIC", action: () => handleNavigation("music") },
        ].map((item) => (
          <Button
            key={item.label}
            onClick={item.action}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full text-sm sm:text-base md:text-lg border-2 md:border-4 border-black shadow-lg transform hover:scale-105 transition-all duration-200 hover:shadow-xl cursor-pointer"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "600",
            }}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {/* Interactive Color Circles */}
      <div className="flex justify-center gap-2 sm:gap-3 mb-8 md:mb-16 px-4">
        {colorCircles.map((circle, index) => (
          <div
            key={index}
            onClick={() => handleColorChange(circle.gradient)}
            className={`w-5 h-5 sm:w-6 sm:h-6 ${circle.color} rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-125 transition-all duration-200 hover:shadow-xl active:scale-110`}
            title={`Change to ${circle.name} theme`}
          />
        ))}
      </div>

      {/* Secondary Text */}
      <div className="text-center px-4">
        <h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-wider"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          THE SPIRIT WITHIN YOU
        </h2>
      </div>
    </div>
  )

  const renderAboutPage = () => (
    <div className="min-h-screen px-4 py-8 relative z-10">
      {/* Back Button - Move to right side */}
      <Button
        onClick={() => handleNavigation("home")}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-20 bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 backdrop-blur-sm text-sm md:text-base px-3 py-2 md:px-4 md:py-2"
      >
        <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
        <span className="hidden sm:inline">Back to Home</span>
        <span className="sm:hidden">Back</span>
      </Button>

      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-screen">
        {/* About Header */}
        <div className="text-center mb-12">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white mb-6 md:mb-8 tracking-wider drop-shadow-lg px-4"
            style={{
              fontFamily: "Fredoka One, cursive",
              textShadow: "2px 2px 0px #1E40AF, 4px 4px 0px #1E3A8A",
            }}
          >
            ABOUT DOGCOIN
          </h1>

          {/* Single About Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-3xl mx-auto mx-4">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <p
                className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed text-left"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <strong className="text-yellow-400">DOGCOIN</strong> is the most loyal meme cryptocurrency built on the{" "}
                <strong className="text-blue-400">Base Network</strong>. Born from the spirit of man's best friend,
                DOGCOIN represents unwavering loyalty, trust, and community bonds that make crypto fun again.
                <br />
                <br />
                As the latest meme hype taking the crypto world by storm, DOGCOIN combines the playful nature of dog
                memes with serious blockchain technology. Our community-driven approach ensures that every holder is
                part of the pack, working together to create something truly special.
                <br />
                <br />
                You can find DOGCOIN listed on <strong className="text-green-400">Ape Store</strong> and other major
                platforms, making it easy for everyone to join our loyal community. Whether you're a seasoned crypto
                veteran or new to the space, DOGCOIN welcomes all with open paws.
                <br />
                <br />
                Join the pack and experience <strong className="text-purple-400">THE SPIRIT OF LOYALTY</strong> that
                only DOGCOIN can provide. Together, we're not just building a cryptocurrency – we're building a movement
                that celebrates the bond between humans and their most faithful companions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderTokenomicsPage = () => (
    <div className="min-h-screen px-4 py-8 relative z-10">
      {/* Back Button - Move to right side */}
      <Button
        onClick={() => handleNavigation("home")}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-20 bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 backdrop-blur-sm text-sm md:text-base px-3 py-2 md:px-4 md:py-2"
      >
        <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
        <span className="hidden sm:inline">Back to Home</span>
        <span className="sm:hidden">Back</span>
      </Button>

      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-screen">
        {/* Tokenomics Header */}
        <div className="text-center">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white mb-8 md:mb-12 tracking-wider drop-shadow-lg px-4"
            style={{
              fontFamily: "Fredoka One, cursive",
              textShadow: "2px 2px 0px #1E40AF, 4px 4px 0px #1E3A8A",
            }}
          >
            TOKENOMICS
          </h1>

          {/* Single Tokenomics Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-2xl mx-auto mx-4">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                {/* Supply */}
                <div className="text-center p-4 md:p-6 bg-white/10 rounded-xl border border-white/20">
                  <h3
                    className="text-white text-base md:text-lg mb-2 font-semibold"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    SUPPLY
                  </h3>
                  <p
                    className="text-2xl md:text-3xl font-bold text-yellow-400"
                    style={{ fontFamily: "Fredoka One, cursive" }}
                  >
                    1B
                  </p>
                </div>

                {/* Taxes */}
                <div className="text-center p-4 md:p-6 bg-white/10 rounded-xl border border-white/20">
                  <h3
                    className="text-white text-base md:text-lg mb-2 font-semibold"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    TAXES
                  </h3>
                  <p
                    className="text-2xl md:text-3xl font-bold text-green-400"
                    style={{ fontFamily: "Fredoka One, cursive" }}
                  >
                    0%
                  </p>
                </div>

                {/* Liquidity */}
                <div className="text-center p-4 md:p-6 bg-white/10 rounded-xl border border-white/20">
                  <h3
                    className="text-white text-base md:text-lg mb-2 font-semibold"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    LIQUIDITY
                  </h3>
                  <p
                    className="text-2xl md:text-3xl font-bold text-red-400"
                    style={{ fontFamily: "Fredoka One, cursive" }}
                  >
                    BURNT
                  </p>
                </div>
              </div>

              {/* Contract Address */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/20">
                <div className="text-center">
                  <p className="text-white/70 text-sm mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Contract Address:
                  </p>
                  <p
                    className="text-xl md:text-2xl font-bold text-yellow-400"
                    style={{ fontFamily: "Fredoka One, cursive" }}
                  >
                    COMING SOON
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderMemesPage = () => (
    <div className="min-h-screen px-4 py-8 relative z-10">
      {/* Back Button - Move to right side */}
      <Button
        onClick={() => handleNavigation("home")}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-20 bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 backdrop-blur-sm text-sm md:text-base px-3 py-2 md:px-4 md:py-2"
      >
        <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
        <span className="hidden sm:inline">Back to Home</span>
        <span className="sm:hidden">Back</span>
      </Button>

      <div className="max-w-7xl mx-auto">
        {/* Memes Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white mb-4 md:mb-6 tracking-wider drop-shadow-lg px-4"
            style={{
              fontFamily: "Fredoka One, cursive",
              textShadow: "2px 2px 0px #1E40AF, 4px 4px 0px #1E3A8A",
            }}
          >
            MEMES GALLERY
          </h1>
          <p
            className="text-blue-600 text-base sm:text-lg md:text-xl font-medium"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            The Best DOGCOIN Memes Collection
          </p>
        </div>

        {/* Memes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {memes.map((meme) => (
            <Card
              key={meme.id}
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
            >
              <CardContent className="p-3 md:p-4">
                <div className="aspect-square relative overflow-hidden rounded-lg mb-3">
                  <img
                    src={meme.src || "/placeholder.svg"}
                    alt={meme.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3
                  className="text-white text-sm md:text-base font-semibold text-center"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {meme.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderMusicPage = () => (
    <div className="min-h-screen px-4 py-8 relative z-10">
      {/* Back Button */}
      <Button
        onClick={() => handleNavigation("home")}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-20 bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 backdrop-blur-sm text-sm md:text-base px-3 py-2 md:px-4 md:py-2"
      >
        <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
        <span className="hidden sm:inline">Back to Home</span>
        <span className="sm:hidden">Back</span>
      </Button>

      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-screen">
        <div className="text-center w-full">
          {/* Music Header */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white mb-8 md:mb-12 tracking-wider drop-shadow-lg px-4"
            style={{
              fontFamily: "Fredoka One, cursive",
              textShadow: "2px 2px 0px #1E40AF, 4px 4px 0px #1E3A8A",
            }}
          >
            DOGCOIN BEATS
          </h1>

          {/* Music Player Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-2xl mx-auto mx-4">
            <CardContent className="p-6 md:p-8">
              {/* Song Title */}
              <h2
                className="text-2xl md:text-3xl font-bold text-white mb-2"
                style={{ fontFamily: "Fredoka One, cursive" }}
              >
                LOYAL VIBES
              </h2>
              <p className="text-white/70 text-lg mb-8" style={{ fontFamily: "Poppins, sans-serif" }}>
                DOGCOIN OFFICIAL
              </p>

              {/* Album Art Section */}
              <div className="flex items-center justify-center mb-8">
                {/* Main Album Art */}
                <div
                  className={`w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden border-4 border-white/30 shadow-2xl relative ${isPlaying ? "animate-pulse" : ""}`}
                >
                  <img src="/music-dog.jpeg" alt="DOGCOIN Music" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-center gap-6 mb-6">
                <Button
                  className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 border border-white/30"
                  size="icon"
                  onClick={() => {
                    const audio = initializeAudio()
                    audio.currentTime = 0
                    setCurrentTime(0)
                  }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6h-4z" />
                  </svg>
                </Button>

                <Button
                  className="w-16 h-16 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg transform hover:scale-105 transition-all"
                  size="icon"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </Button>

                <Button
                  className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 border border-white/30"
                  size="icon"
                  onClick={() => {
                    const audio = initializeAudio()
                    audio.currentTime = Math.min(audio.currentTime + 10, duration)
                  }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                  </svg>
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-white/70 text-sm">{formatTime(currentTime)}</span>
                  <div
                    className="flex-1 bg-white/20 rounded-full h-2 relative cursor-pointer"
                    onClick={handleProgressChange}
                  >
                    <div
                      className="bg-yellow-400 h-2 rounded-full relative transition-all duration-100"
                      style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                    >
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
                    </div>
                  </div>
                  <span className="text-white/70 text-sm">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
                <div
                  className="flex-1 bg-white/20 rounded-full h-2 relative cursor-pointer"
                  onClick={handleVolumeChange}
                >
                  <div
                    className="bg-white h-2 rounded-full relative transition-all duration-100"
                    style={{ width: `${volume * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
                  </div>
                </div>
              </div>

              {/* Now Playing Status */}
              <div className="text-center">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isPlaying ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/70"} transition-all`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${isPlaying ? "bg-green-400 animate-pulse" : "bg-white/50"}`}
                  ></div>
                  <span className="text-sm font-medium">{isPlaying ? "Now Playing" : "Paused"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${backgroundColor} relative overflow-hidden custom-cursor transition-all duration-1000 ease-in-out`}
    >
      {/* Google Fonts Import */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Poppins:wght@400;500;600&family=Montserrat:wght@600;700&family=Nunito:wght@700;800&display=swap"
        rel="stylesheet"
      />

      {/* Dog Logo - Top Left Corner */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
        <img
          src="/new-blue-dog-mascot.png"
          alt="DOGCOIN Mascot"
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 hover:scale-110 transition-transform duration-300 cursor-pointer"
          style={{ filter: "drop-shadow(0 0 0 transparent)" }}
          onClick={() => handleNavigation("home")}
        />
      </div>

      {/* Floating Clouds - Only show on home page and hide some on mobile */}
      {currentPage === "home" &&
        clouds.map((cloud, index) => (
          <div
            key={cloud.id}
            className={`absolute ${cloud.size} opacity-90 animate-drift-left ${index > 8 ? "hidden sm:block" : ""}`}
            style={{
              top: cloud.top,
              left: cloud.left,
              animationDuration: cloud.duration,
              animationDelay: cloud.delay,
            }}
          >
            <img
              src={cloud.image || "/placeholder.svg"}
              alt="Cloud"
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </div>
        ))}

      {/* Page Content */}
      <div className="transition-all duration-500 ease-in-out">
        {currentPage === "home" && renderHomePage()}
        {currentPage === "about" && renderAboutPage()}
        {currentPage === "tokenomics" && renderTokenomicsPage()}
        {currentPage === "memes" && renderMemesPage()}
        {currentPage === "music" && renderMusicPage()}
      </div>

      {/* Custom Cursor Styles */}
      <style jsx>{`
        .custom-cursor {
          cursor: url('/dog-cursor.png') 16 16, auto;
        }
        
        .custom-cursor * {
          cursor: url('/dog-cursor.png') 16 16, auto;
        }
        
        .cursor-pointer {
          cursor: url('/dog-cursor.png') 16 16, pointer;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes drift-left {
          0% { 
            transform: translateX(calc(100vw + 200px)); 
            opacity: 0;
          }
          5% {
            opacity: 0.9;
          }
          95% {
            opacity: 0.9;
          }
          100% { 
            transform: translateX(-200px); 
            opacity: 0;
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-drift-left {
          animation: drift-left linear infinite;
        }
      `}</style>
    </div>
  )
}
