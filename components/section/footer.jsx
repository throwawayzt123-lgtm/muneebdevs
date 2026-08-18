import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import logoImg from '../../public/logo.png';

const currentYear = new Date().getFullYear();

const links = [
  { label: 'Home', href: '/#hero-area' },
  { label: 'About me', href: '/#about' },
  { label: 'What I Do', href: '/#whatido' },
  { label: 'Portfolio', href: '/#gallery' },
  { label: 'My resume', href: '/#resume' },
  { label: 'Contact Me', href: '/#contact' },
];

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row footer-row">
          {/* Col 1: logo + tagline */} 
          <div className="col-lg-4 footer-col footer-brand">
            <NextLink href="/" className="footer-logo">
              <Image src={logoImg} alt="Muneeb Ur Rehman" height={48} style={{ width: '250px', height: '130px' }} />
            </NextLink>
            <p className="footer-tagline">
              Design you notice. Engineering you don&apos;t have to.
            </p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/in/muneebdevs07/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fa fa-linkedin"></i></a>
              <a href="https://github.com/Muneeb-ur-Rehman11" target="_blank" rel="noreferrer" aria-label="GitHub"><i className="fa fa-github"></i></a>
            </div>
          </div>

          {/* Col 2: quick links */}
          <div className="col-lg-4 col-md-6 footer-col footer-links">
            <h6 className="footer-heading">Quick Links</h6>
            <ul>
              {links.map((link) => (
                <li key={link.label}>
                  <NextLink href={link.href}>{link.label}</NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: contact info */}
          <div className="col-lg-4 col-md-6 footer-col footer-contact">
            <h6 className="footer-heading">Contact Info</h6>
            <ul>
              <li>
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <a href="mailto:muneebdevs07@gmail.com">muneebdevs07@gmail.com</a>
              </li>
              <li>
                <i className="fa fa-phone" aria-hidden="true"></i>
                <a href="tel:+923328863805">+92 332-8863805</a>
              </li>
              
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="copy">&copy; Copyright {currentYear} - Muneeb Ur Rehman. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
