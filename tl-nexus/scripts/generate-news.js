import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist/news");
const publicDir = resolve(__dirname, "../public/news");
const sitemapPath = resolve(__dirname, "../sitemap.xml");
const siteUrl = "https://berty.gamewayz.com";

const articles = [
  {
    id: "talandre-expansion",
    title: "Talandre 资料片上线 — 等级上限提升至55",
    date: "2026-03-06",
    author: "TL攻略站",
    icon: "🏔️",
    summary: "Wilds of Talandre 大型更新上线，全新地图、新装备等级、武器精通系统重做，等级上限从50提升至55。",
    tags: ["更新", "资料片"],
    content: `<p>3月6日上线的 Wilds of Talandre，是 Throne and Liberty 开服以来规模最大的一次更新。等级上限从50级提升到55级，这件事本身的影响就比看起来大得多 —— 意味着你要重新规划技能点分配，手上的装备也要重新评估。</p>
<p>Talandre 这张新地图，面积比之前所有区域加起来还大。初次踏进这片荒野的时候，最直观的感受就是 —— 怪物的密度和强度完全不是一个级别。野外练级的时候，建议组队走，单人容易被野怪围死。地图上有好几个新的传送点，记得先把这些传送点都开了，后面做日常会方便很多。</p>
<p>这次更新最核心的变动是武器精通系统（Weapon Mastery）。每把武器现在有了独立的精通树，你可以给自己的主武器和副武器分别加点。比如你玩剑匕，可以给大剑点出增加爆发伤害的被动，匕首点出毒伤强化。我以前切武器总觉得少点东西，有了精通系统之后，两把武器的区别真的做出来了。建议优先把主武的精通点到600，副武到500左右，这样收益最高。</p>
<p>装备方面，新增了 Epic Lv.2（英雄2段）装备，世界树套装是其中的代表。这个阶段的装备获取主要靠新的4星副本 Crypt of Augmentation 和野外boss。和之前的装备相比，英雄2段的属性提升很明显，特别是基础攻击力和防御值的差距。如果你已经全身英雄1段毕业了，接下来就该往这个方向走了。</p>
<p>另外值得一提的改动是位置攻击系统。从侧面或者背面攻击敌人会有额外伤害加成，这个机制让战斗中的站位变得更重要了。玩近战的朋友，打boss的时候尽量绕到背后输出，伤害差距还是能感觉出来的。远程职业虽然触发位置加成的机会少一些，但配合控制技能也能打出不错的收益。</p>
<p>跨服攻城战（Interserver Siege）也在这次版本中引入了，每三周打一次。城堡所有者可以跨服挑战其他服务器的公会。这个模式对于休闲公会来说可能门槛高了点，但去体验一次还是挺有意思的，毕竟跨服打攻城的感觉和本服完全不一样。</p>`,
  },
  {
    id: "update-331",
    title: "更新 3.31.0 — 战场调整 & 武器平衡",
    date: "2026-04-22",
    author: "TL攻略站",
    icon: "📋",
    summary: "战场移除角色分工效果，浮空精灵花园改版，短剑和长矛问题修复。",
    tags: ["更新", "补丁"],
    content: `<p>4月22日的 3.31.0 更新，把重点放在了战场和武器平衡上。这次改动的幅度不小，而且很多地方确实打到了痛点。</p>
<p>先说战场。之前战场里强制分了坦克、打手、补师三个角色，匹配的时候经常要等很久才能排到人，特别是缺补师的时候。这次更新直接把这个分工机制移除了，排队速度快了很多。之前因为排不到人而放弃战场的玩家，现在可以回来试试了。</p>
<p>浮空精灵花园这个地图也做了调整。胜利条件从原本的150k分降到了120k，单场时间缩短了一些。占领据点从200分涨到500分，这意味着控点比单纯打架更划算了。以前很多局到最后就是两边在对刷，现在至少有了明确的战略目标。还有个细节改动是锻造能量不再直接给分了，必须交了锻造能量才计分，这个机制堵住了之前挂机刷分的漏洞。</p>
<p>武器修复方面，短剑玩家应该注意到了，「暗影精灵」技能之前有个烦人的bug —— 隐身效果结束后战斗状态卡住不解除，导致没法正常切武器。这次终于修了。长矛的「丧钟」技能也改了触发概率，PVP从15%提到30%，PVE反而从30%降到15%。说实话PVE那边削弱得有点狠，打副本的时候触发频率明显低了，但PVP的提升确实让长矛在竞技场里更有存在感了。</p>
<p>装备方面，Lucien's Code of the Heretic 这件装备之前有个问题 —— 可以高频触发造成过量伤害，现在加了每秒最多10次的限制。月光石穿模的问题也修了，以前在城里经常看到好几个人叠在一起，视觉效果很诡异。装备配置切换现在加了技能冷却，这个改动影响挺大的 —— 以前可以战斗中秒切装备打一波爆发，现在不行了，建议在开战前就确认好方案。</p>`,
  },
  {
    id: "new-dungeon-crypt",
    title: "新4星副本：Crypt of Augmentation 攻略要点",
    date: "2026-03-15",
    author: "TL攻略站",
    icon: "💀",
    summary: "对抗死灵法师 Velentra，战力5000+门槛，掉落T2关键装备。从配置到走位，野队开荒注意事项。",
    tags: ["副本", "攻略"],
    content: `<p>Crypt of Augmentation 是 Talandre 资料片新增的4星副本，最终Boss是死灵法师 Velentra。进本门槛战力5000+，推荐配置一坦一补两输出。这个本对于初次接触的团队来说，可能需要灭个几次才能找到节奏。</p>
<p>先说P1阶段。Velentra 开场后会不断召唤亡灵小兵，数量大概在三到四波左右。坦克需要注意把怪聚到一起，方便输出一波清掉。小兵的伤害不低，如果让它们散开追补师，很容易崩盘。我自己的经验是，坦克进场后先把Boss拉在场地中央偏左的位置，这样小兵刷新出来会自动往坦克方向靠。</p>
<p>Boss的「灵魂吸取」技能是P1阶段最容易灭团的地方。这个技能会锁定一个玩家吸血，伤害很高，必须由补师即时驱散。如果你的队伍里补师反应不够快，建议让被锁的人自己带个解控技能。野队翻车十次有八次都是栽在这个技能上。</p>
<p>Boss血量掉到50%以下进入P2阶段。场地四周会出现好几根柱子，同时Boss开始读条全屏AOE。这个AOE的伤害是秒杀级的，唯一的应对方法是躲在柱子后面。柱子有固定的倒塌顺序，注意观察地面上的影子提示。很多队伍在这里团灭是因为所有人躲同一根柱子，结果柱子倒了大家一起被炸。建议打之前分好工，每个人固定躲一根。</p>
<p>P2阶段Velentra还会在地面上召唤黑暗法阵，站在上面会持续掉血。法阵的出现位置有一定规律，通常是远程队友站位的附近。补师在这个阶段压力很大，既要躲AOE又要驱散还要抬血，建议提前和队友沟通好减伤技能的轮换顺序。</p>
<p>掉落方面，这个副本产出T2史诗装备（头盔、胸甲、手套等部位），还有高磨结晶和混沌符文。对于正在从英雄1段往英雄2段过渡的玩家来说，Crypt of Augmentation 是每周必刷的本。速刷的话，核心就是带一个熟练的补师，坦克把Boss背对团队，输出在P2阶段记好柱子顺序，打得快的话十分钟内可以收工。</p>`,
  },
  {
    id: "invasion-event",
    title: "Arkeum 入侵活动 — 限时奖励 & 日程",
    date: "2026-01-15",
    author: "TL攻略站",
    icon: "⚔️",
    summary: "Arkeum Legion 入侵活动开启，限时获取新表情、变形形态和混沌棱晶，持续到1月28日。",
    tags: ["活动", "限时"],
    content: `<p>1月15日到1月28日，Arkeum Legion 入侵活动限时开放。这算是 TL 在年初的一次较大规模的限时活动，持续两周，内容不算复杂但奖励挺实在的。</p>
<p>活动期间，Arkeum 侵略者会在多个地图区域定时刷新。工作日每天三场，周末每天四场，时间点基本覆盖了大部分玩家的上线时段。活动开始前会有系统公告，看到公告之后尽快传送到对应地图，因为人多了之后怪抢得很快。建议提前在活动区域附近设一个传送点，节省跑路时间。</p>
<p>奖励方面，比较值得关注的有三个。第一个是全新的表情动作，这个属于绝版类收藏品，过了活动期就拿不到了。第二个是变形形态（Shapeshift Morph），说白了就是一个限定皮肤，喜欢收集外观的玩家不要错过。第三个是混沌棱晶（Chaos Prisms），这是高难度副本相关材料，对于在冲高难的玩家来说价值很高。</p>
<p>活动奖励是通过完成入侵阶段任务积累积分兑换的，所以尽量每天打满。不建议最后几天集中刷，因为活动最后一天怪物的竞争会很激烈，大家都在抢。</p>
<p>除了活动之外，这次的版本更新还附带了一些重要的平衡调整。最值得注意的是「多个生成额外弹道的技能不再叠加增伤」—— 这意味着以前某些武器可以通过叠加弹道数来打出爆炸伤害的套路被砍了。弩弓的技能也做了全面调整，具体来说是削弱了部分技能的系数。另外战场弱势方增益效果增强了，分差越大增益越强，这个改动对战场平衡有帮助。装备技能减伤效果翻倍，坦度的提升会改变PVP的环境。</p>`,
  },
  {
    id: "server-merge",
    title: "亚服服务器合并 & 新手追赶机制",
    date: "2026-05-10",
    author: "TL攻略站",
    icon: "🔄",
    summary: "亚服NCsoft宣布服务器合并计划，同时推出新手快速成长箱和世界树引导系统，降低入坑门槛。",
    tags: ["服务器", "新手"],
    content: `<p>NCsoft 在5月初宣布了亚服的服务器合并计划。这次合并的目的很明确 —— 把低活跃度的服务器整合到一起，让每个服的玩家密度回到健康的水平。对于还在鬼服坚持的玩家来说，这绝对是个好消息。</p>
<p>合并的具体安排是这样的：多个低活跃服务器合并成数量更少的活跃服务器，角色数据、公会数据、仓库物品全部保留，不会删东西。合并期间会有一个短暂的维护窗口，维护结束后登录游戏就能看到新的服务器列表。需要留意的是，合并后你的角色名如果跟目标服的人重名了，系统会让你重新取名字。建议维护前想好几个备选方案，免得上线了才开始纠结。</p>
<p>除了合并服务器之外，这次更新还同步推出了一套新手追赶机制。核心是「世界树的引导」系统，简单来说就是给新号发装备。从高级装备开始，逐步解锁稀有、英雄1段、英雄2段。以前新手想追上大部队需要花好几周时间做日常攒装备，现在这个系统大大缩短了这个过程。</p>
<p>对于已经玩了一段时间但还没毕业的玩家，这个系统也有用。如果你的战力超过5000了，完成引导任务可以获得转换石、萃取石和解锁石。这些材料在装备成型阶段非常关键，平时不太好刷。第二阶段的奖励是一条项链，对于大多数职业来说都是不错的过渡选择。1到5阶段会逐步解锁更多重要物品，建议新玩家优先把这个引导任务线做完，收益比零散做日常高得多。</p>
<p>亚服还有一个专属的快速成长箱，里面有一套完整的英雄装备，外加技能成长书、人工制品和符文。这个箱子对于刚入坑的新手来说是性价比最高的选择，基本上开了就能直接开始打中低难度副本。如果你或者你的朋友正考虑入坑 TL，现在是最好的时机 —— 服务器更热闹了，追赶机制也到位了。</p>`,
  },
  {
    id: "nebula-island",
    title: "星云岛激战场全面指南 — 跨服PVE/PVP",
    date: "2026-05-20",
    author: "TL攻略站",
    icon: "🌌",
    summary: "跨服星云岛激战场攻略，中立区/PVE区/PVP区详解，以及每周各时段活动安排与奖励获取技巧。",
    tags: ["PVP", "跨服"],
    content: `<p>星云岛激战场（Nebula Island）是 TL 中跨服混合PVE和PVP的核心区域。说是「岛」，其实更像是一张完整的大地图，里面根据区域性质分成了三大块。每周的基本入场时间是5小时，用星云充能石可以增加时长，对于常去刷的玩家来说充能石基本是必需品。</p>
<p>先说说各区域的分布。中立区也叫抵抗军探查基地，是安全的，不能打架。这里是玩家集结、补给的起点，建议把重生点设在这里。PVE区是迷雾森林，主要用来刷怪。这里的怪物强度比野外高，但掉落的星云石和符文品质也更好。PVP区才是重点，分为亚奇恩驻地、兽人部落、牺牲寺院、被封印圣所四个区域。进入PVP区之前一定要确认自己的装备和消耗品带够了，因为进去之后随时可能遭遇敌对公会。</p>
<p>活动时间方面，每个PVP区不定时会在整点刷新野外首领。每天固定有一场区域活动加一场星云岛首领战。周日比较特别，两场首领都是公会模式，这意味着竞争会更激烈。如果你想冲排名，周日是最关键的一天。我个人的建议是，如果不是必争的奖励，尽量避开周日高峰期去刷材料，人少的时候效率反而更高。</p>
<p>奖励方面，星云岛产出星云石、符文、人工制品和星云饰品。对于正在做英雄装备的玩家来说，这里是每周必须清掉的内容。特别是人工制品，在外面的获取渠道有限，星云岛算是比较稳定的来源。</p>
<p>最后说几点实战经验。第一，进PVP区一定要组队，单走就是给人送分的。第二，星云充能石别一次性全磕了，算好自己每周能打的时间，分批使用更划算。第三，BOSS战的时候注意周围的玩家，有些人会趁你打BOSS残血的时候偷袭 —— 这种事情很常见，被阴过一两次之后就长记性了。</p>`,
  },
  {
    id: "summer-event-2026",
    title: "2026夏日活动「幻象回廊」限时开启",
    date: "2026-05-28",
    author: "TL攻略站",
    icon: "🏖️",
    summary: "夏日限定活动幻象回廊开放，新增8种幻象鱼、隐藏地图和夏日限定外观套装，钓鱼经验+50%。",
    tags: ["活动", "夏日", "限时"],
    content: `<p>5月28日上线的夏日活动「幻象回廊」，可能是今年以来最轻松有趣的一个限时活动。不需要打打杀杀，主要就是钓鱼和探索，很适合不想打副本PVP的时候换个心情。</p>
<p>幻象回廊是一张隐藏地图，不能直接传送进去，需要通过开启神秘环球随机触发入口。每次用神秘环球钥匙开启环球之后，有一定概率会出现一道发光的裂缝，点进去就是幻象回廊。概率不算特别高，我平均开七八个环球能进一次。所以建议每天把委托铸币商那边的钥匙买满，增加入场次数。</p>
<p>进去之后，地图里散布着特殊的资源采集点和鱼点。活动期间新增了8种幻象鱼，这些鱼只在幻象回廊里才能钓到。收集齐了可以兑换限定外观套装 —— 说实话这套夏日外观的设计还挺用心的，比之前几期活动的外观好看。另外地图里还有稀有宝箱，里面能开出一些平时不太容易拿到的材料。</p>
<p>活动期间的一个重大利好是钓鱼经验加成50%。对于还在练钓鱼等级的玩家来说，这是冲级的最佳窗口。特殊钓点的刷新频率也提升了，平时3小时才刷新一次的特殊鱼点，活动期间刷得更快。如果你想趁着活动把钓鱼冲到高级，建议集中在殷红林水池和贝德乐山脉这两个钓点，效率最高。</p>
<p>活动到6月25日结束，差不多有一个月的时间。每天花十分钟开环球、进回廊、钓几条鱼，累积下来奖励还是很可观的。就算不为了限定外观，光是为了那些稀有材料也值得参与。</p>`,
  },
  {
    id: "new-map-nix",
    title: "冰封边界：尼克斯 — TL史上最大更新 亚服6/23·国际服6/25",
    date: "2026-05-25",
    author: "TL攻略站",
    icon: "❄️",
    summary: "全新冰原地图尼克斯是TL史上最大区域，等级上限提至60、新武器拳套、新坐骑天刺与米里奈，7-8月更新路线图同步公开。",
    tags: ["更新", "新地图", "资料片"],
    content: `<p>6月即将上线的「冰封边界：尼克斯」（The Frozen Divide: Nix），是 Throne and Liberty 迄今为止规模最大的一次内容更新，甚至比 Talandre 还要大。亚服6月23日上线，国际服6月25日。这次更新带来的东西很多，从新地图到新武器再到新的成长上限，几乎覆盖了游戏的每个方面。</p>
<p>先说新地图尼克斯。按照官方说法，这是TL目前面积最大的区域，极寒冰原主题。地图上覆盖着冰雪，部分区域还会有暴风雪天气，能见度会大幅降低。探索这张地图需要用到两种新移动机制：「天刺」是俯冲滑翔用的，可以从高处快速下落到指定位置；「米里奈」则是空中快速穿梭，类似于一个短距离空中冲刺。这两种机制让尼克斯的探索方式和之前的地图完全不一样，很多隐藏区域需要你会用这些新技能才能到。</p>
<p>全新武器「拳套」是这次更新最受关注的亮点之一。这是一把坦克/输出混合型近战武器，核心设计是双姿态切换。重击姿态下防御力提升，输出以重击和压制为主；利爪姿态下攻速加快，连击更加流畅。你可以战斗中随时切换姿态，灵活性很高。对于喜欢近战但又不想完全放弃坦度的玩家来说，拳套可能是最合适的副武器选择。</p>
<p>等级上限从55提升到60级，意味着新装备和新技能的加入。装备系统本身也做了改革，成长路线比以前灵活了。新增了两个合作副本，各自有全新的首领和机制。挑战模式（Challenge Mode）也是这次新增的，对标高难玩家，通关后有特殊奖励。世界树引导功能进一步完善，新手追赶的速度更快了。</p>
<p>装备系统方面，道具系统做了全面改革。以前装备升级路线相对固定，选择空间不大。改版之后你可以更自由地规划自己的装备路线，自定义范围拓展了不少。高难度内容的顶级奖励也更有吸引力了，不再是那种「打了也白打」的感觉。</p>
<p>另外官方还公布了7月和8月的后续更新计划。7月迎来新篇章首领「龙骑士拉姆斯」，附带新装备和新的支线故事，还有两个合作副本「铁矿石摇篮」和「霜息洞穴」。全新战场模式「密封战斗」也在7月上线。8月就更重磅了 —— TL 史上最巨大的「泰拉首领」登场，这种Boss的体量和之前的完全不是一个级别。如果你现在在观望要不要投入时间玩TL，尼克斯更新是一个非常合适的入坑节点。</p>`,
  },
  {
    id: "star-journey",
    title: "「星之旅程」系统上线 — 累积成长型内容",
    date: "2026-05-12",
    author: "TL攻略站",
    icon: "⭐",
    summary: "亚服5月12日更新新增星之旅程系统，通过冒险宝典、探查宝典、时空痕迹获得星之记忆永久提升能力值。",
    tags: ["更新", "系统"],
    content: `<p>5月12日的亚服更新上线了一个新的累积成长型系统 ——「星之旅程」。这个系统的作用是把原本分散在各种内容里的成长要素整合到一起，让你做的每件事都直接转化为角色能力的提升。</p>
<p>激活星之旅程需要先完成「冒险宝典」→「序章」→「序幕.拥有星星的孩子」这条任务线。做完之后系统就解锁了。之后你在冒险宝典、探查宝典和时空痕迹中完成目标，就能获得「星之记忆」。每个星之记忆都会永久提升你的某些能力值，而且是自动使用的，不需要你去手动操作什么。</p>
<p>时空痕迹是星之旅程系统中比较有意思的一部分。各个领地出现了时空奇异点和文物垂钓名胜。时空奇异点是一个传送门，进去之后完成指定目标就能获得星之记忆。文物垂钓名胜则是一个钓鱼点，在那里钓鱼有概率钓出星之记忆。如果你把时空痕迹部分的完成度做到100%，每天会额外刷新2个随机时空奇异点和1个文物垂钓名胜。做这些每日目标除了拿星之记忆，还能获得特级抵抗军勋章。</p>
<p>冒险宝典和探查宝典的UI也做了改版，现在更容易看清楚自己的进度了。冒险宝典加入了阶段细分，分为第1章、第2章和间幕。探查宝典适配了每个领地和区域地图，不用来回切换界面了。希雷乌斯深渊的探查宝典也合并到了统一的界面里，比以前方便不少。</p>
<p>除了星之旅程，这次更新还开启了竞技场第6赛季和战场第1赛季。新赛季加入了基于排名的荣誉奖励。三个战场奖杯（金、银、铜）可以在工坊制作，摆在家里当装饰。赫乐巴村的英勇广场新增了顶级玩家的雕像，如果你排名够高，你的角色也有机会出现在那里。另外新增了战场铸币商人和星云石商人，以后换装备不用再跑好几个地方了。</p>`,
  },
  {
    id: "summer-roadmap-2026",
    title: "尼克斯之后：7-8月更新路线图 — 龙骑士·泰拉首领·新战场",
    date: "2026-05-25",
    author: "TL攻略站",
    icon: "🗓️",
    summary: "NCsoft公布尼克斯上线后的更新路线图：7月龙骑士拉姆斯+铁矿石摇篮副本+密封战斗战场，8月泰拉巨型Boss+攻城优化。",
    tags: ["更新", "路线图", "预告"],
    content: `<p>在公布尼克斯资料片的同时，NCsoft 也提前放出了6月之后7月和8月的更新规划。能提前两个月看到路线图，对于规划游戏进度来说还是挺有帮助的。</p>
<p>7月的更新重点有两个。第一个是新篇章首领「龙骑士拉姆斯」，这是一个剧情向的Boss，伴随着拉姆斯相关的支线故事集。击败它可以获得一系列拉姆斯主题的装备，强度定位在弧形Boss级别。第二个重点是转职大法师相关的法典内容和装备 —— 看起来官方在法师这个职业线上投入了不少资源，法系玩家可以期待一下。</p>
<p>副本方面，7月新增「铁矿石摇篮」和「霜息洞穴」两个合作副本。同时挑战次元阵也会开放，对于已经在英雄装备毕业的玩家来说，这是新的挑战目标。PVP方面，全新战场模式「密封战斗」上线，具体规则官方还没细说，但从名字来看应该是小规模封闭场地内的对抗，和现有的据点占领模式会有明显区别。</p>
<p>8月的更新最引人注目的是「泰拉首领」。官方描述是「TL 中出现空前巨大的泰拉首领」，这个泰拉（Terra）从名字来看可能和世界观中的大地元素有关。和之前的野外Boss不同，泰拉首领的体型要大得多，战斗方式可能也有本质区别。伴随泰拉首领而来的还有新的支线故事法典和对应的装备。</p>
<p>另外8月还会改进岩石镇的攻城体验和税收运输系统。对于参与公会战的玩家来说，攻城战的优化一直都是呼声比较高的需求，希望这次不只是修修边角，而是有实质性的体验提升。</p>
<p>在此之外，亚服6月2日进行了服务器整合。如果你之前所在的服务器合并了，记得去确认一下你的角色名是否需要更改，还有公会仓库的东西有没有全部转移过来。整体来看，TL 从5月到8月的更新节奏非常紧凑，基本上每个月都有值得期待的新内容。</p>`,
  },
  {
    id: "update-3-37-0-mq0wfrkr",
    title: "更新 3.37.0 — 例行维护与后续展望",
    date: "2026-06-03",
    author: "TL攻略站",
    icon: "📋",
    summary: "TL 3.37.0 版本例行维护约3小时，为后续尼克斯资料片做准备。维护期间更新内容预览和版本变动分析。",
    tags: ["更新"],
    content: `<p>6月3日，Throne and Liberty 进行了 3.37.0 版本的例行维护。这次的停机时间从太平洋时间晚上10点半开始，持续大约3个小时。虽然只是一个中间版本的小更新，但在尼克斯资料片即将上线的大背景下，这次维护也包含了为后续内容做准备的一些底层调整。</p>
<p>按照TL以往的更新规律，这种点版本号的更新通常不会有大功能上线，主要是修复一些社区反馈的问题，以及为后续大版本铺路。这次维护的内容应该包括一些服务器端的性能优化、bug修复，以及可能是尼克斯资料片的前置数据更新。这类更新虽然玩家感知不强，但对于保证大版本上线时的稳定性还是很重要的。</p>
<p>对于一般玩家来说，维护期间可以做的事情其实不少。如果你是准备在尼克斯版本入坑的新玩家，可以利用维护时间去了解一下各武器的定位和搭配，提前规划好自己的职业路线。也可以看看之前我们整理的武器攻略和副本指南，确定一下自己的目标装备。</p>
<p>如果你已经是活跃玩家，维护前记得确认一下自己有没有什么需要维护前处理的事情 —— 比如周常任务做完了没、深渊凭证用完了没。维护结束后第一时间登录，看看有没有什么补偿邮件，TL一般会给一些维护补偿，通常是料理或者恢复药水之类的小东西。</p>
<p>3.37.0 之后的下一个大版本就是6月23日（亚服）/6月25日（国际服）的尼克斯更新了。这次更新包含新地图、新武器、新等级上限和装备系统改革，是入坑或者回坑的好时机。</p>`,
  },
];

function buildPage(article, relatedLinks) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary || `${article.title} — 王权与自由 Throne and Liberty 最新资讯和攻略`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "TL攻略站",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/news/${article.id}.html`,
    },
  };

  const relatedHtml = relatedLinks.length
    ? `<div class="related">
  <h2>相关文章</h2>
  <div class="related-grid">
${relatedLinks.map((r) => `    <a href="${siteUrl}/news/${r.id}.html" class="related-card">
      <span class="related-icon">${r.icon}</span>
      <span class="related-title">${r.title}</span>
      <span class="related-date">${r.date}</span>
    </a>`).join("\n")}
  </div>
</div>`
    : "";

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${article.title} — 王权与自由 TL攻略站</title>
  <meta name="description" content="${article.summary || (article.title + ' — 王权与自由 Throne and Liberty 最新资讯和攻略')}" />
  <meta name="keywords" content="王权与自由, Throne and Liberty, TL攻略, ${article.title}" />
  <meta property="og:title" content="${article.title} — 王权与自由 TL攻略站" />
  <meta property="og:description" content="${article.summary || (article.title + ' — 王权与自由 Throne and Liberty 最新资讯')}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${siteUrl}/news/${article.id}.html" />
  <meta property="og:site_name" content="王权与自由 · TL攻略站" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="canonical" href="${siteUrl}/news/${article.id}.html" />
  <script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Noto Sans SC", "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
      background: #0a0a12; color: #c0b090; line-height: 1.9;
      -webkit-font-smoothing: antialiased;
    }
    .container { max-width: 780px; margin: 0 auto; padding: 40px 20px 60px; }
    .breadcrumb {
      display: flex; align-items: center; gap: 6px;
      font-size: 13px; color: #6a5a4a; margin-bottom: 20px;
    }
    .breadcrumb a { color: #c9a227; text-decoration: none; }
    .breadcrumb a:hover { text-decoration: underline; }
    .breadcrumb span { color: #6a5a4a; }
    .back {
      display: inline-flex; align-items: center; gap: 6px;
      color: #c9a227; text-decoration: none; font-size: 14px; margin-bottom: 24px;
    }
    .back:hover { opacity: 0.8; }
    .tag {
      display: inline-block; padding: 4px 12px; border-radius: 20px;
      font-size: 12px; background: rgba(201,162,39,0.1); color: #c9a227;
      border: 1px solid rgba(201,162,39,0.2); margin-bottom: 16px;
    }
    h1 {
      font-size: 26px; color: #fff; margin-bottom: 12px; line-height: 1.5;
      font-weight: 700;
    }
    .meta { color: #6a5a4a; font-size: 13px; margin-bottom: 28px; }
    .content h2 {
      font-size: 20px; color: #d0b890; margin: 32px 0 14px; padding-bottom: 8px;
      border-bottom: 1px solid rgba(201,162,39,0.12);
      font-weight: 600;
    }
    .content h3 {
      font-size: 17px; color: #c9a227; margin: 24px 0 10px;
      font-weight: 500;
    }
    .content p { margin-bottom: 16px; font-size: 15px; }
    .content ul { padding-left: 22px; margin-bottom: 16px; }
    .content li { margin-bottom: 8px; font-size: 15px; }
    .content strong { color: #d0b890; }
    hr { border: none; border-top: 1px solid rgba(201,162,39,0.08); margin: 44px 0; }
    .related { margin-top: 44px; }
    .related h2 {
      font-size: 18px; color: #d0b890; margin-bottom: 16px;
      font-weight: 600;
    }
    .related-grid {
      display: grid; gap: 10px;
    }
    .related-card {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 16px; border-radius: 12px;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(201,162,39,0.08);
      text-decoration: none; transition: all 0.2s;
    }
    .related-card:hover {
      background: rgba(201,162,39,0.05);
      border-color: rgba(201,162,39,0.2);
    }
    .related-icon { font-size: 20px; flex-shrink: 0; }
    .related-title { font-size: 14px; color: #b0a080; font-weight: 500; flex: 1; }
    .related-date { font-size: 12px; color: #5a4a4a; flex-shrink: 0; }
    .footer-link {
      text-align: center; color: #5a4a4a; font-size: 13px; margin-top: 44px;
    }
    .footer-link a { color: #c9a227; text-decoration: none; }
    .footer-link a:hover { text-decoration: underline; }
    @media (max-width: 640px) {
      .container { padding: 24px 16px 40px; }
      h1 { font-size: 22px; }
      .content p, .content li { font-size: 15px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <nav class="breadcrumb">
      <a href="${siteUrl}">首页</a>
      <span>/</span>
      <span>${article.title}</span>
    </nav>
    <a class="back" href="${siteUrl}">← 返回首页</a>
    <div class="tag">${article.icon} ${article.date} · ${article.author}</div>
    <h1>${article.title}</h1>
    <div class="meta">${article.date} · ${article.author}</div>
    <div class="content">${article.content}</div>
    ${relatedHtml}
    <hr />
    <div class="footer-link">
      <a href="${siteUrl}">王权与自由 · TL攻略站</a> — 最全面的 Throne and Liberty 游戏指南
    </div>
  </div>
</body>
</html>`;
}

function generateSitemap() {
  const articleUrls = articles.map((a) => {
    return `  <url>
    <loc>${siteUrl}/news/${a.id}.html</loc>
    <lastmod>${a.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${articleUrls}
</urlset>
`;
  writeFileSync(sitemapPath, xml, "utf-8");
  console.log("  ✓ sitemap.xml updated");
}

function getRelatedArticles(currentId) {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  return sorted.filter((a) => a.id !== currentId).slice(0, 3);
}

function main() {
  mkdirSync(publicDir, { recursive: true });
  articles.forEach((a) => {
    const related = getRelatedArticles(a.id);
    const html = buildPage(a, related);
    writeFileSync(resolve(publicDir, `${a.id}.html`), html, "utf-8");
    console.log(`  ✓ news/${a.id}.html`);
  });
  generateSitemap();
}

main();
