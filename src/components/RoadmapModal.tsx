// src/components/RoadmapModal.tsx
import React from "react";

interface RoadmapModalProps {
   isOpen: boolean;
   onClose: () => void;
}

export const RoadmapModal: React.FC<RoadmapModalProps> = ({ isOpen, onClose }) => {
   if (!isOpen) return null;

   // optional: helper to smooth-scroll to an id inside modal
   const scrollToId = (id: string) => {
      const el = document.getElementById(id);
      if (el) {
         el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
   };

   return (
      <div className="modal-overlay" onClick={onClose}>
         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close">
               &times;
            </button>

            {/* Header */}
            <h1>My Full Stack Development Roadmap & Toolkit</h1>
            <p>
               A comprehensive guide to my technical skills, learning path, and preferred tools for building modern, scalable web
               applications.
            </p>

            {/* Navigation */}
            <nav className="modal-nav" aria-label="Roadmap navigation">
               <strong>Navigation</strong>
               <ul>
                  <li>
                     <button type="button" onClick={() => scrollToId("frontend")}>
                        🎨 Frontend
                     </button>
                  </li>
                  <li>
                     <button type="button" onClick={() => scrollToId("backend")}>
                        ⚙️ Backend & APIs
                     </button>
                  </li>
                  <li>
                     <button type="button" onClick={() => scrollToId("auth")}>
                        🔐 Authentication & Security
                     </button>
                  </li>
                  <li>
                     <button type="button" onClick={() => scrollToId("performance")}>
                        ⚡️ Performance & Architecture
                     </button>
                  </li>
                  <li>
                     <button type="button" onClick={() => scrollToId("databases")}>
                        💾 Databases
                     </button>
                  </li>
                  <li>
                     <button type="button" onClick={() => scrollToId("cloud")}>
                        ☁️ Cloud, DevOps & QA
                     </button>
                  </li>
               </ul>
            </nav>

            {/* === Frontend === */}
            <section id="frontend">
               <h2>🎨 Frontend</h2>
               <p>The modern foundation for building beautiful, fast, and type-safe user interfaces.</p>

               <h3>Core Fundamentals</h3>
               <ul>
                  <li>
                     <strong>HTML5</strong> — Structure and semantic web layouts
                  </li>
                  <li>
                     <strong>CSS3</strong> — Styling, Flexbox, Grid, Responsive Design
                  </li>
                  <li>
                     <strong>JavaScript (ES6+)</strong> — Core language for web logic and DOM manipulation
                  </li>
               </ul>

               <h3>Frameworks & Libraries</h3>
               <ul>
                  <li>
                     <strong>React.js:</strong> The core library for building UI components.
                  </li>
                  <li>
                     <strong>Next.js:</strong> The production framework built on React. My default choice for Server-Side Rendering (SSR),
                     Static Site Generation (SSG), and routing.
                  </li>
                  <li>
                     <strong>Angular:</strong> TypeScript-based enterprise SPA framework by Google.
                  </li>
               </ul>

               <h3>State & Data Management</h3>
               <ul>
                  <li>
                     <strong>React Query (TanStack Query):</strong> For server state management — handles fetching, caching, and updates.
                  </li>
                  <li>
                     <strong>Redux / Zustand:</strong> For global UI state (theme, modals, user-settings).
                  </li>
               </ul>

               <h3>Styling</h3>
               <ul>
                  <li>
                     <strong>Tailwind CSS:</strong> Utility-first CSS for rapid and consistent styling.
                  </li>
               </ul>

               <h3>Typing</h3>
               <ul>
                  <li>
                     <strong>TypeScript:</strong> For static typing, ensuring code quality and maintainability.
                  </li>
               </ul>
            </section>

            {/* === Backend === */}
            <section id="backend">
               <h2>⚙️ Backend & APIs</h2>
               <p>
                  My strategy is to master the Node.js ecosystem first, while keeping other powerful languages as options for specialized
                  use cases.
               </p>

               <h3>Backend Frameworks Comparison</h3>
               <table className="readme-table">
                  <thead>
                     <tr>
                        <th>Language / Ecosystem</th>
                        <th>Framework(s)</th>
                        <th>Primary Use Case</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>Node.js (TypeScript)</td>
                        <td>Express.js ➡️ Nest.js</td>
                        <td>Flexible REST APIs, Real-time Apps, Full Stack JS</td>
                     </tr>
                     <tr>
                        <td>Golang</td>
                        <td>net/http, Gin</td>
                        <td>High-performance microservices, CLI tools</td>
                     </tr>
                     <tr>
                        <td>Python</td>
                        <td>Django, FastAPI</td>
                        <td>Rapid development, Data Science & ML integrations</td>
                     </tr>
                  </tbody>
               </table>

               <h3>My Approach</h3>
               <ul>
                  <li>
                     <strong>Master Nest.js:</strong> For building structured, scalable, and enterprise-ready applications in Node.
                  </li>
                  <li>
                     <strong>Explore Golang/Python:</strong> When a project's performance or ecosystem requirements demand it.
                  </li>
               </ul>
            </section>

            {/* === Auth & Security === */}
            <section id="auth">
               <h2>🔐 Authentication & Security</h2>
               <p>Ensuring applications are secure and user data is protected is non-negotiable.</p>

               <h3>Core Concepts & Standards</h3>
               <ul>
                  <li>
                     <strong>JWT (JSON Web Tokens):</strong> For creating stateless, token-based authentication.
                  </li>
                  <li>
                     <strong>OAuth2:</strong> The industry-standard protocol for authorization.
                  </li>
               </ul>

               <h3>Identity as a Service (IDaaS)</h3>
               <ul>
                  <li>
                     <strong>Okta / Auth0:</strong> For enterprise-grade identity and access management.
                  </li>
               </ul>

               <h3>Best Practices</h3>
               <ul>
                  <li>
                     Always follow the <strong>OWASP Top 10</strong> security principles.
                  </li>
               </ul>
            </section>

            {/* === Performance & Architecture === */}
            <section id="performance">
               <h2>⚡️ Performance & Architecture</h2>
               <p>Building systems that are not just functional, but also fast, reliable, and scalable.</p>

               <h3>API Design</h3>
               <ul>
                  <li>
                     <strong>RESTful APIs:</strong> The go-to standard for most web services.
                  </li>
                  <li>
                     <strong>Alternative:</strong> GraphQL for apps requiring flexible queries and avoiding over-fetching.
                  </li>
               </ul>

               <h3>Caching</h3>
               <ul>
                  <li>
                     <strong>Redis:</strong> High-performance in-memory data store for caching, session management, and real-time features.
                  </li>
               </ul>

               <h3>Asynchronous Processing</h3>
               <ul>
                  <li>
                     <strong>Queue Management (BullMQ, RabbitMQ):</strong> For background jobs, scheduled tasks, and long-running processes.
                  </li>
               </ul>
            </section>

            {/* === Databases === */}
            <section id="databases">
               <h2>💾 Databases</h2>
               <p>Choosing the right database based on data structure, scalability, and consistency.</p>

               <h3>Relational (SQL)</h3>
               <ul>
                  <li>
                     <strong>PostgreSQL</strong> — My primary choice. Valued for reliability, features (JSONB), and ACID compliance.
                  </li>
                  <li>
                     <strong>MySQL / MariaDB</strong> — Common relational databases for web apps.
                  </li>
               </ul>

               <h3>NoSQL</h3>
               <ul>
                  <li>
                     <strong>MongoDB</strong> — Primary for document-based storage and flexible schemas.
                  </li>
               </ul>

               <h3>Caching & Async Jobs</h3>
               <ul>
                  <li>
                     <strong>Redis</strong> — Mastered fundamentals: caching, session management, rate limiting.
                  </li>
                  <li>
                     <strong>Message Queues (BullMQ, RabbitMQ)</strong> — For handling background work.
                  </li>
               </ul>
            </section>

            {/* === Cloud, DevOps & QA === */}
            <section id="cloud">
               <h2>☁️ Cloud, DevOps & Quality Assurance</h2>

               <h3>Cloud Provider Focus</h3>
               <ul>
                  <li>
                     <strong>AWS (Amazon Web Services)</strong> — Primary focus: EC2, S3, RDS, Lambda.
                  </li>
                  <li>
                     <strong>GCP (Google Cloud Platform)</strong> — Secondary / exploratory.
                  </li>
               </ul>

               <h3>Containerization</h3>
               <ul>
                  <li>
                     <strong>Docker</strong> — Essential for consistent, portable dev & prod environments.
                  </li>
               </ul>

               <h3>CI/CD & Automation</h3>
               <ul>
                  <li>
                     <strong>GitHub Actions / GitLab CI</strong> — For building automated testing and deployment pipelines directly from the
                     repository.
                  </li>
               </ul>

               <h3>Testing Strategy (The Pyramid)</h3>
               <ul>
                  <li>
                     <strong>Unit & Integration Testing:</strong> Jest & React Testing Library
                  </li>
                  <li>
                     <strong>End-to-End (E2E) Testing:</strong> Cypress
                  </li>
                  <li>
                     <strong>API Testing:</strong> Postman (Manual) & Newman (Automated)
                  </li>
               </ul>
            </section>
         </div>
      </div>
   );
};

export default RoadmapModal;
