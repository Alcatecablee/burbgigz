# BurbGigz IT Services - Remote Support Website

## Overview

BurbGigz is a modern IT services website built as a single-page application (SPA) for a local IT support business based in Lombardy East, Johannesburg. The site specializes in remote IT support services, offering secure remote troubleshooting, Windows reloads, virus removal, hardware upgrades, and on-site support for the local area. The application serves as both a marketing platform and functional business tool, featuring service descriptions, pricing calculators, booking systems, and educational blog content.

### Trust & Credibility Features (Added October 2025)
The website implements comprehensive trust-building elements to differentiate from tech support scams:
- **About Page** (`/about`): Showcases Clive Makazhu's CompTIA A+ and Network+ certifications (achieved with distinction), 9+ years of IT experience, and professional credentials
- **Scam Awareness Page** (`/scam-awareness`): Educational content warning users about fake tech support scams and explaining how BurbGigz differs through consent-based service, no cold calls, and transparent operations
- **Enhanced Security Messaging**: Remote Support page features prominent security banner emphasizing consent-based access, encrypted connections, and user control
- **Trust Elements**: Header navigation includes "About" and "Avoid Scams" links; Footer displays certification credentials and quick access to trust resources
- **Certification Badge Placeholders**: Ready for official CompTIA badge images (to be uploaded by owner from CompTIA certification portal)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Authentication System
- **Backend Authentication**: Supabase Auth with JWT token verification middleware
- **Frontend Authentication**: useSupabaseAuth hook with React state management
- **Security**: Protected admin endpoints, production-safe configuration, and secure token handling
- **Fallback Support**: Graceful handling when Supabase is not configured

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite 5 for fast development and optimized production builds
- **Routing**: React Router v6 for client-side navigation with dedicated pages for services, pricing, booking, blog, and service areas
- **State Management**: TanStack Query (React Query) for server state management and data fetching
- **Component System**: shadcn/ui components built on Radix UI primitives for accessible, customizable UI components
- **API Client**: Centralized API client with automatic JWT token injection for authenticated requests

### Styling & Design System
- **CSS Framework**: Tailwind CSS 3 with custom design tokens using HSL CSS variables
- **Theme System**: Professional tech-blue color scheme with custom gradients and design tokens
- **Typography**: @tailwindcss/typography plugin for rich content formatting
- **Responsive Design**: Mobile-first approach with sticky CTA components for mobile users
- **Dark Mode**: Built-in dark mode support using next-themes

### Content Management
- **Blog System**: File-based blog posts with TypeScript interfaces stored in `/src/data/blog.ts`
- **Static Content**: Component-based content management for services, testimonials, and business information
- **SEO Optimization**: Meta tags, structured data, and canonical URLs for search engine optimization

### Business Logic Components
- **Pricing Calculator**: Interactive pricing tool for SSD upgrades, RAM installations, and service fees with location-based callout charges
- **Booking System**: Client-side booking form with date picker, time slots, and WhatsApp integration
- **Service Areas**: Geographic service coverage with pricing tiers based on distance from Lombardy East
- **Contact System**: Multiple contact methods including WhatsApp integration, phone calls, and email
- **Trust & Credibility System**: About page with technician credentials, Scam Awareness education page, and security messaging throughout the site to build customer confidence and differentiate from fraudulent services

### Performance Optimizations
- **Code Splitting**: Route-based code splitting for faster initial load times
- **Asset Optimization**: Vite's built-in asset optimization and bundling
- **Lazy Loading**: Efficient component loading and image optimization
- **Caching Strategy**: Client-side caching through React Query for improved user experience

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Router for core application functionality
- **Build Tools**: Vite with TypeScript support and development plugins
- **State Management**: TanStack Query for server state and caching

### UI Component Libraries
- **Radix UI**: Complete set of accessible UI primitives (@radix-ui/react-*)
- **shadcn/ui**: Pre-built component system using Radix primitives
- **Lucide Icons**: Modern icon library for consistent iconography
- **Class Variance Authority**: Type-safe CSS class composition for component variants

### Styling & Utilities
- **Tailwind CSS**: Utility-first CSS framework with PostCSS and Autoprefixer
- **clsx & tailwind-merge**: Conditional class name utilities
- **next-themes**: Theme switching and dark mode support

### Form & Input Management
- **React Hook Form**: Form state management with @hookform/resolvers
- **date-fns**: Date manipulation and formatting utilities
- **react-day-picker**: Calendar component for date selection
- **input-otp**: OTP input components for secure forms

### Enhanced Components
- **embla-carousel-react**: Carousel/slider functionality
- **cmdk**: Command palette and search interfaces
- **vaul**: Drawer/sheet components for mobile interfaces

### Development & Quality Tools
- **TypeScript**: Type safety with relaxed configuration for rapid development
- **ESLint**: Code linting with React and TypeScript rules
- **Lovable Tagger**: Development-mode component identification

### Business Integration Services
- **WhatsApp Business**: Primary communication channel for customer inquiries and remote support sessions
- **RustDesk**: Secure remote desktop software for IT support sessions
- **Phone System**: Traditional phone support integration
- **Email**: Contact form and business communication