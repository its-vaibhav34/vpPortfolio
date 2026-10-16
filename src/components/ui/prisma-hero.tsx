import React, { useRef, type CSSProperties } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HalftoneBubbleText } from "./HalftoneBubbleText";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */
export interface PrismaHeroProps {
  title?: string;
  nameLines?: string[];
  subtitle?: string;
  bio?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  videoSrc?: string;
  socials?: Array<{
    label: string;
    href: string;
    icon: React.ReactNode;
  }>;
}

const PrismaHero = ({
  title = "VAIBHAV PANDEY",
  nameLines,
  bio = "Computer Science undergraduate with hands-on experience in Java, full-stack web development, and IoT, focused on building practical solutions through real-world projects, hackathons, and continuous problem-solving.",
  ctaText = "Enter Portfolio",
  onCtaClick,
  videoSrc = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4",
  socials,
}: PrismaHeroProps) => {
  return (
    <section className="h-screen w-full p-2 sm:p-4 md:p-6 bg-obsidian flex flex-col justify-center">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-stone-800/60 shadow-2xl">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/85" />

        {/* Top-right subtle badge or status (without navbar) */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-10">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-stone-800/80 text-xs font-mono text-stone-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open to Work</span>
          </div>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 sm:px-6 md:px-10 md:pb-8 lg:pb-10">
          <div className="grid grid-cols-12 items-end gap-6">
            <div className="col-span-12 lg:col-span-8">
              <div className="mb-1">
                <span className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-amber-400/90 font-medium">
                  Welcome to my portfolio
                </span>
              </div>
              <div className="w-full h-[160px] sm:h-[190px] md:h-[230px] lg:h-[270px] xl:h-[300px] relative">
                <HalftoneBubbleText
                  lines={nameLines && nameLines.length > 0 ? nameLines : title.split(" ")}
                  dotGap={5}
                  radius={85}
                  ink="#E1E0CC"
                  warm="#f59e0b"
                  fontWeight={800}
                />
              </div>
            </div>

            <div className="col-span-12 flex flex-col gap-5 pb-2 sm:pb-4 lg:col-span-4 lg:pb-6">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-base text-stone-300 font-light leading-relaxed"
              >
                {bio}
              </motion.p>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <motion.button
                  onClick={onCtaClick}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="group inline-flex items-center gap-2 self-start rounded-full bg-[#E1E0CC] py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-all hover:gap-3 hover:bg-white sm:text-base cursor-pointer shadow-lg hover:shadow-amber-500/10"
                >
                  {ctaText}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4" style={{ color: "#E1E0CC" }} />
                  </span>
                </motion.button>

                {socials && socials.length > 0 && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-full bg-black/50 backdrop-blur-md border border-stone-800"
                  >
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="text-stone-400 hover:text-amber-400 transition-colors p-1"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
