import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function Magnetic({ children, strength = 0.35 }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22 });
  const sy = useSpring(y, { stiffness: 220, damping: 22 });

  const move = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const leave = () => {
    x.set(0);
    y.set(0);
  };

  if (reduced) return children;

  return (
    <motion.span
      ref={ref}
      style={{ display: "inline-block", position: "relative", x: sx, y: sy }}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      {children}
    </motion.span>
  );
}
