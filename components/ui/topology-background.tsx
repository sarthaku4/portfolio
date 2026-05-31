"use client"

import { useEffect, useRef } from "react"

// ──────────────────────────────────────────────────
// Images — all 135 posters from /assets/post/
// ──────────────────────────────────────────────────
const IMAGES = [
  "/assets/post/04c5aaa1cabef140e3a47fb5eda026b9.jpg",
  "/assets/post/04fbe0836dd205af618784b10983a9e2.jpg",
  "/assets/post/13bb3a4fdbc338d21ada37942bf5df48.jpg",
  "/assets/post/227eac29ddf131450866a7e9887ef412.jpg",
  "/assets/post/3283f9c8896ef4e04bf7e1b57802ddb8.jpg",
  "/assets/post/37bb0df612384ce80dcedde626ee2b67.jpg",
  "/assets/post/3941e9c93bc5868b89d336764f31ef21_83feec1967e6ddc3ad7170efe73e4407.avif",
  "/assets/post/44eb63b03f8c65626e34b31acd43b85a.jpg",
  "/assets/post/45b98807f3f36d8dbce44ee8a466aeed.jpg",
  "/assets/post/4712919535bbfacdb35599f2e7372822.jpg",
  "/assets/post/49c73be1e1d545b8977b8fc025dc51bb.jpg",
  "/assets/post/4d8ecf7f9306356c4e2df105016b6e15.jpg",
  "/assets/post/50525f356a8c64d2c54db00ea851e46b.jpg",
  "/assets/post/55504f864ab380621c05bd4152327074.jpg",
  "/assets/post/5a70c32b4dda14c932ae6430cf5b9da7.jpg",
  "/assets/post/5af6260d836bea204a0e7dcba3cbfa14.jpg",
  "/assets/post/5c56f2f9a71939cace32685948b3b781.jpg",
  "/assets/post/61e4922dcc581fde54209d5223ce08a5.jpg",
  "/assets/post/6bc25645ac0262e71993a15b7bb5c864.jpg",
  "/assets/post/7442c76afabc7d79797b32acf85f2871.jpg",
  "/assets/post/8280a264c6f66c20953d1d320b727574.jpg",
  "/assets/post/8c176381f2c27052fe07559fe8241a74.jpg",
  "/assets/post/8c37f13c7974dca8b73d4eb0d042125c.jpg",
  "/assets/post/92c8714b5de08a1a4c560febb18a369a.jpg",
  "/assets/post/979bdac0df09c3384307108c5d8c8761.jpg",
  "/assets/post/98d0fea0ea7bd610ba446e7df596d81c.jpg",
  "/assets/post/ABBA lyrics wallpaper.jpg",
  "/assets/post/bce41a64495c06fd2e64b74e9bc34aae.jpg",
  "/assets/post/bf27886067ad8042d98abb6137c4ec15.jpg",
  "/assets/post/ChatGPT Image Feb 3, 2026, 08_18_07 PM.jpg",
  "/assets/post/ChatGPT Image Mar 2, 2026, 01_17_57 PM.png",
  "/assets/post/download.jpg",
  "/assets/post/e19c95658d4a6e42f8ccffb261b6e16c.jpg",
  "/assets/post/e28f75fe3795a9baff0242512023ff10.jpg",
  "/assets/post/e5f88d494dbfc72e751b6b51f778ca98.jpg",
  "/assets/post/e77c9c4eefa02c212974f482630a690e.jpg",
  "/assets/post/f2a2346739f20e2d8466f902cba06fe0.jpg",
  "/assets/post/f865c6076cb447c82e3f1eeda50d0445.jpg",
  "/assets/post/IMG_20240907_025556.jpg",
  "/assets/post/IMG_20240908_032350.jpg",
  "/assets/post/IMG_20240909_004714.jpg",
  "/assets/post/IMG_20240910_011118.jpg",
  "/assets/post/IMG_20240910_011237.jpg",
  "/assets/post/IMG_20240910_124321.jpg",
  "/assets/post/IMG_20240911_015710.jpg",
  "/assets/post/IMG_20240912_185152.jpg",
  "/assets/post/IMG_20240913_031522.jpg",
  "/assets/post/IMG_20240915_011141.jpg",
  "/assets/post/IMG_20240917_235253.jpg",
  "/assets/post/IMG_20240921_010819.jpg",
  "/assets/post/IMG_20241002_191244.jpg",
  "/assets/post/IMG_20241002_194535.jpg",
  "/assets/post/IMG_20241003_073716.jpg",
  "/assets/post/IMG_20241003_123047.jpg",
  "/assets/post/IMG_20241004_075234.jpg",
  "/assets/post/IMG_20241005_013204.jpg",
  "/assets/post/IMG_20241006_093732.jpg",
  "/assets/post/IMG_20241007_015405.jpg",
  "/assets/post/IMG_20241008_011148.jpg",
  "/assets/post/IMG_20241008_193524.jpg",
  "/assets/post/IMG_20241008_204827.jpg",
  "/assets/post/IMG_20241010_005442.jpg",
  "/assets/post/IMG_20241010_011549.jpg",
  "/assets/post/IMG_20241012_105057.jpg",
  "/assets/post/IMG_20241017_012443.jpg",
  "/assets/post/IMG_20241028_155923.jpg",
  "/assets/post/IMG_20241031_170004.jpg",
  "/assets/post/IMG_20241031_183113.jpg",
  "/assets/post/IMG_20241101_211401.jpg",
  "/assets/post/IMG_20241110_155123.jpg",
  "/assets/post/IMG_20241210_144509.jpg",
  "/assets/post/IMG_20241214_123243.jpg",
  "/assets/post/IMG_20250208_234950.jpg",
  "/assets/post/IMG_20250214_003107.jpg",
  "/assets/post/IMG_20250216_153547.jpg",
  "/assets/post/IMG_20250216_154452.jpg",
  "/assets/post/IMG_20250219_002123.jpg",
  "/assets/post/IMG_20250219_022545.jpg",
  "/assets/post/IMG_20250225_233052.jpg",
  "/assets/post/IMG_20250227_130427.jpg",
  "/assets/post/IMG_20250310_001009.jpg",
  "/assets/post/IMG_20250327_222951.jpg",
  "/assets/post/IMG_20250329_135522.jpg",
  "/assets/post/IMG_20250330_123530.jpg",
  "/assets/post/IMG_20250403_123514.jpg",
  "/assets/post/IMG_20250405_234822.jpg",
  "/assets/post/IMG_20250411_115559.jpg",
  "/assets/post/IMG_20250412_061625.jpg",
  "/assets/post/IMG_20250415_121927.jpg",
  "/assets/post/IMG_20250421_012228.jpg",
  "/assets/post/IMG_20250501_184822.jpg",
  "/assets/post/IMG_20250507_122309.jpg",
  "/assets/post/IMG_20250513_204041.jpg",
  "/assets/post/IMG_20250606_012755.jpg",
  "/assets/post/IMG_20250606_094427.jpg",
  "/assets/post/IMG_20250629_230622.jpg",
  "/assets/post/IMG_20250705_231325.jpg",
  "/assets/post/IMG_20250710_004755.jpg",
  "/assets/post/IMG_20250809_030117.jpg",
  "/assets/post/IMG_20250814_235749.jpg",
  "/assets/post/IMG_20250815_213312.jpg",
  "/assets/post/IMG_20250819_232020.jpg",
  "/assets/post/IMG_20250821_145940.jpg",
  "/assets/post/IMG_20250825_193247.jpg",
  "/assets/post/IMG_20250825_220608.jpg",
  "/assets/post/IMG_20250827_130232.jpg",
  "/assets/post/IMG_20250831_223136.jpg",
  "/assets/post/IMG_20250906_082728.jpg",
  "/assets/post/IMG_20250906_234733.jpg",
  "/assets/post/IMG_20250917_111237.jpg",
  "/assets/post/IMG_20250921_153543.jpg",
  "/assets/post/IMG_20251001_235038.jpg",
  "/assets/post/IMG_20251002_001153.jpg",
  "/assets/post/IMG_20251002_002814.jpg",
  "/assets/post/IMG_20251013_215530.jpg",
  "/assets/post/IMG_20251013_220816.jpg",
  "/assets/post/IMG_20251017_124848.jpg",
  "/assets/post/IMG_20251018_183204.jpg",
  "/assets/post/IMG_20251019_191742.jpg",
  "/assets/post/IMG_20251021_114000.jpg",
  "/assets/post/IMG_20251021_114425.jpg",
  "/assets/post/IMG_20251023_112542.jpg",
  "/assets/post/IMG_20251029_221914.jpg",
  "/assets/post/IMG_20260112_132405.jpg",
  "/assets/post/IMG_20260116_104508.jpg",
  "/assets/post/IMG_20260219_012928.jpg",
  "/assets/post/IMG_20260318_020024.jpg",
  "/assets/post/IMG_20260319_113054.jpg",
  "/assets/post/narayani.advertising-20260127-0001.jpg",
  "/assets/post/narayani.advertising-20260127-0002.jpg",
  "/assets/post/narayani.advertising-20260127-0003.jpg",
  "/assets/post/narayani.advertising-20260127-0004.jpg",
  "/assets/post/narayani.advertising-20260127-0005.jpg",
  "/assets/post/vishnu.jpg",
  "/assets/post/wallpaperflare.com_wallpaper.jpg",
]

// ──────────────────────────────────────────────────
// Config
// ──────────────────────────────────────────────────
const SCROLL_SPEED = 0.00035
const SCATTER_RADIUS = 140
const POSTER_W = 160
const POSTER_H = 220

interface PosterState {
  el: HTMLDivElement
  imgIdx: number
  currentPt: { x: number; y: number }
  baseAngle: number
  isScattered: boolean
  scatterSeed: number // pre-seeded random rotation
}

// ──────────────────────────────────────────────────
// Build the S-curve path string based on viewport
// ──────────────────────────────────────────────────
function buildCurveD(w: number, h: number): string {
  // S-curve: enters top-left, sweeps down to center-bottom,
  // curves back up and exits bottom-right
  const x0 = -100
  const y0 = h * 0.08
  const cp1x = w * 0.25
  const cp1y = h * 0.05
  const cp2x = w * 0.1
  const cp2y = h * 0.55
  const mx = w * 0.45
  const my = h * 0.45
  const cp3x = w * 0.75
  const cp3y = h * 0.35
  const cp4x = w * 0.85
  const cp4y = h * 0.85
  const x1 = w + 100
  const y1 = h * 0.78
  return `M ${x0},${y0} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${mx},${my} C ${cp3x},${cp3y} ${cp4x},${cp4y} ${x1},${y1}`
}

// ──────────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────────
export function TopologyBackground() {
  const sectionRef = useRef<HTMLElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const postersContainerRef = useRef<HTMLDivElement>(null)
  const postersRef = useRef<PosterState[]>([])
  const rafRef = useRef<number>(0)
  const globalOffset = useRef(0)
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const totalLenRef = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    const svg = svgRef.current
    const path = pathRef.current
    const container = postersContainerRef.current
    if (!section || !svg || !path || !container) return

    // ── Resize handler ──
    function updatePath() {
      const w = window.innerWidth
      const h = window.innerHeight
      const d = buildCurveD(w, h)
      path!.setAttribute("d", d)
      svg!.setAttribute("viewBox", `0 0 ${w} ${h}`)
      totalLenRef.current = path!.getTotalLength()
    }

    // ── Determine poster count based on path length ──
    // Pack them tight: just a tiny gap between each
    const POSTER_GAP = 2 // px gap between posters
    function getPosterCount(): number {
      const len = totalLenRef.current
      if (len === 0) return 12
      return Math.floor(len / (POSTER_W + POSTER_GAP))
    }

    // ── Build poster DOM nodes ──
    function buildPosters() {
      // Clear old
      container!.innerHTML = ""
      postersRef.current = []

      const count = getPosterCount()
      for (let i = 0; i < count; i++) {
        const el = document.createElement("div")
        el.style.position = "absolute"
        el.style.width = POSTER_W + "px"
        el.style.height = POSTER_H + "px"
        el.style.transformOrigin = "center center"
        el.style.pointerEvents = "auto"
        el.style.willChange = "transform, left, top"
        el.style.zIndex = "2"

        const img = document.createElement("img")
        img.src = IMAGES[i % IMAGES.length]
        img.alt = "Portfolio work"
        img.loading = "lazy"
        img.draggable = false
        img.style.width = "100%"
        img.style.height = "100%"
        img.style.objectFit = "cover"
        img.style.borderRadius = "4px"
        img.style.boxShadow = "0 8px 24px rgba(0,0,0,0.6)"
        img.style.border = "1px solid rgba(255,255,255,0.08)"
        img.style.display = "block"

        el.appendChild(img)
        container!.appendChild(el)

        postersRef.current.push({
          el,
          imgIdx: i,
          currentPt: { x: 0, y: 0 },
          baseAngle: 0,
          isScattered: false,
          scatterSeed: (Math.random() - 0.5) * 30, // ±15° random
        })
      }
    }

    // ── Animation tick ──
    function tick() {
      globalOffset.current += SCROLL_SPEED
      if (globalOffset.current >= 1) globalOffset.current -= 1

      const posters = postersRef.current
      const total = posters.length
      const totalLen = totalLenRef.current
      if (totalLen === 0 || total === 0) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mouseActive = mouseRef.current.active

      for (let i = 0; i < total; i++) {
        const p = posters[i]
        // Progress along path
        let t = ((globalOffset.current + i / total) % 1 + 1) % 1
        const pt = path!.getPointAtLength(t * totalLen)
        // Tangent
        const t2 = ((t + 0.001) % 1) * totalLen
        const pt2 = path!.getPointAtLength(t2)
        const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI)

        p.currentPt = pt
        p.baseAngle = angle

        // Check scatter
        if (mouseActive) {
          const dx = mx - pt.x
          const dy = my - pt.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < SCATTER_RADIUS) {
            p.isScattered = true
            const factor = 1 - dist / SCATTER_RADIUS
            const scatterX = -dx * factor * 2.2
            const scatterY = -dy * factor * 2.2
            const scatterRot = p.scatterSeed * factor
            const scale = 0.85 + 0.15 * (dist / SCATTER_RADIUS)

            p.el.style.left = pt.x + "px"
            p.el.style.top = pt.y + "px"
            p.el.style.transform =
              `translate(calc(-50% + ${scatterX}px), calc(-50% + ${scatterY}px)) rotate(${angle + scatterRot}deg) scale(${scale})`
            p.el.style.transition = "transform 0.15s ease-out"
          } else {
            if (p.isScattered) {
              p.el.style.transition = "transform 0.4s cubic-bezier(0.16,1,0.3,1)"
            }
            p.isScattered = false
            p.el.style.left = pt.x + "px"
            p.el.style.top = pt.y + "px"
            p.el.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`
          }
        } else {
          if (p.isScattered) {
            p.el.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)"
          }
          p.isScattered = false
          p.el.style.left = pt.x + "px"
          p.el.style.top = pt.y + "px"
          p.el.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`
          // Clear transition after snap-back
          if (!p.isScattered) {
            p.el.style.transition = "none"
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    // ── Mouse handlers ──
    function onMouseMove(e: MouseEvent) {
      const rect = section!.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      mouseRef.current.active = true
    }

    function onMouseLeave() {
      mouseRef.current.active = false
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
    }

    // ── Resize (debounced) ──
    let resizeTimer: ReturnType<typeof setTimeout>
    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        updatePath()
        // Rebuild posters if count changed
        const needed = getPosterCount()
        if (postersRef.current.length !== needed) {
          buildPosters()
        }
      }, 150)
    }

    // ── Init ──
    updatePath()
    buildPosters()
    rafRef.current = requestAnimationFrame(tick)

    section.addEventListener("mousemove", onMouseMove)
    section.addEventListener("mouseleave", onMouseLeave)
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      section.removeEventListener("mousemove", onMouseMove)
      section.removeEventListener("mouseleave", onMouseLeave)
      window.removeEventListener("resize", onResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        overflow: "hidden",
        background: "#0d0d0d",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* ─── SVG Curve ─── */}
      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
        }}
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          fill="none"
          stroke="transparent"
          strokeWidth="0"
          opacity="0"
        />
      </svg>

      {/* ─── Poster Container ─── */}
      <div
        ref={postersContainerRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* ─── Title (bottom-left) ─── */}
      <div
        style={{
          position: "absolute",
          left: 40,
          bottom: 40,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.3)",
            margin: 0,
            marginBottom: 8,
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Portfolio · Selected Work
        </p>
        <h2
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 900,
            lineHeight: 0.95,
            color: "#fff",
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: "-0.03em",
          }}
        >
          Selected
          <br />
          <span style={{ color: "#e50914", fontStyle: "italic" }}>Work.</span>
        </h2>
      </div>
    </section>
  )
}
