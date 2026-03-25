"use client";

import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three/webgpu";
import { bloom } from "three/examples/jsm/tsl/display/BloomNode.js";
import type { Mesh } from "three";

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
  add,
} from "three/tsl";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
extend(THREE as any);

const TEXTUREMAP_SRC = "https://i.postimg.cc/XYwvXN8D/img-4.png";
const DEPTHMAP_SRC = "https://i.postimg.cc/2SHKQh2q/raw-4.webp";

const WIDTH = 300;
const HEIGHT = 300;

// ── Post-processing: bloom + scan-line ───────────────────────────────────────

function PostProcessing({
  strength = 1,
  threshold = 1,
}: {
  strength?: number;
  threshold?: number;
}) {
  const { gl, scene, camera } = useThree();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const progressRef = useRef<any>({ value: 0 });

  const postProcessing = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pp = new (THREE as any).PostProcessing(gl);
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode("output");
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

    const uScanProgress = uniform(0);
    progressRef.current = uScanProgress;

    const scanPos = float(uScanProgress.value);
    const uvY = uv().y;
    const scanWidth = float(0.05);
    const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));
    const redOverlay = vec3(1, 0, 0).mul(oneMinus(scanLine)).mul(0.3);

    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, redOverlay),
      smoothstep(0.9, 1.0, oneMinus(scanLine))
    );

    pp.outputNode = withScanEffect.add(bloomPass);
    return pp;
  }, [gl, scene, camera, strength, threshold]);

  useFrame(({ clock }) => {
    progressRef.current.value =
      Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (postProcessing as any).renderAsync();
  }, 1);

  return null;
}

// ── Depth-map parallax scene ─────────────────────────────────────────────────

function Scene() {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP_SRC, DEPTHMAP_SRC]);
  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rawMap && depthMap) setVisible(true);
  }, [rawMap, depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uPointer = uniform(new THREE.Vector2(0, 0));
    const uProgress = uniform(0);
    const strength = 0.01;

    const tDepthMap = texture(depthMap);
    const tMap = texture(
      rawMap,
      uv().add(tDepthMap.r.mul(uPointer).mul(strength))
    );

    const aspect = float(WIDTH).div(HEIGHT);
    const tUv = vec2(uv().x.mul(aspect), uv().y);
    const tiling = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);
    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));
    const dist = float(tiledUv.length());
    const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness);
    const depth = tDepthMap.r;
    const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));
    const mask = dot.mul(flow).mul(vec3(10, 0, 0));
    const finalNode = blendScreen(tMap, mask);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mat = new (THREE as any).MeshBasicNodeMaterial({
      colorNode: finalNode,
      transparent: true,
      opacity: 0,
    });

    return { material: mat, uniforms: { uPointer, uProgress } };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock }) => {
    uniforms.uProgress.value =
      Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    if (meshRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mat = (meshRef.current as any).material;
      if (mat && "opacity" in mat) {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, visible ? 1 : 0, 0.07);
      }
    }
  });

  useFrame(({ pointer }) => {
    uniforms.uPointer.value = pointer;
  });

  return (
    <mesh
      ref={meshRef}
      scale={[w * 0.4, h * 0.4, 1]}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      material={material as any}
    >
      <planeGeometry />
    </mesh>
  );
}

// ── Main export — canvas only, meant to sit behind hero content ───────────────

export default function HeroWebGPU(): React.JSX.Element {
  return (
    <Canvas
      flat
      style={{ background: "transparent" }}
      gl={async (props) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const renderer = new (THREE as any).WebGPURenderer({
          ...(props as object),
          antialias: true,
          alpha: true,
        });
        await renderer.init();
        return renderer;
      }}
    >
      <PostProcessing strength={0.8} threshold={0.9} />
      <Scene />
    </Canvas>
  );
}
