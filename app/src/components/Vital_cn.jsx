import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { FiArrowRight, FiSearch, FiChevronDown, FiInfo, FiClock, FiMapPin, FiPhone } from 'react-icons/fi';

export default function VitalInformation() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('全部');
  const [fontSize, setFontSize] = useState(18);
  const [searchQuery, setSearchQuery] = useState('');
  
  const newsItems = [
    {
      id: 1,
      title: "2024年老年人财务援助",
      summary: "每月为符合条件的低收入老年人提供RM500的财务援助",
      category: "财务援助",
      date: "2024年6月15日",
      link: "/community-events/1",
      important: true,
      image: "/old.jpeg",
      location: "所有州福利部门"
    },
    {
      id: 2,
      title: "免费综合健康检查",
      summary: "包括血液检查和医生咨询的全面健康检查",
      category: "医疗保健",
      date: "每周三",
      link: "/community-events/2",
      image: "/health.jpeg",
      location: "政府健康诊所"
    },
    {
      id: 3,
      title: "慢性病药物补贴计划",
      summary: "糖尿病、高血压和其他慢性病药物享受50%的折扣",
      category: "医疗保健",
      date: "2024年7月1日开始",
      link: "/community-events/3",
      image: "/chronic.jpg",
      location: "参与的药房"
    },
    {
      id: 4,
      title: "老年人公共交通折扣",
      summary: "60岁以上公民享受所有公共交通票价50%的折扣",
      category: "交通",
      date: "立即生效",
      link: "/community-events/4",
      image: "/mrt.jpg",
      location: "所有公共交通服务"
    },
    {
      id: 5,
      title: "黄金时代活动计划",
      summary: "每天提供锻炼课程、社交活动和兴趣班",
      category: "社区",
      date: "周一至周五，上午8点至10点",
      link: "/community-events/5",
      image: "/golden.jpg",
      location: "全国社区中心"
    }
  ];

  // 筛选逻辑
  const filteredItems = newsItems.filter(item => {
    const matchesCategory = activeFilter === '全部' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 调整字体大小
  const adjustFontSize = (change) => {
    const newSize = Math.min(24, Math.max(14, fontSize + change));
    setFontSize(newSize);
  };

  // 获取唯一类别
  const categories = ['全部', ...new Set(newsItems.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontSize: `${fontSize}px` }}>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 页面标题 */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">重要社区信息</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            为老年人及其家庭提供的重要计划和服务
          </p>
        </header>

        {/* 搜索和筛选部分 */}
        <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 搜索栏 */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="搜索计划或服务..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ fontSize: `${fontSize}px` }}
              />
            </div>
            
            {/* 类别筛选 */}
            <div className="relative min-w-[200px]">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
                style={{ fontSize: `${fontSize}px` }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === '全部' ? '所有类别' : category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* 新闻网格 */}
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
                {/* 新闻图片 */}
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
                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.important && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                        重要
                      </span>
                    )}
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {item.category}
                    </span>
                  </div>
                  
                  {/* 内容 */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {item.summary}
                  </p>
                  
                  {/* 元信息 */}
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
                  
                  {/* 查看详情 */}
                  <div className="mt-6 flex justify-end">
                    <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                      查看详情
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
                未找到匹配的计划
              </h3>
              <p className="text-gray-500 mb-4">
                尝试调整您的搜索条件
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('全部');
                }}
                className="text-blue-600 hover:underline"
              >
                显示所有计划
              </button>
            </div>
          )}
        </div>

        {/* 帮助部分 */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 border border-blue-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              需要帮助使用这些计划？
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              我们的社区支持团队可以帮助您了解并申请这些服务。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <FiPhone className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-medium">电话支持</h3>
                </div>
                <p className="text-gray-600">1-800-88-1234（每天上午8点至晚上8点）</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <FiMapPin className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-medium">现场帮助</h3>
                </div>
                <p className="text-gray-600">访问您最近的社区中心</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <FiInfo className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-medium">老年人优先</h3>
                </div>
                <p className="text-gray-600">为老年申请者提供专门帮助</p>
              </div>
            </div>
          </div>
        </div>

        {/* 重要通知 */}
        <div className="mt-8 bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-400 flex items-start">
          <FiInfo className="h-6 w-6 text-yellow-500 mt-1 mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-yellow-800 mb-2">官方通知</h3>
            <p className="text-yellow-700">
              所有政府计划均可免费申请。警惕要求付款或个人信息的骗局。
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}