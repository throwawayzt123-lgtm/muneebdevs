import React, { useEffect } from 'react';
import Seo from '../../components/Seo';
import NavbarPage from '../../components/layout/NavbarPage';
import PortfolioPage from '../../components/section/portfoliopage';
import Contact from '../../components/section/contact';
import Footer from '../../components/section/footer';
import ScrollToTopBtn from '../../components/layout/ScrollToTop';
import WhatsappButton from '../../components/layout/WhatsappButton';
import { useScrollRefresh, useRevealFallback } from '../../lib/gsapAnimations';

const services = [
  {
    icon: 'icon_desktop',
    title: 'React & Next JS',
    text: 'Component driven frontends built with React JS and Next JS, styled with Tailwind CSS and tuned for Core Web Vitals, SEO and fast first paint.'
  },
  {
    icon: 'icon_cogs',
    title: 'Node JS Backends',
    text: 'REST APIs, authentication flows and database design on Node JS, wired into clean, maintainable full stack MERN architectures.'
  },
  {
    icon: 'icon_lightbulb',
    title: 'N8N AI Automations',
    text: 'Custom automation pipelines that connect your apps, APIs and AI models with N8N, removing repetitive manual work from daily operations.'
  }
];

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
    title: 'AutoLab',
    tag: 'React JS',
    description: 'Premium car detailing and studio booking site',
    url: 'https://autolab-six.vercel.app/',
    image: '/images/portfolio/fullstack/autolabcardetailing.webp'
  },
  {
    order: 7,
    title: 'Velox Elite',
    tag: 'React JS',
    description: 'Luxury car rental platform with live booking',
    url: 'https://veloxelite.vercel.app/',
    image: '/images/portfolio/elitework/veloxelite.webp'
  }
];

export default function FullStack() {
  useScrollRefresh();
  useRevealFallback();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('mainpreloader');
      if (loader)
        setTimeout(() => {
          loader.classList.add("fadeOut");
          loader.style.display = 'none';
        }, 1000)
    }
  }, []);

  return (
    <>
      <Seo
        title="Full Stack (MERN) Portfolio | Muneeb Ur Rehman"
        description="Full stack MERN portfolio by Muneeb Ur Rehman: custom CRMs, business dashboards and Next JS applications built with Node JS, MongoDB and N8N automation."
        path="/portfolio/full-stack"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Full Stack Portfolio', path: '/portfolio/full-stack' },
        ]}
      />

      {/* LOADER */}
      <div id='mainpreloader'>
        <div className='preloader fadeOut'>
          <div className="mainpreloader">
            <span></span>
          </div>
        </div>
      </div>

      <div className="home">
        <NavbarPage />

        <section id="subheader" className="pt-5 mt-5">
          <PortfolioPage
            title="Full Stack Development"
            subtitle="Portfolio"
            intro="Full stack work built on the MERN stack and Next JS. From custom CRMs and business platforms to booking systems and corporate sites, these are the projects where I handle both the interface and everything running behind it. Click any project to visit the live site."
            services={services}
            projects={projects}
          />
        </section>

        <section id="contact" className="pb-0">
          <Contact/>
          <Footer/>
        </section>
      </div>
      <WhatsappButton />
      <ScrollToTopBtn />
    </>
  )
}
