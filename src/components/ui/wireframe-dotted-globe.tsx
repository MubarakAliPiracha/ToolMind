"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

const LAND_GEOJSON_URL =
  "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json";

interface Props {
  className?: string;
}

function pointInPolygon(point: [number, number], polygon: [number, number][]): boolean {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pointInFeature(point: [number, number], feature: any): boolean {
  const { type, coordinates } = feature.geometry;
  if (type === "Polygon") {
    if (!pointInPolygon(point, coordinates[0])) return false;
    for (let i = 1; i < coordinates.length; i++) {
      if (pointInPolygon(point, coordinates[i])) return false;
    }
    return true;
  }
  if (type === "MultiPolygon") {
    for (const polygon of coordinates) {
      if (pointInPolygon(point, polygon[0])) {
        let inHole = false;
        for (let i = 1; i < polygon.length; i++) {
          if (pointInPolygon(point, polygon[i])) { inHole = true; break; }
        }
        if (!inHole) return true;
      }
    }
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateDots(feature: any, step = 3.5): [number, number][] {
  const dots: [number, number][] = [];
  const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature);
  for (let lng = minLng; lng <= maxLng; lng += step) {
    for (let lat = minLat; lat <= maxLat; lat += step) {
      const p: [number, number] = [lng, lat];
      if (pointInFeature(p, feature)) dots.push(p);
    }
  }
  return dots;
}

export default function WireframeDottedGlobe({ className = "" }: Props): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;

    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    c.scale(dpr, dpr);

    const radius = Math.min(W, H) * 0.44;
    const cx = W / 2;
    const cy = H / 2;

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([cx, cy])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(c);

    const allDots: [number, number][] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let landFeatures: any = null;
    const rotation: [number, number] = [0, -20];
    let elapsed = 0;

    function render() {
      c.clearRect(0, 0, W, H);

      // ── Outer atmosphere / breathing glow ──────────────────────────────────
      const breathe = 0.55 + 0.45 * Math.sin(elapsed * 0.0012);

      // Large soft halo behind globe
      const halo = c.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.5);
      halo.addColorStop(0, `rgba(180,180,200,${0.18 * breathe})`);
      halo.addColorStop(0.5, `rgba(120,120,160,${0.09 * breathe})`);
      halo.addColorStop(1, "rgba(0,0,0,0)");
      c.beginPath();
      c.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
      c.fillStyle = halo;
      c.fill();

      // ── Ocean sphere ──────────────────────────────────────────────────────
      c.beginPath();
      c.arc(cx, cy, radius, 0, Math.PI * 2);
      c.fillStyle = "rgba(4,4,10,0.92)";
      c.fill();

      // Rim glow (bright border)
      c.save();
      c.shadowBlur = 28 + 14 * breathe;
      c.shadowColor = `rgba(200,210,255,${0.7 * breathe})`;
      c.beginPath();
      c.arc(cx, cy, radius, 0, Math.PI * 2);
      c.strokeStyle = `rgba(220,225,255,${0.55 + 0.35 * breathe})`;
      c.lineWidth = 1.4;
      c.stroke();
      c.restore();

      if (!landFeatures) return;

      // ── Graticule ─────────────────────────────────────────────────────────
      const graticule = d3.geoGraticule()();
      c.beginPath();
      path(graticule);
      c.strokeStyle = `rgba(180,185,220,${0.18 + 0.1 * breathe})`;
      c.lineWidth = 0.55;
      c.stroke();

      // ── Land outlines ─────────────────────────────────────────────────────
      c.save();
      c.shadowBlur = 6;
      c.shadowColor = "rgba(200,210,255,0.4)";
      c.beginPath();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      landFeatures.features.forEach((f: any) => path(f));
      c.strokeStyle = `rgba(210,215,255,${0.5 + 0.25 * breathe})`;
      c.lineWidth = 0.9;
      c.stroke();
      c.restore();

      // ── Dots ──────────────────────────────────────────────────────────────
      // Animated sweep highlight — a bright longitude band that rotates
      const sweepLng = ((rotation[0] % 360) + 180) % 360 - 180; // centre longitude

      for (const [lng, lat] of allDots) {
        const proj = projection([lng, lat]);
        if (!proj) continue;
        const [px, py] = proj;
        if (px < 0 || px > W || py < 0 || py > H) continue;

        // Distance to sweep centre longitude → brightens dots near the "front"
        const lngDiff = Math.abs(((lng - sweepLng + 540) % 360) - 180);
        const sweep = Math.max(0, 1 - lngDiff / 60); // 60° wide highlight zone

        const baseAlpha = 0.55 + 0.3 * breathe;
        const dotAlpha = Math.min(1, baseAlpha + sweep * 0.45);
        const dotSize = 1.1 + sweep * 0.7;

        c.beginPath();
        c.arc(px, py, dotSize, 0, Math.PI * 2);
        c.fillStyle = sweep > 0.1
          ? `rgba(230,235,255,${dotAlpha})`
          : `rgba(170,175,210,${baseAlpha})`;
        c.fill();
      }

      // ── Inner specular highlight (top-left shimmer) ───────────────────────
      const spec = c.createRadialGradient(
        cx - radius * 0.35, cy - radius * 0.35, 0,
        cx - radius * 0.35, cy - radius * 0.35, radius * 0.6
      );
      spec.addColorStop(0, `rgba(255,255,255,${0.07 * breathe})`);
      spec.addColorStop(1, "rgba(255,255,255,0)");
      c.save();
      c.beginPath();
      c.arc(cx, cy, radius, 0, Math.PI * 2);
      c.clip();
      c.fillStyle = spec;
      c.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      c.restore();
    }

    let timer: d3.Timer;

    async function init() {
      try {
        const res = await fetch(LAND_GEOJSON_URL);
        landFeatures = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        for (const f of landFeatures.features as any[]) {
          for (const dot of generateDots(f)) allDots.push(dot);
        }
        render();
        timer = d3.timer((t) => {
          elapsed = t;
          rotation[0] += 0.1;
          projection.rotate(rotation);
          render();
        });
      } catch {
        /* silently ignore */
      }
    }

    init();

    return () => { timer?.stop(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block" }}
    />
  );
}
