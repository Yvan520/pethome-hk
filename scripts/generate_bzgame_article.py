#!/usr/bin/env python3
"""Daily bzgame guide auto-generator.
Generates one new game 搬砖 guide per day using LongCat API.
Outputs: guides/*.html, updates main.js GUIDES array, updates sitemap.

Uses markdown as LLM output format (reliable), then converts to
the JSON content format used by main.js.
"""

import json, os, re, sys, html
from datetime import date, datetime, timedelta
from pathlib import Path

from openai import OpenAI

BASE_DIR = Path(__file__).resolve().parent.parent  # bzgame/
SCRIPTS_DIR = BASE_DIR / "scripts"
GUIDES_DIR = BASE_DIR / "guides"
MAIN_JS = BASE_DIR / "js" / "main.js"
SITEMAP = BASE_DIR / "sitemap.xml"
CALENDAR = SCRIPTS_DIR / "content_calendar.json"
DOTENV = SCRIPTS_DIR / ".env"

LIVE_URL = "https://bzgame.gamewayz.com"

if DOTENV.exists():
    for line in DOTENV.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            os.environ.setdefault(k.strip(), v.strip())

API_KEY = os.environ.get("LONGCAT_API_KEY")
API_BASE_URL = os.environ.get("LONGCAT_API_BASE_URL", "https://api.longcat.chat/openai")
MODEL_NAME = os.environ.get("LONGCAT_MODEL_NAME", "LongCat-2.0-Preview")

if not API_KEY:
    print("✗ LONGCAT_API_KEY not set. Create .env file or set env var.")
    sys.exit(1)


def get_today_topic():
    with open(CALENDAR, "r", encoding="utf-8") as f:
        topics = json.load(f)
    day_of_year = date.today().timetuple().tm_yday
    idx = (day_of_year - 1) % len(topics)
    return topics[idx]


def get_existing_guide_ids():
    ids = set()
    for p in GUIDES_DIR.glob("*.html"):
        ids.add(p.stem)
    return ids


def build_prompt(topic):
    today_str = date.today().strftime("%Y年%m月%d日")
    game = topic["game"]
    title = topic["title"]
    desc = topic["description"]
    keywords = ", ".join(topic["keywords"])
    sources = ", ".join(topic["sources"])

    return f"""你是一个专业的中文游戏搬砖内容编辑。请写一篇关于"{game}"的搬砖攻略文章。

## 文章信息
- 游戏：{game}
- 标题：{title}
- 简介：{desc}
- 目标关键词：{keywords}
- 参考来源：{sources}
- 日期：{today_str}

## 写作要求
1. 用简体中文写作，语气专业但易懂，面向中文游戏搬砖玩家
2. 文章必须有真实数据和数字支撑（收益、等级、价格等），不要写空话
3. 参考上面来源写，但用自己的话重新组织，不要直接抄袭
4. 文章包含 4-6 个 h2 小标题（用 ## 开头），最后一个小标题必须是"## 总结"
5. 必须包含至少 2 个标准Markdown表格，表格必须有真实数据
6. 总长度 600-1000 字
7. 不要使用代码块包裹输出，直接输出纯Markdown

## 表格格式
表格用标准 Markdown 语法，示例：

| 列1 | 列2 | 列3 |
| --- | --- | --- |
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |

## 整体结构
第一个段落直接写介绍文字（不要标题）。然后按顺序写 h2 标题、内容段落和表格。
"""


def parse_markdown_to_json(md_text):
    """Convert markdown guide content to the JSON format used by main.js."""
    content = []
    lines = md_text.strip().split("\n")
    i = 0
    in_table = False
    table_headers = []
    table_rows = []
    current_text = []

    def flush_text():
        nonlocal current_text
        if current_text:
            text = " ".join(current_text).strip()
            if text:
                content.append({"type": "p", "text": text})
            current_text = []

    def is_table_line(line):
        return line.strip().startswith("|") and line.strip().endswith("|")

    def parse_table_line(line):
        cells = [c.strip() for c in line.strip().split("|")]
        cells = [c for c in cells if c]
        return cells

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Skip empty lines
        if not stripped:
            if in_table and table_headers:
                in_table = False
            i += 1
            continue

        # h1 heading - treat as h2 (or skip first h1 which might be the title)
        if stripped.startswith("# ") and not stripped.startswith("## "):
            i += 1
            continue

        # h2 heading
        if stripped.startswith("## "):
            flush_text()
            if in_table and table_headers:
                if table_rows:
                    content.append({"type": "table", "data": {"headers": table_headers, "rows": table_rows}})
                table_headers = []
                table_rows = []
                in_table = False
            title = stripped[3:].strip()
            content.append({"type": "h2", "text": title})
            i += 1
            continue

        # Table row
        if is_table_line(stripped):
            cells = parse_table_line(stripped)
            if not in_table:
                # First row of a table = headers
                table_headers = cells
                in_table = True
                # Check next line for separator
                if i + 1 < len(lines):
                    next_line = lines[i + 1].strip()
                    if next_line.startswith("|") and re.match(r'^[\|\s\-\:]+$', next_line):
                        i += 1  # Skip separator line
                flush_text()
            else:
                if len(cells) == len(table_headers):
                    table_rows.append(cells)
            i += 1
            continue
        else:
            if in_table and table_headers:
                if table_rows:
                    content.append({"type": "table", "data": {"headers": table_headers, "rows": table_rows}})
                table_headers = []
                table_rows = []
                in_table = False

        # Regular text
        current_text.append(stripped)
        i += 1

    flush_text()
    if in_table and table_headers and table_rows:
        content.append({"type": "table", "data": {"headers": table_headers, "rows": table_rows}})

    return content


def generate_guide_content(prompt):
    """Call LongCat API and parse markdown response to JSON content."""
    client = OpenAI(api_key=API_KEY, base_url=API_BASE_URL)
    resp = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content": "你是一个专业的中文游戏搬砖内容编辑。用 Markdown 格式输出原创攻略。",
            },
            {"role": "user", "content": prompt},
        ],
        max_tokens=4096,
        temperature=0.8,
    )

    md_text = resp.choices[0].message.content.strip()
    print(f"  ↳ API returned {len(md_text)} chars")

    # Extract from code block if present
    code_match = re.search(r'```(?:markdown|md)?\s*([\s\S]+?)\s*```', md_text)
    if code_match:
        md_text = code_match.group(1).strip()

    # Remove h1 if present (it's usually the title repeated)
    md_text = re.sub(r'^# .+\n', '', md_text).strip()

    content = parse_markdown_to_json(md_text)

    if not content:
        raise ValueError("Parsed content is empty")

    print(f"  ↳ Parsed {len(content)} content blocks")

    # Validate
    for item in content:
        if item["type"] not in ("p", "h2", "table"):
            raise ValueError(f"Unknown type: {item['type']}")
        if item["type"] == "table":
            if "data" not in item or "headers" not in item["data"] or "rows" not in item["data"]:
                raise ValueError(f"Table missing required fields: {item}")

    return content


def count_views_for_game(game):
    base_views = {
        "梦幻西游": "6.5k", "DNF": "6.2k", "逆水寒": "5.8k",
        "魔兽世界": "5.5k", "原神": "5.2k", "传奇": "4.8k",
        "剑侠世界3": "4.5k", "EA FC Online": "4.2k",
        "Old School Runescape": "4.0k", "MIR4": "3.8k",
        "天谕手游": "3.5k", "光与夜之恋": "3.2k", "巨人": "3.0k",
    }
    return base_views.get(game, "3.0k")


def build_js_entry(topic, content, slug):
    """Build JS GUIDES array entry string."""
    today = date.today().strftime("%Y-%m-%d")
    views = count_views_for_game(topic["game"])
    text_len = sum(len(item.get("text", "")) for item in content if item["type"] == "p")
    read_time = max(8, text_len // 100 + 1)

    content_json = json.dumps(content, ensure_ascii=False)
    # Escape single quotes for JavaScript
    content_json = content_json.replace("'", "\\'")

    entry = f"""  {{
    id: '{slug}', game: '{topic['game']}', title: '{topic['title']}',
    desc: '{topic['description']}',
    image: null, date: '{today}', readTime: '{read_time} 分钟', views: '{views}',
    content: {content_json}
  }},"""
    return entry


def insert_into_main_js(entry_text, slug):
    with open(MAIN_JS, "r", encoding="utf-8") as f:
        js = f.read()

    if f"id: '{slug}'" in js:
        print(f"  ↳ '{slug}' already in main.js, skipping insert")
        return False

    marker = "];\n\nconst PLATFORMS"
    if marker not in js:
        marker = "];\n\n\nconst PLATFORMS"
    if marker not in js:
        print("  ⚠ Cannot find GUIDES array closing marker!")
        return False

    js = js.replace(marker, entry_text + "\n" + marker)
    with open(MAIN_JS, "w", encoding="utf-8") as f:
        f.write(js)
    print("  ✓ Inserted into main.js GUIDES array")
    return True


def render_content_to_html(content):
    """Convert JSON content array to HTML sections + TOC."""
    html_parts = []
    toc_items = []
    section_counter = 0

    for item in content:
        t = item["type"]
        if t == "p":
            text = item.get("text", "")
            if text:
                html_parts.append(f"    <p>{html.escape(text)}</p>")
        elif t == "h2":
            sid = f"s{section_counter}"
            text = item.get("text", "")
            html_parts.append(f'    <h2 id="{sid}">{html.escape(text)}</h2>')
            toc_items.append((sid, text))
            section_counter += 1
        elif t == "table":
            data = item.get("data", {})
            headers = data.get("headers", [])
            rows = data.get("rows", [])
            if not headers or not rows:
                continue
            html_parts.append('    <div class="table-wrap"><table>')
            html_parts.append("      <thead><tr>" + "".join(f"<th>{html.escape(str(h))}</th>" for h in headers) + "</tr></thead>")
            html_parts.append("      <tbody>")
            for row in rows:
                html_parts.append("        <tr>" + "".join(f"<td>{html.escape(str(c))}</td>" for c in row) + "</tr>")
            html_parts.append("      </tbody>")
            html_parts.append("    </table></div>")

    toc_html = ""
    if toc_items:
        toc_html = '<div class="toc"><div class="toc-title">📖 目录导航</div><ul class="toc-list">'
        for sid, text in toc_items:
            toc_html += f'<li><a href="#{sid}">{html.escape(text)}</a></li>'
        toc_html += "</ul></div>"

    return "\n".join(html_parts), toc_html, section_counter


def generate_html(topic, content, slug):
    """Generate standalone HTML guide page."""
    today = date.today()
    today_str = today.strftime("%Y-%m-%d")
    today_display = today.strftime("%Y年%m月%d日")
    game = topic["game"]
    title = topic["title"]
    desc = topic["description"]
    views = count_views_for_game(game)

    body_html, toc_html, num_sections = render_content_to_html(content)
    text_len = sum(len(item.get("text", "")) for item in content if item["type"] == "p")
    read_time = max(8, text_len // 100 + 1)

    # Find related guides
    related = ""
    existing = get_existing_guide_ids()
    same = []
    for eid in existing:
        if eid == slug or len(same) >= 2:
            continue
        try:
            efile = GUIDES_DIR / f"{eid}.html"
            etext = efile.read_text(encoding="utf-8")
            if f">{game}<" in etext or f"🏷 {game}" in etext:
                tm = re.search(r'<title>(.+?) - 搬砖营地', etext)
                if tm:
                    same.append((eid, tm.group(1)))
        except:
            pass

    if same:
        related = '<div class="related">\n<h2 id="s' + str(num_sections) + '">相关攻略推荐</h2>\n<div class="related-grid">\n'
        for rid, rtitle in same:
            related += f'<a href="{rid}.html" class="related-link">{html.escape(rtitle)}<div class="rl-game">{html.escape(game)}</div></a>\n'
        related += '</div>\n</div>'

    def esc_json(s):
        return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")

    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/svg+xml" href="../favicon.svg">
  <title>{html.escape(title)} - 搬砖营地 BrickCamp</title>
  <meta name="description" content="{html.escape(desc)}">
  <meta name="keywords" content="游戏搬砖,{html.escape(game)},搬砖攻略,搬砖营地">
  <link rel="canonical" href="{LIVE_URL}/guides/{slug}.html">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{html.escape(title)}">
  <meta property="og:description" content="{html.escape(desc)}">
  <meta property="og:url" content="{LIVE_URL}/guides/{slug}.html">
  <meta property="og:site_name" content="搬砖营地 BrickCamp">
  <meta property="og:locale" content="zh_CN">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{html.escape(title)}">
  <script type="application/ld+json">{{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{esc_json(title)}",
  "description": "{esc_json(desc)}",
  "image": "",
  "datePublished": "{today_str}",
  "dateModified": "{today_str}",
  "author": {{
    "@type": "Organization",
    "name": "搬砖营地 BrickCamp"
  }},
  "publisher": {{
    "@type": "Organization",
    "name": "搬砖营地",
    "logo": {{
      "@type": "ImageObject",
      "url": "{LIVE_URL}/favicon.svg"
    }}
  }},
  "mainEntityOfPage": {{
    "@type": "WebPage",
    "@id": "{LIVE_URL}/guides/{slug}.html"
  }},
  "breadcrumb": {{
    "@type": "BreadcrumbList",
    "itemListElement": [
      {{
        "@type": "ListItem",
        "position": 1,
        "name": "首页",
        "item": "{LIVE_URL}/"
      }},
      {{
        "@type": "ListItem",
        "position": 2,
        "name": "{esc_json(game)}攻略",
        "item": "{LIVE_URL}/#guides"
      }},
      {{
        "@type": "ListItem",
        "position": 3,
        "name": "{esc_json(title)}"
      }}
    ]
  }}
}}</script>
  <link rel="stylesheet" href="../css/guide.css">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-YTPBD9KJRV"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', 'G-YTPBD9KJRV');
  </script>
</head>
<body>
<div id="progress-bar"></div>
  <div class="container">
    <nav class="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
      <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="{LIVE_URL}/"><span itemprop="name">🏠 搬砖营地</span></a>
        <meta itemprop="position" content="1">
      </span>
      <span class="sep">›</span>
      <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="{LIVE_URL}/#guides"><span itemprop="name">{html.escape(game)}攻略</span></a>
        <meta itemprop="position" content="2">
      </span>
      <span class="sep">›</span>
      <span class="current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <span itemprop="name">{html.escape(title)}</span>
        <meta itemprop="position" content="3">
      </span>
    </nav>
<h1>{html.escape(title)}</h1>
    <div class="meta">
      <span>📅 {today_display}</span>
      <span>⏱ {read_time} 分钟</span>
      <span>👁 {views} 阅读</span>
      <span>🏷 {html.escape(game)}</span>
    </div>
    <p>{html.escape(desc)}</p>
<div class="guide-img">🎮</div>

{toc_html}

{body_html}
    {related}
    <a class="back" href="{LIVE_URL}/">← 返回搬砖营地首页</a>
  </div>
<button id="back-top" onclick="window.scrollTo({{top:0,behavior:'smooth'}})">↑</button>
<script>
window.addEventListener('scroll',function(){{const p=document.getElementById('progress-bar');const t=document.documentElement.scrollTop||document.body.scrollTop;const h=document.documentElement.scrollHeight-document.documentElement.clientHeight;if(p)p.style.width=Math.min(t/h*100,100)+'%';const bt=document.getElementById('back-top');if(bt)bt.classList.toggle('show',t>300);}});
</script>
</body>
</html>"""


def update_sitemap(slug, today_str):
    url = f"{LIVE_URL}/guides/{slug}.html"
    entry = f"""  <url>
    <loc>{url}</loc>
    <lastmod>{today_str}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>"""

    if not SITEMAP.exists():
        sitemap_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{entry}
</urlset>"""
        SITEMAP.write_text(sitemap_content, encoding="utf-8")
        print(f"  ✓ Sitemap created with {url}")
        return True

    content = SITEMAP.read_text(encoding="utf-8")
    if url in content:
        print(f"  ↳ {slug} already in sitemap, skipping")
        return True

    insert_before = "</urlset>"
    if insert_before in content:
        content = content.replace(insert_before, entry + "\n" + insert_before)
        SITEMAP.write_text(content, encoding="utf-8")
        print(f"  ✓ Sitemap updated with {url}")
        return True

    print("  ⚠ Could not find </urlset> in sitemap")
    return False


def update_has_page(slug):
    with open(MAIN_JS, "r", encoding="utf-8") as f:
        js = f.read()

    # Find hasPage array boundaries and check if slug already present
    # hasPage arrays look like: const hasPage = ['...','...'].includes(guide.id);
    needle = f"'{slug}'"
    # Count occurrences only in hasPage context (preceded by 'hasPage')
    haspage_positions = [m.start() for m in re.finditer(r"""'[^']*'""", js)]
    in_haspage = False
    for pos in re.finditer(r"(?<=hasPage = \[)(.*?)(?=\]\.includes)", js, re.DOTALL):
        if needle in pos.group(0):
            print(f"  ↳ '{slug}' already in hasPage lists, skipping")
            return True

    # Insert before 'mhxy-xinmi' in both hasPage arrays
    count = js.count("'mhxy-xinmi'")
    if count >= 2:
        js = js.replace("'mhxy-xinmi'", f"'mhxy-xinmi','{slug}'", 2)
        with open(MAIN_JS, "w", encoding="utf-8") as f:
            f.write(js)
        print(f"  ✓ Updated hasPage lists with '{slug}'")
        return True

    print("  ⚠ Could not find hasPage insertion point")
    return False


def main():
    topic = get_today_topic()
    slug = topic["slug"]

    print(f"→ Today: {topic['title']} ({slug})")

    existing = get_existing_guide_ids()
    if slug in existing:
        print(f"✗ {slug}.html exists — skipping")
        update_sitemap(slug, date.today().strftime("%Y-%m-%d"))
        sys.exit(0)

    print(f"→ Generating with {MODEL_NAME}...")
    prompt = build_prompt(topic)

    try:
        content = generate_guide_content(prompt)
    except Exception as e:
        print(f"✗ Error: {e}")
        sys.exit(1)

    print(f"  ↳ {len(content)} content blocks: {sum(1 for c in content if c['type']=='p')}p + {sum(1 for c in content if c['type']=='h2')}h2 + {sum(1 for c in content if c['type']=='table')}tables")

    entry = build_js_entry(topic, content, slug)
    insert_into_main_js(entry, slug)
    update_has_page(slug)

    html_page = generate_html(topic, content, slug)
    out_path = GUIDES_DIR / f"{slug}.html"
    out_path.write_text(html_page, encoding="utf-8")
    print(f"  ✓ Saved: {slug}.html ({len(html_page)} bytes)")

    today_str = date.today().strftime("%Y-%m-%d")
    update_sitemap(slug, today_str)

    print(f"\n✓ Done — {topic['title']}")


if __name__ == "__main__":
    main()
