import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-scroll";
import NextLink from 'next/link';
import Image from 'next/image';

import logoImg from '../../public/logo.png';

const Navbar = function () {
  const [showMenu, setMenu] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const [showPortfolio, setPortfolio] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setMenu(false);
      setPortfolio(false);
      /* a small offset avoids the bar flickering right at the top */
      setSticky(window.pageYOffset > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerRef]);

  /* lock body scroll while the mobile panel is open, and close on Escape */
  useEffect(() => {
    document.body.style.overflow = showMenu ? 'hidden' : '';
    const onKey = (e) => { if (e.key === 'Escape') setMenu(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [showMenu]);
    return(
      <header ref={headerRef} className={isSticky ? "sticky" : ""} id="header-wrap">
        <nav className="navbar transition">
        <div className="container">
          <Link  className="navbar-brand" activeClass="active" spy to="hero-area">
            <Image src={logoImg} className="img-fluid d-block imginit" alt="Muneeb Ur Rehman" height={62} priority style={{width: '250px', height: '130px'}}/>
          </Link>
          {/* Desktop menu Here */}
          <div className="dekstopmenu">
             <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link transition" activeClass="active" spy to="hero-area">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link transition" activeClass="active" spy to="about">
                  About me
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link transition" activeClass="active" spy to="whatido">
                  What I Do
                </Link>
              </li>
              <li className="nav-item has-dropdown"
                onMouseEnter={() => setPortfolio(true)}
                onMouseLeave={() => setPortfolio(false)}>
                <Link className="nav-link transition dropdown-toggle-custom" activeClass="active" spy to="gallery">
                  Portfolio
                </Link>
                <ul className={showPortfolio ? "nav-dropdown show" : "nav-dropdown"}>
                  <li>
                    <NextLink href="/portfolio/full-stack">Full Stack</NextLink>
                  </li>
                  <li>
                    <NextLink href="/portfolio/wordpress">Wordpress</NextLink>
                  </li>
                  <li>
                    <NextLink href="/portfolio/elite-class-work">Elite Class Work</NextLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link transition" activeClass="active" spy to="resume">
                  My resume
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link transition" activeClass="active" spy to="contact">
                  Contact Me
                </Link>
              </li>
            </ul>
          </div>
          {/* Desktop menu Here */}

          {/* mobile menu here */}
          {showMenu && 
          <div className="mobilemenu" >
            <ul className="navbar-nav mr-auto w-100 justify-content-end clearfix">
              <li className="nav-item">
                <Link className="nav-link" onClick={() => setMenu(false)} activeClass="active" smooth spy to="hero-area">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={() => setMenu(false)} activeClass="active" smooth spy to="about">
                  About me
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link transition" onClick={() => setMenu(false)} smooth activeClass="active" spy to="whatido">
                  What I Do
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link transition mobile-dropdown-label" onClick={() => setMenu(false)} smooth activeClass="active" spy to="gallery">
                  Portfolio
                </Link>
                <ul className="mobile-subnav">
                  <li>
                    <NextLink onClick={() => setMenu(false)} href="/portfolio/full-stack">Full Stack</NextLink>
                  </li>
                  <li>
                    <NextLink onClick={() => setMenu(false)} href="/portfolio/wordpress">Wordpress</NextLink>
                  </li>
                  <li>
                    <NextLink onClick={() => setMenu(false)} href="/portfolio/elite-class-work">Elite Class Work</NextLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link transition" onClick={() => setMenu(false)} smooth activeClass="active" spy to="resume">
                  My resume
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link transition" onClick={() => setMenu(false)} smooth activeClass="active" spy to="contact">
                  Contact Me
                </Link>
              </li>
            </ul>
          </div>
          }
          {showMenu && (
            <div className="mobilemenu-backdrop" onClick={() => setMenu(false)} aria-hidden="true"></div>
          )}
          <button
            className="burgermenu"
            type="button"
            onClick={() => setMenu(!showMenu)}
            aria-label={showMenu ? 'Close menu' : 'Open menu'}
            aria-expanded={showMenu}
          >
            <i className={showMenu ? 'fa fa-times' : 'fa fa-bars'} aria-hidden="true"></i>
          </button>
          {/* mobile menu here */}
        </div>
      </nav>
      </header>
    )
}

export default Navbar;