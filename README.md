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
- Four auto-computed KPI tiles: SLA compliance, referrals today, workload index, routine completion
- **Timed referral log** — enter received / acknowledged / responded times; the sheet computes the deltas and flags breaches of the 10-minute and 60-minute targets
- **POMD funnel** with conversion rates between every stage
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

Counts and timestamps narrate themselves too, SLA verdict included:

> Case 2180347 (Red Zone, GCS 4): referral received at 08:00; acknowledged at 08:06 (6 min, within the 10-minute target); coordinator responded at 09:20 (80 min, exceeding the 60-minute target).

Everything compiles into one report at the foot of page 2, grouped into sections, with a copy button for pasting into monthly submissions.

The generation is **deterministic**, not predictive — the sentence is fixed per item and the numbers are the coordinator's own. That makes it defensible in a DOH report in a way a language model's guess would not be.

## Referral-log import

A collapsible panel loads cases from the unit's referral master spreadsheet. Copy the header row plus the rows you want, paste, import.

- Columns matched **by name**, not position — reorder the source and it still works
- Tab-separated (a direct spreadsheet copy) and CSV both parse, including quoted fields
- Only cases in the **POTENTIAL** GCS category are imported
- Two scopes: cases referred on the sheet's date, or all potential cases in the paste
- The log grows past its default five rows when needed
- Dates normalise from both `2026-01-03` and `1/3/2026`

## Privacy

Built to the **Data Privacy Act of 2012 (RA 10173)**.

- The `NAME` column is read during import and **discarded** — never written to a field, never saved, never printed. Only the hospital record number carries through.
- Parsing happens entirely in the page. The file makes **zero network requests** — no `fetch`, no `XMLHttpRequest`, no external scripts, styles, or fonts.
- Saved days live in that one browser's `localStorage` under `share-tc-dash:YYYY-MM-DD`. Nothing is transmitted anywhere.
- **No patient data is contained in this repository.** It ships the tool, not the records.

## Standards it measures against

| Target | Source |
|---|---|
| Referral acknowledged ≤ 10 min | Davao City Organ Donation Council guidelines |
| Coordinator responds ≤ 60 min | Davao City Organ Donation Council guidelines |
| Retrieval activation ≤ 60 min | Davao City Organ Donation Council guidelines |
| GCS < 7 referral trigger (GIVE protocol) | DCODC guidelines; unit organ donor flow |
| Per-activity standard minutes, by role | OTSU TC activities and services schedule |
| 16-item daily routine, fixed weekly cadence | OTSU calendar of activities |
| Citizen's Charter service times, 07:00–15:00 shift | OTSU Citizens Charter |

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

Working v1. Verified in-browser across light and dark themes, with the SLA clocks, funnel rates, workload index, narrative generation, and spreadsheet import all exercised against sample data.

Known limits are listed in [docs/dashboard.md](docs/dashboard.md) — chiefly that non-conversion reason codes still need unit sign-off, and that ranged activity durations use midpoints.
