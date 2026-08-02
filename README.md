# KPI for SHARE

An interactive, printable daily KPI and activity monitoring sheet for the **SHARE Transplant Coordinator** at the Organ Transplant Services Unit (OTSU), Southern Philippines Medical Center — DOH Regional Health Office XI, Davao City.

One self-contained HTML file. No build step, no dependencies, no network calls. Open it in a browser, fill it in, print it on US Letter.

**[▶ Open the dashboard](https://almanalaysay93-gif.github.io/KPI-for-SHARE/)** (enable GitHub Pages on the `main` branch to activate this link)

---

## Why it exists

The unit's existing daily form has 19 checkboxes. It records *that* an activity happened — never how many, how fast, or against what target. There are no counts, no minutes, no service-level clocks, and no donor-funnel numbers.

This sheet is a superset of that form. It keeps every original checkbox, the letterhead, and the `Prepared by` / `Noted by` sign-off blocks, so the printed page stays official and signable. Then it adds the measurement the paper form was missing.

## What it does

**Page 1 — the measured day**

- Identity strip with a role selector (CTC / PTC·RN / PTC·MD) that rewrites the activity table and its time standards
- Day context derived from the date — Orientation, KT, KT Clinic, Ethics, COTA, OTSU Meeting
- Four auto-computed KPI tiles: referral rate, potential donors today, workload index, routine completion
- **DBI monitoring** — the detection pool above referral. Log ER and ICU cases meeting devastating-brain-injury criteria with identification and referral times; the sheet derives referral rate and referral lag
- **Weekly & monthly update** — the position from the POMD Referral Master, mirroring its own Weekly Update and Monthly Update tabs, with a derived consent rate against a 2026 YTD column
- **POMD funnel** with conversion rates between every stage, led by the two DBI stages
- Citizen's Charter service counts against published charter times

**Page 2 — the worked day**

- All 16 OTSU standing daily-routine tasks, each with a five-state status
- The 12 administration and outreach checkboxes carried from the original form
- Role-specific activity log: count × standard minutes → productive minutes → workload index
- **Auto-generated narrative accomplishment report**
- Free text, sign-off, and a privacy footnote

## Auto-narrative

Ticking a box does not just record a tick — it writes a sentence. Tick *Visibility / relationship rounds*:

> Conducted visibility and relationship rounds in high-yield units (ICU, ER, Neuro) to build rapport and maintain a strong SHARE presence.

Routine items inflect by status:

| Status | Sentence |
|---|---|
| Completed | Completed PMOD rounds. |
| Ongoing | Scheduling and send-out of blood samples to NKTI is ongoing and carries over to the next shift. |
| Pending | Referral to Ethics remains pending and has not been started. |
| Deferred | Advocacy work for deceased organ donation was deferred to a later date. |
| Cancelled | Quality control was cancelled for the day. |

Counts and clocks narrate themselves too:

> 3 patients meeting DBI criteria were identified under ER and ICU monitoring — 1 in ICU and 2 in ER. 2 referred to SHARE, a referral rate of 67%, with referral lag ranging from 12 to 30 minutes. 1 case was not referred. DBI case 2180512 (ER, GCS 7) identified at 10:15 was not referred; reason recorded as family already DNR.

The report is **prose, not bullets**. Each section is a paragraph: the 16 routine items collapse by status with agreeing verbs, activities carry their standard minutes and close with the shift arithmetic, and the opening line states the role, the charter shift and the day's scheduled context.

Everything compiles into one report at the foot of page 2, grouped into sections, with a copy button for pasting into monthly submissions.

The generation is **deterministic**, not predictive — the sentence is fixed per item and the numbers are the coordinator's own. That makes it defensible in a DOH report in a way a language model's guess would not be.

## Master import

A collapsible panel reads the unit's referral master spreadsheet and **counts** it. Copy the header row plus the month's rows, paste, build.

- Columns matched **by name**, not position — reorder the source and it still works
- Tab-separated (a direct spreadsheet copy) and CSV both parse, including quoted fields
- Fills the week (Monday–Sunday around the sheet date) and month totals, across all GCS categories, as the Master's own tabs count them
- Fills the daily funnel from **POTENTIAL** cases dated on the sheet date
- Dates normalise from both `2026-01-03` and `1/3/2026`, and tolerate the Master's pipe-joined conflict cells; rows with an unreadable date are reported and excluded
- **No case detail is written to the sheet** — rows are tallied, not copied

## Privacy

Built to the **Data Privacy Act of 2012 (RA 10173)**.

- The import counts rows and discards them. No patient identifier — not even the hospital record number — is written to a field, saved, or printed by the import.
- Parsing happens entirely in the page. The file makes **zero network requests** — no `fetch`, no `XMLHttpRequest`, no external scripts, styles, or fonts.
- Saved days live in that one browser's `localStorage` under `share-tc-dash:YYYY-MM-DD`. Nothing is transmitted anywhere.
- **No patient data is contained in this repository.** It ships the tool, not the records.

## Standards it measures against

| Target | Source |
|---|---|
| GCS < 7 referral trigger (GIVE protocol) | DCODC guidelines; unit organ donor flow |
| Per-activity standard minutes, by role | OTSU TC activities and services schedule |
| 16-item daily routine, fixed weekly cadence | OTSU calendar of activities |
| Citizen's Charter service times, 07:00–15:00 shift | OTSU Citizens Charter |
| Weekly and monthly measures | POMD Referral Master, Weekly Update and Monthly Update tabs |

**Not currently measured.** The DCODC per-event clocks — acknowledgement ≤ 10 min, coordinator response ≤ 60 min, retrieval activation ≤ 60 min — were recorded by the timed referral log, which this version replaces with the weekly and monthly summary. They are the only hard time targets in the source corpus and nothing on the sheet now captures them. Referral lag on the DBI block measures a different interval (identification → referral received) and has no published target.

## Documentation

| File | What's in it |
|---|---|
| [docs/overview.md](docs/overview.md) | Project map, who it's for, the funnel, open questions |
| [docs/kpi-model.md](docs/kpi-model.md) | Every metric definition, target, and formula |
| [docs/dashboard.md](docs/dashboard.md) | Feature-by-feature reference and known limits |
| [docs/design-notes.md](docs/design-notes.md) | Why it's shaped this way; what the source documents revealed |

## Running it

Open `index.html` in any browser. That is the whole install.

To serve it locally:

```bash
python -m http.server 8798
```

## Status

Working v2. Light theme only — the sheet is a printable form and ignores the viewer's OS theme. Funnel rates, DBI referral rate and lag, workload index, narrative generation, autosave and the Master import have all been exercised; the import was verified against the live 104-row Master for two sample weeks, every cell matching an independent calculation.

Known limits are listed in [docs/dashboard.md](docs/dashboard.md) — chiefly that DBI criteria and the reason codes need unit sign-off, that ranged activity durations use midpoints, that the DCODC clocks are no longer captured, and that the sheet currently overflows two printed pages.
