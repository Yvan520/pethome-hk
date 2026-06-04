import { useState, useEffect } from "react";

const navItems = [
  { label: "首页", href: "#hero" },
  { label: "最新资讯", href: "#news" },
  { label: "新手入门", href: "#beginner" },
  { label: "武器系统", href: "#weapons" },
  { label: "职业搭配", href: "#tierlist" },
  { label: "副本攻略", href: "#dungeons" },
  { label: "PVP指南", href: "#pvp" },
  { label: "变形系统", href: "#morph" },
  { label: "货币经济", href: "#economy" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a12]/95 backdrop-blur-xl border-b border-[#c9a227]/20 shadow-[0_4px_30px_rgba(201,162,39,0.1)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick("#hero")}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c9a227] to-[#8b6914] flex items-center justify-center shadow-[0_0_15px_rgba(201,162,39,0.4)]">
              <span className="text-xl">👑</span>
            </div>
            <div>
              <div className="font-cinzel text-[#c9a227] font-bold text-base leading-tight tracking-wider">
                王权与自由
              </div>
              <div className="text-[#8a7a5a] text-[10px] tracking-[0.2em] uppercase leading-tight">
                Throne & Liberty Guide
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer
                  ${
                    activeSection === item.href.replace("#", "")
                      ? "text-[#c9a227] bg-[#c9a227]/10"
                      : "text-[#a09070] hover:text-[#c9a227] hover:bg-[#c9a227]/5"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://store.steampowered.com/app/2429640/THRONE_AND_LIBERTY/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#8b6914] text-[#0a0a12] text-sm font-bold hover:opacity-90 transition-all duration-200 shadow-[0_0_15px_rgba(201,162,39,0.3)] hover:shadow-[0_0_25px_rgba(201,162,39,0.5)]"
            >
              Steam 开始游戏
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#c9a227] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" style={{ transform: menuOpen ? "rotate(45deg) translate(2px, 8px)" : "" }} />
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
            <div className="w-6 h-0.5 bg-current transition-all" style={{ transform: menuOpen ? "rotate(-45deg) translate(2px, -8px)" : "" }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0a0a12]/98 border-t border-[#c9a227]/20 px-4 py-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="block w-full text-left px-4 py-3 text-[#a09070] hover:text-[#c9a227] hover:bg-[#c9a227]/5 rounded-lg transition-all"
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://store.steampowered.com/app/2429640/THRONE_AND_LIBERTY/"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 px-4 py-3 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#8b6914] text-[#0a0a12] font-bold text-center"
          >
            Steam 开始游戏
          </a>
        </div>
      )}
    </nav>
  );
}
