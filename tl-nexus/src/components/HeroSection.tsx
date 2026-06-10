import { useEffect, useState } from "react";

const stats = [
  { value: "452万+", label: "国际服独立用户" },
  { value: "1.33亿", label: "总游戏时长（小时）" },
  { value: "9种", label: "武器类型" },
  { value: "36种", label: "职业搭配组合" },
];

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 8,
    }))
  );

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a12]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0b1a]/80 via-[#0a0a12] to-[#050510]" />
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #c9a227 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, #ff4757 0%, transparent 50%),
                           radial-gradient(circle at 50% 80%, #3498db 0%, transparent 50%)`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a12]" />

      {/* Animated Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#c9a227] opacity-0"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `float ${p.duration}s ${p.delay}s infinite ease-in-out`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a227]/40 bg-[#c9a227]/10 text-[#c9a227] text-sm mb-8 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#2ecc71] animate-pulse" />
          最新更新 · 2024年国际服版本攻略
        </div>

        {/* Title */}
        <h1
          className={`font-cinzel font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 transition-all duration-1000 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-white">王权</span>
          <span className="text-[#c9a227]"> & </span>
          <span className="text-white">自由</span>
        </h1>

        <div
          className={`font-cinzel text-[#c9a227]/80 text-lg sm:text-xl md:text-2xl tracking-[0.3em] uppercase mb-6 transition-all duration-1000 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Throne and Liberty · 全攻略指南站
        </div>

        {/* Description */}
        <p
          className={`text-[#a09070] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-400 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          为每一位踏入索利西姆世界的勇者而生。从新手入门到终局攻略，
          从武器搭配到PVP战略，这里是你最全面的王权与自由知识库。
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={() => {
              document.getElementById("beginner")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#c9a227] to-[#8b6914] text-[#0a0a12] font-bold text-base hover:opacity-90 transition-all duration-200 shadow-[0_0_30px_rgba(201,162,39,0.4)] hover:shadow-[0_0_50px_rgba(201,162,39,0.6)] hover:scale-105"
          >
            🗡️ 新手开始入门
          </button>
          <button
            onClick={() => {
              document.getElementById("weapons")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 rounded-xl border border-[#c9a227]/50 text-[#c9a227] font-bold text-base hover:bg-[#c9a227]/10 transition-all duration-200 hover:scale-105 backdrop-blur-sm"
          >
            ⚔️ 武器搭配指南
          </button>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#0a0a12]/60 backdrop-blur-sm border border-[#c9a227]/20 rounded-xl p-4 hover:border-[#c9a227]/50 transition-all duration-300"
            >
              <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#c9a227] mb-1">
                {stat.value}
              </div>
              <div className="text-[#7a6a4a] text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#5a4a2a] animate-bounce">
        <span className="text-xs tracking-widest uppercase">向下探索</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2L8 20M8 20L2 14M8 20L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { opacity: 0; transform: translateY(0px); }
          25% { opacity: 0.4; }
          50% { opacity: 0.6; transform: translateY(-30px); }
          75% { opacity: 0.2; }
        }
      `}</style>
    </section>
  );
}
