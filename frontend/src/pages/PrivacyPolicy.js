import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LegalPages.css';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <div className="legal-container">
        <button className="btn-back-home" onClick={() => navigate('/')}>
          ← Back to Home
        </button>

        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: October 6, 2025</p>

        <div className="legal-content">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to Baseball Card Creator ("we," "our," or "us"). We operate the websites
              ballcard.me and baseballcard.me (collectively, the "Service"). This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you
              visit our Service.
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of
              this privacy policy, please do not access the Service.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>

            <h3>Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you
              register on the Service, including:
            </p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Google account information (when using Google Sign-In)</li>
              <li>Profile picture</li>
            </ul>

            <h3>Card Data</h3>
            <p>
              When you create baseball cards using our Service, we collect and store:
            </p>
            <ul>
              <li>Player names, team names, and statistics you input</li>
              <li>Images you upload</li>
              <li>Card templates and designs you create</li>
              <li>Created card images (front and back)</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>
              When you access the Service, we may automatically collect certain information, including:
            </p>
            <ul>
              <li>Log data (IP address, browser type, pages visited)</li>
              <li>Device information</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, operate, and maintain our Service</li>
              <li>Authenticate users and manage user accounts</li>
              <li>Store and manage your created baseball cards</li>
              <li>Improve and personalize your experience</li>
              <li>Communicate with you about the Service</li>
              <li>Monitor and analyze usage and trends</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Storage and Security</h2>
            <p>
              We use MongoDB to store your data, including user profiles and created baseball cards.
              We implement appropriate technical and organizational security measures to protect your
              personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p>
              However, please be aware that no method of transmission over the Internet or method of
              electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>5. Third-Party Services</h2>
            <p>
              We use Google OAuth for authentication. When you sign in with Google, you are agreeing
              to Google's Privacy Policy and Terms of Service. We only receive the information you
              authorize Google to share with us (name, email, and profile picture).
            </p>
          </section>

          <section>
            <h2>6. Your Data Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Download your created baseball cards</li>
              <li>Delete your created baseball cards</li>
              <li>Object to our processing of your personal information</li>
            </ul>
            <p>
              To exercise these rights, please contact us at joeleboube@gmail.com
            </p>
          </section>

          <section>
            <h2>7. Children's Privacy</h2>
            <p>
              Our Service is not intended for children under the age of 13. We do not knowingly
              collect personal information from children under 13. If you are a parent or guardian
              and believe your child has provided us with personal information, please contact us
              at joeleboube@gmail.com
            </p>
          </section>

          <section>
            <h2>8. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our Service and
              store certain information. You can instruct your browser to refuse all cookies or to
              indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2>9. Data Retention</h2>
            <p>
              We retain your personal information and created cards for as long as your account is
              active or as needed to provide you with our Service. You may delete your cards at any
              time through the dashboard. If you wish to delete your account entirely, please contact
              us at joeleboube@gmail.com
            </p>
          </section>

          <section>
            <h2>10. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to
              this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          <section>
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li>By email: joeleboube@gmail.com</li>
              <li>By visiting our website: ballcard.me or baseballcard.me</li>
            </ul>
          </section>
        </div>

        <button className="btn-back-home bottom" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
