import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EmailForm from './EmailForm';
import './FinalCTA.css';

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const silhouetteRef = useRef(null);
  const textRefs = useRef([]);
  const actionsRef = useRef(null);
  const quoteRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Obama silhouette fades in with a slight float
      gsap.from(silhouetteRef.current, {
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // Eyebrow, heading, description stagger up
      gsap.from(textRefs.current, {
        y: 25,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      // Buttons fade up
      gsap.from(actionsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      // Lincoln quote slides in from left
      gsap.from(quoteRef.current, {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="install" className="final-cta" ref={sectionRef}>
      {/* Top stripes */}
      <div className="cta-stripes">
        <div className="stripe red" />
        <div className="stripe white" />
        <div className="stripe red" />
      </div>

      {/* Stars overlay */}
      <div className="cta-stars-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="cta-stars-pattern">
          <defs>
            <pattern id="stars-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <polygon points="30,5 33,15 43,15 35,21 38,31 30,25 22,31 25,21 17,15 27,15" fill="#FFFFFF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stars-pattern)" />
        </svg>
      </div>

      <div className="cta-content">
        {/* Obama silhouette */}
        <svg ref={silhouetteRef} width="48" height="36" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="cta-obama-silhouette">
          <path d="M6 18 C6 18 12 6 24 9 C36 6 42 18 42 18" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
          <circle cx="24" cy="13" r="6" fill="#FFFFFF" />
          <circle cx="22.5" cy="11.5" r="1.5" fill="#3C3B6E" />
          <path d="M24 15 L27 16.5 L24 15.8 Z" fill="#FFC107" />
          <path d="M3 21 L9 16.5 L15 21 L9 18 Z" fill="#FFFFFF" />
          <path d="M33 21 L39 16.5 L45 21 L39 18 Z" fill="#FFFFFF" />
          <path d="M18 21 L24 27 L30 21 L24 24 Z" fill="#FFFFFF" />
          <line x1="21" y1="19.5" x2="21" y2="22.5" stroke="#3C3B6E" />
          <line x1="27" y1="19.5" x2="27" y2="22.5" stroke="#3C3B6E" />
        </svg>

        <span className="cta-eyebrow" ref={(el) => (textRefs.current[0] = el)}>State of the Union</span>
        <h2 className="cta-heading" ref={(el) => (textRefs.current[1] = el)}>Obama is watching.</h2>
        <p className="cta-description" ref={(el) => (textRefs.current[2] = el)}>
          Not because he has to. Because he believes you can do better. Don't prove him wrong.
        </p>

        <EmailForm />

        <div ref={actionsRef} className="cta-actions">
          <a href="#install" className="btn-primary btn-primary-white">Install Free →</a>
          <a href="#obama-log" className="btn-outline">See the Log</a>
        </div>

        <p className="cta-meta" ref={(el) => (textRefs.current[3] = el)}>Free forever · No account required · Open source</p>
      </div>

      {/* Lincoln quote */}
      <div ref={quoteRef} className="cta-quote">
        <blockquote>
          "Four score and seven Shorts ago, our fathers brought forth on this continent a new nation, dedicated to the proposition that all people are created equal — and should probably close that tab."
        </blockquote>
      </div>

      <p className="cta-attribution">— Abraham Lincoln, 1842</p>
    </section>
  );
}
