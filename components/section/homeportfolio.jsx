import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import {
  gsap, registerGsap, prefersReducedMotion,
  wipeHeading, animateWipeHeading, animateUnderline,
} from '../../lib/gsapAnimations';

/*
  Homepage portfolio preview.
  Shows a selection of live full stack projects and links out to the
  dedicated portfolio pages for the full lists.
*/
/*
  `order` controls the position of each card in the grid — 1 shows first, 2
  second, and so on. Change the numbers here to re-arrange the projects; the
  list below can stay in any order, and the "01 / 02 / …" label on each card
  follows the sorted position automatically.
*/
const projects = [
  {
    order: 1,
    title: 'Web Bridge Consulting',
    tag: 'Next JS',
    description: 'Full-spectrum BPO and telecom agency site',
    url: 'https://www.webbridgeconsulting.com/',
    image: '/images/portfolio/fullstack/Webbridge.webp'
  },
  {
    order: 2,
    title: 'Web Bridge CRM',
    tag: 'CRM',
    description: 'Enterprise management platform with role-based access',
    url: 'https://webbridgecrm.vercel.app/login',
    image: '/images/portfolio/fullstack/webbridgecrm.webp'
  },
  {
    order: 3,
    title: 'Chandup CRM',
    tag: 'CRM',
    description: 'Repair management platform for admin and staff',
    url: 'https://chandups.vercel.app/',
    image: '/images/portfolio/fullstack/chandupscrm.webp'
  },
  {
    order: 4,
    title: 'Webcraft Consulting',
    tag: 'Next JS',
    description: 'Business consulting site with custom animations',
    url: 'https://webcraftcons.com/',
    image: '/images/portfolio/fullstack/webcraftconsulting.webp'
  },
  {
    order: 5,
    title: 'Vemoosc',
    tag: 'React JS',
    description: 'Oil and industrial services company platform',
    url: 'https://vemoosc.com/',
    image: '/images/portfolio/fullstack/vemooscUAE-industrialServices.webp'
  },
  {
    order: 6,
    title: 'Velox Elite',
    tag: 'React JS',
    description: 'Luxury car rental platform with live booking',
    url: 'https://veloxelite.vercel.app/',
    image: '/images/portfolio/elitework/veloxelite.webp'
  },
  {
    order: 7,
    title: 'AutoLab',
    tag: 'React JS',
    description: 'Premium car detailing and studio booking site',
    url: 'https://autolab-six.vercel.app/',
    image: '/images/portfolio/fullstack/autolabcardetailing.webp'
  }
];

function HomePortfolio() {
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

      if (prefersReducedMotion()) {
        gsap.set([cards, cta].filter(Boolean), { opacity: 1 });
        return;
      }

      animateWipeHeading(wipeHeading(root));
      animateUnderline(root.querySelector('.space-border'));

      /* Each card's image clips open like a shutter lifting (bottom to top)
         while the caption panel below fades in a beat later — a cinematic
         reveal in place of the old 3D tilt-and-scale. */
      cards.forEach((card, i) => {
        const media = card.querySelector('.work-card-media');
        const body = card.querySelector('.work-card-body');

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          delay: (i % 2) * 0.1,
        });

        /* The artwork settles into focus — a soft fade with the image easing
           down from a slight overscale — rather than the shutter/curtain
           clip-path wipe this used to run. */
        tl.fromTo(media,
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out', clearProps: 'opacity,transform' }
        )
          .fromTo(body,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
            '-=0.55'
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

  /* `order` on each project drives the sequence; anything without one falls
     to the end. Sorting here (not in the data) means the arrays can be edited
     in any order and the numbering still decides what shows first. */
  const ordered = [...projects].sort(
    (a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)
  );

  return (
    <div className="container" ref={rootRef}>
      <div className="row">
        <div className="col-md-12 text-center">
          <h2>Portfolio</h2>
          <div className="space-border"></div>
        </div>
      </div>

      <div className="spacer-single"></div>

      <div className="row g-4 work-grid">
        {ordered.map((project, index) => {
          const indexLabel = String(index + 1).padStart(2, '0');
          return (
            <div className="col-lg-6" key={project.title}>
              <a className="work-card"
                href={project.url}
                target="_blank"
                rel="noreferrer">
                <div className="work-card-media">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="work-card-img"
                  />
                  <span className="work-card-overlay">
                    <span className="work-card-visit">
                      Visit Site <i className="fa fa-long-arrow-right"></i>
                    </span>
                  </span>
                </div>
                <div className="work-card-body">
                  <span className="work-card-tag">{project.tag}</span>
                  <h3 className="work-card-title">{project.title}</h3>
                  <p className="work-card-desc">{project.description}</p>
                  <span className="work-card-link">
                    View Project <i className="fa fa-long-arrow-right"></i>
                  </span>
                  <span className="work-card-index" aria-hidden="true">{indexLabel}</span>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      <div className="spacer-single"></div>

      <div className="row">
        <div className="col-md-12 work-cta">
          <NextLink className="btn-main" href="/portfolio/full-stack">
            All Full Stack Work
          </NextLink>
          <NextLink className="btn-main btn-line" href="/portfolio/wordpress">
            Wordpress Work
          </NextLink>
          <NextLink className="btn-main btn-line" href="/portfolio/elite-class-work">
            Elite Class Work
          </NextLink>
        </div>
      </div>
    </div>
  );
}

export default HomePortfolio;
