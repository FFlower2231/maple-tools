/* ===== 공통 스크립트 ===== */

// 다크모드: 시스템 설정 따르되, 사용자가 토글하면 그 선택을 메모리에 유지
(function () {
  var saved = null; // localStorage는 사용하지 않음 (배포 환경에 따라 차단될 수 있음)
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);

  window.toggleTheme = function () {
    var cur = document.documentElement.getAttribute('data-theme');
    var next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    var btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
  };

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  });
})();

// 클립보드 복사 헬퍼: copyText(text, 버튼엘리먼트)
window.copyText = function (text, btn) {
  if (!text) return;
  var done = function () {
    if (!btn) return;
    var old = btn.textContent;
    btn.textContent = '복사됨 ✓';
    setTimeout(function () { btn.textContent = old; }, 1200);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(fallback);
  } else { fallback(); }
  function fallback() {
    var ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) {}
    document.body.removeChild(ta);
  }
};

// ===== 공통 사이드바 메뉴 (모든 페이지에 자동 주입) =====
(function () {
  // 도구 목록 (루트 기준 경로). 새 도구는 여기만 추가하면 전 페이지 메뉴에 반영됩니다.
  var NAV = [
    { group: null, items: [ { href: 'index.html', label: '홈', icon: '🏠' } ] },
    { group: '메이플스토리 계산기', items: [
      { href: 'tools/cube-calculator.html', label: '큐브 기댓값 계산기', icon: '🎲' },
      { href: 'tools/starforce-calculator.html', label: '스타포스 강화 계산기', icon: '⭐' },
      { href: 'tools/potion-calculator.html', label: '비약 순이익 계산기', icon: '⚗️' }
    ]}
  ];

  function build() {
    var inTools = /(^|\/)tools\//.test(location.pathname);
    var prefix = inTools ? '../' : '';
    var cur = (location.pathname.split('/').pop() || 'index.html');
    if (cur === '') cur = 'index.html';

    var html = '<div class="sb-brand"><span class="logo">🛠️</span> 불편함 해결소</div><nav>';
    NAV.forEach(function (sec) {
      if (sec.group) html += '<div class="sb-group">' + sec.group + '</div>';
      sec.items.forEach(function (it) {
        var leaf = it.href.split('/').pop();
        var active = (leaf === cur) ? ' active' : '';
        html += '<a class="sb-link' + active + '" href="' + prefix + it.href + '">' +
          '<span class="sb-ico">' + it.icon + '</span>' + it.label + '</a>';
      });
    });
    html += '</nav>';

    var aside = document.createElement('aside');
    aside.className = 'app-sidebar';
    aside.id = 'appSidebar';
    aside.innerHTML = html;

    var toggle = document.createElement('button');
    toggle.className = 'sidebar-toggle';
    toggle.setAttribute('aria-label', '메뉴 열기');
    toggle.innerHTML = '☰';

    var overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';

    var mq = window.matchMedia('(min-width: 900px)');
    function setOpen(o) {
      aside.classList.toggle('open', o);
      document.body.classList.toggle('sidebar-open', o);
      overlay.classList.toggle('show', o && !mq.matches); // 오버레이는 모바일에서만
    }
    toggle.addEventListener('click', function () {
      setOpen(!aside.classList.contains('open'));
    });
    overlay.addEventListener('click', function () { setOpen(false); });
    // 메뉴 항목 클릭 시 모바일에서는 닫기 (데스크톱은 유지)
    aside.addEventListener('click', function (e) {
      if (e.target.closest('.sb-link') && !mq.matches) setOpen(false);
    });

    document.body.appendChild(aside);
    document.body.appendChild(overlay);
    document.body.appendChild(toggle);
    document.body.classList.add('has-sidebar');

    // 초기 상태: 데스크톱은 열림, 모바일은 닫힘
    setOpen(mq.matches);
    // 화면 크기 전환 시 기본 상태로 맞춤
    if (mq.addEventListener) mq.addEventListener('change', function (e) { setOpen(e.matches); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else { build(); }
})();
