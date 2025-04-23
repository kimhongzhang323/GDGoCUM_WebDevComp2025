import React, { useState } from "react";
import { MapPin, Calendar, ClipboardList, Shield, AlertCircle, ArrowRight } from "lucide-react";

const HealthcarePageCn = () => {
  const [activeTab, setActiveTab] = useState("clinics");
  const [location, setLocation] = useState("");

  // 示例数据，包含图片路径
  const healthcareData = {
    clinics: [
      {
        name: "斯里白沙罗健康诊所",
        distance: "1.2 公里",
        address: "Jalan 16/1, Seri Petaling, 57000 吉隆坡",
        hours: "周一至周五: 早上8点-下午5点, 周六: 早上8点-下午1点",
        services: ["普通检查", "慢性病", "疫苗接种"],
        gov: true,
        image: "klinik1.png" // 政府诊所图片
      },
      {
        name: "家庭医疗中心",
        distance: "2.5 公里",
        address: "No 12, Jalan 3/62A, Bandar Sri Permaisuri",
        hours: "每天: 早上8点-晚上10点",
        services: ["紧急护理", "儿科", "药房"],
        gov: false,
        image: "klinik2.jpg" // 私人诊所图片
      }
    ],
    hospitals: [
      {
        name: "吉隆坡医院",
        distance: "3.8 公里",
        address: "Jalan Pahang, 53000 吉隆坡",
        hours: "24小时",
        services: ["急诊", "专科", "手术"],
        gov: true,
        image: "/hospital1.jpg" // 政府医院图片
      },
      {
        name: "双威医疗中心",
        distance: "5.2 公里",
        address: "No 5, Jalan Lagoon Selatan, Bandar Sunway",
        hours: "24小时",
        services: ["心脏病学", "肿瘤学", "产科"],
        gov: false,
        image: "/hospital2.jpg" // 私人医院图片
      }
    ],
    news: [
      {
        title: "老年人免费流感疫苗接种",
        date: "2023年10月15日",
        description: "政府为60岁以上人群提供免费流感疫苗接种服务，地点为所有健康诊所。",
        link: "#",
        image: "/post1.jpeg" // 疫苗新闻图片
      },
      {
        title: "慢性病药物补充计划",
        date: "2023年11月1日",
        description: "政府诊所延长慢性病药物补充期限。",
        link: "#",
        image: "/post2.jpeg" // 药物新闻图片
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 标题部分 */}
        <header className="text-center mb-12">
          <div className="mb-6 rounded-xl overflow-hidden max-w-4xl mx-auto h-full bg-blue-100 flex items-center justify-center">
            <img 
              src="kkm.png" 
              alt="医疗服务"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/placeholder-health.jpg";
              }}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">
            医疗资源
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            为老年人和家庭提供简单的医疗服务和健康信息
          </p>
        </header>

        {/* 主内容选项卡 */}
        <div className="bg-white rounded-xl shadow-sm mb-8 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab("clinics")}
              className={`flex-1 min-w-max py-4 px-6 text-center font-medium ${activeTab === "clinics" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-5 h-5" />
                诊所
              </div>
            </button>
            <button
              onClick={() => setActiveTab("hospitals")}
              className={`flex-1 min-w-max py-4 px-6 text-center font-medium ${activeTab === "hospitals" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                医院
              </div>
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`flex-1 min-w-max py-4 px-6 text-center font-medium ${activeTab === "appointments" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                预约
              </div>
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`flex-1 min-w-max py-4 px-6 text-center font-medium ${activeTab === "news" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              <div className="flex items-center justify-center gap-2">
                <ClipboardList className="w-5 h-5" />
                健康新闻
              </div>
            </button>
          </div>

          {/* 选项卡内容 */}
          <div className="p-6">
            {activeTab === "clinics" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">查找附近的诊所</h2>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="输入您的位置（例如邮政编码）"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap">
                      搜索诊所
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
                                政府诊所
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
                          查看详情 <ArrowRight className="w-4 h-4" />
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
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">查找附近的医院</h2>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="输入您的位置（例如邮政编码）"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap">
                      搜索医院
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
                                政府医院
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
                          查看详情 <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">预约医疗服务</h2>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent opacity-50"></div>
                  <div className="relative z-10">
                    <h3 className="font-medium text-blue-800 mb-2">政府医疗设施</h3>
                    <p className="text-blue-700 mb-3">为老年人和低收入家庭提供免费或低成本的服务</p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto">
                      <Calendar className="w-5 h-5" /> 立即预约
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-medium text-gray-900 mb-2">1. 选择设施类型</h3>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg flex items-center gap-2">
                        健康诊所
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg flex items-center gap-2">
                        医院
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg flex items-center gap-2">
                        专科诊所
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-medium text-gray-900 mb-2">2. 选择位置</h3>
                    <div className="flex items-center gap-3">
                      <select className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <option>选择您的区域</option>
                        <option>吉隆坡</option>
                        <option>八打灵再也</option>
                        <option>蕉赖</option>
                      </select>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-medium text-gray-900 mb-2">3. 选择日期和时间</h3>
                    <div className="flex items-center gap-3">
                      <p className="text-gray-600">选择设施和位置后将显示可用时段</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "news" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">健康新闻和计划</h2>
                
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
                              了解更多 <ArrowRight className="w-4 h-4" />
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
                    <h3 className="text-sm font-medium text-yellow-800">当前疫苗接种计划</h3>
                    <div className="mt-2 text-sm text-yellow-700 space-y-1">
                      <p className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 mr-2"></span>
                        为老年人提供COVID-19加强针
                      </p>
                      <p className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 mr-2"></span>
                        免费流感疫苗接种至2023年12月
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 帮助部分 */}
        <div className="bg-blue-600 text-white rounded-xl p-6 md:p-8 mt-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-90"></div>
          <img 
            src="/images/help-section-bg.jpg" 
            alt="医疗帮助"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">需要帮助使用这些服务吗？</h2>
            <p className="mb-6 opacity-90">
              我们的志愿者可以帮助老年人预约和使用医疗服务。
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50">
              请求帮助
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcarePageCn;