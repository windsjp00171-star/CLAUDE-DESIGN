(function () {
  var D = window.PORTFOLIO;
  if (!D) return;

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    for (var k in attrs || {}) n.setAttribute(k, attrs[k]);
    if (html != null) n.textContent = html;
    return n;
  }
  function list(items) {
    var ul = el('ul');
    items.forEach(function (t) { ul.appendChild(el('li', null, t)); });
    return ul;
  }
  var NS = 'http://www.w3.org/2000/svg';
  function icon(d) {
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('class', 'ico'); svg.setAttribute('aria-hidden', 'true');
    var path = document.createElementNS(NS, 'path'); path.setAttribute('d', d); svg.appendChild(path);
    return svg;
  }
  var EXT = 'M7 17L17 7M9 7h8v8';
  var X = 'M6 6l12 12M18 6L6 18';
  function link(href, text, cls) {
    var a = el('a', { href: href, target: '_blank', rel: 'noopener' }, text + ' ');
    a.appendChild(icon(EXT));
    if (cls) a.className = cls;
    return a;
  }

  var root = document.getElementById('decks-root');
  var rooms = {};
  var open = null;

  D.decks.forEach(function (deck) {
    var sec = el('div', { 'class': 'deck' });
    var title = el('div', { 'class': 'deck-title' });
    title.appendChild(el('h3', null, deck.name + ' · ' + deck.label));
    title.appendChild(el('span', { 'class': 'measure' }, deck.projects.length + ' 艙'));
    sec.appendChild(title);

    var grid = el('div', { 'class': 'deck-grid' });
    var panel = el('div', { 'class': 'panel', role: 'region', hidden: '' });
    panel.id = 'panel-' + deck.id;

    deck.projects.forEach(function (p) {
      var b = el('button', { type: 'button', 'class': 'room', 'data-w': p.weight, 'aria-expanded': 'false', 'aria-controls': panel.id });
      if (p.isPrivate) b.classList.add('private');
      b.appendChild(el('span', { 'class': 'room-name' }, p.name));
      b.appendChild(el('span', { 'class': 'room-tag' }, p.tagline));
      b.addEventListener('click', function () { toggle(p, b, panel); });
      rooms[p.id] = { p: p, b: b, panel: panel };
      grid.appendChild(b);
    });

    grid.appendChild(panel);
    sec.appendChild(grid);
    root.appendChild(sec);
  });

  function place(b, panel) {
    var siblings = Array.prototype.slice.call(b.parentNode.querySelectorAll('.room'));
    var last = b;
    siblings.forEach(function (r) { if (r.offsetTop === b.offsetTop) last = r; });
    last.parentNode.insertBefore(panel, last.nextSibling);
  }
  window.addEventListener('resize', function () { var r = rooms[open]; if (r) place(r.b, r.panel); });

  function fill(panel, p) {
    panel.textContent = '';
    panel.setAttribute('aria-label', p.name);
    var head = el('div', { 'class': 'panel-head' });
    var t = el('div');
    t.appendChild(el('h4', null, p.name));
    t.appendChild(el('p', { 'class': 'tagline' }, p.tagline));
    head.appendChild(t);
    var close = el('button', { type: 'button', 'class': 'panel-close' }, '收起 ');
    close.appendChild(icon(X));
    close.addEventListener('click', function () { var r = rooms[open]; if (r) toggle(r.p, r.b, r.panel); r && r.b.focus(); });
    head.appendChild(close);
    panel.appendChild(head);

    var cols = el('div', { 'class': 'cols' });
    var a = el('div');
    a.appendChild(el('h5', null, '專業'));
    a.appendChild(list(p.pro));
    var f = el('div', { 'class': 'faith' });
    f.appendChild(el('h5', null, '信仰'));
    f.appendChild(el('p', null, p.faith));
    cols.appendChild(a);
    cols.appendChild(f);
    panel.appendChild(cols);

    var tags = el('div', { 'class': 'tags' });
    p.tags.forEach(function (x) { tags.appendChild(el('span', null, x)); });
    panel.appendChild(tags);

    var links = el('div', { 'class': 'links' });
    if (p.liveUrl) links.appendChild(link(p.liveUrl, p.liveLabel || '立即體驗 ↗', 'btn'));
    if (p.repoUrl) links.appendChild(link(p.repoUrl, '看原始碼 ↗', 'plain'));
    if (p.demoUrl) links.appendChild(link(p.demoUrl, p.demoLabel || '看 Demo ↗', 'plain'));
    if (p.isPrivate) links.appendChild(el('span', { 'class': 'note' }, '私有專案：不提供原始碼，內容為功能與技術摘要。'));
    panel.appendChild(links);
  }

  function close(id) {
    var r = rooms[id];
    if (!r) return;
    r.b.setAttribute('aria-expanded', 'false');
    r.panel.hidden = true;
  }

  function toggle(p, b, panel) {
    if (open === p.id) { close(p.id); open = null; history.replaceState(null, '', location.pathname + location.search); return; }
    if (open) close(open);
    open = p.id;
    b.setAttribute('aria-expanded', 'true');
    fill(panel, p);
    place(b, panel);
    panel.hidden = false;
    history.replaceState(null, '', '#' + p.id);
    var smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    panel.scrollIntoView({ block: 'nearest', behavior: smooth ? 'smooth' : 'auto' });
  }

  if (location.hash && rooms[location.hash.slice(1)]) {
    var r = rooms[location.hash.slice(1)];
    toggle(r.p, r.b, r.panel);
  }

  var o = document.getElementById('owner-list');
  D.owner.forEach(function (t) { o.appendChild(el('li', null, t)); });
  var a = document.getElementById('ai-list');
  D.ai.forEach(function (t) { a.appendChild(el('li', null, t)); });

  var sr = document.getElementById('stack-root');
  D.stack.forEach(function (row) {
    var tr = el('tr');
    tr.appendChild(el('td', null, row[0]));
    tr.appendChild(el('td', null, row[1]));
    tr.appendChild(el('td', null, row[2]));
    sr.appendChild(tr);
  });

  var sec = document.getElementById('sec-root');
  D.security.forEach(function (s) {
    var li = el('li');
    li.appendChild(el('b', null, s[0]));
    li.appendChild(el('span', null, s[1]));
    sec.appendChild(li);
  });

  console.log('%c會打開 console 的你，多半是同行。\n「義人要發旺如棕樹」· 詩篇 92:12\n想合作／接案：' + D.email, 'font-size:13px;line-height:1.7;');
})();
