import React, { useState } from 'react';
import { 
  ArrowRight, 
  HelpCircle, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle,
  ChevronDown,
  Info
} from 'lucide-react';

export default function PassportApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const [fontSize, setFontSize] = useState(18);
  const [showHelp, setShowHelp] = useState(false);

  const adjustFontSize = (change) => {
    const newSize = Math.min(24, Math.max(14, fontSize + change));
    setFontSize(newSize);
  };

  const locations = [
    {
      name: "UTC Kuala Lumpur",
      address: "Jalan Raja Laut, 50350 Kuala Lumpur",
      features: ["Wheelchair Access", "Senior Priority Lane", "Guided Assistance"],
      distance: "2.5km"
    },
    {
      name: "PPA Putrajaya",
      address: "Presint 2, 62550 Putrajaya",
      features: ["Braille Guides", "Hearing Assistance", "Comfortable Seating"],
      distance: "15km"
    },
    {
      name: "Urban Transformation Center (UTC) Johor Bahru",
      address: "Jalan Abdullah Ibrahim, 80000 Johor Bahru",
      features: ["Wheelchair Access", "Senior Priority Lane"],
      distance: "8km"
    }
  ];

  const requirements = [
    "Original MyKad (and photocopy)",
    "2 passport photos (white background)",
    "Old passport (for renewal)",
    "Payment confirmation slip"
  ];

  const steps = [
    "Fill Online Form",
    "Upload Documents",
    "Make Payment",
    "Book Appointment",
    "Visit Immigration Office"
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontSize: `${fontSize}px` }}>
      {/* Accessibility Toolbar */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-3">
        <button 
          onClick={() => adjustFontSize(-1)}
          className="w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 text-blue-600 border border-gray-200"
          aria-label="Decrease font size"
        >
          <span className="text-2xl font-bold">A-</span>
        </button>
        <button 
          onClick={() => adjustFontSize(1)}
          className="w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 text-blue-600 border border-gray-200"
          aria-label="Increase font size"
        >
          <span className="text-2xl font-bold">A+</span>
        </button>
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="w-14 h-14 flex items-center justify-center bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 text-white"
          aria-label="Get help"
        >
          <HelpCircle className="h-6 w-6" />
        </button>
      </div>

      {/* Help Panel */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Call Support</h4>
                  <p className="text-gray-600">03-8000 8000 (8AM-10PM daily)</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">In-Person Help</h4>
                  <p className="text-gray-600">Visit any UTC for guided application</p>
                </div>
              </div>
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Low-Income Assistance</h4>
                  <p className="text-gray-600">Discounts available for B40 applicants</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setShowHelp(false)}
              className="mt-6 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Malaysia Passport Application
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple steps to get your passport with senior-friendly assistance
          </p>
        </header>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex justify-between relative">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center z-10">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    currentStep > index ? 'bg-green-500 text-white' : 
                    currentStep === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > index ? <CheckCircle className="h-6 w-6" /> : index + 1}
                </div>
                <span className={`mt-2 text-sm text-center ${
                  currentStep >= index ? 'font-medium text-gray-900' : 'text-gray-500'
                }`}>
                  {step}
                </span>
              </div>
            ))}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10">
              <div 
                className="h-full bg-blue-500 transition-all duration-300" 
                style={{ width: `${(currentStep - 1) * 25}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name (as in MyKad)</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g. Ahmad bin Abdullah"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">MyKad Number</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g. 700101-01-1234"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g. 012-345 6789"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-2" />
                  <span className="text-gray-700">I qualify for low-income (B40) discount</span>
                </label>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Document Upload</h2>
              <div className="space-y-6">
                {requirements.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{item}</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <p className="text-gray-500 mb-2">Click to upload {item.toLowerCase()}</p>
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium">
                        Choose File
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Options</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 cursor-pointer">
                  <h3 className="font-medium text-gray-900 mb-1">Standard (5-year validity)</h3>
                  <p className="text-gray-600">RM200 (RM150 for B40 applicants)</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 cursor-pointer">
                  <h3 className="font-medium text-gray-900 mb-1">Senior Citizen Discount</h3>
                  <p className="text-gray-600">RM100 (for applicants aged 60+)</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 cursor-pointer">
                  <h3 className="font-medium text-gray-900 mb-1">Express Processing</h3>
                  <p className="text-gray-600">+RM100 (ready in 2 working days)</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Payment Methods</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-400">
                    Credit/Debit Card
                  </button>
                  <button className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-400">
                    Online Banking
                  </button>
                  <button className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-400">
                    Touch 'n Go
                  </button>
                  <button className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-400">
                    Counter Payment
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Appointment</h2>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Select Location</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none">
                    {locations.map((loc, index) => (
                      <option key={index} value={index}>
                        {loc.name} ({loc.distance} away)
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="h-5 w-5 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-4">
                {locations[0].features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <label className="block text-gray-700 mb-2">Select Date & Time</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Mon 10/7', 'Tue 11/7', 'Wed 12/7', 'Thu 13/7'].map((date, index) => (
                    <button 
                      key={index}
                      className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-400 text-center"
                    >
                      {date}
                      <div className="text-sm text-gray-500 mt-1">9AM-12PM</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Your passport application has been received. Please bring all original documents to your appointment.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Your Appointment</h3>
                <p className="text-gray-700">UTC Kuala Lumpur</p>
                <p className="text-gray-700">Monday, 10 July 2023 at 10:00 AM</p>
                <p className="text-gray-700">Senior Priority Lane</p>
              </div>
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium">
                Print Confirmation
              </button>
            </div>
          )}

          <div className="mt-10 flex justify-between">
            {currentStep > 1 && currentStep < 5 && (
              <button 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium"
              >
                Back
              </button>
            )}
            {currentStep < 5 && (
              <button 
                onClick={() => setCurrentStep(currentStep + 1)}
                className="ml-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
              >
                Continue
              </button>
            )}
            {currentStep === 5 && (
              <button 
                onClick={() => window.location.href = '/'}
                className="ml-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
              >
                Return Home
              </button>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Need Assistance?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Phone className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium text-gray-900">Phone Support</h3>
              </div>
              <p className="text-gray-600">Call 03-8000 8000 (8AM-10PM daily)</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium text-gray-900">In-Person Help</h3>
              </div>
              <p className="text-gray-600">Visit any UTC for guided application</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium text-gray-900">Senior Hours</h3>
              </div>
              <p className="text-gray-600">Weekdays 9AM-11AM priority for seniors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}