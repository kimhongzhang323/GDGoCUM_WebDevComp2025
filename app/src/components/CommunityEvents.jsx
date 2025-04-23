import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { FiArrowLeft, FiPhone, FiExternalLink, FiCalendar, FiMapPin } from 'react-icons/fi';

const eventDetails = [
  {
    id: "1",
    title: "Bantuan Prihatin Rakyat (BPR) Program",
    description: [
      "Financial assistance for B40 households with a monthly income of RM5,000 and below.",
      "",
      "Benefits:",
      "- RM1,200 for households with income ≤RM2,500",
      "- RM800 for households with income RM2,501-RM5,000",
      "",
      "How to Apply:",
      "1. Register through the BPR website",
      "2. Complete the information and supporting documents",
      "3. Check application status online"
    ],
    date: "Applications open until December 31, 2024",
    contact: "1800-88-2747",
    link: "https://bpr.hasil.gov.my",
    location: "Nationwide",
    category: "Financial Assistance",
    icon: "💰"
  },
  {
    id: "2",
    title: "myKasih B40 Program",
    description: [
      "Food and financial assistance for B40 families.",
      "",
      "Benefits:",
      "- Food vouchers worth RM100-RM200 per month",
      "- Cash assistance of RM50-RM100 per month",
      "",
      "Eligibility:",
      "- Household income ≤RM3,000",
      "- Registered with BSH/BPR",
      "",
      "Collection Points:",
      "- myKasih partner stores",
      "- Selected supermarkets"
    ],
    date: "Starting January 2024 - Ongoing",
    contact: "1-800-22-8848",
    link: "https://www.mykasih.com.my",
    location: "Nationwide",
    category: "Food Assistance",
    icon: "🛒"
  },
  {
    id: "3",
    title: "Telekom Malaysia Jaringan Prihatin Program",
    description: [
      "Phone and internet bill assistance for B40 groups.",
      "",
      "Benefits:",
      "- 50% discount for Unifi packages",
      "- RM30 free credit per month for prepaid users",
      "",
      "Required Documents:",
      "- Copy of ID card",
      "- Bank account statement",
      "- Income statement"
    ],
    date: "Until December 31, 2024",
    contact: "100",
    link: "https://www.tm.com.my/jaringanprihatin",
    location: "Nationwide",
    category: "Communication Assistance",
    icon: "📱"
  },
  {
    id: "4",
    title: "PERMATA Health Program",
    description: [
      "Free health checkups for senior citizens.",
      "",
      "Services:",
      "- Blood pressure check",
      "- Blood sugar test",
      "- Cholesterol test",
      "- Doctor consultation",
      "",
      "No appointment required"
    ],
    date: "Every Wednesday, 8:30 AM - 12:30 PM",
    contact: "03-8883 3888",
    link: "https://www.moh.gov.my",
    location: "Nearby health clinics",
    category: "Health",
    icon: "🏥"
  }
];

export default function CommunityEvents() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Find the event or use the first one as default
  const event = eventDetails.find(e => e.id === id) || eventDetails[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            Government Assistance Programs
          </h1>
          <p className="text-lg text-gray-700">
            Detailed information about assistance programs for Malaysians
          </p>
        </div>

        {/* Event Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-8">
          <div className="p-6 md:p-8">
            <div className="flex items-start mb-4">
              <span className="text-3xl mr-4">{event.icon}</span>
              <div>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-2">
                  {event.category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <FiCalendar className="mr-2" />
                <span>{event.date}</span>
              </div>
              {event.location && (
                <div className="flex items-center text-gray-600">
                  <FiMapPin className="mr-2" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            {/* Description with better formatting */}
            <div className="space-y-4 mb-8">
              {event.description.map((para, i) => (
                para === "" ? (
                  <br key={i} />
                ) : para.endsWith(":") ? (
                  <h3 key={i} className="font-semibold text-gray-900">{para}</h3>
                ) : para.startsWith("- ") ? (
                  <li key={i} className="ml-4 text-gray-700">{para.substring(2)}</li>
                ) : (
                  <p key={i} className="text-gray-700">{para}</p>
                )
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              {event.contact && (
                <a 
                  href={`tel:${event.contact}`}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  <FiPhone className="mr-2" />
                  Contact Us
                </a>
              )}
              {event.link && (
                <a 
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 font-medium transition-colors border border-blue-600"
                >
                  <FiExternalLink className="mr-2" />
                  Official Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Other programs */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Other Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventDetails
              .filter(e => e.id !== event.id)
              .slice(0, 2)
              .map(item => (
                <div 
                  key={item.id}
                  onClick={() => navigate(`/community-events/${item.id}`)}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}