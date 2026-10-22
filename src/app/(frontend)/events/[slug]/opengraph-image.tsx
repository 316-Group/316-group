import { ImageResponse } from 'next/og'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'

export const runtime = 'nodejs'

export const alt = '316 Group Event'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'events',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const event = result.docs?.[0]
  const heroBlock = (event?.layout as any[])?.find((b: any) => b.blockType === 'eventHero')

  // 1. Resolve Title (Pitch Black #000000, Bold)
  let title =
    event?.meta?.title ||
    heroBlock?.headingGroup?.heading ||
    heroBlock?.leftColumn?.headingGroup?.heading ||
    event?.title ||
    '316 Group Event'
  title = String(title).replace(/<[^>]*>?/gm, '').replace(/\n+/g, ' ').trim()

  // 2. Resolve Description (Dark Slate #334155)
  let description =
    event?.meta?.description ||
    heroBlock?.descriptionGroup?.description ||
    heroBlock?.leftColumn?.descriptionGroup?.description ||
    "Join 316 Group for high-impact discussions with clinical teams and partners."
  description = String(description).replace(/<[^>]*>?/gm, '').replace(/\n+/g, ' ').trim()

  // 3. Resolve Date & Location (Slate Gray #64748B)
  const dateText = heroBlock?.metadataGroup?.dateText || 'October 2026'
  const locationText = heroBlock?.metadataGroup?.locationText || 'Madrid, Spain'
  const dateLocation = `${dateText}  —  ${locationText}`

  // 4. Resolve Image URL
  const serverUrl = getServerSideURL()
  let imageUrl: string | null = null
  const rawImage: any =
    event?.meta?.image ||
    heroBlock?.imageColumn?.image ||
    heroBlock?.rightColumn?.featuredMedia

  if (rawImage && typeof rawImage === 'object' && rawImage.url) {
    imageUrl = rawImage.url.startsWith('http') ? rawImage.url : `${serverUrl}${rawImage.url}`
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#F8FAFC',
          padding: '40px',
          fontFamily: 'sans-serif',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            borderRadius: '24px',
            border: '2px solid #E2E8F0',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Left Column: Event Featured Image (approx 40%) */}
          {imageUrl && (
            <div
              style={{
                width: '42%',
                height: '100%',
                display: 'flex',
                backgroundColor: '#0000FF',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                src={imageUrl}
                alt={title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}

          {/* Right Column: Text Information & Metadata */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '48px 56px',
              backgroundColor: '#FFFFFF',
            }}
          >
            {/* Header Kicker */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  backgroundColor: '#00D2FF',
                  borderRadius: '2px',
                }}
              />
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#0256FF',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                316 GROUP EVENT
              </span>
            </div>

            {/* Title & Description */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 800,
                  color: '#000000',
                  lineHeight: 1.15,
                  letterSpacing: '-0.5px',
                }}
              >
                {title.length > 90 ? `${title.slice(0, 87)}...` : title}
              </div>

              <div
                style={{
                  fontSize: '18px',
                  color: '#334155',
                  lineHeight: 1.45,
                }}
              >
                {description.length > 180 ? `${description.slice(0, 177)}...` : description}
              </div>
            </div>

            {/* Bottom Section: Divider & Location / Date */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginTop: 'auto',
                paddingTop: '20px',
              }}
            >
              <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0' }} />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '17px',
                  fontWeight: 600,
                  color: '#64748B',
                  letterSpacing: '0.2px',
                }}
              >
                {dateLocation}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
