/**
 * Pure state machine and telemetry logic for the 3D Room Assembly Loader.
 * Decoupled from React and Three.js rendering for testability and zero-dependency reuse.
 */

export type AssemblyPhase = 'CALIBRATION' | 'WIREFRAME_CAD' | 'HARDWARE_RIG' | 'HOLO_SYNTHESIS' | 'QUANTUM_READY';

export interface PhaseInfo {
  phase: AssemblyPhase;
  name: string;
  code: string;
  range: [number, number];
  description: string;
  activeModules: string[];
}

export const ASSEMBLY_PHASES: PhaseInfo[] = [
  {
    phase: 'CALIBRATION',
    name: 'SPATIAL TELEMETRY & GRID LOCK',
    code: 'PHASE_01',
    range: [0, 20],
    description: 'Scanning room dimensions, establishing ground plane and coordinate anchor vectors.',
    activeModules: ['FLOOR_GRID', 'ORIGIN_CROSSHAIR', 'VOXEL_BOUNDS'],
  },
  {
    phase: 'WIREFRAME_CAD',
    name: 'STRUCTURAL WIREFRAME DECOMPOSITION',
    code: 'PHASE_02',
    range: [20, 48],
    description: 'Synthesizing wall boundaries, shelving units, bed perimeter, and room frame edges.',
    activeModules: ['WALL_SURFACES', 'BED_FRAME', 'CREDENZA', 'SHELVES'],
  },
  {
    phase: 'HARDWARE_RIG',
    name: 'DEVELOPER BATTLESTATION SYNTHESIS',
    code: 'PHASE_03',
    range: [48, 75],
    description: 'Manifesting dual-monitor array, illuminated Medion desktop PC, gaming chair, and peripherals.',
    activeModules: ['DESK_ARRAY', 'DUAL_SCREENS', 'MEDION_PC', 'GAMING_CHAIR', 'KEYBOARD_RIG'],
  },
  {
    phase: 'HOLO_SYNTHESIS',
    name: 'HOLOGRAPHIC BAKE & UI BEACONS',
    code: 'PHASE_04',
    range: [75, 94],
    description: 'Baking neon shaders, particle fog, and pinning interactive portfolio beacons in 3D space.',
    activeModules: ['PROJECT_BEACON', 'SKILL_MARKER', 'ACHIEVEMENTS_PIN', 'FRESNEL_SHADER', 'INDOOR_PALM'],
  },
  {
    phase: 'QUANTUM_READY',
    name: 'QUANTUM STABILIZATION / READY',
    code: 'PHASE_05',
    range: [94, 100],
    description: 'Environment synchronized. Dimensional gateway open for user exploration.',
    activeModules: ['FULL_SCENE_RENDER', 'CAMERA_WARP_READY'],
  },
];

/**
 * Determine the current assembly phase from numeric progress (0 - 100).
 */
export function getPhaseForProgress(progress: number): PhaseInfo {
  const clamped = Math.max(0, Math.min(100, progress));
  for (let i = ASSEMBLY_PHASES.length - 1; i >= 0; i--) {
    if (clamped >= ASSEMBLY_PHASES[i].range[0]) {
      return ASSEMBLY_PHASES[i];
    }
  }
  return ASSEMBLY_PHASES[0];
}

/**
 * Convert numerical progress to a brutalist hex readout string (e.g., 0x48 / 0x64 [72%]).
 */
export function formatHexProgress(progress: number): string {
  const clamped = Math.max(0, Math.min(100, Math.round(progress)));
  const hexVal = clamped.toString(16).toUpperCase().padStart(2, '0');
  return `0x${hexVal} / 0x64 [${clamped}%]`;
}

/**
 * Calculate assembly progress factor for a specific component based on its launch and completion thresholds.
 * Returns normalized float between 0.0 (unspawned) and 1.0 (fully manifested).
 */
export function calculateComponentProgress(
  overallProgress: number,
  startThreshold: number,
  endThreshold: number
): number {
  if (overallProgress <= startThreshold) return 0;
  if (overallProgress >= endThreshold) return 1;
  const range = endThreshold - startThreshold;
  if (range <= 0) return 1;
  const factor = (overallProgress - startThreshold) / range;
  // Apply cubic ease out for smooth snap
  return 1 - Math.pow(1 - factor, 3);
}

/**
 * Calculate holographic wireframe vs solid materialization ratio.
 */
export function calculateHoloOpacity(progress: number): {
  wireframeOpacity: number;
  solidOpacity: number;
  scanlineIntensity: number;
  laserYPosition: number; // Normalized -2 to +4 height in 3D space
} {
  const p = Math.max(0, Math.min(100, progress)) / 100;

  // Wireframe is sharp early on, then integrates with solid
  const wireframeOpacity = p < 0.8 ? 0.4 + p * 0.5 : 0.8 - (p - 0.8) * 1.5;
  const solidOpacity = p < 0.35 ? 0 : (p - 0.35) / 0.65;
  const scanlineIntensity = 0.3 + 0.7 * Math.sin(p * Math.PI * 4);
  
  // Laser scan sweeps up and down
  const laserYPosition = -1.0 + p * 4.5;

  return {
    wireframeOpacity: Math.max(0.1, Math.min(1, wireframeOpacity)),
    solidOpacity: Math.max(0, Math.min(0.95, solidOpacity)),
    scanlineIntensity: Math.max(0.2, Math.min(1, scanlineIntensity)),
    laserYPosition,
  };
}

/**
 * Generates an array of telemetry terminal logs up to the current progress.
 */
export const TELEMETRY_LOG_DATABASE = [
  { at: 2, text: 'SYS_BOOT: Initializing spatial geometry pipeline' },
  { at: 8, text: 'COORD_INIT: Allocating Cartesian room bounds [X: 8.4m, Y: 4.2m, Z: 6.8m]' },
  { at: 15, text: 'GRID_CALIBRATION: Snapping floor plane to Y=0.00' },
  { at: 22, text: 'STRUCT_PARSE: Reconstructing perimeter wall anchors and window aperture' },
  { at: 30, text: 'CAD_TESSELLATE: Generating 1,840 structural wireframe edges' },
  { at: 38, text: 'PROP_SPAWN: Positioning bed frame [Offset: -2.8, 0.0, 1.2]' },
  { at: 45, text: 'CREDENZA_RIG: Building media credenza and monitor wall bracket' },
  { at: 52, text: 'STATION_SYNTHESIS: Assembling L-desk battlestation & dual curved displays' },
  { at: 60, text: 'CHASSIS_RENDER: Initializing Medion PC rig with RGB fluid intake fans' },
  { at: 68, text: 'ERGONOMICS: Rigging racing bucket chair with 5-point castor base' },
  { at: 76, text: 'FOLIAGE_VOXEL: Procedural palm fronds synthesized [Potted floor accent]' },
  { at: 82, text: 'SPATIAL_VOXEL: Calibrating volumetric lighting and emissive reflections' },
  { at: 88, text: 'SHADERS_HOT_RELOAD: Compiling ACES Filmic tone mapping & fresnel rim' },
  { at: 94, text: 'QUANTUM_SYNC: 3D scene topology validated [0 errors, 14,820 vertices]' },
  { at: 98, text: 'WARP_READY: Gateway calibrated. Transitioning to interactive room.' },
];

export function getLogsForProgress(progress: number) {
  return TELEMETRY_LOG_DATABASE.filter((log) => progress >= log.at);
}
