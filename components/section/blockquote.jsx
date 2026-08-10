import React, { useEffect, useRef } from 'react';
import { Parallax } from "react-parallax";
import { gsap, registerGsap, prefersReducedMotion } from '../../lib/gsapAnimations';

const image1 = "./img/background/2.jpg";

const QUOTE = "Clean code and thoughtful design are never accidents. Every interface I build is meant to load fast, feel effortless and work everywhere, because the details are what separate a website from an experience.";

function Mblockquote() {
  const rootRef = useRef(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.q-word');
      const mark = root.querySelector('.d-big');
      const by = root.querySelector('.d-quote-by');

      if (prefersReducedMotion()) {
        gsap.set([words, mark, by], { opacity: 1 });
        return;
      }

      /* Quotation mark drops in and settles. */
      gsap.from(mark, {
        scrollTrigger: { trigger: root, start: 'top 75%' },
        y: -60,
        opacity: 0,
        rotate: -18,
        duration: 1,
        ease: 'back.out(1.7)',
      });

      /* Words brighten one by one, tied to scroll position. */
      gsap.fromTo(words,
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.4,
          scrollTrigger: {
            trigger: root,
            start: 'top 68%',
            end: 'bottom 72%',
            scrub: 0.5,
          },
        }
      );

      gsap.from(by, {
        scrollTrigger: { trigger: by, start: 'top 90%' },
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="section bg-top bg-bottom py-0">
      <Parallax className="pb-5" bgImage={image1} bgImageAlt="" strength={300}>
        <div className="py-5 position-relative" ref={rootRef}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-10 offset-md-1">
                <div className="spacer-double"></div>
                <blockquote className="q-big">
                  <i className="d-big icon_quotations"></i>
                  {QUOTE.split(' ').map((word, i) => (
                    <span className="q-word" key={`${word}-${i}`}>{word} </span>
                  ))}
                  <span className="d-quote-by">Muneeb Ur Rehman</span>
                </blockquote>
                <div className="spacer-double"></div>
                <div className="spacer-double"></div>
                <div className="spacer-single"></div>
              </div>
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
}

export default Mblockquote;
