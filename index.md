<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sarth Infocus — Professional Creative</title>
<meta name="description" content="Sarthak Ubale — designer, developer, and photographer.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inconsolata:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="framer.css">
<link rel="stylesheet" href="styles.css">
</head>
<body>

<div class="cursor"></div>
<div class="cursor-dot"></div>

<!-- PRELOADER -->
<div class="preloader">
  <div class="preloader-counter">0</div>
  <div class="preloader-line"></div>
</div>

<!-- NAVIGATION -->
<nav class="site-nav">
  <div class="nav-logo" onclick="location.href='index.html'"></div>
  <ul class="nav-links">
    <li><a href="index.html" class="active">Home</a></li>
    <li><a href="work.html">Work</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="posts.html">Posts</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
  <div class="nav-tagline">ख़यालों को आकार<br>देने की कला।</div>
  <button class="nav-menu-btn" id="menuBtn" aria-label="Menu" onclick="toggleMenu()">
    <span></span><span></span><span></span>
  </button>
</nav>

<!-- MOBILE MENU -->
<div class="mobile-menu" id="mobileMenu">
  <a href="index.html">Home</a>
  <a href="work.html">Work</a>
  <a href="about.html">About</a>
  <a href="posts.html">Posts</a>
  <a href="contact.html">Contact</a>
</div>

<!-- WEBGL CANVAS -->
<canvas id="webgl"></canvas>

<!-- HERO -->
<section class="hero">
  <div class="hero-content">
    <h1 class="hero-title">
      <span class="hero-title-line"><span class="hero-title-word" data-text="sarth">sarth</span></span>
      <span class="hero-title-line"><span class="hero-title-word" data-text="infocus">infocus</span></span>
    </h1>
    <p class="hero-subtitle">Designing the space between <em>ख़याल</em> and reality.</p>
  </div>
  <div class="hero-scroll">
    <span>Scroll</span>
    <div class="hero-scroll-line"></div>
  </div>
  <div class="hero-bar">
    <span>web, graphic &amp; code</span>
    <span>© 2026 — <a href="https://www.linkedin.com/in/sarthak-ubale-370454253" target="_blank" rel="noopener">Sarthak Ubale</a></span>
  </div>
</section>

<!-- STATEMENT -->
<section class="statement">
  <div class="statement-inner">
    <p class="statement-text">
      I craft digital experiences that live at the intersection of <span class="highlight">design</span>, <span class="highlight">code</span>, and <span class="highlight">photography</span>. Every pixel intentional. Every interaction deliberate.
    </p>
  </div>
</section>

<!-- MARQUEE -->
<section class="marquee-section">
  <div class="marquee-track">
    <div class="marquee-content">
      <span class="marquee-item">Web Design</span>
      <span class="marquee-dot">✦</span>
      <span class="marquee-item">Photography</span>
      <span class="marquee-dot">✦</span>
      <span class="marquee-item">Development</span>
      <span class="marquee-dot">✦</span>
      <span class="marquee-item">Branding</span>
      <span class="marquee-dot">✦</span>
      <span class="marquee-item">UI/UX</span>
      <span class="marquee-dot">✦</span>
      <span class="marquee-item">Motion</span>
      <span class="marquee-dot">✦</span>
    </div>
    <div class="marquee-content" aria-hidden="true">
      <span class="marquee-item">Web Design</span>
      <span class="marquee-dot">✦</span>
      <span class="marquee-item">Photography</span>
      <span class="marquee-dot">✦</span>
      <span class="marquee-item">Development</span>
      <span class="marquee-dot">✦</span>
      <span class="marquee-item">Branding</span>
      <span class="marquee-dot">✦</span>
      <span class="marquee-item">UI/UX</span>
      <span class="marquee-dot">✦</span>
      <span class="marquee-item">Motion</span>
      <span class="marquee-dot">✦</span>
    </div>
  </div>
</section>

<!-- FEATURED WORK -->
<section class="featured">
  <div class="featured-header">
    <span class="featured-label">Selected Work</span>
    <h2 class="featured-heading">Things I've<br>made with care.</h2>
    <a href="work.html" class="magnetic-btn" data-nav="work.html">
      <span>View All</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
    </a>
  </div>
  <div class="featured-grid">
    <a href="work.html" class="featured-card magnetic" data-nav="work.html">
      <div class="featured-card-image">
        <div class="featured-card-placeholder">
          <span>01</span>
        </div>
      </div>
      <div class="featured-card-info">
        <h3>Brand Identity System</h3>
        <p>Design · Branding</p>
      </div>
    </a>
    <a href="work.html" class="featured-card magnetic" data-nav="work.html">
      <div class="featured-card-image">
        <div class="featured-card-placeholder">
          <span>02</span>
        </div>
      </div>
      <div class="featured-card-info">
        <h3>E-Commerce Platform</h3>
        <p>Development · UI/UX</p>
      </div>
    </a>
    <a href="work.html" class="featured-card magnetic" data-nav="work.html">
      <div class="featured-card-image">
        <div class="featured-card-placeholder">
          <span>03</span>
        </div>
      </div>
      <div class="featured-card-info">
        <h3>Photography Series</h3>
        <p>Photography · Art Direction</p>
      </div>
    </a>
  </div>
</section>

<!-- CTA -->
<section class="cta">
  <div class="cta-inner">
    <span class="cta-label">What's Next</span>
    <h2 class="cta-heading">
      <a href="contact.html" class="cta-link magnetic" data-nav="contact.html">
        <span class="cta-link-line">Let's create</span>
        <span class="cta-link-line">something</span>
        <span class="cta-link-line">together.</span>
      </a>
    </h2>
    <div class="cta-links">
      <a href="https://www.linkedin.com/in/sarthak-ubale-370454253" target="_blank" rel="noopener" class="cta-social magnetic">LinkedIn</a>
      <a href="mailto:hello@sarthinfocus.com" class="cta-social magnetic">Email</a>
      <a href="https://github.com/" target="_blank" rel="noopener" class="cta-social magnetic">GitHub</a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="site-footer">
  <div class="footer-inner">
    <span>Sarth Infocus — 2026</span>
    <span>Built with intention.</span>
  </div>
</footer>

<!-- SCRIPTS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js"></script>
<script src="main.js"></script>
<script src="framer.js"></script>
<script src="index.js"></script>
</body>
</html>
