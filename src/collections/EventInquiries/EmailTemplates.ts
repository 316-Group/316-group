export interface EventInquiryData {
  firstName: string
  lastName: string
  workEmail: string
  organisation: string
  jobTitle?: string
  discussionTopic: string
  preferredDay?: string
  meetingFormat?: string
  notes?: string
  sourceEventTitle?: string
  inquiryId?: string
  adminDashboardUrl?: string
}

export function generateUserConfirmationEmail(data: EventInquiryData): string {
  const { firstName, organisation, discussionTopic, preferredDay, meetingFormat, sourceEventTitle } = data
  const eventName = sourceEventTitle || 'ESMO 2026'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meeting Request Received</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 24px; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .header { background-color: #0256FF; padding: 36px 32px; color: #ffffff; text-align: left; }
    .kicker { display: inline-block; background-color: #00D2FF; color: #002B49; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 10px; border-radius: 4px; margin-bottom: 12px; }
    .title { font-size: 24px; font-weight: 700; line-height: 1.25; margin: 0; color: #ffffff; }
    .content { padding: 32px; }
    .greeting { font-size: 16px; line-height: 1.6; color: #334155; margin-bottom: 24px; }
    .summary-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px 24px; margin-bottom: 28px; }
    .summary-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0256FF; margin-top: 0; margin-bottom: 14px; }
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
    .summary-label { color: #64748b; font-weight: 500; }
    .summary-val { color: #0f172a; font-weight: 600; text-align: right; }
    .steps-section { margin-bottom: 28px; }
    .steps-heading { font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 14px; }
    .step-item { display: flex; align-items: flex-start; margin-bottom: 12px; }
    .step-num { background-color: #0256FF; color: #ffffff; font-size: 11px; font-weight: 700; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; margin-top: 1px; }
    .step-text { font-size: 13px; line-height: 1.5; color: #475569; }
    .footer { background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 32px; font-size: 12px; line-height: 1.5; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="kicker">316 Group at ${eventName}</div>
      <h1 class="title">We received your meeting request</h1>
    </div>
    <div class="content">
      <p class="greeting">
        Hello ${firstName},<br><br>
        Thank you for reaching out to 316 Group. We are excited to connect with you and ${organisation || 'your team'} during ${eventName}.
      </p>

      <div class="summary-card">
        <h3 class="summary-title">Meeting Details Requested</h3>
        <div class="summary-row">
          <span class="summary-label">Discussion Topic:</span>
          <span class="summary-val">${discussionTopic}</span>
        </div>
        ${preferredDay ? `
        <div class="summary-row">
          <span class="summary-label">Preferred Date:</span>
          <span class="summary-val">${preferredDay}</span>
        </div>` : ''}
        ${meetingFormat ? `
        <div class="summary-row">
          <span class="summary-label">Format:</span>
          <span class="summary-val">${meetingFormat}</span>
        </div>` : ''}
        <div class="summary-row">
          <span class="summary-label">Location:</span>
          <span class="summary-val">The Westin Palace, Madrid</span>
        </div>
      </div>

      <div class="steps-section">
        <div class="steps-heading">What happens next?</div>
        <div class="step-item">
          <span class="step-num">1</span>
          <span class="step-text"><strong>Reviewing your priorities:</strong> Our oncology and health solutions team is reviewing your requested discussion points.</span>
        </div>
        <div class="step-item">
          <span class="step-num">2</span>
          <span class="step-text"><strong>Coordinating with you:</strong> We'll be in touch shortly to confirm a specific time and location that fits your congress schedule.</span>
        </div>
        <div class="step-item">
          <span class="step-num">3</span>
          <span class="step-text"><strong>Meeting in Madrid:</strong> We look forward to an open, productive exchange.</span>
        </div>
      </div>

      <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin: 0;">
        If you have any questions or schedule adjustments in the meantime, simply reply directly to this email.
      </p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} 316 Group. All rights reserved.<br>
      Submitting a request does not confirm a meeting. Your details are used to coordinate your enquiry, not to register you for the congress.
    </div>
  </div>
</body>
</html>
`
}

export function generateAdminNotificationEmail(data: EventInquiryData): string {
  const {
    firstName,
    lastName,
    workEmail,
    organisation,
    jobTitle,
    discussionTopic,
    preferredDay,
    meetingFormat,
    notes,
    sourceEventTitle,
    adminDashboardUrl,
  } = data

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Event Meeting Request</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; padding: 20px; color: #0f172a; }
    .box { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #cbd5e1; padding: 24px; }
    .badge { background: #0256FF; color: #ffffff; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
    h2 { margin-top: 12px; margin-bottom: 20px; font-size: 20px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    td { padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    td.label { color: #64748b; width: 35%; font-weight: 500; }
    td.value { font-weight: 600; color: #0f172a; }
    .btn { display: inline-block; background-color: #0256FF; color: #ffffff; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; }
  </style>
</head>
<body>
  <div class="box">
    <span class="badge">New Event Meeting Request</span>
    <h2>${firstName} ${lastName} from ${organisation}</h2>
    <table>
      <tr><td class="label">Attendee Name</td><td class="value">${firstName} ${lastName}</td></tr>
      <tr><td class="label">Work Email</td><td class="value"><a href="mailto:${workEmail}">${workEmail}</a></td></tr>
      <tr><td class="label">Organisation</td><td class="value">${organisation}</td></tr>
      <tr><td class="label">Job Title</td><td class="value">${jobTitle || 'N/A'}</td></tr>
      <tr><td class="label">Discussion Topic</td><td class="value">${discussionTopic}</td></tr>
      <tr><td class="label">Preferred Day</td><td class="value">${preferredDay || 'Flexible'}</td></tr>
      <tr><td class="label">Meeting Format</td><td class="value">${meetingFormat || 'Not specified'}</td></tr>
      <tr><td class="label">Source Event</td><td class="value">${sourceEventTitle || 'ESMO 2026'}</td></tr>
      ${notes ? `<tr><td class="label">Additional Notes</td><td class="value">${notes}</td></tr>` : ''}
    </table>
    ${adminDashboardUrl ? `<a href="${adminDashboardUrl}" class="btn">View in Payload CMS &rarr;</a>` : ''}
  </div>
</body>
</html>
`
}
