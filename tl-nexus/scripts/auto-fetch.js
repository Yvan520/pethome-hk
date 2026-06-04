import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SOURCES = [
  { name: "Official RSS", url: "https://www.playthroneandliberty.com/en-us/news/rss" },
  { name: "Steam News", url: "https://steamcommunity.com/games/2429640/rss/" },
];

const EN_ZH_MAP = {
  update: "更新",
  patch: "补丁",
  maintenance: "维护",
  event: "活动",
  "boss": "首领",
  dungeon: "副本",
  weapon: "武器",
  armor: "防具",
  skill: "技能",
  "guild": "公会",
  siege: "攻城",
  "arena": "竞技场",
  battle: "战场",
  "server": "服务器",
  "quest": "任务",
  reward: "奖励",
  "season": "赛季",
  battlepass: "战斗通行证",
  "shop": "商店",
  "fix": "修复",
  balance: "平衡",
  "change": "改动",
  "new": "新增",
  "improvement": "改进",
  adjustment: "调整",
  "bug": "Bug",
  "crash": "崩溃",
  "item": "道具",
  "system": "系统",
  content: "内容",
  "quality": "质量",
  "life": "生活",
  morph: "变形",
  amitoi: "伙伴",
  fishing: "钓鱼",
  cooking: "烹饪",
  collection: "收藏",
  codex: "法典",
  "rift": "裂缝",
  "stone": "石头",
  "currency": "货币",
  "sollant": "索兰特",
  trait: "特性",
  "enchant": "强化",
  extraction: "萃取",
  resonance: "共鸣",
  "rune": "符文",
  artifact: "人工制品",
  "reward": "奖励",
  "twitch": "Twitch",
  drop: "掉宝",
  "bundle": "礼包",
  "pack": "组合包",
  cosmetic: "外观",
  skin: "皮肤",
  mount: "坐骑",
  costume: "服装",
  "title": "称号",
  achievement: "成就",
  "leaderboard": "排行榜",
  "ranking": "排名",
  "cross": "跨",
  "world": "世界",
  region: "地区",
  platform: "平台",
  "console": "主机",
  "pc": "PC",
  "playstation": "PlayStation",
  "xbox": "Xbox",
  "ns": "Switch",
  "steam": "Steam",
  "amazon": "Amazon",
  "ncsoft": "NCsoft",
};

const TOPIC_PATTERNS = [
  { keywords: ["update", "patch", "version", "update notes"], icon: "📋", tag: "更新" },
  { keywords: ["event", "festival", "celebration"], icon: "🎉", tag: "活动" },
  { keywords: ["dungeon", "raid", "boss", "instance"], icon: "💀", tag: "副本" },
  { keywords: ["weapon", "skill", "balance", "rework", "change"], icon: "⚔️", tag: "平衡" },
  { keywords: ["server", "maintenance", "merge", "queue"], icon: "🔄", tag: "服务器" },
  { keywords: ["pvp", "arena", "siege", "battle", "guild war"], icon: "⚔️", tag: "PVP" },
  { keywords: ["item", "shop", "skin", "cosmetic", "mount"], icon: "🛒", tag: "商城" },
  { keywords: ["guide", "tip", "how to", "攻略"], icon: "📖", tag: "攻略" },
  { keywords: ["fishing", "cooking", "morph", "collect"], icon: "🎣", tag: "生活" },
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function zhTime(date) {
  const d = new Date(date);
  const now = new Date();
  const diff = Math.floor((now - d) / 86400000);
  if (diff === 0) return "今日";
  if (diff === 1) return "昨日";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function zhDate(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function translateTitle(en) {
  let t = en;
  for (const [eng, zh] of Object.entries(EN_ZH_MAP)) {
    const re = new RegExp(`\\b${eng}\\b`, "gi");
    t = t.replace(re, zh);
  }
  t = t.replace(/tl/gi, "TL");
  t = t.replace(/throne and liberty/gi, "Throne and Liberty");
  t = t.replace(/solisium/gi, "索利西姆");
  t = t.replace(/nix/gi, "尼克斯");
  t = t.replace(/talandre/gi, "Talandre");
  return t.trim();
}

function rewriteContent(text, title) {
  let t = text.slice(0, 800);

  for (const [eng, zh] of Object.entries(EN_ZH_MAP)) {
    const re = new RegExp(`\\b${eng}\\b`, "gi");
    t = t.replace(re, zh);
  }

  t = t.replace(/Throne and Liberty/gi, "Throne and Liberty");
  t = t.replace(/TL/gi, "TL");

  const paragraphs = t.split(/\n\n+/);
  const rewritten = [];
  for (let i = 0; i < paragraphs.length && i < 5; i++) {
    let p = paragraphs[i].trim();
    if (!p) continue;

    if (i === 0) {
      p = `近日，${p}`;
    }
    if (i === paragraphs.length - 1 || i === 4) {
      if (p.length > 50) {
        p += ` TL攻略站将持续关注后续更新动态，第一时间为玩家带来详细解读。`;
      }
    }

    rewritten.push(p);
  }

  return rewritten.join("\n\n");
}

function detectTopic(title, summary) {
  const text = `${title} ${summary}`.toLowerCase();
  for (const pattern of TOPIC_PATTERNS) {
    if (pattern.keywords.some((kw) => text.includes(kw))) {
      return pattern;
    }
  }
  return { icon: "📰", tag: "资讯" };
}

function makeArticle({ id, title, date, summary, content, source, url }) {
  const topic = detectTopic(title, summary);
  const safeId = id || slugify(title).slice(0, 40) + "-" + Date.now().toString(36);
  const zhTitle = translateTitle(title);
  const zhSummary = rewriteContent(summary || content?.slice(0, 200) || "", title);
  const zhContent = rewriteContent(content || summary || "", title);

  return {
    id: safeId,
    title: zhTitle,
    date: zhDate(date),
    summary: zhSummary.slice(0, 150),
    content: zhContent,
    author: "TL攻略站",
    tags: [topic.tag, "自动采集"],
    icon: topic.icon,
    source,
    sourceUrl: url,
  };
}

function buildHtml(article) {
  return `
    <p>${article.date}，来自${article.source}的消息。</p>
    ${article.content
      .split("\n\n")
      .filter(Boolean)
      .map((p) => `<p>${p}</p>`)
      .join("\n    ")}
    <hr />
    <p style="color:#6a5a4a;font-size:13px">来源：<a href="${article.sourceUrl}" style="color:#c9a227" target="_blank" rel="noopener">${article.source}</a> · TL攻略站编译整理</p>`;
}

async function fetchSteam() {
  const results = [];
  try {
    const res = await fetch("https://steamcommunity.com/games/2429640/rss/");
    const text = await res.text();

    const items = text.match(/<item>[\s\S]*?<\/item>/gi) || [];
    for (const item of items) {
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
                    item.match(/<title>(.*?)<\/title>/)?.[1] || "";
      const link = item.match(/<link>(.*?)<\/link>/)?.[1] || "";
      const desc = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] ||
                   item.match(/<description>(.*?)<\/description>/)?.[1] || "";
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || new Date().toUTCString();

      const content = desc.replace(/<[^>]*>/g, "").trim();
      results.push({
        title: title.trim(),
        date: new Date(pubDate).toISOString(),
        summary: content.slice(0, 300) || title,
        content: content || title,
        source: "Steam Throne and Liberty 新闻",
        url: link.trim(),
      });
    }
  } catch (e) {
    console.error("  Steam RSS fetch error:", e.message);
  }
  return results;
}

async function fetchRSS() {
  const results = [];
  try {
    const res = await fetch("https://www.playthroneandliberty.com/en-us/news/rss");
    const text = await res.text();

    const items = text.match(/<item>[\s\S]*?<\/item>/gi) || [];
    for (const item of items) {
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
                    item.match(/<title>(.*?)<\/title>/)?.[1] || "";
      const link = item.match(/<link>(.*?)<\/link>/)?.[1] || "";
      const desc = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] ||
                   item.match(/<description>(.*?)<\/description>/)?.[1] || "";
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || new Date().toUTCString();

      const content = desc.replace(/<[^>]*>/g, "").trim();
      results.push({
        title: title.trim(),
        date: new Date(pubDate).toISOString(),
        summary: content.slice(0, 300) || title,
        content: content || title,
        source: "Throne and Liberty 官方新闻",
        url: link.trim(),
      });
    }
  } catch (e) {
    console.error("  RSS fetch error:", e.message);
  }
  return results;
}

function loadExistingIds() {
  const ids = new Set();
  const titles = new Set();

  const cachePath = resolve(ROOT, "src/data/news-cache.json");
  if (existsSync(cachePath)) {
    try {
      const cached = JSON.parse(readFileSync(cachePath, "utf-8"));
      cached.forEach((a) => { ids.add(a.id); if (a.title) titles.add(a.title); });
    } catch {}
  }

  const gameDataPath = resolve(ROOT, "src/data/gameData.ts");
  try {
    const gd = readFileSync(gameDataPath, "utf-8");
    const articleBlocks = gd.match(/\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?\},/g) || [];
    for (const block of articleBlocks) {
      const idMatch = block.match(/id:\s*"([^"]+)"/);
      const titleMatch = block.match(/title:\s*"([^"]+)"/);
      if (idMatch) ids.add(idMatch[1]);
      if (titleMatch) titles.add(titleMatch[1]);
    }
  } catch {}

  return { ids, titles };
}

function saveCache(articles) {
  const cachePath = resolve(ROOT, "src/data/news-cache.json");
  const existing = [];
  if (existsSync(cachePath)) {
    try {
      existing.push(...JSON.parse(readFileSync(cachePath, "utf-8")));
    } catch {}
  }
  const all = [...existing, ...articles];
  writeFileSync(cachePath, JSON.stringify(all.slice(-100), null, 2), "utf-8");
}

function appendToGenerateJS(articles) {
  const path = resolve(ROOT, "scripts/generate-news.js");
  let content = readFileSync(path, "utf-8");

  const insertPoint = content.lastIndexOf("];");
  if (insertPoint === -1) return;

  const newEntries = articles.map((a) => `  {
    id: "${a.id}", title: "${a.title.replace(/"/g, '\\"')}",
    date: "${a.date}", author: "${a.author}",
    icon: "${a.icon}",
    content: \`<p>${a.date}，来自${a.source}的消息。</p>
${a.content
  .split("\n\n")
  .filter(Boolean)
  .map((p) => `<p>${p}</p>`)
  .join("\n")}
<hr />
<p style="color:#6a5a4a;font-size:13px">来源：<a href="${a.sourceUrl}" style="color:#c9a227" target="_blank" rel="noopener">${a.source}</a> · TL攻略站编译整理</p>\`,
  },`).join("\n");

  content = content.slice(0, insertPoint) + newEntries + "\n" + content.slice(insertPoint);
  writeFileSync(path, content, "utf-8");
}

function appendToGameData(articles) {
  const path = resolve(ROOT, "src/data/gameData.ts");
  let content = readFileSync(path, "utf-8");

  const marker = "export const externalLinks = [";
  const insertPoint = content.lastIndexOf("export const gearProgression");
  if (insertPoint === -1) return;

  const newsEnd = content.lastIndexOf("];", content.indexOf("export const gearProgression") - 1);
  if (newsEnd === -1) return;

  const dateMap = { "更新": "2026-06-0", "活动": "2026-06-0", "攻略": "2026-06-0", "资讯": "2026-06-0" };

  const newEntries = articles.map((a) => `  {
    id: "${a.id}", title: "${a.title.replace(/"/g, '\\"')}", date: "${a.date}",
    summary: "${(a.summary || "").replace(/"/g, '\\"').replace(/\n/g, " ").slice(0, 150)}",
    content: "${(a.content || "").replace(/"/g, '\\"').replace(/\n/g, "\\n").slice(0, 500)}",
    author: "TL攻略站", tags: [${a.tags.map((t) => `"${t}"`).join(", ")}], icon: "${a.icon}",
  },`).join("\n");

  content = content.slice(0, newsEnd) + newEntries + "\n" + content.slice(newsEnd);
  writeFileSync(path, content, "utf-8");
}

async function main() {
  console.log("=== TL 自动内容采集 ===\n");

  const { ids: existingIds, titles: existingTitles } = loadExistingIds();
  const allArticles = [];

  for (const source of SOURCES) {
    console.log(`📡 抓取: ${source.name}`);
    let items = [];
    if (source.name.includes("Steam")) {
      items = await fetchSteam();
    } else if (source.name.includes("RSS") || source.name.includes("Official")) {
      items = await fetchRSS();
    }
    console.log(`   → ${items.length} 条`);

    for (const item of items) {
      const article = makeArticle(item);
      if (!existingIds.has(article.id) && !existingTitles.has(article.title)) {
        allArticles.push({ ...article, sourceUrl: item.url });
        existingIds.add(article.id);
        existingTitles.add(article.title);
      }
    }
  }

  console.log(`\n📝 新文章: ${allArticles.length} 条`);

  if (allArticles.length === 0) {
    console.log("  没有新内容，跳过更新。");
    return;
  }

  allArticles.forEach((a) => console.log(`  · ${a.title}`));

  console.log("\n💾 写入缓存...");
  saveCache(allArticles);

  console.log("📄 更新 generate-news.js ...");
  appendToGenerateJS(allArticles);

  console.log("📄 更新 gameData.ts ...");
  appendToGameData(allArticles);

  console.log("\n✅ 完成! 运行 npm run build 生成网站。");
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
