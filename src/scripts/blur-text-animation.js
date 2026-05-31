(function () {
  function initAboutText() {
    var root = document.getElementById("about-info-react-root");
    if (!root) return;

    var text =
      "I'm Sarth Infocus \u2014 a multidisciplinary creator working at the intersection of code, design, and photography. I build things that look good, work well, and feel intentional. Currently pursuing a BE in Computer Science at BNCOE, Pusad, with a focus on Generative AI and Model Context Protocol (MCP) systems. I run content and media for HICA BNCOE and manage digital presence for the BNCOE Social Media Team. Whether it\u2019s writing Python, directing a frame, or designing a layout \u2014 the goal is always the same: make it work and make it count.";

    var p = document.createElement("p");
    p.textContent = text;
    Object.assign(p.style, {
      color: "rgba(255,255,255,0.75)",
      fontSize: "0.95rem",
      lineHeight: "1.7",
      fontFamily: "sans-serif",
      margin: "0",
    });

    root.appendChild(p);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAboutText);
  } else {
    initAboutText();
  }
})();
