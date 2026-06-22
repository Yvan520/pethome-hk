document.addEventListener('DOMContentLoaded', () => {

  // ====== Scroll to hash anchor (fix cross-page nav) ======
  if (window.location.hash) {
    setTimeout(() => {
      const el = document.querySelector(window.location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const offset = 100;
        window.scrollBy(0, -offset);
      }
    }, 400);
  }

  // ====== Theme Toggle ======
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('sunnyhk-theme') || 'light';
  if (savedTheme === 'dark') document.body.classList.add('dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('sunnyhk-theme', isDark ? 'dark' : 'light');
      themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
    themeToggle.innerHTML = document.body.classList.contains('dark')
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }

  // ====== Lang Buttons ======
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.SunnyLang) {
        window.SunnyLang.setLang(btn.dataset.lang);
      }
    });
  });

  // ====== Navbar Scroll Effect ======
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    });
    if (window.scrollY > 80) navbar.classList.add('scrolled');
  }

  // ====== Mobile Menu ======
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');

  if (menuBtn && mobileDrawer && mobileOverlay) {
    function openMenu() {
      mobileDrawer.classList.add('open');
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      mobileDrawer.classList.remove('open');
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    menuBtn.addEventListener('click', openMenu);
    mobileOverlay.addEventListener('click', closeMenu);
    document.querySelectorAll('.mobile-drawer a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });
  }

  // ====== Scroll Animation (fade-in) ======
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ====== FAQ Accordion ======
  document.querySelectorAll('.faq-item .question').forEach(q => {
    q.addEventListener('click', () => {
      q.parentElement.classList.toggle('open');
    });
  });

  // ====== Age Group Card Click ======
  document.querySelectorAll('.age-card[data-href]').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = card.dataset.href;
    });
  });

  // ====== Hero Search ======
  const searchBtn = document.getElementById('heroSearchBtn');
  const searchSelect = document.getElementById('heroSearchSelect');
  if (searchBtn && searchSelect) {
    searchBtn.addEventListener('click', () => {
      const val = searchSelect.value;
      if (val) {
        window.location.href = val;
      } else {
        searchSelect.style.borderColor = '#f472b6';
        setTimeout(() => { searchSelect.style.borderColor = ''; }, 1000);
      }
    });
  }

  // ====== Recommend Button Scroll ======
  const recommendBtn = document.getElementById('recommendBtn');
  if (recommendBtn) {
    recommendBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('ageGroups');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ====== Explore Sidebar Active State ======
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // ====== Stories: Submit Form (localStorage demo) ======
  const storyForm = document.getElementById('storyForm');
  const storiesContainer = document.getElementById('storiesContainer');

  if (storyForm && storiesContainer) {
    // Load existing stories from localStorage
    let stories = JSON.parse(localStorage.getItem('sunnyhk-stories') || '[]');

    function renderStories() {
      if (stories.length === 0) {
        storiesContainer.innerHTML = `
          <div class="story-card" style="text-align:center;grid-column:1/-1;padding:48px 24px;">
            <div style="font-size:3rem;margin-bottom:16px;">💬</div>
            <p style="color:var(--text-muted);">还没有人留下故事<br>成为第一个分享的人吧！</p>
          </div>
        `;
        return;
      }
      storiesContainer.innerHTML = stories.map((s, i) => `
        <div class="story-card fade-in">
          <div class="avatar">${s.nickname ? s.nickname.charAt(0).toUpperCase() : '?'}</div>
          <div class="meta">
            <span class="name">${escapeHtml(s.nickname) || '匿名旅人'}</span>
            <span class="origin">${escapeHtml(s.origin) || '未知'} · ${escapeHtml(s.time) || '刚刚'}</span>
          </div>
          <span class="tag" style="background:${getTagColor(s.category)}15;color:${getTagColor(s.category)}">
            ${getTagLabel(s.category)}
          </span>
          <div class="content">${escapeHtml(s.message)}</div>
          <div class="actions">
            <button onclick="toggleLike(${i})" class="${s.liked ? 'liked' : ''}">
              <i class="fa${s.liked ? 's' : 'r'} fa-heart"></i> <span>${s.likes || 0}</span>
            </button>
            <span><i class="far fa-comment"></i> 0</span>
          </div>
        </div>
      `).join('');

      // Animate new cards
      setTimeout(() => {
        document.querySelectorAll('#storiesContainer .fade-in').forEach(el => observer.observe(el));
      }, 100);
    }

    storyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nickname = document.getElementById('storyNickname').value.trim() || '匿名旅人';
      const origin = document.getElementById('storyOrigin').value.trim() || '';
      const category = document.getElementById('storyCategory').value || 'general';
      const message = document.getElementById('storyMessage').value.trim();

      if (!message) {
        alert('请写下你想分享的故事～');
        return;
      }

      const now = new Date();
      const timeStr = now.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });

      stories.unshift({
        nickname,
        origin,
        category,
        message,
        time: timeStr,
        likes: 0,
        liked: false,
      });

      localStorage.setItem('sunnyhk-stories', JSON.stringify(stories));
      renderStories();
      storyForm.reset();
      window.scrollTo({ top: storiesContainer.offsetTop - 100, behavior: 'smooth' });
    });

    // Like function
    window.toggleLike = (index) => {
      const s = stories[index];
      if (s) {
        s.liked = !s.liked;
        s.likes += s.liked ? 1 : -1;
        localStorage.setItem('sunnyhk-stories', JSON.stringify(stories));
        renderStories();
      }
    };

    renderStories();
  }

  // ====== Helper Functions ======
  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function getTagColor(cat) {
    const map = {
      night: '#8b5cf6',
      food: '#f43f5e',
      healing: '#14b8a6',
      family: '#f59e0b',
      solo: '#3b82f6',
    };
    return map[cat] || '#64748b';
  }

  function getTagLabel(cat) {
    const map = {
      night: '🌇 最美夜景',
      food: '🍜 最难忘的一顿饭',
      healing: '💛 最治愈的一刻',
      family: '👨‍👩‍👧 亲子回忆',
      solo: '🎒 一个人的旅行',
    };
    return map[cat] || '📝 香港故事';
  }

  // ====== Destination Search (explore page) ======
  const searchInput = document.getElementById('destinationSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const q = this.value.toLowerCase().trim();
      document.querySelectorAll('.place-card').forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
        const match = title.includes(q) || desc.includes(q);
        card.style.display = match || !q ? '' : 'none';
      });
    });
  }

  const placeCards = [];
  document.querySelectorAll('.place-card').forEach(card => {
    const img = card.querySelector('.thumb img');
    const info = card.querySelector('.info');
    const titleEl = info?.querySelector('h3');
    const title = titleEl?.innerHTML || '';
    const desc = info?.querySelector('p')?.innerHTML || '';
    const tags = info?.querySelector('.tags')?.innerHTML || '';
    let tipsHtml = '';
    info?.querySelectorAll('.tip').forEach(tip => {
      const clone = tip.cloneNode(true);
      const btnWrap = clone.querySelector('div[style*="display:flex"]');
      if (btnWrap) btnWrap.remove();
      tipsHtml += clone.outerHTML;
    });
    const rawTitle = titleEl?.textContent || '';
    const cleanName = rawTitle.replace(/[^\u4e00-\u9fff\w\s]/g, '').trim();
    const trailLink = info?.querySelector('.hiking-card-btn[href*="hiking-"],.hiking-card-btn[href*="food-"],.hiking-card-btn[href*="snorkeling-"],.hiking-card-btn[href*="swimming-"],.hiking-card-btn[href*="electronics-"]')?.getAttribute('href') || '';
    placeCards.push({
      imgSrc: img?.src || '',
      imgAlt: img?.alt || '',
      title,
      desc,
      tags,
      tips: tipsHtml,
      mapName: cleanName,
      pageLink: trailLink
    });
  });

  // Add inline map link to each place card (only if none exists yet)
  document.querySelectorAll('.place-card').forEach((card, i) => {
    const info = card.querySelector('.info');
    const p = placeCards[i];
    if (info && p && p.mapName && !info.querySelector('.hiking-card-btn')) {
      const link = document.createElement('a');
      link.className = 'hiking-card-btn';
      link.href = `map.html?q=${encodeURIComponent(p.mapName)}`;
      link.target = '_blank';
      link.style.cssText = 'border:1.5px solid var(--brand);color:var(--brand);background:transparent;';
      link.innerHTML = '<i class="fas fa-map-marked-alt"></i> 睇地圖位置';
      info.appendChild(link);
    }
  });

  const modalOverlay = document.getElementById('placeModalOverlay');
  const modal = document.getElementById('placeModal');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');
  let currentIndex = 0;

  function showPlaceModal(index) {
    const card = placeCards[index];
    if (!card) return;
    currentIndex = index;
    modalContent.innerHTML = `
      <img src="${card.imgSrc}" alt="${card.imgAlt}" />
      <h3>${card.title}</h3>
      <div class="modal-tags">${card.tags}</div>
      <p class="modal-desc">${card.desc}</p>
      <div class="modal-tips">${card.tips}</div>
      <div class="modal-actions">
        ${card.pageLink ? `<a href="${card.pageLink}" class="modal-map-link"><i class="fas fa-book-open"></i> 完整攻略</a>` : ''}
        <a href="map.html?q=${encodeURIComponent(card.mapName)}" class="modal-map-link" target="_blank">
          <i class="fas fa-map-marked-alt"></i> 睇地圖位置
        </a>
      </div>
    `;
    modalOverlay.classList.add('open');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function hidePlaceModal() {
    modalOverlay.classList.remove('open');
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.place-card').forEach((card, i) => {
    card.addEventListener('click', () => showPlaceModal(i));
  });

  if (modalClose) modalClose.addEventListener('click', hidePlaceModal);
  if (modalOverlay) modalOverlay.addEventListener('click', hidePlaceModal);
  if (modalPrev) modalPrev.addEventListener('click', () => {
    let idx = currentIndex - 1;
    if (idx < 0) idx = placeCards.length - 1;
    showPlaceModal(idx);
  });
  if (modalNext) modalNext.addEventListener('click', () => {
    let idx = currentIndex + 1;
    if (idx >= placeCards.length) idx = 0;
    showPlaceModal(idx);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hidePlaceModal();
    const mOpen = modal?.classList.contains('open');
    if (e.key === 'ArrowLeft' && mOpen) modalPrev?.click();
    if (e.key === 'ArrowRight' && mOpen) modalNext?.click();
  });

});
