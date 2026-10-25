import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export type SneakerVariant = "noir" | "dune" | "slate" | "midnight" | "beach" | "street" | "ivory" | "green" | "oxblood";

export function normalizeVariant(v: string): "noir" | "dune" | "slate" {
  if (v === "dune" || v === "beach" || v === "ivory" || v === "green") return "dune";
  if (v === "slate" || v === "street" || v === "oxblood") return "slate";
  return "noir";
}

interface Sneaker3DCanvasProps {
  scrollProgress?: number; // 0 to 1, smoothed
  mouseX?: number; // -1 to 1
  mouseY?: number; // -1 to 1
  className?: string;
  variant?: SneakerVariant;
  interactive?: boolean;
  mode?: "hero" | "anatomy" | "orbit";
}

export const Sneaker3DCanvas = ({
  scrollProgress = 0,
  mouseX = 0,
  mouseY = 0,
  className = "",
  variant = "dune",
  interactive = true,
  mode = "hero",
}: Sneaker3DCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Three.js instances
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const shoeMeshRef = useRef<THREE.Mesh | null>(null);
  const shoeMeshesRef = useRef<THREE.Mesh[]>([]);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const pivotRef = useRef<THREE.Group | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Materials Cache for dynamic colorway switching (using native GLTF materials)
  const materialsCache = useRef<Record<"noir" | "dune" | "slate", THREE.MeshStandardMaterial | null>>({
    noir: null,
    dune: null,
    slate: null,
  });
  const currentVariantRef = useRef<"noir" | "dune" | "slate">(normalizeVariant(variant));

  // Drag interaction state
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragRotation = useRef({ x: 0, y: 0 });

  // Spring physics interpolation values
  const currentRot = useRef({ x: (18 * Math.PI) / 180, y: (-25 * Math.PI) / 180, z: (-12 * Math.PI) / 180 });
  const currentScale = useRef(1.0);
  const currentY = useRef(0);

  // Target values derived from scroll and mouse
  const targetRot = useRef({ x: 0, y: 0, z: 0 });
  const targetScale = useRef(1.0);
  const targetY = useRef(0);

  // Update target physics every time scrollProgress or mouseX/mouseY changes
  useEffect(() => {
function lerpKeys(v: number, inKeys: number[], outKeys: number[]): number {
  if (v <= inKeys[0]) return outKeys[0];
  if (v >= inKeys[inKeys.length - 1]) return outKeys[outKeys.length - 1];
  for (let i = 0; i < inKeys.length - 1; i++) {
    if (v >= inKeys[i] && v <= inKeys[i + 1]) {
      const t = (v - inKeys[i]) / (inKeys[i + 1] - inKeys[i]);
      return outKeys[i] + t * (outKeys[i + 1] - outKeys[i]);
    }
  }
  return outKeys[0];
}

    // 1. Calculate scroll progression based on mode (hero / anatomy / orbit)
    // p goes from 0 to 1
    const p = Math.max(0, Math.min(1, scrollProgress));
    let baseRotYDeg: number;
    let baseRotXDeg: number;
    let baseRotZDeg: number;
    let scaleVal: number;
    let yVal: number;

    if (mode === "anatomy") {
      // Precise anatomical motion mirroring the 4 craft stages:
      // Step I (p=0): Lateral view of the upper calfskin
      // Step II (p=0.33): Heel counter & serial stamp turns forward
      // Step III (p=0.66): Blake welt & stitch line tilts forward
      // Step IV (p=1.0): Gum sole tilts up dramatically to expose tread
      baseRotYDeg = lerpKeys(p, [0, 0.33, 0.66, 1], [0, -42, 24, 0]);
      baseRotXDeg = lerpKeys(p, [0, 0.5, 1], [-8, -32, -62]);
      baseRotZDeg = lerpKeys(p, [0, 0.33, 0.66, 1], [0, 8, -6, 0]);
      scaleVal = lerpKeys(p, [0, 0.5, 1], [1.02, 1.20, 1.10]);
      yVal = lerpKeys(p, [0, 0.5, 1], [0, -0.05, 0.06]);
    } else if (mode === "orbit") {
      baseRotYDeg = -15;
      baseRotXDeg = -8;
      baseRotZDeg = 0;
      scaleVal = 1.05;
      yVal = 0;
    } else {
      // "hero" full 360-degree exhibition mode
      baseRotYDeg = -25 + p * (340 - -25);
      if (p <= 0.5) {
        const t = p / 0.5;
        baseRotXDeg = 18 + t * (-10 - 18);
        baseRotZDeg = -12 + t * (6 - -12);
        scaleVal = 1.0 + t * (1.28 - 1.0);
      } else {
        const t = (p - 0.5) / 0.5;
        baseRotXDeg = -10 + t * (25 - -10);
        baseRotZDeg = 6 + t * (-20 - 6);
        scaleVal = 1.28 + t * (0.65 - 1.28);
      }
      yVal = -p * 0.35;
    }

    // 2. High-fidelity Mouse Parallax Tilt (like Framer Motion spring)
    // mouseX: -1 (left) to 1 (right) -> tilts Y (yaw) and Z (roll)
    // mouseY: -1 (top) to 1 (bottom) -> tilts X (pitch)
    const mouseTiltYDeg = mouseX * 22; // up to 22 degrees yaw
    const mouseTiltXDeg = -mouseY * 16; // up to 16 degrees pitch
    const mouseTiltZDeg = -mouseX * 6; // subtle banking

    targetRot.current = {
      x: ((baseRotXDeg + mouseTiltXDeg) * Math.PI) / 180 + dragRotation.current.x,
      y: ((baseRotYDeg + mouseTiltYDeg) * Math.PI) / 180 + dragRotation.current.y,
      z: ((baseRotZDeg + mouseTiltZDeg) * Math.PI) / 180,
    };
    targetScale.current = scaleVal;
    targetY.current = yVal;
  }, [scrollProgress, mouseX, mouseY, mode]);

  // Apply chosen colorway material & accent illumination
  const applyVariantMaterial = (v: string) => {
    const norm = normalizeVariant(v);
    currentVariantRef.current = norm;
    const targetMat = materialsCache.current[norm];
    if (targetMat) {
      shoeMeshesRef.current.forEach((mesh) => {
        mesh.material = targetMat;
      });
      targetMat.needsUpdate = true;
    }
    if (rimLightRef.current) {
      if (norm === "noir") {
        rimLightRef.current.color.setHex(0x38bdf8); // electric stealth cyan
        rimLightRef.current.intensity = 4.2;
      } else if (norm === "dune") {
        rimLightRef.current.color.setHex(0xf59e0b); // warm cyber amber
        rimLightRef.current.intensity = 4.5;
      } else {
        rimLightRef.current.color.setHex(0xe2e8f0); // titanium ice
        rimLightRef.current.intensity = 4.0;
      }
    }
  };

  useEffect(() => {
    applyVariantMaterial(variant);
  }, [variant]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 650;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera positioned closer with optimal luxury focal length (32mm equivalent)
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
    camera.position.set(0, 0.15, 2.15); // Much closer to camera for bold heroic presence
    cameraRef.current = camera;

    // 3. Renderer with pristine PBR rendering
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. Lighting Setup tailored for architectural tech footwear
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    // Main Key Light (Crisp neutral daylight from front-top-right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.6);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Dynamic Rim Light (Accent reflection on chassis edges)
    const rimLight = new THREE.DirectionalLight(0xf59e0b, 4.2);
    rimLight.position.set(-4, 3, -3);
    rimLightRef.current = rimLight;
    scene.add(rimLight);

    // Fill Light (Subtle upward reflection so decoupled outsole geometry pops)
    const fillLight = new THREE.DirectionalLight(0x94a3b8, 1.4);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    // Point Light for high-tech specularity glint
    const glintLight = new THREE.PointLight(0xffffff, 1.8, 6);
    glintLight.position.set(0, 2, 2);
    scene.add(glintLight);

    // 5. Soft Ground Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.55 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.58;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 6. Root Pivot Group
    const pivot = new THREE.Group();
    pivotRef.current = pivot;
    scene.add(pivot);

    // 7. Load GLTF Model and cache material variants for instant switching
    const loader = new GLTFLoader();
    loader.load(
      "/sneaker.glb",
      (gltf) => {
        const model = gltf.scene;

        // Center the geometry
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;

        // Substantially increased size: 2.35 scale factor so it fills the screen heroically!
        const maxDim = Math.max(size.x, size.y, size.z);
        const baseScale = 2.4 / maxDim;
        model.scale.set(baseScale, baseScale, baseScale);

        const meshes: THREE.Mesh[] = [];
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            meshes.push(mesh);
          }
        });
        shoeMeshesRef.current = meshes;
        if (meshes.length > 0) {
          shoeMeshRef.current = meshes[0];
        }

        // Initialize native GLTF materials:
        // 0: Midnight (Noir), 1: Beach (Dune), 2: Street (Slate)
        if (gltf.parser) {
          Promise.all([
            gltf.parser.getDependency("material", 0),
            gltf.parser.getDependency("material", 1),
            gltf.parser.getDependency("material", 2),
          ]).then(([midnightMat, beachMat, streetMat]: [THREE.Material, THREE.Material, THREE.Material]) => {
            // 1. NOIR (Carbon Stealth & Ballistic Mesh)
            if (midnightMat) {
              const mat = (midnightMat as THREE.MeshStandardMaterial).clone();
              mat.roughness = 0.5;
              mat.metalness = 0.15;
              mat.envMapIntensity = 1.5;
              mat.needsUpdate = true;
              materialsCache.current.noir = mat;
            }

            // 2. DUNE (Desert Sandstone & Dune Nubuck)
            if (beachMat) {
              const mat = (beachMat as THREE.MeshStandardMaterial).clone();
              mat.roughness = 0.45;
              mat.metalness = 0.08;
              mat.envMapIntensity = 1.4;
              mat.needsUpdate = true;
              materialsCache.current.dune = mat;
            }

            // 3. SLATE (Industrial Slate & High-Tension Cyber Mesh)
            if (streetMat) {
              const mat = (streetMat as THREE.MeshStandardMaterial).clone();
              mat.roughness = 0.48;
              mat.metalness = 0.18;
              mat.envMapIntensity = 1.6;
              mat.needsUpdate = true;
              materialsCache.current.slate = mat;
            }

            applyVariantMaterial(currentVariantRef.current);
          });
        }

        pivot.add(model);
        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.error("Failed to load 3D sneaker:", err);
        setIsLoading(false);
      }
    );

    // 8. Animation Loop with buttery physics dampening (spring feel)
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      if (pivotRef.current) {
        // High-responsiveness dampening (smooth 60fps tracking)
        const lerpFactor = 0.12;
        currentRot.current.x += (targetRot.current.x - currentRot.current.x) * lerpFactor;
        currentRot.current.y += (targetRot.current.y - currentRot.current.y) * lerpFactor;
        currentRot.current.z += (targetRot.current.z - currentRot.current.z) * lerpFactor;

        currentScale.current += (targetScale.current - currentScale.current) * lerpFactor;
        currentY.current += (targetY.current - currentY.current) * lerpFactor;

        pivotRef.current.rotation.x = currentRot.current.x;
        pivotRef.current.rotation.y = currentRot.current.y;
        pivotRef.current.rotation.z = currentRot.current.z;

        pivotRef.current.scale.set(
          currentScale.current,
          currentScale.current,
          currentScale.current
        );

        // Floating breath combined with scroll Y
        const elapsed = clock.getElapsedTime();
        const breath = Math.sin(elapsed * 1.8) * 0.025;
        pivotRef.current.position.y = currentY.current + breath;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Mouse drag fallback for 360 inspect
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = (e.clientX - dragStart.current.x) * 0.007;
    const dy = (e.clientY - dragStart.current.y) * 0.007;

    dragRotation.current.y += dx;
    dragRotation.current.x += dy;

    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Touch drag support for mobile / touchscreens
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!interactive || e.touches.length === 0) return;
    isDragging.current = true;
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || e.touches.length === 0) return;
    const dx = (e.touches[0].clientX - dragStart.current.x) * 0.008;
    const dy = (e.touches[0].clientY - dragStart.current.y) * 0.008;

    dragRotation.current.y += dx;
    dragRotation.current.x += dy;

    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const variantTitles: Record<"noir" | "dune" | "slate", string> = {
    noir: "PROTO-01 // NOIR (Carbon Stealth)",
    dune: "PROTO-01 // DUNE (Sandstone Nubuck)",
    slate: "PROTO-01 // SLATE (Titanium Matrix)",
  };

  const activeNorm = normalizeVariant(variant);
  const activeLabel = mode === "anatomy" ? "KINETIC ANATOMY // CAD VIEW" : variantTitles[activeNorm];

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{ touchAction: "pan-y" }}
      className={`relative h-full w-full select-none cursor-grab active:cursor-grabbing ${className}`}
    >
      {/* Loading state indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none z-10">
          <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="kicker text-[0.62rem] text-primary/80">INITIALIZING 3D ENGINE // {variantTitles[activeNorm]}...</span>
        </div>
      )}

      {/* Floating 3D Badge */}
      {!isLoading && (
        <div className="pointer-events-none absolute bottom-4 right-4 z-10 flex items-center gap-2 border border-border bg-card/80 px-2.5 py-1 text-[0.62rem] backdrop-blur font-mono text-foreground/90">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="tracking-wider uppercase">{activeLabel}</span>
        </div>
      )}
    </div>
  );
};
