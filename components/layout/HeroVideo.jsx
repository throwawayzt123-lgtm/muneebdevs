import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import posterImg from '../../public/img/background/1.jpg';

/*
  Hero background.

  The video file is ~1.8MB — on its own that was about 80% of the homepage's
  total transfer weight, and it was being fetched eagerly (preload="auto")
  while the browser was still trying to paint text, CSS and the first images.

  Instead: the poster frame paints immediately through next/image (AVIF, a
  fraction of the raw JPEG, and marked priority since it is the hero's LCP
  element), and the video is only attached after the page has finished
  loading and gone idle. Visitors who asked for reduced data or reduced
  motion, or who are on a slow connection, simply keep the still frame and
  never pay for the download at all.
*/
function HeroVideo() {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
    if (conn.saveData) return;
    /* effectiveType is only present where supported; when it is, anything
       below 4g keeps the poster rather than spending the visitor's data */
    if (conn.effectiveType && !/4g/i.test(conn.effectiveType)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    /* Phones keep the still frame. The file is ~1.4MB and on a handset it
       sits mostly behind the headline anyway, so it is a poor trade against
       a mobile data plan and mobile-first ranking. Raise or delete this
       check to bring the video back on phones. */
    if (window.matchMedia('(max-width: 767px)').matches) return;

    let cancelled = false;
    let idleId = null;
    let timerId = null;

    const attach = () => {
      const v = videoRef.current;
      if (cancelled || !v) return;
      v.addEventListener('canplay', () => {
        if (cancelled) return;
        setReady(true);
        const p = v.play();
        if (p && p.catch) p.catch(() => {});
      }, { once: true });
      v.src = '/bgvideo.mp4';
      v.load();
    };

    const schedule = () => {
      if (cancelled) return;
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(attach, { timeout: 2500 });
      } else {
        timerId = setTimeout(attach, 1200);
      }
    };

    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', schedule);
      if (idleId && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId);
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  return (
    <div className="hero-video-wrap" aria-hidden="true">
      <Image
        src={posterImg}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-bg-poster"
      />
      {/* deliberately no poster attribute: the optimized <Image> above is
          already painting that exact frame, and a poster here would make the
          browser fetch the raw JPEG a second time */}
      <video
        ref={videoRef}
        className={ready ? 'hero-bg-video is-ready' : 'hero-bg-video'}
        muted
        loop
        playsInline
        preload="none"
      />
    </div>
  );
}

export default HeroVideo;
