import './NavBar.css';

function StarIcon({ size = 10, color = '#3C3B6E' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="5,0 6.3,3.5 10,3.5 7,5.8 8,10 5,7.5 2,10 3,5.8 0,3.5 3.7,3.5" fill={color} />
    </svg>
  );
}

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="16,2 19.5,12 30,12 21.5,18.5 24.5,29 16,22 7.5,29 10.5,18.5 2,12 12.5,12" fill="#FFFFFF" />
        </svg>
        <span className="navbar-title">The Obama Intervention</span>
      </div>

      <div className="navbar-links">
        <a href="#how-it-works" className="navbar-link">How it works</a>
        <a href="#obama-log" className="navbar-link">The Log</a>
        <a href="#about" className="navbar-link">About</a>
        <a href="#install" className="navbar-cta">Install Free</a>
      </div>
    </nav>
  );
}

export { StarIcon };
