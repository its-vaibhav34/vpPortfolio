import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { calculateComponentProgress, calculateHoloOpacity } from '../../utils/loaderLogic';

export type LoaderTheme = 'CYBER_BLUE' | 'AMBER_CAD' | 'MATRIX_EMERALD';
export type RenderStyle = 'WIREFRAME_CAD' | 'HOLOGRAPHIC_GLOW' | 'SOLID_HYBRID';

interface ThreeRoomAssemblyProps {
  progress: number; // 0 to 100
  theme?: LoaderTheme;
  renderStyle?: RenderStyle;
  cameraPreset?: 'ISOMETRIC' | 'TOP_DOWN' | 'BATTLESTATION_FOCUS' | 'FREE_ORBIT';
  autoRotate?: boolean;
}

// Module-scope temporary vectors for zero-garbage animation loop
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3(0, 1.2, 0);

export const ThreeRoomAssembly: React.FC<ThreeRoomAssemblyProps> = ({
  progress,
  theme = 'CYBER_BLUE',
  renderStyle = 'HOLOGRAPHIC_GLOW',
  cameraPreset = 'ISOMETRIC',
  autoRotate = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const roomGroupRef = useRef<THREE.Group | null>(null);
  const laserPlaneRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const pcFansRef = useRef<THREE.Group[]>([]);

  // Mutable state stored in ref to prevent tearing down WebGL on React re-render
  const stateRef = useRef({
    progress,
    theme,
    renderStyle,
    cameraPreset,
    autoRotate,
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    orbitAngleX: 0.45,
    orbitAngleY: 0.55,
    cameraDistance: 11.5,
  });

  // Keep stateRef synced
  useEffect(() => {
    stateRef.current.progress = progress;
    stateRef.current.theme = theme;
    stateRef.current.renderStyle = renderStyle;
    stateRef.current.cameraPreset = cameraPreset;
    stateRef.current.autoRotate = autoRotate;
  }, [progress, theme, renderStyle, cameraPreset, autoRotate]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const isHeadless =
      typeof navigator !== 'undefined' &&
      (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x07090e);
    scene.fog = new THREE.FogExp2(0x07090e, 0.045);

    // Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(9.5, 7.8, 9.5);
    camera.lookAt(0, 1.2, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isHeadless,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x1a243b, 1.5);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x00f0ff, 0x05070f, 1.2);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xd4e5ff, 2.0);
    keyLight.position.set(8, 12, 6);
    scene.add(keyLight);

    const cyberPointLight = new THREE.PointLight(0x00f0ff, 3.5, 12);
    cyberPointLight.position.set(2.5, 2.2, 0.5);
    scene.add(cyberPointLight);

    const amberAccentLight = new THREE.PointLight(0xffa200, 2.0, 10);
    amberAccentLight.position.set(-2.5, 1.5, -1.5);
    scene.add(amberAccentLight);

    // -------------------------------------------------------------
    // Procedural Room Model Group
    // -------------------------------------------------------------
    const roomGroup = new THREE.Group();
    scene.add(roomGroup);
    roomGroupRef.current = roomGroup;

    // Materials generator based on theme
    const getThemeColors = (th: LoaderTheme) => {
      switch (th) {
        case 'AMBER_CAD':
          return { primary: 0xf59e0b, secondary: 0xffd166, accent: 0xff4d00, dark: 0x18140c };
        case 'MATRIX_EMERALD':
          return { primary: 0x10b981, secondary: 0x34d399, accent: 0x065f46, dark: 0x07150f };
        case 'CYBER_BLUE':
        default:
          return { primary: 0x00f0ff, secondary: 0x38bdf8, accent: 0x818cf8, dark: 0x09101d };
      }
    };

    const colors = getThemeColors(stateRef.current.theme);

    // Procedural Grid Texture for screens & hologram planes
    const createScreenCanvasTexture = (label: string, sublabel: string) => {
      const cvs = document.createElement('canvas');
      cvs.width = 512;
      cvs.height = 256;
      const ctx = cvs.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#060913';
        ctx.fillRect(0, 0, 512, 256);

        // Tech grid lines
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.18)';
        ctx.lineWidth = 1;
        for (let x = 0; x < 512; x += 32) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 256);
          ctx.stroke();
        }
        for (let y = 0; y < 256; y += 32) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(512, y);
          ctx.stroke();
        }

        // Code and readout text
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#00f0ff';
        ctx.fillText(`[ ${label} ]`, 28, 48);

        ctx.font = '14px monospace';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('> SYSTEM_RECONSTRUCTION: ACTIVE', 28, 88);
        ctx.fillText('> VERTEX_STREAM: 14.8k BUFFER_OK', 28, 114);
        ctx.fillText('> RENDERING: BRUTALIST_3D_PORTFOLIO', 28, 140);
        ctx.fillText(`> STATUS: ${sublabel}`, 28, 166);

        // Waveform
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < 450; x += 5) {
          const y = 210 + Math.sin(x * 0.05) * 15;
          if (x === 0) ctx.moveTo(28 + x, y);
          else ctx.lineTo(28 + x, y);
        }
        ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(cvs);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const screenTexture = createScreenCanvasTexture('DEV_BATTLESTATION_CORE', 'HOLOGRAPHIC_SYNC');

    // Base materials
    const lineMat = new THREE.LineBasicMaterial({
      color: colors.primary,
      transparent: true,
      opacity: 0.8,
    });

    // Floor Base and Grid
    const floorGeo = new THREE.PlaneGeometry(8.5, 8.5, 18, 18);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMesh = new THREE.Mesh(
      floorGeo,
      new THREE.MeshStandardMaterial({
        color: 0x0a0e17,
        roughness: 0.8,
        metalness: 0.3,
        transparent: true,
        opacity: 0.9,
      })
    );
    floorMesh.position.y = 0;
    roomGroup.add(floorMesh);

    const floorWireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(floorGeo),
      new THREE.LineBasicMaterial({ color: colors.primary, transparent: true, opacity: 0.35 })
    );
    roomGroup.add(floorWireframe);

    // Floor boundary rim
    const rimBox = new THREE.BoxGeometry(8.6, 0.15, 8.6);
    const rimMesh = new THREE.Mesh(
      rimBox,
      new THREE.MeshStandardMaterial({ color: 0x111726, metalness: 0.6, roughness: 0.4 })
    );
    rimMesh.position.set(0, -0.08, 0);
    roomGroup.add(rimMesh);

    // Structural Walls (Meeting at corner as in reference)
    // Left Wall
    const leftWallGeo = new THREE.BoxGeometry(0.12, 4.4, 8.5);
    const leftWall = new THREE.Mesh(
      leftWallGeo,
      new THREE.MeshStandardMaterial({
        color: 0x171c2b,
        roughness: 0.6,
        metalness: 0.2,
        transparent: true,
        opacity: 0.75,
      })
    );
    leftWall.position.set(-4.25, 2.2, 0);
    roomGroup.add(leftWall);

    const leftWallWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(leftWallGeo),
      new THREE.LineBasicMaterial({ color: colors.secondary, transparent: true, opacity: 0.4 })
    );
    leftWallWire.position.copy(leftWall.position);
    roomGroup.add(leftWallWire);

    // Back Wall
    const backWallGeo = new THREE.BoxGeometry(8.5, 4.4, 0.12);
    const backWall = new THREE.Mesh(
      backWallGeo,
      new THREE.MeshStandardMaterial({
        color: 0x1a2133,
        roughness: 0.6,
        metalness: 0.2,
        transparent: true,
        opacity: 0.75,
      })
    );
    backWall.position.set(0, 2.2, -4.25);
    roomGroup.add(backWall);

    const backWallWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(backWallGeo),
      new THREE.LineBasicMaterial({ color: colors.secondary, transparent: true, opacity: 0.4 })
    );
    backWallWire.position.copy(backWall.position);
    roomGroup.add(backWallWire);

    // Wood Trim Frame at Wall Top
    const trimGeo = new THREE.BoxGeometry(8.6, 0.25, 0.3);
    const trimMesh = new THREE.Mesh(
      trimGeo,
      new THREE.MeshStandardMaterial({ color: 0x271912, roughness: 0.5 })
    );
    trimMesh.position.set(0, 4.4, -4.2);
    roomGroup.add(trimMesh);

    // Wall Art Poster: The Vaibhav Geometric Icon Poster
    const posterGeo = new THREE.PlaneGeometry(1.6, 2.0);
    const posterCvs = document.createElement('canvas');
    posterCvs.width = 256;
    posterCvs.height = 320;
    const pctx = posterCvs.getContext('2d');
    if (pctx) {
      pctx.fillStyle = '#0f1118';
      pctx.fillRect(0, 0, 256, 320);
      pctx.strokeStyle = '#00f0ff';
      pctx.lineWidth = 14;
      pctx.lineCap = 'round';
      // Logo shape matching reference
      pctx.beginPath();
      pctx.moveTo(70, 70);
      pctx.lineTo(128, 170);
      pctx.lineTo(128, 270);
      pctx.stroke();

      pctx.beginPath();
      pctx.moveTo(186, 70);
      pctx.lineTo(128, 170);
      pctx.stroke();
    }
    const posterTex = new THREE.CanvasTexture(posterCvs);
    const posterMesh = new THREE.Mesh(
      posterGeo,
      new THREE.MeshStandardMaterial({ map: posterTex, roughness: 0.4 })
    );
    posterMesh.position.set(2.4, 2.7, -4.18);
    roomGroup.add(posterMesh);

    // -------------------------------------------------------------
    // Bed Module (Left side)
    // -------------------------------------------------------------
    const bedGroup = new THREE.Group();
    bedGroup.name = 'BED_MODULE';
    bedGroup.position.set(-2.5, 0, 1.4);

    // Bed frame
    const bedFrame = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.45, 3.4),
      new THREE.MeshStandardMaterial({ color: 0x1f1915, roughness: 0.6 })
    );
    bedFrame.position.set(0, 0.25, 0);
    bedGroup.add(bedFrame);

    // Mattress with Cyan/Blue Duvet
    const mattress = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.35, 3.2),
      new THREE.MeshStandardMaterial({
        color: 0x0284c7, // electric sky/blue duvet
        roughness: 0.7,
        metalness: 0.1,
      })
    );
    mattress.position.set(0, 0.6, 0);
    bedGroup.add(mattress);

    // White Pillows
    const pillowGeo = new THREE.BoxGeometry(0.85, 0.15, 0.55);
    const pillowMat = new THREE.MeshStandardMaterial({ color: 0xededed, roughness: 0.8 });
    const pillow1 = new THREE.Mesh(pillowGeo, pillowMat);
    pillow1.position.set(-0.5, 0.82, -1.1);
    const pillow2 = new THREE.Mesh(pillowGeo, pillowMat);
    pillow2.position.set(0.5, 0.82, -1.1);
    bedGroup.add(pillow1);
    bedGroup.add(pillow2);

    // Headboard
    const headboard = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 1.2, 0.15),
      new THREE.MeshStandardMaterial({ color: 0x1a1512, roughness: 0.7 })
    );
    headboard.position.set(0, 0.75, -1.65);
    bedGroup.add(headboard);

    // Nightstand
    const nightstand = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.75, 0.85),
      new THREE.MeshStandardMaterial({ color: 0x1d1815, roughness: 0.7 })
    );
    nightstand.position.set(0.2, 0.38, 2.3);
    bedGroup.add(nightstand);

    // Wireframe overlay for bed
    const bedWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.BoxGeometry(2.4, 0.9, 3.4)),
      lineMat
    );
    bedWire.position.set(0, 0.45, 0);
    bedGroup.add(bedWire);

    roomGroup.add(bedGroup);

    // -------------------------------------------------------------
    // Battlestation Developer Desk Rig (Right side)
    // -------------------------------------------------------------
    const deskGroup = new THREE.Group();
    deskGroup.name = 'DESK_MODULE';
    deskGroup.position.set(2.1, 0, 0.4);

    // Black L-style Desk Top
    const deskTop = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.1, 3.2),
      new THREE.MeshStandardMaterial({
        color: 0x11141c,
        roughness: 0.3,
        metalness: 0.4,
      })
    );
    deskTop.position.set(0, 1.35, 0);
    deskGroup.add(deskTop);

    // Desk LED Underglow Edge Strip
    const deskStrip = new THREE.Mesh(
      new THREE.BoxGeometry(1.62, 0.04, 3.22),
      new THREE.MeshBasicMaterial({ color: colors.primary })
    );
    deskStrip.position.set(0, 1.31, 0);
    deskGroup.add(deskStrip);

    // Desk Drawer Pedestal & Metal Legs
    const drawerBlock = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 1.2, 0.9),
      new THREE.MeshStandardMaterial({ color: 0x181c26, roughness: 0.5 })
    );
    drawerBlock.position.set(0, 0.65, 1.0);
    deskGroup.add(drawerBlock);

    const deskLeg = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 1.3, 1.3),
      new THREE.MeshStandardMaterial({ color: 0x242a3a, metalness: 0.8 })
    );
    deskLeg.position.set(0, 0.65, -1.4);
    deskGroup.add(deskLeg);

    // Curved Ultra-Wide Main Monitor
    const mainMonitorBezel = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.8, 1.5),
      new THREE.MeshStandardMaterial({ color: 0x090b10, metalness: 0.9, roughness: 0.2 })
    );
    mainMonitorBezel.position.set(-0.2, 2.05, -0.3);
    deskGroup.add(mainMonitorBezel);

    const mainScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.44, 0.74),
      new THREE.MeshBasicMaterial({
        map: screenTexture,
        side: THREE.DoubleSide,
      })
    );
    mainScreen.rotation.y = Math.PI / 2;
    mainScreen.position.set(-0.251, 2.05, -0.3);
    deskGroup.add(mainScreen);

    // Secondary Auxiliary Monitor (angled towards user)
    const auxMonitor = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.8, 1.0),
      new THREE.MeshStandardMaterial({ color: 0x090b10, metalness: 0.9 })
    );
    auxMonitor.position.set(-0.05, 2.05, -1.35);
    auxMonitor.rotation.y = 0.35;
    deskGroup.add(auxMonitor);

    const auxScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.95, 0.74),
      new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
      })
    );
    auxScreen.rotation.y = Math.PI / 2 + 0.35;
    auxScreen.position.set(-0.11, 2.05, -1.35);
    deskGroup.add(auxScreen);

    // Streaming Ring Light
    const ringLightStand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 1.1),
      new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8 })
    );
    ringLightStand.position.set(0.35, 2.0, -0.6);
    deskGroup.add(ringLightStand);

    const ringLight = new THREE.Mesh(
      new THREE.TorusGeometry(0.2, 0.025, 12, 32),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    ringLight.position.set(0.35, 2.55, -0.6);
    ringLight.rotation.y = Math.PI / 2;
    deskGroup.add(ringLight);

    // Gaming Mechanical Keyboard & Mouse Pad
    const mousePad = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.02, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x141822, roughness: 0.9 })
    );
    mousePad.position.set(-0.35, 1.41, -0.2);
    deskGroup.add(mousePad);

    const keyboard = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.04, 0.7),
      new THREE.MeshStandardMaterial({ color: 0x222634, metalness: 0.5 })
    );
    keyboard.position.set(-0.35, 1.43, -0.2);
    deskGroup.add(keyboard);

    // Wireframe overlay for desk
    const deskWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.BoxGeometry(1.6, 1.4, 3.2)),
      lineMat
    );
    deskWire.position.set(0, 0.7, 0);
    deskGroup.add(deskWire);

    roomGroup.add(deskGroup);

    // -------------------------------------------------------------
    // Medion PC Tower Rig with Glowing Rotating Fans
    // -------------------------------------------------------------
    const pcGroup = new THREE.Group();
    pcGroup.name = 'MEDION_PC';
    pcGroup.position.set(2.2, 1.4, 1.1);

    // PC Chassis Box
    const pcCase = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.95, 0.45),
      new THREE.MeshStandardMaterial({
        color: 0x08090d,
        metalness: 0.95,
        roughness: 0.15,
        transparent: true,
        opacity: 0.85,
      })
    );
    pcGroup.add(pcCase);

    // Glass side panel
    const glassPanel = new THREE.Mesh(
      new THREE.PlaneGeometry(0.88, 0.92),
      new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.25,
        metalness: 0.9,
        roughness: 0.05,
      })
    );
    glassPanel.rotation.y = -Math.PI / 2;
    glassPanel.position.set(-0.451, 0, 0);
    pcGroup.add(glassPanel);

    // Two Dual Front RGB Ring Fans
    const fanMeshes: THREE.Group[] = [];
    [-0.22, 0.22].forEach((yOff) => {
      const fanGroup = new THREE.Group();
      fanGroup.position.set(0, yOff, 0.23);

      const fanRing = new THREE.Mesh(
        new THREE.RingGeometry(0.12, 0.16, 24),
        new THREE.MeshBasicMaterial({ color: colors.primary, side: THREE.DoubleSide })
      );
      fanGroup.add(fanRing);

      const fanBlades = new THREE.Mesh(
        new THREE.CircleGeometry(0.12, 5),
        new THREE.MeshBasicMaterial({ color: colors.secondary, wireframe: true })
      );
      fanGroup.add(fanBlades);

      pcGroup.add(fanGroup);
      fanMeshes.push(fanGroup);
    });
    pcFansRef.current = fanMeshes;

    // Glowing internal GPU block
    const gpuBlock = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.15, 0.25),
      new THREE.MeshStandardMaterial({
        color: 0x1f2937,
        emissive: colors.accent,
        emissiveIntensity: 0.8,
      })
    );
    gpuBlock.position.set(0, -0.1, 0);
    pcGroup.add(gpuBlock);

    roomGroup.add(pcGroup);

    // -------------------------------------------------------------
    // Ergonomic Racing Gaming Chair
    // -------------------------------------------------------------
    const chairGroup = new THREE.Group();
    chairGroup.name = 'CHAIR_MODULE';
    chairGroup.position.set(0.6, 0, 0.3);

    // 5-Star Castor Wheel Base
    const starBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.48, 0.48, 0.06, 8),
      new THREE.MeshStandardMaterial({ color: 0x111319, metalness: 0.8 })
    );
    starBase.position.y = 0.08;
    chairGroup.add(starBase);

    // Gas lift cylinder
    const gasLift = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.5, 12),
      new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9 })
    );
    gasLift.position.y = 0.35;
    chairGroup.add(gasLift);

    // Seat cushion (Black & White accent)
    const seat = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.14, 0.7),
      new THREE.MeshStandardMaterial({ color: 0x1e2230, roughness: 0.7 })
    );
    seat.position.y = 0.65;
    chairGroup.add(seat);

    // High Ergonomic Racing Backrest
    const backrest = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 1.1, 0.14),
      new THREE.MeshStandardMaterial({ color: 0x11141c, roughness: 0.6 })
    );
    backrest.position.set(-0.25, 1.25, 0);
    backrest.rotation.z = 0.1;
    chairGroup.add(backrest);

    // White Racing Stripes
    const whiteStripe = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 1.05, 0.16),
      new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.5 })
    );
    whiteStripe.position.set(-0.24, 1.25, 0);
    whiteStripe.rotation.z = 0.1;
    chairGroup.add(whiteStripe);

    // Armrests
    [-0.38, 0.38].forEach((zOff) => {
      const arm = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.06, 0.1),
        new THREE.MeshStandardMaterial({ color: 0x0f1118 })
      );
      arm.position.set(-0.05, 0.95, zOff);
      chairGroup.add(arm);
    });

    roomGroup.add(chairGroup);

    // -------------------------------------------------------------
    // TV Media Credenza & PS5 Console (Center-back)
    // -------------------------------------------------------------
    const credenzaGroup = new THREE.Group();
    credenzaGroup.name = 'CREDENZA_MODULE';
    credenzaGroup.position.set(-1.2, 0, -3.2);

    // Low Credenza Cabinet
    const cabinet = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.7, 0.75),
      new THREE.MeshStandardMaterial({ color: 0x1b1f2b, roughness: 0.6 })
    );
    cabinet.position.y = 0.45;
    credenzaGroup.add(cabinet);

    // TV Screen
    const tvScreen = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 1.2, 0.08),
      new THREE.MeshStandardMaterial({
        color: 0x05070d,
        emissive: 0x0284c7,
        emissiveIntensity: 0.25,
      })
    );
    tvScreen.position.set(0, 1.45, 0);
    credenzaGroup.add(tvScreen);

    // PS5 Console standing upright
    const ps5 = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.55, 0.35),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 })
    );
    ps5.position.set(-0.9, 1.05, 0);
    credenzaGroup.add(ps5);

    roomGroup.add(credenzaGroup);

    // Blue Bookshelf Tower (Left corner)
    const shelfTower = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 3.2, 0.65),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.5 })
    );
    shelfTower.position.set(-3.6, 1.6, -3.4);
    roomGroup.add(shelfTower);

    // Purple Beanbag Chair
    const beanbag = new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 12, 10),
      new THREE.MeshStandardMaterial({ color: 0x4f46e5, roughness: 0.9 })
    );
    beanbag.scale.set(1.1, 0.7, 1.1);
    beanbag.position.set(0.4, 0.35, -2.6);
    roomGroup.add(beanbag);

    // -------------------------------------------------------------
    // Potted Indoor Palm Plant (Front-Center)
    // -------------------------------------------------------------
    const plantGroup = new THREE.Group();
    plantGroup.name = 'PALM_PLANT';
    plantGroup.position.set(-0.8, 0, 1.8);

    // White Pot
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.28, 0.65, 18),
      new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 })
    );
    pot.position.y = 0.325;
    plantGroup.add(pot);

    // Brown Soil
    const soil = new THREE.Mesh(
      new THREE.CylinderGeometry(0.36, 0.36, 0.05, 18),
      new THREE.MeshStandardMaterial({ color: 0x3e2723 })
    );
    soil.position.y = 0.63;
    plantGroup.add(soil);

    // Radiating Palm Fronds
    const frondCount = 10;
    for (let i = 0; i < frondCount; i++) {
      const angle = (i / frondCount) * Math.PI * 2;
      const frondGeo = new THREE.ConeGeometry(0.09, 1.3, 4);
      frondGeo.translate(0, 0.65, 0);
      frondGeo.rotateX(0.7);

      const frond = new THREE.Mesh(
        frondGeo,
        new THREE.MeshStandardMaterial({
          color: 0x15803d, // vibrant lush green
          roughness: 0.5,
        })
      );
      frond.position.set(0, 0.65, 0);
      frond.rotation.y = angle;
      plantGroup.add(frond);
    }
    roomGroup.add(plantGroup);

    // -------------------------------------------------------------
    // Animated Laser Scan Plane
    // Sweeps up and down across the scene revealing the wireframe
    // -------------------------------------------------------------
    const laserGeo = new THREE.PlaneGeometry(8.5, 8.5);
    laserGeo.rotateX(-Math.PI / 2);
    const laserMat = new THREE.MeshBasicMaterial({
      color: colors.primary,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const laserPlane = new THREE.Mesh(laserGeo, laserMat);
    laserPlane.position.y = 1.0;
    scene.add(laserPlane);
    laserPlaneRef.current = laserPlane;

    // Laser perimeter wire box
    const laserBoxGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(8.5, 0.08, 8.5));
    const laserBox = new THREE.LineSegments(
      laserBoxGeo,
      new THREE.LineBasicMaterial({ color: colors.secondary, transparent: true, opacity: 0.9 })
    );
    laserPlane.add(laserBox);

    // -------------------------------------------------------------
    // Holographic Quantum Particle Cloud
    // -------------------------------------------------------------
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 8.0;
      particlePos[i * 3 + 1] = Math.random() * 4.2;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 8.0;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: colors.primary,
      size: 0.06,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // -------------------------------------------------------------
    // Mouse / Touch Interaction for Free Orbiting
    // -------------------------------------------------------------
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      stateRef.current.isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      stateRef.current.prevMouseX = clientX;
      stateRef.current.prevMouseY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!stateRef.current.isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - stateRef.current.prevMouseX;
      const deltaY = clientY - stateRef.current.prevMouseY;

      stateRef.current.orbitAngleX += deltaX * 0.005;
      stateRef.current.orbitAngleY = Math.max(
        0.1,
        Math.min(1.4, stateRef.current.orbitAngleY - deltaY * 0.005)
      );

      stateRef.current.prevMouseX = clientX;
      stateRef.current.prevMouseY = clientY;
    };

    const handlePointerUp = () => {
      stateRef.current.isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      stateRef.current.cameraDistance = Math.max(
        6,
        Math.min(18, stateRef.current.cameraDistance + e.deltaY * 0.005)
      );
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: true });

    // Touch events
    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // -------------------------------------------------------------
    // Animation Loop
    // -------------------------------------------------------------
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const p = stateRef.current.progress;
      const { scanlineIntensity, laserYPosition } = calculateHoloOpacity(p);

      // Component progressive scale & visibility
      const floorProgress = calculateComponentProgress(p, 0, 15);
      const wallProgress = calculateComponentProgress(p, 15, 38);
      const bedProgress = calculateComponentProgress(p, 30, 55);
      const deskProgress = calculateComponentProgress(p, 45, 72);
      const credenzaProgress = calculateComponentProgress(p, 55, 78);
      const plantProgress = calculateComponentProgress(p, 65, 85);

      // Scale in components based on their progressive manifestation
      floorMesh.scale.set(floorProgress, 1, floorProgress);
      floorWireframe.scale.copy(floorMesh.scale);

      leftWall.scale.set(1, wallProgress, wallProgress);
      backWall.scale.set(wallProgress, wallProgress, 1);
      leftWallWire.scale.copy(leftWall.scale);
      backWallWire.scale.copy(backWall.scale);

      bedGroup.scale.setScalar(bedProgress);
      bedGroup.position.y = (1 - bedProgress) * -1.5;

      deskGroup.scale.setScalar(deskProgress);
      deskGroup.position.y = (1 - deskProgress) * 2.0;

      credenzaGroup.scale.setScalar(credenzaProgress);
      plantGroup.scale.setScalar(plantProgress);

      // Laser scanning plane animation
      if (laserPlaneRef.current) {
        laserPlaneRef.current.position.y = THREE.MathUtils.damp(
          laserPlaneRef.current.position.y,
          laserYPosition,
          4.0,
          delta
        );
        (laserPlaneRef.current.material as THREE.MeshBasicMaterial).opacity =
          p >= 98 ? 0.0 : scanlineIntensity * 0.45;
      }

      // Rotate PC fans
      pcFansRef.current.forEach((fan) => {
        fan.rotation.z += delta * 12.0;
      });

      // Slowly float particles
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += Math.sin(elapsed + i) * 0.003;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Camera preset positioning
      const preset = stateRef.current.cameraPreset;
      const dist = stateRef.current.cameraDistance;

      if (stateRef.current.autoRotate && !stateRef.current.isDragging) {
        stateRef.current.orbitAngleX += delta * 0.18;
      }

      const angleX = stateRef.current.orbitAngleX;
      const angleY = stateRef.current.orbitAngleY;

      if (preset === 'TOP_DOWN') {
        _targetCamPos.set(0.1, dist * 1.1, 0.1);
        _targetLookAt.set(0, 0, 0);
      } else if (preset === 'BATTLESTATION_FOCUS') {
        _targetCamPos.set(2.8 + Math.cos(angleX * 0.5) * 3.5, 2.6, 1.2 + Math.sin(angleX * 0.5) * 3.5);
        _targetLookAt.set(2.1, 1.8, 0.4);
      } else {
        // Isometric / Free orbit
        _targetCamPos.set(
          Math.cos(angleX) * Math.cos(angleY) * dist,
          Math.sin(angleY) * dist + 1.2,
          Math.sin(angleX) * Math.cos(angleY) * dist
        );
        _targetLookAt.set(0, 1.2, 0);
      }

      camera.position.lerp(_targetCamPos, 0.06);
      camera.lookAt(_targetLookAt);

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      data-testid="three-room-assembly-canvas"
      className="absolute inset-0 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
    />
  );
};
