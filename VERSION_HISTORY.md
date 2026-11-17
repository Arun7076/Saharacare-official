# SaharaCare: Progressive Version Development History & Roadmap

This document outlines the evolutionary development journey of SaharaCare, broken down into progressive, independently functional milestones. Each version builds logically on the previous one, satisfies complete build and test requirements, and represents a real development milestone.

---

## Milestone Summary

| Version | Milestone Title | Primary Goal | Tests Introduced / Verified |
| :--- | :--- | :--- | :--- |
| **v0.1.0** | Core Foundation & UI System | Next.js 15 baseline, Tailwind CSS, bilingual i18n, mock data, accessibility | Lint & build validation |
| **v0.2.0** | Authentication & Medication Management | Supabase Auth, profiles, patient medication creation, caregiver linking | `tests/dose-config.test.ts` |
| **v0.3.0** | Daily Dose Materialization & Realtime Adherence | Kathmandu dose materialization, dose action state machine, Realtime subscriptions, adherence calculation | `tests/adherence.test.ts`, `tests/dose-config.test.ts` |
| **v0.4.0** | Medical KYC, Appointments & File Sharing | 9-step client-only KYC, deterministic PDF generation, doctor appointments, private storage sharing | `tests/medical-kyc.test.ts`, `tests/medical-files.test.ts` |
| **v0.5.0** | Clinical AI Consultation Assistant | Google Gemini API integration, medical triage guardrails, rate limiting, streaming contracts | `tests/chat-contracts.test.ts`, `tests/chat-provider.test.ts`, `tests/chat-safety.test.ts` |
| **v0.6.0** | Administrative Operations & Push Reminders | Admin role isolation, audit dashboards, Web Push reminder service worker & cron scheduling | `tests/admin-security.test.ts`, `tests/push-notifications.test.ts` |
| **v0.7.0** | Doctor Availability & Conflict-Free Booking | Doctor shift management, Kathmandu slot generation, atomic booking RPCs, caregiver booking | `tests/appointments.test.ts`, `tests/appointment-reads.test.ts` |
| **v0.8.0** | Security Hardening & Responsive UI Modernization | Request-boundary payload validation, RLS tightening, notification auditing, accessible responsive UX | `tests/security-hardening.test.ts`, `tests/database-security.test.ts` |
| **v1.0.0** | Verified Partner Directory & AI Booking Guidance | Verified partner clinic directory, grounded AI booking assistance, emergency escalation floor, full test suite | Full suite: 20 test files (127 passing tests) |

---

## Detailed Version Specifications

### Version 0.1.0: Core Foundation & UI System
- **Development Objective:** Establish the production-grade Next.js 15 App Router architecture with Tailwind CSS, custom design tokens, bilingual English/Nepali internationalization, accessibility controls, and base application shell.
- **Features Introduced:**
  - Responsive AppShell with Header, Navigation, and Theme/Font scaling controls (`useFontSize`).
  - Bilingual translation engine (`lib/i18n`) with full English & Nepali dictionary parity.
  - UI component primitives (Button, Card, Modal, StatusPill, Skeleton, DataState).
  - Emergency contact shortcuts and call modals for Kathmandu emergency hotlines.
  - Mock healthcare data catalog for initial offline viewing.
- **Dependencies Required:** `next`, `react`, `react-dom`, `tailwindcss`, `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`.
- **Completion Criteria:** Application builds cleanly via `npm run build`, all static pages render without errors, language toggle switches seamlessly between English and Nepali.

---

### Version 0.2.0: Authentication & Medication Management
- **Development Objective:** Integrate Supabase Authentication and database persistence for multi-role user accounts (Patient, Caregiver), medication definitions, and caregiver linking codes.
- **Features Introduced:**
  - Supabase Auth integration (`@supabase/ssr`, `@supabase/supabase-js`) with secure cookie session handling in middleware.
  - Role selection page (`/role`) and role-based route protection.
  - Initial database migration: profiles, medications, schedules, caregiver connections, RLS policies.
  - Patient medication management: Add/edit medicines with customizable schedules (morning, afternoon, evening, night).
  - Caregiver linking: 6-character connection code generator and patient approval workflow.
- **Dependencies Required:** `@supabase/ssr`, `@supabase/supabase-js`.
- **Testing Requirements:** `tests/dose-config.test.ts` passing.
- **Completion Criteria:** Users can sign up, log in, create medication plans, and link caregiver accounts securely.

---

### Version 0.3.0: Daily Dose Materialization & Realtime Adherence
- **Development Objective:** Implement automated daily dose materialization in `Asia/Kathmandu` timezone, dose state transitions, caregiver adherence tracking, and Realtime websocket synchronization.
- **Features Introduced:**
  - Daily dose record materialization stored in Postgres with idempotent generation in Kathmandu time.
  - Dose state machine: `scheduled` -> `taken`, `late`, `missed`.
  - Adherence calculation engine calculating eligible doses and adherence percentage.
  - Realtime subscriptions using Supabase Realtime channels for instant dose updates on caregiver dashboards.
  - Caregiver notification center for missed doses and medication warnings.
- **Testing Requirements:** `tests/adherence.test.ts`, `tests/dose-config.test.ts`.
- **Completion Criteria:** Doses generate accurately per timezone, marking doses as taken reflects instantly on linked caregiver screens, and adherence math validates against test cases.

---

### Version 0.4.0: Medical KYC, Appointments & File Sharing
- **Development Objective:** Introduce the Doctor role, 9-step client-only KYC questionnaire, browser-generated deterministic medical summaries, and time-bounded private file sharing.
- **Features Introduced:**
  - 9-step medical history wizard held exclusively in browser memory (never persisted in plain text).
  - Deterministic PDF summary generation directly in browser canvas (`pdf-lib`, `pdfjs-dist`).
  - Doctor dashboard and appointment management.
  - Secure temporary medical file share: private Supabase Storage bucket, signed URLs, automatic expiry, immediate patient revocation, and scheduled cleanup route.
  - Doctor document viewer: view-only canvas rendering without download or print controls.
- **Dependencies Required:** `pdf-lib`, `pdfjs-dist`.
- **Testing Requirements:** `tests/medical-kyc.test.ts`, `tests/medical-files.test.ts`.
- **Completion Criteria:** PDF compiles accurately in browser, files upload to private bucket, doctor can view shared files during appointment window, and revocation immediately closes access.

---

### Version 0.5.0: Clinical AI Consultation Assistant
- **Development Objective:** Implement the Google Gemini-powered clinical medication consultation assistant with strict medical safety guardrails.
- **Features Introduced:**
  - Integration with `@google/genai` using model `gemini-3.5-flash-lite`.
  - Clinical guardrails: refuse dose change requests, escalate suspected overdoses to emergency hotlines, never recommend doubling missed doses.
  - Bounded conversation payload parser and IP-based rate limiting.
  - Streaming response adapter and client chat UI (`/patient/assistant`, `/caregiver/assistant`).
- **Dependencies Required:** `@google/genai`.
- **Testing Requirements:** `tests/chat-contracts.test.ts`, `tests/chat-provider.test.ts`, `tests/chat-safety.test.ts`.
- **Completion Criteria:** AI assistant answers grounded medication queries, stream delivers responses smoothly, and safety filters deterministically escalate emergency/overdose prompts.

---

### Version 0.6.0: Administrative Operations & Web Push Reminders
- **Development Objective:** Build the dedicated administrative directory interface, background cron workflows, and Web Push medication reminder system.
- **Features Introduced:**
  - Admin dashboard (`/admin`) for platform monitoring, doctor verifications, and system metrics.
  - Strict database boundaries ensuring Admin RLS completely blocks access to patient medical rows and documents.
  - Web Push notification subscriptions (`/api/push-subscriptions`) with service worker (`sw.js`).
  - Scheduled background cron endpoint (`/api/cron/medication-reminders`) for dispatching timely reminders in Kathmandu time.
- **Dependencies Required:** `web-push`, `@types/web-push`.
- **Testing Requirements:** `tests/admin-security.test.ts`, `tests/push-notifications.test.ts`.
- **Completion Criteria:** Admins can view platform stats without leaking medical data; push notifications register and trigger via test payload.

---

### Version 0.7.0: Doctor Availability & Conflict-Free Booking
- **Development Objective:** Complete the doctor shift availability manager, Kathmandu-aware slot generator, atomic appointment booking RPCs, and caregiver booking workflows.
- **Features Introduced:**
  - Doctor availability management: recurring weekly working hours and specific date overrides.
  - Deterministic slot generation algorithm factoring in clinic hours, breaks, and existing appointments.
  - Atomic booking RPC with conflict collision keys preventing concurrent double-booking.
  - Caregiver-managed appointment booking on behalf of linked patients.
  - Doctor reschedule and cancellation workflows with notification dispatch.
- **Testing Requirements:** `tests/appointments.test.ts`, `tests/appointment-reads.test.ts`.
- **Completion Criteria:** Doctor slots compute accurately in Kathmandu timezone; concurrent booking tests verify atomic conflict rejection.

---

### Version 0.8.0: Security Hardening & Responsive UI Modernization
- **Development Objective:** Harden API endpoints against oversized payloads and malformed requests, audit database event actors, and overhaul mobile responsiveness and accessibility.
- **Features Introduced:**
  - Request body streaming bounds (`lib/request-body.ts`) and security diagnostics (`lib/security-diagnostics.ts`).
  - Appointment notification authorization database hardening (validating event actors and accepted links).
  - Strict cookie flags (`SameSite=lax`, `Secure` in production) across all Supabase SSR clients.
  - Complete responsive layout refresh for mobile devices (drawer menus, bottom navigation, touch targets).
- **Testing Requirements:** `tests/security-hardening.test.ts`, `tests/database-security.test.ts`, `tests/ui-localization.test.ts`.
- **Completion Criteria:** Security audit tests pass; oversized or spoofed requests fail closed; UI conforms to WCAG accessibility touch standards.

---

### Version 1.0.0: Verified Partner Directory & AI Booking Guidance
- **Development Objective:** Final release incorporating the paid partner clinic directory, grounded AI booking guidance with emergency floor triage, patient next-care home cards, and complete integration validation.
- **Features Introduced:**
  - Verified Partner Directory (`lib/directory`) with specialty filters, consultation modes, and Kathmandu facilities.
  - Grounded AI Booking Guidance (`lib/chat/booking-guidance.ts`) with hard-coded emergency floor escalation before model queries.
  - Patient Next Care dashboard widget linking urgent medicines, overdue doses, and upcoming doctor visits.
  - Demo isolation mode (`NEXT_PUBLIC_DEMO_MODE`) for hackathon showcases without polluting live directory data.
  - Production verification: All 127 automated tests passing across 20 test suites.
- **Testing Requirements:** Full test suite execution (`npm test` -> 127 tests pass).
- **Completion Criteria:** Complete feature parity with the source project, zero regressions, full build validation, complete test pass.
