import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { FiArrowRight, FiSearch, FiChevronDown } from 'react-icons/fi';

export default function VitalInformation() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [fontSize, setFontSize] = useState(18); // Starting with larger base font size
  const [searchQuery, setSearchQuery] = useState('');
  const newsItems = [
    {
      id: 1,
      title: "Senior Citizen Financial Assistance 2024",
      summary: "The government introduces RM500 monthly financial assistance for low-income senior citizens",
      category: "Assistance",
      date: "June 15, 2024",
      link: "/community-events/1",
      important: true
    },
    {
      id: 2,
      title: "Free Health Check Program",
      summary: "Free health checkups at government clinics every Wednesday",
      category: "Health",
      date: "Weekly",
      link: "/community-events/2"
    },
    {
      id: 3,
      title: "Chronic Disease Medication Subsidy",
      summary: "50% discount on chronic disease medications at registered pharmacies",
      category: "Health",
      date: "July 1, 2024",
      link: "/community-events/3"
    },
    {
      id: 4,
      title: "Transportation Fare Assistance",
      summary: "50% discount on bus and LRT fares for senior citizens",
      category: "Transportation",
      date: "Starting January 1, 2024",
      link: "/community-events/4"
    },
    {
      id: 5,
      title: "Senior Citizen Activity Program",
      summary: "Exercise and recreational activities every morning in public parks",
      category: "Activity",
      date: "Daily",
      link: "/community-events/5"
    },
    {
      id: 6,
      title: "Free Advisory Services",
      summary: "Free legal and financial advisory services for senior citizens",
      category: "Assistance",
      date: "Every working day",
      link: "/community-events/6",
      important: true
    }
  ];

  // Filter logic
  const filteredItems = newsItems.filter(item => {
    const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Font size adjustment with limits
  const adjustFontSize = (change) => {
    const newSize = Math.min(24, Math.max(14, fontSize + change));
    document.documentStyle.fontSize = `${newSize}px`;
    setFontSize(newSize);
  };

  // Get unique categories
  const categories = ['All', ...new Set(newsItems.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontSize: `${fontSize}px` }}>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">Important Information</h1>
          <p className="text-xl text-gray-700">Latest information for senior citizens and families</p>
        </header>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-white p-4 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for information..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiChevronDown className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <article 
                key={item.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border-l-4 ${
                  item.important ? 'border-red-500' : 'border-blue-500'
                }`}
                onClick={() => navigate(item.link)}
              >
                <div className="p-6">
                  {item.important && (
                    <span className="inline-block px-3 py-1 mb-3 text-sm font-semibold text-white bg-red-500 rounded-full">
                      IMPORTANT
                    </span>
                  )}
                  <span className="inline-block px-3 py-1 mb-3 text-sm font-semibold text-white bg-blue-600 rounded-full">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.summary}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{item.date}</span>
                    <button className="flex items-center text-blue-600 font-medium hover:underline">
                      Read more <FiArrowRight className="ml-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                <FiSearch className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-1">
                No information found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Important Notice Banner */}
        <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-yellow-800 mb-2">Attention:</h3>
          <p className="text-yellow-700">
            All information on this page is free. The government will not request any payment via phone.
          </p>
        </div>
      </main>
    </div>
  );
}