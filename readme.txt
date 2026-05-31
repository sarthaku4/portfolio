================================================================================
                              PORTFOLIO WEBSITE
================================================================================

This document provides an overview of the portfolio website, the technologies and 
languages used, the project structure, and instructions on how to run and build 
the project.

--------------------------------------------------------------------------------
1. OVERVIEW
--------------------------------------------------------------------------------
This is a modern, highly interactive portfolio website designed to showcase 
creative work, photography, and brand identity systems. It features a custom 3D 
parallax hero slideshow, smooth scrolling, and dynamic text-roll animations that 
provide a premium, native-app-like user experience.

--------------------------------------------------------------------------------
2. LANGUAGES & TECHNOLOGIES USED
--------------------------------------------------------------------------------
The project is built using a hybrid approach, combining a vanilla web foundation 
with a modern development toolchain:

Core Languages:
- HTML5: For semantic structure and accessibility across multiple pages.
- CSS3: For custom styling, layout (Flexbox/Grid), and the core design system.
- JavaScript (ES6+): For complex animations, logic, and DOM manipulation.

Modern Toolchain & Frameworks:
- Vite: A next-generation frontend tooling system used to bundle the project, 
  handle hot-module replacement (HMR), and optimize assets for production.
- React & TypeScript: Integrated into the build system to support advanced UI 
  components (like shadcn/ui). 
- Tailwind CSS v4: Configured alongside custom CSS for utility-first styling 
  capabilities.

Animation & UX Libraries:
- GSAP (GreenSock Animation Platform): Used extensively in `engine.js` for 
  staggered reveals, scroll-triggered animations, and the loading sequence.
- Lenis: A lightweight smooth-scrolling library that integrates with GSAP's 
  ScrollTrigger to provide buttery-smooth vertical scrolling.

--------------------------------------------------------------------------------
3. PROJECT STRUCTURE
--------------------------------------------------------------------------------
The project is organized in a professional, maintainable directory structure:

/portfolio
│
├── public/                 # Static assets served directly by Vite
│   ├── assets/             # Brand identity and project folders
│   ├── images/             # General images (logos, posters, hero backgrounds)
│   └── slideshow/          # High-resolution images for the 3D hero slider
│
├── src/                    # Source code that goes through the Vite build pipeline
│   ├── scripts/            
│   │   └── engine.js       # Core animation logic, loaders, and event listeners
│   │   └── main.js, etc.   # Additional module scripts
│   ├── styles/             
│   │   └── styles.css      # Primary stylesheet with custom variables
│   │   └── globals.css     # Tailwind and shadcn/ui global variables
│   └── main.tsx            # React entry point
│
├── pages/                  # Additional HTML pages
│   ├── about.html          # About page
│   ├── contact.html        # Contact form and details
│   ├── posts.html          # Blog/Posts directory
│   └── work.html           # Extended portfolio work
│
├── index.html              # The main entry point of the website
├── package.json            # Node.js dependencies and scripts
├── vite.config.ts          # Vite bundler configuration
├── tsconfig.json           # TypeScript compiler configuration
└── tailwind.config.js      # Legacy Tailwind configuration (adapted for v4)

--------------------------------------------------------------------------------
4. HOW WE BUILT THIS WEBSITE
--------------------------------------------------------------------------------
1. Foundation: The initial layout was crafted using vanilla HTML and CSS, focusing 
   on a dark, cinematic aesthetic.
2. Interactivity: GSAP and Lenis were added to introduce the initial loading 
   sequence, the 3D mouse-tracking parallax on the hero canvas, and scroll-bound 
   text reveals.
3. Modernization: The project was migrated from a static folder into a Node.js 
   environment using Vite. This allowed us to split files logically (moving scripts 
   to /src and images to /public) while ensuring that paths are automatically 
   resolved during the build process.
4. Component Readiness: React, TypeScript, and Tailwind were injected into the 
   Vite pipeline. This hybrid setup allows the site to remain largely vanilla 
   for performance, while unlocking the ability to drop in complex React components 
   anywhere in the HTML via dedicated mount points.

--------------------------------------------------------------------------------
5. HOW TO RUN THE PROJECT
--------------------------------------------------------------------------------
Because this project uses Vite to bundle modules, you cannot simply double-click 
the `index.html` file to view it. You must run a local development server.

Prerequisites:
- Node.js installed on your computer.

Commands:
1. Open your terminal in the project directory.
2. Install dependencies (if you haven't already):
   npm install

3. Start the development server:
   npm run dev
   (This will provide a localhost URL, usually http://localhost:5173, which you 
   can open in your browser).

4. Build for production:
   npm run build
   (This compiles and minifies all HTML, CSS, JS, and images into a `dist/` 
   folder, ready to be deployed to a web host like Vercel, Netlify, or GitHub Pages).

================================================================================
