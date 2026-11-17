import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { dashboardPath } from "@/lib/auth-utils";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const migrationDirectory = resolve(projectRoot, "supabase/migrations");
const phase2MigrationName = "20260808150906_create_saharacare_phase_2_schema.sql";
const migration = readFileSync(resolve(migrationDirectory, phase2MigrationName), "utf8");

test("dashboardPath returns correct role destinations", () => {
  assert.equal(dashboardPath("admin"), "/admin");
  assert.equal(dashboardPath("patient"), "/patient");
  assert.equal(dashboardPath("caregiver"), "/caregiver");
  assert.equal(dashboardPath("doctor"), "/doctor");
});

test("phase 2 schema establishes profiles and role integrity check", () => {
  assert.match(migration, /create table public\.profiles/iu);
  assert.match(migration, /constraint profiles_role_check check \(role in \('patient', 'caregiver'\)\)/iu);
  assert.match(migration, /create table public\.caregiver_links/iu);
  assert.match(migration, /create table public\.medications/iu);
  assert.match(migration, /create table public\.medication_schedules/iu);
  assert.match(migration, /create table public\.dose_records/iu);
  assert.match(migration, /create table public\.notifications/iu);
});

test("phase 2 schema enforces row-level security on profiles", () => {
  assert.match(migration, /alter table public\.profiles enable row level security;/iu);
  assert.match(migration, /create policy "profiles_select_own_or_linked_patient"/iu);
  assert.match(migration, /create policy "profiles_update_own"/iu);
});

test("supabase client factories use secure cookie options and handle sessions", () => {
  const clientSource = readFileSync(resolve(projectRoot, "lib/supabase/client.ts"), "utf8");
  const serverSource = readFileSync(resolve(projectRoot, "lib/supabase/server.ts"), "utf8");
  const middlewareSource = readFileSync(resolve(projectRoot, "lib/supabase/middleware.ts"), "utf8");

  assert.match(clientSource, /createBrowserClient/);
  assert.match(clientSource, /sameSite:\s*"lax"/);
  assert.match(serverSource, /createServerClient/);
  assert.match(serverSource, /sameSite:\s*"lax"/);
  assert.match(middlewareSource, /updateSession/);
});
