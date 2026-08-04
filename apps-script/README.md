# Cloud sync backend - setup

This makes the KPI dashboard reachable from more than one browser/device,
using a Google Sheet as the database and Google Apps Script as the API.
It is a separate spreadsheet from the POMD Referral Master - keep it that
way. Nothing patient-identifiable is stored here.

## 1. Create the Sheet

1. Go to [sheets.google.com](https://sheets.google.com), create a **new,
   blank spreadsheet**. Name it something like `SHARE KPI Dashboard - Cloud Sync`.
2. Do not add any tabs or columns yourself - the script creates a `Days`
   tab automatically the first time it saves.

## 2. Add the script

1. In that spreadsheet, go to **Extensions → Apps Script**.
2. Delete the placeholder `myFunction() {}` code.
3. Paste in the contents of [`Code.gs`](./Code.gs) from this folder.
4. Click the disk icon (or Ctrl/Cmd+S) to save. Name the project anything.

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me (your account)
   - **Who has access:** Anyone
     (this makes the *API endpoint* public, not the Sheet itself - the
     Sheet's own sharing stays whatever you set it to separately. Anyone
     with the exact, long, random deployment URL can read/write dashboard
     entries; nobody can browse or guess their way into it without that
     URL.)
4. Click **Deploy**. The first time, Google will ask you to authorize the
   script - click through the "unverified app" warning (this is normal
   for a script you wrote yourself; click **Advanced → Go to (project
   name), unsafe**).
5. Copy the **Web app URL** it gives you - looks like
   `https://script.google.com/macros/s/AKfycb.../exec`.

## 4. Connect the dashboard

1. Open the KPI dashboard, expand **Cloud sync (Google Sheets backend)**
   near the top.
2. Paste the Web app URL in, click **Save URL**.
3. The status line should change to "Loaded from cloud..." or "No cloud
   entry for [date] yet" within a second or two. If it instead says
   "Could not reach cloud backend," re-check the URL and the deployment's
   access setting.

## Updating the script later

If you ever edit `Code.gs` again (in the Apps Script editor), you must
**Deploy → Manage deployments → edit (pencil) → New version** for the
change to take effect - saving the file alone does not update the live
Web App.

## What gets synced

Everything the dashboard already saves per day: coordinator name, role,
DBI/funnel/charter counts, routine task statuses and times, admin
checkboxes, others text, and the narrative (including hand-edited
narratives). No patient names, HRNs, or diagnoses - the dashboard never
collects those in the first place.
