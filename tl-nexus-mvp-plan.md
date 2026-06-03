# TL Nexus MVP 技术方案 — 2 周交付

## 核心原则

1. **能手动就手动** — 没有 API 就人工维护，比爬虫可靠
2. **能静态就静态** — 不急着上 WebSocket/实时推送
3. **准确 > 智能** — 一个正确的技能数值 > 十段 AI 生成的漂亮废话
4. **2 周只做一个核心流程**，做好再扩展

---

## Week 1：单页应用 + 天气 + 战术推荐

### 技术选型

```
前端: 纯 HTML + CSS + JS，单页
部署: Vercel / Cloudflare Pages（免费）
后端: 无
数据库: 无
数据源: Google Sheet 人工维护（第一周够用）
```

理由：Next.js + PostgreSQL + Redis 在不确定 PMF 之前是浪费。2 周 MVP 的目标是**验证有没有人用**，不是验证技术栈。

### 唯一页面结构

```
TL Nexus | 王权战术枢纽
├─ 顶部: 服务器选择器 (美西/美东/欧服/亚服) + 当前天气
├─ 中部: 当前天气 × 武器组合 → 战术推荐卡片
│   └─ 每张卡片: 武器图标 + 技能连招 + 一句话说明
└─ 底部: "我要上传" 按钮 → 跳转到 Google Form
```

### 天气数据方案

**TL 天气是固定轮播周期**（已验证），不需要 ML：
- 每个服务器天气按 2 小时轮换：雷暴 → 暴雨 → 浓雾 → 晴天 → 循环
- 维护一个 JSON 文件记录各服务器起始时间 + 轮播顺序
- 前端 JS 计算当前天气 + 剩余时间，无需服务端

```json
// weather-data.json（人工维护，每周更新一次）
{
  "servers": [
    {
      "name": "北美西部 - Throne Peak",
      "region": "us-west",
      "cycle": ["thunder", "rain", "fog", "sun"],
      "cycleStartHour": 0,
      "cycleDurationMin": 120,
      "startTime": "2026-05-19T00:00:00Z"
    }
  ]
}
```

前端计算：
```js
function getCurrentWeather(server) {
  const elapsed = (Date.now() - new Date(server.startTime).getTime()) / 60000;
  const cycleIndex = Math.floor(elapsed / server.cycleDurationMin) % server.cycle.length;
  const remaining = server.cycleDurationMin - (elapsed % server.cycleDurationMin);
  return { weather: server.cycle[cycleIndex], remaining };
}
```

### 战术推荐数据结构

同样维护 JSON（人工撰写，质量可控）：

```json
{
  "recommendations": [
    {
      "weather": "thunder",
      "weapon1": "雷霆法杖",
      "weapon2": "镰刀",
      "combo": "雷云召唤 → 连锁雷击 → 死亡收割",
      "tip": "雷暴天气雷系伤害+50%，15秒爆发期",
      "author": "测试验证过",
      "verified": true
    }
  ]
}
```

### Week 1 交付物

> 一个页面，能在手机上打开，看到当前服务器天气 + 3~5 条对应的 Build 推荐。
> 2 个人工维护数据源（天气 JSON + 战术 JSON），每天更新。

---

## Week 2：交易行价格追踪 + Build 分享

### 交易行价格 — 不爬虫方案

TL 没有公开 API，爬虫涉及 EULA 风险。替代方案：

**玩家手动上报 + 积分验证机制**

```
上报流程:
1. 玩家填写表单：服务器 + 物品名 + 价格 + 截图链接（可选）
2. 系统展示最近 5 条上报，中位数作为 "当前参考价"
3. 上报需要 Discord 登录（防机器人刷假数据）
4. 每条上报 +5 积分，被标记 "验证" 额外 +10 积分
5. 同一个物品每人每天只能上报 1 次
```

**技术上**：
- 先用 Google Sheet API 当数据库（可撑到 1000 用户）
- 前端用 Chart.js 画价格曲线
- 只追踪 5 种核心材料（生命精华、紫色强化石、攻速蓝装、暴击蓝装、技能书残页），
  不贪多

### Build 分享功能

```
功能流程:
1. 用户选择 武器1 + 武器2 + 天气
2. 填写技能连招（自由文本）+ 简短说明
3. 生成短链接（如 tlnexus.vercel.app/b/abc123）
4. 分享页可嵌入 Discord（Open Graph 预览）
```

**技术上**：
- 生成页面纯前端，无需数据库
- URL hash 存储 base64 编码的 build 数据
- 示例 URL：`tlnexus.vercel.app/b#eJzrK...`
- 不需要后端，不需要存储，0 运维成本

### Discord 集成

Week 2 必须上线一个 Discord Bot（最简单的版本）：

```
!weather us-west    → 显示该服当前天气 + 剩余时间
!build 雷杖 镰刀    → 显示推荐的技能连招
!price 生命精华     → 显示当前参考价
```

用 `discord.js`，部署在免费 Railway / Fly.io 上。

---

## 数据来源：终极方案

### 短期（MVP 阶段）

| 数据 | 来源 | 人力 |
|------|------|------|
| 天气周期 | 社区 Discord 验证 + JSON 维护 | 1 人每周 10 分钟 |
| 战术推荐 | 自己打 + 公会朋友写 | 2~3 个贡献者 |
| 交易行价格 | 玩家手动上报 | 众包 |
| 装备/技能数值 | 官方 wiki / 游戏截图提取 | 一次劳动 |

### 中期（PMF 验证后）

考虑 Overwolf 插件（游戏内覆盖层，可读 UI 数据）：
- 自动读取当前天气
- 自动截图战斗结算画面
- 自动上报交易行价格（用户在交易行时触发）
- 这是 TL 唯一可行的 API 替代方案

---

## 精确排期（14 天）

```
Day 1-2:  搭建页面骨架（HTML + CSS + 天气计算逻辑）
Day 3-4:  录入首批天气数据 + 5 条战术推荐
Day 5:    部署到 Vercel，配置自定义域名
Day 6-7:  邀请 20 个公会朋友试用，收集反馈
          ─── 里程碑：Weather MVP 上线 ───

Day 8-9:  搭建交易行上报表单 + Google Sheet 集成
Day 10:   价格展示页面（Chart.js 曲线）
Day 11:   Build 分享功能（URL hash 方案）
Day 12-13:Discord Bot 开发 + 部署
Day 14:   整合所有功能，在 Reddit/NGA 发帖推广
          ─── 里程碑：完整 MVP 上线 ───
```

---

## 绝对不做的事

| 功能 | 原因 |
|------|------|
| AI 战术生成 | 准确性不可控，会毁掉信任 |
| 3D 王城模型 | 资源获取侵权 + 工作量太大 |
| 爬虫爬交易行 | EULA 风险 + IP 封锁 + 维护成本高 |
| 用户注册系统 | MVP 阶段不需要，Discord OAuth 足够 |
| 移动 App | PWA 足够覆盖移动端 |
| 战斗录像分析 | 技术难度高，用户价值存疑 |
| 汉化补丁下载 | 法律风险，不做 |

---

## 成功指标（MVP 阶段）

```
第一周目标:
- DAU > 100
- 天气页面平均停留 > 30 秒（说明真的在看战术）
- 至少有 1 条用户反馈 "这个天气功能很有用"

第二周目标:
- 累计 500 次价格查询
- 20 个 Build 被分享
- Discord Bot 被加入 5 个服务器
```

任何一个指标达不到 → **换个方向或者放弃这个项目**，不要继续加功能。

---

## 如果 2 周后 PMF 验证通过

再考虑：
1. 迁移到 Next.js + PostgreSQL（SEO 友好 + 结构化数据）
2. Overwolf 插件开发（数据自动化）
3. 积分 → 会员体系
4. 英文版（国际服市场更大）

所有架构决策都要保证：**前 2 周的纯前端代码可以直接嵌入 Next.js**，
不要写需要重写的东西。

---

**方案到此，要我现在就开始写 MVP 的代码吗？**
