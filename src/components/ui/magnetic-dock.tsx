"use client";

import {
  useState,
  useRef,
  useContext,
  createContext,
  useEffect,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

interface MousePos {
  x: number;
  y: number;
}

const MouseContext = createContext<MousePos>({ x: 0, y: 0 });

function DockIcon({
  icon,
  href,
  label,
}: {
  icon: ReactNode;
  href: string;
  label: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mouse = useContext(MouseContext);
  const distance = useMotionValue(Infinity);

  useEffect(() => {
    if (!ref.current || mouse.x === 0) {
      distance.set(Infinity);
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const parentRect = ref.current.parentElement?.getBoundingClientRect();
    if (!parentRect) return;
    const centerX = rect.left + rect.width / 2;
    const mouseX = parentRect.left + mouse.x;
    distance.set(Math.abs(mouseX - centerX));
  }, [mouse, distance]);

  const size = useTransform(distance, [0, 120], [56, 42]);
  const springSize = useSpring(size, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{ width: springSize, height: springSize }}
      className="rounded-full bg-white/[0.06] border border-white/[0.1] grid place-items-center text-white/50 hover:text-white hover:bg-white/[0.12] hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-colors duration-200 cursor-pointer"
    >
      {icon}
    </motion.a>
  );
}

const DOCK_ITEMS = [
  { icon: <Github size={20} strokeWidth={1.5} />, href: "https://github.com/MubarakAliPiracha", label: "GitHub" },
  { icon: <Linkedin size={20} strokeWidth={1.5} />, href: "https://linkedin.com/in/mubarak-ali-piracha-063a58384", label: "LinkedIn" },
  { icon: <Twitter size={20} strokeWidth={1.5} />, href: "https://x.com/mubarkparacha", label: "X / Twitter" },
  { icon: <Mail size={20} strokeWidth={1.5} />, href: "mailto:mubarakparacha16@gmail.com", label: "Email" },
];

export function MagneticDock(): React.JSX.Element {
  const [pos, setPos] = useState<MousePos>({ x: 0, y: 0 });

  return (
    <MouseContext.Provider value={pos}>
      <div
        onMouseMove={(e) => {
          const { clientX, currentTarget } = e;
          const { left } = currentTarget.getBoundingClientRect();
          setPos({ x: clientX - left, y: 0 });
        }}
        onMouseLeave={() => setPos({ x: 0, y: 0 })}
        className="inline-flex items-end gap-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] px-4 pb-3 pt-3 backdrop-blur-sm"
      >
        {DOCK_ITEMS.map((item) => (
          <DockIcon
            key={item.label}
            icon={item.icon}
            href={item.href}
            label={item.label}
          />
        ))}
      </div>
    </MouseContext.Provider>
  );
}

export default MagneticDock;
