import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface Sneaker3DCanvasProps {
  scrollProgress?: number; // 0 to 1, smoothed
  mouseX?: number; // -1 to 1
  mouseY?: number; // -1 to 1
  className?: string;
  variant?: "ivory" | "green" | "oxblood";
  interactive?: boolean;
}

export const Sneaker3DCanvas = ({
  scrollProgress = 0,
  mouseX = 0,
  mouseY = 0,
  className = "",
  variant = "ivory",
  interactive = true,
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

  // Materials Cache for dynamic colorway switching
  const materialsCache = useRef<Record<"ivory" | "green" | "oxblood", THREE.MeshStandardMaterial | null>>({
    ivory: null,
    green: null,
    oxblood: null,
  });
  const currentVariantRef = useRef<"ivory" | "green" | "oxblood">(variant);

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
    // 1. Precise 2D-matched scroll progression
    // p goes from 0 to 1
    const p = Math.max(0, Math.min(1, scrollProgress));

    // Y rotation: from -25 deg to 340 deg (full 360-degree exhibition)
    const baseRotYDeg = -25 + p * (340 - -25);

    // X rotation (pitch): from 18 deg -> -10 deg at mid-scroll -> 25 deg at bottom
    let baseRotXDeg: number;
    if (p <= 0.5) {
      const t = p / 0.5;
      baseRotXDeg = 18 + t * (-10 - 18);
    } else {
      const t = (p - 0.5) / 0.5;
      baseRotXDeg = -10 + t * (25 - -10);
    }

    // Z rotation (bank): from -12 deg -> 6 deg -> -20 deg
    let baseRotZDeg: number;
    if (p <= 0.5) {
      const t = p / 0.5;
      baseRotZDeg = -12 + t * (6 - -12);
    } else {
      const t = (p - 0.5) / 0.5;
      baseRotZDeg = 6 + t * (-20 - 6);
    }

    // Scale: from 1.0 -> 1.25 -> 0.65
    let scaleVal: number;
    if (p <= 0.5) {
      const t = p / 0.5;
      scaleVal = 1.0 + t * (1.28 - 1.0);
    } else {
      const t = (p - 0.5) / 0.5;
      scaleVal = 1.28 + t * (0.65 - 1.28);
    }

    // Vertical Y displacement (in Three.js world units)
    const yVal = -p * 0.35;

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
  }, [scrollProgress, mouseX, mouseY]);

  // Apply chosen colorway material & accent illumination
  const applyVariantMaterial = (v: "ivory" | "green" | "oxblood") => {
    currentVariantRef.current = v;
    const targetMat = materialsCache.current[v];
    if (targetMat) {
      shoeMeshesRef.current.forEach((mesh) => {
        mesh.material = targetMat;
      });
      targetMat.needsUpdate = true;
    }
    if (rimLightRef.current) {
      if (v === "green") {
        rimLightRef.current.color.setHex(0xd4af37);
      } else if (v === "oxblood") {
        rimLightRef.current.color.setHex(0xe88a6d);
      } else {
        rimLightRef.current.color.setHex(0xe5b85c);
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

    // 4. Lighting Setup tailored for Italian atelier leather
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.4);
    scene.add(ambientLight);

    // Main Key Light (Warm ivory illumination from front-top-right)
    const keyLight = new THREE.DirectionalLight(0xfff2e0, 3.5);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Gold Luxury Rim Light (Striking back rim reflection on leather edges)
    const rimLight = new THREE.DirectionalLight(0xe5b85c, 4.0);
    rimLight.position.set(-4, 3, -3);
    rimLightRef.current = rimLight;
    scene.add(rimLight);

    // Fill Light (Gentle reflection from below so gum sole details pop)
    const fillLight = new THREE.DirectionalLight(0xc4a480, 1.2);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    // Point Light for leather glint
    const glintLight = new THREE.PointLight(0xffffff, 1.5, 6);
    glintLight.position.set(0, 2, 2);
    scene.add(glintLight);

    // 5. Soft Ground Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.45 });
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

        // Initialize materials for each edition variant:
        // 0: Midnight, 1: Beach, 2: Street
        if (gltf.parser) {
          Promise.all([
            gltf.parser.getDependency("material", 0),
            gltf.parser.getDependency("material", 1),
            gltf.parser.getDependency("material", 2),
          ]).then(([midnightMat, beachMat, streetMat]: [THREE.Material, THREE.Material, THREE.Material]) => {
            const baseBeach = (beachMat || midnightMat) as THREE.MeshStandardMaterial;
            const baseMidnight = (midnightMat || beachMat) as THREE.MeshStandardMaterial;
            const baseStreet = (streetMat || beachMat) as THREE.MeshStandardMaterial;

            // 1. Ivory (The Sovereign - French calfskin & amber gum)
            if (baseBeach) {
              const ivoryMat = baseBeach.clone();
              ivoryMat.color.setHex(0xfcf8f2);
              ivoryMat.roughness = 0.44;
              ivoryMat.metalness = 0.08;
              ivoryMat.envMapIntensity = 1.4;
              ivoryMat.needsUpdate = true;
              materialsCache.current.ivory = ivoryMat;
            }

            // 2. Green (The Regatta - British racing green velour suede)
            if (baseBeach || baseStreet) {
              const greenMat = (baseBeach || baseStreet).clone();
              greenMat.color.setRGB(0.12, 0.28, 0.18);
              greenMat.roughness = 0.78; // suede tactile nap
              greenMat.metalness = 0.02;
              greenMat.envMapIntensity = 0.95;
              greenMat.needsUpdate = true;
              materialsCache.current.green = greenMat;
            }

            // 3. Oxblood (The Chancellor - Museum box calf & smoked sole)
            if (baseBeach || baseMidnight) {
              const oxbloodMat = (baseBeach || baseMidnight).clone();
              oxbloodMat.color.setRGB(0.32, 0.08, 0.14);
              oxbloodMat.roughness = 0.32; // high-luster polished calfskin
              oxbloodMat.metalness = 0.14;
              oxbloodMat.envMapIntensity = 1.6;
              oxbloodMat.needsUpdate = true;
              materialsCache.current.oxblood = oxbloodMat;
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

  const variantTitles: Record<"ivory" | "green" | "oxblood", string> = {
    ivory: "The Sovereign (Ivory Calf)",
    green: "The Regatta (Racing Green)",
    oxblood: "The Chancellor (Oxblood)",
  };

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
          <span className="kicker text-[0.62rem] text-primary/80">Loading {variantTitles[variant]} 3D Last...</span>
        </div>
      )}

      {/* Floating 3D Badge */}
      {!isLoading && (
        <div className="pointer-events-none absolute bottom-4 right-4 z-10 flex items-center gap-1.5 border border-primary/30 bg-background/70 px-2.5 py-1 text-[0.62rem] backdrop-blur kicker text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span>3D Last · {variantTitles[variant]}</span>
        </div>
      )}
    </div>
  );
};
