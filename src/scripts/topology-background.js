/* ──────────────────────────────────────────────
   TopologyBackground – vanilla JS (no React)
   Mounts into #topology-background-root
   ────────────────────────────────────────────── */
;(function () {
  'use strict'

  /* ── constants ── */
  var SCROLL_SPEED = 0.00035
  var POSTER_W = 160
  var POSTER_H = 220

  var IMAGES = [
    "assets/post/04c5aaa1cabef140e3a47fb5eda026b9.jpg",
    "assets/post/04fbe0836dd205af618784b10983a9e2.jpg",
    "assets/post/13bb3a4fdbc338d21ada37942bf5df48.jpg",
    "assets/post/227eac29ddf131450866a7e9887ef412.jpg",
    "assets/post/3283f9c8896ef4e04bf7e1b57802ddb8.jpg",
    "assets/post/37bb0df612384ce80dcedde626ee2b67.jpg",
    "assets/post/3941e9c93bc5868b89d336764f31ef21_83feec1967e6ddc3ad7170efe73e4407.avif",
    "assets/post/44eb63b03f8c65626e34b31acd43b85a.jpg",
    "assets/post/45b98807f3f36d8dbce44ee8a466aeed.jpg",
    "assets/post/4712919535bbfacdb35599f2e7372822.jpg",
    "assets/post/49c73be1e1d545b8977b8fc025dc51bb.jpg",
    "assets/post/4d8ecf7f9306356c4e2df105016b6e15.jpg",
    "assets/post/50525f356a8c64d2c54db00ea851e46b.jpg",
    "assets/post/55504f864ab380621c05bd4152327074.jpg",
    "assets/post/5a70c32b4dda14c932ae6430cf5b9da7.jpg",
    "assets/post/5af6260d836bea204a0e7dcba3cbfa14.jpg",
    "assets/post/5c56f2f9a71939cace32685948b3b781.jpg",
    "assets/post/61e4922dcc581fde54209d5223ce08a5.jpg",
    "assets/post/6bc25645ac0262e71993a15b7bb5c864.jpg",
    "assets/post/7442c76afabc7d79797b32acf85f2871.jpg",
    "assets/post/8280a264c6f66c20953d1d320b727574.jpg",
    "assets/post/8c176381f2c27052fe07559fe8241a74.jpg",
    "assets/post/8c37f13c7974dca8b73d4eb0d042125c.jpg",
    "assets/post/92c8714b5de08a1a4c560febb18a369a.jpg",
    "assets/post/979bdac0df09c3384307108c5d8c8761.jpg",
    "assets/post/98d0fea0ea7bd610ba446e7df596d81c.jpg",
    "assets/post/ABBA lyrics wallpaper.jpg",
    "assets/post/bce41a64495c06fd2e64b74e9bc34aae.jpg",
    "assets/post/bf27886067ad8042d98abb6137c4ec15.jpg",
    "assets/post/ChatGPT Image Feb 3, 2026, 08_18_07 PM.jpg",
    "assets/post/ChatGPT Image Mar 2, 2026, 01_17_57 PM.png",
    "assets/post/download.jpg",
    "assets/post/e19c95658d4a6e42f8ccffb261b6e16c.jpg",
    "assets/post/e28f75fe3795a9baff0242512023ff10.jpg",
    "assets/post/e5f88d494dbfc72e751b6b51f778ca98.jpg",
    "assets/post/e77c9c4eefa02c212974f482630a690e.jpg",
    "assets/post/f2a2346739f20e2d8466f902cba06fe0.jpg",
    "assets/post/f865c6076cb447c82e3f1eeda50d0445.jpg",
    "assets/post/IMG_20240907_025556.jpg",
    "assets/post/IMG_20240908_032350.jpg",
    "assets/post/IMG_20240909_004714.jpg",
    "assets/post/IMG_20240910_011118.jpg",
    "assets/post/IMG_20240910_011237.jpg",
    "assets/post/IMG_20240910_124321.jpg",
    "assets/post/IMG_20240911_015710.jpg",
    "assets/post/IMG_20240912_185152.jpg",
    "assets/post/IMG_20240913_031522.jpg",
    "assets/post/IMG_20240915_011141.jpg",
    "assets/post/IMG_20240917_235253.jpg",
    "assets/post/IMG_20240921_010819.jpg",
    "assets/post/IMG_20241002_191244.jpg",
    "assets/post/IMG_20241002_194535.jpg",
    "assets/post/IMG_20241003_073716.jpg",
    "assets/post/IMG_20241003_123047.jpg",
    "assets/post/IMG_20241004_075234.jpg",
    "assets/post/IMG_20241005_013204.jpg",
    "assets/post/IMG_20241006_093732.jpg",
    "assets/post/IMG_20241007_015405.jpg",
    "assets/post/IMG_20241008_011148.jpg",
    "assets/post/IMG_20241008_193524.jpg",
    "assets/post/IMG_20241008_204827.jpg",
    "assets/post/IMG_20241010_005442.jpg",
    "assets/post/IMG_20241010_011549.jpg",
    "assets/post/IMG_20241012_105057.jpg",
    "assets/post/IMG_20241017_012443.jpg",
    "assets/post/IMG_20241028_155923.jpg",
    "assets/post/IMG_20241031_170004.jpg",
    "assets/post/IMG_20241031_183113.jpg",
    "assets/post/IMG_20241101_211401.jpg",
    "assets/post/IMG_20241110_155123.jpg",
    "assets/post/IMG_20241210_144509.jpg",
    "assets/post/IMG_20241214_123243.jpg",
    "assets/post/IMG_20250208_234950.jpg",
    "assets/post/IMG_20250214_003107.jpg",
    "assets/post/IMG_20250216_153547.jpg",
    "assets/post/IMG_20250216_154452.jpg",
    "assets/post/IMG_20250219_002123.jpg",
    "assets/post/IMG_20250219_022545.jpg",
    "assets/post/IMG_20250225_233052.jpg",
    "assets/post/IMG_20250227_130427.jpg",
    "assets/post/IMG_20250310_001009.jpg",
    "assets/post/IMG_20250327_222951.jpg",
    "assets/post/IMG_20250329_135522.jpg",
    "assets/post/IMG_20250330_123530.jpg",
    "assets/post/IMG_20250403_123514.jpg",
    "assets/post/IMG_20250405_234822.jpg",
    "assets/post/IMG_20250411_115559.jpg",
    "assets/post/IMG_20250412_061625.jpg",
    "assets/post/IMG_20250415_121927.jpg",
    "assets/post/IMG_20250421_012228.jpg",
    "assets/post/IMG_20250501_184822.jpg",
    "assets/post/IMG_20250507_122309.jpg",
    "assets/post/IMG_20250513_204041.jpg",
    "assets/post/IMG_20250606_012755.jpg",
    "assets/post/IMG_20250606_094427.jpg",
    "assets/post/IMG_20250629_230622.jpg",
    "assets/post/IMG_20250705_231325.jpg",
    "assets/post/IMG_20250710_004755.jpg",
    "assets/post/IMG_20250809_030117.jpg",
    "assets/post/IMG_20250814_235749.jpg",
    "assets/post/IMG_20250815_213312.jpg",
    "assets/post/IMG_20250819_232020.jpg",
    "assets/post/IMG_20250821_145940.jpg",
    "assets/post/IMG_20250825_193247.jpg",
    "assets/post/IMG_20250825_220608.jpg",
    "assets/post/IMG_20250827_130232.jpg",
    "assets/post/IMG_20250831_223136.jpg",
    "assets/post/IMG_20250906_082728.jpg",
    "assets/post/IMG_20250906_234733.jpg",
    "assets/post/IMG_20250917_111237.jpg",
    "assets/post/IMG_20250921_153543.jpg",
    "assets/post/IMG_20251001_235038.jpg",
    "assets/post/IMG_20251002_001153.jpg",
    "assets/post/IMG_20251002_002814.jpg",
    "assets/post/IMG_20251013_215530.jpg",
    "assets/post/IMG_20251013_220816.jpg",
    "assets/post/IMG_20251017_124848.jpg",
    "assets/post/IMG_20251018_183204.jpg",
    "assets/post/IMG_20251019_191742.jpg",
    "assets/post/IMG_20251021_114000.jpg",
    "assets/post/IMG_20251021_114425.jpg",
    "assets/post/IMG_20251023_112542.jpg",
    "assets/post/IMG_20251029_221914.jpg",
    "assets/post/IMG_20260112_132405.jpg",
    "assets/post/IMG_20260116_104508.jpg",
    "assets/post/IMG_20260219_012928.jpg",
    "assets/post/IMG_20260318_020024.jpg",
    "assets/post/IMG_20260319_113054.jpg",
    "assets/post/narayani.advertising-20260127-0001.jpg",
    "assets/post/narayani.advertising-20260127-0002.jpg",
    "assets/post/narayani.advertising-20260127-0003.jpg",
    "assets/post/narayani.advertising-20260127-0004.jpg",
    "assets/post/narayani.advertising-20260127-0005.jpg",
    "assets/post/vishnu.jpg",
    "assets/post/wallpaperflare.com_wallpaper.jpg"
  ]

  /* ── helpers ── */
  function buildCurveD(w, h) {
    var x0 = -100, y0 = h * 0.08
    var cp1x = w * 0.25, cp1y = h * 0.05
    var cp2x = w * 0.1, cp2y = h * 0.55
    var mx = w * 0.45, my = h * 0.45
    var cp3x = w * 0.75, cp3y = h * 0.35
    var cp4x = w * 0.85, cp4y = h * 0.85
    var x1 = w + 100, y1 = h * 0.78
    return 'M ' + x0 + ',' + y0 +
      ' C ' + cp1x + ',' + cp1y + ' ' + cp2x + ',' + cp2y + ' ' + mx + ',' + my +
      ' C ' + cp3x + ',' + cp3y + ' ' + cp4x + ',' + cp4y + ' ' + x1 + ',' + y1
  }

  function setStyles(el, styles) {
    for (var k in styles) {
      if (styles.hasOwnProperty(k)) el.style[k] = styles[k]
    }
  }

  /* ── main ── */
  function initTopologyBackground() {
    var root = document.getElementById('topology-background-root')
    if (!root) return

    /* ── state ── */
    var globalOffset = 0
    var rafId = null
    var pathEl = null
    var pathLen = 0
    var posterEls = []
    var posterData = [] // { el, imgIndex, baseT }
    var posterCount = 0

    /* ── build DOM ── */
    var section = document.createElement('section')
    setStyles(section, {
      position: 'relative',
      width: '100%',
      height: '100svh',
      overflow: 'hidden',
      background: 'transparent'
    })

    // SVG for path calculations
    var svgNS = 'http://www.w3.org/2000/svg'
    var svg = document.createElementNS(svgNS, 'svg')
    svg.setAttribute('width', '0')
    svg.setAttribute('height', '0')
    setStyles(svg, { position: 'absolute', pointerEvents: 'none' })
    pathEl = document.createElementNS(svgNS, 'path')
    pathEl.setAttribute('fill', 'none')
    pathEl.setAttribute('stroke', 'transparent')
    svg.appendChild(pathEl)
    section.appendChild(svg)

    // poster container
    var posterContainer = document.createElement('div')
    setStyles(posterContainer, {
      position: 'absolute',
      inset: '0',
      pointerEvents: 'none'
    })
    section.appendChild(posterContainer)

    // title overlay
    var titleWrap = document.createElement('div')
    setStyles(titleWrap, {
      position: 'absolute',
      bottom: '0',
      left: '0',
      padding: 'clamp(1.5rem, 5vw, 2.5rem)',
      zIndex: '10',
      pointerEvents: 'none'
    })

    var eyebrow = document.createElement('p')
    eyebrow.textContent = 'Portfolio \u00B7 Selected Work'
    setStyles(eyebrow, {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: '0.75rem',
      fontWeight: '500',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.5)',
      marginBottom: '0.5rem'
    })
    titleWrap.appendChild(eyebrow)

    var h2 = document.createElement('h2')
    setStyles(h2, {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: 'clamp(2rem, 5vw, 4rem)',
      fontWeight: '800',
      lineHeight: '1',
      color: '#ffffff',
      margin: '0'
    })
    h2.innerHTML = 'Selected<br>'
    var workSpan = document.createElement('span')
    workSpan.textContent = 'Work.'
    setStyles(workSpan, { color: '#e50914', fontStyle: 'italic' })
    h2.appendChild(workSpan)
    titleWrap.appendChild(h2)

    section.appendChild(titleWrap)

    /* ── Lightbox / Preview Modal ── */
    var lightboxOpen = false

    var lightboxOverlay = document.createElement('div')
    lightboxOverlay.id = 'portfolio-lightbox'
    setStyles(lightboxOverlay, {
      position: 'fixed',
      inset: '0',
      zIndex: '99999',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: '0',
      visibility: 'hidden',
      transition: 'opacity 0.35s ease, visibility 0.35s ease',
      cursor: 'zoom-out'
    })

    // blurred backdrop
    var lightboxBackdrop = document.createElement('div')
    setStyles(lightboxBackdrop, {
      position: 'absolute',
      inset: '0',
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      transition: 'backdrop-filter 0.35s ease'
    })
    lightboxOverlay.appendChild(lightboxBackdrop)

    // image wrapper
    var lightboxImgWrap = document.createElement('div')
    setStyles(lightboxImgWrap, {
      position: 'relative',
      zIndex: '2',
      maxWidth: '90vw',
      maxHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'scale(0.92)',
      transition: 'transform 0.35s cubic-bezier(0.19, 1, 0.22, 1)',
      cursor: 'default'
    })

    var lightboxImg = document.createElement('img')
    lightboxImg.alt = 'Preview'
    lightboxImg.draggable = false
    setStyles(lightboxImg, {
      maxWidth: '90vw',
      maxHeight: '90vh',
      objectFit: 'contain',
      borderRadius: '10px',
      boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
      display: 'block'
    })
    lightboxImgWrap.appendChild(lightboxImg)

    // close button
    var lightboxClose = document.createElement('button')
    lightboxClose.innerHTML = '&#10005;'
    lightboxClose.setAttribute('aria-label', 'Close preview')
    setStyles(lightboxClose, {
      position: 'absolute',
      top: '-16px',
      right: '-16px',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      border: '1px solid rgba(255,255,255,0.15)',
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.2s ease, transform 0.2s ease',
      zIndex: '3',
      lineHeight: '1',
      padding: '0'
    })
    lightboxClose.addEventListener('mouseenter', function () {
      lightboxClose.style.background = 'rgba(229,9,20,0.7)'
      lightboxClose.style.transform = 'scale(1.1)'
    })
    lightboxClose.addEventListener('mouseleave', function () {
      lightboxClose.style.background = 'rgba(0,0,0,0.6)'
      lightboxClose.style.transform = 'scale(1)'
    })
    lightboxImgWrap.appendChild(lightboxClose)

    lightboxOverlay.appendChild(lightboxImgWrap)
    document.body.appendChild(lightboxOverlay)

    function openLightbox(src) {
      lightboxImg.src = src
      lightboxOpen = true
      lightboxOverlay.style.visibility = 'visible'
      lightboxOverlay.style.opacity = '1'
      lightboxImgWrap.style.transform = 'scale(1)'
      document.body.style.overflow = 'hidden'
    }

    function closeLightbox() {
      lightboxOpen = false
      lightboxOverlay.style.opacity = '0'
      lightboxImgWrap.style.transform = 'scale(0.92)'
      setTimeout(function () {
        if (!lightboxOpen) {
          lightboxOverlay.style.visibility = 'hidden'
          lightboxImg.src = ''
          document.body.style.overflow = ''
        }
      }, 350)
    }

    // close handlers
    lightboxBackdrop.addEventListener('click', closeLightbox)
    lightboxClose.addEventListener('click', function (e) {
      e.stopPropagation()
      closeLightbox()
    })
    lightboxOverlay.addEventListener('click', function (e) {
      if (e.target === lightboxOverlay) closeLightbox()
    })
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightboxOpen) closeLightbox()
    })

    root.appendChild(section)

    /* ── poster creation ── */
    function buildPosters() {
      // dynamic poster sizing
      var isMobile = window.innerWidth < 768
      var isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
      
      if (isMobile) {
        POSTER_W = 100
        POSTER_H = 140
      } else if (isTablet) {
        POSTER_W = 130
        POSTER_H = 180
      } else {
        POSTER_W = 160
        POSTER_H = 220
      }

      // clear old
      posterContainer.innerHTML = ''
      posterEls = []
      posterData = []

      var w = section.offsetWidth
      var h = section.offsetHeight

      // update path
      pathEl.setAttribute('d', buildCurveD(w, h))
      pathLen = pathEl.getTotalLength()

      // determine count based on path length
      posterCount = Math.max(8, Math.round(pathLen / (POSTER_W * 0.6)))

      for (var i = 0; i < posterCount; i++) {
        var div = document.createElement('div')
        setStyles(div, {
          position: 'absolute',
          width: POSTER_W + 'px',
          height: POSTER_H + 'px',
          borderRadius: '8px',
          overflow: 'hidden',
          willChange: 'transform',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
          cursor: 'pointer',
          pointerEvents: 'auto',
          transformStyle: 'preserve-3d'
        })

        var img = document.createElement('img')
        var imgIdx = (i * 7) % IMAGES.length // spread through gallery
        img.src = IMAGES[imgIdx]
        img.alt = ''
        img.loading = 'lazy'
        img.draggable = false
        setStyles(img, {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          pointerEvents: 'none'
        })
        div.appendChild(img)

        // click to open lightbox
        ;(function (imgSrc) {
          div.addEventListener('click', function () {
            openLightbox(imgSrc)
          })
        })(IMAGES[imgIdx])

        // physics state on each card
        div._scl = 1        // current scale
        div._sclT = 1       // target scale
        div._rotX = 0       // current tilt X
        div._rotY = 0       // current tilt Y
        div._rotXT = 0      // target tilt X
        div._rotYT = 0      // target tilt Y
        div._lift = 0       // current Y lift
        div._liftT = 0      // target Y lift
        div._hovered = false

        // hover: set physics targets
        ;(function (card) {
          card.addEventListener('mouseenter', function () {
            card._hovered = true
            card._sclT = 1.4
            card._liftT = -12
            card.style.zIndex = '50'
          })
          card.addEventListener('mousemove', function (e) {
            if (!card._hovered) return
            var rect = card.getBoundingClientRect()
            var mx = (e.clientX - rect.left) / rect.width   // 0..1
            var my = (e.clientY - rect.top) / rect.height    // 0..1
            card._rotYT = (mx - 0.5) * 25    // tilt left/right up to ±12.5°
            card._rotXT = -(my - 0.5) * 20   // tilt up/down up to ±10°
          })
          card.addEventListener('mouseleave', function () {
            card._hovered = false
            card._sclT = 1
            card._rotXT = 0
            card._rotYT = 0
            card._liftT = 0
            // delay z-index reset so it stays on top during ease-out
            setTimeout(function () {
              if (!card._hovered) card.style.zIndex = ''
            }, 300)
          })
        })(div)

        posterContainer.appendChild(div)

        posterEls.push(div)
        posterData.push({
          el: div,
          imgIndex: imgIdx,
          baseT: i / posterCount
        })
      }
    }

    /* ── physics helpers ── */
    function lerp(a, b, t) { return a + (b - a) * t }

    function animate() {
      globalOffset += SCROLL_SPEED

      var easeIn = 0.12   // snappy response on hover
      var easeOut = 0.06  // slower, floaty ease out

      for (var i = 0; i < posterData.length; i++) {
        var d = posterData[i]
        var el = d.el
        var t = (d.baseT + globalOffset) % 1
        if (t < 0) t += 1

        var pt = pathEl.getPointAtLength(t * pathLen)
        var x = pt.x - POSTER_W / 2
        var y = pt.y - POSTER_H / 2

        // lerp physics values
        var ease = el._hovered ? easeIn : easeOut
        el._scl  = lerp(el._scl,  el._sclT,  ease)
        el._rotX = lerp(el._rotX, el._rotXT, ease)
        el._rotY = lerp(el._rotY, el._rotYT, ease)
        el._lift = lerp(el._lift, el._liftT, ease)

        var baseShadow = '0 8px 32px rgba(0,0,0,0.45)'
        el.style.boxShadow = baseShadow

        el.style.transform =
          'translate3d(' + x + 'px,' + (y + el._lift) + 'px, 0)' +
          ' scale(' + el._scl.toFixed(4) + ')' +
          ' perspective(600px)' +
          ' rotateX(' + el._rotX.toFixed(2) + 'deg)' +
          ' rotateY(' + el._rotY.toFixed(2) + 'deg)'
        el.style.opacity = '1'
      }

      rafId = requestAnimationFrame(animate)
    }

    var resizeTimer
    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(function () {
        buildPosters()
      }, 200)
    }


    window.addEventListener('resize', onResize)

    /* ── kick off ── */
    buildPosters()
    rafId = requestAnimationFrame(animate)
  }

  /* ── expose & auto-init ── */
  window.initTopologyBackground = initTopologyBackground

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTopologyBackground)
  } else {
    initTopologyBackground()
  }
})()
