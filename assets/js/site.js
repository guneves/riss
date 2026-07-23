(() => {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
  };

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      body.classList.toggle('menu-open', isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', (event) => {
      if (!nav.classList.contains('open')) return;
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
  }

  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  progress.innerHTML = '<span></span>';
  body.prepend(progress);
  const progressBar = progress.firstElementChild;

  const scrollTopButton = document.createElement('button');
  scrollTopButton.className = 'scroll-top';
  scrollTopButton.type = 'button';
  scrollTopButton.setAttribute('aria-label', 'Back to top');
  scrollTopButton.innerHTML = '<span aria-hidden="true">↑</span>';
  body.append(scrollTopButton);

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  let scrollTicking = false;
  const updateScrollUI = () => {
    const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const percentage = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
    progressBar.style.transform = `scaleX(${percentage})`;
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
    scrollTopButton.classList.toggle('is-visible', window.scrollY > 520);
    scrollTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScrollUI);
      scrollTicking = true;
    }
  }, { passive: true });
  updateScrollUI();

  const revealTargets = document.querySelectorAll([
    '.hero-copy > *',
    '.hero-art',
    '.stat',
    '.page-hero .container > *',
    '.section h2',
    '.section .lead',
    '.card',
    '.person-card',
    '.session',
    '.info-item',
    '.feature-image',
    '.quote-card',
    '.notice',
    '.form-card',
    '.logo-row img',
    '.venue-gallery img'
  ].join(','));

  revealTargets.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealTargets.forEach((element) => revealObserver.observe(element));
  }

  const hero = document.querySelector('.hero');
  const heroArt = document.querySelector('.hero-art');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (hero && heroArt && finePointer && !reduceMotion) {
    hero.addEventListener('pointermove', (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      heroArt.style.setProperty('--tilt-x', `${x * 4}deg`);
      heroArt.style.setProperty('--tilt-y', `${y * -4}deg`);
      heroArt.style.setProperty('--move-x', `${x * 10}px`);
      heroArt.style.setProperty('--move-y', `${y * 8}px`);
    });

    hero.addEventListener('pointerleave', () => {
      heroArt.style.setProperty('--tilt-x', '0deg');
      heroArt.style.setProperty('--tilt-y', '0deg');
      heroArt.style.setProperty('--move-x', '0px');
      heroArt.style.setProperty('--move-y', '0px');
    });
  }

  const accordionItems = [];
  document.querySelectorAll('.day').forEach((day, index) => {
    const dayHeader = day.querySelector('.day-header');
    const sessions = Array.from(day.querySelectorAll(':scope > .session'));
    if (!dayHeader || sessions.length === 0) return;

    const content = document.createElement('div');
    content.className = 'day-content';
    content.id = `program-day-${index + 1}`;
    sessions.forEach((session) => content.appendChild(session));
    day.appendChild(content);

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'day-toggle';
    toggle.setAttribute('aria-controls', content.id);
    toggle.innerHTML = '<span class="sr-only">Toggle day schedule</span><span class="day-toggle-icon" aria-hidden="true">⌄</span>';
    dayHeader.appendChild(toggle);

    const setExpanded = (expanded, animate = true) => {
      toggle.setAttribute('aria-expanded', String(expanded));
      day.classList.toggle('is-collapsed', !expanded);
      content.setAttribute('aria-hidden', String(!expanded));

      if (!animate || reduceMotion) content.style.transition = 'none';
      content.style.maxHeight = expanded ? `${content.scrollHeight}px` : '0px';
      if (!animate || reduceMotion) {
        window.requestAnimationFrame(() => {
          content.style.transition = '';
        });
      }
    };

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') !== 'true';
      setExpanded(expanded);
    });

    const initiallyExpanded = !(window.innerWidth <= 680 && index > 0);
    setExpanded(initiallyExpanded, false);
    accordionItems.push({ content, toggle, setExpanded });
  });

  window.addEventListener('resize', () => {
    accordionItems.forEach(({ content, toggle }) => {
      if (toggle.getAttribute('aria-expanded') === 'true') {
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    });
  });

  document.querySelectorAll('.button').forEach((button) => {
    button.addEventListener('pointerdown', (event) => {
      if (reduceMotion) return;
      const ripple = document.createElement('span');
      const bounds = button.getBoundingClientRect();
      const size = Math.max(bounds.width, bounds.height) * 1.8;
      ripple.className = 'button-ripple';
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - bounds.left - size / 2}px`;
      ripple.style.top = `${event.clientY - bounds.top - size / 2}px`;
      button.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    });
  });

  document.querySelectorAll('[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.querySelector('.form-status');
      if (status) {
        status.textContent = 'Template submission captured locally. Connect this form to your preferred backend before publishing.';
        status.classList.remove('show');
        window.requestAnimationFrame(() => status.classList.add('show'));
        status.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
      }
      form.reset();
    });
  });

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
