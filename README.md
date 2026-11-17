# SaharaCare Reconstruction Project

SaharaCare is a full-stack digital health platform designed for the `Asia/Kathmandu` timezone, providing patient medication adherence, caregiver monitoring, doctor appointment management, private medical file sharing, and AI-assisted clinical consultation.

---

## Reconstruction Methodology: Decoupled Development Strategy

This repository reconstructs SaharaCare from the ground up under a strict **Decoupled Backend-First Strategy**:

1. **Phase 1: Foundation & Governance**
   - Repository initialization, branching model, pull request standards, and architecture specifications.
2. **Phase 2: Backend-First Development**
   - Independent reconstruction of PostgreSQL schemas, Row Level Security (RLS), security-definer RPCs, server actions, and API endpoints.
   - Comprehensive documentation of API contracts prior to frontend integration.
3. **Phase 3: Frontend Development**
   - Independent reconstruction of Next.js 15 App Router views, accessible Tailwind UI design system, bilingual (EN/NE) localization, and mock data adapters.
4. **Phase 4: Progressive Integration**
   - Incremental wiring of frontend components to backend endpoints and validation of Realtime websocket events.
5. **Phase 5: Release Verification**
   - Production validation against the complete test suite (127 automated tests).

---

## Repository Documentation

- [Project Architecture & Separation Model](file:///docs/architecture/ARCHITECTURE.md)
- [Git Branching Strategy](file:///docs/branches/BRANCHING_STRATEGY.md)
- [Initial Project Technical Audit](file:///docs/audit/INITIAL_PROJECT_AUDIT.md)
- [API & RPC Data Contracts](file:///docs/api/)
- [Version History & Roadmap](file:///VERSION_HISTORY.md)
- [Changelog](file:///CHANGELOG.md)

---

## Git Workflow & Branching

- `main`: Release-ready code tagged with semantic versions.
- `integration`: Pre-release shared integration branch.
- `backend/*`: Isolated backend development (schemas, RPCs, server actions).
- `frontend/*`: Isolated frontend development (UI, components, mock clients).

All contributions must follow the [Branching Strategy Guidelines](file:///docs/branches/BRANCHING_STRATEGY.md).
