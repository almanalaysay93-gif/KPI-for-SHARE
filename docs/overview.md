---
type: moc
project: SHARE KPI Dashboard
status: active
created: 2026-08-01
source: "Google Drive folder: SHARE KPI"
tags: [share-kpi, moc, transplant, otsu, spmc]
---

# SHARE KPI Dashboard — MOC

Project home for the **printable, interactive KPI dashboard for the SHARE Transplant Coordinator** at SPMC OTSU. Purpose: daily task monitoring on one US-Letter sheet.

## Deliverable

- SHARE TC Daily KPI Dashboard — the interactive printable (HTML, Letter, print-ready)
- SHARE KPI Model — the metric definitions, targets, and formulas behind it
- SHARE KPI Brainstorm — design decisions, open questions, next moves

## Who it is for

**SHARE Transplant Coordinator**, Organ Transplant Services Unit (OTSU), Southern Philippines Medical Center, DOH Regional Health Office XI, Davao City. Two role variants exist and the sheet must serve both:

- **CTC — Clinical Transplant Coordinator**: transplant candidate evaluation, management, follow-up care (CTC02062024)
- **PTC — Procurement Transplant Coordinator**: donor evaluation, management, organ/tissue recovery (PTC03232023)

Shift window: **07:00–15:00, Mon–Fri** (from the Citizens Charter).

## The five source clusters

| Cluster | Files | What it gives the dashboard |
|---|---|---|
| AimPact - Index | 23 | The spec, the existing daily form, the time standards, the SLAs, the calendar |
| Donor Alert System - Index | 79 | GCS<7 alert workflow, the EMR-DAS research project, ethics packages |
| Donor Detection - Index | 6 | TPM lecture decks: detection, viability, allocation, recovery |
| ISN-TTS Report - Index | 13 | ISN-TTS sister transplant centre reports, patient handbooks |
| NICER SHARE Ethics - Index | 72 | NICER 3-project ethics compliance, the SHAREd Program Tracker |

193 source nodes total. Everything is mirrored from the Drive folder `SHARE KPI/`.

## The seven files that actually drive the design

1. Aimpact — the product brief. Required fields, the 5-state status vocabulary, the four KPI tiers
2. SPMC SHARE TC Daily Activity Report — the paper form in use today; the printable is its superset
3. TC ACTIVITIES_SERVICES — standard minutes per activity per role; makes ticks measurable
4. DCODC07312026 — the only hard SLAs: 10-min acknowledge, 60-min TC response, 60-min retrieval activation. Plus the GIVE protocol
5. 2025 OTSU Calendar of Activities — the real 15-item Daily Routine and the fixed weekly cadence
6. DOD Referrals_SHARE-SPMC — referral volume 2020–2025; sets the daily denominator (~1.3/day)
7. ORGAN DONOR FLOW -DRAFT — the GCS<7 alert trigger; the top of the funnel

## The funnel

Taken from the live POMD Referral Master 2026 sheet, not inferred:

```
DBI identified (ER / ICU monitoring)
      ├── not referred ────────────►  missed case
      └── Referral (GCS<7)  →  GCS category: possible / POTENTIAL / eligible
                            →  Brain death declared  →  Family approached
                            →  Family consent  →  Actual donor
```

The DBI stage was added on 2026-08-02. It is the detection pool above referral, logged from the ER and ICU monitoring sheets, and it supplies the denominator the funnel previously lacked.

**The daily funnel is still scoped to the POTENTIAL category only** — 25 of 104 cases in 2026 YTD — and that scope is known to be wrong: all 6 family approaches and the single consent of 2026 sit in the Eligible category, none in POTENTIAL. See SHARE KPI Model, Tier 2.

## Live systems this must feed

POMD Referral Master 2026 — Google Sheet, 104 cases, with its own Dashboard / Weekly Update / Monthly Update / Charts tabs driven by an Apps Script *Organ Dashboard* menu. The printable daily sheet uses its field names and picklists so a day's paper record transcribes into it without translation. Contains patient identifiers; nothing identifying is copied into this vault.

## Provenance

Downloaded from the shared Drive folder on 2026-08-01 (782 MB, 184 files, 5 subfolders; 193 nodes after unpacking two nested zips). Working text extractions live in the session scratchpad, not in the vault.

## Open questions

- **What are the DBI criteria?** Undefined across all 193 source files. Needs a GCS threshold and a measurement point, a decision on who makes the call, and confirmation that recovered patients stay in the log.
- **Does the funnel keep its POTENTIAL-only scope?** As it stands the daily funnel cannot record an approach or a consent, because those happen after re-grading to Eligible. Recommended fix: track POTENTIAL and Eligible together.
- **Should the DCODC clocks come back?** Removing the timed referral log removed the only per-event SLA measurement on the sheet. The 10 / 60 / 60-minute targets remain in force regardless.
- **How should the sheet paginate?** It currently overflows two Letter pages. Accept the longer print, or run a compaction pass.
- Which role does the first printed version target — CTC, PTC, or a single sheet with a role toggle?
- ~~Are Consented / Utilized counts recorded anywhere?~~ **Answered** by POMD Referral Master 2026: 1 consent, 1 actual donor, 17% consent rate for 2026.
- Does the dashboard need to survive as a photocopied master (pure B&W, no fills) or will it always print in colour?
- Should the daily sheet's counts write back into the Master sheet automatically, or stay a paper-first record that a coordinator transcribes?
- The Master has 82 "Unspecified" outcomes and a *Data conflicts* column — is cleaning that backlog in scope, or strictly forward-looking from here?
- **Is the Master's sharing locked down?** On 2026-08-02 it was readable without a Google account, exposing names and HRNs for 104 patients.

