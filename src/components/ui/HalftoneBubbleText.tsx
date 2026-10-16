"use client"

import React, { useEffect, useRef } from "react"
import { hwfHex, hwfRadius, hwfStep, hwfWarmth } from "./halftone-wordmark-footer"

export interface HalftoneBubbleTextProps {
  lines?: string[]
  dotGap?: number
  radius?: number
  ink?: string
  warm?: string
  interactive?: boolean
  fontFamily?: string
  fontWeight?: number
  className?: string
  style?: React.CSSProperties
}

export const HalftoneBubbleText: React.FC<HalftoneBubbleTextProps> = ({
  lines = ["VAIBHAV", "PANDEY"],
  dotGap = 6,
  radius = 85,
  ink = "#E1E0CC",
  warm = "#f59e0b",
  interactive = true,
  fontFamily = '"Space Grotesk", sans-serif',
  fontWeight = 800,
  className = "",
  style,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const opts = useRef({ lines, dotGap, radius, ink, warm, interactive, fontFamily, fontWeight })
  opts.current = { lines, dotGap, radius, ink, warm, interactive, fontFamily, fontWeight }

  const key = [lines.join("|"), dotGap, radius, ink, warm, fontFamily, fontWeight].join("-")

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let w = 0
    let h = 0
    let dpr = 1
    let px = -1e5
    let py = -1e5
    let raf = 0
    let visible = true
    let awake = true
    let ring = { x: 0, y: 0, t: -1 }

    // Flat arrays: x, y, vx, vy, hx, hy, r per dot
    let dots = new Float32Array(0)
    let count = 0

    const inkRgb = hwfHex(opts.current.ink) || [225, 224, 204]
    const warmRgb = hwfHex(opts.current.warm) || [245, 158, 11]

    const layout = () => {
      const o = opts.current
      const rect = root.getBoundingClientRect()
      w = Math.max(1, Math.round(rect.width))
      h = Math.max(1, Math.round(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)

      const mask = document.createElement("canvas")
      mask.width = w
      mask.height = h
      const m = mask.getContext("2d", { willReadFrequently: true })
      if (!m) return

      m.font = `${o.fontWeight} 100px ${o.fontFamily}`
      let maxLineWidth = 0
      o.lines.forEach((l) => {
        const mw = m.measureText(l).width
        if (mw > maxLineWidth) maxLineWidth = mw
      })

      const lineCount = Math.max(1, o.lines.length)
      const fitWidthSize = maxLineWidth > 0 ? ((w * 0.98) / maxLineWidth) * 100 : 100
      const fitHeightSize = (h * 0.95) / (lineCount * 0.92)
      const fontSize = Math.min(fitWidthSize, fitHeightSize)

      m.font = `${o.fontWeight} ${fontSize}px ${o.fontFamily}`
      m.fillStyle = "#000"
      m.textBaseline = "alphabetic"

      const lineHeight = fontSize * 0.88
      const totalTextHeight = (lineCount - 1) * lineHeight + fontSize * 0.75
      const startY = Math.max(fontSize * 0.75, (h - totalTextHeight) / 2 + fontSize * 0.72)

      o.lines.forEach((lineText, idx) => {
        const y = startY + idx * lineHeight
        m.fillText(lineText, 0, y)
      })

      const img = m.getImageData(0, 0, w, h).data
      const gap = Math.max(3, o.dotGap)
      const cols = Math.ceil(w / gap)
      const rows = Math.ceil(h / gap)
      const tmp: number[] = []

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          let sum = 0
          for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
              const x = Math.min(w - 1, Math.floor(gx * gap + ((sx + 0.5) * gap) / 3))
              const y = Math.min(h - 1, Math.floor(gy * gap + ((sy + 0.5) * gap) / 3))
              sum += img[(y * w + x) * 4 + 3]
            }
          }
          const cov = sum / (9 * 255)
          if (cov < 0.05) continue
          const hx = gx * gap + gap / 2
          const hy = gy * gap + gap / 2
          tmp.push(hx, hy, 0, 0, hx, hy, hwfRadius(cov, gap))
        }
      }

      dots = new Float32Array(tmp)
      count = tmp.length / 7
      awake = true
    }

    const draw = (now: number) => {
      const o = opts.current
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const r = o.interactive && !reduced ? Math.max(0, o.radius) : 0
      const ringAge = ring.t < 0 ? 1e9 : now - ring.t
      const ringR = ringAge * 0.95
      let moving = false

      for (let i = 0; i < count; i++) {
        const j = i * 7
        let x = dots[j]
        let y = dots[j + 1]
        let vx = dots[j + 2]
        let vy = dots[j + 3]
        const hx = dots[j + 4]
        const hy = dots[j + 5]

        if (!reduced) {
          if (ringAge < 900) {
            const dx = hx - ring.x
            const dy = hy - ring.y
            const d = Math.sqrt(dx * dx + dy * dy) + 0.001
            const band = 1 - Math.min(1, Math.abs(d - ringR) / 28)
            if (band > 0) {
              const f = band * 3.5 * (1 - ringAge / 900)
              vx += (dx / d) * f
              vy += (dy / d) * f
            }
          }

          const s = hwfStep(x, y, vx, vy, hx, hy, px, py, r)
          x = s[0]
          y = s[1]
          vx = s[2]
          vy = s[3]

          if (Math.abs(vx) + Math.abs(vy) > 0.02 || Math.abs(x - hx) + Math.abs(y - hy) > 0.05) {
            moving = true
          } else {
            x = hx
            y = hy
            vx = 0
            vy = 0
          }

          dots[j] = x
          dots[j + 1] = y
          dots[j + 2] = vx
          dots[j + 3] = vy
        }

        const k = hwfWarmth(x, y, hx, hy, 28)
        ctx.fillStyle =
          k > 0.02
            ? `rgb(${Math.round(inkRgb[0] + (warmRgb[0] - inkRgb[0]) * k)},${Math.round(
                inkRgb[1] + (warmRgb[1] - inkRgb[1]) * k
              )},${Math.round(inkRgb[2] + (warmRgb[2] - inkRgb[2]) * k)})`
            : o.ink

        ctx.beginPath()
        ctx.arc(x, y, dots[j + 6], 0, Math.PI * 2)
        ctx.fill()
      }

      awake = moving || ringAge < 900 || px > -1e4
    }

    const loop = (now: number) => {
      raf = 0
      if (!visible) return
      draw(now)
      if (awake) raf = requestAnimationFrame(loop)
    }

    const wake = () => {
      awake = true
      if (!raf && visible) raf = requestAnimationFrame(loop)
    }

    const toLocal = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect()
      return [e.clientX - b.left, e.clientY - b.top]
    }

    const onMove = (e: PointerEvent) => {
      if (!opts.current.interactive) return
      const p = toLocal(e)
      px = p[0]
      py = p[1]
      wake()
    }

    const onLeave = () => {
      px = -1e5
      py = -1e5
      wake()
    }

    const onDown = (e: PointerEvent) => {
      if (!opts.current.interactive || reduced) return
      const p = toLocal(e)
      ring = { x: p[0], y: p[1], t: performance.now() }
      wake()
    }

    layout()
    draw(performance.now())
    wake()

    root.addEventListener("pointermove", onMove as EventListener)
    root.addEventListener("pointerleave", onLeave as EventListener)
    root.addEventListener("pointerdown", onDown as EventListener)

    const ro = new ResizeObserver(() => {
      layout()
      wake()
    })
    ro.observe(root)

    const io = new IntersectionObserver((entries) => {
      visible = entries[0] ? entries[0].isIntersecting : true
      if (visible) wake()
    })
    io.observe(root)

    let alive = true
    const docWithFonts = document as unknown as { fonts?: { ready: Promise<unknown> } }
    if (docWithFonts.fonts) {
      docWithFonts.fonts.ready.then(() => {
        if (!alive) return
        layout()
        wake()
      })
    }

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      root.removeEventListener("pointermove", onMove as EventListener)
      root.removeEventListener("pointerleave", onLeave as EventListener)
      root.removeEventListener("pointerdown", onDown as EventListener)
    }
  }, [key])

  return (
    <div
      ref={rootRef}
      className={`relative w-full h-full select-none cursor-pointer overflow-hidden ${className}`.trim()}
      style={style}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  )
}

export default HalftoneBubbleText
