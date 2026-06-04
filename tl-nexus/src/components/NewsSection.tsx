import { newsArticles } from "../data/gameData";

export default function NewsSection() {
  return (
    <section id="news" className="py-24 bg-[#0a0a12] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff4757]/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,71,87,0.04)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff4757]/30 bg-[#ff4757]/5 text-[#ff4757] text-sm mb-4">
            📰 最新资讯
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">
            游戏动态 · 版本更新
          </h2>
          <p className="text-[#7a6a4a] text-base max-w-2xl mx-auto">
            追踪 Throne and Liberty 最新版本更新、活动资讯和攻略动态。每篇文章都有独立页面，方便收藏和搜索。
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {newsArticles.map((article) => (
            <a
              key={article.id}
              href={`news/${article.id}.html`}
              className="group bg-gradient-to-br from-[#0f0f1c] to-[#08080f] rounded-2xl border border-[#2a2540] p-6 hover:border-[#ff4757]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,71,87,0.08)] block"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#ff4757] text-xs px-2 py-0.5 rounded-full bg-[#ff4757]/10 border border-[#ff4757]/20">
                  {article.tags[0]}
                </span>
                <span className="text-[#5a4a4a] text-xs">{article.date}</span>
              </div>
              <div className="text-2xl mb-3">{article.icon}</div>
              <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#ff4757] transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-[#7a6a4a] text-sm leading-relaxed line-clamp-3">
                {article.summary}
              </p>
              <div className="mt-4 text-[#ff4757] text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                阅读全文 →
              </div>
            </a>
          ))}
        </div>

        {/* SEO Note */}
        <div className="mt-10 text-center">
          <p className="text-[#4a3a3a] text-xs">
            每篇文章有独立的 HTML 页面，支持搜索引擎收录和直接分享链接。
          </p>
        </div>
      </div>
    </section>
  );
}
