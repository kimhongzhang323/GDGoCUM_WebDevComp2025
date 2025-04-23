import React, { useState } from "react";
import { Search, ArrowRight, ExternalLink, ChevronRight } from "lucide-react";

const servicesList = [
  {
    name: "更新身份证 (MyKad)",
    description: "轻松在线更新您的身份证或预约。",
    link: "https://www.jpn.gov.my/mykad/",
    icon: "🆔",
    category: "身份认证"
  },
  {
    name: "申请护照",
    description: "通过移民局申请或更新护照。",
    link: "https://www.imi.gov.my/index.php/en/",
    icon: "🛂",
    category: "旅行"
  },
  {
    name: "路税与驾照 (JPJ)",
    description: "更新路税或驾照。检查交通罚单。",
    link: "https://www.jpj.gov.my/",
    icon: "🚗",
    category: "交通"
  },
  {
    name: "社会保险 (SOCSO / PERKESO)",
    description: "申请福利或就业保险系统 (EIS)。",
    link: "https://www.perkeso.gov.my/",
    icon: "💼",
    category: "就业"
  },
  {
    name: "公积金 (EPF / KWSP)",
    description: "管理退休基金并检查您的储蓄状态。",
    link: "https://www.kwsp.gov.my/",
    icon: "🏦",
    category: "财务"
  },
  {
    name: "所得税 (LHDN)",
    description: "轻松通过电子申报检查、支付或申报所得税。",
    link: "https://www.hasil.gov.my/",
    icon: "📄",
    category: "财务"
  },
  {
    name: "MySejahtera",
    description: "COVID-19 健康和接触追踪应用程序。",
    link: "https://mysejahtera.malaysia.gov.my/",
    icon: "🏥",
    category: "健康"
  },
  {
    name: "人民关怀援助金 (BPR)",
    description: "为低收入家庭提供的政府财政援助。",
    link: "https://bpr.hasil.gov.my/",
    icon: "💵",
    category: "福利"
  }
];

export default function GovernmentServicesCn() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");

  const categories = ["全部", ...new Set(servicesList.map(service => service.category))];

  const filtered = servicesList.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase()) || 
                         service.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "全部" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 标题部分 */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            马来西亚政府服务
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            快速访问所有公民的基本在线政府服务，特别考虑到马来西亚的老年人。
          </p>
        </header>

        {/* 搜索和筛选部分 */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="搜索服务（例如 '护照', '税务'）..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              aria-label="搜索政府服务"
            />
          </div>

          {/* 分类筛选 */}
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

        {/* 服务网格 */}
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
                      aria-label={`访问 ${service.name} 网站`}
                    >
                      访问服务
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <span className="text-xs text-gray-500">
                      官方链接
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
              未找到服务
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              尝试调整您的搜索或筛选条件。需要帮助？{" "}
              <a href="#" className="text-blue-600 hover:underline">
                联系支持
              </a>
            </p>
          </div>
        )}

        {/* 额外帮助部分 */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              需要帮助使用这些服务？
            </h2>
            <p className="text-gray-700 mb-6">
              我们的社区志愿者可以帮助您完成使用这些政府服务的过程。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                请求帮助
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-xl shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                查看分步指南
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}