import { motion, useReducedMotion } from "framer-motion";

export default function MovingBackground() {
  const reduce = useReducedMotion();

  const orbA = reduce
    ? {}
    : {
        scale: [1, 1.15, 1],
        x: ["0%", "8%", "-4%", "0%"],
        y: ["0%", "-10%", "6%", "0%"],
      };

  const orbB = reduce
    ? {}
    : {
        scale: [1, 1.08, 1],
        x: ["0%", "-12%", "5%", "0%"],
        y: ["0%", "12%", "-8%", "0%"],
      };

  const orbC = reduce
    ? {}
    : {
        scale: [1, 1.12, 1],
        x: ["0%", "10%", "-6%", "0%"],
        y: ["0%", "-8%", "10%", "0%"],
      };

  return (
    <div className="moving-background" aria-hidden="true">
      <div className="moving-background__mesh" />
      <div className="moving-background__sheen" />
      <div className="moving-background__grid" />
      <motion.div
        className="moving-background__orb moving-background__orb--a"
        animate={orbA}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="moving-background__orb moving-background__orb--b"
        animate={orbB}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="moving-background__orb moving-background__orb--c"
        animate={orbC}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
