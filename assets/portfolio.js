/* Progressive enhancements: all portfolio content is readable without JavaScript. */
(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('js');
  const find = (selector) => document.querySelector(selector);
  const all = (selector) => [...document.querySelectorAll(selector)];

  // Theme preference.
  const themeButton = find('#themeToggle');
  function updateThemeLabel() {
    themeButton.textContent = root.dataset.theme === 'dark' ? 'Light mode' : 'Dark mode';
  }
  themeButton.hidden = false;
  updateThemeLabel();
  themeButton.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('portfolio-theme', next); } catch (_) { /* Optional preference. */ }
    updateThemeLabel();
  });

  // Mobile navigation remains fully visible when JavaScript is unavailable.
  const menuButton = find('#menuToggle');
  const navigation = find('#siteNav');
  menuButton.hidden = false;
  function closeMenu() {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
  menuButton.addEventListener('click', () => {
    const open = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      closeMenu();
      menuButton.focus();
    }
  });

  // Announce copy success or failure without interrupting the page.
  const toast = find('#toast');
  let toastTimer;
  function announce(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }
  const copyButton = find('#copyEmail');
  const email = 'jonathan.a.pichardo2.mil@gmail.com';
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      announce('Email address copied.');
    } catch (_) {
      announce('Copy unavailable. Select the email address above to copy it.');
    }
  });
  const printButton = find('#printProfile');
  printButton.hidden = false;
  printButton.addEventListener('click', () => window.print());

  // A small explanatory schematic, not a representation of a live deployment.
  const schematicContent = {
    automation: ['Repeatable by design.', 'GitHub Actions automates rebuilding the containerized environment.'],
    compute: ['A containerized foundation.', 'Docker and Docker Compose run the training environment on Amazon EC2.'],
    control: ['Visibility. Access. Guardrails.', 'IAM controls access. CloudWatch and CloudTrail support monitoring and audit; Budgets and Lambda enforce a cost hard stop.']
  };
  find('.schematic-controls').hidden = false;
  const schematicButtons = all('[data-layer]');
  schematicButtons.forEach((button) => button.addEventListener('click', () => {
    schematicButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    const selected = schematicContent[button.dataset.layer];
    find('#layer-title').textContent = selected[0];
    find('#layer-copy').textContent = selected[1];
  }));

  // Capability filters never affect the independently featured project.
  const capabilityButtons = all('#map [data-filter]');
  const cards = all('#cards > .card');
  const count = find('#capCount');
  const reset = find('#showAll');
  const categories = {
    range: 'ranges and training',
    dco: 'defensive operations',
    integration: 'systems integration and sustainment',
    intel: 'intelligence and criminal analysis'
  };
  let activeFilter = 'all';
  function filterCapabilities(category) {
    activeFilter = category;
    let visible = 0;
    cards.forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.cat !== category;
      if (!card.hidden) visible += 1;
    });
    capabilityButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === category));
    });
    count.textContent = category === 'all'
      ? `Showing all ${cards.length} capabilities. Select an area to filter.`
      : `Showing ${visible} of ${cards.length} capabilities in ${categories[category]}.`;
    reset.hidden = category === 'all';
  }
  capabilityButtons.forEach((button) => button.addEventListener('click', () => {
    filterCapabilities(button.dataset.filter === activeFilter ? 'all' : button.dataset.filter);
  }));
  reset.addEventListener('click', () => filterCapabilities('all'));
  count.hidden = false;
  filterCapabilities('all');
  all('a[data-reveal]').forEach((link) => link.addEventListener('click', () => filterCapabilities(link.dataset.reveal)));
  // Deep links to an individual capability must also work after filtering.
  function revealHashTarget() {
    const id = location.hash.slice(1);
    const card = document.getElementById(id);
    if (card && card.matches('#cards > .card') && card.hidden) {
      filterCapabilities(card.dataset.cat);
      card.scrollIntoView({ block: 'start' });
    }
  }
  window.addEventListener('hashchange', revealHashTarget);
  revealHashTarget();

  // Engineering layers: content is initially visible without scripting.
  const layerButtons = all('#layers button[aria-controls]');
  const allLayers = find('#layersAll');
  function setLayer(button, open) {
    button.setAttribute('aria-expanded', String(open));
    document.getElementById(button.getAttribute('aria-controls')).hidden = !open;
  }
  function updateLayersLabel() {
    allLayers.textContent = layerButtons.every((button) => button.getAttribute('aria-expanded') === 'true')
      ? 'Collapse all layers' : 'Expand all layers';
  }
  layerButtons.forEach((button) => {
    setLayer(button, false);
    button.addEventListener('click', () => {
      setLayer(button, button.getAttribute('aria-expanded') !== 'true');
      updateLayersLabel();
    });
  });
  allLayers.hidden = false;
  allLayers.addEventListener('click', () => {
    const open = !layerButtons.every((button) => button.getAttribute('aria-expanded') === 'true');
    layerButtons.forEach((button) => setLayer(button, open));
    updateLayersLabel();
  });

  // Credential tabs use arrow-key navigation and retain every panel for printing.
  const tablist = find('#tablist');
  const tabs = all('#tablist [role="tab"]');
  function selectTab(selected, focus = false) {
    tabs.forEach((tab) => {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
    });
    if (focus) selected.focus();
  }
  tablist.hidden = false;
  all('.nojs-title').forEach((title) => title.classList.add('sr'));
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectTab(tabs[next], true);
      }
    });
  });
  selectTab(tabs[0]);

  // Native dialogs handle focus trapping and Escape. Return focus to the opener.
  all('.stat-btn[data-dialog]').forEach((tile) => {
    const dialog = document.getElementById(tile.dataset.dialog);
    if (!dialog || typeof dialog.showModal !== 'function') return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'stat-btn';
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', dialog.id);
    button.innerHTML = tile.innerHTML;
    tile.replaceWith(button);
    let returningToButton = true;
    button.addEventListener('click', () => {
      returningToButton = true;
      dialog.showModal();
    });
    dialog.querySelectorAll('[data-close]').forEach((close) => close.addEventListener('click', () => dialog.close()));
    dialog.querySelectorAll('[data-goto]').forEach((link) => link.addEventListener('click', () => {
      returningToButton = false;
      if (link.dataset.tab) selectTab(document.getElementById(link.dataset.tab));
      dialog.close();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
    }));
    let pointerStartedOutside = false;
    dialog.addEventListener('pointerdown', (event) => { pointerStartedOutside = event.target === dialog; });
    dialog.addEventListener('click', (event) => {
      const bounds = dialog.getBoundingClientRect();
      const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
      if (pointerStartedOutside && event.target === dialog && outside) dialog.close();
      pointerStartedOutside = false;
    });
    dialog.addEventListener('close', () => { if (returningToButton) button.focus(); });
  });

  // Highlight the section currently being read, once per animation frame.
  const navLinks = all('#siteNav a');
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href')).closest('section'));
  let scrollQueued = false;
  function markSection() {
    let active = -1;
    const position = window.scrollY + 140;
    sections.forEach((section, index) => { if (section.offsetTop <= position) active = index; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = sections.length - 1;
    navLinks.forEach((link, index) => {
      link.classList.toggle('active', index === active);
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollQueued = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(markSection);
    }
  }, { passive: true });
  window.addEventListener('resize', markSection);
  markSection();
})();
