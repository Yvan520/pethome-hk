#!/usr/bin/env python3
"""Daily bzgame guide auto-generator. Usage: --target-dir PATH
Requires env vars: LONGCAT_API_KEY, LONGCAT_API_BASE_URL, LONGCAT_MODEL_NAME
"""

import json, os, re, sys, html, argparse
from datetime import date
from pathlib import Path
from openai import OpenAI

SCRIPT_DIR = Path(__file__).resolve().parent
CALENDAR = SCRIPT_DIR / "content_calendar.json"
LIVE_URL = "https://bzgame.gamewayz.com"

parser = argparse.ArgumentParser()
parser.add_argument("--target-dir", required=True)
args = parser.parse_args()
B = Path(args.target_dir).resolve()
GD = B / "guides"; MJ = B / "js" / "main.js"; SM = B / "sitemap.xml"

AK = os.environ.get("LONGCAT_API_KEY")
AB = os.environ.get("LONGCAT_API_BASE_URL", "https://api.longcat.chat/openai")
MN = os.environ.get("LONGCAT_MODEL_NAME", "LongCat-2.0-Preview")
if not AK: print("✗ LONGCAT_API_KEY not set"); sys.exit(1)

def topic():
    with open(CALENDAR) as f: t = json.load(f)
    return t[(date.today().timetuple().tm_yday - 1) % len(t)]

def existing():
    return {p.stem for p in GD.glob("*.html")} if GD.exists() else set()

def prompt(t):
    return f"""写一篇关于"{t['game']}"的搬砖攻略文章。
## 信息
- 游戏：{t['game']}
- 标题：{t['title']}
- 简介：{t['description']}
- 关键词：{', '.join(t['keywords'])}
- 来源：{', '.join(t['sources'])}
## 要求
1. 简体中文，面向搬砖玩家，有真实数据
2. 4-6个h2小标题（##开头），最后是"## 总结"
3. 至少2个Markdown表格
4. 600-1000字，直接输出纯Markdown"""

def parse_md(md):
    c = []; lines = md.strip().split("\n"); i = 0
    ih = False; th = []; tr = []; ct = []
    def fl(): nonlocal ct
        if ct: c.append({"type":"p","text":" ".join(ct).strip()}); ct = []
    tbl = lambda l: l.startswith("|") and l.endswith("|")
    while i < len(lines):
        s = lines[i].strip()
        if not s: ih=0 if ih and th else ih; i+=1; continue
        if s.startswith("# "): i+=1; continue
        if s.startswith("## "):
            fl()
            if ih and th and tr: c.append({"type":"table","data":{"headers":th,"rows":tr}})
            th=tr=[]; ih=False; c.append({"type":"h2","text":s[3:].strip()}); i+=1; continue
        if tbl(s):
            cells = [x.strip() for x in s.split("|") if x.strip()]
            if not ih:
                th=cells; ih=True
                if i+1<len(lines) and re.match(r'^[\|\s\-\:]+$',lines[i+1].strip()): i+=1
                fl()
            elif len(cells)==len(th): tr.append(cells)
            i+=1; continue
        if ih and th and tr: c.append({"type":"table","data":{"headers":th,"rows":tr}}); th=tr=[]; ih=False
        ct.append(s); i+=1
    fl()
    if ih and th and tr: c.append({"type":"table","data":{"headers":th,"rows":tr}})
    return c

def gen(p):
    r = OpenAI(api_key=AK,base_url=AB).chat.completions.create(model=MN,messages=[{"role":"system","content":"你是一个中文游戏搬砖编辑。输出纯Markdown。"},{"role":"user","content":p}],max_tokens=4096,temperature=0.8)
    m = r.choices[0].message.content.strip()
    print(f"  ↳ API: {len(m)} chars")
    x = re.search(r'```(?:markdown|md)?\s*([\s\S]+?)\s*```',m)
    if x: m=x.group(1).strip()
    m = re.sub(r'^# .+\n','',m).strip()
    return parse_md(m)

def views(g):
    v={"梦幻西游":"6.5k","DNF":"6.2k","逆水寒":"5.8k","魔兽世界":"5.5k","原神":"5.2k","传奇":"4.8k","剑侠世界3":"4.5k","EA FC Online":"4.2k","Old School Runescape":"4.0k","MIR4":"3.8k","天谕手游":"3.5k","光与夜之恋":"3.2k","巨人":"3.0k"}
    return v.get(g,"3.0k")

def js_entry(t,c,slug):
    td=date.today().strftime("%Y-%m-%d")
    tl=sum(len(i.get("text","")) for i in c if i["type"]=="p")
    rt=max(8,tl//100+1)
    cj=json.dumps(c,ensure_ascii=False).replace("'","\\'")
    return f"""  {{
    id: '{slug}', game: '{t['game']}', title: '{t['title']}',
    desc: '{t['description']}',
    image: null, date: '{td}', readTime: '{rt} 分钟', views: '{views(t['game'])}',
    content: {cj}
  }},"""

def ins_js(entry,slug):
    js=MJ.read_text(encoding="utf-8")
    if f"id: '{slug}'" in js: print(f"  ↳ '{slug}' already in main.js"); return
    for m in ["];\n\nconst PLATFORMS","];\n\n\nconst PLATFORMS"]:
        if m in js: MJ.write_text(js.replace(m,entry+"\n"+m),encoding="utf-8"); print("  ✓ Inserted into main.js"); return
    print("  ⚠ Cannot find GUIDES closing marker")

def upd_hp(slug):
    js=MJ.read_text(encoding="utf-8")
    for m in re.finditer(r"(?<=hasPage = \[)(.*?)(?=\]\.includes)",js,re.DOTALL):
        if f"'{slug}'" in m.group(0): print(f"  ↳ '{slug}' in hasPage"); return
    if js.count("'mhxy-xinmi'")>=2:
        js=js.replace("'mhxy-xinmi'",f"'mhxy-xinmi','{slug}'",2); MJ.write_text(js,encoding="utf-8"); print(f"  ✓ Updated hasPage"); return
    print("  ⚠ Could not update hasPage")

def render(c,topic,slug):
    hp=[]; ti=[]; sc=0
    for it in c:
        if it["type"]=="p": hp.append(f'    <p>{html.escape(it.get("text",""))}</p>')
        elif it["type"]=="h2":
            hp.append(f'    <h2 id="s{sc}">{html.escape(it.get("text",""))}</h2>'); ti.append((f"s{sc}",it.get("text",""))); sc+=1
        elif it["type"]=="table":
            d=it.get("data",{}); hs=d.get("headers",[]); rs=d.get("rows",[])
            if hs and rs:
                hp.append('    <div class="table-wrap"><table>')
                hp.append("      <thead><tr>"+"".join(f"<th>{html.escape(str(h))}</th>" for h in hs)+"</tr></thead>")
                hp.append("      <tbody>")
                for r in rs: hp.append("        <tr>"+"".join(f"<td>{html.escape(str(c))}</td>" for c in r)+"</tr>")
                hp.append("      </tbody></table></div>")
    toc=""
    if ti:
        toc='<div class="toc"><div class="toc-title">📖 目录导航</div><ul class="toc-list">'
        for s,txt in ti: toc+=f'<li><a href="#{s}">{html.escape(txt)}</a></li>'
        toc+="</ul></div>"
    return "\n".join(hp),toc,sc

def html_page(topic,c,slug):
    td=date.today(); ts=td.strftime("%Y-%m-%d"); tdd=td.strftime("%Y年%m月%d日")
    g=topic["game"]; ti=topic["title"]; d=topic["description"]; v=views(g)
    bh,toc,ns=render(c,topic,slug)
    tl=sum(len(i.get("text","")) for i in c if i["type"]=="p")
    rt=max(8,tl//100+1)
    related=""; same=[]
    for eid in existing():
        if eid==slug or len(same)>=2: continue
        try:
            et=(GD/f"{eid}.html").read_text(encoding="utf-8")
            if f">{g}<" in et or f"🏷 {g}" in et:
                m=re.search(r'<title>(.+?) - 搬砖营地',et)
                if m: same.append((eid,m.group(1)))
        except: pass
    if same:
        related='<div class="related">\n<h2 id="s'+str(ns)+'">相关攻略推荐</h2>\n<div class="related-grid">\n'
        for rid,rtt in same: related+=f'<a href="{rid}.html" class="related-link">{html.escape(rtt)}<div class="rl-game">{html.escape(g)}</div></a>\n'
        related+='</div>\n</div>'
    def ej(s): return s.replace("\\","\\\\").replace('"','\\"').replace("\n","\\n")
    return f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
  <link rel="icon" type="image/svg+xml" href="../favicon.svg">
  <title>{html.escape(ti)} - 搬砖营地 BrickCamp</title>
  <meta name="description" content="{html.escape(d)}">
  <meta name="keywords" content="游戏搬砖,{html.escape(g)},搬砖攻略,搬砖营地">
  <link rel="canonical" href="{LIVE_URL}/guides/{slug}.html">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{html.escape(ti)}">
  <meta property="og:description" content="{html.escape(d)}">
  <meta property="og:url" content="{LIVE_URL}/guides/{slug}.html">
  <meta property="og:site_name" content="搬砖营地 BrickCamp">
  <script type="application/ld+json">{{
  "@context":"https://schema.org","@type":"Article",
  "headline":"{ej(ti)}","description":"{ej(d)}","image":"",
  "datePublished":"{ts}","dateModified":"{ts}",
  "author":{{"@type":"Organization","name":"搬砖营地 BrickCamp"}},
  "publisher":{{"@type":"Organization","name":"搬砖营地","logo":{{"@type":"ImageObject","url":"{LIVE_URL}/favicon.svg"}}}},
  "mainEntityOfPage":{{"@type":"WebPage","@id":"{LIVE_URL}/guides/{slug}.html"}},
  "breadcrumb":{{"@type":"BreadcrumbList","itemListElement":[
    {{"@type":"ListItem","position":1,"name":"首页","item":"{LIVE_URL}/"}},
    {{"@type":"ListItem","position":2,"name":"{ej(g)}攻略","item":"{LIVE_URL}/#guides"}},
    {{"@type":"ListItem","position":3,"name":"{ej(ti)}"}}
  ]}}
}}</script>
  <link rel="stylesheet" href="../css/guide.css">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-YTPBD9KJRV"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-YTPBD9KJRV');</script>
</head>
<body>
<div id="progress-bar"></div>
<div class="container">
<nav class="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
<span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="{LIVE_URL}/"><span itemprop="name">🏠 搬砖营地</span></a><meta itemprop="position" content="1"></span>
<span class="sep">›</span>
<span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a itemprop="item" href="{LIVE_URL}/#guides"><span itemprop="name">{html.escape(g)}攻略</span></a><meta itemprop="position" content="2"></span>
<span class="sep">›</span>
<span class="current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><span itemprop="name">{html.escape(ti)}</span><meta itemprop="position" content="3"></span>
</nav>
<h1>{html.escape(ti)}</h1>
<div class="meta"><span>📅 {tdd}</span><span>⏱ {rt} 分钟</span><span>👁 {v} 阅读</span><span>🏷 {html.escape(g)}</span></div>
<p>{html.escape(d)}</p>
<div class="guide-img">🎮</div>
{toc}
{bh}
{related}
<a class="back" href="{LIVE_URL}/">← 返回搬砖营地首页</a>
</div>
<button id="back-top" onclick="window.scrollTo({{top:0,behavior:'smooth'}})">↑</button>
<script>window.addEventListener('scroll',function(){{const p=document.getElementById('progress-bar');const t=document.documentElement.scrollTop||document.body.scrollTop;const h=document.documentElement.scrollHeight-document.documentElement.clientHeight;if(p)p.style.width=Math.min(t/h*100,100)+'%';const bt=document.getElementById('back-top');if(bt)bt.classList.toggle('show',t>300);}});</script>
</body>
</html>'''

def upd_sm(slug,ts):
    url=f"{LIVE_URL}/guides/{slug}.html"
    e=f'  <url>\n    <loc>{url}</loc>\n    <lastmod>{ts}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>'
    if not SM.exists(): SM.write_text(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{e}\n</urlset>',encoding="utf-8"); print("  ✓ Sitemap created"); return
    c=SM.read_text(encoding="utf-8")
    if url in c: print(f"  ↳ {slug} in sitemap"); return
    if "</urlset>" in c: SM.write_text(c.replace("</urlset>",e+"\n</urlset>"),encoding="utf-8"); print("  ✓ Sitemap updated"); return
    print("  ⚠ Could not update sitemap")

def main():
    if not B.exists(): print(f"✗ Dir not found: {B}"); sys.exit(1)
    t=topic(); slug=t["slug"]
    print(f"→ {t['title']} ({slug})")
    if slug in existing():
        print(f"✗ {slug}.html exists"); upd_sm(slug,date.today().strftime("%Y-%m-%d")); return
    print(f"→ Generating with {MN}...")
    try: c=gen(prompt(t))
    except Exception as e: print(f"✗ {e}"); sys.exit(1)
    print(f"  ↳ {len(c)} blocks ({sum(1 for x in c if x['type']=='p')}p {sum(1 for x in c if x['type']=='h2')}h2 {sum(1 for x in c if x['type']=='table')}t)")
    ins_js(js_entry(t,c,slug),slug); upd_hp(slug)
    GD.mkdir(parents=True,exist_ok=True)
    (GD/f"{slug}.html").write_text(html_page(t,c,slug),encoding="utf-8")
    print(f"  ✓ Saved: {slug}.html")
    upd_sm(slug,date.today().strftime("%Y-%m-%d"))
    print(f"✓ Done — {t['title']}")

if __name__=="__main__": main()
