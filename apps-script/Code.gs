/**
 * SHARE TC Daily KPI Dashboard - cloud sync backend.
 *
 * Deploy this bound to its OWN Google Sheet - never the POMD Referral
 * Master. This stores one row per date: coordinator name, role, routine
 * statuses, DBI counts, charter counts, admin checkboxes, the narrative
 * text. None of it is patient-identifiable; it is the coordinator's own
 * daily-activity record, not case data.
 *
 * Setup: see README.md in this folder.
 */

var SHEET_NAME = "Days";

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Date", "JSON", "Last updated"]);
  }
  return sheet;
}

function findRow_(sheet, date) {
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === date) { return i + 1; } // 1-indexed sheet row
  }
  return -1;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  e = e || {};
  var date = (e.parameter || {}).date;
  if (!date) { return json_({ error: "missing date" }); }

  var sheet = getSheet_();
  var row = findRow_(sheet, date);
  if (row === -1) { return json_({ found: false }); }

  var raw = sheet.getRange(row, 2).getValue();
  try {
    return json_({ found: true, data: JSON.parse(raw) });
  } catch (err) {
    return json_({ found: false, error: "stored value was not valid JSON" });
  }
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse((e || {}).postData.contents);
  } catch (err) {
    return json_({ ok: false, error: "invalid JSON body (this endpoint expects a real POST, not the editor's Run button)" });
  }

  var date = body.date;
  var data = body.data;
  if (!date || !data) { return json_({ ok: false, error: "missing date or data" }); }

  var sheet = getSheet_();
  var row = findRow_(sheet, date);
  var payload = JSON.stringify(data);
  var now = new Date().toISOString();

  if (row === -1) {
    sheet.appendRow([date, payload, now]);
  } else {
    sheet.getRange(row, 2).setValue(payload);
    sheet.getRange(row, 3).setValue(now);
  }

  return json_({ ok: true });
}
