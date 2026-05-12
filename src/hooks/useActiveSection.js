import { useEffect, useState } from "react";

export function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (!intersecting.length) return;
        const best = intersecting.reduce((a, b) =>
          b.intersectionRatio > a.intersectionRatio ? b : a
        );
        const id = best.target.id;
        if (id) setActive(id);
      },
      {
        root: null,
        rootMargin: "-38% 0px -38% 0px",
        threshold: [0, 0.12, 0.25, 0.45, 0.65],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
