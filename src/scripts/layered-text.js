/* ──────────────────────────────────────────────
   LayeredText + VignetteGridBackground – vanilla JS (no React)
   Mounts into #layered-text-root
   Requires global `gsap` (loaded via CDN)
   ────────────────────────────────────────────── */
;(function () {
  'use strict'

  /* ── data ── */
  var lines = [
    { top: '\u00A0', bottom: 'INFINITE' },
    { top: 'INFINITE', bottom: 'PROGRESS' },
    { top: 'PROGRESS', bottom: 'INNOVATION' },
    { top: 'INNOVATION', bottom: 'FUTURE' },
    { top: 'FUTURE', bottom: 'DREAMS' },
    { top: 'DREAMS', bottom: 'ACHIEVEMENT' },
    { top: 'ACHIEVEMENT', bottom: '\u00A0' }
  ]

  /* ── helpers ── */
  function setStyles(el, styles) {
    for (var k in styles) {
      if (styles.hasOwnProperty(k)) el.style[k] = styles[k]
    }
  }

  function isDesktop() {
    return window.innerWidth >= 768
  }

  /* ── main ── */
  function initLayeredText() {
    var root = document.getElementById('layered-text-root')
    if (!root) return

    /* ── responsive values ── */
    var desktop = isDesktop()
    var lineH = desktop ? 60 : 35
    var fontSize = desktop ? 72 : 36
    var translateStep = desktop ? 35 : 20
    var shiftY = desktop ? -60 : -35
    var centerIndex = (lines.length - 1) / 2

    /* ── wrapper ── */
    var wrapper = document.createElement('div')
    setStyles(wrapper, {
      position: 'relative',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    })

    /* ── vignette grid background ── */
    var gridBg = document.createElement('div')
    setStyles(gridBg, {
      position: 'fixed',
      inset: '0',
      zIndex: '-1',
      opacity: '0.4',
      pointerEvents: 'none',
      backgroundImage:
        'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),' +
        'linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
      backgroundSize: '48px 48px',
      WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
      maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)'
    })
    wrapper.appendChild(gridBg)

    /* ── layered-text container ── */
    var container = document.createElement('div')
    setStyles(container, {
      position: 'relative',
      cursor: 'pointer'
    })

    var ul = document.createElement('ul')
    setStyles(ul, {
      listStyle: 'none',
      margin: '0',
      padding: '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    })

    var allPs = [] // collect every <p> for GSAP

    for (var i = 0; i < lines.length; i++) {
      var li = document.createElement('li')
      var isEven = i % 2 === 0
      var tx = (i - centerIndex) * translateStep

      setStyles(li, {
        overflow: 'hidden',
        position: 'relative',
        height: lineH + 'px',
        lineHeight: lineH + 'px',
        transform: isEven
          ? 'skew(60deg, -30deg) scaleY(0.66667) translateX(' + tx + 'px)'
          : 'skew(0deg, -30deg) scaleY(1.33333) translateX(' + tx + 'px)'
      })

      // top text
      var pTop = document.createElement('p')
      pTop.textContent = lines[i].top
      setStyles(pTop, {
        margin: '0',
        padding: '0',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontWeight: '900',
        fontSize: fontSize + 'px',
        lineHeight: lineH + 'px',
        letterSpacing: '-2px',
        textTransform: 'uppercase',
        color: '#ffffff',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        willChange: 'transform'
      })

      // bottom text
      var pBot = document.createElement('p')
      pBot.textContent = lines[i].bottom
      setStyles(pBot, {
        margin: '0',
        padding: '0',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontWeight: '900',
        fontSize: fontSize + 'px',
        lineHeight: lineH + 'px',
        letterSpacing: '-2px',
        textTransform: 'uppercase',
        color: '#ffffff',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        willChange: 'transform'
      })

      li.appendChild(pTop)
      li.appendChild(pBot)
      ul.appendChild(li)

      allPs.push(pTop, pBot)
    }

    container.appendChild(ul)
    wrapper.appendChild(container)
    root.appendChild(wrapper)

    /* ── GSAP hover animation ── */
    if (typeof gsap === 'undefined') {
      console.warn('[layered-text] gsap not found – hover animation disabled')
      return
    }

    var tl = gsap.timeline({ paused: true })
    tl.to(allPs, {
      y: shiftY,
      duration: 0.45,
      ease: 'power3.out',
      stagger: 0.08
    })

    container.addEventListener('mouseenter', function () { tl.play() })
    container.addEventListener('mouseleave', function () { tl.reverse() })

    /* ── responsive rebuild on resize ── */
    var resizeTimer
    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(function () {
        var nowDesktop = isDesktop()
        var newLineH = nowDesktop ? 60 : 35
        var newFontSize = nowDesktop ? 72 : 36
        var newStep = nowDesktop ? 35 : 20
        var newShift = nowDesktop ? -60 : -35

        var lis = ul.querySelectorAll('li')
        for (var j = 0; j < lis.length; j++) {
          var txR = (j - centerIndex) * newStep
          var even = j % 2 === 0
          lis[j].style.height = newLineH + 'px'
          lis[j].style.lineHeight = newLineH + 'px'
          lis[j].style.transform = even
            ? 'skew(60deg, -30deg) scaleY(0.66667) translateX(' + txR + 'px)'
            : 'skew(0deg, -30deg) scaleY(1.33333) translateX(' + txR + 'px)'

          var ps = lis[j].querySelectorAll('p')
          for (var k = 0; k < ps.length; k++) {
            ps[k].style.fontSize = newFontSize + 'px'
            ps[k].style.lineHeight = newLineH + 'px'
          }
        }

        // rebuild GSAP timeline with new shift
        tl.kill()
        // reset positions
        gsap.set(allPs, { y: 0 })
        tl = gsap.timeline({ paused: true })
        tl.to(allPs, {
          y: newShift,
          duration: 0.45,
          ease: 'power3.out',
          stagger: 0.08
        })
      }, 200)
    }

    window.addEventListener('resize', onResize)
  }

  /* ── expose & auto-init ── */
  window.initLayeredText = initLayeredText

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayeredText)
  } else {
    initLayeredText()
  }
})()
