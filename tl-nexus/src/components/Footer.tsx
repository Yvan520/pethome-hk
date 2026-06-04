export default function Footer() {
  const navSections = [
    {
      title: "游戏指南",
      links: [
        { label: "新手入门", href: "#beginner" },
        { label: "武器系统", href: "#weapons" },
        { label: "职业搭配", href: "#tierlist" },
        { label: "副本攻略", href: "#dungeons" },
      ],
    },
    {
      title: "深度内容",
      links: [
        { label: "PVP指南", href: "#pvp" },
        { label: "变形系统", href: "#morph" },
        { label: "货币经济", href: "#economy" },
        { label: "搬砖攻略", href: "#economy" },
      ],
    },
    {
      title: "官方资源",
      links: [
        { label: "Steam 页面", href: "https://store.steampowered.com/app/2429640/THRONE_AND_LIBERTY/" },
        { label: "官方网站", href: "https://playthroneandliberty.com/" },
        { label: "Reddit 社区", href: "https://www.reddit.com/r/throneandliberty/" },
        { label: "巴哈姆特论坛", href: "https://forum.gamer.com.tw/B.php?bsn=33317" },
      ],
    },
    {
      title: "攻略参考",
      links: [
        { label: "Questlog.gg 配装站", href: "https://questlog.gg/throne-and-liberty" },
        { label: "Metabattle 配装站", href: "https://metabattle.com/wiki/Throne_and_Liberty" },
        { label: "TL 百科 & 互动地图", href: "https://tl.codex.gg/" },
        { label: "巴哈姆特论坛", href: "https://forum.gamer.com.tw/B.php?bsn=33317" },
      ],
    },
  ];

  const handleScroll = (href: string) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank");
      return;
    }
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#04040a] border-t border-[#1a1520] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c9a227] to-[#8b6914] flex items-center justify-center shadow-[0_0_15px_rgba(201,162,39,0.3)]">
                <span className="text-xl">👑</span>
              </div>
              <div>
                <div className="font-cinzel text-[#c9a227] font-bold text-base leading-tight">王权与自由</div>
                <div className="text-[#5a4a2a] text-[10px] tracking-[0.2em] uppercase">攻略指南站</div>
              </div>
            </div>
            <p className="text-[#5a4a2a] text-sm leading-relaxed mb-4">
              最全面的 Throne and Liberty 攻略站，为每一位踏入索利西姆世界的勇者提供专业指南。
            </p>
            <div className="flex items-center gap-1 text-xs text-[#4a3a1a]">
              <span className="w-2 h-2 rounded-full bg-[#2ecc71] animate-pulse" />
              <span>国际服正式版 · 实时更新</span>
            </div>
          </div>

          {/* Nav Sections */}
          {navSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-[#c9a227] font-semibold text-sm mb-4 tracking-wider uppercase">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleScroll(link.href)}
                      className="text-[#5a4a2a] text-sm hover:text-[#c9a227] transition-colors duration-200 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1a1520] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#3a2a1a] text-xs text-center sm:text-left">
            © 2024 王权与自由攻略站 · Throne and Liberty Fan Guide Site · 非官方第三方内容
          </p>
          <div className="flex items-center gap-4 text-xs text-[#3a2a1a]">
            <span>所有游戏内容版权归 NCsoft & Amazon Games 所有</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
