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
  FiStopCircle,
} from "react-icons/fi"
import { Outlet, NavLink, useNavigate } from "react-router-dom"
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
    { sender: "bot", text: "您好！我是您的社区连接助手。今天有什么可以帮您的吗？" }
  ])
  const [lastInputTime, setLastInputTime] = useState(0)
  const [confirmationMessage, setConfirmationMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredNavItems, setFilteredNavItems] = useState([])
  const [zoomLevel, setZoomLevel] = useState(1)

  const recognitionRef = useRef(null)
  const navigate = useNavigate()
  const messagesEndRef = useRef(null)
  const timeoutRef = useRef(null)

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 32))
  }

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 12))
  }

  const increaseZoomLevel = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 2))
  }
  
  const decreaseZoomLevel = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.5))
  }

  const navItems = [
    { id: "VitalInformationCn", label: "首页", labelEn: "Home", icon: <FiHome /> },
    { id: "GovernmentServicesCn", label: "政府服务", labelEn: "Government Services", icon: <FiShield /> },
    { id: "HealthcarePageCn", label: "医疗资源", labelEn: "Healthcare Resources", icon: <FiHeart /> },
    { id: "CommunityEventsCn", label: "社区活动", labelEn: "Community Events", icon: <FiCalendar /> },
  ]

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredNavItems([])
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = navItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query) || item.labelEn.toLowerCase().includes(query)
      )
      setFilteredNavItems(filtered)
    }
  }, [searchQuery])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleChatbot = () => {
    setChatbotOpen(!chatbotOpen)
    if (!chatbotOpen) {
      setChatMessages([
        { sender: "bot", text: "您好！我是您的社区连接助手。今天有什么可以帮您的吗？" }
      ])
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = 'zh-CN'

        recognitionRef.current.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
          setVoiceInput(transcript)
          setLastInputTime(Date.now())
        }

        recognitionRef.current.onerror = (event) => {
          console.error('语音识别错误', event.error)
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
      setConfirmationMessage("正在聆听...")
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
      setConfirmationMessage("抱歉，我没有听清楚，请再试一次")
      setTimeout(() => setConfirmationMessage(""), 2000)
      return
    }
    
    const input = voiceInput.toLowerCase()
    let action = null
    let confirmation = ""

    if (input.includes("首页") || input.includes("主页")) {
      confirmation = "正在前往首页..."
      action = () => navigate("/")
    } 
    else if (input.includes("医疗") || input.includes("医院") || input.includes("诊所")) {
      confirmation = "正在打开医疗资源..."
      action = () => navigate("/HealthcarePageCn")
    }
    else if (input.includes("政府") || input.includes("服务") || input.includes("护照")) {
      confirmation = "正在显示政府服务..."
      action = () => navigate("/GovernmentServicesCn")
    }
    else if (input.includes("活动") || input.includes("社区") || input.includes("事件")) {
      confirmation = "正在显示社区活动..."
      action = () => navigate("/CommunityEventsCn")
    }
    else if ((input.includes("增大") || input.includes("增加")) && (input.includes("字体") || input.includes("文字") || input.includes("大小"))) {
      confirmation = "正在增大文字大小..."
      action = increaseFontSize
    }
    else if ((input.includes("减小") || input.includes("缩小")) && (input.includes("字体") || input.includes("文字") || input.includes("大小"))) {
      confirmation = "正在减小文字大小..."
      action = decreaseFontSize
    }
    else {
      confirmation = "未识别指令。请尝试说'前往医疗资源'或'显示政府服务'"
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
    <div className="flex flex-col min-h-screen" style={{
      fontSize: `${fontSize}px`,
      transform: `scale(${zoomLevel})`,
      transformOrigin: "top left",
      transition: "transform 0.2s ease-in-out",
    }}>
      {/* 页眉 */}
      <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50" style={{ transform: "none" }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* 标志 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <div className="text-xl sm:text-2xl font-bold text-gray-800">
                <span className="text-blue-600">社区</span>连接
              </div>
            </motion.div>

            {/* 桌面导航 */}
            <div className="hidden lg:flex items-center space-x-4 sm:space-x-8">
              {/* 搜索 */}
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
                          placeholder="搜索资源 (例如：'医疗'或'health')..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-600">
                          <FiSearch />
                        </button>
                      </div>
                      {filteredNavItems.length > 0 ? (
                        <ul className="mt-3 space-y-2">
                          {filteredNavItems.map((item) => (
                            <li key={item.id}>
                              <NavLink
                                to={item.id === "home" ? "/" : `/${item.id}`}
                                className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100"
                                onClick={() => setSearchOpen(false)}
                              >
                                {item.icon}
                                <span className="ml-3">{item.label} / {item.labelEn}</span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 text-sm mt-3">未找到结果</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 页面缩放控制 */}
              <div className="hidden md:flex items-center space-x-2 border-l border-r border-gray-200 px-4">
                <button
                  onClick={decreaseZoomLevel}
                  className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                  aria-label="缩小"
                >
                  <FiZoomOut className="w-5 h-5" />
                </button>
                <span className="text-sm sm:text-xl text-gray-400">缩放</span>
                <button
                  onClick={increaseZoomLevel}
                  className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                  aria-label="放大"
                >
                  <FiZoomIn className="w-5 h-5" />
                </button>
              </div>

              {/* 用户操作 */}
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                  <FiUser className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm font-medium">登录</span>
                </button>
              </div>
            </div>

            {/* 移动菜单按钮 */}
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

          {/* 桌面导航栏 */}
          <nav className="hidden lg:block border-t border-gray-100">
            <div className="flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.id === "home" ? "/" : `/${item.id}`}
                  className={({ isActive }) =>
                    `flex items-center px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 border-b-2 border-blue-500"
                        : "text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    }`
                  }
                >
                  <span className="mr-2 text-lg">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>

        {/* 移动搜索 */}
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
                    placeholder="搜索资源 (例如：'医疗'或'health')..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-600">
                    <FiSearch />
                  </button>
                </div>
                {filteredNavItems.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {filteredNavItems.map((item) => (
                      <li key={item.id}>
                        <NavLink
                          to={item.id === "home" ? "/" : `/${item.id}`}
                          className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100"
                          onClick={() => setSearchOpen(false)}
                        >
                          {item.icon}
                          <span className="ml-3">{item.label} / {item.labelEn}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 移动菜单 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white shadow-lg fixed top-16 w-full z-40"
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
                    <span className="text-gray-600">文字大小</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={decreaseFontSize}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                        aria-label="减小字体"
                      >
                        <FiZoomOut className="w-4 h-4" />
                      </button>
                      <button
                        onClick={increaseFontSize}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                        aria-label="增大字体"
                      >
                        <FiZoomIn className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <button className="flex items-center justify-center w-full py-3 px-4 mt-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  <FiUser className="mr-2" />
                  登录
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 主要内容 */}
      <main className="flex-grow bg-gray-50 pt-18 pb-40 px-4 sm:px-6">
        <div className="container mx-auto py-6">
          <Outlet />
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-gray-300 py-4 fixed bottom-0 w-full">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-white text-sm sm:text-lg font-semibold mb-2">社区连接</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                帮助老年人和家庭便捷获取基本服务
              </p>
            </div>

            <div className="hidden sm:block">
              <h3 className="text-white text-sm sm:text-lg font-semibold mb-2">快速链接</h3>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm">首页</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm">服务</a></li>
              </ul>
            </div>

            <div className="hidden sm:block">
              <h3 className="text-white text-sm sm:text-lg font-semibold mb-2">支持</h3>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm">帮助中心</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm">隐私政策</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-sm sm:text-lg font-semibold mb-2">联系我们</h3>
              <ul className="space-y-1">
                <li className="flex items-start space-x-2">
                  <FiMail className="mt-0.5 flex-shrink-0 text-gray-400 text-sm" />
                  <span className="text-gray-400 text-xs sm:text-sm">support@communityconnect.org</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiPhone className="flex-shrink-0 text-gray-400 text-sm" />
                  <a href="tel:+18005551234" className="text-gray-400 hover:text-white text-xs sm:text-sm">+1 (800) 555-1234</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-4 pt-4 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © {new Date().getFullYear()} 社区连接 版权所有
            </p>
          </div>
        </div>
      </footer>

      {/* 浮动控制按钮 */}
      <div className="sticky bottom-20 pr-4 z-50 flex flex-col items-end gap-3">
        <div className="flex gap-2 bg-white p-2 rounded-full shadow-lg border border-gray-200">
          <button
            onClick={decreaseFontSize}
            className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full hover:bg-blue-200 text-blue-800 transition-colors"
            aria-label="减小字体"
          >
            <span className="text-lg font-bold">A-</span>
          </button>
          <button
            onClick={increaseFontSize}
            className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full hover:bg-blue-200 text-blue-800 transition-colors"
            aria-label="增大字体"
          >
            <span className="text-lg font-bold">A+</span>
          </button>
        </div>

        <button
          onClick={toggleListening}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          aria-label={isListening ? "停止聆听" : "启动语音助手"}
        >
          {isListening ? <FiStopCircle size={20} /> : <FiMic size={20} />}
        </button>
      </div>
    </div>
  )
}