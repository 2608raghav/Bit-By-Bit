import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const spring = { damping: 28, stiffness: 320 };
const springLag = { damping: 22, stiffness: 180 };

export default function CursorEffect() {
  const [enabled, setEnabled] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const glowX = useSpring(mouseX, springLag);
  const glowY = useSpring(mouseY, springLag);
  const dotX = useSpring(mouseX, spring);
  const dotY = useSpring(mouseY, spring);

  useEffect(() => {
    const mqFine = window.matchMedia("(pointer: fine)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setEnabled(mqFine.matches && !mqReduce.matches);
    };
    update();
    mqFine.addEventListener("change", update);
    mqReduce.addEventListener("change", update);

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const onLeave = () => {
      mouseX.set(-100);
      mouseY.set(-100);
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      mqFine.removeEventListener("change", update);
      mqReduce.removeEventListener("change", update);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="cursor-glow"
        style={{
          position: "fixed",
          left: glowX,
          top: glowY,
          marginLeft: -160,
          marginTop: -160,
          pointerEvents: "none",
          zIndex: 35,
        }}
      />
      <motion.div
        className="cursor-dot"
        style={{
          position: "fixed",
          left: dotX,
          top: dotY,
          marginLeft: -5,
          marginTop: -5,
          pointerEvents: "none",
          zIndex: 36,
        }}
      />
    </>
  );
}
