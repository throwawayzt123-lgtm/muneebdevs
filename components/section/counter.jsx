import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, registerGsap, prefersReducedMotion, rollNumbers } from '../../lib/gsapAnimations';

const image1 = "/img/background/3.jpg";

const stats = [
  { end: 3000, label: 'Hours of Works' },
  { end: 40, label: 'Projects Done' },
  { end: 25, label: 'Satisfied Customers' },
  { end: 9, label: 'Technologies Mastered' },
];

function Counter() {
  const rootRef = useRef(null);
  const [counts, setCounts] = useState(() => stats.map(() => 0));

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const cells = gsap.utils.toArray('.de_count');
      const dividers = gsap.utils.toArray('.de_count-divider');

      if (prefersReducedMotion()) {
        setCounts(stats.map((s) => s.end));
        gsap.set(cells, { opacity: 1 });
        return;
      }

      /* Thin vertical dividers between cells draw open first, like a gate
         lifting, then the digits roll up with an odometer ease. Distinct
         from the scale-pop entrance used elsewhere. */
      gsap.from(dividers, {
        scrollTrigger: { trigger: root, start: 'top 82%' },
        scaleY: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.14,
      });

      gsap.from(cells, {
        scrollTrigger: { trigger: root, start: 'top 82%' },
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.14,
      });

      rollNumbers({
        trigger: root,
        duration: 2,
        onUpdate: (p) => setCounts(stats.map((s) => Math.round(s.end * p))),
        onComplete: () => setCounts(stats.map((s) => s.end)),
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="section bg-top bg-bottom py-0">
      <div className="section-bg" aria-hidden="true">
        <Image src={image1} alt="" fill sizes="100vw" className="section-bg-img" />
      </div>
      <div className="py-5 position-relative" ref={rootRef}>
        <div className="container">
          <div className="row">
            {stats.map((stat, i) => (
              <div className="col-md-3" key={stat.label}>
                {i > 0 && <span className="de_count-divider" aria-hidden="true"></span>}
                <div className="de_count text-center">
                  <h3 className="timer">{counts[i].toLocaleString()}</h3>
                  <span>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Counter;
