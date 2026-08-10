import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  gsap, registerGsap, prefersReducedMotion,
  wipeHeadingEl, animateWipeHeading, animateUnderline,
} from '../../lib/gsapAnimations';

/*
  Shared layout for the portfolio sub-pages (Full Stack / Wordpress).
  Each page passes its own copy + project list so the markup stays in one place.
*/
function PortfolioPage({ title = '', subtitle = '', intro = '', services = [], projects = [] }) {
  const rootRef = useRef(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;
    /* gsap.context().revert() does not remove plain DOM listeners, so the
       hover handlers added below are tracked here and detached on cleanup
       to avoid piling up duplicate listeners across re-renders/navigation. */
    const hoverCleanups = [];

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.work-card');
      const cta = root.querySelector('.work-cta');
      const eyebrow = root.querySelector('.portfolio-eyebrow');

      if (prefersReducedMotion()) {
        gsap.set([cards, cta].filter(Boolean), { opacity: 1 });
        return;
      }

      /* Page has two headings (page title + "Selected Work"); wipe each
         independently rather than only the first. */
      root.querySelectorAll('h2').forEach((h) => {
        animateWipeHeading(wipeHeadingEl(h));
      });
      root.querySelectorAll('.space-border').forEach((b) => animateUnderline(b));

      if (eyebrow) {
        gsap.from(eyebrow, {
          scrollTrigger: { trigger: eyebrow, start: 'top 90%' },
          opacity: 0,
          y: -10,
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      /* Each card's image clips open like a shutter lifting, caption fades
         in after — matches the homepage portfolio grid's signature. */
      cards.forEach((card, i) => {
        const media = card.querySelector('.work-card-media');
        const body = card.querySelector('.work-card-body');

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          delay: (i % 2) * 0.1,
        });

        tl.fromTo(media,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power3.inOut', clearProps: 'clip-path' }
        )
          .fromTo(body,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
            '-=0.35'
          );

        /* Gentle drift keeps the grid alive while scrolling past it, and the
           hover zoom lives here too (not in CSS) so both animate through
           GSAP alone. Splitting them between GSAP (scroll, via scrub) and a
           CSS `transition: transform` (hover) makes the browser try to ease
           into every scrubbed scroll frame, which reads as a laggy,
           endlessly "looping" image — GSAP composites yPercent and scale
           into one transform per tween, so a single .to() covers both. */
        const img = card.querySelector('.work-card-img');

        gsap.to(img, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          yPercent: -7,
          ease: 'none',
        });

        const onEnter = () => gsap.to(img, { scale: 1.08, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
        const onLeave = () => gsap.to(img, { scale: 1, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
        hoverCleanups.push(() => {
          card.removeEventListener('mouseenter', onEnter);
          card.removeEventListener('mouseleave', onLeave);
        });
      });

      if (cta) {
        /* `once` + a generous start so the buttons always resolve to visible,
           even when they sit close to the bottom of the document. */
        gsap.fromTo(cta.children,
          { y: 30, opacity: 0 },
          {
            scrollTrigger: { trigger: cta, start: 'top 98%', once: true },
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.12,
            overwrite: 'auto',
            clearProps: 'opacity,transform',
          }
        );
      }
    }, root);

    return () => {
      hoverCleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <div className="container" ref={rootRef}>
      <div className="row">
        <div className="col-md-12 text-center">
          <h6 className="color portfolio-eyebrow">{subtitle}</h6>
          {/* This page's main subject — the single <h1>, styled identically
              to the site's other h2 section titles via the shared selector. */}
          <h1 className="h2">{title}</h1>
          <div className="space-border"></div>
        </div>
        <div className="col-md-8 text-center m-auto">
          <p>{intro}</p>
        </div>
      </div>

      <div className="spacer-single"></div>

      {/* services */}
      <div className="row">
        {services.map((service, index) => (
          <div className="col-lg-4" key={service.title}>
            <div className="de_3d-box">
              <div className="d-inner">
                <i className={`${service.icon} id-color-2`}></i>
                <div className="text">
                  <h3>{service.title}</h3>
                  {service.text}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="spacer-double"></div>

      {/* projects */}
      <div className="row">
        <div className="col-md-12 text-center">
          <h2>Selected Work</h2>
          <div className="space-border"></div>
        </div>
      </div>

      <div className="row g-4 work-grid">
        {projects.map((project, index) => {
          /* Cards with a live URL open the site; the rest render as plain cards. */
          const Card = project.url ? 'a' : 'div';
          const linkProps = project.url
            ? { href: project.url, target: '_blank', rel: 'noreferrer' }
            : {};
          const indexLabel = String(index + 1).padStart(2, '0');

          return (
            <div className="col-lg-6" key={project.title}>
              <Card className={project.url ? "work-card" : "work-card no-link"} {...linkProps}>
                <div className="work-card-media">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 767px) 100vw, 44vw"
                    className="work-card-img"
                  />
                  {project.url && (
                    <span className="work-card-overlay">
                      <span className="work-card-visit">
                        Visit Site <i className="fa fa-long-arrow-right"></i>
                      </span>
                    </span>
                  )}
                </div>
                <div className="work-card-body">
                  {project.tag && (
                    <span className="work-card-tag">{project.tag}</span>
                  )}
                  <h3 className="work-card-title">{project.title}</h3>
                  {project.description && (
                    <p className="work-card-desc">{project.description}</p>
                  )}
                  {project.url && (
                    <span className="work-card-link">
                      View Project <i className="fa fa-long-arrow-right"></i>
                    </span>
                  )}
                  <span className="work-card-index" aria-hidden="true">{indexLabel}</span>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PortfolioPage;
