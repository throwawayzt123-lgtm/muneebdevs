import { useEffect, useRef } from "react";
import Typed from 'typed.js';
import { gsap, registerGsap, prefersReducedMotion } from '../../lib/gsapAnimations';

function Hero() {
  const typeRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ["FULL STACK DEVELOPER", "MERN DEVELOPER", "AI AUTOMATION EXPERT"],
      typeSpeed: 60,
      backSpeed: 50,
      loop: true,
    };

    const typed = new Typed(typeRef.current, options);

    return () => {
      // Clean up the Typed instance to prevent memory leaks
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const name = root.querySelector('.hero-name');
      const title = root.querySelector('.hero-title');
      const items = gsap.utils.toArray('.list_location li');

      if (prefersReducedMotion()) {
        gsap.set([name, title, items], { opacity: 1, clearProps: 'all' });
        return;
      }

      /* Entrance timeline, delayed so it plays as the preloader clears. */
      const tl = gsap.timeline({ delay: 0.35 });

      tl.from(name, {
        yPercent: 130,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      })
        .from(title, {
          yPercent: 60,
          opacity: 0,
          duration: 1.1,
          ease: 'power4.out',
        }, '-=0.7')
        .from(items, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.13,
        }, '-=0.75');

      /* Content drifts up and fades as the visitor scrolls past the hero. */
      gsap.to('.hero-inner', {
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
        y: -110,
        opacity: 0.15,
        ease: 'none',
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="v-center" ref={rootRef}>
      <div className="container">
        <div className="row">
          <div className="col-12 hero-inner">
            <div className="hero-mask">
              {/* The one real <h1> on the page: stable, keyword-relevant
                  text for search engines. The animated line below is
                  supporting content, not the primary heading, since its
                  text changes every few seconds. */}
              <h1 className="color hero-name">I Am Muneeb Ur Rehman</h1>
            </div>
            <div className="spacer-20"></div>
            <p className="h1_big hero-title">
              <span ref={typeRef}></span>
            </p>
            <ul className="list_location">
              <li>
                <span>Location</span>Lahore, Pakistan
              </li>
              <li>
                <span>Phone</span>+92 332-8863805
              </li>
              <li>
                <span>Email</span>muneebdevs07@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
