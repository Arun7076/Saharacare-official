# SaharaCare API & RPC Data Contract: Core Profiles & Authentication

## 1. Profile Data Model

### Table: `public.profiles`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, references `auth.users(id)` | User unique identifier |
| `role` | `text` | NOT NULL, CHECK in (`patient`, `caregiver`, `doctor`, `admin`) | Assigned system role |
| `full_name` | `text` | NOT NULL | Display name |
| `phone_number`| `text` | NULL | Contact number |
| `created_at` | `timestamptz` | NOT NULL, default `timezone('utc', now())` | Account timestamp |
| `updated_at` | `timestamptz` | NOT NULL, default `timezone('utc', now())` | Record update time |

---

## 2. Row Level Security (RLS) Rules

- **SELECT:**
  - Authenticated users can read their own profile (`auth.uid() = id`).
  - Caregivers can read linked patient profiles where an accepted relationship exists in `caregiver_patient_links`.
  - Doctors can read assigned patient profiles with an active appointment.
- **INSERT:**
  - Handled exclusively via PostgreSQL trigger on `auth.users` upon signup. Direct client insert is rejected.
- **UPDATE:**
  - Authenticated users can update their own `full_name` and `phone_number`. Modifying `role` directly is rejected by RLS.
- **DELETE:**
  - Disabled for all authenticated clients.
