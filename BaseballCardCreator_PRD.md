# Product Requirements Document (PRD)

## 1. Document Information
- **Document Title**: Product Requirements Document for Baseball Card Creator Website
- **Version**: 1.0
- **Date**: October 05, 2025
- **Author**: Grok 4 (AI Assistant)
- **Status**: Draft
- **Purpose**: This document outlines the functional and non-functional requirements for a web application that enables users to create customized baseball card-style images from uploaded photos. It includes user authentication, image processing features, and deployment specifications.

## 2. Product Overview
### 2.1 Description
The Baseball Card Creator is a web-based application that allows users to upload personal photos and transform them into digital baseball cards. The application will apply a customizable baseball card frame with modern animated JavaScript effects for borders and photo alignment. Users can preview the result in real-time on the website. Only registered users will have the ability to download the final image as a PNG file. Registration will be handled exclusively through Google OAuth for simplicity and security.

The application aims to provide an engaging, user-friendly experience for sports enthusiasts, collectors, or anyone interested in personalized memorabilia. It will be a single-page application (SPA) with responsive design for desktop and mobile devices.

### 2.2 Objectives
- Enable easy photo uploads and real-time baseball card generation.
- Ensure secure user authentication to restrict downloads.
- Provide a seamless, animated user interface for an interactive experience.
- Deploy the application using containerization for scalability and ease of maintenance.

### 2.3 Target Audience
- Primary: Baseball fans, hobbyists, and casual users aged 13+ who want to create fun, personalized images.
- Secondary: Social media users sharing custom cards, or educators for creative projects.

## 3. Scope
### 3.1 In Scope
- User registration and login via Google OAuth.
- Photo upload functionality (supporting common formats like JPG, PNG, up to 10MB per file).
- Real-time image processing using JavaScript libraries (e.g., Canvas API or libraries like Konva.js for animations and borders).
- Customizable baseball card templates (e.g., multiple border styles, colors, and animations like fade-in or border glow).
- Preview mode for the generated card.
- Download functionality restricted to authenticated users (PNG export).
- Basic user dashboard to view and manage previously created cards (stored in user-specific storage).
- Deployment using Docker Compose, including Dockerfile for building images, .env for environment variables, and supporting artifacts like nginx.conf for web serving.

### 3.2 Out of Scope
- Advanced editing features (e.g., text overlays, stickers, or AI-based enhancements).
- Payment integration or premium features.
- Mobile app version (web-only, but responsive).
- Social sharing directly from the site (users can download and share manually).
- Multi-user collaboration on cards.
- Support for video uploads or animated GIF outputs.

## 4. Functional Requirements
### 4.1 User Authentication
- **FR1.1**: Users must register/login using Google OAuth. No email/password option.
- **FR1.2**: Upon successful login, store session tokens securely (e.g., using JWT).
- **FR1.3**: Redirect unauthenticated users attempting downloads to the login page.
- **FR1.4**: Provide a logout functionality that clears sessions.

### 4.2 Photo Upload and Processing
- **FR2.1**: Allow users to upload a photo from their device (drag-and-drop or file picker).
- **FR2.2**: Validate uploads: Check file type (JPG, PNG, GIF), size (<10MB), and dimensions (minimum 300x300 pixels for quality).
- **FR2.3**: Use JavaScript (e.g., HTML5 Canvas) to render the baseball card frame around the uploaded photo.
- **FR2.4**: Apply animations: Borders with CSS/JS animations (e.g., pulsing glow, slide-in effects) using libraries like Anime.js or GSAP.
- **FR2.5**: Enable basic alignment tools: Crop, zoom, rotate, and center the photo within the frame.
- **FR2.6**: Provide 3-5 predefined baseball card templates (e.g., classic, modern, vintage styles).

### 4.3 Preview and Download
- **FR3.1**: Display a real-time preview of the generated card on the canvas.
- **FR3.2**: For registered users, enable a "Download PNG" button that exports the canvas as a high-resolution PNG (e.g., 800x1200 pixels).
- **FR3.3**: Save generated cards to user accounts for later access (backend storage required).

### 4.4 User Interface
- **FR4.1**: Responsive design using frameworks like React.js or Vue.js.
- **FR4.2**: Landing page with demo cards and call-to-action for upload/login.
- **FR4.3**: Dashboard page for logged-in users showing history of created cards.

## 5. Non-Functional Requirements
### 5.1 Performance
- Page load time < 2 seconds.
- Image processing and animations should run smoothly at 60 FPS on modern browsers.
- Handle up to 100 concurrent users initially (scalable via Docker).

### 5.2 Security
- Use HTTPS for all communications.
- Store user data (e.g., Google IDs) securely in a database.
- Protect against common vulnerabilities (e.g., XSS via input sanitization, CSRF tokens).
- Uploaded photos are temporary and deleted after processing unless saved by the user.

### 5.3 Usability
- Intuitive UI with tooltips and error messages (e.g., "File too large" on upload failure).
- Accessibility: WCAG 2.1 compliance (e.g., alt text for images, keyboard navigation).
- Multi-language support: English only initially.

### 5.4 Reliability
- 99% uptime target.
- Error handling: Graceful degradation if OAuth fails (e.g., fallback message).

### 5.5 Scalability
- Designed for containerization to allow easy scaling.

## 6. Technical Requirements
### 6.1 Frontend
- Built with JavaScript/ES6+.
- Frameworks: React.js for UI, with libraries like Fabric.js or Konva.js for canvas manipulation and animations.
- State management: Redux or Context API.

### 6.2 Backend
- Node.js with Express.js for API endpoints (e.g., handling uploads, auth callbacks).
- Database: MongoDB or PostgreSQL for user data and card metadata (images stored in cloud like AWS S3 or local filesystem).
- Authentication: Passport.js for Google OAuth integration.

### 6.3 Deployment
- **Containerization**: Use Dockerfile to build frontend and backend images.
- **Orchestration**: Docker Compose file (docker-compose.yml) to manage services (e.g., web server, database, nginx reverse proxy).
- **Environment Variables**: .env file for secrets like Google OAuth client ID/secret, database URI, API keys.
- **Other Artifacts**:
  - nginx.conf for serving static files and proxying API requests.
  - package.json and yarn.lock/npm-shrinkwrap.json for dependencies.
  - CI/CD pipeline scripts (e.g., for GitHub Actions) if needed, but optional.
- Hosting: Deployable to platforms like AWS EC2, Heroku, or local servers.
- Monitoring: Integrate basic logging with tools like Winston.

## 7. Assumptions and Dependencies
### 7.1 Assumptions
- Users have modern browsers (Chrome, Firefox, Safari) supporting HTML5 Canvas and ES6.
- Google OAuth credentials will be provided during development.
- Internet connection required for OAuth and potential cloud storage.

### 7.2 Dependencies
- External Services: Google OAuth API.
- Libraries: As listed in technical requirements.
- Hardware: Server with Docker support.

## 8. Risks and Mitigations
- **Risk**: OAuth integration failures. **Mitigation**: Thorough testing with mock services.
- **Risk**: Performance issues with large images. **Mitigation**: Client-side resizing before upload.
- **Risk**: Security breaches in uploads. **Mitigation**: Use virus scanning (e.g., via ClamAV in Docker) and limit file types.
- **Risk**: Browser compatibility for animations. **Mitigation**: Fallback to static renders for older browsers.

## 9. Appendix
### 9.1 Glossary
- **OAuth**: Open Authorization protocol for secure authentication.
- **SPA**: Single-Page Application.
- **PNG**: Portable Network Graphics file format.

### 9.2 References
- Google OAuth Documentation: https://developers.google.com/identity/protocols/oauth2
- Docker Documentation: https://docs.docker.com/

This PRD serves as a foundation for development. It can be iterated upon based on stakeholder feedback.