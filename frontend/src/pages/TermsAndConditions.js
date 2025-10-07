import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LegalPages.css';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <div className="legal-container">
        <button className="btn-back-home" onClick={() => navigate('/')}>
          ← Back to Home
        </button>

        <h1>Terms and Conditions</h1>
        <p className="last-updated">Last Updated: October 6, 2025</p>

        <div className="legal-content">
          <section>
            <h2>1. Agreement to Terms</h2>
            <p>
              These Terms and Conditions ("Terms") constitute a legally binding agreement between you
              and Baseball Card Creator ("we," "us," or "our") concerning your access to and use of
              the ballcard.me and baseballcard.me websites (collectively, the "Service").
            </p>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you do not
              agree with these Terms, you may not access or use the Service.
            </p>
          </section>

          <section>
            <h2>2. Account Registration</h2>
            <p>
              To use certain features of the Service, you must register for an account. When you
              register, you agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate and current</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate your account if any information provided
              is inaccurate, false, or incomplete.
            </p>
          </section>

          <section>
            <h2>3. User Content and Ownership</h2>

            <h3>Your Content</h3>
            <p>
              You retain all ownership rights to the baseball cards you create using our Service,
              including the images you upload and the data you input. By using the Service, you grant
              us a limited license to store and display your cards solely for the purpose of providing
              the Service to you.
            </p>

            <h3>Prohibited Content</h3>
            <p>You agree not to create or upload content that:</p>
            <ul>
              <li>Violates any intellectual property rights of third parties</li>
              <li>Contains offensive, defamatory, or obscene material</li>
              <li>Promotes illegal activities or violates any laws</li>
              <li>Infringes on privacy or publicity rights of others</li>
              <li>Contains viruses or malicious code</li>
              <li>Impersonates any person or entity</li>
            </ul>

            <h3>License to Your Content</h3>
            <p>
              By creating and storing baseball cards on our Service, you grant us a non-exclusive,
              worldwide, royalty-free license to use, reproduce, and store your content solely for
              the purpose of operating and providing the Service.
            </p>
          </section>

          <section>
            <h2>4. Intellectual Property Rights</h2>
            <p>
              The Service and its original content, features, and functionality are owned by Baseball
              Card Creator and are protected by international copyright, trademark, patent, trade
              secret, and other intellectual property laws.
            </p>
            <p>
              You may not copy, modify, distribute, sell, or lease any part of our Service without
              our express written permission.
            </p>
          </section>

          <section>
            <h2>5. Acceptable Use</h2>
            <p>You agree to use the Service only for lawful purposes. You agree not to:</p>
            <ul>
              <li>Use the Service in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to the Service or its systems</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use automated systems to access the Service without permission</li>
              <li>Engage in any activity that could harm or overload our infrastructure</li>
              <li>Collect user information without consent</li>
              <li>Create fake accounts or impersonate others</li>
            </ul>
          </section>

          <section>
            <h2>6. Service Availability</h2>
            <p>
              We strive to provide uninterrupted access to our Service, but we do not guarantee that
              the Service will be available at all times. We may suspend or discontinue the Service
              temporarily or permanently without notice for maintenance, updates, or other reasons.
            </p>
            <p>
              We are not liable for any loss or damage arising from the unavailability of the Service.
            </p>
          </section>

          <section>
            <h2>7. Third-Party Services</h2>
            <p>
              Our Service uses Google OAuth for authentication. Your use of Google Sign-In is subject
              to Google's Terms of Service and Privacy Policy. We are not responsible for the practices
              of third-party services.
            </p>
          </section>

          <section>
            <h2>8. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>
              We do not warrant that:
            </p>
            <ul>
              <li>The Service will be uninterrupted, secure, or error-free</li>
              <li>The results obtained from using the Service will be accurate or reliable</li>
              <li>Any errors in the Service will be corrected</li>
              <li>The Service will meet your specific requirements</li>
            </ul>
          </section>

          <section>
            <h2>9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL BASEBALL CARD CREATOR BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
              INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR OTHER INTANGIBLE LOSSES,
              RESULTING FROM:
            </p>
            <ul>
              <li>Your access to or use of (or inability to access or use) the Service</li>
              <li>Any unauthorized access to or use of our servers and/or personal information</li>
              <li>Any interruption or cessation of the Service</li>
              <li>Any bugs, viruses, or other harmful code transmitted through the Service</li>
              <li>Any errors or omissions in content or loss or damage incurred from use of content</li>
            </ul>
          </section>

          <section>
            <h2>10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Baseball Card Creator and its officers,
              directors, employees, and agents from and against any claims, liabilities, damages,
              losses, and expenses arising out of or in any way connected with:
            </p>
            <ul>
              <li>Your access to or use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights, including intellectual property rights</li>
              <li>Any content you upload or create using the Service</li>
            </ul>
          </section>

          <section>
            <h2>11. Data and Privacy</h2>
            <p>
              Your use of the Service is also governed by our Privacy Policy. Please review our
              Privacy Policy to understand how we collect, use, and protect your information.
            </p>
          </section>

          <section>
            <h2>12. Account Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account and access to the Service at
              our sole discretion, without notice, for conduct that we believe:
            </p>
            <ul>
              <li>Violates these Terms or our Privacy Policy</li>
              <li>Is harmful to other users, us, or third parties</li>
              <li>Violates applicable laws or regulations</li>
              <li>Is fraudulent or involves illegal activities</li>
            </ul>
            <p>
              You may delete your account at any time by contacting us at joeleboube@gmail.com
            </p>
          </section>

          <section>
            <h2>13. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of any
              material changes by updating the "Last Updated" date of these Terms. Your continued use
              of the Service after changes constitutes acceptance of the modified Terms.
            </p>
            <p>
              It is your responsibility to review these Terms periodically for updates.
            </p>
          </section>

          <section>
            <h2>14. Governing Law and Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United
              States, without regard to its conflict of law provisions.
            </p>
            <p>
              Any disputes arising from these Terms or your use of the Service shall be resolved in
              the appropriate courts, and you consent to the jurisdiction of such courts.
            </p>
          </section>

          <section>
            <h2>15. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision
              shall be limited or eliminated to the minimum extent necessary so that these Terms shall
              otherwise remain in full force and effect.
            </p>
          </section>

          <section>
            <h2>16. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement between
              you and Baseball Card Creator regarding the use of the Service and supersede any prior
              agreements.
            </p>
          </section>

          <section>
            <h2>17. Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <ul>
              <li>By email: joeleboube@gmail.com</li>
              <li>By visiting our website: ballcard.me or baseballcard.me</li>
            </ul>
          </section>

          <section>
            <h2>18. Acknowledgment</h2>
            <p>
              BY USING THE SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS AND CONDITIONS
              AND AGREE TO BE BOUND BY THEM.
            </p>
          </section>
        </div>

        <button className="btn-back-home bottom" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
