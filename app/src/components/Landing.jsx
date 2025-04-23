// src/App.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "../styles/index.css"

function Landing() {
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const navigate = useNavigate(); 

  const languages = [
    { code: 'en', name: 'English', greeting: 'Welcome' },
    { code: 'zh', name: '中文', greeting: '欢迎' },
    { code: 'bm', name: 'Bahasa Melayu', greeting: 'Selamat datang' },
    { code: 'ta', name: 'தமிழ்', greeting: 'வரவேற்கிறோம்' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <AnimatePresence mode='wait'>
        {!selectedLanguage ? (
          <motion.div
            key="language-select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md text-center"
          >
            <motion.h1 
              className="text-4xl font-light text-gray-900 mb-12"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Choose Language
            </motion.h1>
            
            <div className="space-y-5">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className="w-full py-4 text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {lang.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="welcome-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md text-center"
          >
            <motion.h1 
              className="text-4xl font-light text-gray-900 mb-4"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
            >
              {
                languages.find(l => l.code === selectedLanguage)?.greeting
              }
            </motion.h1>
            
            <motion.p 
              className="text-gray-600 mb-12 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {selectedLanguage === 'en' && 'To Community Connect'}
              {selectedLanguage === 'zh' && '来到社区连接'}
              {selectedLanguage === 'bm' && 'Ke Community Connect'}
              {selectedLanguage === 'ta' && 'கம்யூனிட்டி கனெக்டுக்கு'}
            </motion.p>
            
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                className="w-full py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/GovernmentServices')}
              >
                {selectedLanguage === 'en' && 'Continue'}
                {selectedLanguage === 'zh' && '继续'}
                {selectedLanguage === 'bm' && 'Teruskan'}
                {selectedLanguage === 'ta' && 'தொடரவும்'}
              </motion.button>
              
              <motion.button 
                onClick={() => setSelectedLanguage(null)}
                className="text-blue-600 hover:text-blue-800 text-sm underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedLanguage === 'en' && 'Change language'}
                {selectedLanguage === 'zh' && '更改语言'}
                {selectedLanguage === 'bm' && 'Tukar bahasa'}
                {selectedLanguage === 'ta' && 'மொழியை மாற்றவும்'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.footer 
        className="absolute bottom-8 text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {selectedLanguage === 'en' && 'Helping seniors access essential services'}
        {selectedLanguage === 'zh' && '帮助老年人获得基本服务'}
        {selectedLanguage === 'bm' && 'Membantu warga emas mengakses perkhidmatan penting'}
        {selectedLanguage === 'ta' && 'முதியோர்கள் அத்தியாவசிய சேவைகளை அணுக உதவுதல்'}
      </motion.footer>
    </div>
  )
}

export default Landing