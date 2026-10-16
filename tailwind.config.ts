import type { Config } from "tailwindcss"
import tailwindAnimate from "tailwindcss-animate"

const config: Config = {
  darkMode: ["class"],
  content: [
    // Standard Next.js App Router paths
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Include root level files if any Tailwind classes are used there
    "./*.{js,ts,jsx,tsx,mdx}",
    // If you have a `src` directory, include it
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glitch: {
          // More subtle glitch
          "0%, 100%": { transform: "translate(0)", opacity: "1" },
          "10%": { transform: "translate(-0.2px, 0.2px)", opacity: "0.95" },
          "20%": { transform: "translate(0.2px, -0.2px)", opacity: "0.9" },
          "30%": { transform: "translate(-0.2px, -0.2px)", opacity: "0.95" },
          "40%": { transform: "translate(0.2px, 0.2px)", opacity: "0.9" },
          "50%": { transform: "translate(0)", opacity: "1" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".5" },
        },
        // Keyframes from previous globals.css that might be used directly by Tailwind classes
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        slideInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        spin: {
          // For animate-spin-slow and animate-spin-reverse
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
        blink: {
          // For blink-cursor
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "pulse-border": {
          "0%, 100%": {
            borderColor: "rgba(147, 51, 234, 0.5)", // purple-400/50
            boxShadow: "0 0 15px rgba(147, 51, 234, 0.3)",
          },
          "50%": {
            borderColor: "rgba(236, 72, 153, 0.7)", // fuchsia-400/70
            boxShadow: "0 0 25px rgba(236, 72, 153, 0.5)",
          },
        },
        "gradient-shift": {
          // New keyframe for button gradient
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "text-shine": {
          // New keyframe for text shine effect
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },
        "circuit-glow": {
          // New keyframe for button circuit glow
          "0%, 100%": { boxShadow: "0 0 10px rgba(6, 182, 212, 0.5)" },
          "50%": { boxShadow: "0 0 25px rgba(59, 130, 246, 0.7)" },
        },
        "crazy-shadow": {
          // New keyframe for a more dynamic button shadow
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(147, 51, 234, 0.6), 0 0 40px rgba(236, 72, 153, 0.4)",
          },
          "25%": {
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.7), 0 0 60px rgba(6, 182, 212, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 20px rgba(236, 72, 153, 0.6), 0 0 40px rgba(147, 51, 234, 0.4)",
          },
          "75%": {
            boxShadow: "0 0 30px rgba(6, 182, 212, 0.7), 0 0 60px rgba(59, 130, 246, 0.5)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s infinite",
        glitch: "glitch 1.5s infinite", // Apply subtle glitch
        "pulse-slow": "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 4s ease-in-out infinite",
        scan: "scan 3s linear infinite",
        slideInUp: "slideInUp 0.3s ease-out forwards",
        "spin-slow": "spin 12s linear infinite",
        "spin-reverse": "spin 10s linear infinite reverse",
        twinkle: "twinkle 3s ease-in-out infinite",
        bounce: "bounce 2s infinite",
        "pulse-border": "pulse-border 2s infinite cubic-bezier(0.4, 0, 0.6, 1)",
        "gradient-shift": "gradient-shift 5s ease infinite", // Apply new animation
        "text-shine": "text-shine 3s linear infinite", // Apply new animation
        "circuit-glow": "circuit-glow 3s ease-in-out infinite alternate", // Apply new animation
        "crazy-shadow": "crazy-shadow 4s infinite alternate", // Apply new animation
      },
    },
  },
  plugins: [tailwindAnimate],
}
export default config
