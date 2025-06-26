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
      title: '西宁 - 青海湖断崖 - 德令哈',
      morning: '前往青海湖断崖，路途可观赏大片油菜花，景区有壮观的湟鱼湟鱼洄游和海鸟飞翔（6 - 8月最佳）。',
      afternoon: '沿着环湖西路前往东格尔观景台，近距离接触青海湖。',
      evening: '入住德令哈市区民宿，品尝炕羊肉、青海老酸奶等美食',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_15-41-0811f0623fef464ada.png'
    },
    {
      day: 2,
      title: '德令哈 - 托素湖 - 察尔汗盐湖 - 格尔木',
      morning: '前往托素湖，这里湖面辽阔，周围为戈壁滩，以鸟类栖息地和“外星人遗址”地质奇观著称。',
      afternoon: '接着前往察尔汗盐湖，广阔又青绿色的盐湖，彷佛人间绿宝石。',
      evening: '入住格尔木市区民宿，品尝当地美食。',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_15-43-12044b2a055c8ea2a9.png'
    },
    {
      day: 3,
      title: '格尔木 - 水上雅丹 - 大柴旦',
      morning: '沿着U型公路前往上水雅丹，沿途可以在安全区域拍摄公路大片，抵达景区参观水上雅丹特殊地貌。',
      afternoon: '途经西台吉乃湖，路边湖水蓝绿双色泾渭分明；折返观赏日落下的荒漠雅丹。',
      evening: '晚上入住大柴旦镇区民宿，品尝当地美食。',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_15-44-499a0ff97a9cc2bcc4.png'
    },
    {
      day: 4,
      title: '大柴旦 - 翡翠湖 - 黑独山 - 敦煌',
      morning: '前往大柴旦翡翠湖，这里有大地的调色盘，欣赏大自然的色彩美学盐湖。',
      afternoon: '穿越雅丹地貌，前往黑独山，观赏中国水墨画的山脉。',
      evening: '入住敦煌市区民宿，逛敦煌夜市，品尝驴肉黄面、杏皮水等特色。',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_15-45-57b8974fdbad34ad0d.png'
    },
    {
      day: 5,
      title: '敦煌 - 鸣沙山月牙泉',
      morning: '自由行动，保存体能，可前往免费的敦煌博物馆了解敦煌的历史',
      afternoon: '前往鸣沙山月牙泉，体验骑骆驼，欣赏沙漠日落。',
      evening: '入住敦煌市区民宿，逛敦煌夜市，品尝驴肉黄面、杏皮水等特色。',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_15-46-41acdf0dd397a8fadf.png'
    },
    {
      day: 6,
      title: '敦煌 - 莫高窟 - 玉门魔山 - 嘉峪关',
      morning: '参观莫高窟，这是世界文化遗产，有着千年的壁画和雕塑，是艺术的殿堂。记得提前预约门票，B票也能看8个洞窟，建议带个小手电。',
      afternoon: '前往玉门魔山地质公园，这里拥有多种独特地貌，包括丹霞地貌、波浪谷、硅化木群、古生物化石群以及红柳峡峡谷景观等。',
      evening: '入住嘉峪关市区民宿，逛嘉峪关古城，品尝当地美食。',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_15-47-366e7e5effb01283e1.png'
    },
    {
      day: 7,
      title: '嘉峪关 - 七彩丹霞 - 祁连',
      morning: '前往张掖丹霞国家地质公园，参观游览。这里是中国最美的丹霞地貌之一，多个观景台的最佳观赏时机在阳光灿烂之后。',
      afternoon: '沿着二尕公路前往祁连，一路上，我们能看到草原、森林、溪流、冰川、牛羊成群。',
      evening: '入住祁连县，品尝老酸奶、甜醅等当地美食。',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_15-48-5995f7c7106d13ec46.png'
    },
    {
      day: 8,
      title: '祁连 - 卓尔山后山 - 岗什卡雪峰 - 西宁',
      morning: '前往卓尔山后山，观赏雪山与草原。',
      afternoon: '打卡此程最高海拔景点，近距离目睹雪山。',
      evening: '入住西宁市区民宿',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_15-49-358069a09ff528e8e8.png'
    }
  ];

  // 景点数据
  const attractions = [
     {
      name: '青海湖断崖',
      description: '青海湖断崖,绝美小众拍摄地让你刷爆朋友圈,站在断崖看青海湖与其他角度看到得青海湖的静谧形成鲜明对比。',
      price: '免门票，观光车：40元/人',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_12-52-25f9018ccbe0a5c0b4.png'
    },
    {
      name: '托素湖',
      description: '托素湖是典型的内陆咸水湖,湖的周围全是茫茫的戈壁滩,托素湖湖面辽阔、湖岸开阔,无遮无拦。风平浪静时,湖面烟波浩森,水天一色,蔚为壮观。',
      price: '免费开放',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_12-47-5040a0040a45d7351a.png'
    },
    {
      name: '察尔汗盐湖',
      description: '察尔汗盐湖，位于柴达木盆地的南部， 横跨格尔木与都兰两市县，其面积辽阔，堪称茶卡盐湖的56倍之大。',
      price: '门票98元，老人60，学生80元',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_12-39-21e637af55c1678adf.png'
    },
    {
      name: '乌素特(水上)雅丹',
      description: '乌素特(水上)雅丹地质公园位于青海柴达木盆地的西北部,历经千万年的地质运动和时空苍变,孕育和形成一片世界面积最大、最为壮观的雅丹群落。',
      price: '门票+观光车为118元，老人60元，学生90元',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_11-30-22861a5bc5dbfadc0d.png'
    },
     {
      name: '大柴旦翡翠湖',
      description: '大小盐湖群，湖水呈现碧绿、浅蓝等色彩，宛如宝石镶嵌。',
      price: '门票50元/人',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_13-05-545a7e448204f5de35.png'
    },
     {
      name: '黑独山',
      description: '位于青海省茫崖市冷湖镇附近的一处独特地貌景观。它以其独特的黑色雅丹地貌和荒凉、孤寂的氛围而闻名，被形容为“地球上最像月球的地方”和“戈壁水墨画”。',
      price: '门票60元/人',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_14-55-01a91adb060d7fb1b4.png'
    },
    {
      name: '鸣沙山月牙泉',
      description: '位于敦煌市区以南约5公里处,这里沙山与泉水共处,历来以“沙漠奇观”著称于世,是敦煌的名片之一。在这里你可以爬上鸣沙山,俯瞰月牙泉,还能在山顶上欣赏大漠日落,感受西北大漠的苍凉广阔。',
      price: '门票110元，老人学生半价，骆驼骑行另计',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_15-11-20ef761337a434f3ed.png'
    },
    {
      name: '莫高窟',
      description: '世界文化遗产，有着千年的壁画和雕塑，是艺术的殿堂。票务需提前预定，普通票可参观8个洞窟，还可选择数字展示中心 + 实体洞窟的套票。',
      price: '门票约238元（含数字展示中心）',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_15-12-48f9839ce39ddaf855.png'
    },
    {
      name: '玉门魔山地质公园',
      description: '将丹霞的烈焰、雅丹的异星线条与峡谷的四季变幻浓缩成一场视觉盛宴。晨雾中的怪石似猛虎下山，夕阳下的赤岩如燃烧的火焰，这里是自然与古老文明共同书写的星球奇境。',
      price: '门票20元/人',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_15-18-1677d0c9bf9b32ea05.png'
    },
    {
      name: '张掖七彩丹霞',
      description: '张掖七彩丹霞是中国北方干旱地区最典型的丹霞地貌景观，以色彩斑斓、形态奇特的红色砂砾岩层闻名，被列入《世界遗产名录》并获评多项国际地理殊荣。‌',
      price: '门票 + 观光车约93元/人，老人学生66元',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_15-24-596e2767ec49babcc2.png'
    },
    {
      name: '卓尔山后山',
      description: '卓尔山后山是卓尔山景区的重要组成部分，以其壮丽的丹霞地貌和开阔的视野，成为游客观景、徒步、摄影的好去处。',
      price: '免费开放',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_15-25-4530a796709224d184.png'
    },
    {
      name: '岗什卡雪峰',
      description: '岗什卡雪峰是祁连山的璀璨明珠。皑皑白雪覆于山巅,在日光下圣洁耀眼,冰川、冰瀑、湖泊错落分布,风景层次丰富。',
      price: '门票 + 观光车约25元/人',
      image: 'https://youjb.com/images/2025/06/26/PixPin_2025-06-26_15-27-03729dad91ab506821.png'
    },
  
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
      location: '格尔木',
      suggestion: '可选择市区的商务酒店。'
    },
     {
      location: '嘉峪关',
      suggestion: '可选择市区的商务酒店。'
    },
    {
      location: '祁连',
      suggestion: '可选择市区的商务酒店。'
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
      content: '当地海拔3000米左右，避免剧烈运动，备红景天、氧气瓶等抗高反药物。初上高原多喝热水，多休息，不要蹦跳或过于兴奋，注意保暖，千万别感冒。'
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
      content: '莫高窟、玉门魔山等热门景区需提前预约门票，旺季排队时间长。'
    },
    {
      title: '环保意识',
      content: '沙漠、盐湖区域生态环境脆弱，勿乱扔垃圾，保护自然环境。'
    },
    {
      title: '文化尊重',
      content: '参观莫高窟时保持安静，尊重少数民族习俗。寺院内禁拍佛像，转经需顺时针。'
    }
  ];

  // 行程总览数据
  const overviewData = [
    { name: '总里程', value: '约3200公里', icon: <Car size={24} /> },
    { name: '最高海拔', value: '3820米', icon: <Mountain size={24} /> },
    { name: '推荐车型', value: 'SUV', icon: <Car size={24} /> },
    { name: '最佳季节', value: '6-9月', icon: <Sun size={24} /> }
  ];

  // 图表数据
  const chartData = [
    { name: '自然景观', value: 7 },
    { name: '人文景观', value: 3 },
    { name: '湖泊', value: 5 },
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
              本次青甘大环线顺时针自驾游从西宁出发，途经德令哈、格尔木、大柴旦、敦煌、嘉峪关、张掖、祁连等地，最后返回西宁。全程约3300公里，涵盖了高原湖泊、草原、戈壁、沙漠、雅丹地貌、丹霞地貌等多种自然景观，以及莫高窟等人文历史遗迹。
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
            住宿
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

    
    </div>
  );
};

export default QinghaiGansuTour;
