(function () {
  function initFramerHero() {
    var root = document.getElementById("framer-hero-react-root");
    if (!root) return;

    // Inject marquee keyframe animation
    var styleEl = document.createElement("style");
    styleEl.textContent =
      "@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}";
    document.head.appendChild(styleEl);

    // ── Container ──
    var container = document.createElement("div");
    Object.assign(container.style, {
      position: "relative",
      width: "100%",
      overflow: "hidden",
      backgroundColor: "#0e0e0e",
      color: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "90vh",
      paddingTop: "5rem",
      paddingBottom: "5rem",
      marginTop: "4rem",
      zIndex: "50",
    });

    // ── Avatar wrapper ──
    var avatarWrap = document.createElement("div");
    Object.assign(avatarWrap.style, {
      position: "relative",
      width: "8rem",
      height: "8rem",
      borderRadius: "50%",
      overflow: "hidden",
      marginBottom: "1.5rem",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
      zIndex: "10",
      border: "6px solid #1a1a1a",
    });

    var avatarImg = document.createElement("img");
    avatarImg.src = "/portfolio/slideshow/sarth-avatar-cropped.jpeg";
    avatarImg.alt = "Sarth Avatar";
    Object.assign(avatarImg.style, {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    });
    avatarWrap.appendChild(avatarImg);

    // ── Heading wrapper ──
    var headingWrap = document.createElement("div");
    Object.assign(headingWrap.style, {
      position: "relative",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "0",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      marginBottom: "3rem",
    });

    var h1 = document.createElement("h1");
    h1.textContent = "SARTH©";
    Object.assign(h1.style, {
      fontSize: "18vw",
      lineHeight: "0.8",
      fontWeight: "900",
      letterSpacing: "-0.06em",
      color: "#ffffff",
      margin: "0",
      padding: "0",
      textAlign: "center",
      userSelect: "none",
      opacity: "0.9",
      filter: "drop-shadow(0 25px 25px rgba(0,0,0,0.15))",
    });
    headingWrap.appendChild(h1);

    // ── Marquee banner ──
    var banner = document.createElement("div");
    Object.assign(banner.style, {
      position: "absolute",
      top: "65%",
      left: "0",
      width: "120%",
      transform: "translateX(-5%) translateY(-50%) rotate(-3deg)",
      backgroundColor: "#ffffff",
      color: "#000000",
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
      zIndex: "20",
      overflow: "hidden",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
      display: "flex",
      alignItems: "center",
      borderTop: "1px solid rgba(255,255,255,0.2)",
      borderBottom: "1px solid rgba(255,255,255,0.2)",
      willChange: "transform",
    });

    var track = document.createElement("div");
    Object.assign(track.style, {
      display: "flex",
      whiteSpace: "nowrap",
      alignItems: "center",
      gap: "1.5rem",
      fontSize: "1.25rem",
      fontWeight: "700",
      letterSpacing: "-0.025em",
      textTransform: "uppercase",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      animation: "marquee 20s linear infinite",
    });

    var labels = [
      { text: "Multidisciplinary Creator", italic: false },
      { text: "·", italic: false },
      { text: "Web Designer", italic: true },
      { text: "·", italic: false },
      { text: "Photographer", italic: false },
      { text: "·", italic: false },
      { text: "UI/UX Specialist", italic: false },
      { text: "·", italic: false },
      { text: "Video Producer", italic: false },
      { text: "·", italic: false },
    ];

    // Duplicate 12 times (6 original sets × 2 for seamless loop)
    for (var r = 0; r < 12; r++) {
      for (var l = 0; l < labels.length; l++) {
        var span = document.createElement("span");
        span.textContent = labels[l].text;
        if (labels[l].italic) {
          span.style.fontStyle = "italic";
          span.style.fontWeight = "900";
          span.style.color = "#2563eb";
        }
        track.appendChild(span);
      }
    }

    banner.appendChild(track);

    // ── Assemble ──
    container.appendChild(avatarWrap);
    container.appendChild(headingWrap);
    container.appendChild(banner);
    root.appendChild(container);

    // ── Responsive styles for md breakpoint ──
    function applyResponsive() {
      var md = window.matchMedia("(min-width: 768px)").matches;
      avatarWrap.style.width = md ? "11rem" : "8rem";
      avatarWrap.style.height = md ? "11rem" : "8rem";
      h1.style.fontSize = md ? "22vw" : "18vw";
      banner.style.paddingTop = md ? "1.25rem" : "0.75rem";
      banner.style.paddingBottom = md ? "1.25rem" : "0.75rem";
      track.style.fontSize = md ? "1.875rem" : "1.25rem";
    }
    applyResponsive();
    window.addEventListener("resize", applyResponsive);

    // ── GSAP entrance animation ──
    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        container,
        {
          y: 80,
          opacity: 0,
          rotationX: 10,
          transformPerspective: 1200,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFramerHero);
  } else {
    initFramerHero();
  }
})();
