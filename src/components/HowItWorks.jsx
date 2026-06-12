import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HowItWorks.css';

function StarIcon({ size = 16, color = '#3C3B6E' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="8,1 9.8,5.5 15,5.5 11,8.5 12.5,14 8,11 3.5,14 5,8.5 1,5.5 6.2,5.5" fill={color} />
    </svg>
  );
}

const steps = [
  {
    number: 'Step I',
    title: 'The Executive Order',
    description: 'You issue an order: no more than 10 Shorts per day. This is now law. Obama is the enforcement.',
    color: 'var(--red)',
    borderColor: '#B22234',
  },
  {
    number: 'Step II',
    title: 'The Intervention',
    description: 'Break the law and the President himself appears. He roasts you. You take an ethics quiz. You face Block X.',
    color: 'var(--blue)',
    borderColor: '#3C3B6E',
  },
  {
    number: 'Step III',
    title: 'The Accountability',
    description: 'Your progress is recorded. The public record never forgets. But it does forgive... eventually.',
    color: 'var(--red)',
    borderColor: '#B22234',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const cardsRef = useRef([]);
  const leftEagleRef = useRef(null);
  const rightEagleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Section header slides up
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // Three cards stagger in
      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsWrapperRef.current,
          start: 'top 75%',
        },
      });

      // Eagles fade in from sides
      gsap.from(leftEagleRef.current, {
        x: -40,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsWrapperRef.current,
          start: 'top 75%',
        },
      });

      gsap.from(rightEagleRef.current, {
        x: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsWrapperRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" className="how-it-works" ref={sectionRef}>
      {/* Top accent line */}
      <div className="how-accent-top" />

      <div className="how-header" ref={headerRef}>
        <span className="how-eyebrow">How it works</span>
        <h2 className="how-title">Three Branches of Intervention</h2>
        <p className="how-subtitle">Checks and balances for your screen time.</p>
      </div>

      <div className="how-cards-row">
        {/* Left eagle */}
        <div className="how-eagle" ref={leftEagleRef}>
          <img src="/eagle-pixel-art.svg" alt="Pixel art bald eagle" className="how-eagle-img" />
        </div>

        <div className="how-cards" ref={cardsWrapperRef}>
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="how-card"
              style={{ borderTopColor: step.borderColor }}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <StarIcon size={16} color="#3C3B6E" style={{ position: 'absolute', top: 16, right: 16 }} />
              <span className="how-card-step" style={{ color: step.color }}>
                {step.number}
              </span>
              <h3 className="how-card-title">{step.title}</h3>
              <p className="how-card-desc">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Right eagle (mirrored) */}
        <div className="how-eagle how-eagle-right" ref={rightEagleRef}>
          <img src="/eagle-pixel-art.svg" alt="Pixel art bald eagle" className="how-eagle-img how-eagle-img-mirror" />
        </div>
      </div>
    </section>
  );
}
