import React, { useEffect, useRef } from 'react';
import {
  gsap, registerGsap, prefersReducedMotion,
  wipeHeading, animateWipeHeading, animateUnderline,
} from '../../lib/gsapAnimations';

const experience = [
  {
    period: 'May 2026 - Current',
    title: 'Full Stack Developer',
    company: 'Web Bridge Consulting, Cavalry Ground',
    text: 'Working as a full stack developer on custom CRMs and Next JS business sites. Integrated third-party plugins and optimized page speed for improved UI and SEO performance.'
  },
  {
    period: 'October 2024 - January 2026',
    title: 'Frontend Developer (Project Based)',
    company: 'Viista, DHA Phase 6, Lahore',
    text: 'Developed and customized modern, responsive websites using Tailwind CSS and custom design to meet client requirements across a range of project based engagements.'
  },
  {
    period: 'July 2024 - October 2024',
    title: 'React JS Intern',
    company: 'TeachAbout, DHA Phase 8, Lahore',
    text: 'Worked on developing responsive and interactive UI components using React JS, following modern best practices and component-based architecture.'
  }
];

const education = [
  {
    period: 'Current - 6th Semester',
    title: 'BS Software Engineering',
    company: 'Lahore Garrison University',
    text: 'Currently in the 6th semester with a 3.40 CGPA, focusing on software engineering principles, modern web technologies and scalable application architecture.'
  },
  {
    period: 'Intermediate',
    title: 'FSc Pre-Engineering',
    company: 'Concordia College',
    text: 'Completed Intermediate in Pre-Engineering with 761 out of 1100 marks, building a strong foundation in mathematics and physics.'
  },
  {
    period: 'Matriculation',
    title: 'Matric in Computer Science',
    company: 'The Educators School',
    text: 'Graduated with 1081 out of 1100 marks, where an early interest in computer science set the direction for a career in web development.'
  }
];

function Timeline({ heading, items, side }) {
  return (
    <div className="col-lg-6 resume-col">
      <div className="p-4">
        <h3 className="s_border resume-heading">{heading}</h3>
        <ul className={`d_timeline resume-timeline resume-${side}`}>
          <span className="resume-line"></span>
          {items.map((item) => (
            <li className="d_timeline-item resume-item" key={item.period + item.title}>
              <h3 className="d_timeline-title">{item.period}</h3>
              <p className="d_timeline-text">
                <span className="d_title">{item.title}</span>
                <span className="d_company">{item.company}</span>
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Resume() {
  const rootRef = useRef(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('.resume-item, .resume-heading', { opacity: 1 });
        return;
      }

      animateWipeHeading(wipeHeading(root));
      animateUnderline(root.querySelector('.space-border'));

      /* Column headings clip open horizontally, mirrored per side, distinct
         from the section heading's vertical wipe. */
      gsap.utils.toArray('.resume-heading').forEach((h, i) => {
        const fromLeft = i === 0;
        gsap.fromTo(h,
          { clipPath: fromLeft ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)', opacity: 1 },
          {
            scrollTrigger: { trigger: h, start: 'top 88%' },
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.7,
            ease: 'power3.inOut',
            clearProps: 'clip-path',
          }
        );
      });

      /* Vertical connector draws downward as the column scrolls through
         (kept — this scroll-linked draw is already a distinct signature). */
      gsap.utils.toArray('.resume-timeline').forEach((list) => {
        const line = list.querySelector('.resume-line');
        gsap.fromTo(line,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: list,
              start: 'top 78%',
              end: 'bottom 65%',
              scrub: 0.4,
            },
          }
        );
      });

      /* Each entry's card clips open left-to-right, like a page turning
         over, instead of sliding in from the edge. */
      gsap.utils.toArray('.resume-timeline').forEach((list) => {
        gsap.fromTo(list.querySelectorAll('.resume-item'),
          { clipPath: 'inset(0% 100% 0% 0%)' },
          {
            scrollTrigger: { trigger: list, start: 'top 80%', once: true },
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.7,
            ease: 'power3.inOut',
            stagger: 0.18,
            clearProps: 'clip-path',
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="container" ref={rootRef}>
      <div className="row">
        <div className="col-md-12 text-center">
          <h2>My Resume</h2>
          <div className="space-border"></div>
        </div>
      </div>
      <div className="row gh-5">
        <Timeline heading="Experiences" items={experience} side="left" />
        <Timeline heading="Education" items={education} side="right" />
        <div className="spacer-double"></div>
      </div>
    </div>
  );
}

export default Resume;
