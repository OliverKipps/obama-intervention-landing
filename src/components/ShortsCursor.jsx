import { useState, useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import './ShortsCursor.css';

const THROTTLE_MS = 280;
const MIN_DISTANCE = 35;
const COOLDOWN_MS = 2000;
const THUMB_W = 80;
const THUMB_H = 140;
const PARTICLE_COLORS = ['#B22234', '#FFFFFF', '#3C3B6E', '#FFC107'];

let pidCounter = 0;
let fpCounter = 0;

function rand(min, max) { return Math.random() * (max - min) + min; }
function randInt(min, max) { return Math.floor(rand(min, max + 1)); }

/* ---------- Generate falling pixels from a thumbnail position ---------- */
function burstPixelsAt(posX, posY, heroHeight) {
  const count = randInt(18, 32);
  const batch = [];
  for (let i = 0; i < count; i++) {
    fpCounter++;
    batch.push({
      id: `fp-${fpCounter}`,
      x: posX + rand(-30, 30),
      y: posY + rand(-60, 60),
      size: rand(4, 12),
      color: PARTICLE_COLORS[randInt(0, 3)],
      drift: rand(-80, 80),
      fallDistance: heroHeight - posY + rand(40, 120),
      rotation: rand(-360, 360),
    });
  }
  return batch;
}

export default function ShortsCursor({ containerRef, obamaRef }) {
  const [thumbnails, setThumbnails] = useState([]);
  const [phase, setPhase] = useState('tracking');
  const [flash, setFlash] = useState(false);
  const [lasers, setLasers] = useState([]);
  const [fallingPixels, setFallingPixels] = useState([]);

  const thumbDataRef = useRef([]);
  const phaseRef = useRef('tracking');
  const lastSpawnRef = useRef({ x: 0, y: 0, time: 0 });
  const countRef = useRef(0);
  const thresholdRef = useRef(randInt(5, 10));
  const thumbElRefs = useRef({});
  const timersRef = useRef([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => { phaseRef.current = phase; }, [phase]);

  /* ---------- Zap sequence ---------- */
  const doZap = useCallback(() => {
    const positions = thumbDataRef.current.map((t) => ({ x: t.x, y: t.y }));
    if (positions.length === 0) return;

    const thumbnailEls = Object.values(thumbElRefs.current).filter(Boolean);
    const containerRect = containerRef.current.getBoundingClientRect();
    const heroHeight = containerRect.height;

    // Calculate Obama eye origin
    let originX = containerRect.width * 0.78;
    let originY = containerRect.height * 0.28;
    if (obamaRef.current) {
      const obamaRect = obamaRef.current.getBoundingClientRect();
      originX = obamaRect.left + obamaRect.width * 0.48 - containerRect.left;
      originY = obamaRect.top + obamaRect.height * 0.32 - containerRect.top;
    }

    // Build laser beams from Obama's eyes to each thumbnail
    const laserBeams = positions.map((pos, i) => {
      const eyeOffset = i % 2 === 0 ? -10 : 10;
      return {
        id: `laser-${Date.now()}-${i}`,
        x1: originX + eyeOffset,
        y1: originY + (i % 3 === 0 ? 6 : -4),
        x2: pos.x,
        y2: pos.y,
      };
    });

    // ---- t=0ms: zap initiates ----
    setPhase('zapping');
    setFlash(true);
    setLasers(laserBeams);
    countRef.current = 0;

    // Obama eye glow red
    if (obamaRef.current) {
      gsap.to(obamaRef.current, {
        filter: 'brightness(1.4) drop-shadow(0 0 14px #FF1744)',
        duration: 0.15,
        ease: 'power2.out',
        onComplete() {
          gsap.to(obamaRef.current, {
            filter: 'brightness(1) drop-shadow(0 0 0px transparent)',
            duration: 0.5,
            delay: 0.6,
            ease: 'power2.in',
          });
        },
      });
    }

    // ---- t=200ms: flash fades ----
    timersRef.current.push(setTimeout(() => { setFlash(false); }, 200));

    // ---- t=800ms: lasers hit targets → thumbnails burst into falling pixels ----
    timersRef.current.push(setTimeout(() => {
      // Shrink thumbnail DOM elements
      if (thumbnailEls.length > 0) {
        gsap.to(thumbnailEls, {
          scale: 0,
          opacity: 0,
          duration: 0.12,
          ease: 'power2.in',
          onComplete: () => {
            setThumbnails([]);
            thumbDataRef.current = [];
            thumbElRefs.current = {};
          },
        });
      } else {
        setThumbnails([]);
        thumbDataRef.current = [];
      }

      // Generate falling pixels at each thumbnail position
      let allPixels = [];
      positions.forEach((pos) => {
        allPixels = allPixels.concat(burstPixelsAt(pos.x, pos.y, heroHeight));
      });
      setFallingPixels(allPixels);

      // Remove lasers
      setLasers([]);
    }, 800));

    // ---- t=2800ms: falling pixels done → cooldown ----
    timersRef.current.push(setTimeout(() => {
      setFallingPixels([]);
      setPhase('cooldown');
      timersRef.current.push(setTimeout(() => {
        thresholdRef.current = randInt(5, 10);
        setPhase('tracking');
      }, COOLDOWN_MS));
    }, 2800));
  }, [containerRef, obamaRef, clearTimers]);

  /* ---------- Spawn thumbnail ---------- */
  const spawnThumbnail = useCallback(
    (clientX, clientY) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const thumb = {
        id, x, y,
        rotation: rand(-8, 8),
        scale: rand(0.7, 1.0),
      };

      thumbDataRef.current = [...thumbDataRef.current, thumb];
      setThumbnails(thumbDataRef.current);
      lastSpawnRef.current = { x: clientX, y: clientY, time: Date.now() };
      countRef.current += 1;

      if (countRef.current >= thresholdRef.current) {
        doZap();
      }
    },
    [containerRef, doZap],
  );

  /* ---------- Mouse events ---------- */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e) => {
      if (phaseRef.current !== 'tracking') return;
      const now = Date.now();
      if (now - lastSpawnRef.current.time < THROTTLE_MS) return;
      const dx = e.clientX - lastSpawnRef.current.x;
      const dy = e.clientY - lastSpawnRef.current.y;
      if (Math.hypot(dx, dy) < MIN_DISTANCE) return;
      spawnThumbnail(e.clientX, e.clientY);
    };

    const onLeave = () => {
      if (thumbDataRef.current.length > 0 && phaseRef.current === 'tracking') {
        doZap();
      }
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      clearTimers();
    };
  }, [containerRef, spawnThumbnail, doZap, clearTimers]);

  /* ---------- Animate laser beams (stroke-dashoffset) ---------- */
  useEffect(() => {
    if (lasers.length === 0) return;
    requestAnimationFrame(() => {
      const lines = document.querySelectorAll('.shorts-laser-line');
      lines.forEach((line) => {
        const length = line.getTotalLength();
        gsap.fromTo(
          line,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out' },
        );
      });
    });
  }, [lasers]);

  /* ---------- Animate falling pixels with gravity ---------- */
  useEffect(() => {
    if (fallingPixels.length === 0) return;
    fallingPixels.forEach((fp) => {
      const el = document.getElementById(fp.id);
      if (!el) return;
      gsap.fromTo(
        el,
        { x: 0, y: 0, opacity: 1, rotation: 0, scale: 1 },
        {
          x: fp.drift,
          y: fp.fallDistance,
          opacity: 0,
          rotation: fp.rotation,
          scale: 0.3,
          duration: 2.0 + rand(0, 0.6),
          ease: 'power2.in',
        },
      );
    });
  }, [fallingPixels]);

  return (
    <div className="shorts-cursor-overlay">
      {flash && <div className="shorts-flash" />}

      {/* Red eye lasers — drawn from Obama's eyes to thumbnails */}
      {lasers.length > 0 && (
        <svg className="shorts-lasers-svg">
          {lasers.map((b) => (
            <line
              key={`${b.id}-glow`}
              className="shorts-laser-line shorts-laser-glow"
              x1={b.x1} y1={b.y1}
              x2={b.x2} y2={b.y2}
            />
          ))}
          {lasers.map((b) => (
            <line
              key={b.id}
              className="shorts-laser-line"
              x1={b.x1} y1={b.y1}
              x2={b.x2} y2={b.y2}
            />
          ))}
        </svg>
      )}

      {/* Thumbnails */}
      {thumbnails.map((t) => (
        <div
          key={t.id}
          ref={(el) => { if (el) thumbElRefs.current[t.id] = el; }}
          className="shorts-thumb"
          style={{
            left: t.x - THUMB_W / 2,
            top: t.y - THUMB_H / 2,
            transform: `rotate(${t.rotation}deg) scale(${t.scale})`,
          }}
        >
          <div className="shorts-thumb-inner">
            <div className="shorts-thumb-placeholder" />
            <span className="shorts-label">♯shorts</span>
          </div>
        </div>
      ))}

      {/* Falling pixels */}
      {fallingPixels.map((fp) => (
        <div
          key={fp.id}
          id={fp.id}
          className="shorts-falling-pixel"
          style={{
            left: fp.x - fp.size / 2,
            top: fp.y - fp.size / 2,
            width: fp.size,
            height: fp.size,
            backgroundColor: fp.color,
          }}
        />
      ))}
    </div>
  );
}
