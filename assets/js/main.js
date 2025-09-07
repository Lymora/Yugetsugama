// STEP2: filters (category + technique/kiln) and menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('site-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.style.display = expanded ? 'none' : 'flex';
    });
  }

  const buttons = document.querySelectorAll('.filter-btn');
  const techChecks = document.querySelectorAll('.tech-check');
  const kilnChecks = document.querySelectorAll('.kiln-check');
  const clearBtn = document.querySelector('.clear-filters');
  const cards = document.querySelectorAll('.card');

  function applyFilters() {
    const activeBtn = document.querySelector('.filter-btn.active');
    const cat = activeBtn ? activeBtn.dataset.filter : 'all';
    const techSelected = Array.from(techChecks).filter(c => c.checked).map(c => c.value);
    const kilnSelected = Array.from(kilnChecks).filter(c => c.checked).map(c => c.value);

    cards.forEach(card => {
      const matchCat = (cat === 'all' || card.dataset.category === cat);
      const matchTech = (techSelected.length === 0 || techSelected.includes(card.dataset.tech));
      const matchKiln = (kilnSelected.length === 0 || kilnSelected.includes(card.dataset.kiln));
      card.style.display = (matchCat && matchTech && matchKiln) ? '' : 'none';
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
      btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
      applyFilters();
    });
  });
  [...techChecks, ...kilnChecks].forEach(chk => chk.addEventListener('change', applyFilters));
  if (clearBtn) clearBtn.addEventListener('click', () => {
    techChecks.forEach(c => c.checked = false);
    kilnChecks.forEach(c => c.checked = false);
    document.querySelector('.filter-btn[data-filter="all"]').click();
  });
});


// --- 説明表示切替（詩 / 工芸） ---
document.addEventListener('DOMContentLoaded', () => {
  const viewButtons = document.querySelectorAll('.view-btn');
  const descs = () => document.querySelectorAll('.item-desc');

  function setView(mode) {
    descs().forEach(p => {
      const story = p.getAttribute('data-desc-story') || '';
      const craft = p.getAttribute('data-desc-craft') || '';
      p.textContent = (mode === 'craft') ? craft : story;
    });
    viewButtons.forEach(b => {
      const active = b.dataset.view === mode;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
  }

  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => setView(btn.dataset.view));
  });

  // 初期は「詩」を表示
  setView('story');
});

document.addEventListener('DOMContentLoaded', () => {
  // alt自動設定（別リスナーでもOK）
  document.querySelectorAll('.card').forEach(card => {
    const cat = card.dataset.category;
    const img = card.querySelector('.thumb img');
    if (img && cat) img.alt = `${cat}（画像準備中）`;
  });
});