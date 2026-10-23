import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  generateUserWebinarReplayEmail,
  generateAdminWebinarNotificationEmail,
} from '@/collections/WebinarRecapSubmissions/EmailTemplates'
import { getServerSideURL } from '@/utilities/getURL'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()

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
      consentAccepted,
      sourceWebinarTitle,
      sourceWebinarSlug,
      formFieldLabels,
    } = body

    // 1. Validation
    if (!workEmail || typeof workEmail !== 'string' || !workEmail.includes('@')) {
      return NextResponse.json(
        { error: 'A valid work email address is required.' },
        { status: 400 },
      )
    }

    if (!consentAccepted) {
      return NextResponse.json(
        { error: 'Please accept the privacy policy agreement to receive webinar recording access.' },
        { status: 400 },
      )
    }

    const serverUrl = getServerSideURL()

    // 2. Persist in webinar-recap-submissions collection
    const submission = await payload.create({
      collection: 'webinar-recap-submissions',
      overrideAccess: true,
      data: {
        firstName: firstName || 'Valued',
        lastName: lastName || 'Guest',
        workEmail,
        organisation: organisation || '',
        jobTitle: jobTitle || '',
        sector: sector || '',
        discussionTopic: discussionTopic || '',
        viewingTime: viewingTime || '',
        followUpPreference: followUpPreference || '',
        notes: notes || '',
        consentAccepted: Boolean(consentAccepted),
        sourceWebinarTitle: sourceWebinarTitle || 'FinNext 2026 Webinar',
        sourceWebinarSlug: sourceWebinarSlug || 'finnext-2026',
        formFieldLabels: formFieldLabels || {},
        status: 'new',
      },
    })

    const adminDashboardUrl = `${serverUrl}/admin/collections/webinar-recap-submissions/${submission.id}`

    // 3. Dispatch Requester Confirmation Email
    try {
      const userHtml = generateUserWebinarReplayEmail({
        firstName: firstName || 'there',
        lastName: lastName || '',
        workEmail,
        organisation,
        jobTitle,
        sector,
        discussionTopic,
        viewingTime,
        followUpPreference,
        notes,
        sourceWebinarTitle,
        submissionId: String(submission.id),
      })

      await payload.sendEmail({
        to: workEmail,
        subject: `Your recording access for ${sourceWebinarTitle || '316 Group Webinar'}`,
        html: userHtml,
      })
    } catch (emailErr) {
      console.error('Failed to dispatch webinar replay confirmation email to user:', emailErr)
    }

    // 4. Dispatch Admin Notification Email
    try {
      const adminHtml = generateAdminWebinarNotificationEmail({
        firstName: firstName || '—',
        lastName: lastName || '—',
        workEmail,
        organisation: organisation || '—',
        jobTitle: jobTitle || '—',
        sector: sector || '—',
        discussionTopic: discussionTopic || '—',
        viewingTime: viewingTime || '—',
        followUpPreference: followUpPreference || '—',
        notes: notes || '',
        sourceWebinarTitle: sourceWebinarTitle || 'Webinar',
        submissionId: String(submission.id),
        adminDashboardUrl,
      })

      const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'contact@316group.co.uk'
      await payload.sendEmail({
        to: adminEmail,
        subject: `[Webinar Replay Request] ${firstName} ${lastName} (${organisation || workEmail})`,
        html: adminHtml,
      })
    } catch (adminEmailErr) {
      console.error('Failed to dispatch admin notification email:', adminEmailErr)
    }

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      message: 'Your registration was successful. Please check your inbox for recording access.',
    })
  } catch (error: any) {
    console.error('Error handling webinar recap submission:', error)
    return NextResponse.json(
      { error: error?.message || 'An unexpected error occurred while processing your request.' },
      { status: 500 },
    )
  }
}
