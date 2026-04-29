(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  root.classList.add('motion-ready');

  if (reducedMotion) {
    root.classList.add('reduce-motion');
    return;
  }

  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle && !heroTitle.dataset.split) {
    const words = heroTitle.textContent.trim().split(/\s+/);
    heroTitle.innerHTML = words
      .map((word, index) => `<span class="word" style="--i:${index}">${word}</span>`)
      .join(' ');
    heroTitle.dataset.split = 'true';
    requestAnimationFrame(() => heroTitle.classList.add('words-ready'));
  }

  const revealItems = Array.from(document.querySelectorAll(
    '.page-intro, .section, .case-hero, .case-section, .project-card, .statement-grid article, .timeline article, .placeholder, .note, .lead, .actions'
  ));

  revealItems.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.setProperty('--delay', `${Math.min((index % 5) * 72, 288)}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
  );

  revealItems.forEach((el) => observer.observe(el));
})();


document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(c => observer.observe(c));
});
