import { morphTypes } from "../data/gameData";

export default function MorphSection() {
  return (
    <section id="morph" className="py-24 bg-[#06060e] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9b59b6]/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(155,89,182,0.06)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#9b59b6]/30 bg-[#9b59b6]/5 text-[#b07fd4] text-sm mb-4">
            🦅 变形系统
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">
            变形形态 · 突破维度
          </h2>
          <p className="text-[#7a6a4a] text-base max-w-2xl mx-auto">
            王权与自由最独特的玩法之一 —— 变形系统让玩家可以暂时变身为动物形态。
            与天气系统深度联动，飞行、冲刺、游泳、攻城，突破传统MMO的移动边界。
          </p>
        </div>

        {/* Morph Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {morphTypes.map((morph) => (
            <div
              key={morph.name}
              className="group bg-gradient-to-br from-[#0f0f1c] to-[#08080f] rounded-2xl border border-[#2a2540] p-6 text-center hover:border-[#9b59b6]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(155,89,182,0.1)] hover:-translate-y-1"
            >
              <div className="w-20 h-20 rounded-full bg-[#9b59b6]/10 border-2 border-[#9b59b6]/20 flex items-center justify-center text-4xl mx-auto mb-4 group-hover:scale-110 group-hover:border-[#9b59b6]/50 transition-all duration-300">
                {morph.icon}
              </div>
              <h3 className="text-white font-bold text-base mb-1">{morph.name}</h3>
              <span className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-[#9b59b6]/15 border border-[#9b59b6]/30 text-[#b07fd4] mb-3">
                {morph.type}
              </span>
              <p className="text-[#7a6a4a] text-sm leading-relaxed">{morph.effect}</p>
            </div>
          ))}
        </div>

        {/* How to Unlock Morphs */}
        <div className="bg-gradient-to-br from-[#0f0b1f] to-[#080812] rounded-2xl border border-[#9b59b6]/25 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#9b59b6]/20 flex items-center justify-center text-lg">🔓</span>
                如何解锁变形形态
              </h3>
              <div className="space-y-3">
                {[
                  { step: "01", text: "完成特定主线任务后，技能树中解锁变形技能" },
                  { step: "02", text: "雨天环境触发飞鸟变形，可在空中自由滑翔" },
                  { step: "03", text: "水边或水中区域触发鱼类变形，快速探索水下地图" },
                  { step: "04", text: "攻城战特殊状态下解锁攻城高仑变形" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="font-cinzel text-[#9b59b6] font-bold text-sm flex-shrink-0 w-6">{item.step}</span>
                    <span className="text-[#8a7a9a] text-sm leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-cinzel text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#9b59b6]/20 flex items-center justify-center text-lg">⚡</span>
                变形系统战术应用
              </h3>
              <div className="space-y-3">
                {[
                  { icon: "🦅", text: "利用飞鸟形态从高处俯冲，出其不意发动攻击" },
                  { icon: "🐺", text: "狼形态的高速冲刺可以快速穿越战场，支援友军" },
                  { icon: "🐟", text: "探索水下地图发现隐藏资源点和捷径路线" },
                  { icon: "🗿", text: "攻城高仑可将队友投入城墙内，实现奇袭突破" },
                ].map((item) => (
                  <div key={item.icon} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <span className="text-[#8a7a9a] text-sm leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
