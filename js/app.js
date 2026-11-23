(function () {
  var D = window.PORTFOLIO;
  if (!D) return;
  // 即時數字（data/live.js，每小時自動更新）。沒有就只顯示手寫內容。
  var L = window.PORTFOLIO_LIVE || null;
  function live(id) { return (L && L.projects && L.projects[id]) || null; }
  function num(n) { return Number(n).toLocaleString('en-US'); }
  function cn(n) {
    var d = '零一二三四五六七八九';
    if (n < 10) return d[n];
    if (n < 20) return '十' + (n % 10 ? d[n % 10] : '');
    if (n < 100) return d[Math.floor(n / 10)] + '十' + (n % 10 ? d[n % 10] : '');
    return String(n);
  }

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
    var a = el('a', { href: href, target: '_blank', rel: 'noopener' }, text);
    a.appendChild(icon(EXT));
    if (cls) a.className = cls;
    return a;
  }

  var grid = document.getElementById('grid');
  var panel = el('div', { 'class': 'panel', role: 'region', id: 'detail', hidden: '' });
  var rooms = {};
  var open = null;
  var all = [];
  D.decks.forEach(function (deck) {
    deck.projects.forEach(function (p, i) { all.push({ p: p, deck: deck, i: all.length }); });
  });
  // 卡片大小即重要性：主力作品排前面，同級照資料檔順序
  all.sort(function (a, b) { return (b.p.weight - a.p.weight) || (a.i - b.i); });

  all.forEach(function (row) {
    var p = row.p;
    var b = el('button', { type: 'button', 'class': 'tile', 'data-deck': row.deck.id, 'data-w': p.weight, 'aria-expanded': 'false', 'aria-controls': 'detail' });
    var top = el('span', { 'class': 'tile-top' });
    top.appendChild(el('span', { 'class': 'tile-name' }, p.name));
    top.appendChild(el('span', { 'class': 'badge' + (p.isPrivate ? '' : ' is-public') }, p.isPrivate ? '私有' : '公開'));
    b.appendChild(top);
    b.appendChild(el('span', { 'class': 'tile-kind' }, p.kind));
    b.appendChild(el('span', { 'class': 'tile-tag' }, p.tagline));
    if (p.weight === 3 && p.pro && p.pro[0]) b.appendChild(el('span', { 'class': 'tile-pro' }, p.pro[0]));
    var meta = el('span', { 'class': 'tile-meta' });
    meta.appendChild(el('span', { 'class': 'tile-tech' }, p.tags.slice(0, 3).join(' · ')));
    var lv = live(p.id);
    if (lv && lv.updated) meta.appendChild(el('span', { 'class': 'num' }, lv.updated));
    b.appendChild(meta);
    b.addEventListener('click', function () { toggle(p, b, panel); });
    rooms[p.id] = { p: p, b: b, panel: panel };
    grid.appendChild(b);
  });
  grid.appendChild(panel);

  // 篩選：全部 + 每個類別
  var filters = document.getElementById('filters');
  var cats = [{ id: 'all', label: '全部', n: all.length }].concat(D.decks.map(function (d) { return { id: d.id, label: d.label, n: d.projects.length }; }));
  cats.forEach(function (c) {
    var f = el('button', { type: 'button', 'class': 'filter', 'aria-pressed': c.id === 'all' ? 'true' : 'false' });
    f.appendChild(document.createTextNode(c.label));
    f.appendChild(el('span', { 'class': 'num' }, String(c.n)));
    f.addEventListener('click', function () {
      if (open) { close(open); open = null; history.replaceState(null, '', location.pathname + location.search); }
      Array.prototype.forEach.call(filters.children, function (x) { x.setAttribute('aria-pressed', x === f ? 'true' : 'false'); });
      Object.keys(rooms).forEach(function (id) {
        var t = rooms[id].b;
        t.hidden = c.id !== 'all' && t.getAttribute('data-deck') !== c.id;
      });
    });
    filters.appendChild(f);
  });

  function place(b, panel) {
    var siblings = Array.prototype.slice.call(grid.querySelectorAll('.tile:not([hidden])'));
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
    var close = el('button', { type: 'button', 'class': 'panel-close', 'aria-label': '收起 ' + p.name }, '收起 ');
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

    var lv = live(p.id);
    if (lv) {
      var box = el('div', { 'class': 'live' });
      var facts = el('p');
      facts.appendChild(document.createTextNode('開發紀錄 '));
      facts.appendChild(el('span', { 'class': 'num' }, num(lv.commits)));
      facts.appendChild(document.createTextNode(' 次 commit'));
      if (lv.updated) { facts.appendChild(document.createTextNode('，最近一次 ')); facts.appendChild(el('span', { 'class': 'num' }, lv.updated)); }
      box.appendChild(facts);
      if (lv.notes && lv.notes.length) {
        box.appendChild(el('h5', null, '最近的更新' + (lv.notesDate ? '（' + lv.notesDate + '）' : '')));
        box.appendChild(list(lv.notes));
      }
      panel.appendChild(box);
    }

    var links = el('div', { 'class': 'links' });
    if (p.liveUrl) links.appendChild(link(p.liveUrl, p.liveLabel || '立即體驗', 'btn'));
    if (p.repoUrl) links.appendChild(link(p.repoUrl, '看原始碼', 'btn btn-ghost'));
    if (p.demoUrl) links.appendChild(link(p.demoUrl, p.demoLabel || '看 Demo', 'btn btn-ghost'));
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

  // 作品數由資料算，不寫死在文案裡
  var total = 0;
  D.decks.forEach(function (d) { total += d.projects.length; });
  Array.prototype.forEach.call(document.querySelectorAll('[data-count]'), function (n) { n.textContent = cn(total); });

  if (L) {
    if (L.generatedAt) {
      var rev = document.getElementById('rev-date');
      try { rev.textContent = new Date(L.generatedAt.replace('Z', ':00Z')).toLocaleDateString('sv-SE', { timeZone: 'Asia/Taipei' }) + ' 自動更新'; } catch (e) {}
    }
    if (L.totals) {
      document.getElementById('rev-commits').textContent = num(L.totals.commits) + ' 次 commits（' + L.totals.repos + ' 個 repo）';
    }
    // 最近的更新：依日期排，點名稱打開那個作品
    var rows = [];
    Object.keys(rooms).forEach(function (id) { var x = live(id); if (x && x.updated) rows.push({ id: id, x: x }); });
    rows.sort(function (a, b) { return a.x.updated < b.x.updated ? 1 : a.x.updated > b.x.updated ? -1 : 0; });
    var logRoot = document.getElementById('log-root');
    if (rows.length && logRoot) {
      rows.slice(0, 8).forEach(function (row) {
        var li = el('li');
        li.appendChild(el('span', { 'class': 'num' }, row.x.updated));
        var go = el('a', { href: '#' + row.id }, rooms[row.id].p.name);
        go.addEventListener('click', function (e) {
          e.preventDefault();
          var r = rooms[row.id];
          if (r.b.hidden) filters.firstChild.click();
          if (open !== row.id) toggle(r.p, r.b, r.panel);
          r.b.focus();
        });
        li.appendChild(go);
        li.appendChild(el('span', { 'class': 'log-note' }, row.x.notes && row.x.notes[0] ? row.x.notes[0] : (row.x.public ? '' : '私有專案，只公開更新日期')));
        logRoot.appendChild(li);
      });
      document.getElementById('log').hidden = false;
    }
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
    var h = el('b', null, s[0]);
    h.insertBefore(icon('M5 12.5l4.5 4.5L19 7.5'), h.firstChild);
    li.appendChild(h);
    li.appendChild(el('span', null, s[1]));
    sec.appendChild(li);
  });

  console.log('%c會打開 console 的你，多半是同行。\n「義人要發旺如棕樹」· 詩篇 92:12\n想合作／接案：' + D.email, 'font-size:13px;line-height:1.7;');
})();
