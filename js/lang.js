(function() {

  const t2s = {
    '萬': '万', '與': '与', '醜': '丑', '專': '专', '業': '业', '叢': '丛', '東': '东',
    '絲': '丝', '丟': '丢', '兩': '两', '嚴': '严', '個': '个', '中': '中', '豐': '丰',
    '臨': '临', '為': '为', '主': '主', '麗': '丽', '舉': '举', '麼': '么', '義': '义',
    '樂': '乐', '喬': '乔', '乘': '乘', '書': '书', '買': '买', '亂': '乱', '乾': '干',
    '於': '于', '雲': '云', '五': '五', '些': '些', '亞': '亚', '交': '交', '亦': '亦',
    '產': '产', '親': '亲', '人': '人', '什': '什', '僅': '仅', '介': '介', '仍': '仍',
    '們': '们', '付': '付', '代': '代', '令': '令', '以': '以', '們': '们', '件': '件',
    '任': '任', '企': '企', '伊': '伊', '伍': '伍', '休': '休', '會': '会', '偉': '伟',
    '傳': '传', '傷': '伤', '優': '优', '體': '体', '何': '何', '餘': '余', '你': '你',
    '作': '作', '來': '来', '系': '系', '係': '系', '個': '个', '們': '们', '們': '们',
    '位': '位', '低': '低', '住': '住', '佔': '占', '佛': '佛', '作': '作', '你': '你',
    '佩': '佩', '佳': '佳', '使': '使', '來': '来', '供': '供', '依': '依', '側': '侧',
    '備': '备', '傷': '伤', '價': '价', '儀': '仪', '億': '亿', '儉': '俭', '儒': '儒',
    '儘': '尽', '兒': '儿', '元': '元', '充': '充', '光': '光', '兒': '儿', '免': '免',
    '入': '入', '內': '内', '全': '全', '兩': '两', '八': '八', '公': '公', '六': '六',
    '共': '共', '關': '关', '興': '兴', '其': '其', '典': '典', '養': '养', '兼': '兼',
    '獸': '兽', '內': '内', '再': '再', '冒': '冒', '寫': '写', '軍': '军', '農': '农',
    '冠': '冠', '冬': '冬', '冰': '冰', '沖': '冲', '決': '决', '況': '况', '冷': '冷',
    '淨': '净', '準': '准', '涼': '凉', '凝': '凝', '幾': '几', '凱': '凯', '出': '出',
    '刀': '刀', '分': '分', '切': '切', '刊': '刊', '列': '列', '別': '别', '利': '利',
    '刪': '删', '判': '判', '別': '别', '到': '到', '制': '制', '刷': '刷', '刺': '刺',
    '刻': '刻', '則': '则', '副': '副', '劃': '划', '劇': '剧', '劉': '刘', '創': '创',
    '辦': '办', '功': '功', '加': '加', '務': '务', '動': '动', '助': '助', '努': '努',
    '勞': '劳', '勢': '势', '勵': '励', '勸': '劝', '包': '包', '化': '化', '北': '北',
    '區': '区', '醫': '医', '十': '十', '千': '千', '午': '午', '半': '半', '華': '华',
    '協': '协', '南': '南', '博': '博', '佔': '占', '印': '印', '危': '危', '即': '即',
    '卻': '却', '卵': '卵', '卷': '卷', '廠': '厂', '廳': '厅', '歷': '历', '厙': '厍',
    '厭': '厌', '廈': '厦', '廚': '厨', '去': '去', '參': '参', '又': '又', '雙': '双',
    '發': '发', '變': '变', '古': '古', '另': '另', '句': '句', '只': '只', '叫': '叫',
    '可': '可', '台': '台', '司': '司', '吃': '吃', '各': '各', '合': '合', '同': '同',
    '名': '名', '向': '向', '吧': '吧', '否': '否', '含': '含', '聽': '听', '啟': '启',
    '味': '味', '呼': '呼', '命': '命', '和': '和', '品': '品', '員': '员', '問': '问',
    '唱': '唱', '商': '商', '啊': '啊', '啦': '啦', '喜': '喜', '單': '单', '嗎': '吗',
    '喲': '哟', '喝': '喝', '嗎': '吗', '園': '园', '圖': '图', '團': '团', '聲': '声',
    '在': '在', '地': '地', '場': '场', '壞': '坏', '坐': '坐', '塊': '块', '堅': '坚',
    '壇': '坛', '壩': '坝', '壽': '寿', '夏': '夏', '夕': '夕', '外': '外', '多': '多',
    '夜': '夜', '夠': '够', '夢': '梦', '大': '大', '天': '天', '太': '太', '夫': '夫',
    '央': '央', '失': '失', '頭': '头', '夾': '夹', '奪': '夺', '奮': '奋', '女': '女',
    '她': '她', '好': '好', '如': '如', '妙': '妙', '姐': '姐', '妹': '妹', '妻': '妻',
    '始': '始', '姓': '姓', '姑': '姑', '娘': '娘', '娛': '娱', '娶': '娶', '婦': '妇',
    '媽': '妈', '子': '子', '孩': '孩', '學': '学', '孫': '孙', '它': '它', '安': '安',
    '完': '完', '定': '定', '宜': '宜', '客': '客', '室': '室', '宮': '宫', '家': '家',
    '容': '容', '實': '实', '寵': '宠', '導': '导', '將': '将', '對': '对', '小': '小',
    '少': '少', '爾': '尔', '尖': '尖', '就': '就', '尷': '尴', '尬': '尬', '屍': '尸',
    '屋': '屋', '展': '展', '屬': '属', '山': '山', '島': '岛', '峰': '峰', '峽': '峡',
    '嶺': '岭', '嶼': '屿', '川': '川', '州': '州', '工': '工', '左': '左', '差': '差',
    '已': '已', '巴': '巴', '市': '市', '布': '布', '師': '师', '希': '希', '帖': '帖',
    '幫': '帮', '帶': '带', '常': '常', '帽': '帽', '幾': '几', '年': '年', '並': '并',
    '幸': '幸', '幻': '幻', '幼': '幼', '廣': '广', '廬': '庐', '庫': '库', '庭': '庭',
    '康': '康', '廟': '庙', '廢': '废', '廠': '厂', '廳': '厅', '延': '延', '建': '建',
    '開': '开', '式': '式', '引': '引', '弟': '弟', '張': '张', '強': '强', '彈': '弹',
    '歸': '归', '形': '形', '影': '影', '徹': '彻', '彼': '彼', '往': '往', '征': '征',
    '待': '待', '很': '很', '後': '后', '得': '得', '從': '从', '復': '复', '微': '微',
    '德': '德', '徵': '征', '心': '心', '必': '必', '快': '快', '念': '念', '忽': '忽',
    '怎': '怎', '思': '思', '怡': '怡', '急': '急', '性': '性', '怨': '怨', '怪': '怪',
    '總': '总', '恆': '恒', '恨': '恨', '恩': '恩', '息': '息', '悟': '悟', '惠': '惠',
    '悲': '悲', '情': '情', '想': '想', '感': '感', '愛': '爱', '態': '态', '慣': '惯',
    '慢': '慢', '慧': '慧', '懂': '懂', '憶': '忆', '懇': '恳', '懶': '懒', '懷': '怀',
    '懸': '悬', '戀': '恋', '成': '成', '我': '我', '或': '或', '戰': '战', '戲': '戏',
    '戶': '户', '所': '所', '手': '手', '才': '才', '打': '打', '找': '找', '承': '承',
    '把': '把', '報': '报', '披': '披', '抱': '抱', '拉': '拉', '拍': '拍', '拒': '拒',
    '招': '招', '拜': '拜', '拿': '拿', '掛': '挂', '指': '指', '按': '按', '捕': '捕',
    '換': '换', '揚': '扬', '提': '提', '擁': '拥', '撿': '捡', '據': '据', '擴': '扩',
    '擺': '摆', '擾': '扰', '支': '支', '收': '收', '改': '改', '放': '放', '政': '政',
    '故': '故', '效': '效', '教': '教', '散': '散', '數': '数', '文': '文', '齋': '斋',
    '斗': '斗', '料': '料', '新': '新', '斷': '断', '方': '方', '於': '于', '旁': '旁',
    '旅': '旅', '族': '族', '旗': '旗', '無': '无', '既': '既', '日': '日', '旦': '旦',
    '早': '早', '旬': '旬', '時': '时', '晨': '晨', '普': '普', '景': '景', '晴': '晴',
    '曆': '历', '暈': '晕', '暫': '暂', '更': '更', '書': '书', '最': '最', '月': '月',
    '有': '有', '朋': '朋', '服': '服', '望': '望', '朝': '朝', '期': '期', '木': '木',
    '本': '本', '未': '未', '末': '末', '術': '术', '朱': '朱', '朵': '朵', '機': '机',
    '材': '材', '村': '村', '板': '板', '林': '林', '果': '果', '枝': '枝', '東': '东',
    '杯': '杯', '析': '析', '松': '松', '板': '板', '構': '构', '標': '标', '樓': '楼',
    '樹': '树', '橋': '桥', '橫': '横', '檔': '档', '檢': '检', '櫻': '樱', '權': '权',
    '次': '次', '歡': '欢', '歲': '岁', '歷': '历', '歸': '归', '死': '死', '段': '段',
    '殺': '杀', '殿': '殿', '毀': '毁', '每': '每', '比': '比', '畢': '毕', '毛': '毛',
    '毫': '毫', '民': '民', '氣': '气', '水': '水', '永': '永', '江': '江', '池': '池',
    '沒': '没', '治': '治', '法': '法', '波': '波', '注': '注', '海': '海', '消': '消',
    '淨': '净', '深': '深', '混': '混', '清': '清', '減': '减', '港': '港', '游': '游',
    '灣': '湾', '準': '准', '溝': '沟', '溫': '温', '漢': '汉', '滿': '满', '漁': '渔',
    '漂': '漂', '漫': '漫', '演': '演', '漸': '渐', '潮': '潮', '澳': '澳', '濕': '湿',
    '濱': '滨', '瀨': '濑', '灣': '湾', '火': '火', '灰': '灰', '靈': '灵', '災': '灾',
    '為': '为', '煙': '烟', '熟': '熟', '營': '营', '爐': '炉', '爛': '烂', '爭': '争',
    '愛': '爱', '爺': '爷', '牆': '墙', '片': '片', '版': '版', '牌': '牌', '牙': '牙',
    '牛': '牛', '物': '物', '牲': '牲', '特': '特', '牽': '牵', '犬': '犬', '犯': '犯',
    '狀': '状', '猶': '犹', '狂': '狂', '狗': '狗', '獅': '狮', '貓': '猫', '獻': '献',
    '獲': '获', '率': '率', '王': '王', '玩': '玩', '環': '环', '現': '现', '理': '理',
    '琴': '琴', '瑞': '瑞', '瑪': '玛', '璣': '玑', '環': '环', '瓜': '瓜', '瓣': '瓣',
    '生': '生', '產': '产', '用': '用', '田': '田', '由': '由', '甲': '甲', '申': '申',
    '電': '电', '男': '男', '畫': '画', '界': '界', '留': '留', '畢': '毕', '異': '异',
    '當': '当', '病': '病', '疾': '疾', '痛': '痛', '療': '疗', '發': '发', '登': '登',
    '白': '白', '百': '百', '的': '的', '皆': '皆', '皇': '皇', '皮': '皮', '皺': '皱',
    '盈': '盈', '盃': '杯', '目': '目', '相': '相', '看': '看', '眼': '眼', '眾': '众',
    '睡': '睡', '督': '督', '瞭': '瞭', '知': '知', '短': '短', '石': '石', '碧': '碧',
    '碼': '码', '磁': '磁', '碑': '碑', '碧': '碧', '碩': '硕', '確': '确', '礙': '碍',
    '社': '社', '祖': '祖', '神': '神', '祥': '祥', '票': '票', '祭': '祭', '福': '福',
    '禮': '礼', '離': '离', '秀': '秀', '私': '私', '秋': '秋', '種': '种', '稱': '称',
    '稿': '稿', '積': '积', '穩': '稳', '空': '空', '穿': '穿', '突': '突', '窗': '窗',
    '窮': '穷', '立': '立', '站': '站', '競': '竞', '童': '童', '端': '端', '第': '第',
    '筆': '笔', '等': '等', '簡': '简', '算': '算', '管': '管', '節': '节', '範': '范',
    '築': '筑', '簽': '签', '米': '米', '粉': '粉', '粹': '粹', '精': '精', '糖': '糖',
    '系': '系', '約': '约', '紅': '红', '級': '级', '紀': '纪', '純': '纯', '紙': '纸',
    '納': '纳', '紐': '纽', '紛': '纷', '素': '素', '細': '细', '組': '组', '終': '终',
    '結': '结', '絕': '绝', '經': '经', '綜': '综', '綠': '绿', '網': '网', '維': '维',
    '緩': '缓', '編': '编', '練': '练', '總': '总', '績': '绩', '縱': '纵', '繁': '繁',
    '織': '织', '繞': '绕', '灣': '湾', '纜': '缆', '缺': '缺', '網': '网', '羅': '罗',
    '美': '美', '群': '群', '義': '义', '翻': '翻', '老': '老', '考': '考', '者': '者',
    '而': '而', '耍': '耍', '耐': '耐', '聊': '聊', '聽': '听', '聯': '联', '職': '职',
    '肉': '肉', '肚': '肚', '朋': '朋', '服': '服', '朗': '朗', '望': '望', '朝': '朝',
    '期': '期', '腿': '腿', '臉': '脸', '臘': '腊', '臣': '臣', '臨': '临', '自': '自',
    '至': '至', '致': '致', '臺': '台', '與': '与', '興': '兴', '舊': '旧', '舞': '舞',
    '舟': '舟', '船': '船', '航': '航', '般': '般', '艙': '舱', '艘': '艘', '色': '色',
    '艷': '艳', '節': '节', '藝': '艺', '藥': '药', '蘇': '苏', '處': '处', '號': '号',
    '虧': '亏', '行': '行', '術': '术', '街': '街', '衛': '卫', '衝': '冲', '衣': '衣',
    '表': '表', '裝': '装', '裡': '里', '補': '补', '製': '制', '複': '复', '西': '西',
    '要': '要', '規': '规', '視': '视', '覽': '览', '覺': '觉', '角': '角', '解': '解',
    '觸': '触', '言': '言', '計': '计', '訂': '订', '認': '认', '記': '记', '訪': '访',
    '設': '设', '許': '许', '訴': '诉', '詞': '词', '試': '试', '詩': '诗', '話': '话',
    '該': '该', '詳': '详', '誠': '诚', '語': '语', '說': '说', '請': '请', '諸': '诸',
    '課': '课', '調': '调', '談': '谈', '請': '请', '論': '论', '諮': '咨', '謎': '谜',
    '謝': '谢', '識': '识', '證': '证', '議': '议', '護': '护', '譽': '誉', '變': '变',
    '讓': '让', '谷': '谷', '豐': '丰', '象': '象', '貓': '猫', '貝': '贝', '負': '负',
    '貢': '贡', '財': '财', '責': '责', '貨': '货', '販': '贩', '貪': '贪', '貫': '贯',
    '責': '责', '貴': '贵', '費': '费', '賀': '贺', '資': '资', '賓': '宾', '賜': '赐',
    '賞': '赏', '賢': '贤', '賣': '卖', '購': '购', '賽': '赛', '贊': '赞', '贈': '赠',
    '贏': '赢', '走': '走', '趕': '赶', '起': '起', '超': '超', '越': '越', '趣': '趣',
    '足': '足', '跑': '跑', '跟': '跟', '路': '路', '跳': '跳', '踏': '踏', '蹤': '踪',
    '身': '身', '車': '车', '軍': '军', '軌': '轨', '轉': '转', '輪': '轮', '輸': '输',
    '辦': '办', '農': '农', '迎': '迎', '近': '近', '送': '送', '迷': '迷', '追': '追',
    '退': '退', '送': '送', '適': '适', '選': '选', '遞': '递', '遠': '远', '避': '避',
    '還': '还', '邊': '边', '邏': '逻', '那': '那', '郵': '邮', '鄰': '邻', '部': '部',
    '都': '都', '鄉': '乡', '酒': '酒', '配': '配', '醬': '酱', '重': '重', '野': '野',
    '量': '量', '金': '金', '針': '针', '釣': '钓', '鈔': '钞', '銀': '银', '錄': '录',
    '錯': '错', '錢': '钱', '鑽': '钻', '長': '长', '門': '门', '閒': '闲', '間': '间',
    '鬧': '闹', '聞': '闻', '關': '关', '闡': '阐', '隊': '队', '陽': '阳', '陰': '阴',
    '階': '阶', '隨': '随', '際': '际', '障': '障', '集': '集', '難': '难', '雲': '云',
    '電': '电', '需': '需', '露': '露', '靜': '静', '非': '非', '面': '面', '響': '响',
    '頁': '页', '頂': '顶', '項': '项', '順': '顺', '須': '须', '預': '预', '領': '领',
    '頭': '头', '頤': '颐', '頻': '频', '顆': '颗', '題': '题', '顏': '颜', '風': '风',
    '颱': '台', '飄': '飘', '飛': '飞', '食': '食', '餐': '餐', '養': '养', '館': '馆',
    '香': '香', '馬': '马', '駛': '驶', '騎': '骑', '驚': '惊', '體': '体', '高': '高',
    '鬥': '斗', '魚': '鱼', '鮮': '鲜', '鯊': '鲨', '鯨': '鲸', '鳥': '鸟', '鴨': '鸭',
    '鴻': '鸿', '鵝': '鹅', '鶴': '鹤', '鹹': '咸', '麥': '麦', '點': '点', '鼓': '鼓',
    '龍': '龙', '龜': '龟', '齡': '龄'
  };

  const s2t = {};
  for (const [t, s] of Object.entries(t2s)) {
    s2t[s] = t;
  }

  const en = {
    'nav-home': 'Home',
    'nav-explore': 'Explore',
    'nav-food': 'Food',
    'nav-tips': 'Tips',
    'nav-stories': 'Stories',
    'nav-about': 'About',
    'nav-map': 'Map',
    'nav-snorkeling': '🤿 Snorkeling',
    'nav-mobile-map': 'Map',
    'nav-mobile-snorkeling': '🤿 Snorkeling',
    'map-title': 'Hong Kong Interactive Map',
    'nav-mobile-home': 'Home',
    'nav-mobile-explore': 'Explore',
    'nav-mobile-food': 'Food',
    'nav-mobile-tips': 'Tips',
    'nav-mobile-stories': 'Stories',
    'nav-mobile-about': 'About',
    'hero-badge': 'Hong Kong · Find Your Corner',
    'hero-h1-1': 'No matter who you are,',
    'hero-h1-2': 'Hong Kong has a corner for you',
    'hero-subtitle': 'Discover the hidden side of Hong Kong — from neon streets to fishing villages.',
    'hero-search-placeholder': 'What do you want to experience?',
    'hero-search-option-family': 'Traveling with kids — Family Fun',
    'hero-search-option-youth': 'City walking & check-ins — Youth',
    'hero-search-option-adult': 'Need a breather — Working Adults',
    'hero-search-option-senior': 'Slow travel — Seniors',
    'hero-search-option-quiet': 'Want to do nothing — Quiet Corners',
    'hero-btn': "Let's Go",
    'stats-destinations': 'Destinations',
    'stats-guides': 'Age Guides',
    'stats-real': 'Real Stories',
    'stats-247': 'Chill 24/7',
    'section-for-everyone': 'For Everyone',
    'section-age-title': 'A Hong Kong route for every traveler',
    'section-age-sub': 'Not by attraction — by your pace and personality.',
    'age-family-tag': 'Family',
    'age-family-title': "Kids' Hong Kong",
    'age-family-desc': 'Disney, Ocean Park, Science Museum, Star Ferry — let their laughter fill the harbor breeze.',
    'age-youth-tag': 'Youth',
    'age-youth-title': 'Young & Urban',
    'age-youth-desc': 'Street art in Central, night markets in Mong Kok, hiking on Lamma Island — youth spent right.',
    'age-adult-tag': '30+ Working',
    'age-adult-title': 'A breather for the busy',
    'age-adult-desc': 'Mid-level Escalator, Stanley seafood, Victoria Harbour night cruise — Hong Kong is not just OT.',
    'age-senior-tag': 'Senior',
    'age-senior-title': 'Slow down, see Hong Kong',
    'age-senior-desc': 'Nan Lian Garden, Ngong Ping 360, Po Lin Monastery, old tea houses — time is the best guide.',
    'age-quiet-tag': 'Quiet Soul',
    'age-quiet-title': 'If you want to do nothing',
    'age-quiet-desc': 'West Kowloon bench, Central pier watching boats, Shek O sunset — stillness is also a journey.',
    'age-route-tag': 'Routes',
    'age-route-title': '3-Day Classic Route',
    'age-route-desc': "First time in Hong Kong? We've got you — island city vibes + Kowloon smoke + outlying islands.",
    'section-quiet-title': 'If you want nothing but to sit a while',
    'section-quiet-sub': 'Hong Kong is not all fast-paced. These places pause for you.',
    'quiet-wk-title': 'West Kowloon Promenade',
    'quiet-wk-desc': 'Come at dusk, watch the sunset paint the harbor. Doing nothing is the best travel.',
    'quiet-pier-title': 'Central Piers',
    'quiet-pier-desc': "A few dollars for the Star Ferry, wind in your hair — it's the cheapest healing.",
    'quiet-shek-o-title': 'Shek O Beach',
    'quiet-shek-o-desc': "Colorful houses, calm sea, slow dogs. Bring a picnic mat and vanish for an afternoon.",
    'quiet-nanlian-title': 'Nan Lian Garden',
    'quiet-nanlian-desc': 'A Tang dynasty garden steps from Diamond Hill MTR. Watch koi swim, time slows down.',
    'quiet-eslite-title': 'Eslite Bookstore Window',
    'quiet-eslite-desc': 'Grab a book at the Causeway Bay window seat, watch the crowd below like an ant colony.',
    'quiet-taimo-title': 'Tai Mo Shan Clouds',
    'quiet-taimo-desc': "HK's highest peak. Hike up at dawn, watch clouds roll over the city waking below.",
    'section-stories-title': 'Latest Hong Kong Stories',
    'section-stories-sub': 'Every visitor leaves a moment of wonder.',
    'stories-share-btn': 'Share Your Story',
    'footer-tagline': 'A young, sunny, authentic Hong Kong travel inspiration platform.',
    'footer-explore': 'Explore',
    'footer-guide': 'Age Guide',
    'footer-snorkeling': '🤿 Snorkeling',
    'footer-quiet': 'Quiet Map',
    'footer-tips': 'Travel Tips',
    'footer-stories': 'Stories',
    'footer-about': 'About',
    'footer-about-us': 'About SunnyHK',
    'footer-faq': 'FAQ',
    'footer-privacy': 'Privacy Policy',
    'footer-follow': 'Follow Us',
    'footer-made-with': 'Made with',
    'explore-title': 'Explore Hong Kong',
    'explore-subtitle': 'Find your corner of Hong Kong.',
    'explore-sidebar-family': '👶 Family',
    'explore-sidebar-youth': '🧑‍🎤 Youth',
    'explore-sidebar-adult': '💼 Working',
    'explore-sidebar-senior': '👴 Senior',
    'explore-sidebar-quiet': '🌊 Quiet',
    'explore-sidebar-photo': '📸 Photo',
    'explore-sidebar-routes': '🧭 Routes',
    'explore-search-placeholder': 'Search destinations...',
    'food-title': 'Hong Kong Food Map',
    'food-subtitle': 'Eat like a local, one bite at a time.',
    'tips-title': 'Hong Kong Travel Tips',
    'tips-subtitle': 'Everything you need to know before you go.',
    'snorkeling-title': '🤿 HK Snorkeling Guide',
    'snorkeling-subtitle': 'From beginner to pro, 12 best snorkeling spots — crystal clear water, colorful coral, fish galore.',
    'snorkeling-sidebar-title': 'Categories',
    'snorkeling-sidebar-beginner': '🏖️ Beginner',
    'snorkeling-sidebar-intermediate': '⚡ Intermediate',
    'snorkeling-sidebar-expert': '🏆 Expert',
    'snorkeling-sidebar-gear': '🎒 Gear Tips',
    'snorkeling-sidebar-safety': '⚠️ Safety',
    'section-beginner': '🏖️ Beginner Friendly',
    'section-intermediate': '⚡ For Experienced',
    'section-expert': '🏆 Expert Level',
    'section-gear': '🎒 Gear & Checklist',
    'section-safety': '⚠️ Safety Tips',
    'stories-title': 'Hong Kong Stories',
    'stories-subtitle': 'Real stories from real travelers.',
    'stories-filter-all': 'All Stories',
    'stories-filter-night': '🌇 Night',
    'stories-filter-food': '🍜 Food',
    'stories-filter-healing': '💛 Healing',
    'stories-filter-family': '👨‍👩‍👧 Family',
    'stories-filter-solo': '🎒 Solo',
    'stories-form-title': 'Share your story',
    'stories-form-nickname': 'Nickname (optional)',
    'stories-form-origin': 'Where are you from? (optional)',
    'stories-form-category': 'Category',
    'stories-form-message': 'Write your Hong Kong story...',
    'stories-form-submit': 'Post Story',
    'about-title': 'About SunnyHK',
    'about-subtitle': 'A travel guide made with love for Hong Kong.',
    'section-family': '👶 Family',
    'section-youth': '🧑‍🎤 Youth',
    'section-adult': '💼 Working',
    'section-senior': '👴 Senior',
    'section-quiet': '🌊 Quiet',
    'section-photo': '📸 Photo Spots',
    'section-routes': '🧭 Routes',
    'nav-explore-all': '🌟 All Guides',
    'nav-tips-all': '💡 All Tips',
    'nav-swimming': '🏊 Swimming',
    'nav-mobile-swimming': '🏊 Swimming',
    'nav-electronics': '💻 Electronics',
    'nav-mobile-electronics': '💻 Electronics',
    'nav-snorkeling': '🤿 Snorkeling',
    'nav-mobile-snorkeling': '🤿 Snorkeling',
    'swimming-title': '🏊 HK Swimming Guide',
    'swimming-subtitle': 'Gov\'t pools, 2026 pricing, hours, tips, and non-gov swimming spots.',
    'swimming-sidebar-title': 'Categories',
    'swimming-sidebar-price': '💰 Pricing',
    'swimming-sidebar-hk': '🏙️ HK Island',
    'swimming-sidebar-kowloon': '🌆 Kowloon',
    'swimming-sidebar-nt': '🌳 New Territories',
    'swimming-sidebar-tips': '💡 Tips',
    'swimming-sidebar-non': '🏖️ Non-Gov',
    'swimming-price-title': '💰 2026 Pool Fees',
    'swimming-hk-title': '🏙️ HK Island Pools',
    'swimming-kowloon-title': '🌆 Kowloon Pools',
    'swimming-nt-title': '🌳 NT Pools',
    'swimming-tips-title': '💡 Swimming Tips',
    'swimming-non-title': '🏖️ Non-Gov Swimming Spots',
    'electronics-title': '💻 Electronics Shopping Guide',
    'electronics-subtitle': 'Golden Computer Arcade, Wan Chai, gaming, cameras, phone accessories.',
    'electronics-sidebar-title': 'Categories',
    'electronics-sidebar-golden': '🖥️ Golden Arcade',
    'electronics-sidebar-wanchai': '🏢 Wan Chai',
    'electronics-sidebar-gaming': '🎮 Gaming',
    'electronics-sidebar-camera': '📷 Camera',
    'electronics-sidebar-phone': '📱 Phone',
    'electronics-sidebar-tips': '💡 Tips',
    'electronics-golden-title': '🖥️ Golden Computer Arcade',
    'electronics-wanchai-title': '🏢 Wan Chai Computer Centre',
    'electronics-gaming-title': '🎮 Gaming Hub',
    'electronics-camera-title': '📷 Camera Gear',
    'electronics-phone-title': '📱 Phones & Accessories',
    'electronics-tips-title': '💡 Shopping Tips',
    'nav-hiking': '🥾 Hiking',
    'nav-mobile-hiking': '🥾 Hiking',
    'footer-hiking': '🥾 Hiking Trails',
    'hiking-title': '🥾 HK Hiking Guide',
    'hiking-subtitle': 'Beginner to expert — Dragon\'s Back, Lion Rock, MacLehose Trail, Sunset Peak. Trails, transport, gear, and safety tips.',
    'hiking-sidebar-title': 'Trail Categories',
    'hiking-sidebar-beginner': '🌱 Beginner',
    'hiking-sidebar-intermediate': '⛰️ Intermediate',
    'hiking-sidebar-expert': '🏔️ Expert',
    'hiking-sidebar-family': '👨‍👩‍👧 Family',
    'hiking-sidebar-gear': '🎒 Gear',
    'hiking-sidebar-safety': '⚠️ Safety',
    'hiking-section-beginner': '🌱 Beginner Friendly',
    'hiking-section-intermediate': '⛰️ Intermediate',
    'hiking-section-expert': '🏔️ Expert Trails',
    'hiking-section-family': '👨‍👩‍👧 Family Walks',
    'hiking-section-gear': '🎒 Gear Tips',
    'hiking-section-safety': '⚠️ Safety Tips',
  };

  const STORAGE_KEY = 'sunnyhk-lang';
  const HTML_LANG = { trad: 'zh-HK', simp: 'zh-CN', en: 'en' };

  function convertStr(str, map) {
    let result = '';
    for (const ch of str) {
      result += map[ch] || ch;
    }
    return result;
  }

  function convertDOM(map) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null, false
    );
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const parent = node.parentElement;
      if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) continue;
      node.textContent = convertStr(node.textContent, map);
    }
    document.querySelectorAll('input, textarea, select').forEach(el => {
      if (el.placeholder) el.placeholder = convertStr(el.placeholder, map);
      if (el.value && el.tagName !== 'INPUT') el.value = convertStr(el.value, map);
    });
    document.querySelectorAll('[title]').forEach(el => {
      el.setAttribute('title', convertStr(el.getAttribute('title'), map));
    });
  }

  function applyEnglish() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (en[key]) {
        el.textContent = en[key];
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (en[key]) {
        el.placeholder = en[key];
      }
    });
    document.querySelectorAll('[data-i18n-option]').forEach(el => {
      const key = el.getAttribute('data-i18n-option');
      if (en[key]) {
        el.textContent = en[key];
      }
    });
  }

  function setLang(mode) {
    localStorage.setItem(STORAGE_KEY, mode);
    location.reload();
  }

  function initLang() {
    const saved = localStorage.getItem(STORAGE_KEY) || 'trad';
    if (saved === 'simp') {
      convertDOM(t2s);
    } else if (saved === 'en') {
      applyEnglish();
      document.title = document.title.replace('香港', 'Hong Kong');
    }
    document.documentElement.lang = HTML_LANG[saved] || 'zh-HK';
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === saved);
    });
  }

  window.SunnyLang = { setLang, initLang, convertStr, t2s, s2t };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLang);
  } else {
    initLang();
  }

})();
