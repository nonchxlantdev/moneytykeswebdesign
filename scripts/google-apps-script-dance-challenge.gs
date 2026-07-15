/**
 * MoneyTykes Dance Challenge — Google Apps Script
 * Saves form entries to a Sheet and uploads videos to a Drive folder.
 *
 * SETUP
 * 1. Create a Google Sheet. Name the first tab: Entries
 *    Header row (A1:H1):
 *    Timestamp | Parent Email | Child First Name | Child Last Name | Child Email | DigiWallet | Video File Name | Video Drive URL
 *
 * 2. Create a Google Drive folder for videos (e.g. "Dance Challenge Videos").
 *    Open the folder → copy the ID from the URL:
 *    https://drive.google.com/drive/folders/THIS_IS_THE_FOLDER_ID
 *
 * 3. Open the Sheet → Extensions → Apps Script.
 *    Delete any placeholder code and paste THIS ENTIRE FILE.
 *
 * 4. Fill in SHEET_ID and DRIVE_FOLDER_ID below.
 *    Sheet ID is in the Sheet URL:
 *    https://docs.google.com/spreadsheets/d/THIS_IS_THE_SHEET_ID/edit
 *
 * 5. Save → Deploy → New deployment
 *    Type: Web app
 *    Execute as: Me
 *    Who has access: Anyone
 *    Deploy → copy the Web App URL (/exec)
 *
 * 6. Paste that URL into the website file:
 *    src/data/danceChallenge.ts → SUBMIT_URL
 *
 * NOTE: Very large videos can fail (Apps Script size/memory limits).
 * Keep dance clips short; the site allows up to ~40MB.
 */

var SHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE'
var DRIVE_FOLDER_ID = 'PASTE_YOUR_DRIVE_FOLDER_ID_HERE'
var SHEET_TAB_NAME = 'Entries'

function doGet() {
  return jsonResponse({
    ok: true,
    message: 'MoneyTykes Dance Challenge endpoint is live.',
  })
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'Empty request body' }, 400)
    }

    var data = JSON.parse(e.postData.contents)

    // Honeypot — treat as success so bots get no signal
    if (data.website) {
      return jsonResponse({ ok: true })
    }

    var parentEmail = String(data.parentEmail || '').trim()
    var childFirstName = String(data.childFirstName || '').trim()
    var childLastName = String(data.childLastName || '').trim()
    var childEmail = String(data.childEmail || '').trim()
    var digiWalletNumber = String(data.digiWalletNumber || '').trim()
    var videoFileName = String(data.videoFileName || 'dance-video.mp4').trim()
    var videoMimeType = String(data.videoMimeType || 'video/mp4').trim()
    var videoData = String(data.videoData || '')

    if (
      !parentEmail ||
      !childFirstName ||
      !childLastName ||
      !childEmail ||
      !digiWalletNumber ||
      !videoData
    ) {
      return jsonResponse({ ok: false, error: 'Missing required fields' }, 400)
    }

    // Sanitize file name a bit
    videoFileName = videoFileName.replace(/[\\\/:*?"<>|]/g, '_').slice(0, 180)
    var stampedName =
      Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss') +
      '_' +
      childFirstName +
      '-' +
      childLastName +
      '_' +
      videoFileName

    var folder = DriveApp.getFolderById(DRIVE_FOLDER_ID)
    var decoded = Utilities.base64Decode(videoData)
    var blob = Utilities.newBlob(decoded, videoMimeType, stampedName)
    var file = folder.createFile(blob)
    var videoUrl = file.getUrl()

    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_TAB_NAME)
    if (!sheet) {
      sheet = SpreadsheetApp.openById(SHEET_ID).insertSheet(SHEET_TAB_NAME)
      sheet.appendRow([
        'Timestamp',
        'Parent Email',
        'Child First Name',
        'Child Last Name',
        'Child Email',
        'DigiWallet',
        'Video File Name',
        'Video Drive URL',
      ])
    }

    sheet.appendRow([
      new Date(),
      parentEmail,
      childFirstName,
      childLastName,
      childEmail,
      digiWalletNumber,
      file.getName(),
      videoUrl,
    ])

    return jsonResponse({
      ok: true,
      videoUrl: videoUrl,
    })
  } catch (err) {
    return jsonResponse(
      {
        ok: false,
        error: String(err && err.message ? err.message : err),
      },
      500
    )
  }
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  )
}
