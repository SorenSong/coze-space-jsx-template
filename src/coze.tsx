import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Sun, 
  Moon, 
  Camera, 
  Hotel, 
  Utensils, 
  AlertTriangle,
  Car,
  Mountain,
  Droplet,
  Flag,
  Compass,
  Sunset,
  Sunrise,
  ShoppingBag,
  Menu,
  X,
  DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const QinghaiGansuTour = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 行程数据
  const dailyItinerary = [
    {
      day: 1,
      title: '西宁 - 门源 - 张掖',
      morning: '从西宁出发，沿G227国道前往门源。七八月前后，沿途可见美丽壮观的油菜花、岗什卡雪峰等。达坂、草场、雪山、湖泊、经幡、牛羊、花海，构成了祁连山美轮美奂的自然风光。',
      afternoon: '抵达张掖丹霞国家地质公园，参观游览。这里是中国最美的丹霞地貌之一，多个观景台的最佳观赏时机在阳光灿烂之后。',
      evening: '入住张掖市区酒店，品尝当地美食，如炒拨拉、灰豆汤等。',
      image: 'https://example.com/zhangye_danxia.jpg'
    },
    {
      day: 2,
      title: '张掖 - 嘉峪关 - 敦煌',
      morning: '从张掖出发，沿G30连霍高速前往嘉峪关，参观天下第一关 - 嘉峪关城楼，感受历史的沧桑。',
      afternoon: '继续前往敦煌，途中可参观大地之子巨型雕塑。傍晚到达敦煌后，前往鸣沙山月牙泉，体验骑骆驼，欣赏沙漠日落。',
      evening: '入住敦煌市区酒店，逛敦煌夜市，品尝驴肉黄面、杏皮水等特色小吃。',
      image: 'https://example.com/mingsha_mountain.jpg'
    },
    {
      day: 3,
      title: '敦煌',
      morning: '参观莫高窟，这是世界文化遗产，有着千年的壁画和雕塑，是艺术的殿堂。记得提前预约门票，B票也能看8个洞窟，建议带个小手电。',
      afternoon: '自由活动或休息，也可以再次前往鸣沙山月牙泉，深度体验沙漠风情。',
      evening: '入住敦煌市区酒店。',
      image: 'https://example.com/mogao_caves.jpg'
    },
    {
      day: 4,
      title: '敦煌 - 大柴旦',
      morning: '从敦煌出发，穿越雅丹地貌，前往大柴旦。途中可参观雅丹魔鬼城，感受大自然的鬼斧神工。这里风特别大，记得把帽子系紧。',
      afternoon: '到达大柴旦翡翠湖，湖水因盐度和矿物质含量不同，呈现出深浅不一的绿色，宛如散落在大地上的翡翠。等光线柔和时湖水颜色最美，适合拍照。',
      evening: '入住大柴旦镇酒店，尝尝高原牦牛肉。',
      image: 'https://example.com/daochaidan_emerald_lake.jpg'
    },
    {
      day: 5,
      title: '大柴旦 - 德令哈',
      morning: '从大柴旦出发，途径网红315U型公路，注意安全拍照。接着前往水上雅丹地质公园，这里是世界上唯一的水上雅丹地貌，乘坐景区观光车深入游览。',
      afternoon: '继续前往德令哈，途中可参观南八仙雅丹地貌。到达德令哈后，可参观可鲁克湖和托素湖，感受"情人湖"的浪漫。',
      evening: '入住德令哈市区酒店，品尝炕羊肉、青海老酸奶等美食。',
      image: ''
    },
    {
      day: 6,
      title: '德令哈 - 茶卡盐湖 - 青海湖',
      morning: '从德令哈出发，前往茶卡盐湖，体验"天空之镜"的奇妙感觉。茶卡盐湖要选晴天去，穿亮色衣服拍照好看。建议带双拖鞋，盐粒扎脚。',
      afternoon: '前往青海湖，可选择在黑马河乡附近欣赏青海湖日落，或者在二郎剑景区乘船游湖，近距离观赏湟鱼洄游（6 - 8月最佳）。',
      evening: '入住青海湖周边酒店或民宿。',
      image: 'https://example.com/chaka_salt_lake.jpg'
    },
    {
      day: 7,
      title: '青海湖 - 西宁',
      morning: '早起欣赏青海湖日出，之后沿青海湖环湖东路行驶，欣赏湖光山色。途中可参观日月山，感受藏文化的独特魅力。',
      afternoon: '返回西宁，途中可参观塔尔寺，这是藏传佛教格鲁派六大寺院之一，以酥油花、壁画和堆绣闻名，被誉为"艺术三绝"。进寺庙要顺时针走，不要踩门槛。',
      evening: '入住西宁市区酒店，逛逛莫家街，品尝老酸奶、甜醅等当地美食。',
      image: 'https://example.com/taer_monastery.jpg'
    },
    {
      day: 8,
      title: '西宁',
      morning: '自由活动或购物，购买一些当地特产作为伴手礼，如黑枸杞、牦牛肉干等。',
      afternoon: '结束愉快的青甘大环线之旅，返程回家。',
      evening: '',
      image: ''
    }
  ];

  // 景点数据
  const attractions = [
    {
      name: '张掖七彩丹霞',
      description: '风景如画，是中国最美丹霞地貌之一，多个观景台的最佳观赏时机在阳光灿烂之后。',
      price: '门票 + 观光车约75元',
      image: 'https://example.com/zhangye_danxia.jpg'
    },
    {
      name: '莫高窟',
      description: '世界文化遗产，有着千年的壁画和雕塑，是艺术的殿堂。票务需提前预定，普通票可参观8个洞窟，还可选择数字展示中心 + 实体洞窟的套票。',
      price: '门票约238元（含数字展示中心）',
      image: 'https://example.com/mogao_caves.jpg'
    },
    {
      name: '鸣沙山月牙泉',
      description: '沙漠绿洲奇观，骑骆驼或滑沙体验。傍晚时分景色更佳，还能欣赏沙漠日落。',
      price: '门票约110元，骆驼骑行另计',
      image: 'https://example.com/mingsha_mountain.jpg'
    },
    {
      name: '大柴旦翡翠湖',
      description: '大小盐湖群，湖水呈现碧绿、浅蓝等色彩，宛如宝石镶嵌。',
      price: '免费开放',
      image: 'https://example.com/daochaidan_emerald_lake.jpg'
    },
    {
      name: '茶卡盐湖',
      description: '"天空之镜"，晴天时湖面倒映蓝天白云，适合拍照。',
      price: '门票 + 小火车约150元',
      image: 'https://example.com/chaka_salt_lake.jpg'
    },
    {
      name: '青海湖',
      description: '中国最大的内陆咸水湖，湖水碧蓝，环湖风光迷人。',
      price: '二郎剑景区门票约90元，可乘船游湖',
      image: 'https://example.com/qinghai_lake.jpg'
    },
    {
      name: '塔尔寺',
      description: '藏传佛教格鲁派六大寺院之一，以酥油花、壁画和堆绣闻名，被誉为"艺术三绝"。',
      price: '门票约80元',
      image: 'https://example.com/taer_monastery.jpg'
    }
  ];

  // 住宿建议
  const accommodations = [
    {
      location: '西宁',
      suggestion: '建议选择城西区的酒店，方便第二天出发。如如家精选（西宁火车站广场店），离火车站很近，打车10元左右，有早餐，前台可代收快递。'
    },
    {
      location: '张掖',
      suggestion: '可选择住在七彩丹霞景区附近的酒店，如七彩丹霞沟隐原舍酒店，离景区很近，能起得来的小伙伴第二天可以步行去景区看日出。'
    },
    {
      location: '敦煌',
      suggestion: '推荐IU酒店（敦煌市政广场店），地理位置优越，步行可到敦煌夜市。'
    },
    {
      location: '大柴旦',
      suggestion: '丽湖雅致大酒店（翡翠商业步行街店）等。'
    },
    {
      location: '德令哈',
      suggestion: '可选择市区的商务酒店。'
    },
    {
      location: '青海湖',
      suggestion: '黑马河乡附近有很多民宿可供选择，方便欣赏青海湖日出和日落。'
    }
  ];

  // 美食推荐
  const foods = [
    {
      location: '西宁',
      items: ['手抓羊肉', '酸奶', '甜醅']
    },
    {
      location: '张掖',
      items: ['炒拨拉', '灰豆汤', '炒炮仗']
    },
    {
      location: '敦煌',
      items: ['驴肉黄面', '杏皮水', '馕坑肉']
    },
    {
      location: '德令哈',
      items: ['炕羊肉', '高原牦牛肉']
    }
  ];

  // 注意事项
  const notes = [
    {
      title: '高原反应',
      content: '青海湖、茶卡盐湖等地海拔3000米左右，避免剧烈运动，备红景天、氧气瓶等抗高反药物。初上高原多喝热水，多休息，不要蹦跳或过于兴奋，注意保暖，千万别感冒。'
    },
    {
      title: '气候与装备',
      content: '西北昼夜温差大，紫外线强，气候干燥，风沙大。需携带防风外套、冲锋衣、薄羽绒、防晒衣、防晒霜、墨镜、帽子、围巾、保湿护肤品、润唇膏、眼药水等。鞋子要舒适，部分景点可备一双拖鞋或洞洞鞋。'
    },
    {
      title: '自驾安全',
      content: '部分路段（如315国道）车少但易疲劳，每2小时休息一次；提前加满油，服务区间隔较长。整个青甘大环线以国道为主，坡度变化较少，但单日较长（超过500KM）是最大的挑战。建议尽量两个司机轮换，使用具备ACC自适应巡航的车辆，确保安全驾驶。'
    },
    {
      title: '景区预约',
      content: '莫高窟、茶卡盐湖等热门景区需提前预约门票，旺季排队时间长。'
    },
    {
      title: '环保意识',
      content: '沙漠、盐湖区域生态环境脆弱，勿乱扔垃圾，保护自然环境。'
    },
    {
      title: '文化尊重',
      content: '参观寺庙、清真寺时保持安静，尊重少数民族习俗。寺院内禁拍佛像，转经需顺时针。'
    }
  ];

  // 行程总览数据
  const overviewData = [
    { name: '总里程', value: '2700公里', icon: <Car size={24} /> },
    { name: '最高海拔', value: '3820米', icon: <Mountain size={24} /> },
    { name: '推荐车型', value: 'SUV', icon: <Car size={24} /> },
    { name: '最佳季节', value: '6-9月', icon: <Sun size={24} /> }
  ];

  // 图表数据
  const chartData = [
    { name: '自然景观', value: 5 },
    { name: '人文景观', value: 3 },
    { name: '湖泊', value: 4 },
    { name: '沙漠', value: 2 }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId:string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 bg-white shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <MapPin className="text-teal-600 mr-2" size={24} />
            <h1 className="text-2xl font-bold text-gray-800">青甘环线游</h1>
          </div>

          {/* 桌面导航 */}
          <div className="hidden md:flex space-x-8">
            {[
              { id: 'overview', label: '行程总览' },
              { id: 'itinerary', label: '每日行程' },
              { id: 'attractions', label: '景点' },
              { id: 'accommodation', label: '住宿' },
              { id: 'food', label: '美食' },
              { id: 'notes', label: '注意' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`${
                  activeTab === item.id ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-600 hover:text-teal-500'
                } px-2 py-1 font-medium transition-colors`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden text-gray-600"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4"
          >
            <div className="flex flex-col space-y-3">
              {[
                { id: 'overview', label: '行程总览' },
                { id: 'itinerary', label: '每日行程' },
                { id: 'attractions', label: '景点' },
                { id: 'accommodation', label: '住宿' },
                { id: 'food', label: '美食' },
                { id: 'notes', label: '注意' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`${
                    activeTab === item.id ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-700'
                  } px-4 py-2 rounded-lg text-left font-medium`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* 行程总览 */}
        <section id="overview" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Compass className="text-teal-600 mr-3" size={28} />
              行程总览
            </h2>
            <p className="text-gray-600 mb-8">
              本次青甘大环线逆时针自驾游从西宁出发，途经门源、张掖、嘉峪关、敦煌、大柴旦、德令哈等地，最后返回西宁。全程约2700公里，涵盖了高原湖泊、草原、戈壁、沙漠、雅丹地貌、丹霞地貌等多种自然景观，以及莫高窟等人文历史遗迹。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {overviewData.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center">
                        <div className="p-2 bg-teal-100 rounded-full mr-3">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-600">{item.name}</h3>
                          <p className="text-xl font-bold text-teal-600">{item.value}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <AlertTriangle className="text-orange-500 mr-2" size={20} />
                    重要提示
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 高原地区注意预防高原反应</li>
                    <li>• 西北地区昼夜温差大，注意保暖</li>
                    <li>• 部分景区需提前预约门票</li>
                    <li>• 自驾注意安全，建议两司机轮换</li>
                  </ul>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3B8D95" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 每日行程 */}
        <section id="itinerary" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Calendar className="text-teal-600 mr-3" size={28} />
            每日行程安排
          </h2>

          <div className="space-y-8">
            {dailyItinerary.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold mr-4">
                      {day.day}
                    </div>
                    <h3 className="text-2xl font-semibold">{day.title}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-start mb-4">
                        <Sun className="text-yellow-500 mr-3 mt-1" size={20} />
                        <div>
                          <h4 className="font-medium text-gray-700">上午</h4>
                          <p className="text-gray-600">{day.morning}</p>
                        </div>
                      </div>

                      <div className="flex items-start mb-4">
                        <Sunset className="text-orange-500 mr-3 mt-1" size={20} />
                        <div>
                          <h4 className="font-medium text-gray-700">下午</h4>
                          <p className="text-gray-600">{day.afternoon}</p>
                        </div>
                      </div>

                      {day.evening && (
                        <div className="flex items-start">
                          <Moon className="text-indigo-500 mr-3 mt-1" size={20} />
                          <div>
                            <h4 className="font-medium text-gray-700">晚上</h4>
                            <p className="text-gray-600">{day.evening}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {day.image && (
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src={day.image}
                          alt={`Day ${day.day} 行程`}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 景点介绍 */}
        <section id="attractions" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Camera className="text-teal-600 mr-3" size={28} />
            景点介绍
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((attraction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {attraction.image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{attraction.name}</h3>
                  <p className="text-gray-600 mb-4">{attraction.description}</p>
                  <div className="flex items-center text-orange-500 font-medium">
                    <DollarSign size={16} className="mr-1" />
                    {attraction.price}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 住宿建议 */}
        <section id="accommodation" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Hotel className="text-teal-600 mr-3" size={28} />
            住宿建议
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodations.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <MapPin className="text-teal-600 mr-2" size={20} />
                    {item.location}
                  </h3>
                  <p className="text-gray-600">{item.suggestion}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 美食推荐 */}
        <section id="food" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Utensils className="text-teal-600 mr-3" size={28} />
            美食推荐
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {foods.map((food, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <MapPin className="text-teal-600 mr-2" size={20} />
                    {food.location}
                  </h3>
                  <ul className="space-y-2">
                    {food.items.map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 注意事项 */}
        <section id="notes" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <AlertTriangle className="text-teal-600 mr-3" size={28} />
            注意事项
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {notes.map((note, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <AlertTriangle className="text-orange-500 mr-2" size={20} />
                    {note.title}
                  </h3>
                  <p className="text-gray-600">{note.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <ShoppingBag className="inline-block mr-2" size={20} />
            青甘大环线8天自驾游攻略
          </div>
          <div className="text-sm text-gray-400 mb-4">
            页面内容均由 AI 生成，仅供参考
          </div>
          <div className="text-sm">
            created by{' '}
            <a
              href="https://space.coze.cn"
              className="text-teal-400 underline hover:text-teal-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              coze space
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QinghaiGansuTour;
