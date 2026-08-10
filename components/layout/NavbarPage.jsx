import React, { useEffect, useState, useRef } from "react";
import NextLink from 'next/link';
import Image from 'next/image';

import logoImg from '../../public/logo.png';

/*
  Navbar used on standalone pages (portfolio sub-pages).
  The homepage Navbar relies on react-scroll, which only resolves targets that
  exist on the current page, so section links here route back to "/" instead.
*/
const NavbarPage = function () {
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

  return (
    <header ref={headerRef} className={isSticky ? "sticky" : ""} id="header-wrap">
      <nav className="navbar transition">
        <div className="container">
          <NextLink className="navbar-brand" href="/">
            <Image src={logoImg} className="img-fluid d-block imginit" alt="Muneeb Ur Rehman" height={62} priority style={{width: 'auto', height: '62px'}}/>
          </NextLink>

          {/* Desktop menu Here */}
          <div className="dekstopmenu">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NextLink className="nav-link transition" href="/">Home</NextLink>
              </li>
              <li className="nav-item">
                <NextLink className="nav-link transition" href="/#about">About me</NextLink>
              </li>
              <li className="nav-item">
                <NextLink className="nav-link transition" href="/#whatido">What I Do</NextLink>
              </li>
              <li className="nav-item has-dropdown"
                onMouseEnter={() => setPortfolio(true)}
                onMouseLeave={() => setPortfolio(false)}>
                <NextLink className="nav-link transition dropdown-toggle-custom" href="/#gallery">
                  Portfolio
                </NextLink>
                <ul className={showPortfolio ? "nav-dropdown show" : "nav-dropdown"}>
                  <li>
                    <NextLink href="/portfolio/full-stack">Full Stack</NextLink>
                  </li>
                  <li>
                    <NextLink href="/portfolio/wordpress">Wordpress</NextLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NextLink className="nav-link transition" href="/#resume">My resume</NextLink>
              </li>
              <li className="nav-item">
                <NextLink className="nav-link transition" href="/#contact">Contact Me</NextLink>
              </li>
            </ul>
          </div>
          {/* Desktop menu Here */}

          {/* mobile menu here */}
          {showMenu &&
          <div className="mobilemenu">
            <ul className="navbar-nav mr-auto w-100 justify-content-end clearfix">
              <li className="nav-item">
                <NextLink onClick={() => setMenu(false)} className="nav-link" href="/">Home</NextLink>
              </li>
              <li className="nav-item">
                <NextLink onClick={() => setMenu(false)} className="nav-link" href="/#about">About me</NextLink>
              </li>
              <li className="nav-item">
                <NextLink onClick={() => setMenu(false)} className="nav-link transition" href="/#whatido">What I Do</NextLink>
              </li>
              <li className="nav-item">
                <NextLink onClick={() => setMenu(false)} className="nav-link transition mobile-dropdown-label" href="/#gallery">
                  Portfolio
                </NextLink>
                <ul className="mobile-subnav">
                  <li>
                    <NextLink onClick={() => setMenu(false)} href="/portfolio/full-stack">Full Stack</NextLink>
                  </li>
                  <li>
                    <NextLink onClick={() => setMenu(false)} href="/portfolio/wordpress">Wordpress</NextLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NextLink onClick={() => setMenu(false)} className="nav-link transition" href="/#resume">My resume</NextLink>
              </li>
              <li className="nav-item">
                <NextLink onClick={() => setMenu(false)} className="nav-link transition" href="/#contact">Contact Me</NextLink>
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

export default NavbarPage;
