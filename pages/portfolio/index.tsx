import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Seo from '../../components/Seo';
import NavbarPage from '../../components/layout/NavbarPage';
import Contact from '../../components/section/contact';
import Footer from '../../components/section/footer';
import ScrollToTopBtn from '../../components/layout/ScrollToTop';
import WhatsappButton from '../../components/layout/WhatsappButton';
import { gsap, registerGsap, prefersReducedMotion, useScrollRefresh, useRevealFallback } from '../../lib/gsapAnimations';
import { allProjects, CATEGORIES } from '../../lib/projects';

const ALL = 'All Work';

export default function AllPortfolio() {
  useScrollRefresh();
  useRevealFallback();

  const [active, setActive] = useState(ALL);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const projects = useMemo(() => allProjects(), []);
  const counts = useMemo(() => {
    const c: Record<string, number> = { [ALL]: projects.length };
    CATEGORIES.forEach((cat) => {
      c[cat] = projects.filter((p) => p.category === cat).length;
    });
    return c;
  }, [projects]);

  const shown = active === ALL ? projects : projects.filter((p) => p.category === active);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('mainpreloader');
      if (loader)
        setTimeout(() => {
          loader.classList.add('fadeOut');
          loader.style.display = 'none';
        }, 1000);
    }
  }, []);

  /* Re-running on `active` means the cards that survive a filter change
     animate back in, rather than snapping into place. */
  useEffect(() => {
    registerGsap();
    const root = gridRef.current;
    if (!root) return;
    const cards = root.querySelectorAll('.work-card');
    if (!cards.length) return;
    if (prefersReducedMotion()) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }
    const tween = gsap.fromTo(cards,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: .55, ease: 'power3.out', stagger: .05, clearProps: 'opacity,transform' }
    );
    return () => { tween.kill(); };
  }, [active]);

  return (
    <>
      <Seo
        title="Portfolio | Muneeb Ur Rehman"
        description="Every project by Muneeb Ur Rehman in one place — business websites, ecommerce stores, custom CRMs and 3D interactive builds. Filter by the kind of work you need."
        path="/portfolio"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
        ]}
      />

      {/* LOADER */}
      <div id="mainpreloader">
        <div className="preloader fadeOut">
          <div className="mainpreloader">
            <span></span>
          </div>
        </div>
      </div>

      <div className="home">
        <NavbarPage />

        <section id="subheader" className="pt-5 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h6 className="color portfolio-eyebrow">Portfolio</h6>
                <h1 className="h2">Selected Work</h1>
                <div className="space-border"></div>
              </div>
              <div className="col-md-8 text-center m-auto">
                <p>
                  Everything I have built, in one place. Pick the kind of work you
                  are looking for and the grid narrows to just those projects.
                </p>
              </div>
            </div>

            {/* filter bar */}
            <div className="work-filter" role="tablist" aria-label="Filter projects by type">
              {[ALL, ...CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active === cat}
                  className={active === cat ? 'work-filter-btn is-active' : 'work-filter-btn'}
                  onClick={() => setActive(cat)}
                >
                  {cat}
                  <span className="work-filter-count">{counts[cat]}</span>
                </button>
              ))}
            </div>

            <div className="row g-4 work-grid" ref={gridRef}>
              {shown.map((project, index) => {
                const Card = project.url ? 'a' : 'div';
                const linkProps = project.url
                  ? { href: project.url, target: '_blank', rel: 'noreferrer' }
                  : {};
                const indexLabel = String(index + 1).padStart(2, '0');

                return (
                  <div className="col-lg-6" key={project.title}>
                    <Card className={project.url ? 'work-card' : 'work-card no-link'} {...linkProps}>
                      <div className="work-card-media">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 767px) 100vw, 50vw"
                          className="work-card-img"
                        />
                      </div>
                      <div className="work-card-body">
                        <span className="work-card-index" aria-hidden="true">{indexLabel}</span>
                        <div className="work-card-meta">
                          <span className="work-card-tag">{project.tag}</span>
                          <span className="work-card-rule" aria-hidden="true"></span>
                        </div>
                        <h3 className="work-card-title">{project.title}</h3>
                        {project.description && (
                          <p className="work-card-desc">{project.description}</p>
                        )}
                        {project.url && (
                          <span className="work-card-foot">
                            <span className="work-card-action">View Project</span>
                            <span className="work-card-cta" aria-hidden="true">
                              <i className="fa fa-long-arrow-right"></i>
                            </span>
                          </span>
                        )}
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="pb-0">
          <Contact />
          <Footer />
        </section>
      </div>
      <WhatsappButton />
      <ScrollToTopBtn />
    </>
  );
}
