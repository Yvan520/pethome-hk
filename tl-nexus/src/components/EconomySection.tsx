import { currencies } from "../data/gameData";

const gearSources = [
  { source: "野外掉落", tradeable: "可交易", icon: "🌿", color: "#2ed573", desc: "野外BOSS与普通怪物掉落，品质较低但可拍卖行交易" },
  { source: "副本奖励", tradeable: "可交易", icon: "🏛️", color: "#70a1ff", desc: "副本通关奖励，品质稳定，可通过拍卖行出售" },
  { source: "制作大成功", tradeable: "可交易", icon: "⚒️", color: "#ffa502", desc: "制作时触发大成功概率获得，品质最高且可交易" },
  { source: "世界Boss掉落", tradeable: "可交易", icon: "👑", color: "#c9a227", desc: "世界BOSS掉落高品质装备，是获取顶级装备的重要途径" },
  { source: "普通制作", tradeable: "绑定", icon: "🔨", color: "#ff6b35", desc: "普通制作获得的装备绑定角色，无法交易但品质优良" },
];

export default function EconomySection() {
  return (
    <section id="economy" className="py-24 bg-[#0a0a12] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,162,39,0.04)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a227]/30 bg-[#c9a227]/5 text-[#c9a227] text-sm mb-4">
            💰 经济系统
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">
            货币 · 装备 · 经济生态
          </h2>
          <p className="text-[#7a6a4a] text-base max-w-xl mx-auto">
            了解王权与自由的经济体系，合理规划资源获取路线，让你的角色持续稳定成长。
          </p>
        </div>

        {/* Currency Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {currencies.map((currency) => (
            <div
              key={currency.name}
              className="group bg-gradient-to-br from-[#0f0f1c] to-[#08080f] rounded-2xl border p-6 hover:-translate-y-1 transition-all duration-300"
              style={{ borderColor: currency.color + "30" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: currency.color + "15", border: `1px solid ${currency.color}30` }}
                >
                  {currency.icon}
                </div>
                <h3 className="text-white font-bold text-lg">{currency.name}</h3>
              </div>
              <p className="text-[#7a6a4a] text-sm leading-relaxed mb-4">{currency.desc}</p>
              <div
                className="rounded-lg p-3 text-xs"
                style={{ backgroundColor: currency.color + "08", borderLeft: `3px solid ${currency.color}` }}
              >
                <span style={{ color: currency.color }} className="font-semibold">获取方式：</span>
                <span className="text-[#7a6a4a] ml-1">{currency.obtain}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gear Sources Table */}
        <div className="bg-[#0a0a15] rounded-2xl border border-[#1a1525] overflow-hidden mb-10">
          <div className="px-6 py-4 border-b border-[#1a1525] flex items-center gap-3">
            <span className="text-xl">🎯</span>
            <h3 className="text-white font-bold text-lg">装备获取途径与交易限制</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0f0f1c]">
                  <th className="text-left px-6 py-3 text-[#7a6a4a] text-sm font-medium">获取来源</th>
                  <th className="text-left px-6 py-3 text-[#7a6a4a] text-sm font-medium">交易状态</th>
                  <th className="text-left px-6 py-3 text-[#7a6a4a] text-sm font-medium">详细说明</th>
                </tr>
              </thead>
              <tbody>
                {gearSources.map((source) => (
                  <tr
                    key={source.source}
                    className="border-t border-[#1a1525] hover:bg-[#0f0f1c]/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{source.icon}</span>
                        <span className="text-white font-medium text-sm">{source.source}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{
                          color: source.color,
                          backgroundColor: source.color + "15",
                        }}
                      >
                        {source.tradeable}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#7a6a4a] text-sm">{source.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Farming Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#0a0f0a] rounded-2xl border border-[#2ed573]/20 p-6">
            <h4 className="text-[#2ed573] font-bold text-lg mb-4 flex items-center gap-2">
              <span>📈</span> 高效搬砖策略
            </h4>
            <ul className="space-y-2 text-[#7a8a7a] text-sm">
              {[
                "多角色轮流完成委托任务，6-8个角色最优",
                "50级后每天日常+副本仅需1-2小时/角色",
                "固定队打副本效率最高，收益最稳定",
                "关注拍卖行价格，在价格高峰期出售物品",
                "先行服与公测服经济环境有所不同，注意区分",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="text-[#2ed573] text-xs mt-1 flex-shrink-0">◆</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#0a0a15] rounded-2xl border border-[#c9a227]/20 p-6">
            <h4 className="text-[#c9a227] font-bold text-lg mb-4 flex items-center gap-2">
              <span>💡</span> Lucent 交易须知
            </h4>
            <ul className="space-y-2 text-[#8a7a5a] text-sm">
              {[
                "充值后的Lucent有3天冷却期，不能立即交易",
                "拍卖行交易抽取22%手续费，出售时需计算利润",
                "高端装备是最稳定的Lucent来源之一",
                "狗粮（强化材料）和图纸交易量大，利润稳定",
                "避免在游戏开服初期低价抛售，等待市场稳定",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="text-[#c9a227] text-xs mt-1 flex-shrink-0">◆</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
