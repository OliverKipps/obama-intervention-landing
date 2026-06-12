import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ObamaLog.css';

const entries = [
  {
    status: 'green',
    user: 'User @bootstrap_bobby',
    text: 'Resisted at 8/10 Shorts. Said "I should probably go for a walk instead." Obama is genuinely proud. "This is the change I believed in."',
    time: '2 hours ago · Washington, D.C.',
  },
  {
    status: 'red',
    user: 'Anonymous',
    text: 'Hit 10/10 at 1:47 AM. 4th time this week. Obama says: "We need to have a serious conversation. The definition of insanity is watching the same Shorts over and over."',
    time: '5 hours ago · The Oval Office',
  },
  {
    status: 'green',
    user: 'User @bookworm_grad',
    text: 'Reached 30 days without a single relapse. Obama says: "This is what hope looks like. You earned this. A more perfect intervention."',
    time: '1 day ago · The White House',
  },
  {
    status: 'yellow',
    user: 'Anonymous',
    text: 'Slipped after 6-day streak. Came back same day. Obama says: "Falling is human. Staying down is a choice. You chose to get up. That takes strength. Real strength."',
    time: '3 days ago · Camp David',
  },
];

function Avatar({ status }) {
  const colors = {
    green: 'var(--blue)',
    red: 'var(--red)',
    yellow: 'var(--gold)',
  };
  const starColors = {
    green: '#FFFFFF',
    red: '#FFFFFF',
    yellow: '#1A1A1A',
  };
  return (
    <div className="log-avatar" style={{ backgroundColor: colors[status] }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="7,1 8.5,5 13,5 9.5,8 11,13 7,10 3,13 4.5,8 1,5 5.5,5" fill={starColors[status]} />
      </svg>
    </div>
  );
}

export default function ObamaLog() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const feedRef = useRef(null);
  const entryRefs = useRef([]);
  const bannerRef = useRef(null);
  const viewAllRef = useRef(null);

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

      // Log entries stagger in
      gsap.from(entryRefs.current, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: feedRef.current,
          start: 'top 75%',
        },
      });

      // Presidential SVG banner fades in with subtle scale
      gsap.from(bannerRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.97,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 85%',
        },
      });

      // View full button fades in
      gsap.from(viewAllRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: viewAllRef.current,
          start: 'top 90%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="obama-log" className="obama-log" ref={sectionRef}>
      {/* Top accent bars */}
      <div className="log-accent red" />
      <div className="log-accent blue" />

      <div className="log-header" ref={headerRef}>
        <span className="log-eyebrow">Press Briefing</span>
        <h2 className="log-title">The Obama Log</h2>
        <p className="log-subtitle">
          Official statements from the Oval Office. Some make Obama proud. Others... not so much.
        </p>
      </div>

      <div className="log-feed" ref={feedRef}>
        {entries.map((entry, i) => (
          <div
            key={i}
            className={`log-entry ${i < entries.length - 1 ? 'log-entry-bordered' : ''}`}
            ref={(el) => (entryRefs.current[i] = el)}
          >
            <Avatar status={entry.status} />
            <div className="log-entry-body">
              <div className="log-entry-user">{entry.user}</div>
              <p className="log-entry-text">{entry.text}</p>
              <span className="log-entry-time">{entry.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Presidential portraits SVG */}
      <img
        ref={bannerRef}
        className="log-banner"
        src="/obama-lincoln-trump-biden.svg"
        alt="Presidential portraits: Obama, Lincoln, Trump, Biden"
      />

      <a ref={viewAllRef} href="#full-log" className="log-view-all">View full Obama Log →</a>
    </section>
  );
}
