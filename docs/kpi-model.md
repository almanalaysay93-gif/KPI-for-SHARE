---
type: reference
project: SHARE KPI Dashboard
status: draft-v1
created: 2026-08-01
tags: [share-kpi, model, metrics]
---

# SHARE KPI Model

Metric definitions behind SHARE TC Daily KPI Dashboard. Every number traces to a source node — nothing invented.

## Tier 1 — Timeliness (hard SLAs)

Source: DCODC07312026. These are the only per-event time targets in the corpus.

| KPI | Definition | Target | Fail flag |
|---|---|---|---|
| Referral acknowledgement time | Call received → acknowledged | **≤ 10 min** | > 10 min |
| TC response time | Call received → coordinator responds | **≤ 60 min** | > 60 min |
| Retrieval activation time | Consented eligibility confirmed → retrieval activated | **≤ 60 min** | > 60 min |

Daily rollup: **SLA compliance %** = referrals meeting all applicable clocks ÷ referrals handled.

> **Not captured on the current sheet.** These clocks were recorded by the timed referral log, which the weekly/monthly summary replaced. The definitions stay here because the targets remain in force and the measurement should return — but as built, the sheet does not record them. See Tier 1a, which measures a different and unsourced interval.

## Tier 1a — Detection (DBI)

Devastating brain injury is the pool from which potential donors come. The funnel previously began at referral, which made it blind to the eligible patient nobody referred; DBI supplies the missing denominator.

| KPI | Definition | Target |
|---|---|---|
| DBI identified | Patients meeting DBI criteria on ER/ICU monitoring, per day, per unit | — |
| **Referral rate** | Referred ÷ DBI identified | none set |
| Referral lag | DBI identification → referral received | **none published** |
| Missed-case rate | DBI who died unreferred ÷ DBI identified | — |

Referral rate is what separates a detection problem from a conversation problem; without it the two are indistinguishable in the data.

**DBI criteria are not defined anywhere in the corpus.** GCS < 7 is the sourced referral trigger, agreed by three independent documents — it is not a DBI definition, and setting the two equal would collapse the stage back into the one below it. No threshold is coded on the sheet. The unit must set the criteria, decide who makes the call, and decide whether recovered patients stay in the log (they should — a log containing only failures cannot produce a rate).

## Tier 1b — Weekly and monthly position

Source: the Master's own Weekly Update and Monthly Update tabs, so the daily sheet reports the same measures the Sheet already publishes.

Total referred · expired · brain death declared · families approached · family consents · actual donors · **consent rate** = consents ÷ families approached.

Week runs Monday to Sunday. Both scopes count all GCS categories, as those tabs do.

## Tier 2 — Donor funnel (volume + conversion)

**Authoritative source: POMD Referral Master 2026** — the live sheet, 104 cases. It replaced the funnel I had inferred from ORGAN DONOR FLOW -DRAFT and DOD Referrals_SHARE-SPMC.

**Scope decision (2026-08-01, user):** the daily sheet tracks the **POTENTIAL** GCS category only — 25 of 104 cases in 2026 YTD. Cases graded *possible* (73) stay in the Master and are not worked daily; *eligible* (6) is the escalation target, not the intake.

| Stage | Daily count | Rate derived |
|---|---|---|
| Potential donors tracked | `P` | — |
| Escalated to eligible | `E` | Escalation rate = E ÷ P |
| Brain death declared | `B` | BD rate = B ÷ E |
| Families approached | `A` | Approach rate = A ÷ B |
| Family consents | `C` | **Consent rate = C ÷ A** |
| Actual donors | `D` | Conversion = D ÷ C |

**Programme baseline, 2026 YTD** (from the Dashboard tab): 104 referrals → 6 brain death declared → 6 families approached → 1 consent → 1 actual donor. **Consent rate 17%.** GCS split 73 possible / 25 potential / 6 eligible.

At 25 potential cases across ~30 weeks, expect **roughly one every eight days**. Most days are legitimately empty; the sheet must look purposeful when blank.

Historical referral trend (all categories, DOD Referrals_SHARE-SPMC): 2020: 127 · 2021: 0 · 2022: 52 · 2023: 87 · 2024: 316 · 2025: 483.

**2026 is running well below that.** 104 referrals over 206 days to 26 July is **0.50/day**, against the ~1.3/day the 2025 total implies — 38% of the earlier rate. By month: Jan 36, Feb 3, Mar 7, Apr 9, May 10, Jun 8, Jul 14. Either detection fell away after January or January was a backlog dump. Worth resolving before the rate is quoted in a DOH submission, since it changes the story from growth to decline.

**The bottleneck is consent, and the DNR decisions that precede any approach.** All 6 brain-death cases were approached; only 1 consented. But 17 rows record `FAMILY OPTED DNR = YES` against just 6 approaches — nearly three times as many families reached a DNR decision before donation was ever raised. If that holds, the binding constraint sits earlier than the family conversation and is a question of *when* the coordinator reaches the family, which is what Tier 1a's referral lag measures.

**The daily funnel's POTENTIAL-only scope is defective.** Conversion events by category, 2026 YTD: brain death declared — 0 possible, 2 potential, 4 Elegible; families approached — 0, **0**, 6; consents — 0, **0**, 1. Every approach and the single consent are in the Eligible category (spelled `Elegible` in the source). A daily sheet scoped to POTENTIAL would have recorded zero approaches and zero consents across seven months. Cases are re-graded as they progress: POTENTIAL is intake, Eligible is where the family conversation happens. The recommended fix is to track POTENTIAL and Eligible together so escalation reads as a state change rather than a disappearance. Unresolved.

**Documentation completeness is a real KPI.** 82 of 104 final outcomes read "Unspecified" and the Master carries a dedicated *Data conflicts* column. Percentage of closed cases with a specified outcome belongs on the monthly rollup.

**Non-conversion reason** is a required field on every referral that does not reach utilization — the DOH template asks OPOs to summarise exactly this, so capture it at the point of failure rather than reconstructing it at year end.

## Tier 3 — Activity load (standard minutes)

Source: TC ACTIVITIES_SERVICES. Each logged activity carries a standard duration, so ticks become minutes.

- **Productive minutes** = Σ (count × standard duration)
- **Workload index** = productive minutes ÷ **480** (07:00–15:00 shift)
- **Role mix** = share of minutes in Citizen's Charter service / procurement / admin+support

Ranged standards use the midpoint unless overridden:

| Activity | Range | Midpoint used |
|---|---|---|
| Entry/updating of patient records | 5–60 | 32 |
| Coordination: extraction, packaging & sendout | 60–180 | 120 |
| Daily rounds | 30–60 | 45 |
| Admission of patients | 120–240 | 180 |
| Meetings | 60–120 | 90 |

Workload index > 1.0 means the logged work exceeds the shift — either overtime, or standards need revisiting. Both are worth surfacing.

## Tier 4 — Citizen's Charter service delivery

Sources: CC OTSU 2026, 1. General Inquiry 2026, TC ACTIVITIES_SERVICES.

| Service | Published / standard time |
|---|---|
| General Inquiry | 20 min total (15 min TC + 5 min survey) |
| KT Orientation | 200–210 min |
| Request for KT Ethics Evaluation | 60 min |
| Request for Enlistment to National Waiting List | 30 min |
| Submission of Requirements for Enlistment | 60 min |

Daily KPI: **clients served** per service, and **% served within charter time**. The client satisfaction instrument is the **HCES** (Hospital Client Experience Survey), dropped anonymously — count forms issued vs clients served.

## Tier 5 — Daily routine completion

Source: 2025 OTSU Calendar of Activities, 15-item Daily Routine. Plus the 19 checkboxes already on SPMC SHARE TC Daily Activity Report.

**Routine completion %** = routine items done ÷ routine items applicable today.

Day context changes what is applicable:

| Day | Context |
|---|---|
| 1st Monday | Orientation |
| Every Tuesday | KT |
| Every Thursday | KT Clinic |
| 3rd Thursday | Ethics |
| 4th Thursday | COTA |
| Last Monday | OTSU Meeting |

## Status vocabulary (mandatory)

Source: Aimpact. Exactly five states, no substitutes:

**Completed · Ongoing · Pending · Deferred · Cancelled**

## KPI authority tiers

Source: Aimpact — every metric should be attributable to one of: **International · National · Local · Institutional**.

- International — ISN-TTS programme reporting (ISN-TTS Report - Index)
- National — DOH AO 2010-0019, RA 7170, PhilNOS reporting
- Local — Davao City Organ Donation Council (DCODC07312026)
- Institutional — SPMC OTSU Citizens Charter, job descriptions, OTSU calendar

## Privacy constraint

Data Privacy Act of 2012 (RA 10173), cited in DCODC07312026. The printed sheet carries **case ID or initials only** — never full patient names.

