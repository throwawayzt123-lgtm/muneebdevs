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
    icon: 'icon_cone',
    title: '3D & Interactive Experiences',
    text: 'Real-time 3D product visuals and drag-to-rotate configurators built with WebGL, designed to feel tactile and premium rather than like a static gallery.'
  },
  {
    icon: 'icon_shield',
    title: 'Enterprise-Grade Systems',
    text: 'Role-based CRMs and multi-branch management platforms built to handle real operational load, with authentication, permissions and data that stay reliable.'
  },
  {
    icon: 'icon_ribbon',
    title: 'Premium Polish & Performance',
    text: 'Every pixel and transition considered, then tuned to load fast and run smooth, the difference between work that looks impressive and work that performs like it.'
  }
];

const projects = [
  {
    title: 'Aurelia Cafe',
    tag: '3D / WebGL',
    description: 'Cinematic 3D coffee brand experience',
    url: 'https://aurelia-cafe-henna.vercel.app/home2',
    image: '/images/portfolio/elitework/aurelia-cafewebsite.png'
  },
  {
    title: 'Velox Elite',
    tag: '3D Showcase',
    description: 'Interactive drag-to-rotate car configurator',
    url: 'https://veloxelite.vercel.app/',
    image: '/images/portfolio/elitework/veloxelite.png'
  },
  {
    title: 'Web Bridge CRM',
    tag: 'Enterprise CRM',
    description: 'Role-based enterprise management platform',
    url: 'https://webbridgecrm.vercel.app/login',
    image: '/images/portfolio/elitework/webbridgecrm.png'
  },
  {
    title: 'Chandup CRM',
    tag: 'Enterprise Software',
    description: 'Multi-branch UPS repair management system',
    url: 'https://chandups.vercel.app/',
    image: '/images/portfolio/elitework/chandupscrm.png'
  }
];

export default function EliteClassWork() {
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
        title="Elite Class Work | Muneeb Ur Rehman"
        description="Elite class portfolio by Muneeb Ur Rehman: immersive 3D product experiences and enterprise-grade CRM systems, from real-time WebGL showcases to role-based management platforms."
        path="/portfolio/elite-class-work"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Elite Class Work', path: '/portfolio/elite-class-work' },
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
            title="Elite Class Work"
            subtitle="Portfolio"
            intro="The most demanding projects I've built: immersive 3D product experiences and enterprise-grade systems where interaction design and backend architecture both had to be flawless. Click any project to explore the live site."
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
