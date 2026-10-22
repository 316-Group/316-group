import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  generateUserConfirmationEmail,
  generateAdminNotificationEmail,
} from '@/collections/EventInquiries/EmailTemplates'
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
      discussionTopic,
      preferredDay,
      meetingFormat,
      notes,
      consentAccepted,
      sourceEventTitle,
      sourceEventSlug,
    } = body

    // 1. Validate required fields
    if (!firstName || !lastName || !workEmail || !organisation || !discussionTopic) {
      return NextResponse.json(
        { error: 'Please provide all required fields: first name, last name, work email, organisation, and discussion topic.' },
        { status: 400 },
      )
    }

    if (!consentAccepted) {
      return NextResponse.json(
        { error: 'Please accept the privacy policy to submit your meeting request.' },
        { status: 400 },
      )
    }

    // 2. Check if the event has concluded
    if (sourceEventSlug) {
      try {
        const sourceEvent = await payload.find({
          collection: 'events',
          where: { slug: { equals: sourceEventSlug } },
          depth: 0,
          limit: 1,
        })
        const eventDoc: any = sourceEvent.docs?.[0]
        if (eventDoc?.schedule?.endDate) {
          const now = new Date()
          const eventEnd = new Date(eventDoc.schedule.endDate)
          if (now > eventEnd) {
            return NextResponse.json(
              {
                error:
                  'This event has concluded. We are no longer accepting meeting requests for this event.',
              },
              { status: 409 },
            )
          }
        }
      } catch (err) {
        // Non-blocking query error
      }
    }

    const serverUrl = getServerSideURL()

    // 3. Persist in EventInquiries collection
    const inquiry = await payload.create({
      collection: 'event-inquiries',
      data: {
        firstName,
        lastName,
        workEmail,
        organisation,
        jobTitle: jobTitle || '',
        discussionTopic,
        preferredDay: preferredDay || 'Flexible',
        meetingFormat: meetingFormat || 'One-to-one exchange',
        notes: notes || '',
        consentAccepted: Boolean(consentAccepted),
        sourceEventTitle: sourceEventTitle || '316 Group at ESMO 2026',
        sourceEventSlug: sourceEventSlug || 'esmo-2026',
        status: 'pending',
      },
    })

    const adminDashboardUrl = `${serverUrl}/admin/collections/event-inquiries/${inquiry.id}`

    // 3. Dispatch Requester Confirmation Email
    try {
      const userHtml = generateUserConfirmationEmail({
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
        inquiryId: String(inquiry.id),
      })

      await payload.sendEmail({
        to: workEmail,
        subject: `We received your meeting request for ${sourceEventTitle || 'ESMO 2026'} | 316 Group`,
        html: userHtml,
      })
    } catch (emailErr) {
      console.error('Failed to dispatch user confirmation email:', emailErr)
    }

    // 4. Dispatch Admin Notification Email
    try {
      const adminHtml = generateAdminNotificationEmail({
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
        inquiryId: String(inquiry.id),
        adminDashboardUrl,
      })

      const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'contact@316group.co.uk'

      await payload.sendEmail({
        to: adminEmail,
        subject: `[New Event Lead] ${firstName} ${lastName} from ${organisation} (${sourceEventTitle || 'ESMO 2026'})`,
        html: adminHtml,
      })
    } catch (adminEmailErr) {
      console.error('Failed to dispatch admin alert email:', adminEmailErr)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your meeting request has been submitted successfully! Check your inbox for confirmation.',
        inquiryId: inquiry.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Event inquiry submission API error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your meeting request.' },
      { status: 500 },
    )
  }
}
