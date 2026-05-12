import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const SPARK_COUNT = 10;
const SPARK_DURATION = 0.55;

function SparkBurst({ x, y }) {
  const angles = Array.from(
    { length: SPARK_COUNT },
    (_, i) => (i / SPARK_COUNT) * Math.PI * 2 + Math.random() * 0.35
  );

  return (
    <motion.div
      aria-hidden
      className="spark-burst"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: SPARK_DURATION - 0.15, duration: 0.2 }}
      style={{
        position: "fixed",
        left: x,
        top: y,
        width: 1,
        height: 1,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 55,
      }}
    >
      {angles.map((angle, i) => {
        const dist = 38 + Math.random() * 28;
        return (
          <motion.span
            key={i}
            className="spark-burst__dot"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              opacity: 0,
              scale: 0.25,
            }}
            transition={{
              duration: SPARK_DURATION,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        );
      })}
    </motion.div>
  );
}

export default function InteractionLayer() {
  const reduced = useReducedMotion();
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--ptr-x", "0.5");
    root.style.setProperty("--ptr-y", "0.5");
    root.style.setProperty("--scroll-boost", "0");
  }, []);

  useEffect(() => {
    if (reduced) return undefined;

    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return undefined;

    const onMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      document.documentElement.style.setProperty("--ptr-x", x.toFixed(4));
      document.documentElement.style.setProperty("--ptr-y", y.toFixed(4));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return undefined;

    let lastY = window.scrollY;
    let timeoutId;

    const onScroll = () => {
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      if (dy < 55) return;

      document.documentElement.style.setProperty("--scroll-boost", "1");
      document.body.dataset.scrollCharged = "true";
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        document.documentElement.style.setProperty("--scroll-boost", "0");
        delete document.body.dataset.scrollCharged;
      }, 320);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timeoutId);
    };
  }, [reduced]);

  const addBurst = useCallback(
    (clientX, clientY) => {
      if (reduced) return;
      const id = crypto.randomUUID();
      setBursts((b) => [...b, { id, x: clientX, y: clientY }]);
      window.setTimeout(() => {
        setBursts((b) => b.filter((x) => x.id !== id));
      }, 650);
    },
    [reduced]
  );

  useEffect(() => {
    if (reduced) return undefined;

    const onPointerDown = (e) => {
      if (e.button !== 0) return;
      const t = e.target;
      if (
        t.closest(
          "a, button, input, textarea, select, label, [data-no-spark]"
        )
      ) {
        return;
      }
      addBurst(e.clientX, e.clientY);
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [reduced, addBurst]);

  return (
    <AnimatePresence>
      {bursts.map((b) => (
        <SparkBurst key={b.id} x={b.x} y={b.y} />
      ))}
    </AnimatePresence>
  );
}
