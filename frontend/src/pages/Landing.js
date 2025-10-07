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

    // Animate baseball emoji with rotation
    anime({
      targets: '.baseball-icon',
      opacity: [0, 1],
      rotate: [0, 360],
      scale: [0, 1],
      duration: 1000,
      easing: 'easeOutElastic(1, .6)',
      delay: 200
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

    // Floating animation for baseball icon
    anime({
      targets: '.baseball-icon',
      translateY: [-10, 10],
      duration: 2000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      delay: 1200
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
    <div className="landing">
      <section className="hero">
        <div className="hero-content">
          <div className="baseball-icon">⚾</div>
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
            <div className="feature-icon">🎨</div>
            <h3>12 Unique Templates</h3>
            <p>Choose from Classic, Modern, Vintage, Neon, Holographic, Galaxy, Rainbow, and more!</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📸</div>
            <h3>Custom Photos</h3>
            <p>Upload your own player photos and drag to position perfectly on any template</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Player Stats</h3>
            <p>Add detailed statistics to make your cards authentic</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
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
          <p>&copy; 2025 Baseball Card Creator. All rights reserved.</p>
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
