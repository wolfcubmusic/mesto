/* МЕСТО: сценарии, карточки коллекции и локальная подборка. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];
  const scenes = {
    work: { label: 'Работа', title: 'Место для идей', description: 'Стул — у стола, ноутбук — под рукой. Пуф остаётся отдельным местом рядом с диваном.', count: '01 / 03', ottoman: 'translate(50 180)', chair: 'translate(338 290)' },
    guests: { label: 'Гости', title: 'Больше места для своих', description: 'Пуф — отдельное сиденье, стул развёрнут к дивану. Можно сесть ближе и провести вечер вместе.', count: '02 / 03', ottoman: 'translate(155 200)', chair: 'translate(250 225) rotate(90 19 17.5)' },
    rest: { label: 'Отдых', title: 'Домой — выдыхать', description: 'Пуф приставлен к правому сиденью дивана. Устроиться с книгой, вытянуть ноги, отпустить день.', count: '03 / 03', ottoman: 'translate(140 135)', chair: 'translate(338 290)' }
  };
  function setScene(key) {
    if (!scenes[key]) return;
    const scene = scenes[key];
    all('[data-scene]').forEach(tab => { const selected = tab.dataset.scene === key; tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1; });
    all('[data-image]').forEach(img => { const active = img.dataset.image === key; img.classList.toggle('is-active', active); img.setAttribute('aria-hidden', String(!active)); });
    all('[data-plan-scene]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.planScene === key)));
    $('#scenario-panel').setAttribute('aria-labelledby', 'tab-' + key);
    $('#scene-title').textContent = scene.title;
    $('#scene-description').textContent = scene.description;
    $('#scene-count').textContent = scene.count;
    $('#plan-label').textContent = scene.label;
    $('#plan-svg-title').textContent = 'Схема расстановки — ' + scene.label.toLowerCase();
    $('#plan-svg-desc').textContent = scene.description + ' Диван, стол и тумба остаются на месте. Схема условная.';
    $('#plan-ottoman').setAttribute('transform', scene.ottoman);
    $('#plan-chair').setAttribute('transform', scene.chair);
  }
  const tabs = all('[data-scene]');
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setScene(tab.dataset.scene));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); setScene(tabs[next].dataset.scene); tabs[next].focus(); }
    });
  });
  all('[data-plan-scene]').forEach(button => button.addEventListener('click', () => setScene(button.dataset.planScene)));
  setScene('work');

  const toggle = $('.menu-toggle');
  function closeMenu() { $('#mobile-nav').hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; $('#mobile-nav').hidden = !open; toggle.setAttribute('aria-expanded', String(open)); });
  all('#mobile-nav a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('#mobile-nav').hidden) { closeMenu(); toggle.focus(); } });
  window.matchMedia('(min-width: 992px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  const products = {
    section: { name: 'Диванная секция', size: '100 × 95 × 80 см', image: 'section', description: 'Одна секция — одно место. Две зеркальные секции образуют диван шириной 200 см с подлокотниками по краям.', specs: [['Назначение', 'Место для сидения и основа двухместного дивана.'], ['Обивка', 'Шалфейная матовая ткань полотняного переплетения, 100% полиэстер.'], ['Основа', 'Проектный каркас из берёзовой фанеры и бруса; поддерживающие ленты, пенополиуретан и полиэфирное волокно. Низкое дубовое основание.'], ['Геометрия', 'Высота посадки 42 см; полезная ширина сиденья 88 см, глубина 60 см; один внешний подлокотник 12 см.'], ['Расстановка', 'Открытая сторона для стыка. Нижние механические соединители предложены в концепции; конструкция узла ещё требует разработки. Спального механизма нет.']] },
    ottoman: { name: 'Пуф', size: '88 × 70 × 42 см', image: 'ottoman', description: 'Свободно стоящий предмет: отдельное сиденье для гостя или продолжение места для отдыха.', specs: [['Обивка', 'Та же шалфейная ткань и мягкое наполнение, что у диванной секции.'], ['Основа', 'Низкое дубовое основание, небольшие опоры без колёс.'], ['Расстановка', 'Переставляется вручную. Приставляется к правому сиденью дивана; общая глубина композиции — 165 см.'], ['Соединение', 'Свободная постановка рядом с диваном, без магнитного крепления.']] },
    desk: { name: 'Стол', size: '140 × 65 × 75 см', image: 'desk', description: 'Простая рабочая поверхность на двух широких боковых панельных опорах.', specs: [['Материал', 'Фанера с натуральным дубовым шпоном и дубовой кромкой.'], ['Отделка', 'Светлый дуб, прозрачная матовая отделка.'], ['Геометрия', 'Столешница и опоры толщиной 4 см; просвет под столом 71 см.'], ['Конструкция', 'П-образная форма, без ящиков и регулировки высоты.'], ['Расстановка', 'Остаётся на своём месте во всех трёх сценариях; меняется положение стула.']] },
    storage: { name: 'Хранение', size: '160 × 40 × 75 см', image: 'storage', description: 'Один корпус, три закрытых отделения. Низкая тумба рядом с диваном и рабочим местом.', specs: [['Материал', 'Фанера с натуральным дубовым шпоном, прозрачная матовая отделка.'], ['Отделения', 'Три двери; в каждом отделении предусмотрена одна регулируемая полка.'], ['Детали', 'Без выступающих ручек: скрытый верхний захват. Утопленный цоколь высотой 5 см.'], ['Расстановка', 'Тумба остаётся на своём месте при смене сценария.']] }
  };
  const dialog = $('#product-dialog');
  let opener;
  all('[data-product]').forEach(button => button.addEventListener('click', () => {
    const product = products[button.dataset.product];
    opener = button;
    $('#product-dialog-title').textContent = product.name;
    $('#dialog-image').src = 'assets/' + product.image + '.webp';
    $('#dialog-image').alt = product.name + ' — предметный кадр коллекции МЕСТО';
    $('#dialog-size').textContent = product.size + ' · ширина × глубина × высота';
    $('#dialog-description').textContent = product.description;
    $('#dialog-spec').replaceChildren();
    product.specs.forEach(([term, description]) => { const dt = document.createElement('dt'); const dd = document.createElement('dd'); dt.textContent = term; dd.textContent = description; $('#dialog-spec').append(dt, dd); });
    dialog.showModal();
  }));
  $('.dialog-close').addEventListener('click', () => dialog.close());
  $('#dialog-select').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { if (opener) opener.focus(); });

  const recommendations = {
    work: { title: 'Место для идей', description: 'Начните со стола и хранения. Две диванные секции и пуф добавят место для паузы и встреч.', keys: ['desk', 'storage', 'section', 'ottoman'] },
    guests: { title: 'Больше места для своих', description: 'Две зеркальные секции составят диван, пуф станет отдельным сиденьем. Стол и тумба дополнят комнату.', keys: ['section', 'ottoman', 'storage', 'desk'] },
    rest: { title: 'Домой — выдыхать', description: 'Две зеркальные секции и пуф дадут место для отдыха с вытянутыми ногами. Хранение поможет убрать повседневные вещи.', keys: ['section', 'ottoman', 'storage'] }
  };
  let selectionText = '';
  $('#selection-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = $('#visitor-name').value.trim();
    $('#visitor-name').setCustomValidity(name ? '' : 'Введите имя');
    if (!$('#selection-form').reportValidity()) return;
    const data = new FormData(event.currentTarget);
    const choice = recommendations[data.get('priority')] || recommendations.work;
    $('#result-title').textContent = name + ', ' + choice.title.toLowerCase();
    $('#result-description').textContent = choice.description;
    $('#result-items').replaceChildren();
    const lines = choice.keys.map(key => { const product = products[key]; return (key === 'section' ? 'Диванная секция × 2' : product.name) + ' — ' + product.size; });
    lines.forEach(line => { const item = document.createElement('li'); item.textContent = line; $('#result-items').append(item); });
    selectionText = ['МЕСТО — концептуальная подборка', 'Имя: ' + name, 'Сценарий: ' + choice.title, choice.description, '', ...lines, '', 'Размеры: ширина × глубина × высота.', 'О комнате: ' + (String(data.get('room')).trim() || 'не указано'), 'Контакт: ' + (String(data.get('contact')).trim() || 'не указан'), '', 'Параметры вымышленного бренда. Подборка создана локально, данные не отправлены.'].join('\n');
    $('#selection-result').hidden = false;
    $('#selection-result').focus();
  });
  $('#visitor-name').addEventListener('input', () => $('#visitor-name').setCustomValidity(''));
  $('#download-selection').addEventListener('click', () => {
    if (!selectionText) return;
    const url = URL.createObjectURL(new Blob([selectionText], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'MESTO-podborka.txt'; document.body.append(link); link.click(); link.remove(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
})();
