---
type: deliverable
project: SHARE KPI Dashboard
status: v2
created: 2026-08-01
updated: 2026-08-02
format: single-file HTML, US Letter portrait
local_file: "index.html"
tags: [share-kpi, deliverable, dashboard, printable]
---

# SHARE TC Daily KPI Dashboard

The deliverable. Part of SHARE KPI Dashboard - MOC; metric definitions in SHARE KPI Model.

**Live:** open `index.html`, or the GitHub Pages URL for this repo
**Local:** `index.html` (repository root) — self-contained, works offline, no dependencies.

## What it is

A single HTML file that behaves as an interactive form on screen and prints as a US-Letter sheet a supervisor can sign. Replaces and extends SPMC SHARE TC Daily Activity Report. It was designed as two pages and currently overflows that — see Known limits.

## Page 1 — the measured day

| Block | What it does |
|---|---|
| DOH / SPMC / OTSU letterhead | Preserved from the existing form so the printed sheet stays official |
| Identity strip | Date, coordinator, **role selector** (CTC / PTC·RN / PTC·MD), auto-detected day context |
| Daily performance summary | Four auto-computed tiles: referral rate, potential donors today, workload index, routine completion. Colour + left stripe encode state |
| DBI monitoring | 3 rows, ER and ICU. Case ID, unit, GCS, identification time, referred Y/N, referral time, **lag**, reason not referred, outcome. Derives DBI identified, referred, referral rate and lag range |
| Weekly & monthly update | Total referred, expired, brain death declared, families approached, consents, actual donors, and a derived consent rate — for the week, the month, and 2026 YTD. Mirrors the Master's Weekly Update and Monthly Update tabs |
| Donor funnel | Eight stages in two rows, led by DBI identified → referred to SHARE (both derived from the log above), then potential → eligible → brain death → approached → consent → actual donor, with conversion rates between each |
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

**Data becomes prose.** DBI rows, weekly and monthly counts, funnel counts, charter counts and activity counts all narrate themselves with their own numbers:

> 3 patients meeting DBI criteria were identified under ER and ICU monitoring — 1 in ICU and 2 in ER. 2 referred to SHARE, a referral rate of 67%, with referral lag ranging from 12 to 30 minutes. 1 case was not referred. DBI case 2180512 (ER, GCS 7) identified at 10:15 was not referred; reason recorded as family already DNR.

> For the month to date, the POMD Referral Master records 17 patients referred, of which 16 expired, 4 with brain death declared, 2 families approached, 1 consent obtained and 1 actual donor. Consent rate 50%.

> Logged 3 instances of general inquiry at a standard 20 minutes each, 60 minutes in total, recorded as completed.

**Sections are paragraphs, not lists.** The 16 routine items collapse by status into at most five sentences with agreeing verbs — *"Referral to Ethics and donor screening prior to Ethics review remain pending and have not been started."* Labels lowercase mid-sentence without flattening acronyms: KT, NKTI, OTSU, DNR and OR keep their case.

This is the paper-achievable half of Aimpact's *Accomplishment or Output — Autopredict* and *Remarks — Autopredict*. It is deterministic, not predictive: the sentence is fixed per item, the numbers are the coordinator's own. That makes it defensible in a report in a way a language model's guess would not be.

The compiled report prints with the sheet and copies to the clipboard as plain text, so it can be pasted straight into a monthly submission.

## POMD Master integration

A collapsible **Load from POMD Referral Master 2026** panel sits above the sheet. It never prints.

**Workflow:** in the Sheet's `Master` tab, select the header row plus the month's rows → copy → paste → *Build week & month totals*.

- **Columns are matched by name, not position.** Reorder or add columns in the Master and it still works. It looks for `DATE OF REFERRAL` (required), `GCS CATEGORY`, `EXPIRED`, `BRAIN DEATH DECLARED`, `FAMILY APPROACHED`, `FAMILY CONSENT`, `ORGANS DONATED`, `FINAL OUTCOME / STATUS`.
- **Tab-separated (a direct Sheets copy) and CSV both parse**, including quoted fields with embedded commas.
- **Rows are counted, not copied.** The import writes six week totals, six month totals and five daily funnel counts. No case detail — no HRN, no room, no diagnosis — reaches the sheet.
- **Week is Monday to Sunday** around the sheet date, matching the Master's own Weekly Update tab. Month is the sheet date's calendar month. Both count all GCS categories, as those tabs do.
- **The daily funnel takes POTENTIAL cases dated on the sheet date only.**
- **Dates normalise** from `2026-01-03` and `1/3/2026`, and take the leading date from the Master's pipe-joined conflict cells (`2026-05-06 | 2026-05-04`). Rows whose date cannot be read are excluded from every total and reported in the status line — 5 of the 104 rows in the 2026 Master.

**Privacy is enforced at the boundary.** Nothing patient-level crosses it. Parsing is entirely in-page; nothing is transmitted.

**What import cannot fill:** *escalated to eligible* — a case re-graded Eligible in the Master no longer matches a potential-only filter, so it must be entered by hand. See the scope caveat under Known limits.

**Verified against live data.** The 104-row 2026 Master, imported at two sheet dates, against an independent calculation:

| Sheet date | Week (total / expired / BD / appr / cons / donors) | Month |
|---|---|---|
| 2026-07-22 | 9 / 2 / 1 / 1 / 0 / 0 | 14 / 4 / 1 / 1 / 0 / 0 |
| 2026-05-06 | 3 / 3 / 2 / 2 / 1 / 1 | 17 / 16 / 4 / 2 / 1 / 1 |

Every cell matched.

## Behaviour

- **Role selector rewrites the activity table.** CTC gets the 20-row clinical list; PTC·RN and PTC·MD get their 15-row procurement lists with their own standard minutes.
- **Day context is derived from the date.** 1st Monday → Orientation. Tuesday → Kidney transplant. Thursday → KT clinic, +Ethics on the 3rd, +COTA on the 4th. Last Monday → OTSU meeting. Weekends flagged as outside charter hours.
- **Referral lag handles midnight rollover** — a case identified at 23:50 and referred at 00:20 correctly reads 30 min, not negative.
- **Period header regenerates from the date** in the Master's own wording: `Week: May 4 - 10, 2026  |  Month: May 2026`.
- **Autosave per date** in browser localStorage, keyed `share-tc-dash:YYYY-MM-DD`. Changing the date loads that day's saved entry. DBI rows and the week/month totals both round-trip.
- **Light theme only.** `data-theme="light"` is pinned on the root element and the dark palette has been removed, so the viewer's OS setting cannot change how the form reads.
- **Print** forces an ink-economical palette; controls disappear, checkboxes print as crossed boxes, severity stripes become left borders.

## Verified

Tested in-browser 2026-08-02. DBI: 3 cases, 2 referred → referral rate 67%, lag 12 and 30 min (the second crossing midnight), 1 not referred with a reason. Funnel led by DBI 3 → referred 2 (`ref. 67%`) → potential 1 (`pot. 50%`). Activity 20×3 + 210 = 270 min → index 0.56. Routine 8/16. Master import matched an independent calculation on every cell at two sheet dates (see above). Save → reload → restore round-trips all DBI fields and all twelve week/month values. No console errors.

Auto-narrative verified separately: inline sentences reveal only for ticked or status-set items and stay hidden otherwise; all five status tenses render correctly; acronyms survive lowercasing; the compiled report groups into Devastating brain injury monitoring / Weekly & monthly update / Funnel summary / Citizen's Charter services / Daily routine / Administration, coordination & outreach / Activity & time log / Other activities. No horizontal overflow.

## Traceability

Every number on the sheet comes from a source node — nothing invented:

- GIVE protocol, GCS<7 referral trigger → DCODC07312026
- Standard minutes per activity per role → TC ACTIVITIES_SERVICES
- 16-item daily routine, fixed weekly cadence → 2025 OTSU Calendar of Activities
- 19 checkboxes, letterhead, sign-off blocks → SPMC SHARE TC Daily Activity Report
- Weekly and monthly measures, and the 2026 YTD column → POMD Referral Master, Weekly/Monthly Update tabs
- Alert workflow and funnel top → ORGAN DONOR FLOW -DRAFT
- Required fields and the 5-state status vocabulary → Aimpact
- Charter times and 07:00–15:00 shift → CC OTSU 2026, 1. General Inquiry 2026

## Known limits

- **The DCODC clocks are no longer captured.** Acknowledgement ≤ 10 min, response ≤ 60 min and activation ≤ 60 min are the only hard time targets in the corpus. The timed referral log recorded them; the weekly/monthly summary that replaced it does not. Nothing on the sheet now measures a per-event SLA.
- **DBI criteria are undefined in the corpus.** Nothing across the 193 source files defines devastating brain injury. GCS<7 is the *referral trigger*, not the DBI threshold, so no threshold is coded. Criteria, the unit picklist and the 8 reason-not-referred codes all need OTSU sign-off.
- **Non-conversion reasons are inferred**, not sourced. The DOH template asks for the summary but supplies no coded list.
- **The funnel's POTENTIAL-only scope excludes every conversion event of 2026.** All 6 family approaches and the single consent sit in the `Elegible` category — misspelled in the source data — while POTENTIAL holds none. A funnel scoped to POTENTIAL cannot produce a non-zero consent rate. Unresolved.
- **Ranged standard durations use midpoints** (records 32, extraction 120, rounds 45, admission 180, meetings 90). Real distributions may be skewed.
- **Three DBI rows** suits a 0.50 referrals/day programme. A mass-casualty day would overflow the block.
- **The sheet no longer fits two printed pages.** Measured under print rules, page 1 runs about 1415px against the 975px available on US Letter at 0.42in margins, and page 2 about 2448px. A compaction pass is outstanding.
- localStorage is per browser and per device. It is a convenience, not a record system — the printed signed sheet remains the record.


