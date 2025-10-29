# Wireframe to Code Generator

## Overview

This is a Next.js application that converts wireframe images into functional React code using AI. Users can upload wireframe designs, select an AI model, provide descriptions, and receive generated React + Tailwind CSS code that can be previewed and edited in real-time. The application uses Firebase for authentication and file storage, PostgreSQL (via Neon) for data persistence, and OpenAI/OpenRouter for AI-powered code generation.

**Platform**: Migrated from Vercel to Replit on October 29, 2025

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**October 29, 2025 - Vercel to Replit Migration**
- Configured Next.js to bind to 0.0.0.0:5000 for Replit compatibility
- Migrated database connection from NEXT_PUBLIC_NEON_DB_CONNECTION_STRING to server-only DATABASE_URL for security
- Implemented lazy database initialization using Proxy pattern to prevent build-time errors
- Configured autoscale deployment with production build and start commands
- Updated .gitignore for Replit-specific files
- All environment secrets configured in Replit Secrets
- Known issue: Benign hydration warnings from Firebase auth and theme provider (expected behavior, does not affect functionality)

## System Architecture

### Frontend Architecture

**Framework**: Next.js 15 with App Router and React Server Components
- The application uses the modern Next.js App Router pattern with route groups `(routes)` for authenticated pages
- TypeScript is used throughout for type safety
- Tailwind CSS provides utility-first styling with shadcn/ui components for consistent UI elements

**State Management**: React Context API
- `AuthContext` manages Firebase authentication state across the application
- Custom `useAuthContext` hook provides type-safe access to authenticated user data
- Provider pattern wraps the entire application to share authentication state

**UI Components**: shadcn/ui with Radix UI primitives
- Configured with the "new-york" style variant
- Uses Lucide React for iconography
- Custom theme system with CSS variables for dark mode support
- Components stored in `@/components/ui` with path aliasing

**Code Preview**: Sandpack by CodeSandbox
- Provides live code editing and preview functionality
- Integrates Tailwind CSS and custom dependencies
- Supports real-time code execution in isolated environments

### Backend Architecture

**API Routes**: Next.js API Routes (App Router)
- `/api/user` - Handles user creation and credit retrieval
- `/api/wireframe-to-code` - Manages wireframe records (POST for creation, GET for retrieval)
- `/api/ai-model` - Streams AI-generated code responses using Server-Sent Events pattern

**AI Integration**: OpenAI SDK with OpenRouter
- Uses OpenRouter as a proxy to access multiple AI models (Gemini, Llama)
- Streaming responses for real-time code generation feedback
- Custom prompts engineered for wireframe-to-code conversion
- Maximum execution duration set to 300 seconds for long-running AI requests

**Authentication Flow**:
1. Client-side Firebase authentication with Google OAuth
2. Post-authentication user record creation/verification via API
3. Session persistence through Firebase auth state management
4. Protected routes enforce authentication through provider checks

### Data Storage

**Database**: PostgreSQL via Neon serverless driver
- Drizzle ORM provides type-safe database queries
- Lazy initialization pattern for database connections (proxy-based singleton)
- Schema includes `users` and `wireframeToCode` tables

**Schema Design**:
- `users` table: Tracks user profiles and available credits
- `wireframeToCode` table: Stores wireframe metadata, generated code, and relationships to users
- Uses auto-incrementing integer IDs with UUID for public-facing identifiers

**File Storage**: Firebase Cloud Storage
- Wireframe images uploaded to Firebase Storage buckets
- Public URLs generated for image access in UI and AI processing
- Configured remote image patterns in Next.js for optimization

### External Dependencies

**Authentication & Storage**:
- Firebase (v11.2.0) - User authentication via Google OAuth and cloud file storage
- Firebase services: Auth, Storage
- Environment variables required: `NEXT_PUBLIC_FIREBASE_*` configuration keys

**Database**:
- Neon Serverless PostgreSQL - Cloud-native PostgreSQL database
- Drizzle ORM (v0.39.1) - Type-safe ORM with schema migrations
- Environment variable required: `DATABASE_URL`

**AI Services**:
- OpenRouter AI - Multi-model AI API gateway
- OpenAI SDK (v4.83.0) - Client library for AI completions
- Supports streaming responses for real-time feedback
- Environment variable required: `OPENROUTER_AI_API_KEY`
- Models available: Google Gemini 2.0, Meta Llama (configurable in Constants)

**UI Libraries**:
- shadcn/ui - Pre-built accessible components using Radix UI primitives
- Radix UI - Unstyled, accessible component primitives
- Tailwind CSS - Utility-first CSS framework
- next-themes - Theme management for dark mode
- Sonner - Toast notification system

**Code Sandbox**:
- @codesandbox/sandpack-react - Live code editor and preview
- Sandpack themes for syntax highlighting

**Development Tools**:
- TypeScript 5 - Static type checking
- Drizzle Kit - Database schema management and migrations
- tsx - TypeScript execution for Node.js scripts

**Utilities**:
- axios - HTTP client for API requests
- uuid4 - Unique identifier generation
- dedent - String template formatting for AI prompts
- clsx & tailwind-merge - Conditional className utilities