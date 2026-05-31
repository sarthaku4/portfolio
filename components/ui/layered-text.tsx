"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import type React from "react"

interface LayeredTextProps {
  lines?: Array<{ top: string; bottom: string }>
  fontSize?: string
  fontSizeMd?: string
  lineHeight?: number
  lineHeightMd?: number
  className?: string
}

export function LayeredText({
  lines = [
    { top: "\u00A0", bottom: "INFINITE" },
    { top: "INFINITE", bottom: "PROGRESS" },
    { top: "PROGRESS", bottom: "INNOVATION" },
    { top: "INNOVATION", bottom: "FUTURE" },
    { top: "FUTURE", bottom: "DREAMS" },
    { top: "DREAMS", bottom: "ACHIEVEMENT" },
    { top: "ACHIEVEMENT", bottom: "\u00A0" },
  ],
  fontSize = "72px",
  fontSizeMd = "36px",
  lineHeight = 60,
  lineHeightMd = 35,
  className = "",
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline>()

  const calculateTranslateX = (index: number) => {
    const baseOffset = 35
    const baseOffsetMd = 20
    const centerIndex = Math.floor(lines.length / 2)
    return {
      desktop: (index - centerIndex) * baseOffset,
      mobile: (index - centerIndex) * baseOffsetMd,
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const paragraphs = container.querySelectorAll("p")

    timelineRef.current = gsap.timeline({ paused: true })

    timelineRef.current.to(paragraphs, {
      y: window.innerWidth >= 768 ? -60 : -35,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
    })

    const handleMouseEnter = () => {
      timelineRef.current?.play()
    }

    const handleMouseLeave = () => {
      timelineRef.current?.reverse()
    }

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
      timelineRef.current?.kill()
    }
  }, [lines])

  return (
    <div
      ref={containerRef}
      className={`mx-auto py-12 font-sans font-black tracking-[-2px] uppercase text-black dark:text-white antialiased cursor-pointer ${className}`}
    >
      <style>{`
        .layered-text-container {
          font-size: ${fontSizeMd};
        }
        .layered-text-li {
          height: var(--md-height) !important;
          transform: translateX(var(--md-translateX)) skew(var(--skew)) scaleY(var(--scale-y)) !important;
        }
        .layered-text-p {
          height: var(--md-height) !important;
          line-height: calc(var(--md-height) - 5px) !important;
        }
        
        @media (min-width: 768px) {
          .layered-text-container {
            font-size: ${fontSize};
          }
          .layered-text-li {
            height: var(--lg-height) !important;
            transform: translateX(var(--lg-translateX)) skew(var(--skew)) scaleY(var(--scale-y)) !important;
          }
          .layered-text-p {
            height: var(--lg-height) !important;
            line-height: calc(var(--lg-height) - 5px) !important;
          }
        }
      `}</style>
      <ul className="list-none p-0 m-0 flex flex-col items-center layered-text-container">
        {lines.map((line, index) => {
          const translateX = calculateTranslateX(index)
          const isEven = index % 2 === 0
          const skewVal = isEven ? "60deg, -30deg" : "0deg, -30deg"
          const scaleYVal = isEven ? "0.66667" : "1.33333"
          
          return (
            <li
              key={index}
              className="overflow-hidden relative layered-text-li"
              style={
                {
                  "--lg-height": `${lineHeight}px`,
                  "--md-height": `${lineHeightMd}px`,
                  "--lg-translateX": `${translateX.desktop}px`,
                  "--md-translateX": `${translateX.mobile}px`,
                  "--skew": skewVal,
                  "--scale-y": scaleYVal,
                } as React.CSSProperties
              }
            >
              <p className="px-[15px] align-top whitespace-nowrap m-0 layered-text-p">
                {line.top}
              </p>
              <p className="px-[15px] align-top whitespace-nowrap m-0 layered-text-p">
                {line.bottom}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
