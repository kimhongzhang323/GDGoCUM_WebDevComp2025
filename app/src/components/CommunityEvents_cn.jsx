import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { FiArrowLeft, FiPhone, FiExternalLink, FiCalendar, FiMapPin } from 'react-icons/fi';

const eventDetails = [
  {
    id: "1",
    title: "人民关怀援助计划 (BPR)",
    description: [
      "为月收入不超过 RM5,000 的 B40 家庭提供财政援助。",
      "",
      "福利：",
      "- RM1,200：家庭收入 ≤ RM2,500",
      "- RM800：家庭收入 RM2,501 - RM5,000",
      "",
      "申请方式：",
      "1. 通过 BPR 网站注册",
      "2. 填写信息并提交支持文件",
      "3. 在线检查申请状态"
    ],
    date: "申请截止日期：2024年12月31日",
    contact: "1800-88-2747",
    link: "https://bpr.hasil.gov.my",
    location: "全马范围",
    category: "财政援助",
    icon: "💰"
  },
  {
    id: "2",
    title: "myKasih B40 计划",
    description: [
      "为 B40 家庭提供食品和财政援助。",
      "",
      "福利：",
      "- 每月 RM100-RM200 的食品券",
      "- 每月 RM50-RM100 的现金援助",
      "",
      "资格：",
      "- 家庭收入 ≤ RM3,000",
      "- 已注册 BSH/BPR",
      "",
      "领取地点：",
      "- myKasih 合作商店",
      "- 指定超市"
    ],
    date: "2024年1月起 - 持续进行",
    contact: "1-800-22-8848",
    link: "https://www.mykasih.com.my",
    location: "全马范围",
    category: "食品援助",
    icon: "🛒"
  },
  {
    id: "3",
    title: "电信关怀网络计划",
    description: [
      "为 B40 群体提供电话和互联网账单援助。",
      "",
      "福利：",
      "- Unifi 套餐 50% 折扣",
      "- 每月 RM30 的免费预付费信用",
      "",
      "所需文件：",
      "- 身份证复印件",
      "- 银行账户对账单",
      "- 收入证明"
    ],
    date: "截止日期：2024年12月31日",
    contact: "100",
    link: "https://www.tm.com.my/jaringanprihatin",
    location: "全马范围",
    category: "通讯援助",
    icon: "📱"
  },
  {
    id: "4",
    title: "PERMATA 健康计划",
    description: [
      "为老年人提供免费健康检查。",
      "",
      "服务内容：",
      "- 血压检查",
      "- 血糖测试",
      "- 胆固醇测试",
      "- 医生咨询",
      "",
      "无需预约"
    ],
    date: "每周三，上午 8:30 - 中午 12:30",
    contact: "03-8883 3888",
    link: "https://www.moh.gov.my",
    location: "附近的健康诊所",
    category: "健康",
    icon: "🏥"
  }
];

export default function CommunityEvents() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 查找活动或使用第一个活动作为默认值
  const event = eventDetails.find(e => e.id === id) || eventDetails[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            政府援助计划
          </h1>
          <p className="text-lg text-gray-700">
            有关马来西亚人民援助计划的详细信息
          </p>
        </div>

        {/* 活动卡片 */}
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

            {/* 描述内容 */}
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

            {/* 操作按钮 */}
            <div className="flex flex-wrap gap-4">
              {event.contact && (
                <a 
                  href={`tel:${event.contact}`}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  <FiPhone className="mr-2" />
                  联系我们
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
                  官方网站
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 其他计划 */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-blue-900 mb-4">其他计划</h2>
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