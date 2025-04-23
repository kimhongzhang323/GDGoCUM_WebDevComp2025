import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { FiArrowRight, FiSearch, FiChevronDown } from 'react-icons/fi';

export default function VitalInformationCn() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('全部');
  const [fontSize, setFontSize] = useState(18); // 初始字体大小
  const [searchQuery, setSearchQuery] = useState('');
  const newsItems = [
    {
      id: 1,
      title: "2024年老年人财政援助",
      summary: "政府为低收入老年人提供每月500令吉的财政援助",
      category: "援助",
      date: "2024年6月15日",
      link: "/community-events/1",
      important: true
    },
    {
      id: 2,
      title: "免费健康检查计划",
      summary: "每周三在政府诊所提供免费健康检查",
      category: "健康",
      date: "每周",
      link: "/community-events/2"
    },
    {
      id: 3,
      title: "慢性病药物补贴",
      summary: "注册药房提供慢性病药物50%的折扣",
      category: "健康",
      date: "2024年7月1日",
      link: "/community-events/3"
    },
    {
      id: 4,
      title: "交通补贴援助",
      summary: "老年人可享受巴士和轻轨50%的票价折扣",
      category: "交通",
      date: "2024年1月1日起",
      link: "/community-events/4"
    },
    {
      id: 5,
      title: "老年人活动计划",
      summary: "每天早晨在公共公园进行锻炼和休闲活动",
      category: "活动",
      date: "每天",
      link: "/community-events/5"
    },
    {
      id: 6,
      title: "免费咨询服务",
      summary: "为老年人提供法律和财务方面的免费咨询服务",
      category: "援助",
      date: "每个工作日",
      link: "/community-events/6",
      important: true
    }
  ];

  // 筛选逻辑
  const filteredItems = newsItems.filter(item => {
    const matchesCategory = activeFilter === '全部' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 字体大小调整逻辑
  const adjustFontSize = (change) => {
    const newSize = Math.min(24, Math.max(14, fontSize + change));
    document.documentStyle.fontSize = `${newSize}px`;
    setFontSize(newSize);
  };

  // 获取唯一分类
  const categories = ['全部', ...new Set(newsItems.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontSize: `${fontSize}px` }}>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 页面标题 */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">重要信息</h1>
          <p className="text-xl text-gray-700">为老年人和家庭提供的最新信息</p>
        </header>

        {/* 搜索和筛选部分 */}
        <div className="mb-8 bg-white p-4 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 搜索框 */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="搜索信息..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* 分类筛选 */}
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

        {/* 信息网格 */}
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
                      重要
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
                      阅读更多 <FiArrowRight className="ml-1" />
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
                未找到信息
              </h3>
              <p className="text-gray-500">
                尝试调整您的搜索或筛选条件
              </p>
            </div>
          )}
        </div>

        {/* 重要通知横幅 */}
        <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-yellow-800 mb-2">注意：</h3>
          <p className="text-yellow-700">
            本页面的所有信息均为免费。政府不会通过电话要求任何付款。
          </p>
        </div>
      </main>
    </div>
  );
}