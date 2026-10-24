import { motion } from "framer-motion";
import { ReactNode } from "react";

const Reveal = ({ children, delay = 0, className = "", y = 40 }: { children: ReactNode; delay?: number; className?: string; y?: number }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y, rotateX: 12, filter: "blur(6px)" }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{ transformPerspective: 900 }}
  >
    {children}
  </motion.div>
);

export default Reveal;
