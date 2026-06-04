import { fishingData } from "../data/gameData";

export default function FishingSection() {
  return (
    <section id="fishing" className="py-24 bg-[#060e12] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2ecc71]/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(46,204,113,0.06)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2ecc71]/30 bg-[#2ecc71]/5 text-[#2ecc71] text-sm mb-4">
            🎣 钓鱼系统
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">
            鱼竿 · 钓点 · 渔获
          </h2>
          <p className="text-[#7a6a4a] text-base max-w-2xl mx-auto">
            钓鱼系统是王权与自由中最独特的休闲玩法之一。通过钓鱼可获得稀有材料、Boss素材和幻象鱼。不同鱼竿等级影响可钓到的鱼类品质。
          </p>
        </div>

        {/* Fishing Rods */}
        <div className="mb-14">
          <h3 className="font-cinzel text-xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#2ecc71]/20 flex items-center justify-center text-lg">🎣</span>
            鱼竿大全
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fishingData.rods.map((rod) => (
              <div
                key={rod.name}
                className="bg-gradient-to-br from-[#0f1c14] to-[#080f0a] rounded-2xl border border-[#2ecc71]/15 p-5 hover:border-[#2ecc71]/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-[#2ecc71] font-bold text-sm mb-1">{rod.level}</div>
                <h4 className="text-white font-bold text-base mb-2">{rod.name}</h4>
                <div className="flex items-start gap-1.5">
                  <span className="text-[#5a7a6a] text-xs flex-shrink-0 mt-0.5">📦</span>
                  <span className="text-[#5a7a6a] text-xs leading-relaxed">{rod.source}</span>
                </div>
                {rod.desc && (
                  <p className="text-[#5a7a6a] text-xs mt-2 leading-relaxed">{rod.desc}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Fishing Tips */}
          <div className="bg-gradient-to-br from-[#0f1c14] to-[#080f0a] rounded-2xl border border-[#2ecc71]/20 p-6">
            <h3 className="font-cinzel text-lg font-bold text-white mb-5 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#2ecc71]/20 flex items-center justify-center text-lg">💡</span>
              钓鱼技巧
            </h3>
            <div className="space-y-3">
              {fishingData.tips.map((tip) => (
                <div key={tip} className="flex items-start gap-2.5">
                  <span className="text-[#2ecc71] text-xs mt-1 flex-shrink-0">▶</span>
                  <span className="text-[#6a9a7a] text-sm leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fishing Spots */}
          <div className="bg-gradient-to-br from-[#0f141c] to-[#080a0f] rounded-2xl border border-[#3498db]/20 p-6">
            <h3 className="font-cinzel text-lg font-bold text-white mb-5 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#3498db]/20 flex items-center justify-center text-lg">📍</span>
              推荐钓点
            </h3>
            <div className="space-y-3">
              {fishingData.spots.map((spot) => (
                <div key={spot.name} className="flex items-start gap-2.5">
                  <span className="text-[#3498db] text-xs mt-1 flex-shrink-0">●</span>
                  <div>
                    <span className="text-white text-sm font-medium">{spot.name}</span>
                    <span className="text-[#6a7a9a] text-sm ml-1">— {spot.desc}</span>
                    {spot.condition && (
                      <div className="text-[#f39c12] text-xs mt-0.5">⚠ {spot.condition}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
