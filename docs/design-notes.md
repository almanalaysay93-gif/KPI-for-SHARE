---
type: brainstorm
project: SHARE KPI Dashboard
status: open
created: 2026-08-01
tags: [share-kpi, brainstorm]
---

# SHARE KPI Brainstorm

Working notes from reading all 193 source files. Companion to SHARE KPI Dashboard - MOC.

## What the corpus actually told us

**The project already has a name and a spec.** Aimpact — *AI-Integrated Monitoring of Performance, Activity, Coordination, & Time*. Ten required components, a five-state status vocabulary, and four KPI authority tiers. It was written as a wish; v1 of the dashboard implements the paper-achievable half of it.

**The existing daily form under-measures the job.** SPMC SHARE TC Daily Activity Report has 19 checkboxes. The OTSU Daily Routine in 2025 OTSU Calendar of Activities has 16 items, and **seven of them have no home on the form** — PMOD rounds, blood send-out to NKTI, post-KT evaluation, Zpackage Navigator referral, Ethics referral, donor screening before Ethics, biopsy charge slip and LOA. Work that is not on the form is work that never appears in a report.

**Only one document contains hard time targets.** DCODC07312026: acknowledge in 10 minutes, coordinator responds in 60, retrieval activates in 60. Nothing else in 193 files sets a clock. That scarcity is why the referral log gets the most prominent block on page 1 — it is the only place the sheet can record a measurable failure.

**Three documents independently agree on GCS < 7.** The DCODC guidelines, ORGAN DONOR FLOW -DRAFT, and the EMR-DAS workplan. One summary line in DCODC says "GCS ≤ 5" — a drafting slip, outvoted 3-to-1.

**The volume is small and the growth is steep.** 2020: 127 referrals. 2021: 0. 2022: 52. 2023: 87. 2024: 316. 2025: 483. A day is ~1.3 referrals. Design for a sheet that is mostly empty and still looks purposeful — a dashboard that only reads well when full is the wrong shape for this unit.

## Design decisions and why

**Two pages, not one.** One Letter page cannot hold the SLA log, the funnel, the charter counts, 16 routine items, 12 checkboxes, a 20-row time log and two signatures without shrinking type below what a night-shift coordinator can read. Page 1 is the measured day (what a supervisor scans); page 2 is the worked day (what the coordinator fills in).

**Role selector rather than three separate forms.** TC ACTIVITIES_SERVICES defines three role blocks with different standard minutes. Three PDFs would drift apart. One sheet with a role toggle keeps the taxonomy in one place.

**Standard minutes turn ticks into a number.** This is the single highest-leverage idea in the corpus. A checkbox says "I did rounds". `45 × 2 = 90 min` says how much of the shift rounds consumed. Sum it and you get a workload index against the 480-minute charter shift — a defensible answer to "is this post under-resourced?"

**Day context printed on the sheet.** A Tuesday (KT day) and a 4th Thursday (COTA) are different jobs. A flat daily form judges both against the same expectation and is wrong twice.

**Colour is semantic, never decorative.** Green/amber/red mean met/at-risk/breached and nothing else. The accent teal is a separate hue so a breach can never be confused with a heading.

**Light theme only, from 2026-08-02.** The sheet is a printable form. A viewer's OS theme should not change how an official document reads, so the dark palette was removed rather than kept in sync.

## What the live Master added, 2026-08-02

Reading the POMD Referral Master itself — rather than the documents describing it — changed three things.

**Detection had no denominator.** Every rate on the sheet was conditional on a referral already existing, which made the whole funnel blind to the patient nobody referred. DBI became a stage above referral for that reason, and referral rate is the number it exists to produce.

**The POTENTIAL-only scope cannot work.** All 6 approaches and the 1 consent of 2026 are in the Eligible category; POTENTIAL has none. Scoping the daily funnel to POTENTIAL guarantees a permanently empty bottom half. The scope decision recorded in the KPI model predates this evidence and is now known to be wrong.

**The timed log came out at the coordinator's request** and was replaced by a weekly and monthly summary drawn from the Master's own Update tabs. That is a real loss: the DCODC clocks were the only place the sheet could record a measurable failure, and nothing now captures them. It is recorded here so the trade-off is not rediscovered later as a bug.

Data-quality findings from the same review — the `Elegible` misspelling on every eligible row, `EXPIRED` and `DNR/EXPIRY` disagreeing on who died, 31 spellings of ~10 room names, 5 unreadable referral dates, and 82 of 104 outcomes blank — are documented outside this repository, since the working files contain patient data.

## Open questions for the coordinator

1. **Non-conversion reason codes.** The 8 options on the sheet are inferred. What does OTSU actually record? This is the field most likely to be wrong.
2. **Are Consented / Utilized counts kept anywhere?** DOD Referrals_SHARE-SPMC has the template with the cells blank. Without them the consent and utilization rates have no historical baseline to compare a day against.
3. **Who signs, and how often?** Daily supervisor sign-off, or weekly batch? Changes whether the signature block belongs on every sheet.
4. **Colour or photocopy?** If the master gets photocopied in B&W, the severity stripes need a second non-colour cue (hatching or a symbol).
5. **Which role first?** CTC and PTC do genuinely different jobs. If only one gets piloted, which?
6. **Is 5 referral rows enough** on the worst day, not the average one?

## Where this goes next

**Near term — validate on paper.** Print a week of sheets, have a coordinator fill them, and check three things: do the standard minutes match reality, do the SLA clocks get filled in during a live referral, and does anything get written in "Others" that deserves its own row.

**Medium — monthly rollup.** The DCODC guidelines require monthly, quarterly and annual reports with performance against targets. A second sheet that aggregates 20 daily sheets into that format is the obvious follow-on, and it is what makes the daily discipline pay off.

**Long — the actual AimPact.** The "Autopredict" columns in Aimpact need a digital form with history behind it. The paper layout was designed to map 1:1 onto that form, so the field list should survive the transition intact. The EMR-DAS project (DAS_Detailed, workplan) is the natural host — its own deliverable is an OTSU dashboard inside the hospital information system, and the alert counts on this sheet are exactly what it would emit automatically.

**Worth noting:** the NICER SHARE ethics work (SHAREd Program Tracker) already runs a compliance-rate dashboard pattern — pending / approved / compliance %, per project, per requirement. Same mental model, different domain. Whoever built that tracker is the right reviewer for this one.

