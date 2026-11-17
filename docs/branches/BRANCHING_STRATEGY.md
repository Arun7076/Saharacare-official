# Git Branching, Contribution & Pull Request Guidelines

## 1. Branch Hierarchy

```
main (Production releases, tagged as vX.Y.Z)
  ▲
  │ (Release PRs)
integration (Shared pre-release integration branch)
  ▲
  ├── backend/* (Backend-first development branches)
  │     ├── backend/schema-and-profiles
  │     ├── backend/medications-and-linking
  │     ├── backend/dose-materialization
  │     └── ...
  │
  └── frontend/* (Frontend independent UI & mock branches)
        ├── frontend/design-system-and-shell
        ├── frontend/medication-management-ui
        └── ...
```

---

## 2. Strict Branching Rules

1. **Separation of Concerns:** Backend code and Frontend code must never be mixed into the same exploratory branch.
2. **Atomic Commits:** Each commit must address a single technical concern (e.g. `feat(schema): add caregiver connections table`).
3. **No Direct Pushes to `main`:** All code enters `main` only via reviewed and tested pull requests from `integration`.
4. **Clean Git History:** Rebase or clean linear merges; no forced pushes (`--force`), no fabricated history.

---

## 3. Pull Request Standards

Every Pull Request must contain:
- **Title:** Following Conventional Commits (e.g., `feat(backend): implement daily dose materialization`).
- **Summary:** Concise description of the changes.
- **Contract Verification:** Confirmation of adherence to specifications in `docs/api/`.
- **Test Results:** Copy of terminal test output verifying functionality.
- **Security Check:** Explicit confirmation that no secrets, credentials, or personal health records are present.
