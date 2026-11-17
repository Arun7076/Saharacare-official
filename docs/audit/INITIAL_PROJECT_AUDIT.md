# INITIAL_PROJECT_AUDIT.md: Comprehensive SaharaCare Architecture & Fragment Audit

## 1. System & Environment Audit

- **Operating System:** Windows 11 (PowerShell terminal)
- **Node.js Environment:** Available (`npm.cmd` execution enabled)
- **Git User Name:** `Arun7076` (Configured in global git config)
- **Git Email:** `127221026+Arun7076@users.noreply.github.com`
- **SSH Authentication:** Authenticated with GitHub as `Arun7076` (`ssh -T git@github.com` -> `Hi Arun7076! You've successfully authenticated`)
- **Original Source Application Path:** `c:\Users\ACER\Documents\Hackathon\saharacare` (Preserved intact & untouched)
- **Reconstruction Directory:** `c:\Users\ACER\Downloads\Saharacare-official`

---

## 2. Original Project Technical Profile

### 2.1 Core Framework & Runtime
- **Framework:** Next.js 15.5.24 (App Router)
- **UI Library:** React 19.1.0, React DOM 19.1.0
- **Language:** TypeScript 5.7.2 (`strict: true`)
- **Styling:** Tailwind CSS 3.4.17 with PostCSS, Lucide React icons, Radix UI Slot/Dialog primitives, Framer Motion.
- **Data & Auth Layer:** Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
- **External APIs:** Google Gemini AI API (`@google/genai`), Web Push Notifications (`web-push`), PDF generation (`pdf-lib`, `pdfjs-dist`).

### 2.2 Functional Architecture & Entry Points
- **Web App Router:**
  - `app/layout.tsx`: Root HTML shell with font configuration and metadata.
  - `app/globals.css`: Tailwind root variables, base design system, typography scales, accessibility color contrast tokens.
  - `app/page.tsx`: Landing page with role portal navigation (Patient, Caregiver, Doctor, Admin).
  - `middleware.ts`: Supabase session synchronization and route-level protection.
- **State & Internationalization:**
  - `lib/i18n/index.ts`: Bilingual engine (`en` and `ne` catalogs) supporting client-side and server-side string lookup.
  - `hooks/useLanguage.ts`: Language state hook persisting choice to localStorage.
  - `hooks/useFontSize.ts`: Dynamic font size scaling hook (`normal`, `large`, `extra-large`).
  - `components/providers/AppProvider.tsx`: React Context orchestrator wrapping accessibility, toast, user, and language contexts.

---

## 3. Analysis of Potential First Fragments

To ensure a genuinely progressive, independently functional, and zero-compromise reconstruction without arbitrarily inventing features or copying monolithic code prematurely, we evaluated four initial candidate components:

| Candidate Fragment | Functional Independence | External Services Needed | Testability | Reusability in Later Milestones | Verdict |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A. Patient Adherence Calculator** | High | None | High (`tests/adherence.test.ts`) | Only useful once doses exist | Deferred to v0.3.0 |
| **B. Gemini Chat Assistant** | Low | Google Gemini API Key | Medium | Dependent on prompt contracts & UI | Deferred to v0.5.0 |
| **C. Emergency Quick Actions & Call Modal** | High | None | High (Unit + UI) | Reused across all dashboards | Supported in UI base |
| **D. Bilingual Internationalization & Design System Foundation (Selected)** | **Highest** | **None** | **Highest (Build, Lint, UI test)** | **Required by 100% of all future modules** | **RECOMMENDED FOR FIRST FRAGMENT** |

---

## 4. Recommended First Fragment: Bilingual Design System & Emergency Health Foundation

### 4.1 Fragment Overview
The foundation upon which SaharaCare is constructed consists of:
1. **Next.js 15 App Router & Strict TypeScript Baseline:** `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `components.json`.
2. **Accessible Core Design System:**
   - Design tokens, CSS variables, and layout shell in `app/globals.css` and `components/layout/AppShell.tsx`.
   - Core reusable UI primitives: `Button`, `Card`, `Modal`, `StatusPill`, `DataState`, `LanguageToggle`.
3. **Bilingual Localization Engine (`en` / `ne`):**
   - Full dictionary parity supporting English and Nepali in `lib/i18n/en.ts`, `lib/i18n/ne.ts`, `lib/i18n/index.ts`.
   - Dynamic interpolation and localized text utilities.
4. **Emergency Health Contacts & Triage Primitives:**
   - Kathmandu emergency dispatch shortcuts (Ambulance 102, Police 100, Blood Bank, Emergency Triage).
   - `components/contacts/EmergencyModal.tsx`, `components/contacts/CallConfirmationModal.tsx`.
5. **Synthetic Healthcare Mock Catalog:**
   - Synthetic doctors, medicines, and sample schedules for offline verification (`mock-data/index.ts`).

### 4.2 Why This is the Safest and Most Appropriate Starting Fragment
- **Zero Confidential Leaks:** Uses zero real patient records, zero production database credentials, and zero API keys.
- **Completely Functional Independently:** Can be launched locally (`npm run dev`), built for production (`npm run build`), and verified interactively in English and Nepali.
- **Architectural Prerequisite:** Every subsequent feature (Auth, Medications, Caregiver Linking, Appointments, Gemini AI) directly imports these design primitives, i18n keys, and UI layouts.
