export interface WebinarRecapSubmissionData {
  firstName: string
  lastName: string
  workEmail: string
  organisation: string
  jobTitle?: string
  sector?: string
  discussionTopic?: string
  viewingTime?: string
  followUpPreference?: string
  notes?: string
  sourceWebinarTitle?: string
  submissionId?: string
  adminDashboardUrl?: string
}

export function generateUserWebinarReplayEmail(data: WebinarRecapSubmissionData): string {
  const { firstName, organisation, sourceWebinarTitle, sector, discussionTopic } = data
  const webinarName = sourceWebinarTitle || 'FinNext 2026 Webinar'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Webinar Recording Access</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 24px; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .header { background-color: #0000FF; padding: 36px 32px; color: #ffffff; text-align: left; }
    .kicker { display: inline-block; background-color: #00D2FF; color: #002B49; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 10px; border-radius: 4px; margin-bottom: 12px; }
    .title { font-size: 24px; font-weight: 700; line-height: 1.25; margin: 0; color: #ffffff; }
    .content { padding: 32px; }
    .greeting { font-size: 16px; line-height: 1.6; color: #334155; margin-bottom: 24px; }
    .btn-container { text-align: center; margin: 28px 0; }
    .btn { display: inline-block; background-color: #0000FF; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,255,0.25); }
    .summary-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px 24px; margin-bottom: 28px; }
    .summary-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0000FF; margin-top: 0; margin-bottom: 14px; }
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
    .summary-label { color: #64748b; font-weight: 500; }
    .summary-val { color: #0f172a; font-weight: 600; text-align: right; }
    .footer { background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 32px; font-size: 12px; line-height: 1.5; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="kicker">ON-DEMAND REPLAY ACCESS</div>
      <h1 class="title">${webinarName}</h1>
    </div>
    <div class="content">
      <p class="greeting">
        Hello ${firstName},<br><br>
        Thank you for requesting access to the <strong>${webinarName}</strong> on-demand recording. Your access link is ready.
      </p>

      <div class="btn-container">
        <a href="https://316group.co.uk/webinars" class="btn">Watch Webinar Replay ↗</a>
      </div>

      <div class="summary-card">
        <h3 class="summary-title">Your Registration Summary</h3>
        <div class="summary-row">
          <span class="summary-label">Name:</span>
          <span class="summary-val">${firstName} (${organisation || 'Individual'})</span>
        </div>
        ${sector ? `
        <div class="summary-row">
          <span class="summary-label">Sector:</span>
          <span class="summary-val">${sector}</span>
        </div>` : ''}
        ${discussionTopic ? `
        <div class="summary-row">
          <span class="summary-label">Topic Interest:</span>
          <span class="summary-val">${discussionTopic}</span>
        </div>` : ''}
        <div class="summary-row">
          <span class="summary-label">Format:</span>
          <span class="summary-val">On-Demand High-Definition Video Replay</span>
        </div>
      </div>

      <p style="font-size: 13.5px; color: #64748b; line-height: 1.6; margin: 0;">
        If you have any questions, require specialized materials, or would like to discuss how 316 Group can support your business initiatives, reply directly to this email to connect with our specialists.
      </p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} 316 Group. All rights reserved.<br>
      This email was sent in response to your webinar recording request.
    </div>
  </div>
</body>
</html>
  `.trim()
}

export function generateAdminWebinarNotificationEmail(data: WebinarRecapSubmissionData): string {
  const {
    firstName,
    lastName,
    workEmail,
    organisation,
    jobTitle,
    sector,
    discussionTopic,
    viewingTime,
    followUpPreference,
    notes,
    sourceWebinarTitle,
    submissionId,
    adminDashboardUrl,
  } = data

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Webinar Replay Registration</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background-color: #0000FF; padding: 24px 28px; color: #ffffff; }
    .kicker { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #93c5fd; margin-bottom: 6px; }
    .title { font-size: 20px; font-weight: 700; margin: 0; color: #ffffff; }
    .content { padding: 28px; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table td { padding: 9px 12px; font-size: 13.5px; border-bottom: 1px solid #f1f5f9; }
    .label { color: #64748b; font-weight: 600; width: 38%; }
    .val { color: #0f172a; font-weight: 500; }
    .btn { display: inline-block; background-color: #0000FF; color: #ffffff !important; text-decoration: none; font-weight: 600; font-size: 13.5px; padding: 10px 20px; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="kicker">316 Group Admin Notification</div>
      <h1 class="title">New On-Demand Webinar Replay Access</h1>
    </div>
    <div class="content">
      <p style="margin-top: 0; font-size: 14.5px; color: #334155;">
        A new user has submitted the on-demand recording access form for <strong>${sourceWebinarTitle || 'Webinar'}</strong>:
      </p>

      <table class="table">
        <tr>
          <td class="label">Full Name</td>
          <td class="val">${firstName} ${lastName}</td>
        </tr>
        <tr>
          <td class="label">Work Email</td>
          <td class="val"><a href="mailto:${workEmail}">${workEmail}</a></td>
        </tr>
        <tr>
          <td class="label">Organisation</td>
          <td class="val">${organisation || '—'}</td>
        </tr>
        <tr>
          <td class="label">Job Title</td>
          <td class="val">${jobTitle || '—'}</td>
        </tr>
        <tr>
          <td class="label">Sector</td>
          <td class="val">${sector || '—'}</td>
        </tr>
        <tr>
          <td class="label">Topic Relevance</td>
          <td class="val">${discussionTopic || '—'}</td>
        </tr>
        <tr>
          <td class="label">Viewing Time</td>
          <td class="val">${viewingTime || '—'}</td>
        </tr>
        <tr>
          <td class="label">Follow-up Preference</td>
          <td class="val">${followUpPreference || '—'}</td>
        </tr>
        ${notes ? `
        <tr>
          <td class="label">Notes / Priorities</td>
          <td class="val">${notes}</td>
        </tr>` : ''}
        <tr>
          <td class="label">Submission ID</td>
          <td class="val">${submissionId || '—'}</td>
        </tr>
      </table>

      ${adminDashboardUrl ? `
      <div style="text-align: center; margin-top: 20px;">
        <a href="${adminDashboardUrl}" class="btn">View in Payload CMS Admin →</a>
      </div>` : ''}
    </div>
  </div>
</body>
</html>
  `.trim()
}
