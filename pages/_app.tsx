import '../styles/icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.scss';
/*
  owl.carousel, animated.css and aos.css are no longer imported: the
  carousel component that used owl.carousel was removed with the dead
  template routes, and GSAP + ScrollTrigger fully replaced AOS/animate.css
  for scroll animations elsewhere in the site. Dropping them removes CSS
  that shipped to every visitor but was never applied to anything.

  et-line went the same way: not one `.icon-*` class from it appears in any
  component, so its stylesheet (and the font file it points at) was pure
  weight on every page.

  font-awesome and elegant-icons are no longer imported in full either.
  styles/icons.css declares the same two font families from subset copies
  containing only the ~20 glyphs this site draws: identical on screen, but
  ~3KB of font instead of ~138KB, and 20 rules instead of ~1,275.
*/
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
