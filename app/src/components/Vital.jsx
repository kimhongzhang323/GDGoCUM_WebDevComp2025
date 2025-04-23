import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { FiArrowRight, FiSearch, FiChevronDown, FiInfo, FiClock, FiMapPin, FiPhone } from 'react-icons/fi';

export default function VitalInformation() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [fontSize, setFontSize] = useState(18);
  const [searchQuery, setSearchQuery] = useState('');
  
  const newsItems = [
    {
      id: 1,
      title: "Senior Citizen Financial Assistance 2024",
      summary: "Monthly financial aid of RM500 for eligible seniors with household incomes below RM3,000",
      category: "Financial Aid",
      date: "June 15, 2024",
      link: "/community-events/1",
      important: true,
      image: "/old.jpeg",
      location: "All state welfare departments"
    },
    {
      id: 2,
      title: "Free Comprehensive Health Screening",
      summary: "Full medical checkups including blood tests and doctor consultation at designated clinics",
      category: "Healthcare",
      date: "Every Wednesday",
      link: "/community-events/2",
      image: "/health.jpeg",
      location: "Government health clinics"
    },
    {
      id: 3,
      title: "Chronic Medication Subsidy Program",
      summary: "50% discount on medications for diabetes, hypertension and other chronic conditions",
      category: "Healthcare",
      date: "Starting July 1, 2024",
      link: "/community-events/3",
      image: "/chronic.jpg",
      location: "Participating pharmacies"
    },
    {
      id: 4,
      title: "Senior Public Transport Discount",
      summary: "50% fare reduction on all public transportation for citizens aged 60+",
      category: "Transportation",
      date: "Effective immediately",
      link: "/community-events/4",
      image: "/mrt.jpg",
      location: "All public transport services"
    },
    {
      id: 5,
      title: "Golden Age Activity Program",
      summary: "Daily exercise classes, social activities and hobby workshops for seniors",
      category: "Community",
      date: "Monday-Friday, 8-10AM",
      link: "/community-events/5",
      image: "/golden.jpg",
      location: "Community centers nationwide"
    }
  ];

  // Filter logic
  const filteredItems = newsItems.filter(item => {
    const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Font size adjustment
  const adjustFontSize = (change) => {
    const newSize = Math.min(24, Math.max(14, fontSize + change));
    setFontSize(newSize);
  };

  // Get unique categories
  const categories = ['All', ...new Set(newsItems.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontSize: `${fontSize}px` }}>
      {/* Accessibility Toolbar */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-3 bg-white p-3 rounded-full shadow-lg border border-gray-200">
        <button 
          onClick={() => adjustFontSize(-1)}
          className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full hover:bg-blue-200 text-blue-800"
          aria-label="Decrease font size"
        >
          <span className="text-xl font-bold">A-</span>
        </button>
        <button 
          onClick={() => adjustFontSize(1)}
          className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full hover:bg-blue-200 text-blue-800"
          aria-label="Increase font size"
        >
          <span className="text-xl font-bold">A+</span>
        </button>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">Vital Community Information</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Essential programs and services for senior citizens and their families
          </p>
        </header>

        {/* Search and Filter Section */}
        <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for programs or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ fontSize: `${fontSize}px` }}
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative min-w-[200px]">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
                style={{ fontSize: `${fontSize}px` }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'All' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <article 
                key={item.id}
                className={`bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border ${
                  item.important ? 'border-red-300 shadow-md' : 'border-gray-200'
                }`}
                onClick={() => navigate(item.link)}
              >
                {/* News Image */}
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "/placeholder-news.jpg";
                    }}
                  />
                </div>
                
                <div className="p-6">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.important && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                        IMPORTANT
                      </span>
                    )}
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {item.category}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {item.summary}
                  </p>
                  
                  {/* Meta Information */}
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center text-gray-500">
                      <FiClock className="mr-2 flex-shrink-0" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <FiMapPin className="mr-2 flex-shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  
                  {/* Read More */}
                  <div className="mt-6 flex justify-end">
                    <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                      View Details
                      <FiArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-gray-200">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                <FiSearch className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No matching programs found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search criteria
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('All');
                }}
                className="text-blue-600 hover:underline"
              >
                Show all programs
              </button>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 border border-blue-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Need assistance with these programs?
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              Our community support team is available to help you understand and apply for these services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <FiPhone className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-medium">Phone Support</h3>
                </div>
                <p className="text-gray-600">1-800-88-1234 (8AM-8PM daily)</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <FiMapPin className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-medium">In-Person Help</h3>
                </div>
                <p className="text-gray-600">Visit your nearest community center</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <FiInfo className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-medium">Senior Priority</h3>
                </div>
                <p className="text-gray-600">Dedicated assistance for elderly applicants</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-400 flex items-start">
          <FiInfo className="h-6 w-6 text-yellow-500 mt-1 mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-yellow-800 mb-2">Official Notice</h3>
            <p className="text-yellow-700">
              All government programs are free to apply. Beware of scams asking for payment or personal information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}