import React, { useState, useEffect } from "react";
import { Search, ArrowRight, ChevronRight, HelpCircle, Home, Info } from "lucide-react";

const servicesList = [
  {
    name: "Renew MyKad (IC)",
    description: "Easy online renewal for your Identity Card with step-by-step guidance",
    link: "https://www.jpn.gov.my/mykad/",
    image: "/IC.jpg",
    category: "Identification",
    color: "bg-purple-100"
  },
  {
    name: "Apply for Passport",
    description: "Simple passport application with appointment booking",
    link: "/PassportApplication",
    image: "/passport.jpg",
    category: "Travel",
    color: "bg-blue-100"
  },
  {
    name: "Road Tax & License",
    description: "Renew vehicle documents and check traffic summons",
    link: "https://www.jpj.gov.my/",
    image: "/jpj.jpeg",
    category: "Transport",
    color: "bg-green-100"
  },
  {
    name: "SOCSO Benefits",
    description: "Claim employment injury benefits and insurance",
    link: "https://www.perkeso.gov.my/",
    image: "/perkeso.png",
    category: "Employment",
    color: "bg-orange-100"
  },
  {
    name: "EPF/KWSP",
    description: "Manage your retirement savings easily",
    link: "https://www.kwsp.gov.my/",
    image: "/EPF.png",
    category: "Finance",
    color: "bg-yellow-100"
  },
  {
    name: "Income Tax",
    description: "File taxes online with simple guidance",
    link: "https://www.hasil.gov.my/",
    image: "/LHDN.png",
    category: "Finance",
    color: "bg-red-100"
  },
  {
    name: "MySejahtera",
    description: "Health services and medical appointments",
    link: "https://mysejahtera.malaysia.gov.my/",
    image: "/sejahtera.jpg",
    category: "Health",
    color: "bg-teal-100"
  },
  {
    name: "Bantuan Rakyat",
    description: "Government aid for low-income families",
    link: "https://bpr.hasil.gov.my/",
    image: "/bpr.jpg",
    category: "Welfare",
    color: "bg-pink-100"
  }
];

export default function GovernmentServices() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [fontSize] = useState(18);
  const [speech, setSpeech] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const categories = ["All", ...new Set(servicesList.map(service => service.category))];

  useEffect(() => {
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      setSpeech(synth);
      
      // Cleanup on unmount
      return () => {
        synth.cancel();
      };
    }
  }, []);

  const filtered = servicesList.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase()) || 
                         service.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const speak = (text) => {
    if (speech && text) {
      speech.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower than normal
      utterance.pitch = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      speech.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (speech) {
      speech.cancel();
      setIsSpeaking(false);
    }
  };

  const handleHover = (text) => {
    if (isSpeaking) stopSpeaking();
    speak(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8" style={{ fontSize: `${fontSize}px` }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Home className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-3"
            onMouseEnter={() => handleHover("Malaysia Citizen Services")}
            onMouseLeave={stopSpeaking}
          >
            Malaysia Citizen Services
          </h1>
          <p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            onMouseEnter={() => handleHover("Simple access to all government services in one place")}
            onMouseLeave={stopSpeaking}
          >
            Simple access to all government services in one place
          </p>
        </header>

        {/* Search and Filter */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="What service do you need? (e.g. passport, tax)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              aria-label="Search services"
              style={{ fontSize: `${fontSize}px` }}
              onMouseEnter={() => handleHover("Search for government services")}
              onMouseLeave={stopSpeaking}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                onMouseEnter={() => handleHover(category === "All" ? "All categories" : category)}
                onMouseLeave={stopSpeaking}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
                style={{ fontSize: `${fontSize}px` }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 flex flex-col"
                onMouseEnter={() => handleHover(`${service.name}. ${service.description}`)}
                onMouseLeave={stopSpeaking}
              >
                <div className={`h-40 ${service.color} flex items-center justify-center p-6`}>
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="max-h-full max-w-full object-contain rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/300x150?text=Service+Image";
                    }}
                  />
                </div>
                
                <div className="p-6 flex-grow">
                  <h2 
                    className="text-xl font-bold text-gray-900 mb-3 leading-snug"
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      handleHover(service.name);
                    }}
                    onMouseLeave={stopSpeaking}
                  >
                    {service.name}
                  </h2>
                  <p 
                    className="text-gray-600 mb-5"
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      handleHover(service.description);
                    }}
                    onMouseLeave={stopSpeaking}
                  >
                    {service.description}
                  </p>
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      handleHover(`Access ${service.name}`);
                    }}
                    onMouseLeave={stopSpeaking}
                  >
                    Access <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div 
            className="text-center py-16 bg-white rounded-2xl border border-gray-200"
            onMouseEnter={() => handleHover("No services found. Try different search terms or categories")}
            onMouseLeave={stopSpeaking}
          >
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No services found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-4">
              Try different search terms or categories
            </p>
            <button 
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="text-blue-500 hover:underline"
              onMouseEnter={() => handleHover("Show all services")}
              onMouseLeave={stopSpeaking}
            >
              Show all services
            </button>
          </div>
        )}

        {/* Help Section */}
        <div 
          className="mt-16 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
          onMouseEnter={() => handleHover("Need help using these services? Our friendly volunteers can guide you through any government service process")}
          onMouseLeave={stopSpeaking}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <HelpCircle className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Need help using these services?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our friendly volunteers can guide you through any government service process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  handleHover("Get Personal Assistance");
                }}
                onMouseLeave={stopSpeaking}
              >
                Get Personal Assistance
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 rounded-xl font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  handleHover("View Video Guides");
                }}
                onMouseLeave={stopSpeaking}
              >
                View Video Guides
              </a>
            </div>
          </div>
        </div>

        {/* Safety Notice */}
        <div 
          className="mt-8 bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-400 flex items-start"
          onMouseEnter={() => handleHover("Safety Notice. Government services are always free. Never share passwords or make payments to unofficial callers.")}
          onMouseLeave={stopSpeaking}
        >
          <Info className="h-5 w-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-1">Safety Notice</h3>
            <p className="text-yellow-700">
              Government services are always free. Never share passwords or make payments to unofficial callers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}