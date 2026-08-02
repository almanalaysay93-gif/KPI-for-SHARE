---
type: deliverable
project: SHARE KPI Dashboard
status: v1
created: 2026-08-01
format: single-file HTML, US Letter portrait
local_file: "index.html"
tags: [share-kpi, deliverable, dashboard, printable]
---

# SHARE TC Daily KPI Dashboard

The deliverable. Part of SHARE KPI Dashboard - MOC; metric definitions in SHARE KPI Model.

**Live:** open `index.html`, or the GitHub Pages URL for this repo
**Local:** `SHARE TC Daily KPI Dashboard.html` (this folder) — self-contained, works offline, no dependencies.

## What it is

A single HTML file that behaves as an interactive form on screen and prints as a clean two-page US-Letter sheet a supervisor can sign. Replaces and extends SPMC SHARE TC Daily Activity Report.

## Page 1 — the measured day

| Block | What it does |
|---|---|
| DOH / SPMC / OTSU letterhead | Preserved from the existing form so the printed sheet stays official |
| Identity strip | Date, coordinator, **role selector** (CTC / PTC·RN / PTC·MD), auto-detected day context |
| Daily performance summary | Four auto-computed tiles: SLA compliance, referrals today, workload index, routine completion. Colour + left stripe encode state |
| Alert & referral log | 5 timed rows. Enter received / acknowledged / TC-responded times; the sheet computes the deltas and flags breaches of the 10-min and 60-min targets in red |
| Donor funnel | Alerts → validated → referrals → consents → utilized, with conversion rates computed between each stage |
| Citizen's Charter services | Clients served, served within charter time, HCES forms issued, against published charter times |

## Page 2 — the worked day

| Block | What it does |
|---|---|
| Daily routine | All 16 OTSU standing tasks, each with the 5-state status selector |
| Routine admin & outreach | The 12 checkboxes carried verbatim from the existing paper form |
| Activity & time log | Role-specific activity list with standard minutes; count × standard = subtotal, summed to productive minutes and the workload index |
| **Narrative accomplishment report** | Auto-written prose compiled from every entry on both sheets, grouped by section, with a copy button |
| Others | Free text for anything unlisted, including incidents and near-misses |
| Sign-off | Prepared by / Noted by, as on the original form |
| Privacy footnote | RA 10173 reminder: case IDs or initials only |

## Auto-narrative — the AimPact "Accomplishment / Output" component

Ticking a box does not just record a tick. Every checkbox, status selector and count carries a written sentence that appears the moment it is set, and all of them compile into a **Narrative accomplishment report** at the foot of page 2.

**Inline.** Tick *Visibility / relationship rounds* and this appears beneath it:

> Conducted visibility and relationship rounds in high-yield units (ICU, ER, Neuro) to build rapport and maintain a strong SHARE presence.

**Tense follows status.** The 16 routine items inflect against the five-state vocabulary:

| Status | Sentence |
|---|---|
| Completed | Completed PMOD rounds. |
| Ongoing | Scheduling and send-out of blood samples to NKTI is ongoing and carries over to the next shift. |
| Pending | Referral to Ethics remains pending and has not been started. |
| Deferred | Advocacy work for deceased organ donation was deferred to a later date. |
| Cancelled | Quality control was cancelled for the day. |

**Data becomes prose.** Referral rows, funnel counts, charter counts and activity counts all narrate themselves with their own numbers and SLA verdicts:

> Case RJ-0412 (ICU, GCS 5): referral received at 08:00; acknowledged at 08:06 (6 min, within the 10-minute target); coordinator responded at 09:20 (80 min, exceeding the 60-minute target). Outcome: not converted. Non-conversion reason recorded as family refusal.

> 8 GCS-under-7 alerts received, 6 validated by OTSU, 3 progressed to DOD referral, 2 family consents obtained, 1 donor utilized. Consent rate 67%, utilization rate 50%, alert-to-referral conversion 38%.

> Logged 3 x general inquiry at 20 standard min each, 60 min total (completed).

This is the paper-achievable half of Aimpact's *Accomplishment or Output — Autopredict* and *Remarks — Autopredict*. It is deterministic, not predictive: the sentence is fixed per item, the numbers are the coordinator's own. That makes it defensible in a report in a way a language model's guess would not be.

The compiled report prints with the sheet and copies to the clipboard as plain text, so it can be pasted straight into a monthly submission.

## POMD Master integration

A collapsible **Load from POMD Referral Master 2026** panel sits above the sheet. It never prints.

**Workflow:** in the Sheet's `Master` tab, select the header row plus the rows you want → copy → paste → Import.

- **Columns are matched by name, not position.** Reorder or add columns in the Master and the import still works. It looks for `HRN`, `ROOM`, `GCS UPON REFERRAL`, `GCS CATEGORY`, `DATE OF REFERRAL`, `BRAIN DEATH DECLARED`, `FAMILY APPROACHED`, `FAMILY CONSENT`, `FAMILY OPTED DNR`, `ORGANS DONATED`, `FINAL OUTCOME / STATUS`.
- **Tab-separated (a direct Sheets copy) and CSV both parse**, including quoted fields with embedded commas.
- **Only POTENTIAL cases import.** Possible and eligible rows are counted and reported as skipped.
- **Two scopes:** cases referred on the sheet's date, or every potential case in the paste (for carry-over monitoring).
- **The log grows** past its default five rows when the paste needs more.
- **Dates normalise** from both `2026-01-03` and `1/3/2026`.

**Privacy is enforced at the boundary.** The `NAME` column is read and discarded — it is never written to a field, never saved to localStorage, never printed. Only the HRN carries through. Parsing is entirely in-page; nothing is transmitted.

**Outcome mapping** — the Master's vocabulary onto this sheet's picklist:

| Master value | Imported as |
|---|---|
| Organs donated non-empty, or outcome contains "donor" | Actual donor |
| contains "DNR" | DNR |
| contains "expired" | Expired |
| contains "recovered" | Recovered |
| contains "pending" | Pending |
| blank, but brain death declared = YES | Brain death declared |
| blank | Monitoring |

Family consent reading `NO - Refused` sets the non-conversion reason to **Family refusal**; family opted DNR sets **DNR / family opted DNR**.

**What import cannot fill, and says so:** the acknowledgement and TC-response clocks (the Master records no timestamps — this is precisely the gap the daily sheet exists to close), and *escalated to eligible* (a case re-graded Eligible in the Master no longer matches a potential-only import, so it must be entered by hand).

## Behaviour

- **Role selector rewrites the activity table.** CTC gets the 20-row clinical list; PTC·RN and PTC·MD get their 15-row procurement lists with their own standard minutes.
- **Day context is derived from the date.** 1st Monday → Orientation. Tuesday → Kidney transplant. Thursday → KT clinic, +Ethics on the 3rd, +COTA on the 4th. Last Monday → OTSU meeting. Weekends flagged as outside charter hours.
- **SLA deltas handle midnight rollover** — a 23:50 referral acknowledged at 00:05 correctly reads 15 min, not negative.
- **Autosave per date** in browser localStorage, keyed `share-tc-dash:YYYY-MM-DD`. Changing the date loads that day's saved entry.
- **Print** forces a light, ink-economical palette; controls disappear, checkboxes print as crossed boxes, severity stripes become left borders.

## Verified

Tested in-browser 2026-08-01 with sample data: 6-min ack passed, 80-min response failed, 15-min cross-midnight ack failed → SLA 1 of 3 clocks = 33%. Activity 20×3 + 210 = 270 min → index 0.56. Funnel 2/3 = 67% consent, 1/2 = 50% utilization. Routine 8/16 = 50%. Light and dark themes both render.

Auto-narrative verified separately: inline sentences reveal only for ticked or status-set items and stay hidden otherwise; all five status tenses render correctly; the compiled report groups into Donor detection & referral / Funnel summary / Citizen's Charter services / Daily routine / Administration, coordination & outreach / Activity & time log / Other activities. No horizontal overflow.

## Traceability

Every number on the sheet comes from a source node — nothing invented:

- 10 / 60 / 60-minute SLAs, GIVE protocol, GCS<7 → DCODC07312026
- Standard minutes per activity per role → TC ACTIVITIES_SERVICES
- 16-item daily routine, fixed weekly cadence → 2025 OTSU Calendar of Activities
- 19 checkboxes, letterhead, sign-off blocks → SPMC SHARE TC Daily Activity Report
- Referral baseline 1.3/day → DOD Referrals_SHARE-SPMC
- Alert workflow and funnel top → ORGAN DONOR FLOW -DRAFT
- Required fields and the 5-state status vocabulary → Aimpact
- Charter times and 07:00–15:00 shift → CC OTSU 2026, 1. General Inquiry 2026

## Known limits

- **Non-conversion reasons are inferred**, not sourced. The DOH template in DOD Referrals_SHARE-SPMC asks for the summary but supplies no coded list. The 8 options on the sheet are a first draft and need OTSU sign-off.
- **Ranged standard durations use midpoints** (records 32, extraction 120, rounds 45, admission 180, meetings 90). Real distributions may be skewed.
- **Five referral rows** fits the 1.3/day baseline. A mass-casualty day would overflow the sheet.
- localStorage is per browser and per device. It is a convenience, not a record system — the printed signed sheet remains the record.


