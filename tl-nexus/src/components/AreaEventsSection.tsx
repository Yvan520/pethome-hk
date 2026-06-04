import { areaEvents } from "../data/gameData";

export default function AreaEventsSection() {
  return (
    <section id="events" className="py-24 bg-[#0a0a12] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e67e22]/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(230,126,34,0.04)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e67e22]/30 bg-[#e67e22]/5 text-[#e67e22] text-sm mb-4">
            🗓️ 区域活动
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">
            地区事件 · 时间表
          </h2>
          <p className="text-[#7a6a4a] text-base max-w-2xl mx-auto">
            地区活动每天8个时段(TL时间02/05/08/11/14/17/20/23)，整点开放6个活动。利用好地区贡献证获取高额奖励。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Schedule */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#1c140f] to-[#0f0a08] rounded-2xl border border-[#e67e22]/20 p-6">
            <h3 className="font-cinzel text-lg font-bold text-white mb-5 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#e67e22]/20 flex items-center justify-center text-lg">🕐</span>
              活动时段 & 类型
            </h3>
            <p className="text-[#8a7a5a] text-sm mb-5 leading-relaxed">{areaEvents.schedule}</p>

            <h4 className="text-white font-semibold text-sm mb-3">推荐参加的活动</h4>
            <div className="space-y-3">
              {areaEvents.recommended.map((ev) => (
                <div key={ev.name} className="flex items-center gap-3 bg-[#e67e22]/5 rounded-xl p-3 border border-[#e67e22]/10">
                  <span className="text-[#e67e22] text-lg flex-shrink-0">★</span>
                  <div>
                    <span className="text-white font-medium text-sm">{ev.name}</span>
                    <span className="text-[#8a7a5a] text-sm ml-2">— {ev.reason}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-[#1c0f0f] to-[#0f0808] rounded-2xl border border-[#e67e22]/15 p-6">
            <h3 className="font-cinzel text-lg font-bold text-white mb-5 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#e67e22]/20 flex items-center justify-center text-lg">⚡</span>
              注意事项
            </h3>
            <div className="space-y-3">
              {areaEvents.tips.map((tip) => (
                <div key={tip} className="flex items-start gap-2.5">
                  <span className="text-[#e67e22] text-xs mt-1 flex-shrink-0">!</span>
                  <span className="text-[#9a7a6a] text-sm leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
