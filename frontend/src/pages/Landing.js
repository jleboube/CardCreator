import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';
import anime from 'animejs';
import '../styles/Landing.css';

const Landing = () => {
  const { handleGoogleLogin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/creator');
    }

    // Animate hero title with bounce
    anime({
      targets: '.hero-title',
      opacity: [0, 1],
      translateY: [-80, 0],
      scale: [0.8, 1],
      duration: 1200,
      easing: 'spring(1, 80, 10, 0)'
    });

    // Animate subtitle
    anime({
      targets: '.hero-subtitle',
      opacity: [0, 1],
      translateY: [-30, 0],
      duration: 1000,
      delay: 400,
      easing: 'easeOutExpo'
    });

    // Animate login container
    anime({
      targets: '.login-container',
      opacity: [0, 1],
      scale: [0.9, 1],
      translateY: [40, 0],
      duration: 1000,
      delay: 600,
      easing: 'easeOutExpo'
    });

    // Stagger feature cards with slide and fade
    anime({
      targets: '.feature-card',
      opacity: [0, 1],
      translateY: [60, 0],
      scale: [0.9, 1],
      duration: 800,
      delay: anime.stagger(120, { start: 800 }),
      easing: 'easeOutQuad'
    });

    // Continuous subtle animation for CTA section
    anime({
      targets: '.cta',
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 1000,
      delay: 1200,
      easing: 'easeOutQuad'
    });
  }, [isAuthenticated, navigate]);

  const onSuccess = async (credentialResponse) => {
    const success = await handleGoogleLogin(credentialResponse);
    if (success) {
      navigate('/creator');
    }
  };

  const onError = () => {
    console.error('Login Failed');
  };

  return (
    <div
      className="landing"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/baseball-diamond_bg.svg)`
      }}
    >
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Baseball Card Creator</h1>
          <p className="hero-subtitle">
            Create stunning, professional baseball cards with your photos
          </p>

          <div className="login-container">
            <h2>Sign in to get started</h2>
            <GoogleLogin
              onSuccess={onSuccess}
              onError={onError}
              theme="filled_blue"
              size="large"
              text="signin_with"
              shape="rectangular"
            />
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18M9 21V9"/>
              </svg>
            </div>
            <h3>Unique Templates</h3>
            <p>Choose from Classic, Modern, Vintage, Textured, and authentic UNC Style templates!</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
            </div>
            <h3>Custom Photos</h3>
            <p>Upload your own player photos and drag to position perfectly on any template</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="20" x2="12" y2="10"/>
                <line x1="18" y1="20" x2="18" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="16"/>
              </svg>
            </div>
            <h3>Player Stats</h3>
            <p>Add detailed statistics to make your cards authentic</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                <path d="M17 21v-8H7v8M7 3v5h8"/>
              </svg>
            </div>
            <h3>Save & Download</h3>
            <p>Save your creations and download high-quality images</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to create amazing baseball cards?</h2>
        <p>Sign in with Google to get started</p>
      </section>

      <footer className="landing-footer">
        <div className="footer-content">
          <p>&copy; 2025 Baseball Card Creator - By Joe LeBoube. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <span className="footer-divider">|</span>
            <Link to="/terms" className="footer-link">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
