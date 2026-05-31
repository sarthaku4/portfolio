/* ═══════════════════════════════════════════════════════════
   DELIBERATE SIGNAL — Animation Engine
   GSAP 3 + ScrollTrigger + Lenis
   ═══════════════════════════════════════════════════════════ */

const initEngine = () => {
  'use strict';

  /* ── THEME TOGGLE ──────────────────────────────────────── */
  (function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme');

    // Apply saved preference
    if (saved === 'dark') {
      document.body.classList.add('dark-mode');
    }

    if (toggle) {
      toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      });
    }
  })();

  /* ── TEXT ROLL INITIALIZATION ───────────────────────────── */
  const TEXT_ROLL_STAGGER = 0.035; // seconds per character

  function initTextRoll() {
    const elements = document.querySelectorAll('[data-text-roll]');

    elements.forEach(el => {
      const text = el.textContent.trim();
      if (!text) return;

      // Determine if center mode (mobile menu items get center stagger)
      const isCentered = el.closest('.mobile-menu') !== null;

      // Build character spans for top and bottom layers
      function buildCharLayer(chars, centered) {
        return chars.map((char, i) => {
          const delay = centered
            ? TEXT_ROLL_STAGGER * Math.abs(i - (chars.length - 1) / 2)
            : TEXT_ROLL_STAGGER * i;
          const isSpace = char === ' ';
          return `<span class="text-roll__char${isSpace ? ' text-roll__char--space' : ''}" style="--roll-delay:${delay.toFixed(4)}s">${isSpace ? '&nbsp;' : char}</span>`;
        }).join('');
      }

      const chars = text.split('');
      const topHTML = buildCharLayer(chars, isCentered);
      const bottomHTML = buildCharLayer(chars, isCentered);

      el.innerHTML =
        `<span class="text-roll">` +
          `<span class="text-roll__top">${topHTML}</span>` +
          `<span class="text-roll__bottom">${bottomHTML}</span>` +
        `</span>`;
    });
  }

  initTextRoll();

  /* ── HERO SLIDESHOW + 3D PARALLAX ──────────────────────── */
  const SLIDE_INTERVAL = 4000; // ms between slides
  let heroSlideIndex = 0;
  let heroSlideTimer = null;
  let heroProgressRAF = null;
  let heroProgressStart = 0;

  function initHeroSlideshow() {
    const layer1 = document.getElementById('heroLayer1');
    const layer2 = document.getElementById('heroLayer2');
    const layer3 = document.getElementById('heroLayer3');
    const bgBlur = document.getElementById('heroBgBlur');
    const canvas = document.getElementById('heroCanvas3D');
    const counterCurrent = document.getElementById('heroSlideCurrent');
    const counterTotal = document.getElementById('heroSlideTotal');
    const progressBar = document.getElementById('heroSlideProgressBar');

    if (!layer1 || !canvas) return;

    const slides = layer1.querySelectorAll('.hero-slide');
    const totalSlides = slides.length;

    if (counterTotal) counterTotal.textContent = String(totalSlides).padStart(2, '0');

    // Sync blurred bg + shadow layers with current slide
    function syncShadowLayers() {
      const activeSrc = slides[heroSlideIndex].src;
      if (bgBlur) {
        bgBlur.style.backgroundImage = `url('${activeSrc}')`;
      }
      if (layer2) {
        layer2.style.backgroundImage = `url('${activeSrc}')`;
        layer2.style.backgroundSize = 'contain';
        layer2.style.backgroundPosition = 'center';
        layer2.style.backgroundRepeat = 'no-repeat';
      }
      if (layer3) {
        layer3.style.backgroundImage = `url('${activeSrc}')`;
        layer3.style.backgroundSize = 'contain';
        layer3.style.backgroundPosition = 'center';
        layer3.style.backgroundRepeat = 'no-repeat';
      }
    }

    function goToSlide(index) {
      slides[heroSlideIndex].classList.remove('hero-slide--active');
      heroSlideIndex = index % totalSlides;
      slides[heroSlideIndex].classList.add('hero-slide--active');
      syncShadowLayers();
      if (counterCurrent) {
        counterCurrent.textContent = String(heroSlideIndex + 1).padStart(2, '0');
      }
    }

    function nextSlide() {
      goToSlide(heroSlideIndex + 1);
    }

    // Progress bar animation
    function animateProgress() {
      if (!progressBar) return;
      const elapsed = Date.now() - heroProgressStart;
      const progress = Math.min(elapsed / SLIDE_INTERVAL, 1);
      progressBar.style.width = (progress * 100) + '%';

      if (progress < 1) {
        heroProgressRAF = requestAnimationFrame(animateProgress);
      }
    }

    function startSlideTimer() {
      heroProgressStart = Date.now();
      if (heroProgressRAF) cancelAnimationFrame(heroProgressRAF);
      animateProgress();

      heroSlideTimer = setInterval(() => {
        nextSlide();
        heroProgressStart = Date.now();
        if (progressBar) progressBar.style.width = '0%';
        if (heroProgressRAF) cancelAnimationFrame(heroProgressRAF);
        animateProgress();
      }, SLIDE_INTERVAL);
    }

    // Mouse parallax (from HalideLanding)
    function initParallaxMouse() {
      const layers = [
        document.getElementById('heroLayer1'),
        document.getElementById('heroLayer2'),
        document.getElementById('heroLayer3')
      ].filter(Boolean);

      window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 30;
        const y = (window.innerHeight / 2 - e.clientY) / 30;

        canvas.style.transform =
          `rotateX(${8 + y / 3}deg) rotateY(${-4 + x / 3}deg) rotateZ(${-1 + x / 8}deg)`;

        layers.forEach((layer, i) => {
          const depth = (i + 1) * 0.15;
          const moveX = x * depth;
          const moveY = y * depth;
          const baseZ = i === 0 ? 0 : i === 1 ? -40 : -80;
          const baseScale = i === 0 ? 1 : i === 1 ? 1.06 : 1.12;
          layer.style.transform =
            `translateZ(${baseZ}px) scale(${baseScale}) translate(${moveX}px, ${moveY}px)`;
        });
      }, { passive: true });
    }

    // Entrance animation
    function revealCanvas() {
      canvas.style.opacity = '0';
      canvas.style.transform = 'rotateX(25deg) rotateY(0deg) rotateZ(0deg) scale(0.85)';

      requestAnimationFrame(() => {
        canvas.style.transition = 'all 2s cubic-bezier(0.16, 1, 0.3, 1)';
        canvas.style.opacity = '1';
        canvas.style.transform = 'rotateX(8deg) rotateY(-4deg) rotateZ(-1deg) scale(1)';
      });
    }

    // Init
    syncShadowLayers();
    initParallaxMouse();

    // Store functions for revealHero to call
    window._heroSlideshow = { startSlideTimer, revealCanvas };
  }

  initHeroSlideshow();

  /* ── REGISTER GSAP PLUGINS ────────────────────────────── */
  gsap.registerPlugin(ScrollTrigger);

  /* ── LENIS SMOOTH SCROLL ──────────────────────────────── */
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  /* ── LIVE CLOCK ───────────────────────────────────────── */
  function updateClock() {
    const el = document.getElementById('liveClock');
    if (!el) return;
    const now = new Date();
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata'
    };
    el.textContent = now.toLocaleTimeString('en-US', options) + ' IST';
  }
  setInterval(updateClock, 1000);
  updateClock();

  /* ── PAGE LOADER (Effect 1) ───────────────────────────── */
  const loader = document.getElementById('loader');
  const loaderCounter = document.getElementById('loaderCounter');
  const loaderText = document.getElementById('loaderText');

  if (loader && loaderCounter) {
    // Cycle loader text
    const phrases = ['Crafting experience', 'Loading portfolio'];
    let phraseIndex = 0;
    const textCycle = setInterval(() => {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      if (loaderText) {
        gsap.to(loaderText, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            loaderText.textContent = phrases[phraseIndex];
            gsap.to(loaderText, { opacity: 1, duration: 0.15 });
          }
        });
      }
    }, 800);

    // Counter animation
    const counterObj = { val: 0 };
    gsap.to(counterObj, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(counterObj.val);
        loaderCounter.textContent = v < 10 ? '0' + v : String(v);
      },
      onComplete: () => {
        clearInterval(textCycle);

        // Small pause then dissolve
        gsap.delayedCall(0.3, () => {
          // Fade loader content
          gsap.to('.loader-content', {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
          });

          // Dissolve grid cells
          gsap.to('.loader-cell', {
            scale: 0,
            duration: 0.6,
            stagger: {
              amount: 0.5,
              from: 'random'
            },
            ease: 'power3.inOut',
            onComplete: () => {
              loader.style.display = 'none';
              // Trigger hero animations
              revealHero();
              // Initialize all scroll animations
              initScrollAnimations();
            }
          });
        });
      }
    });

    // Stop Lenis during loader
    lenis.stop();
  } else {
    // No loader, init immediately
    revealHero();
    initScrollAnimations();
  }

  /* ── HERO REVEAL ──────────────────────────────────────── */
  function revealHero() {
    lenis.start();

    // Reveal hero name lines
    const heroName = document.querySelector('.hero-name[data-split="heading"]');
    if (heroName) {
      heroName.style.opacity = '1';
      heroName.style.visibility = 'visible';

      const lines = heroName.querySelectorAll('.hero-name-line');
      lines.forEach((line, i) => {
        // Wrap content for overflow hidden reveal
        const wrapper = document.createElement('div');
        wrapper.style.overflow = 'hidden';
        wrapper.style.display = 'block';

        const inner = document.createElement('div');
        inner.style.display = 'block';
        inner.innerHTML = line.innerHTML;
        // Keep the text-align from parent
        if (line.style.textAlign) {
          wrapper.style.textAlign = line.style.textAlign;
        }

        line.innerHTML = '';
        wrapper.appendChild(inner);
        line.appendChild(wrapper);

        gsap.fromTo(inner, {
          yPercent: 100,
          opacity: 0,
          rotate: 0.001
        }, {
          yPercent: 0,
          opacity: 1,
          rotate: 0.001,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.2 + (i * 0.15)
        });
      });
    }

    // Reveal eyebrow
    const heroEyebrow = document.querySelector('.hero-eyebrow[data-load-text]');
    if (heroEyebrow) {
      gsap.to(heroEyebrow, {
        opacity: 1,
        visibility: 'visible',
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3
      });
      gsap.set(heroEyebrow, { y: 20 });
    }

    // Reveal sublabel
    const heroSublabel = document.querySelector('.hero-sublabel[data-load-text]');
    if (heroSublabel) {
      gsap.set(heroSublabel, { y: 20 });
      gsap.to(heroSublabel, {
        opacity: 1,
        visibility: 'visible',
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5
      });
    }

    // Reveal bottom bar
    const heroBottom = document.querySelector('.hero-bottom');
    if (heroBottom) {
      gsap.fromTo(heroBottom, { opacity: 0 }, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.7
      });
    }

    // Start 3D slideshow
    if (window._heroSlideshow) {
      window._heroSlideshow.revealCanvas();
      setTimeout(() => {
        window._heroSlideshow.startSlideTimer();
      }, 1500);
    }
  }

  /* ── SCROLL ANIMATIONS INIT ───────────────────────────── */
  function initScrollAnimations() {
    initHeadingReveals();
    initGenericReveals();
    initStatCounters();
    initParallax();
    initNavScroll();
    initAccordion();
    initPortfolioFilters();
    initMobileMenu();
    initSmoothAnchors();
  }

  /* ── HEADING REVEALS (Effect 3) ───────────────────────── */
  function initHeadingReveals() {
    const headings = document.querySelectorAll('[data-split="heading"]:not(.hero-name)');

    headings.forEach(heading => {
      // Wrap inner text for reveal
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      wrapper.style.display = 'block';

      const inner = document.createElement('div');
      inner.style.display = 'block';
      inner.innerHTML = heading.innerHTML;

      heading.innerHTML = '';
      wrapper.appendChild(inner);
      heading.appendChild(wrapper);

      ScrollTrigger.create({
        trigger: heading,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          heading.style.opacity = '1';
          heading.style.visibility = 'visible';

          gsap.fromTo(inner, {
            yPercent: 100,
            opacity: 0,
            rotate: 0.001
          }, {
            yPercent: 0,
            opacity: 1,
            rotate: 0.001,
            duration: 1,
            ease: 'power4.out'
          });
        }
      });
    });
  }

  /* ── GENERIC SCROLL REVEALS ───────────────────────────── */
  function initGenericReveals() {
    const revealElements = document.querySelectorAll('[data-reveal]');

    revealElements.forEach(el => {
      gsap.set(el, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: parseFloat(el.dataset.revealDelay || 0)
          });
        }
      });
    });
  }

  /* ── STAT COUNTERS ────────────────────────────────────── */
  function initStatCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    counters.forEach(counter => {
      const target = parseFloat(counter.dataset.count);
      const suffix = counter.dataset.suffix || '';

      ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              counter.textContent = Math.round(obj.val) + suffix;
            }
          });
        }
      });
    });
  }

  /* ── PARALLAX (Effect 7) ──────────────────────────────── */
  function initParallax() {
    document.querySelectorAll('[data-parallax]').forEach(el => {
      gsap.to(el, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    });
  }

  /* ── NAVIGATION SCROLL DETECTION ──────────────────────── */
  function initNavScroll() {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;

    const update = () => {
      // Scrolled state
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      // Dark/light section detection
      const navMid = nav.getBoundingClientRect().top + nav.offsetHeight / 2;
      const darkSelectors = ['.hero', '.marquee', '#about', '#awards', '#experience', '.site-footer'];
      let isOverDark = false;

      darkSelectors.forEach(sel => {
        const el = document.querySelector(sel);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < navMid && rect.bottom > navMid) {
          isOverDark = true;
        }
      });

      if (isOverDark) {
        nav.classList.add('nav-dark');
      } else {
        nav.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── ACCORDION (Effect 6) ─────────────────────────────── */
  function initAccordion() {
    document.querySelectorAll('.experience-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.experience-item');
        const wasOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.experience-item').forEach(i => {
          i.classList.remove('open');
        });

        // Toggle current
        if (!wasOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  /* ── PORTFOLIO FILTERS (Effect 13) ────────────────────── */
  function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter items
        items.forEach(item => {
          const category = item.dataset.category;
          if (filter === 'all' || category === filter) {
            gsap.to(item, {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
              onStart: () => {
                item.style.visibility = 'visible';
                item.style.pointerEvents = 'auto';
              }
            });
          } else {
            gsap.to(item, {
              opacity: 0,
              scale: 0.95,
              duration: 0.3,
              ease: 'power2.in',
              onComplete: () => {
                item.style.visibility = 'hidden';
                item.style.pointerEvents = 'none';
              }
            });
          }
        });
      });
    });
  }

  /* ── MOBILE MENU ──────────────────────────────────────── */
  function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      mobileMenu.classList.toggle('open');

      if (mobileMenu.classList.contains('open')) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
        lenis.start();
      });
    });
  }

  /* ── SMOOTH ANCHOR SCROLLING ──────────────────────────── */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          lenis.scrollTo(target, { offset: -80 });
        }
      });
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEngine);
} else {
  initEngine();
}
