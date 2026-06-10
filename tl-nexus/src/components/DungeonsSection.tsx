import { useState } from "react";
import { dungeons } from "../data/gameData";

const difficultyColors: Record<string, string> = {
  普通: "#2ed573",
  困难: "#ffa502",
  地狱: "#ff4757",
  个人挑战: "#70a1ff",
  终局: "#c9a227",
};

export default function DungeonsSection() {
  const [selected, setSelected] = useState(dungeons[0]);
  const [search, setSearch] = useState("");

  const filtered = dungeons.filter((d) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return d.name.includes(q) || d.boss.includes(q) || d.type.includes(q) || d.tips.includes(q);
  });

  return (
    <section id="dungeons" className="py-24 bg-[#06060e] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />

      {/* Banner */}
      <div className="relative h-48 sm:h-64 mb-16 overflow-hidden bg-gradient-to-r from-[#0a0510] via-[#0a1a0a] to-[#06060e]">
        <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage: 'repeating-linear-gradient(45deg, #3498db 0px, #3498db 1px, transparent 1px, transparent 30px)'}} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06060e]/60 via-transparent to-[#06060e]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a227]/40 bg-[#06060e]/60 text-[#c9a227] text-sm mb-3 backdrop-blur-sm">
              🗺️ 副本攻略
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              副本全攻略
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Dungeon List */}
          <div className="lg:col-span-2 space-y-3">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="搜索副本/Boss..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-sm bg-[#0a0a15] border border-[#1a1525] text-[#c0b090] placeholder-[#5a4a3a] focus:outline-none focus:border-[#c9a227]/50 transition-colors"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a4a3a] hover:text-[#c9a227] text-xs">✕</button>
              )}
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-[#5a4a3a] text-sm">没有匹配的副本</div>
            ) : filtered.map((dungeon) => (
              <button
                key={dungeon.id}
                onClick={() => setSelected(dungeon)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  selected.id === dungeon.id
                    ? "border-[#c9a227]/50 bg-[#c9a227]/8 shadow-[0_0_20px_rgba(201,162,39,0.1)]"
                    : "border-[#1a1525] bg-[#0a0a15] hover:border-[#2a2235]"
                }`}
                style={
                  selected.id === dungeon.id
                    ? { borderColor: dungeon.color + "50", backgroundColor: dungeon.color + "08" }
                    : {}
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: dungeon.color + "20", border: `1px solid ${dungeon.color}40` }}
                  >
                    {dungeon.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-white font-semibold text-sm">{dungeon.name}</span>
                      <span
                        className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          color: difficultyColors[dungeon.difficulty],
                          backgroundColor: difficultyColors[dungeon.difficulty] + "15",
                        }}
                      >
                        {dungeon.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[#5a4a2a] text-xs">{dungeon.type}</span>
                      <span className="text-[#3a3240]">·</span>
                      <span className="text-[#5a4a2a] text-xs">{dungeon.players}</span>
                      <span className="text-[#3a3240]">·</span>
                      <span className="text-[#5a4a2a] text-xs">{dungeon.level}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Dungeon Detail */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl border p-6 sm:p-8 h-full transition-all duration-300"
              style={{
                borderColor: selected.color + "40",
                background: `linear-gradient(135deg, ${selected.color}08 0%, #06060e 60%)`,
                boxShadow: `0 0 40px ${selected.color}10`,
              }}
            >
              {/* Header */}
              <div className="flex flex-wrap items-start gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ backgroundColor: selected.color + "20", border: `2px solid ${selected.color}50` }}
                >
                  {selected.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-cinzel font-bold text-xl sm:text-2xl mb-1">
                    {selected.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="text-sm font-medium px-2 py-0.5 rounded"
                      style={{
                        color: difficultyColors[selected.difficulty],
                        backgroundColor: difficultyColors[selected.difficulty] + "20",
                      }}
                    >
                      {selected.difficulty}
                    </span>
                    <span className="text-[#5a4a2a] text-sm">{selected.type}</span>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {[
                  { label: "参与人数", value: selected.players, icon: "👥" },
                  { label: "推荐等级", value: selected.level, icon: "⚡" },
                  { label: "最终Boss", value: selected.boss, icon: "💀" },
                ].map((info) => (
                  <div key={info.label} className="bg-[#0a0a12]/60 rounded-xl p-3 border border-[#1a1520]">
                    <div className="text-[#5a4a2a] text-xs mb-1">
                      {info.icon} {info.label}
                    </div>
                    <div className="text-white font-semibold text-sm">{info.value}</div>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="mb-6">
                <div className="text-[#c9a227] text-sm font-semibold mb-3 flex items-center gap-2">
                  <span>💡</span> 攻略要点
                </div>
                <div
                  className="bg-[#0a0a12]/60 rounded-xl p-4 border text-[#9a8a6a] text-sm leading-relaxed"
                  style={{ borderColor: selected.color + "20" }}
                >
                  {selected.tips}
                </div>
              </div>

              {/* Rewards */}
              <div>
                <div className="text-[#c9a227] text-sm font-semibold mb-3 flex items-center gap-2">
                  <span>🎁</span> 主要奖励
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.rewards.map((reward) => (
                    <span
                      key={reward}
                      className="px-3 py-1.5 rounded-lg text-sm"
                      style={{
                        color: selected.color,
                        backgroundColor: selected.color + "15",
                        border: `1px solid ${selected.color}30`,
                      }}
                    >
                      {reward}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dungeon Tips Footer */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0a0f0a] rounded-xl p-5 border border-[#2ed573]/20">
            <h4 className="text-[#2ed573] font-semibold mb-2">🗡️ 副本通用技巧</h4>
            <ul className="space-y-1.5 text-[#7a8a6a] text-sm">
              <li>▶ 进入副本前检查药水和补给是否充足</li>
              <li>▶ 坦克提前学习Boss技能，避免全团减员</li>
              <li>▶ 固定队伍比随机队效率高出50%+</li>
            </ul>
          </div>
          <div className="bg-[#0f0a0a] rounded-xl p-5 border border-[#c9a227]/20">
            <h4 className="text-[#c9a227] font-semibold mb-2">⏰ 刷新时间安排</h4>
            <ul className="space-y-1.5 text-[#8a7a4a] text-sm">
              <li>▶ 世界Boss刷新时间在服务器公告中查询</li>
              <li>▶ 日常副本每天重置，周本每周一重置</li>
              <li>▶ 大君主Archboss是全服竞争性内容，提前集合</li>
            </ul>
          </div>
        </div>

        {/* Screenshot Gallery */}
        <div className="mt-16">
          <h3 className="font-cinzel text-2xl text-center text-white mb-8">游戏截图</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { gradient: "from-[#1a0a2a] to-[#0a0515]", icon: "🌍", label: "探索索利西姆" },
              { gradient: "from-[#0a1a0a] to-[#051005]", icon: "⚔️", label: "副本战斗" },
              { gradient: "from-[#1a0505] to-[#0a0505]", icon: "🏴", label: "PVP战场" },
              { gradient: "from-[#0a0a1a] to-[#050510]", icon: "🗡️", label: "武器系统" },
            ].map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl border border-[#c9a227]/20 hover:border-[#c9a227]/50 transition-all duration-300">
                <div className={`w-full h-48 bg-gradient-to-br ${item.gradient} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                  <span className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">{item.icon}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
