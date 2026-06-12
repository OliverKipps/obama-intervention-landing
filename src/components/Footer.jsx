import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

export default function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="14,2 17,10 26,10 19,15 21,24 14,19 7,24 9,15 2,10 11,10" fill="#B22234" />
            </svg>
            <span className="footer-title">The Obama Intervention</span>
          </div>
          <p className="footer-disclaimer">
            This is a parody. Not affiliated with Barack Obama, the Obama Foundation, or any government entity. All portrayals are satirical and protected under First Amendment parody/satire law. No bald eagles were harmed in the making of this extension.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <span className="footer-col-title">Product</span>
            <a href="#how-it-works">How it works</a>
            <a href="#obama-log">The Obama Log</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="footer-col">
            <span className="footer-col-title">Legal</span>
            <a href="#disclaimer">Parody disclaimer</a>
            <a href="#privacy">Privacy</a>
            <a href="#github">GitHub</a>
          </div>
        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <span className="footer-copy">
          &copy; 2026 The Obama Intervention. Parody. All rights to Obama&apos;s likeness belong to him.
        </span>
        <div className="footer-stars">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="5,0 6.3,3.5 10,3.5 7,5.8 8,10 5,7.5 2,10 3,5.8 0,3.5 3.7,3.5" fill="#B22234" />
          </svg>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="5,0 6.3,3.5 10,3.5 7,5.8 8,10 5,7.5 2,10 3,5.8 0,3.5 3.7,3.5" fill="#FFFFFF" />
          </svg>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="5,0 6.3,3.5 10,3.5 7,5.8 8,10 5,7.5 2,10 3,5.8 0,3.5 3.7,3.5" fill="#3C3B6E" />
          </svg>
          <span className="footer-made-with">Made with shame</span>
        </div>
      </div>
    </footer>
  );
}
