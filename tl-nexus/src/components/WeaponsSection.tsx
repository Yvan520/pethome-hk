import { useState } from "react";
import { weapons } from "../data/gameData";

const difficultyLabels = ["", "简单", "较易", "普通", "较难", "困难"];
const tierColors: Record<string, string> = {
  S: "text-[#ff4757] bg-[#ff4757]/15 border-[#ff4757]/40",
  A: "text-[#ffa502] bg-[#ffa502]/15 border-[#ffa502]/40",
  B: "text-[#2ed573] bg-[#2ed573]/15 border-[#2ed573]/40",
  C: "text-[#70a1ff] bg-[#70a1ff]/15 border-[#70a1ff]/40",
};

export default function WeaponsSection() {
  const [selected, setSelected] = useState(weapons[0]);
  const [filter, setFilter] = useState("全部");
  const [search, setSearch] = useState("");

  const roles = ["全部", "DPS", "坦克", "治疗", "辅助", "远程DPS"];
  const filtered = weapons.filter((w) => {
    const matchRole = filter === "全部" ? true : w.role.includes(filter);
    const matchSearch = !search || w.name.includes(search) || w.nameEn.toLowerCase().includes(search.toLowerCase()) || w.skills.some((s) => s.includes(search));
    return matchRole && matchSearch;
  });

  return (
    <section id="weapons" className="py-24 bg-[#06060e] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(201,162,39,0.04)_0%,transparent_60%)]" />

      {/* Banner Image */}
      <div className="relative h-48 sm:h-64 mb-16 overflow-hidden">
        <img
          src="/images/weapons-banner.jpg"
          alt="武器系统"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06060e]/50 via-transparent to-[#06060e]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a227]/40 bg-[#06060e]/60 text-[#c9a227] text-sm mb-3 backdrop-blur-sm">
              ⚔️ 武器系统
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              九大武器 · 无限组合
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Role Filter + Search */}
        <div className="flex flex-wrap items-center gap-3 mb-8 justify-center">
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setFilter(role)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  filter === role
                    ? "bg-[#c9a227] border-[#c9a227] text-[#0a0a12]"
                    : "border-[#2a2230] text-[#7a6a4a] hover:border-[#c9a227]/50 hover:text-[#c9a227]"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="搜索武器名称/技能..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-44 sm:w-56 px-3 py-1.5 rounded-full text-sm bg-[#0a0a15] border border-[#2a2230] text-[#c0b090] placeholder-[#5a4a3a] focus:outline-none focus:border-[#c9a227]/50 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5a4a3a] hover:text-[#c9a227] text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Weapon List */}
          <div className="xl:col-span-1 space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-[#5a4a3a] text-sm">没有匹配的武器</div>
            ) : filtered.map((weapon) => (
              <button
                key={weapon.id}
                onClick={() => setSelected(weapon)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  selected.id === weapon.id
                    ? "border-[#c9a227]/60 bg-[#c9a227]/10 shadow-[0_0_20px_rgba(201,162,39,0.15)]"
                    : "border-[#1a1525] bg-[#0a0a15] hover:border-[#2a2235] hover:bg-[#0f0f1c]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: weapon.color + "20", border: `1px solid ${weapon.color}40` }}
                  >
                    {weapon.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white font-semibold text-sm truncate">{weapon.name}</span>
                      <div className="flex gap-1 flex-shrink-0">
                        <span className={`text-xs px-1.5 py-0.5 rounded border font-bold ${tierColors[weapon.tierPvE]}`}>
                          PVE {weapon.tierPvE}
                        </span>
                        <span className={`text-xs px-1.5 py-0.5 rounded border font-bold ${tierColors[weapon.tierPvP]}`}>
                          PVP {weapon.tierPvP}
                        </span>
                      </div>
                    </div>
                    <div className="text-[#7a6a4a] text-xs mt-0.5">{weapon.role}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Weapon Detail */}
          <div className="xl:col-span-2">
            <div
              className="rounded-2xl border p-6 sm:p-8 h-full transition-all duration-300"
              style={{
                borderColor: selected.color + "40",
                background: `linear-gradient(135deg, ${selected.color}08 0%, #0a0a15 60%)`,
                boxShadow: `0 0 40px ${selected.color}10`,
              }}
            >
              {/* Header */}
              <div className="flex flex-wrap items-start gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ backgroundColor: selected.color + "20", border: `2px solid ${selected.color}50` }}
                >
                  {selected.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-cinzel font-bold text-2xl sm:text-3xl">
                    {selected.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-[#7a6a4a] text-sm">{selected.nameEn}</span>
                    <span className="text-[#3a3240]">·</span>
                    <span style={{ color: selected.color }} className="text-sm font-medium">
                      {selected.role}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className={`px-3 py-1.5 rounded-lg border font-bold ${tierColors[selected.tierPvE]}`}>
                    PVE: {selected.tierPvE}
                  </div>
                  <div className={`px-3 py-1.5 rounded-lg border font-bold ${tierColors[selected.tierPvP]}`}>
                    PVP: {selected.tierPvP}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#9a8a6a] text-base leading-relaxed mb-6 border-l-2 pl-4" style={{ borderColor: selected.color }}>
                {selected.description}
              </p>

              {/* Skills */}
              {selected.skills && selected.skills.length > 0 && (
                <div className="mb-6">
                  <div className="text-[#7a6a4a] text-sm mb-3">⚡ 核心技能</div>
                  <div className="flex flex-wrap gap-2">
                    {selected.skills.map((s: string) => (
                      <span key={s} className="px-3 py-1.5 rounded-lg text-sm font-medium" style={{ backgroundColor: selected.color + "15", border: `1px solid ${selected.color}30`, color: selected.color }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Difficulty */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#7a6a4a] text-sm">上手难度</span>
                  <span className="text-[#9a8a6a] text-sm">{difficultyLabels[selected.difficulty]}</span>
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((d) => (
                    <div
                      key={d}
                      className="h-2 flex-1 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: d <= selected.difficulty ? selected.color : selected.color + "20",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Strengths */}
                <div className="bg-[#0a0f0a]/50 rounded-xl p-4 border border-[#2ed573]/20">
                  <div className="text-[#2ed573] text-sm font-semibold mb-3 flex items-center gap-2">
                    <span>✅</span> 优势
                  </div>
                  <ul className="space-y-1.5">
                    {selected.strengths.map((s) => (
                      <li key={s} className="text-[#8a9a7a] text-sm flex items-start gap-2">
                        <span className="text-[#2ed573] mt-0.5 text-xs">▶</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-[#0f0a0a]/50 rounded-xl p-4 border border-[#ff4757]/20">
                  <div className="text-[#ff6b75] text-sm font-semibold mb-3 flex items-center gap-2">
                    <span>⚠️</span> 劣势
                  </div>
                  <ul className="space-y-1.5">
                    {selected.weaknesses.map((w) => (
                      <li key={w} className="text-[#9a7a7a] text-sm flex items-start gap-2">
                        <span className="text-[#ff4757] mt-0.5 text-xs">▶</span> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Rotation */}
              {selected.rotation && (
                <div className="mb-5 bg-[#0a0a15]/60 rounded-xl p-4 border border-[#c9a227]/15">
                  <div className="text-[#c9a227] text-sm font-semibold mb-2 flex items-center gap-2">
                    <span>🔄</span> 技能连招循环
                  </div>
                  <p className="text-[#9a8a6a] text-sm leading-relaxed">{selected.rotation}</p>
                </div>
              )}

              {/* Best Combos */}
              <div>
                <div className="text-[#7a6a4a] text-sm mb-3">🔗 推荐搭配副武器</div>
                <div className="flex flex-wrap gap-2">
                  {selected.bestCombo.map((combo) => (
                    <span
                      key={combo}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: selected.color + "15",
                        border: `1px solid ${selected.color}30`,
                        color: selected.color,
                      }}
                    >
                      {combo}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
