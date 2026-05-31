import React from "react"
import ReactDOM from "react-dom/client"
import { ThemeProvider } from "next-themes"
import DemoOne from "../components/ui/demo"
import BlurTextAnimation from "../components/ui/blur-text-animation"
import { FramerHero } from "../components/ui/framer-hero"
import { TopologyBackground } from "../components/ui/topology-background"
import "./globals.css"

const framerHeroRoot = document.getElementById("framer-hero-react-root")
if (framerHeroRoot) {
  ReactDOM.createRoot(framerHeroRoot).render(
    <React.StrictMode>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <FramerHero />
      </ThemeProvider>
    </React.StrictMode>
  )
}

const topologyRoot = document.getElementById("topology-background-root")
if (topologyRoot) {
  ReactDOM.createRoot(topologyRoot).render(
    <React.StrictMode>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TopologyBackground />
      </ThemeProvider>
    </React.StrictMode>
  )
}

const rootElement = document.getElementById("layered-text-root")
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <DemoOne />
      </ThemeProvider>
    </React.StrictMode>
  )
}

const aboutInfoRoot = document.getElementById("about-info-react-root")
if (aboutInfoRoot) {
  ReactDOM.createRoot(aboutInfoRoot).render(
    <React.StrictMode>
      <BlurTextAnimation 
        text="I'm Sarth Infocus — a multidisciplinary creator working at the intersection of code, design, and photography. I build things that look good, work well, and feel intentional. Currently pursuing a BE in Computer Science at BNCOE, Pusad, with a focus on Generative AI and Model Context Protocol (MCP) systems. I run content and media for HICA BNCOE and manage digital presence for the BNCOE Social Media Team. Whether it's writing Python, directing a frame, or designing a layout — the goal is always the same: make it work and make it count."
        fontSize="text-[0.95rem] leading-[1.7]"
        textColor="text-white/75"
        fontFamily="font-sans"
        className="!min-h-0"
      />
    </React.StrictMode>
  )
}
