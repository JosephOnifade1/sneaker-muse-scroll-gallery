import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const SneakerRenderer = () => {
  const [status, setStatus] = useState("Initializing renderer...");

  useEffect(() => {
    async function renderAndSave() {
      try {
        setStatus("Loading sneaker.glb...");
        const loader = new GLTFLoader();
        const gltf = await new Promise<any>((resolve, reject) => {
          loader.load("/sneaker.glb", resolve, undefined, reject);
        });

        const width = 1200;
        const height = 1200;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(1);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.35;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        const scene = new THREE.Scene();

        // 3/4 Studio Camera Angle
        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
        camera.position.set(0, 0.22, 3.1);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
        keyLight.position.set(4, 5, 4);
        keyLight.castShadow = true;
        scene.add(keyLight);

        const rimLight = new THREE.DirectionalLight(0xffffff, 3.0);
        rimLight.position.set(-4, 3, -3);
        scene.add(rimLight);

        const fillLight = new THREE.DirectionalLight(0x94a3b8, 1.6);
        fillLight.position.set(0, -3, 3);
        scene.add(fillLight);

        const glint = new THREE.PointLight(0xffffff, 1.5, 6);
        glint.position.set(0, 2, 2);
        scene.add(glint);

        // Model Setup
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;

        const maxDim = Math.max(size.x, size.y, size.z);
        const baseScale = 2.0 / maxDim; // Beautifully fills 1200x1200 frame
        model.scale.set(baseScale, baseScale, baseScale);

        const pivot = new THREE.Group();
        pivot.add(model);
        scene.add(pivot);

        // Perfect 3/4 luxury presentation angle
        pivot.rotation.x = (14 * Math.PI) / 180;
        pivot.rotation.y = (-32 * Math.PI) / 180;
        pivot.rotation.z = (-6 * Math.PI) / 180;

        const meshes: THREE.Mesh[] = [];
        model.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            meshes.push(child);
          }
        });

        // Get GLTF materials
        const [midnightMat, beachMat, streetMat] = await Promise.all([
          gltf.parser.getDependency("material", 0),
          gltf.parser.getDependency("material", 1),
          gltf.parser.getDependency("material", 2),
        ]);

        const variants = [
          {
            name: "proto-01-noir",
            mat: streetMat, // Carbon stealth matrix
            rimColor: 0x38bdf8,
          },
          {
            name: "proto-01-dune",
            mat: beachMat, // Desert sandstone
            rimColor: 0xf59e0b,
          },
          {
            name: "proto-01-slate",
            mat: midnightMat, // High-frequency cyber cyan mesh
            rimColor: 0xe2e8f0,
          },
        ];

        for (const v of variants) {
          setStatus(`Rendering ${v.name}...`);
          const clonedMat = (v.mat as THREE.MeshStandardMaterial).clone();
          clonedMat.roughness = 0.48;
          clonedMat.metalness = 0.15;
          clonedMat.envMapIntensity = 1.5;
          clonedMat.needsUpdate = true;

          meshes.forEach((m) => {
            m.material = clonedMat;
          });

          rimLight.color.setHex(v.rimColor);

          renderer.render(scene, camera);

          const dataUrl = canvas.toDataURL("image/png");

          await fetch("/api/save-render", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: v.name, dataUrl }),
          });
        }

        setStatus("All 3 sneaker variants successfully rendered and saved!");
      } catch (err: any) {
        console.error("Rendering error:", err);
        setStatus("Error: " + err.message);
      }
    }

    renderAndSave();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 border border-primary/50 text-xs px-4 py-2 rounded-full text-foreground shadow-2xl backdrop-blur-md">
      {status}
    </div>
  );
};
