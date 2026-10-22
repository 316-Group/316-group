import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function EventsIndexPage() {
  const { isEnabled: isDraft } = await draftMode()

  if (isDraft) {
    redirect('/events/preview')
  }

  const payload = await getPayload({ config: configPromise })
  const events = await payload.find({
    collection: 'events',
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  if (events.docs?.[0]?.slug) {
    redirect(`/events/${events.docs[0].slug}`)
  }

  redirect('/')
}
