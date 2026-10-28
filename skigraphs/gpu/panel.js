(() => {
  const panel = document.querySelector('.panel');
  if (!panel) return;
  const KEY = 'skigraphs-panel-collapsed';
  const top = document.createElement('div');
  top.className = 'panel-top';
  const h1 = panel.querySelector('h1');
  top.innerHTML = '<a class="panel-home" href="/">← Strona główna</a><span class="panel-name"></span><button class="panel-toggle" type="button"></button>';
  top.querySelector('.panel-name').textContent = h1 ? h1.textContent : '';
  const btn = top.querySelector('button');
  const set = (collapsed, save) => {
    panel.classList.toggle('collapsed', collapsed);
    btn.textContent = collapsed ? '▤' : '–';
    const label = collapsed ? 'Rozwiń ustawienia' : 'Zwiń ustawienia';
    btn.setAttribute('aria-label', label);
    btn.title = label;
    btn.setAttribute('aria-expanded', String(!collapsed));
    if (save) try { localStorage.setItem(KEY, collapsed ? '1' : '0'); } catch {}
  };
  btn.addEventListener('click', () => set(!panel.classList.contains('collapsed'), true));
  panel.insertBefore(top, panel.firstChild);
  let stored = null;
  try { stored = localStorage.getItem(KEY); } catch {}
  set(stored === null ? matchMedia('(max-width:600px)').matches : stored === '1');
})();
