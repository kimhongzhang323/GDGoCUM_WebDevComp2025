import React, { useState } from "react";
import { MapPin, Calendar, ClipboardList, Shield, AlertCircle, ArrowRight } from "lucide-react";

const HealthcarePage = () => {
  const [activeTab, setActiveTab] = useState("clinics");
  const [location, setLocation] = useState("");

  // Sample data with image paths
  const healthcareData = {
    clinics: [
      {
        name: "Klinik Kesihatan Seri Petaling",
        distance: "1.2 km",
        address: "Jalan 16/1, Seri Petaling, 57000 KL",
        hours: "Mon-Fri: 8am-5pm, Sat: 8am-1pm",
        services: ["General Checkup", "Chronic Disease", "Vaccination"],
        gov: true,
        image: "klinik1.png" // Government clinic image
      },
      {
        name: "Pusat Perubatan Keluarga",
        distance: "2.5 km",
        address: "No 12, Jalan 3/62A, Bandar Sri Permaisuri",
        hours: "Daily: 8am-10pm",
        services: ["Urgent Care", "Pediatrics", "Pharmacy"],
        gov: false,
        image: "klinik2.jpg" // Private clinic image
      }
    ],
    hospitals: [
      {
        name: "Hospital Kuala Lumpur",
        distance: "3.8 km",
        address: "Jalan Pahang, 53000 KL",
        hours: "24 hours",
        services: ["Emergency", "Specialist", "Surgery"],
        gov: true,
        image: "/hospital1.jpg" // Government hospital image
      },
      {
        name: "Sunway Medical Centre",
        distance: "5.2 km",
        address: "No 5, Jalan Lagoon Selatan, Bandar Sunway",
        hours: "24 hours",
        services: ["Cardiology", "Oncology", "Maternity"],
        gov: false,
        image: "/hospital2.jpg" // Private hospital image
      }
    ],
    news: [
      {
        title: "Free Flu Vaccination for Seniors",
        date: "15 Oct 2023",
        description: "Government providing free flu shots for those above 60 years old at all Klinik Kesihatan.",
        link: "#",
        image: "/post1.jpeg" // Vaccination news image
      },
      {
        title: "Chronic Medication Refill Program",
        date: "1 Nov 2023",
        description: "Extended refill period for chronic disease medications at government clinics.",
        link: "#",
        image: "/post2.jpeg" // Medicine news image
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section with Image */}
        <header className="text-center mb-12">
          <div className="mb-6 rounded-xl overflow-hidden max-w-4xl mx-auto h-full bg-blue-100 flex items-center justify-center">
            <img 
              src="kkm.png" 
              alt="Healthcare Services"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/placeholder-health.jpg";
              }}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">
            Healthcare Resources
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Simple access to medical services and health information for seniors and families
          </p>
        </header>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab("clinics")}
              className={`flex-1 min-w-max py-4 px-6 text-center font-medium ${activeTab === "clinics" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-5 h-5" />
                Clinics
              </div>
            </button>
            <button
              onClick={() => setActiveTab("hospitals")}
              className={`flex-1 min-w-max py-4 px-6 text-center font-medium ${activeTab === "hospitals" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                Hospitals
              </div>
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`flex-1 min-w-max py-4 px-6 text-center font-medium ${activeTab === "appointments" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Book Appointment
              </div>
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`flex-1 min-w-max py-4 px-6 text-center font-medium ${activeTab === "news" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              <div className="flex items-center justify-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Health News
              </div>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "clinics" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Find Nearby Clinics</h2>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Enter your location (e.g. postal code)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap">
                      Search Clinics
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {healthcareData.clinics.map((clinic, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-48 bg-gray-100 overflow-hidden">
                        <img 
                          src={clinic.image} 
                          alt={clinic.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                          }}
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{clinic.name}</h3>
                            {clinic.gov && (
                              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                                Government Clinic
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{clinic.distance}</span>
                        </div>
                        <p className="text-gray-600 mt-2 flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {clinic.address}
                        </p>
                        <p className="text-gray-600 mt-1">{clinic.hours}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {clinic.services.map((service, i) => (
                            <span key={i} className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded">
                              {service}
                            </span>
                          ))}
                        </div>
                        <button className="mt-4 text-blue-600 hover:text-blue-800 flex items-center gap-1">
                          View details <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "hospitals" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Find Nearby Hospitals</h2>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Enter your location (e.g. postal code)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap">
                      Search Hospitals
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {healthcareData.hospitals.map((hospital, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-48 bg-gray-100 overflow-hidden">
                        <img 
                          src={hospital.image} 
                          alt={hospital.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/placeholder-hospital.jpg";
                          }}
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{hospital.name}</h3>
                            {hospital.gov && (
                              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                                Government Hospital
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{hospital.distance}</span>
                        </div>
                        <p className="text-gray-600 mt-2 flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {hospital.address}
                        </p>
                        <p className="text-gray-600 mt-1">{hospital.hours}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {hospital.services.map((service, i) => (
                            <span key={i} className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded">
                              {service}
                            </span>
                          ))}
                        </div>
                        <button className="mt-4 text-blue-600 hover:text-blue-800 flex items-center gap-1">
                          View details <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Book Medical Appointment</h2>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent opacity-50"></div>
                  <div className="relative z-10">
                    <h3 className="font-medium text-blue-800 mb-2">Government Healthcare Facilities</h3>
                    <p className="text-blue-700 mb-3">Free or low-cost services for seniors and low-income families</p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto">
                      <Calendar className="w-5 h-5" /> Book Now
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-medium text-gray-900 mb-2">1. Select Facility Type</h3>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg flex items-center gap-2">
                        Klinik Kesihatan
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg flex items-center gap-2">
                        Hospital
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg flex items-center gap-2">
                        Specialist Clinic
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-medium text-gray-900 mb-2">2. Choose Location</h3>
                    <div className="flex items-center gap-3">
                      <select className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <option>Select your area</option>
                        <option>Kuala Lumpur</option>
                        <option>Petaling Jaya</option>
                        <option>Cheras</option>
                      </select>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-medium text-gray-900 mb-2">3. Select Date & Time</h3>
                    <div className="flex items-center gap-3">
                      <p className="text-gray-600">Available slots will appear after selecting facility and location</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "news" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Health News & Programs</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {healthcareData.news.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-48 bg-gray-100 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/placeholder-news.jpg";
                          }}
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                            <ClipboardList className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                            <p className="text-gray-600 mt-2">{item.description}</p>
                            <button className="mt-3 text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm">
                              Learn more <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-full flex-shrink-0 mt-1">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Current Vaccination Programs</h3>
                    <div className="mt-2 text-sm text-yellow-700 space-y-1">
                      <p className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 mr-2"></span>
                        COVID-19 booster shots available for seniors
                      </p>
                      <p className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 mr-2"></span>
                        Free flu vaccination until December 2023
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Help Section with Image */}
        <div className="bg-blue-600 text-white rounded-xl p-6 md:p-8 mt-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-90"></div>
          <img 
            src="/images/help-section-bg.jpg" 
            alt="Healthcare assistance"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">Need Help Using These Services?</h2>
            <p className="mb-6 opacity-90">
              Our volunteers can assist seniors with booking appointments and navigating healthcare services.
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50">
              Request Assistance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcarePage;