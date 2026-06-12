import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ShortsCursor from './ShortsCursor';
import './Hero.css';

export default function Hero() {
  const sectionRef = useRef(null);
  const eagleRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const ruleRef = useRef(null);
  const taglineRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionsRef = useRef(null);
  const metaRef = useRef(null);
  const obamaRef = useRef(null);
  const starsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // 1. Eagle drops in
      tl.from(eagleRef.current, { y: -20, opacity: 0, duration: 0.6 });

      // 2. Badge slides from left
      tl.from(badgeRef.current, { x: -30, opacity: 0, duration: 0.5 }, '-=0.3');

      // 3. Title slides up
      tl.from(titleRef.current, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2');

      // 4. Red rule scales in from left
      tl.from(ruleRef.current, { scaleX: 0, transformOrigin: 'left center', duration: 0.6 }, '-=0.4');

      // 5. Tagline + description stagger up
      tl.from([taglineRef.current, descriptionRef.current], { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.3');

      // 6. Buttons + meta
      tl.from(actionsRef.current, { y: 20, opacity: 0, duration: 0.5 }, '-=0.1');
      tl.from(metaRef.current, { y: 15, opacity: 0, duration: 0.4 }, '-=0.2');

      // 7. Pixel-art Obama fade in from right
      tl.from(obamaRef.current, { x: 50, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');

      // 8. Stars box slides from top-right corner
      tl.from(starsRef.current, { x: 40, y: -40, opacity: 0, duration: 0.7 }, '-=0.5');

      // 9. Continuous gentle float on Obama
      gsap.to(obamaRef.current, {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-content">
        {/* Eagle SVG */}
        <svg ref={eagleRef} width="64" height="48" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-eagle">
          <path d="M8 24 C8 24 16 8 32 12 C48 8 56 24 56 24" stroke="#1A1A1A" strokeWidth="2" fill="none" />
          <circle cx="32" cy="18" r="8" fill="#1A1A1A" />
          <circle cx="30" cy="16" r="2" fill="#FFFFFF" />
          <path d="M32 20 L36 22 L32 21 Z" fill="#FFC107" />
          <path d="M4 28 L12 22 L20 28 L12 24 Z" fill="#1A1A1A" />
          <path d="M44 28 L52 22 L60 28 L52 24 Z" fill="#1A1A1A" />
          <path d="M24 28 L32 36 L40 28 L32 32 Z" fill="#1A1A1A" />
          <line x1="28" y1="26" x2="28" y2="30" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="36" y1="26" x2="36" y2="30" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>

        {/* Executive Order #1 badge */}
        <div ref={badgeRef} className="hero-badge">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="5,0 6.3,3.5 10,3.5 7,5.8 8,10 5,7.5 2,10 3,5.8 0,3.5 3.7,3.5" fill="#FFFFFF" />
          </svg>
          <span>Executive Order #1</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="5,0 6.3,3.5 10,3.5 7,5.8 8,10 5,7.5 2,10 3,5.8 0,3.5 3.7,3.5" fill="#FFFFFF" />
          </svg>
        </div>

        <h1 ref={titleRef} className="hero-title">
          The Obama<br />Intervention
        </h1>

        <div ref={ruleRef} className="hero-rule" />

        <p ref={taglineRef} className="hero-tagline">Yes We Can... Close That Tab.</p>

        <p ref={descriptionRef} className="hero-description">
          Your president held you accountable. Now hold yourself. A satirical browser extension where a cartoon Obama roasts you for scrolling too much.
        </p>

        <div ref={actionsRef} className="hero-actions">
          <a href="#install" className="btn-primary">Install Free →</a>
          <a href="#obama-log" className="btn-secondary">See the Obama Log</a>
        </div>

        <p ref={metaRef} className="hero-meta">Free forever · Chrome & Firefox · 2 min install</p>
      </div>

      <div className="hero-visual">
        <img
          ref={obamaRef}
          src="/pixel-art-obama.svg"
          alt="Pixel art Barack Obama with American flag background"
          className="hero-obama"
        />
      </div>

      {/* Left accent bar */}
      <div className="hero-accent" />

      {/* Stars decoration */}
      <div ref={starsRef} className="hero-stars">
        {Array.from({ length: 12 }, (_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="7,1 8.5,5 13,5 9.5,8 11,13 7,10 3,13 4.5,8 1,5 5.5,5" fill="#FFFFFF" />
          </svg>
        ))}
      </div>

      {/* Interactive shorts cursor effect */}
      <ShortsCursor containerRef={sectionRef} obamaRef={obamaRef} />
    </section>
  );
}
