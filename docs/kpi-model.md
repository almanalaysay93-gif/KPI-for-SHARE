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

Source: DCODC07312026. These are the only per-event time targets in the corpus, so they lead the sheet.

| KPI | Definition | Target | Fail flag |
|---|---|---|---|
| Referral acknowledgement time | Call received → acknowledged | **≤ 10 min** | > 10 min |
| TC response time | Call received → coordinator responds | **≤ 60 min** | > 60 min |
| Retrieval activation time | Consented eligibility confirmed → retrieval activated | **≤ 60 min** | > 60 min |

Daily rollup: **SLA compliance %** = referrals meeting all applicable clocks ÷ referrals handled.

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

**The bottleneck is consent, not approach.** All 6 brain-death cases were approached; only 1 consented. Any intervention aimed at raising donor numbers should target the family conversation, not detection.

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

