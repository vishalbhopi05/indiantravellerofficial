import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export default function AnimatedSection({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.7,
  className = '',
  once = true,
  useGsap = false,
  gsapAnimation,
  style,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (useGsap && ref.current) {
      let ScrollTrigger;
      const initGsap = async () => {
        const mod = await import('gsap/ScrollTrigger');
        ScrollTrigger = mod.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        if (gsapAnimation === 'parallax') {
          gsap.fromTo(
            ref.current,
            { y: -50 },
            {
              y: 50,
              ease: 'none',
              scrollTrigger: {
                trigger: ref.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        } else if (gsapAnimation === 'reveal') {
          gsap.fromTo(
            ref.current,
            { opacity: 0, y: 80, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        } else if (gsapAnimation === 'stagger') {
          const children = ref.current.children;
          gsap.fromTo(
            children,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      };

      initGsap();

      return () => {
        if (ScrollTrigger) {
          ScrollTrigger.getAll().forEach((t) => t.kill());
        }
      };
    }
  }, [useGsap, gsapAnimation]);

  if (useGsap) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      variants={variants[animation] || variants.fadeUp}
    >
      {children}
    </motion.div>
  );
}
