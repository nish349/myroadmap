// 1. LEVEL MULTIPLIERS (User Expertise)
// This applies the user's level to the CCH for a total time estimate.
// ===================================================================

export const LEVEL_MULTIPLIERS = {
   beginner: 8, // Beginners need 8x the Core Competency Hours (CCH)
   intermediate: 4, // Intermediates need 4x the CCH
   professional: 1, // Professionals need 1x the CCH
   custom: 0,
};

// 2. TYPESCRIPT INTERFACES
// This defines the 3-level shape of our data.
// ===================================================================

/**
 * LEVEL 3: The individual skill, tool, or concept.
 * This is the 'leaf' of our tree.
 */
export interface SkillOption {
   id: string; // e.g., "react"
   name: string; // e.g., "React.js"
   description: string;
   wiseNote: string;
   cch: number; // Core Competency Hours (NEEDS REVIEW)

   // The 'Industry Level' tag
   tag?: "Industry Standard" | "Best for Versatility" | "Enterprise Grade" | "Great for Individuals";

   // The 'User Expertise Level' for filtering
   level: "Must Have" | "Intermediate" | "Professional";
}

/**
 * LEVEL 2: A sub-category that groups related skills.
 * e.g., "Frameworks & Libraries"
 */
export interface SkillCategory {
   title: string; // e.g., "⚙️ Frameworks & Libraries"

   // 'mandatory': All skills are included (e.g., Core Fundamentals)
   // 'choice-single': User must pick one (e.g., Main Framework)
   // 'choice-multiple': User can pick many (e.g., Styling tools)
   selectionType: "mandatory" | "choice-single" | "choice-multiple";

   options: SkillOption[];
}

/**
 * LEVEL 1: The main domain of knowledge.
 * e.g., "🎨 Frontend"
 */
export interface TopLevelDomain {
   title: string; // e.g., "🎨 Frontend"
   focus: string; // e.g., "UI development, structure..."

   // A collection of sub-categories
   categories: { [key: string]: SkillCategory };
}

// 3. THE COMPLETE ROADMAP DATA
// This is the full implementation of your Skill Tree.
// ===================================================================

export const ROADMAP_DATA: { [key: string]: TopLevelDomain } = {
   // -----------------------------------------------------------------
   // 🎨 FRONTEND
   // -----------------------------------------------------------------
   FRONTEND: {
      title: "🎨 Frontend",
      focus: "UI development, structure, styling, and interactivity.",
      categories: {
         CORE: {
            title: "🧱 Core Fundamentals",
            selectionType: "mandatory",
            options: [
               {
                  id: "html",
                  name: "HTML5",
                  description: "Structure and semantic web layouts",
                  wiseNote: "The skeleton of all web pages. Non-negotiable.",
                  cch: 8, // From original file
                  level: "Must Have",
               },
               {
                  id: "css",
                  name: "CSS3",
                  description: "Styling, Flexbox, Grid, Responsive Design",
                  wiseNote: "Mastering Flexbox and Grid is key to modern layouts.",
                  cch: 16, // From original file
                  level: "Must Have",
               },
               {
                  id: "js",
                  name: "JavaScript (ES6+)",
                  description: "Core language for web logic and DOM manipulation",
                  wiseNote: "Focus on async/await, modules, and data structures.",
                  cch: 32, // From original file
                  level: "Must Have",
               },
            ],
         },
         FRAMEWORKS: {
            title: "⚙️ Frameworks & Libraries",
            selectionType: "choice-single",
            options: [
               {
                  id: "react",
                  name: "React.js",
                  description: "Component-based UI development library",
                  wiseNote: "The most in-demand library for UI development.",
                  cch: 40, // From original file
                  tag: "Industry Standard",
                  level: "Must Have",
               },
               {
                  id: "nextjs",
                  name: "Next.js",
                  description: "The React framework for production (SSR, SSG, Routing)",
                  wiseNote: "The modern standard for building React applications.",
                  cch: 30, // Placeholder
                  tag: "Industry Standard",
                  level: "Intermediate",
               },
               {
                  id: "angular",
                  name: "Angular",
                  description: "TypeScript-based enterprise SPA framework by Google",
                  wiseNote: "A powerful, all-in-one solution for large corporate apps.",
                  cch: 50, // From original file
                  tag: "Enterprise Grade",
                  level: "Intermediate",
               },
            ],
         },
         STYLING: {
            title: "🎨 Styling & Typing",
            selectionType: "choice-multiple",
            options: [
               {
                  id: "tailwind",
                  name: "Tailwind CSS",
                  description: "Utility-first modern styling framework",
                  wiseNote: "Incredibly fast for building custom designs without writing CSS.",
                  cch: 20, // Placeholder
                  tag: "Industry Standard",
                  level: "Intermediate",
               },
               {
                  id: "bootstrap",
                  name: "Bootstrap",
                  description: "Pre-styled responsive UI components",
                  wiseNote: "Great for rapid prototyping and internal tools.",
                  cch: 15, // Placeholder
                  tag: "Great for Individuals",
                  level: "Must Have",
               },
               {
                  id: "typescript",
                  name: "TypeScript",
                  description: "Static typing for scalable, maintainable JavaScript",
                  wiseNote: "A professional non-negotiable. Start this as soon as you know JS.",
                  cch: 25, // From original file
                  tag: "Industry Standard",
                  level: "Intermediate",
               },
            ],
         },
         STATE_MANAGEMENT: {
            title: "🔄 State & Data Management",
            selectionType: "choice-multiple",
            options: [
               {
                  id: "react-query",
                  name: "React Query (TanStack)",
                  description: "Server-state management, caching, and mutation",
                  wiseNote: "The standard for fetching and caching data in React.",
                  cch: 20, // From original file
                  tag: "Industry Standard",
                  level: "Intermediate",
               },
               {
                  id: "redux",
                  name: "Redux / Zustand",
                  description: "Global UI state management (Client State)",
                  wiseNote: "For managing complex client-side state that isn't server data.",
                  cch: 25, // From original file (avg)
                  tag: "Industry Standard",
                  level: "Intermediate",
               },
               {
                  id: "context-api",
                  name: "Context API",
                  description: "React built-in lightweight state sharing",
                  wiseNote: "Perfect for simple state (like theme) without a heavy library.",
                  cch: 10, // Placeholder
                  tag: "Great for Individuals",
                  level: "Must Have",
               },
            ],
         },
      },
   },

   // -----------------------------------------------------------------
   // ⚙️ BACKEND & APIS
   // -----------------------------------------------------------------
   BACKEND: {
      title: "⚙️ Backend & APIs",
      focus: "Logic, data flow, server-side processing, and APIs.",
      categories: {
         FRAMEWORKS: {
            title: "🧩 Backend Frameworks",
            selectionType: "choice-single",
            options: [
               {
                  id: "express",
                  name: "Express.js (Node.js)",
                  description: "Lightweight, unopinionated web framework for Node.js",
                  wiseNote: "The classic. Perfect for microservices and learning Node.js.",
                  cch: 30, // From original file
                  tag: "Best for Versatility",
                  level: "Must Have",
               },
               {
                  id: "nest",
                  name: "Nest.js (Node.js)",
                  description: "Scalable, structured TypeScript framework (MVC / DI)",
                  wiseNote: "The 'Angular for the backend'. Excellent for enterprise TS projects.",
                  cch: 45, // From original file
                  tag: "Enterprise Grade",
                  level: "Intermediate",
               },
               {
                  id: "django",
                  name: "Django (Python)",
                  description: "Batteries-included web framework for rapid development",
                  wiseNote: "A robust, mature framework that includes an admin panel.",
                  cch: 45, // Placeholder
                  tag: "Industry Standard",
                  level: "Intermediate",
               },
               {
                  id: "fastapi",
                  name: "FastAPI (Python)",
                  description: "Modern async framework for high-performance Python APIs",
                  wiseNote: "Incredibly fast, with automatic docs. A new industry favorite.",
                  cch: 40, // Placeholder
                  tag: "Best for Versatility",
                  level: "Professional",
               },
               {
                  id: "golang",
                  name: "Golang (Built-in)",
                  description: "For microservices, CLI tools, and low-latency systems",
                  wiseNote: "Choose for raw performance and concurrency.",
                  cch: 60, // From original file
                  tag: "Enterprise Grade",
                  level: "Professional",
               },
               {
                  id: "spring-boot",
                  name: "Spring Boot (Java Framework)",
                  description:
                     "A production-grade Java framework for building scalable, secure, and enterprise-level backend applications with minimal configuration.",
                  wiseNote:
                     "Ideal for large-scale enterprise systems, offering powerful integrations with databases, security, and microservices architecture via Spring Cloud.",
                  cch: 70,
                  tag: "Enterprise Grade",
                  level: "Professional",
               },
            ],
         },
         API_DESIGN: {
            title: "⚙️ API Design",
            selectionType: "mandatory",
            options: [
               {
                  id: "rest",
                  name: "RESTful APIs",
                  description: "CRUD-based standard APIs using HTTP verbs",
                  wiseNote: "You must understand REST. It powers 90% of the web.",
                  cch: 20, // Placeholder
                  tag: "Industry Standard",
                  level: "Must Have",
               },
               {
                  id: "graphql",
                  name: "GraphQL",
                  description: "Flexible query-based APIs to prevent over/under-fetching",
                  wiseNote: "Solves many problems of REST, especially for complex apps.",
                  cch: 25, // Placeholder
                  tag: "Industry Standard",
                  level: "Intermediate",
               },
            ],
         },
         PERFORMANCE: {
            title: "⚡ Performance & Async Jobs",
            selectionType: "mandatory",
            options: [
               {
                  id: "redis",
                  name: "Redis",
                  description: "Caching, in-memory data store, session storage",
                  wiseNote: "The key to a fast application. Used for caching DB queries.",
                  cch: 25, // Placeholder
                  tag: "Industry Standard",
                  level: "Intermediate",
               },
               {
                  id: "queues",
                  name: "BullMQ / RabbitMQ",
                  description: "Background jobs, message queues",
                  wiseNote: "For tasks that shouldn't block the server (e.g., sending email).",
                  cch: 30, // Placeholder
                  tag: "Enterprise Grade",
                  level: "Professional",
               },
               {
                  id: "websockets",
                  name: "WebSockets",
                  description: "Real-time data handling (e.g., chat, live updates)",
                  wiseNote: "For when you need two-way, persistent connections.",
                  cch: 20, // Placeholder
                  tag: "Best for Versatility",
                  level: "Intermediate",
               },
            ],
         },
      },
   },

   // -----------------------------------------------------------------
   // 💾 DATABASES
   // -----------------------------------------------------------------
   DATABASES: {
      title: "💾 Databases",
      focus: "Data persistence, modeling, and scalability.",
      categories: {
         RELATIONAL: {
            title: "🗄️ Relational (SQL)",
            selectionType: "choice-single",
            options: [
               {
                  id: "postgres",
                  name: "PostgreSQL",
                  description: "Primary relational database, JSONB support, indexing",
                  wiseNote: "The most advanced, reliable open-source SQL database.",
                  cch: 25, // From original file (avg)
                  tag: "Industry Standard",
                  level: "Must Have",
               },
               {
                  id: "mysql",
                  name: "MySQL / MariaDB",
                  description: "Common relational databases for web apps",
                  wiseNote: "The classic, widely supported and understood.",
                  cch: 20, // Placeholder
                  tag: "Industry Standard",
                  level: "Must Have",
               },
            ],
         },
         NO_SQL: {
            title: "📂 NoSQL (Document / Key-Value)",
            selectionType: "choice-single",
            options: [
               {
                  id: "mongodb",
                  name: "MongoDB",
                  description: "Document-based flexible schema",
                  wiseNote: "Great for rapid development and unstructured data.",
                  cch: 20, // From original file (avg)
                  tag: "Best for Versatility",
                  level: "Intermediate",
               },
               {
                  id: "redis-db",
                  name: "Redis (as DB)",
                  description: "Key-value store for caching and sessions",
                  wiseNote: "While used for caching, it's also a valid NoSQL DB.",
                  cch: 10, // Placeholder
                  tag: "Best for Versatility",
                  level: "Intermediate",
               },
            ],
         },
         ADVANCED_DATA: {
            title: "📦 Advanced Data Handling",
            selectionType: "choice-multiple",
            options: [
               {
                  id: "orm",
                  name: "ORMs (Prisma, TypeORM)",
                  description: "ORM tools for database modeling and access",
                  wiseNote: "Abstracts SQL queries into code. Prisma is the new standard.",
                  cch: 25, // Placeholder
                  tag: "Industry Standard",
                  level: "Intermediate",
               },
               {
                  id: "indexing",
                  name: "Query Optimization / Indexing",
                  description: "Advanced SQL tuning for performance",
                  wiseNote: "This is what separates senior from junior engineers.",
                  cch: 30, // Placeholder
                  tag: "Enterprise Grade",
                  level: "Professional",
               },
            ],
         },
      },
   },

   // -----------------------------------------------------------------
   // 🔒 AUTHENTICATION & SECURITY
   // -----------------------------------------------------------------
   SECURITY: {
      title: "🔒 Authentication & Security",
      focus: "Protecting data, identity, and API access.",
      categories: {
         CORE: {
            title: "🧱 Core Concepts & Standards",
            selectionType: "mandatory",
            options: [
               {
                  id: "jwt",
                  name: "JWT (JSON Web Tokens)",
                  description: "Stateless authentication tokens",
                  wiseNote: "The standard for securing REST APIs.",
                  cch: 15, // From original file (avg)
                  tag: "Industry Standard",
                  level: "Intermediate",
               },
               {
                  id: "oauth2",
                  name: "OAuth2",
                  description: "Standard authorization framework ('Login with Google')",
                  wiseNote: "You'll need this to integrate with third-party logins.",
                  cch: 20, // From original file (avg)
                  tag: "Industry Standard",
                  level: "Intermediate",
               },
               {
                  id: "owasp",
                  name: "OWASP Top 10",
                  description: "Security practices for web applications",
                  wiseNote: "Knowing these (XSS, SQL Injection) is critical.",
                  cch: 20, // Placeholder
                  tag: "Industry Standard",
                  level: "Professional",
               },
            ],
         },
         IDAAS: {
            title: "🔐 Identity as a Service (IDaaS)",
            selectionType: "choice-multiple",
            options: [
               {
                  id: "auth0-okta",
                  name: "Auth0 / Okta",
                  description: "Enterprise-grade identity management and social login",
                  wiseNote: "Why build auth yourself? These services handle it all.",
                  cch: 25, // Placeholder
                  tag: "Enterprise Grade",
                  level: "Professional",
               },
               {
                  id: "firebase-auth",
                  name: "Firebase / Supabase Auth",
                  description: "Managed identity systems, great for startups",
                  wiseNote: "The fastest way to get secure auth up and running.",
                  cch: 15, // Placeholder
                  tag: "Great for Individuals",
                  level: "Intermediate",
               },
            ],
         },
      },
   },

   // -----------------------------------------------------------------
   // ☁️ CLOUD SERVICES
   // -----------------------------------------------------------------
   CLOUD: {
      title: "☁️ Cloud Services",
      focus: "Hosting, infrastructure, serverless computing, and deployment.",
      categories: {
         PROVIDER: {
            title: "☁️ Cloud Provider",
            selectionType: "choice-single",
            options: [
               {
                  id: "aws",
                  name: "Amazon Web Services (AWS)",
                  description: "Includes EC2, S3, RDS, Lambda, CloudFront, IAM",
                  wiseNote: "The industry leader. Knowing AWS is a job in itself.",
                  cch: 50, // From original file (avg)
                  tag: "Industry Standard",
                  level: "Intermediate",
               },
               {
                  id: "gcp",
                  name: "Google Cloud Platform (GCP)",
                  description: "Includes App Engine, Cloud Run, Firestore, Pub/Sub",
                  wiseNote: "Known for great developer experience and data tools.",
                  cch: 45, // Placeholder
                  tag: "Best for Versatility",
                  level: "Intermediate",
               },
               {
                  id: "azure",
                  name: "Microsoft Azure",
                  description: "Includes App Service, Azure SQL, Azure DevOps",
                  wiseNote: "The standard for .NET and a strong enterprise player.",
                  cch: 45, // Placeholder
                  tag: "Enterprise Grade",
                  level: "Intermediate",
               },
            ],
         },
      },
   },

   // -----------------------------------------------------------------
   // 🧪 TESTING STRATEGY
   // -----------------------------------------------------------------
   TESTING: {
      title: "🧪 Testing Strategy",
      focus: "Software reliability, debugging, and automated verification.",
      categories: {
         UNIT: {
            title: "🧱 Unit & Integration Testing",
            selectionType: "mandatory",
            options: [
               {
                  id: "jest",
                  name: "Jest",
                  description: "JavaScript testing framework for units and integration",
                  wiseNote: "The default for any JS-based project (front or backend).",
                  cch: 20, // Placeholder
                  tag: "Industry Standard",
                  level: "Intermediate",
               },
               {
                  id: "rtl",
                  name: "React Testing Library",
                  description: "Component-level testing, focusing on user behavior",
                  wiseNote: "Test *how* users use your components, not *what* they are.",
                  cch: 15, // Placeholder
                  tag: "Industry Standard",
                  level: "Intermediate",
               },
            ],
         },
         E2E: {
            title: "🌐 End-to-End (E2E) Testing",
            selectionType: "choice-single",
            options: [
               {
                  id: "cypress",
                  name: "Cypress",
                  description: "Full workflow and UI testing in a real browser",
                  wiseNote: "Amazing developer experience for E2E testing.",
                  cch: 25, // Placeholder
                  tag: "Industry Standard",
                  level: "Professional",
               },
               {
                  id: "playwright",
                  name: "Playwright",
                  description: "Microsoft's browser automation testing tool",
                  wiseNote: "Gaining popularity fast, especially for cross-browser testing.",
                  cch: 25, // Placeholder
                  tag: "Industry Standard",
                  level: "Professional",
               },
            ],
         },
         API: {
            title: "🧩 API Testing",
            selectionType: "mandatory",
            options: [
               {
                  id: "postman",
                  name: "Postman / Newman",
                  description: "Manual and automated API testing and documentation",
                  wiseNote: "The standard for exploring, documenting, and testing APIs.",
                  cch: 15, // Placeholder
                  tag: "Industry Standard",
                  level: "Must Have",
               },
            ],
         },
      },
   },

   // -----------------------------------------------------------------
   // ⚙️ CI/CD & CONTAINERIZATION
   // -----------------------------------------------------------------
   DEVOPS: {
      title: "⚙️ CI/CD Pipeline & Containerization",
      focus: "Continuous Integration, Deployment, and Containerized Infrastructure.",
      categories: {
         TOOLS: {
            title: "🧱 CI/CD Tools",
            selectionType: "choice-single",
            options: [
               {
                  id: "github-actions",
                  name: "GitHub Actions",
                  description: "CI/CD automation directly in your GitHub repo",
                  wiseNote: "The default, most convenient choice for most projects.",
                  cch: 20, // From original file (avg)
                  tag: "Industry Standard",
                  level: "Intermediate",
               },
               {
                  id: "gitlab-ci",
                  name: "GitLab CI",
                  description: "Self-hosted or managed CI/CD pipelines",
                  wiseNote: "Very powerful, especially if your code is on GitLab.",
                  cch: 20, // Placeholder
                  tag: "Best for Versatility",
                  level: "Intermediate",
               },
               {
                  id: "jenkins",
                  name: "Jenkins",
                  description: "The open-source enterprise automation server",
                  wiseNote: "A powerful, classic tool. You'll see this in large companies.",
                  cch: 30, // Placeholder
                  tag: "Enterprise Grade",
                  level: "Professional",
               },
            ],
         },
         CONTAINERS: {
            title: "🐳 Containerization",
            selectionType: "mandatory",
            options: [
               {
                  id: "docker",
                  name: "Docker",
                  description: "Packaging, container management, and compose",
                  wiseNote: "The foundation of modern DevOps. 'It works on my machine' is dead.",
                  cch: 25, // From original file
                  tag: "Industry Standard",
                  level: "Intermediate",
               },
            ],
         },
         ORCHESTRATION: {
            title: "☸️ Container Orchestration",
            selectionType: "choice-single",
            options: [
               {
                  id: "k8s",
                  name: "Kubernetes (K8s)",
                  description: "Cluster orchestration and scaling",
                  wiseNote: "The standard for large-scale container management. Very complex.",
                  cch: 50, // Placeholder
                  tag: "Enterprise Grade",
                  level: "Professional",
               },
               {
                  id: "ecs",
                  name: "AWS ECS / Cloud Run",
                  description: "Managed container orchestration",
                  wiseNote: "A simpler alternative to K8s, managed by your cloud provider.",
                  cch: 35, // Placeholder
                  tag: "Industry Standard",
                  level: "Professional",
               },
            ],
         },
      },
   },
}; // End of ROADMAP_DATA
