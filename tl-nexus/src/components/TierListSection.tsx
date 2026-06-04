import { tierList } from "../data/gameData";

export default function TierListSection() {
  return (
    <section id="tierlist" className="py-24 bg-[#0a0a12] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(201,162,39,0.04)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a227]/30 bg-[#c9a227]/5 text-[#c9a227] text-sm mb-4">
            🏆 职业强度评级
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">
            武器组合 · Tier List
          </h2>
          <p className="text-[#7a6a4a] text-base max-w-xl mx-auto">
            基于国际服实际数据分析，综合PVE效能与PVP胜率，为你提供当前版本最权威的武器搭配强度排名。
          </p>
        </div>

        {/* Tier List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {tierList.map((tier) => (
            <div
              key={tier.tier}
              className="flex gap-4 rounded-2xl overflow-hidden border"
              style={{
                borderColor: tier.color + "30",
                backgroundColor: tier.bgColor,
              }}
            >
              {/* Tier Badge */}
              <div
                className="flex-shrink-0 w-16 sm:w-20 flex items-center justify-center font-cinzel font-black text-3xl sm:text-5xl"
                style={{ color: tier.color }}
              >
                {tier.tier}
              </div>

              {/* Combos */}
              <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {tier.combos.map((combo) => (
                  <div
                    key={combo.name}
                    className="bg-[#0a0a12]/60 rounded-xl p-3 border hover:border-current transition-all duration-200"
                    style={{ borderColor: tier.color + "20" }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-white font-semibold text-sm leading-tight">{combo.name}</span>
                      <span
                        className="flex-shrink-0 text-xs px-1.5 py-0.5 rounded font-medium"
                        style={{ color: tier.color, backgroundColor: tier.color + "15" }}
                      >
                        {combo.role}
                      </span>
                    </div>
                    <p className="text-[#7a6a4a] text-xs leading-relaxed">{combo.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-[#5a4a2a] text-xs">
            * Tier List 基于 2024年国际服正式版数据，游戏版本更新后排名可能有所变动。
          </p>
        </div>

        {/* Meta Analysis */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "🏆 当前版本最强",
              content: "大剑+匕首 在小规模PVP中几乎无敌，爆发高且控制强。新赛季首选。",
              accent: "#ff4757",
            },
            {
              title: "🌟 最适合新手",
              content: "长弓作为主武器搭配十字弓，操作简单，伤害稳定，新手轻松上手。",
              accent: "#ffa502",
            },
            {
              title: "💎 最高天花板",
              content: "法杖+匕首需要较深的游戏理解，但上限极高，顶尖玩家的首选。",
              accent: "#9b59b6",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-[#0a0a15] rounded-xl p-5 border hover:-translate-y-1 transition-all duration-300"
              style={{ borderColor: card.accent + "30" }}
            >
              <h4 className="font-semibold mb-2" style={{ color: card.accent }}>
                {card.title}
              </h4>
              <p className="text-[#7a6a4a] text-sm leading-relaxed">{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
