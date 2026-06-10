import { pvpGuides } from "../data/gameData";

const weatherEffects = [
  { weather: "☔ 雨天", effect: "闪电系技能伤害与范围大幅提升", class: "法杖使用者", color: "#70a1ff" },
  { weather: "💨 大风", effect: "火焰技能传播范围与持续时间增加", class: "法杖 / 十字弓", color: "#ff6b35" },
  { weather: "❄️ 雪天", effect: "冰霜效果增强，移动速度Debuff延长", class: "长弓使用者", color: "#a0d8ef" },
  { weather: "☀️ 晴天", effect: "普通状态，无特殊天气加成", class: "全职业均衡", color: "#c9a227" },
];

export default function PvpSection() {
  return (
    <section id="pvp" className="py-24 bg-[#0a0a12] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />

      {/* Banner */}
      <div className="relative h-48 sm:h-64 mb-16 overflow-hidden bg-gradient-to-r from-[#0a0505] via-[#1a0a0a] to-[#0a0a12]">
        <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage: 'repeating-linear-gradient(-45deg, #ff4757 0px, #ff4757 1px, transparent 1px, transparent 30px)'}} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12]/60 via-transparent to-[#0a0a12]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff4757]/40 bg-[#0a0a12]/60 text-[#ff6b75] text-sm mb-3 backdrop-blur-sm">
              ⚔️ PVP指南
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              战场制胜 · PVP全指南
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* PVP Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pvpGuides.map((guide) => (
            <div
              key={guide.title}
              className="group bg-gradient-to-br from-[#0f0f1c] to-[#08080f] rounded-2xl border border-[#1a1530] p-6 hover:border-[#c9a227]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,162,39,0.08)] hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#c9a227]/10 border border-[#c9a227]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  {guide.icon}
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/20 text-[#c9a227]">
                  {guide.type}
                </span>
              </div>

              <h3 className="text-white font-bold text-lg mb-1">{guide.title}</h3>
              <p className="text-[#c9a227]/60 text-xs mb-3">{guide.subtitle}</p>
              <p className="text-[#7a6a4a] text-sm leading-relaxed mb-4">{guide.description}</p>

              {/* Tips */}
              <div className="space-y-2">
                {guide.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#c9a227] text-xs mt-1 flex-shrink-0">◆</span>
                    <span className="text-[#8a7a5a] text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Weather System */}
        <div className="bg-gradient-to-br from-[#0f0f1c] to-[#08080f] rounded-2xl border border-[#2a2540] p-6 sm:p-8 mb-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#70a1ff]/30 bg-[#70a1ff]/5 text-[#70a1ff] text-sm mb-4">
              🌤️ 天气系统
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-white mb-2">
              天气联动 · 战略核心
            </h3>
            <p className="text-[#7a6a4a] text-sm max-w-lg mx-auto">
              王权与自由的动态天气系统直接影响战斗策略。聪明的玩家会在不同天气下切换技能组合，以获得决定性优势。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {weatherEffects.map((we) => (
              <div
                key={we.weather}
                className="rounded-xl p-4 border transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: we.color + "30",
                  backgroundColor: we.color + "08",
                }}
              >
                <div className="text-2xl mb-2">{we.weather.split(" ")[0]}</div>
                <div style={{ color: we.color }} className="font-semibold text-sm mb-2">
                  {we.weather.split(" ").slice(1).join(" ")}
                </div>
                <p className="text-[#7a6a4a] text-xs mb-2 leading-relaxed">{we.effect}</p>
                <div
                  className="text-xs px-2 py-1 rounded-full inline-block"
                  style={{ color: we.color, backgroundColor: we.color + "15" }}
                >
                  推荐: {we.class}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PVP Quick Strategy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0a0a15] rounded-xl p-6 border border-[#ff4757]/20">
            <h4 className="text-[#ff6b75] font-bold text-lg mb-4">⚔️ 进攻方策略</h4>
            <ul className="space-y-2 text-[#8a7a7a] text-sm">
              {[
                "优先击杀对方治疗职业",
                "利用地形进行包夹与穿插",
                "暴风雨天气优先选择法系爆发",
                "攻城战利用变形形态翻越城墙",
                "小队配合：控制→爆发→收割",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#ff4757] text-xs mt-1">▶</span> {tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#0a0a15] rounded-xl p-6 border border-[#2ed573]/20">
            <h4 className="text-[#2ed573] font-bold text-lg mb-4">🛡️ 防守方策略</h4>
            <ul className="space-y-2 text-[#7a8a7a] text-sm">
              {[
                "占据高地地形，限制敌方进攻路线",
                "保护治疗的生存是首要任务",
                "城池核心启动防御设施",
                "坦克在关键节点集中防守",
                "善用地图障碍物遮挡法系远程",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#2ed573] text-xs mt-1">▶</span> {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
