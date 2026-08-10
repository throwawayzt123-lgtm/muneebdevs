import React, { useEffect, useRef } from 'react';
import {
  gsap, registerGsap, prefersReducedMotion,
  wipeHeading, animateWipeHeading, animateUnderline,
} from '../../lib/gsapAnimations';

const services = [
  {
    icon: 'icon_desktop',
    title: 'Business Websites',
    text: 'Fast, responsive corporate and business sites built with Next JS, Wordpress and Tailwind CSS. Clean design, easy to manage and optimized for speed and search visibility.'
  },
  {
    icon: 'icon_cart',
    title: 'Ecommerce Websites',
    text: 'Online stores that convert, from WooCommerce and custom carts to product catalogues, secure checkout and payment gateway integration.'
  },
  {
    icon: 'icon_tools',
    title: 'MERN Stack Development',
    text: 'End-to-end web applications powered by MongoDB, Express, React and Node JS. Custom CRMs, dashboards, REST APIs, authentication and database design.'
  },
  {
    icon: 'icon_cog',
    title: 'AI Automations',
    text: 'Intelligent workflow automation built with N8N. Connecting your tools, APIs and AI models to remove repetitive work and streamline business operations.'
  }
];

function Whatido() {
  const rootRef = useRef(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const boxes = root.querySelectorAll('.wid-box');

      if (prefersReducedMotion()) {
        gsap.set(boxes, { opacity: 1 });
        return;
      }

      animateWipeHeading(wipeHeading(root));
      animateUnderline(root.querySelector('.space-border'));

      /* Each card's colored corner panel wipes open like a folding card
         face, revealing the icon and copy underneath it rather than the
         old fly-in-and-tilt. Alternating edge direction per column keeps
         the four cards from feeling identical. */
      boxes.forEach((box, i) => {
        const icon = box.querySelector('i');
        const copy = box.querySelectorAll('h3, .wid-text');
        const fromLeft = i % 2 === 0;

        const tl = gsap.timeline({
          scrollTrigger: { trigger: box, start: 'top 85%', once: true },
        });

        tl.fromTo(box,
          { clipPath: fromLeft ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)', opacity: 1 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.75,
            ease: 'power3.inOut',
            clearProps: 'clip-path',
          }
        )
          .fromTo(icon,
            { scale: 0.4, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.2)' },
            '-=0.25'
          )
          .fromTo(copy,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08 },
            '-=0.3'
          );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="container" ref={rootRef}>
      <div className="row">
        <div className="col-md-12 text-center">
          <h2>What I Do</h2>
          <div className="space-border"></div>
        </div>
      </div>
      <div className="spacer-single"></div>
      <div className="row">
        {/* 2x2 on desktop so four cards stay balanced */}
        {services.map((service) => (
          <div className="col-lg-6 col-md-6" key={service.title}>
            <div className="de_3d-box wid-box">
              <div className="d-inner">
                <i className={`${service.icon} id-color-2`}></i>
                <div className="text">
                  <h3>{service.title}</h3>
                  <span className="wid-text">{service.text}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Whatido;
