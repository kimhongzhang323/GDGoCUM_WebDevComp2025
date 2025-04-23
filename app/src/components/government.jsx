import React, { useState } from "react";
import { Search, ArrowRight, ExternalLink, ChevronRight } from "lucide-react";

const servicesList = [
  {
    name: "Renew MyKad (IC)",
    description: "Easily renew your Identity Card online or book an appointment.",
    link: "https://www.jpn.gov.my/mykad/",
    icon: "🆔",
    category: "Identification"
  },
  {
    name: "Apply for Passport",
    description: "Apply for or renew your passport with the Immigration Department.",
    link: "https://www.imi.gov.my/index.php/en/",
    icon: "🛂",
    category: "Travel"
  },
  {
    name: "Road Tax & License (JPJ)",
    description: "Renew road tax or driver's license. Check for traffic summons.",
    link: "https://www.jpj.gov.my/",
    icon: "🚗",
    category: "Transportation"
  },
  {
    name: "SOCSO / PERKESO",
    description: "Claim benefits or apply for Employment Insurance System (EIS).",
    link: "https://www.perkeso.gov.my/",
    icon: "💼",
    category: "Employment"
  },
  {
    name: "EPF / KWSP",
    description: "Manage retirement funds and check your savings status.",
    link: "https://www.kwsp.gov.my/",
    icon: "🏦",
    category: "Finance"
  },
  {
    name: "Income Tax (LHDN)",
    description: "Check, pay, or file income taxes easily with e-Filing.",
    link: "https://www.hasil.gov.my/",
    icon: "📄",
    category: "Finance"
  },
  {
    name: "MySejahtera",
    description: "Health and contact tracing application for COVID-19.",
    link: "https://mysejahtera.malaysia.gov.my/",
    icon: "🏥",
    category: "Health"
  },
  {
    name: "Bantuan Prihatin Rakyat (BPR)",
    description: "Government financial aid for low-income households.",
    link: "https://bpr.hasil.gov.my/",
    icon: "💵",
    category: "Welfare"
  }
];

export default function GovernmentServices() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const categories = ["All", ...new Set(servicesList.map(service => service.category))];

  const filtered = servicesList.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase()) || 
                         service.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Malaysian Government Services
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Quick access to essential online government services for all citizens, with special consideration for senior Malaysians.
          </p>
        </header>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search services (e.g. 'passport', 'tax')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              aria-label="Search government services"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
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
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <span className="text-3xl mr-4" aria-hidden="true">
                      {service.icon}
                    </span>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        {service.name}
                      </h2>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
                        {service.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-3 mb-4">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group"
                      aria-label={`Visit ${service.name} website`}
                    >
                      Visit Service
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <span className="text-xs text-gray-500">
                      Official link
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No services found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your search or filter criteria. Need help?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Contact support
              </a>
            </p>
          </div>
        )}

        {/* Additional Help Section */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Need assistance with these services?
            </h2>
            <p className="text-gray-700 mb-6">
              Our community volunteers can help guide you through the process of using these government services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Request Help
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-xl shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Step-by-Step Guides
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}