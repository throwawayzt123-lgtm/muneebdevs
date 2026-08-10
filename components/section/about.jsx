import React, { useEffect, useRef, useState } from 'react';
import {
  CircularProgressbar,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  gsap, registerGsap, prefersReducedMotion,
  wipeHeading, animateWipeHeading, animateUnderline, revealPanels, rollNumbers,
} from '../../lib/gsapAnimations';

const skills = [
  { label: 'Next JS', value: 95 },
  { label: 'MERN', value: 90 },
  { label: 'AI Automations', value: 85 },
  { label: 'Wordpress', value: 92 },
];

function About() {
  const rootRef = useRef(null);
  /* Progress values count up from zero once the row scrolls into view. */
  const [values, setValues] = useState(() => skills.map(() => 0));

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const intro = root.querySelector('.about-intro');
      const cards = root.querySelectorAll('.about-skill');
      const reduced = prefersReducedMotion();

      if (reduced) {
        setValues(skills.map((s) => s.value));
        return;
      }

      animateWipeHeading(wipeHeading(root));
      animateUnderline(root.querySelector('.space-border'));

      /* Intro paragraph rises softly beneath a fading blur, distinct from
         the clip-path panels used further down. */
      gsap.from(intro, {
        scrollTrigger: { trigger: intro, start: 'top 85%' },
        y: 34,
        opacity: 0,
        filter: 'blur(6px)',
        duration: 1,
        ease: 'power2.out',
      });

      /* Skill dials open like a shutter (clip-path from center), then their
         numbers roll up with an odometer ease. */
      revealPanels(cards, { edge: 'bottom', start: 'top 85%', stagger: 0.12 });

      rollNumbers({
        trigger: cards[0],
        duration: 1.7,
        onUpdate: (p) => setValues(skills.map((s) => Math.round(s.value * p))),
        onComplete: () => setValues(skills.map((s) => s.value)),
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="v-center" ref={rootRef}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2>About Me</h2>
            <div className="space-border"></div>
          </div>
          <div className="col-md-8 text-center m-auto about-intro">
            <p>I am a Full Stack Web Developer (MERN) based in Lahore, Pakistan, with 1.5+ years of
            experience building business and ecommerce websites with Next JS, Wordpress and
            Tailwind CSS. I develop end-to-end applications on the MERN stack and design AI
            automation systems with N8N. I am currently working as a full stack developer
            at Web Bridge Consulting, building CRMs and Next JS business sites. I look forward to
            any opportunities and challenges.
            </p>
          </div>
        </div>
        <div className="row">
          {skills.map((skill, i) => (
            <div className="col-lg-3 p-5 text-center about-skill g-panel" key={skill.label}>
              <CircularProgressbar value={values[i]} text={`${values[i]}.0%`} />
              <h4 className="mt-2">{skill.label}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
