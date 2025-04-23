"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FiHome,
  FiInfo,
  FiShield,
  FiHeart,
  FiCalendar,
  FiZoomIn,
  FiZoomOut,
  FiMenu,
  FiX,
  FiPhone,
  FiMail,
  FiMapPin,
  FiChevronDown,
  FiUser,
  FiSearch,
  FiMic,
  FiStopCircle ,
} from "react-icons/fi"
import { Outlet,NavLink, useNavigate} from "react-router-dom"
import React from "react"

export default function Layout() {
  const [fontSize, setFontSize] = useState(16)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [voiceInput, setVoiceInput] = useState("")
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hello! I'm your CommunityConnect assistant. How can I help you today?" }
  ])
  const [lastInputTime, setLastInputTime] = useState(0)
  const [confirmationMessage, setConfirmationMessage] = useState("");
  
  const recognitionRef = useRef(null)
  const navigate = useNavigate()
  const messagesEndRef = useRef(null)
  const timeoutRef = useRef(null)

  const increaseFontSize = () => {
    if (fontSize < 24) setFontSize(fontSize + 2)
  }

  const decreaseFontSize = () => {
    if (fontSize > 12) setFontSize(fontSize - 2)
  }

  const navItems = [
    { id: "home", label: "Home", icon: <FiHome /> },
    { id: "vital-info", label: "Vital Information", icon: <FiInfo /> },
    { id: "GovernmentServices", label: "Government Services", icon: <FiShield /> },
    { id: "HealthcarePage", label: "Healthcare Resources", icon: <FiHeart /> },
    { id: "events", label: "Community Events", icon: <FiCalendar /> },
  ]

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleChatbot = () => {
    setChatbotOpen(!chatbotOpen)
    if (!chatbotOpen) {
      setChatMessages([
        { sender: "bot", text: "Hello! I'm your CommunityConnect assistant. How can I help you today?" }
      ])
    }
  }


   // Initialize speech recognition
   useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = 'en-US'

        recognitionRef.current.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
          setVoiceInput(transcript)
          setLastInputTime(Date.now())
        }

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error', event.error)
          stopListening()
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      clearTimeout(timeoutRef.current)
    }
  }, [])

  // Check for silence after voice input
  useEffect(() => {
    if (isListening && lastInputTime > 0) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        if (isListening && Date.now() - lastInputTime > 2000) {
          handleVoiceCommand()
        }
      }, 2000)
    }
  }, [lastInputTime, isListening])

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const startListening = () => {
    if (recognitionRef.current) {
      setVoiceInput("")
      setIsListening(true)
      setIsActive(true)
      setConfirmationMessage("Listening...")
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
      setTimeout(() => {
        setIsActive(false)
        setConfirmationMessage("")
      }, 2000)
    }
  }

  const handleVoiceCommand = () => {
    if (voiceInput.trim() === "") {
      setConfirmationMessage("Sorry, I didn't catch that. Please try again.")
      setTimeout(() => setConfirmationMessage(""), 2000)
      return
    }
    
    const input = voiceInput.toLowerCase()
    let action = null
    let confirmation = ""

    if (input.includes("home") || input.includes("main page")) {
      confirmation = "Going to Home page..."
      action = () => navigate("/")
    } 
    else if (input.includes("health") || input.includes("clinic") || input.includes("hospital")) {
      confirmation = "Opening Healthcare Resources..."
      action = () => navigate("/HealthcarePage")
    }
    else if (input.includes("government") || input.includes("service") || input.includes("passport")) {
      confirmation = "Showing Government Services..."
      action = () => navigate("/GovernmentServices")
    }
    else if (input.includes("event") || input.includes("community") || input.includes("activity")) {
      confirmation = "Displaying Community Events..."
      action = () => navigate("/events")
    }
    else if (input.includes("increase") && (input.includes("font") || input.includes("text") || input.includes("size"))) {
      confirmation = "Increasing text size..."
      action = increaseFontSize
    }
    else if (input.includes("decrease") && (input.includes("font") || input.includes("text") || input.includes("size"))) {
      confirmation = "Decreasing text size..."
      action = decreaseFontSize
    }
    else {
      confirmation = "Command not recognized. Try saying 'Go to healthcare' or 'Show government services'"
    }

    setConfirmationMessage(confirmation)
    
    if (action) {
      setTimeout(() => {
        action()
        stopListening()
      }, 1500)
    } else {
      setTimeout(stopListening, 3000)
    }
  }


  return (
    <div className="min-h-screen flex flex-col" style={{ fontSize: `${fontSize}px` }}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <div className="text-2xl font-bold text-gray-800">
                <span className="text-blue-600">Community</span>Connect
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Search */}
              <div className="relative">
                <button 
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <FiSearch className="w-5 h-5" />
                </button>
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="absolute right-0 top-12 w-72 bg-white shadow-lg rounded-lg p-2 z-50"
                    >
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search resources..."
                          className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-600">
                          <FiSearch />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Font Size Controls */}
              <div className="flex items-center space-x-2 border-l border-r border-gray-200 px-4">
                <button
                  onClick={decreaseFontSize}
                  className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                  aria-label="Decrease font size"
                >
                  <FiZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs text-gray-400">Text Size</span>
                <button
                  onClick={increaseFontSize}
                  className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                  aria-label="Increase font size"
                >
                  <FiZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* User Actions */}
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                  <FiUser className="w-5 h-5" />
                  <span className="text-sm font-medium">Sign In</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <FiSearch className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>

          {/* Desktop Navbar */}
          <nav className="hidden lg:block border-t border-gray-100">
            <div className="flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.id === "home" ? "/" : `/${item.id}`}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 border-b-2 border-blue-500"
                        : "text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    }`
                  }
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="container mx-auto px-4 py-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search resources..."
                    className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-600">
                    <FiSearch />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.id === "home" ? "/" : `/${item.id}`}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                    onClick={toggleMobileMenu}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </NavLink>
                ))}

                <div className="border-t border-gray-100 pt-3 mt-2">
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-gray-600">Text Size</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={decreaseFontSize}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                        aria-label="Decrease font size"
                      >
                        <FiZoomOut className="w-4 h-4" />
                      </button>
                      <button
                        onClick={increaseFontSize}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                        aria-label="Increase font size"
                      >
                        <FiZoomIn className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <button className="flex items-center justify-center w-full py-3 px-4 mt-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  <FiUser className="mr-2" />
                  Sign In
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-grow bg-gray-50 pb-12">
        <div className="container mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      {/* Footer (unchanged from your previous implementation) */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">CommunityConnect</h3>
              <p className="text-gray-400 mb-4">
                Helping seniors and families access essential services with dignity and ease.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Resources</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Accessibility</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <FiMail className="mt-1 flex-shrink-0 text-gray-400" />
                  <span className="text-gray-400">support@communityconnect.org</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FiPhone className="flex-shrink-0 text-gray-400" />
                  <a href="tel:+18005551234" className="text-gray-400 hover:text-white transition-colors">+1 (800) 555-1234</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} CommunityConnect. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center">
              <p className="text-gray-400 text-sm mr-2">Powered by</p>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 11.5C4 10.1193 5.11929 9 6.5 9H17.5C18.8807 9 20 10.1193 20 11.5V17.5C20 18.8807 18.8807 20 17.5 20H6.5C5.11929 20 4 18.8807 4 17.5V11.5Z" fill="#74AA9C"/>
                <path d="M4 6.5C4 5.11929 5.11929 4 6.5 4H17.5C18.8807 4 20 5.11929 20 6.5V11.5C20 10.1193 18.8807 9 17.5 9H6.5C5.11929 9 4 10.1193 4 11.5V6.5Z" fill="#10A37F"/>
              </svg>
              <span className="text-gray-400 text-sm ml-1">OpenAI</span>
            </div>
          </div>
        </div>
      </footer>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {(isActive || confirmationMessage) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className={`absolute -top-20 right-0 bg-white shadow-lg rounded-full px-4 py-2 flex items-center ${
                isListening ? 'border-2 border-red-500' : ''
              }`}
            >
              {isListening ? (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm">
                    {voiceInput || "Listening..."}
                  </span>
                </>
              ) : (
                <span className="text-sm">{confirmationMessage || "Try saying 'Go to healthcare'"}</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={toggleListening}
          className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all ${
            isListening 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          aria-label={isListening ? "Stop listening" : "Start voice assistant"}
        >
          {isListening ? <FiStopCircle size={24} /> : <FiMic size={24} />}
        </button>
      </div>
    </div>
  )
}