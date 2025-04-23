import React, { useState } from "react";
import { Search, ArrowRight, ChevronRight, HelpCircle, Home, Info } from "lucide-react";

const servicesList = [
  {
    name: "更新身份证 (MyKad)",
    description: "在线轻松更新您的身份证，提供分步指导",
    link: "https://www.jpn.gov.my/mykad/",
    image: "/IC.jpg",
    category: "身份证明",
    color: "bg-purple-100"
  },
  {
    name: "申请护照",
    description: "简单的护照申请流程，支持预约",
    link: "/PassportApplicationCn",
    image: "/passport.jpg",
    category: "旅行",
    color: "bg-blue-100"
  },
  {
    name: "路税与驾照",
    description: "更新车辆文件并检查交通罚单",
    link: "https://www.jpj.gov.my/",
    image: "/jpj.jpeg",
    category: "交通",
    color: "bg-green-100"
  },
  {
    name: "社保福利 (SOCSO)",
    description: "申请工伤福利和保险",
    link: "https://www.perkeso.gov.my/",
    image: "/perkeso.png",
    category: "就业",
    color: "bg-orange-100"
  },
  {
    name: "公积金 (EPF/KWSP)",
    description: "轻松管理您的退休储蓄",
    link: "https://www.kwsp.gov.my/",
    image: "/EPF.png",
    category: "财务",
    color: "bg-yellow-100"
  },
  {
    name: "所得税",
    description: "在线报税，提供简单指导",
    link: "https://www.hasil.gov.my/",
    image: "/LHDN.png",
    category: "财务",
    color: "bg-red-100"
  },
  {
    name: "MySejahtera",
    description: "健康服务与医疗预约",
    link: "https://mysejahtera.malaysia.gov.my/",
    image: "/sejahtera.jpg",
    category: "健康",
    color: "bg-teal-100"
  },
  {
    name: "人民援助 (Bantuan Rakyat)",
    description: "为低收入家庭提供政府援助",
    link: "https://bpr.hasil.gov.my/",
    image: "/bpr.jpg",
    category: "福利",
    color: "bg-pink-100"
  }
];

export default function GovernmentServicesCn() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [fontSize] = useState(18);
  
  const categories = ["全部", ...new Set(servicesList.map(service => service.category))];

  const filtered = servicesList.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase()) || 
                         service.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "全部" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8" style={{ fontSize: `${fontSize}px` }}>
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <header className="mb-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Home className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            马来西亚公民服务
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            一站式访问所有政府服务
          </p>
        </header>

        {/* 搜索与筛选 */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="您需要什么服务？（例如：护照、税务）"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              aria-label="搜索服务"
              style={{ fontSize: `${fontSize}px` }}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
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

        {/* 服务网格 */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 flex flex-col"
              >
                <div className={`h-40 ${service.color} flex items-center justify-center p-6`}>
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="max-h-full max-w-full object-contain rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/300x150?text=服务图片";
                    }}
                  />
                </div>
                
                <div className="p-6 flex-grow">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
                    {service.name}
                  </h2>
                  <p className="text-gray-600 mb-5">
                    {service.description}
                  </p>
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    访问 <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              未找到相关服务
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-4">
              尝试不同的搜索词或类别
            </p>
            <button 
              onClick={() => {
                setSearch("");
                setSelectedCategory("全部");
              }}
              className="text-blue-500 hover:underline"
            >
              显示所有服务
            </button>
          </div>
        )}

        {/* 帮助部分 */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <HelpCircle className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              需要帮助使用这些服务？
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              我们友好的志愿者可以指导您完成任何政府服务流程
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
              >
                获取个人帮助
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 rounded-xl font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                查看视频指南
              </a>
            </div>
          </div>
        </div>

        {/* 安全提示 */}
        <div className="mt-8 bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-400 flex items-start">
          <Info className="h-5 w-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-1">安全提示</h3>
            <p className="text-yellow-700">
              政府服务始终免费。切勿与他人分享密码或向非官方来电者付款。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}