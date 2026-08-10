import 'font-awesome/css/font-awesome.min.css';
import 'elegant-icons/style.css';
import 'et-line/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.scss';
/*
  owl.carousel, animated.css and aos.css are no longer imported: the
  carousel component that used owl.carousel was removed with the dead
  template routes, and GSAP + ScrollTrigger fully replaced AOS/animate.css
  for scroll animations elsewhere in the site. Dropping them removes CSS
  that shipped to every visitor but was never applied to anything.
*/
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
