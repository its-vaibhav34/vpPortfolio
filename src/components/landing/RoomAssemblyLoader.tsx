import React, { useState, useEffect, useRef } from 'react';
import { ThreeRoomAssembly } from './ThreeRoomAssembly';
import { getLogsForProgress } from '../../utils/loaderLogic';
import { soundFx } from '../../utils/audioSynth';
import { Terminal } from 'lucide-react';

export interface RoomAssemblyLoaderProps {
  /**
   * Optional controlled progress (0 - 100). If not provided, runs at 1x speed automatically.
   */
  progress?: number;
  /**
   * Optional callback when progress reaches 100%.
   */
  onComplete?: () => void;
  /**
   * Whether to loop the animation continuously after reaching 100% (default: false for portfolio transition).
   */
  autoLoop?: boolean;
}

export const RoomAssemblyLoader: React.FC<RoomAssemblyLoaderProps> = ({
  progress: controlledProgress,
  onComplete,
  autoLoop = false,
}) => {
  const [internalProgress, setInternalProgress] = useState(0);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const rawProgress = controlledProgress !== undefined ? controlledProgress : internalProgress;
  const currentProgress = Math.max(0, Math.min(100, rawProgress));
  const logs = getLogsForProgress(currentProgress);

  // Auto-progress animation loop at fixed 1x speed (~5.5 seconds assembly duration)
  useEffect(() => {
    if (controlledProgress !== undefined) return;

    let lastTime = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const deltaSec = Math.max(0, Math.min(0.1, (now - lastTime) / 1000));
      lastTime = now;

      setInternalProgress((prev) => {
        if (prev >= 100) {
          if (!completedRef.current) {
            completedRef.current = true;
            soundFx.playWarpBurst();

            if (autoLoop) {
              if (onComplete) onComplete();
              // Pause at 100% for 3 seconds then seamlessly restart
              timeoutRef.current = window.setTimeout(() => {
                completedRef.current = false;
                setInternalProgress(0);
                soundFx.playLaserSweep();
              }, 3000);
            } else {
              // Single run: finish warp burst then transition into portfolio
              timeoutRef.current = window.setTimeout(() => {
                if (onComplete) onComplete();
              }, 500);
            }
          }
          return 100;
        }

        // Fixed 1x speed duration (~5.5s)
        const increment = (100 / 5.5) * deltaSec;
        const next = Math.max(0, Math.min(100, prev + increment));

        // Procedural audio tick at intervals
        if (Math.floor(next / 9) > Math.floor(prev / 9)) {
          soundFx.playTick();
        }

        return next;
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animId);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [controlledProgress, onComplete, autoLoop]);

  // Auto-scroll the live telemetry terminal buffer
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs.length]);

  return (
    <div
      data-testid="room-assembly-loader"
      className="relative w-screen h-screen bg-[#07090e] text-slate-100 font-mono overflow-hidden select-none"
    >
      {/* 3D WebGL Canvas Layer - Full Viewport, 1x Speed Animation, Drag to Rotate */}
      <ThreeRoomAssembly
        progress={currentProgress}
        theme="CYBER_BLUE"
        renderStyle="HOLOGRAPHIC_GLOW"
        cameraPreset="ISOMETRIC"
        autoRotate={true}
      />

      {/* Cybernetic Scanline & Noise Overlay */}
      <div className="absolute inset-0 scanlines-overlay pointer-events-none opacity-40 z-10" />

      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-25 z-10" />

      {/* ONLY Live Kernel Telemetry Buffer Box (Kept per user specification) */}
      <div className="absolute bottom-6 left-6 max-w-sm sm:max-w-md w-[calc(100vw-3rem)] sm:w-full bg-[#080d17]/95 border border-cyan-500/30 rounded-xl p-4 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.8)] z-20 pointer-events-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-2.5">
          <div className="flex items-center gap-2 text-xs text-cyan-400 uppercase tracking-widest font-bold">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>LIVE KERNEL TELEMETRY BUFFER</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] text-slate-400 font-mono">
              {logs.length} ACTIVE
            </span>
          </div>
        </div>

        <div
          ref={logContainerRef}
          className="h-32 overflow-y-auto space-y-1.5 font-mono text-[11px] text-slate-300 pr-1.5 scroll-smooth"
        >
          {logs.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 leading-tight">
              <span className="text-cyan-400 font-bold select-none">&gt;</span>
              <span
                className={
                  idx === logs.length - 1
                    ? 'text-cyan-300 font-semibold'
                    : 'text-slate-400'
                }
              >
                {item.text}
              </span>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-slate-600 italic">Initializing coordinate stream...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomAssemblyLoader;
