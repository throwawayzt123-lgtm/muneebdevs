import React, { useState, useEffect } from 'react';
import { Link } from "react-scroll";
import Seo from '../components/Seo';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/section/Hero';
import HeroVideo from '../components/layout/HeroVideo';
import About from '../components/section/about';
import Blockquote from '../components/section/blockquote';
import Whatido from '../components/section/whatido';
import HomePortfolio from '../components/section/homeportfolio';
import Resume from '../components/section/resume';
import Counter from '../components/section/counter';
import Contact from '../components/section/contact';
import Footer from '../components/section/footer';
import ScrollToTopBtn from '../components/layout/ScrollToTop';
import WhatsappButton from '../components/layout/WhatsappButton';
import { useScrollRefresh, useRevealFallback } from '../lib/gsapAnimations';

export default function Home() {
  useScrollRefresh();
  useRevealFallback();
  useEffect(() => {
      if (typeof window !== 'undefined') {
          const loader = document.getElementById('mainpreloader');
          if (loader)
          setTimeout(() => {
            loader.classList.add("fadeOut");
            loader.style.display = 'none';
          }, 3000)
      }
    }, []);
    
  return (
    <>
    <Seo path="/" />

    {/* LOADER */}
    <div id='mainpreloader'>
      <div className='preloader fadeOut'>
        <div className="mainpreloader">
          <span></span>
        </div>
      </div>
    </div>

    {/* MENU */}
    <div className="home">
      
      <Navbar />

      {/* HERO */}
      <section id="hero-area" className="bg-bottom py-0">
        <HeroVideo />
        <Hero/>
        <Link smooth spy to="about">
          <span className="mouse transition" id="fly">
              <span className="scroll"></span>
          </span>
        </Link>
      </section>

      {/* ABOUT */}
      <section id="about" className="pb-0">
        <About/>
        <Blockquote/>
      </section>

      {/* What I DO */}
      <section id="whatido">
        <Whatido/>
      </section>

      {/* Portfolio */}
      <section id="gallery">
        <HomePortfolio/>
      </section>

      {/* Resume */}
      <section id="resume" className="pb-0">
        <Resume/>
        <Counter/>
      </section>

      {/* contact */}
      <section id="contact" className="pb-0">
        <Contact/>
        <Footer/>
      </section>

      <div className="float-text">
          <div className="de_social-icons">
              <a className="buton" href="https://www.linkedin.com/in/muneebdevs07/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fa fa-linkedin fa-lg"></i></a>
              <a className="buton" href="https://github.com/Muneeb-ur-Rehman11" target="_blank" rel="noreferrer" aria-label="GitHub"><i className="fa fa-github fa-lg"></i></a>
          </div>
          <span>Follow Me</span>
      </div>
    </div>
    <WhatsappButton />
    <ScrollToTopBtn />
    </>
  )
}
