import { beginnerGuide } from "../data/gameData";

export default function BeginnerSection() {
  return (
    <section id="beginner" className="py-24 bg-[#0a0a12] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,39,0.05)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a227]/30 bg-[#c9a227]/5 text-[#c9a227] text-sm mb-4">
            📜 新手指引
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">
            踏入索利西姆的第一步
          </h2>
          <p className="text-[#7a6a4a] text-base max-w-xl mx-auto">
            无论你是从未玩过MMO的新手，还是经验丰富的老玩家，这份入门指南将帮助你快速融入王权与自由的世界。
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beginnerGuide.map((guide, index) => (
            <div
              key={guide.step}
              className="group relative bg-gradient-to-br from-[#0f0f1c] to-[#08080f] border border-[#2a2230] rounded-2xl p-6 hover:border-[#c9a227]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,162,39,0.1)] hover:-translate-y-1"
            >
              {/* Step number */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/30 flex items-center justify-center">
                <span className="text-[#c9a227] text-sm font-bold">{String(guide.step).padStart(2, '0')}</span>
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#c9a227]/20 to-[#8b6914]/10 border border-[#c9a227]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">{guide.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-white font-bold text-lg mb-2">{guide.title}</h3>
              <p className="text-[#7a6a4a] text-sm leading-relaxed">{guide.desc}</p>

              {/* Connecting line for desktop */}
              {index < beginnerGuide.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#c9a227]/30 to-transparent z-10" />
              )}
            </div>
          ))}
        </div>

        {/* Quick Tips Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#1a150a] via-[#1f1a0a] to-[#1a150a] border border-[#c9a227]/20 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#c9a227]/15 border border-[#c9a227]/30 flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
            <div className="flex-1">
              <h3 className="text-[#c9a227] font-bold text-lg mb-1">老玩家速成提示</h3>
              <p className="text-[#8a7555] text-sm leading-relaxed">
                已有MMO经验？直接选择大剑+匕首组合，跟着主线快速升级，10级后开启委托系统。
                50级后每天仅需1-2小时完成日常。变形系统和天气联动是本游戏最独特的机制，务必提前了解。
              </p>
            </div>
            <button
              onClick={() => document.getElementById("morph")?.scrollIntoView({ behavior: "smooth" })}
              className="flex-shrink-0 px-5 py-2.5 rounded-xl border border-[#c9a227]/40 text-[#c9a227] text-sm font-medium hover:bg-[#c9a227]/10 transition-all duration-200"
            >
              查看变形系统 →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
