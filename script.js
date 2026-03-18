const header = document.getElementById('header');
const stickyBar = document.getElementById('stickyBar');
let heroBottom = 0;

function updateHeroBottom() {
  const hero = document.getElementById('top');
  if (hero) heroBottom = hero.offsetTop + hero.offsetHeight;
}
updateHeroBottom();
window.addEventListener('resize', updateHeroBottom, { passive: true });

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
  if (stickyBar) {
    const ctaSection = document.getElementById('cta');
    const ctaTop = ctaSection ? ctaSection.getBoundingClientRect().top : Infinity;
    const pastHero = window.scrollY > heroBottom;
    const notAtCta = ctaTop > window.innerHeight * 0.5;
    stickyBar.classList.toggle('visible', pastHero && notAtCta);
  }
  const floatSideCta = document.getElementById('floatSideCta');
  if (floatSideCta) {
    floatSideCta.classList.toggle('visible', window.scrollY > heroBottom * 0.6);
  }
}, { passive: true });

function toggleMenu() {
  const nav = document.getElementById('headerNav');
  const btn = document.getElementById('hamburger');
  const overlay = document.getElementById('navOverlay');
  const isOpen = nav.classList.contains('open');
  nav.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
  overlay.classList.toggle('open', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

function closeMenu() {
  const nav = document.getElementById('headerNav');
  const btn = document.getElementById('hamburger');
  const overlay = document.getElementById('navOverlay');
  nav.classList.remove('open');
  btn.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function toggleFaq(el) {
  const item = el.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ---- SCROLL REVEAL ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -28px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
