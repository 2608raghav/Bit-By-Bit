import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import MovingBackground from "./components/MovingBackground";
import CursorEffect from "./components/CursorEffect";
import InteractionLayer from "./components/InteractionLayer";
import Magnetic from "./components/Magnetic";
import { useActiveSection } from "./hooks/useActiveSection";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay },
  }),
};

const cardHover = {
  whileHover: { y: -8, scale: 1.02, transition: { duration: 0.25 } },
};

const sections = [
  { id: "about", name: "About" },
  { id: "events", name: "Events" },
  { id: "team", name: "Team" },
  { id: "join", name: "Join" },
];

const stats = [
  { title: "300+", subtitle: "Active Members" },
  { title: "25+", subtitle: "Workshops Every Year" },
  { title: "12", subtitle: "Hackathon Wins" },
];

const events = [
  {
    title: "CodeStorm",
    text: "A 24-hour team coding sprint where innovation meets speed and collaboration.",
  },
  {
    title: "Build & Brew",
    text: "Casual weekly build sessions to ship projects, explore ideas, and learn together.",
  },
  {
    title: "Design to Deploy",
    text: "From UI concept to production app with mentorship from seniors and alumni.",
  },
];

const team = [
  { name: "Aryan", role: "President" },
  { name: "Riya", role: "Technical Lead" },
  { name: "Kunal", role: "Design & Media" },
  { name: "Siya", role: "Events Coordinator" },
];

const HERO_BRAND = "Bit By Bit";

export default function App() {
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const sectionIds = useMemo(() => sections.map((s) => s.id), []);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <MovingBackground />
      <CursorEffect />
      <InteractionLayer />
      <AnimatePresence>
        {loading ? (
          <motion.div
            className="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
          >
            <motion.img
              src="/logo.png"
              alt="Bit By Bit logo"
              className="preloader-logo"
              initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.45 }}
            >
              Bit By Bit
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        className="page-shell"
        initial={{ opacity: 0, scale: 1.01 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.65 } }}
      >
        <header className="site-header">
          <nav className="nav">
            <Magnetic strength={0.24}>
              <a href="#" className="logo">
                <img src="/logo.png" alt="Bit By Bit logo" />
                <span>Bit By Bit</span>
              </a>
            </Magnetic>
            <div className="nav-links">
              {sections.map((s) => (
                <Magnetic key={s.id} strength={0.2}>
                  <a
                    href={`#${s.id}`}
                    className={activeSection === s.id ? "is-active" : undefined}
                  >
                    {s.name}
                  </a>
                </Magnetic>
              ))}
            </div>
          </nav>
        </header>

        <main>
          <section className="hero">
            <div className="hero-bg">
              <motion.span
                className="blob blob-1"
                animate={{ y: [0, -16, 0], x: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="blob blob-2"
                animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="blob blob-3"
                animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="hero-content">
              <motion.p
                className="badge"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.1}
              >
                Vibrant. Creative. Technical.
              </motion.p>
              <motion.h1
                className="hero-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.28 }}
              >
                <motion.span
                  className="hero-title__welcome"
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, filter: "blur(14px)", y: 12 }
                  }
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.7,
                    ease: "easeOut",
                    delay: prefersReducedMotion ? 0 : 0.06,
                  }}
                >
                  Welcome to
                </motion.span>
                <span className="hero-title__brand">
                  {HERO_BRAND.split("").map((char, i) => (
                    <motion.span
                      key={`${char}-${i}`}
                      className="hero-title__letter"
                      initial={
                        prefersReducedMotion
                          ? false
                          : { opacity: 0, y: 40, rotateX: -78 }
                      }
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : 0.16 + i * 0.052,
                        duration: prefersReducedMotion ? 0 : 0.52,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.3}
              >
                The coding club where ideas become products, teammates become
                friends, and every project levels up your skills.
              </motion.p>
              <motion.div
                className="hero-actions"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.4}
              >
                <Magnetic strength={0.45}>
                  <a href="#join" className="btn btn-primary">
                    Join the Club
                  </a>
                </Magnetic>
                <Magnetic strength={0.38}>
                  <a href="#events" className="btn btn-outline">
                    Explore Events
                  </a>
                </Magnetic>
              </motion.div>
            </div>
          </section>

          <section id="about" className="section">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              What is Bit By Bit?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              custom={0.1}
            >
              We are a student-led community focused on app development, web
              design, AI experiments, and hackathon culture. Inspired by top
              college clubs, we blend fun events with real technical growth.
            </motion.p>
            <div className="stats">
              {stats.map((item, i) => (
                <motion.article
                  key={item.title}
                  className="stat-card"
                  {...cardHover}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={0.2 + i * 0.1}
                >
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="events" className="section">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              Signature Events
            </motion.h2>
            <div className="event-grid">
              {events.map((event, i) => (
                <motion.article
                  key={event.title}
                  className="event-card"
                  {...cardHover}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={0.1 + i * 0.12}
                >
                  <h3>{event.title}</h3>
                  <p>{event.text}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="team" className="section">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              Core Team
            </motion.h2>
            <div className="team-grid">
              {team.map((member, i) => (
                <motion.article
                  key={member.name}
                  className="team-card"
                  {...cardHover}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={0.1 + i * 0.1}
                >
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="join" className="section join-section">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              Ready to Build With Us?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              custom={0.1}
            >
              Join Bit By Bit and be part of a campus community that learns,
              builds, and wins together.
            </motion.p>
            <motion.form
              className="join-form"
              onSubmit={(e) => e.preventDefault()}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              custom={0.2}
            >
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="College Email" required />
              <Magnetic strength={0.4}>
                <button type="submit" className="btn btn-primary">
                  Register Interest
                </button>
              </Magnetic>
            </motion.form>
          </section>
        </main>

        <footer className="footer">
          <p>© 2026 Bit By Bit Club. Crafted with passion and pixels.</p>
        </footer>
      </motion.div>
    </>
  );
}
