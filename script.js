/* ── Nav scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => navbar.classList.toggle('menu-open'));
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navbar.classList.remove('menu-open'));
});

/* ── Scroll Reveal ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Active nav link ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--white)' : '';
  });
}, { passive: true });

/* ── Achievements: Tab Switching ── */
document.querySelectorAll('.ach-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.ach-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.ach-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('panel-' + target);
    if (panel) panel.classList.add('active');
  });
});

/* ── Photo Slider ── */
const sliderIndex = { aerothon: 0, isro: 0, roorkee: 0 };

function getSlides(id) {
  return document.querySelectorAll('#track-' + id + ' .slide');
}

function updateSlider(id) {
  const slides = getSlides(id);
  const total = slides.length;
  const idx = sliderIndex[id];
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === idx);
  });
  const counter = document.getElementById('counter-' + id);
  if (counter) counter.textContent = (idx + 1) + ' / ' + total;
  const dots = document.querySelectorAll('#dots-' + id + ' .dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

function slidePhoto(id, dir) {
  const total = getSlides(id).length;
  sliderIndex[id] = (sliderIndex[id] + dir + total) % total;
  updateSlider(id);
}

function goToSlide(id, idx) {
  sliderIndex[id] = idx;
  updateSlider(id);
}

/* initialise all sliders */
['aerothon', 'isro', 'roorkee'].forEach(id => updateSlider(id));
