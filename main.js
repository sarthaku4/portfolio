/* ═══════════════════════════════════════════════════════════
   CORE LOGIC — Shared between all pages
   ═══════════════════════════════════════════════════════════ */

window.navigate = function(id) {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
  
  sections.forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if(target) target.classList.add('active');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('href') === id + '.html' || (id === 'home' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });
};

window.toggleMenu = function() {
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  if (btn && menu) {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  }
};
