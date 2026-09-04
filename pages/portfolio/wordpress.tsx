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
    icon: 'icon_tools',
    title: 'Custom Websites',
    text: 'Modern, responsive Wordpress websites tailored to your brand, built to be easy to manage and simple to update without touching code.'
  },
  {
    icon: 'icon_puzzle',
    title: 'Plugin Integration',
    text: 'Third-party plugin setup and configuration, from contact forms and bookings to analytics, payments and everything in between.'
  },
  {
    icon: 'icon_datareport',
    title: 'Speed & SEO',
    text: 'Page speed optimization and on-page SEO improvements so your site loads quickly, ranks better and converts more visitors.'
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
    title: 'Viista',
    tag: 'Marketing Agency',
    description: 'Digital marketing agency site with bold motion design',
    url: '',
    image: '/images/portfolio/wordpress/viista.webp'
  },
  
  {
    order: 2,
    title: 'Lucky Homes',
    tag: 'Home Builders',
    description: 'Australian custom home building company',
    url: 'https://luckyhomes.com.au/',
    image: '/images/portfolio/wordpress/LuckyHomesAustraliaHomebuilders.webp'
  },
  {
    order: 3,
    title: 'Stellr Solar',
    tag: 'Solar Energy',
    description: 'Canadian residential solar energy provider',
    url: 'https://stellrsolar.ca/',
    image: '/images/portfolio/wordpress/StellrSolar-Canada.webp'
  },
  
  {
    order: 4,
    title: 'Shayona Creation',
    tag: 'Ecommerce',
    description: 'Women ethnic wear online store',
    url: 'https://shayonacreation.com/',
    image: '/images/portfolio/wordpress/ShayonaCreation-womenClothing.webp'
  },
  {
    order: 5,
    title: 'UAQ Parts',
    tag: 'Auto Parts',
    description: 'Auto parts, service and repairs',
    url: 'https://uaq-parts.com/',
    image: '/images/portfolio/wordpress/uaq-parts.webp'
  },
  {
    order: 6,
    title: 'SQ Laptops',
    tag: 'Ecommerce',
    description: 'Laptops and computer accessories store',
    url: 'https://sqlaptops.com/',
    image: '/images/portfolio/wordpress/sqlaptops.webp'
  },
  {
    order: 7,
    title: 'Mena',
    tag: 'Ecommerce',
    description: 'Women clothing and fashion collection',
    url: 'https://mena.pk/',
    image: '/images/portfolio/wordpress/MenaClothingwoman.webp'
  },
  {
    order: 8,
    title: 'GBox Logistics',
    tag: 'Logistics',
    description: 'Global container shipping and tracking',
    url: 'https://gboxsg.com/',
    image: '/images/portfolio/wordpress/Gbox-logistics.webp'
  },
  {
    order: 9,
    title: 'Emperor Fortune',
    tag: 'Logistics',
    description: 'International freight and logistics services',
    url: 'https://emperorfortune.com/',
    image: '/images/portfolio/wordpress/Emperorfortune-logistics.webp'
  },
  {
    order: 10,
    title: 'Naqshdar',
    tag: 'Clothing Brand',
    description: 'Pakistani clothing brand with B2B wholesale',
    url: 'https://naqshdar.com.pk/',
    image: '/images/portfolio/wordpress/NaqshdarClothingBrand.webp'
  },
  {
    order: 11,
    title: 'Solar Switch',
    tag: 'Solar Energy',
    description: 'Solar panel supplier and installer',
    url: 'https://solarswitch.pk/',
    image: '/images/portfolio/wordpress/solarSwitch.webp'
  },
  {
    order: 12,
    title: 'HnF Holidays',
    tag: 'Travel',
    description: 'Travel and holiday booking consultancy',
    url: 'https://hnfholidays.com/',
    image: '/images/portfolio/wordpress/HnFConsultancy.webp'
  },
  {
    order: 13,
    title: 'Highlinks International',
    tag: 'Consultancy',
    description: 'Global education and immigration consultancy',
    url: 'https://highlinksinternational.com/',
    image: '/images/portfolio/wordpress/HighlinksinternationalConsultancy.webp'
  },
  {
    order: 14,
    title: 'KNZ Homes',
    tag: 'Home Builders',
    description: 'New construction and renovation specialists',
    url: 'https://knzhomes.com/',
    image: '/images/portfolio/wordpress/knzhomesUKhomebuilders.webp'
  },
];

export default function Wordpress() {
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
        title="Wordpress Development Portfolio | Muneeb Ur Rehman"
        description="Wordpress portfolio by Muneeb Ur Rehman: responsive websites, WooCommerce stores and plugin integration for logistics, ecommerce, solar and consultancy clients."
        path="/portfolio/wordpress"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Wordpress Portfolio', path: '/portfolio/wordpress' },
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
            title="Wordpress Development"
            subtitle="Portfolio"
            intro="Modern, responsive Wordpress websites built for businesses that need a site they can manage themselves. From logistics and solar to ecommerce and home building, these are live client projects spanning custom designs, clean plugin integration and pages optimized for speed and search visibility. Click any project to visit the live site."
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
