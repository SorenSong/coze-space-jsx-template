import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line
} from 'recharts';
import {
  Cpu,
  BatteryFull,
  Gamepad2,
  BarChart4,
  Clock,
  Smartphone,
  Zap,
  ChevronsUpDown,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import Mermaid from 'mermaid';

const ProcessorComparison = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({
    singleCore: true,
    multiCore: true,
    gaming: true,
    power: true,
    summary: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // 单核性能数据
  const singleCoreData = [
    {
      name: '天玑9400',
      score: 2930,
      improvement: '35%',
      color: '#4CAF50'
    },
    {
      name: '骁龙8至尊版',
      score: 3300,
      improvement: '45%',
      color: '#2196F3'
    }
  ];

  // 多核性能数据
  const multiCoreData = [
    {
      name: '天玑9400',
      score: 9170,
      improvement: '28%',
      color: '#4CAF50'
    },
    {
      name: '骁龙8至尊版',
      score: 10538,
      improvement: '45%',
      color: '#2196F3'
    }
  ];

  // 游戏性能雷达图数据
  const gamingRadarData = [
    {
      subject: '峰值性能',
      '天玑9400': 90,
      '骁龙8至尊版': 85,
      fullMark: 100
    },
    {
      subject: '功耗控制',
      '天玑9400': 85,
      '骁龙8至尊版': 80,
      fullMark: 100
    },
    {
      subject: '光追技术',
      '天玑9400': 95,
      '骁龙8至尊版': 80,
      fullMark: 100
    },
    {
      subject: '帧率稳定',
      '天玑9400': 88,
      '骁龙8至尊版': 92,
      fullMark: 100
    }
  ];

  // 功耗数据
  const powerData = [
    {
      name: '工艺制程',
      '天玑9400': '台积电3nm',
      '骁龙8至尊版': '台积电3nm'
    },
    {
      name: 'CPU功耗降低',
      '天玑9400': '40%',
      '骁龙8至尊版': '40%+'
    },
    {
      name: 'GPU功耗降低',
      '天玑9400': '44%',
      '骁龙8至尊版': '40%'
    },
    {
      name: '游戏实测功耗',
      '天玑9400': '3.636W',
      '骁龙8至尊版': 'N/A'
    }
  ];

  // 游戏帧率数据
  const gameFpsData = [
    { name: '原神', '天玑9400': 60, '骁龙8至尊版': 59.9 },
    { name: '星穹铁道', '天玑9400': 59.7, '骁龙8至尊版': 'N/A' },
    { name: 'Aztec Ruins', '天玑9400': 'N/A', '骁龙8至尊版': 348 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* 头部 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-900 flex items-center">
            <Cpu className="mr-2" />
            旗舰处理器性能对比
          </h1>
          <div className="flex items-center space-x-2">
            <Clock className="text-gray-500" />
            <span className="text-gray-600">
              {new Date().toLocaleString('zh-CN')}
            </span>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8">
        {/* 处理器选择 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                <Smartphone />
              </div>
              <h2 className="text-xl font-bold">联发科天玑9400</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-green-500" />
                Cortex-X925 超大核 @3.62GHz
              </li>
              <li className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-green-500" />
                Immortalis-G925 GPU
              </li>
              <li className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-green-500" />
                台积电3nm工艺
              </li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                <Smartphone />
              </div>
              <h2 className="text-xl font-bold">高通骁龙8至尊版</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-blue-500" />
                Phoenix L 超大核 @4.32GHz
              </li>
              <li className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-blue-500" />
                Adreno 830 GPU
              </li>
              <li className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-blue-500" />
                台积电3nm工艺
              </li>
            </ul>
          </motion.div>
        </div>

        {/* 对比内容 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* 单核性能 */}
          <div className="border-b border-gray-200">
            <button
              className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50"
              onClick={() => toggleSection('singleCore')}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
                  <BarChart4 />
                </div>
                <h2 className="text-lg font-semibold">单核性能对比</h2>
              </div>
              {expandedSections.singleCore ? <ChevronUp /> : <ChevronDown />}
            </button>

            {expandedSections.singleCore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6"
              >
                <div className="mb-4 text-gray-700">
                  <p className="mb-4">
                    单核性能主要取决于处理器单个核心的运算能力，对于日常的轻量级任务，如打开应用程序、浏览网页等，单核性能起着重要作用。
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                      <span>
                        <strong>联发科天玑9400</strong>：采用了一颗主频高达3.62GHz的Cortex-X925超大核，官方称对比天玑9300单核性能提升超过35%。在GeekBench 6测试中，单核成绩达到2924-2934分。
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                      <span>
                        <strong>高通骁龙8至尊版</strong>：配备两个最高主频4.32GHz的Phoenix L超大核心，基于GeekBench的测试结果，与上一代相比单核性能提升达到45%。在GeekBench 6.2.0跑分中，单核成绩为3223分，在展示会上分享的对比照片中单核成绩可达3407分。
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={singleCoreData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 4000]} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="score"
                        name="GeekBench 6单核分数"
                        fill="#8884d8"
                      >
                        {singleCoreData.map((entry, index) => (
                          <rect
                            key={`cell-${index}`}
                            fill={entry.color}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}
          </div>

          {/* 多核性能 */}
          <div className="border-b border-gray-200">
            <button
              className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50"
              onClick={() => toggleSection('multiCore')}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-4">
                  <ChevronsUpDown />
                </div>
                <h2 className="text-lg font-semibold">多核性能对比</h2>
              </div>
              {expandedSections.multiCore ? <ChevronUp /> : <ChevronDown />}
            </button>

            {expandedSections.multiCore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6"
              >
                <div className="mb-4 text-gray-700">
                  <p className="mb-4">
                    多核性能反映了处理器多个核心协同工作的能力，对于多任务处理、大型游戏、视频编辑等复杂任务至关重要。
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                      <span>
                        <strong>联发科天玑9400</strong>：采用一个Cortex-X925超超大核、三个Cortex-X4超大核和四个Cortex-A720大核的架构，官方称多核性能提升超过28%。在GeekBench 6测试中，多核成绩为9151-9197分。
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                      <span>
                        <strong>高通骁龙8至尊版</strong>：拥有两个"超级内核"和六个"性能内核"的全大核架构，与上一代相比多核性能提升高达45%。在GeekBench 6.2.0跑分中，多核成绩直接来到了10538分。
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={multiCoreData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 12000]} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="score"
                        name="GeekBench 6多核分数"
                        fill="#8884d8"
                      >
                        {multiCoreData.map((entry, index) => (
                          <rect
                            key={`cell-${index}`}
                            fill={entry.color}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}
          </div>

          {/* 游戏性能 */}
          <div className="border-b border-gray-200">
            <button
              className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50"
              onClick={() => toggleSection('gaming')}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-4">
                  <Gamepad2 />
                </div>
                <h2 className="text-lg font-semibold">游戏性能对比</h2>
              </div>
              {expandedSections.gaming ? <ChevronUp /> : <ChevronDown />}
            </button>

            {expandedSections.gaming && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6"
              >
                <div className="mb-4 text-gray-700">
                  <p className="mb-4">
                    游戏性能是衡量处理器综合能力的重要指标，涉及到CPU、GPU以及内存等多个方面的协同工作。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-green-600 mb-2 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        联发科天玑9400
                      </h3>
                      <ul className="space-y-2">
                        <li>
                          <strong>GPU方面</strong>：搭载了ARM最新的Immortalis-G925图形处理器，拥有12个图形计算核心。相比上一代天玑9300，峰值性能提升达到了41%，相同性能的话，功耗则能够减少44%。还搭载了第三代OMM追光引擎，可以支持90FPS高流畅度的光追，并带来游戏主机/PC级的光追体验。
                        </li>
                        <li>
                          <strong>游戏实测</strong>：在《原神》极高画质，实际渲染分辨率810×1800，须弥城跑图30分钟的测试中，几乎全程满帧60FPS，并且零跳帧零卡顿，平均功耗为3.636W，对比天玑9300降低了足有17%。在《崩坏：星穹铁道》极高画质、60帧模式，在星槎海30分钟跑到了几乎完美的59.7FPS。
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-600 mb-2 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                        高通骁龙8至尊版
                      </h3>
                      <ul className="space-y-2">
                        <li>
                          <strong>GPU方面</strong>：搭载了最新的Adreno 830 GPU，相较于上一代在性能上实现了40%的提升，同时功耗也降低了40%，在光线追踪性能方面有高达35%的性能提升。还为Adreno 830 GPU引入了一个12MB的专属图形内存，可大幅减少对DDR的访问，降低功耗。
                        </li>
                        <li>
                          <strong>游戏实测</strong>：在《原神》测试时，在游戏的枫丹城内跑图15分钟，游戏运行的平均帧率为59.9fps，帧率曲线几乎是一条直线。在GFXBench的Aztec Ruins Vulkan (Normal Tier) Offscreen (1080p)测试中，跑到了348 Fps的成绩；Aztec Ruins Vulkan (High Tier) Offscreen (1440p)项目成绩为125 Fps；3D Mark Steel Nomad Light项目成绩为2605分。
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={gamingRadarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name="天玑9400"
                          dataKey="天玑9400"
                          stroke="#4CAF50"
                          fill="#4CAF50"
                          fillOpacity={0.6}
                        />
                        <Radar
                          name="骁龙8至尊版"
                          dataKey="骁龙8至尊版"
                          stroke="#2196F3"
                          fill="#2196F3"
                          fillOpacity={0.6}
                        />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={gameFpsData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'FPS', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="天玑9400"
                          stroke="#4CAF50"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="骁龙8至尊版"
                          stroke="#2196F3"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* 功耗 */}
          <div className="border-b border-gray-200">
            <button
              className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50"
              onClick={() => toggleSection('power')}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-4">
                  <BatteryFull />
                </div>
                <h2 className="text-lg font-semibold">功耗对比</h2>
              </div>
              {expandedSections.power ? <ChevronUp /> : <ChevronDown />}
            </button>

            {expandedSections.power && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6"
              >
                <div className="mb-4 text-gray-700">
                  <p className="mb-4">
                    功耗是影响手机续航和发热的重要因素，较低的功耗意味着更长的续航时间和更好的散热表现。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-green-600 mb-2 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        联发科天玑9400
                      </h3>
                      <ul className="space-y-2">
                        <li>
                          采用台积电第二代3nm工艺制造，官方称在同等性能下功耗降低最多40%。
                        </li>
                        <li>
                          在游戏实测中，《原神》平均功耗为3.636W，对比天玑9300降低了17%。
                        </li>
                        <li>
                          在连接方面支持新一代UltraSave 4.0和R17省电增强技术，Wi-Fi 7和蓝牙连接也有较好的省电表现。
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-600 mb-2 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                        高通骁龙8至尊版
                      </h3>
                      <ul className="space-y-2">
                        <li>
                          在CPU性能提升的同时，能耗降低了40%以上。
                        </li>
                        <li>
                          Adreno 830 GPU性能提升的同时功耗降低了40%，其专属图形内存也有助于降低功耗。
                        </li>
                        <li>
                          但目前没有明确的游戏功耗实测数据与天玑9400进行直接对比。
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left text-gray-700">项目</th>
                        <th className="py-3 px-4 text-left text-green-600">天玑9400</th>
                        <th className="py-3 px-4 text-left text-blue-600">骁龙8至尊版</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {powerData.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-700">{row.name}</td>
                          <td className="py-3 px-4 text-green-600">{row['天玑9400']}</td>
                          <td className="py-3 px-4 text-blue-600">{row['骁龙8至尊版']}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>

          {/* 总结 */}
          <div>
            <button
              className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50"
              onClick={() => toggleSection('summary')}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                  <BarChart4 />
                </div>
                <h2 className="text-lg font-semibold">综合对比总结</h2>
              </div>
              {expandedSections.summary ? <ChevronUp /> : <ChevronDown />}
            </button>

            {expandedSections.summary && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6"
              >
                <div className="mb-6 text-gray-700">
                  <p>
                    总体而言，高通骁龙8至尊版在单核性能和多核性能上明显领先于联发科天玑9400；在游戏性能方面，两款处理器各有千秋，差距相对较小；在功耗方面，由于高通骁龙8至尊版缺乏明确的游戏场景功耗对比数据，难以直接判断哪款处理器更具优势。
                  </p>
                  <p className="mt-4">
                    用户在选择搭载这两款处理器的手机时，可以根据自己对性能、游戏体验和续航的侧重点来做出决策。如果更看重极致的单核和多核性能，高通骁龙8至尊版可能是更好的选择；如果对游戏光追技术和明确的游戏功耗降低有需求，联发科天玑9400也值得考虑。
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left text-gray-700">性能维度</th>
                        <th className="py-3 px-4 text-left text-green-600">联发科天玑9400</th>
                        <th className="py-3 px-4 text-left text-blue-600">高通骁龙8至尊版</th>
                        <th className="py-3 px-4 text-left text-gray-700">优势方</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-700">单核性能</td>
                        <td className="py-3 px-4 text-green-600">单核成绩2924-2934分，较天玑9300提升超35%</td>
                        <td className="py-3 px-4 text-blue-600">单核成绩3223-3407分，较上一代提升45%</td>
                        <td className="py-3 px-4 text-blue-600">高通骁龙8至尊版</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-700">多核性能</td>
                        <td className="py-3 px-4 text-green-600">多核成绩9151-9197分，较天玑9300提升超28%</td>
                        <td className="py-3 px-4 text-blue-600">多核成绩10538分，较上一代提升45%</td>
                        <td className="py-3 px-4 text-blue-600">高通骁龙8至尊版</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-700">游戏性能</td>
                        <td className="py-3 px-4 text-green-600">GPU峰值性能提升41%，功耗减少44%，光追技术有优势，游戏实测帧率表现好</td>
                        <td className="py-3 px-4 text-blue-600">GPU性能提升40%，功耗降低40%，部分测试项目帧率稍好</td>
                        <td className="py-3 px-4 text-gray-700">两者差距不大</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-700">功耗</td>
                        <td className="py-3 px-4 text-green-600">同等性能下功耗降低最多40%，游戏实测功耗有降低</td>
                        <td className="py-3 px-4 text-blue-600">CPU和GPU能耗降低40%以上，但缺乏游戏场景对比数据</td>
                        <td className="py-3 px-4 text-gray-700">难以判断</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-blue-50 border-t border-blue-100 mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <div className="text-blue-800 mb-2">
            created by{' '}
            <a
              href="https://space.coze.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600"
            >
              coze space
            </a>
          </div>
          <div className="text-gray-500 text-sm">
            页面内容均由AI生成，仅供参考
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProcessorComparison;