import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  generateUserConfirmationEmail,
  generateAdminNotificationEmail,
} from '@/collections/EventInquiries/EmailTemplates'
import { getServerSideURL } from '@/utilities/getURL'

function cleanHeadingText(raw?: string | null): string {
  if (!raw) return ''
  return raw
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '$3')
    .replace(/<[^>]*>/g, '')
    .replace(/\r?\n|\r/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function formatEventStartDate(dateString?: string | null): string {
  if (!dateString) return ''
  try {
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch (err) {
    return ''
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()

    const {
      firstName,
      lastName,
      workEmail,
      phone,
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

    // 1. Validate workEmail (required for delivering meeting confirmation)
    if (!workEmail || !workEmail.trim()) {
      return NextResponse.json(
        { error: 'Please provide a valid work email address.' },
        { status: 400 },
      )
    }

    let eventHeroHeading = ''
    let eventStartDateFormatted = ''
    let roadmapTitle = 'What happens next?'
    let roadmapSteps: Array<{ numberText?: string | null; text?: string | null }> = []

    // 2. Query event document to check operational schedule and extract dynamic content
    if (sourceEventSlug) {
      try {
        const sourceEvent = await payload.find({
          collection: 'events',
          where: { slug: { equals: sourceEventSlug } },
          depth: 1,
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

        // Extract Event Hero Main Heading
        const heroBlock = Array.isArray(eventDoc?.layout)
          ? eventDoc.layout.find((b: any) => b?.blockType === 'eventHero')
          : null
        const rawHeading = heroBlock?.headingGroup?.heading
        eventHeroHeading = cleanHeadingText(rawHeading) || eventDoc?.title || sourceEventTitle || ''

        // Extract and format Start Date (required before publishing)
        if (eventDoc?.schedule?.startDate) {
          eventStartDateFormatted = formatEventStartDate(eventDoc.schedule.startDate)
        }

        // Extract Roadmap Section Title and Steps from Event Conversation Form block
        const formBlock = Array.isArray(eventDoc?.layout)
          ? eventDoc.layout.find((b: any) => b?.blockType === 'eventConversationForm')
          : null

        if (formBlock?.leftColumn?.stepsTitle?.text) {
          roadmapTitle = formBlock.leftColumn.stepsTitle.text.trim()
        }

        if (Array.isArray(formBlock?.leftColumn?.steps) && formBlock.leftColumn.steps.length > 0) {
          roadmapSteps = formBlock.leftColumn.steps.map((s: any) => ({
            numberText: s?.numberText || null,
            text: s?.text || null,
          }))
        }
      } catch (err) {
        console.error('Non-blocking error retrieving event document:', err)
      }
    }

    const serverUrl = getServerSideURL()

    // 3. Persist in EventInquiries collection
    const inquiry = await payload.create({
      collection: 'event-inquiries',
      data: {
        firstName: firstName || '',
        lastName: lastName || '',
        workEmail,
        phone: phone || '',
        organisation: organisation || '',
        jobTitle: jobTitle || '',
        discussionTopic: discussionTopic || '',
        preferredDay: preferredDay || 'Flexible',
        meetingFormat: meetingFormat || 'One-to-one exchange',
        notes: notes || '',
        consentAccepted: Boolean(consentAccepted),
        sourceEventTitle: eventHeroHeading || sourceEventTitle || '316 Group Event',
        sourceEventSlug: sourceEventSlug || 'esmo-2026',
        status: 'pending',
      },
    })

    const adminDashboardUrl = `${serverUrl}/admin/collections/event-inquiries/${inquiry.id}`

    // 4. Dispatch Requester Confirmation Email with dynamic data
    try {
      const userHtml = generateUserConfirmationEmail({
        firstName: firstName || 'there',
        lastName: lastName || '',
        workEmail,
        phone,
        organisation,
        jobTitle,
        discussionTopic,
        preferredDay,
        meetingFormat,
        notes,
        sourceEventTitle,
        eventHeroHeading,
        eventStartDate: eventStartDateFormatted,
        roadmapTitle,
        roadmapSteps,
        inquiryId: String(inquiry.id),
      })

      const emailSubjectEvent = eventHeroHeading || sourceEventTitle || '316 Group Event'

      await payload.sendEmail({
        to: workEmail,
        subject: `We received your meeting request for ${emailSubjectEvent} | 316 Group`,
        html: userHtml,
      })
    } catch (emailErr) {
      console.error('Failed to dispatch user confirmation email:', emailErr)
    }

    // 5. Dispatch Admin Notification Email
    try {
      const adminHtml = generateAdminNotificationEmail({
        firstName: firstName || '',
        lastName: lastName || '',
        workEmail,
        phone,
        organisation,
        jobTitle,
        discussionTopic,
        preferredDay,
        meetingFormat,
        notes,
        sourceEventTitle: eventHeroHeading || sourceEventTitle || '316 Group Event',
        inquiryId: String(inquiry.id),
        adminDashboardUrl,
      })

      const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'contact@316group.co.uk'
      const attendeeName = [firstName, lastName].filter(Boolean).join(' ') || 'Attendee'

      await payload.sendEmail({
        to: adminEmail,
        subject: `[New Event Lead] ${attendeeName} ${organisation ? `from ${organisation}` : ''} (${eventHeroHeading || sourceEventTitle || '316 Group Event'})`,
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
