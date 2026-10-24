import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateWebinar } from './hooks/revalidateWebinar'
import { defaultWebinarTemplateLayout } from './defaults/webinarTemplateLayout'
import { defaultWebinarRecapLayout } from './defaults/webinarRecapLayout'

export { defaultWebinarTemplateLayout, defaultWebinarRecapLayout }

// Blocks
import { WebinarHero } from '@/blocks/WebinarHero/config'
import { WebinarAbout } from '@/blocks/WebinarAbout/config'
import { WebinarMore } from '@/blocks/WebinarMore/config'
import { WebinarCTA } from '@/blocks/WebinarCTA/config'
import { WebinarRecapAbout } from '@/blocks/WebinarRecapAbout/config'
import { WebinarRecapAccess } from '@/blocks/WebinarRecapAccess/config'
import {
  ensureWebinarLayoutAfterRead,
  ensureWebinarLayoutBeforeChange,
} from './hooks/ensureWebinarLayout'
import {
  ensureWebinarRecapLayoutAfterRead,
  ensureWebinarRecapLayoutBeforeChange,
} from './hooks/ensureWebinarRecapLayout'
import { Content } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { FormBlock } from '@/blocks/Form/config'
import { CardGrid } from '@/blocks/CardGrid/config'
import { CenteredContent } from '@/blocks/CenteredContent/config'
import { SpacingBlock } from '@/blocks/SpacingBlock/config'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Webinars: CollectionConfig = {
  slug: 'webinars',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    schedule: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'webinarStatus', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'webinars' as any,
        }),
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Webinar Title',
    },
    {
      name: 'webinarStatus',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Cell: '/collections/Webinars/components/WebinarStatusCell#WebinarStatusCell',
          Field: '/collections/Webinars/components/WebinarStatusField#WebinarStatusField',
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Template & Content',
          fields: [
            // ── Operational Schedule (Start & End Date) ─────────────────────
            {
              type: 'group',
              name: 'schedule',
              label: 'Webinar Operational Schedule',
              admin: {
                description:
                  'Backend dates used for filtering active vs completed webinars and registration forms.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'startDate',
                      type: 'date',
                      label: 'Webinar Start Date & Time',
                      required: false,
                      validate: (value: any, { siblingData, req }: any) => {
                        const status = (req as any)?.data?._status || siblingData?._status
                        if (status === 'published' && !value) {
                          return 'Webinar Start Date is required to publish this webinar.'
                        }
                        return true
                      },
                      admin: {
                        width: '50%',
                        date: {
                          pickerAppearance: 'dayAndTime',
                          displayFormat: 'd MMM yyyy, HH:mm',
                        },
                        description: 'Exact date and time the webinar begins.',
                      },
                    },
                    {
                      name: 'endDate',
                      type: 'date',
                      label: 'Webinar End Date & Time',
                      required: false,
                      validate: (value: any, { siblingData, req }: any) => {
                        const status = (req as any)?.data?._status || siblingData?._status
                        if (status === 'published' && !value) {
                          return 'Webinar End Date is required to publish this webinar.'
                        }
                        if (
                          value &&
                          siblingData?.startDate &&
                          new Date(value) < new Date(siblingData.startDate)
                        ) {
                          return 'Webinar End Date must be after the Start Date.'
                        }
                        return true
                      },
                      admin: {
                        width: '50%',
                        date: {
                          pickerAppearance: 'dayAndTime',
                          displayFormat: 'd MMM yyyy, HH:mm',
                        },
                        description: 'Exact date and time the webinar concludes.',
                      },
                    },
                  ],
                },
              ],
            },

            // ── Layout Blocks Field with Pre-Populated Default Template ─────
            {
              name: 'layout',
              type: 'blocks',
              label: 'Webinar Content Sections',
              defaultValue: defaultWebinarTemplateLayout,
              blocks: [
                WebinarHero,
                WebinarAbout,
                WebinarMore,
                WebinarCTA,
                Content,
                MediaBlock,
                CallToAction,
                FormBlock,
                CardGrid,
                CenteredContent,
                SpacingBlock,
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
        {
          label: '🏁 End Webinar Recap',
          fields: [
            {
              type: 'group',
              name: 'recapConfig',
              label: 'End Webinar Recap Configuration',
              admin: {
                description:
                  'When this webinar has concluded and you publish this recap, the public webinar page will display this recap layout below the hero, and webinar archive cards will display "View recap →".',
              },
              fields: [
                {
                  name: 'isPublished',
                  type: 'checkbox',
                  label: 'Publish End Webinar Recap',
                  defaultValue: false,
                  admin: {
                    description:
                      'Check this box and publish the webinar document to activate the recap on the website.',
                  },
                },
                {
                  name: 'recapHeroNotice',
                  type: 'ui',
                  admin: {
                    components: {
                      Field:
                        '/collections/Webinars/components/WebinarRecapHeroNotice#WebinarRecapHeroNotice',
                    },
                  },
                },
                {
                  name: 'recapLayout',
                  type: 'blocks',
                  label: 'Recap Sections (Sequential layout below Webinar Hero)',
                  defaultValue: defaultWebinarRecapLayout,
                  blocks: [
                    WebinarRecapAbout,
                    WebinarRecapAccess,
                    WebinarMore,
                    WebinarCTA,
                    Content,
                    MediaBlock,
                    CallToAction,
                    FormBlock,
                    CardGrid,
                    CenteredContent,
                    SpacingBlock,
                  ],
                  admin: {
                    description:
                      "The recap automatically keeps this webinar's Hero at the top, and renders these sections below it.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    ...slugField(),
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterRead: [ensureWebinarLayoutAfterRead, ensureWebinarRecapLayoutAfterRead],
    beforeChange: [
      ensureWebinarLayoutBeforeChange,
      ensureWebinarRecapLayoutBeforeChange,
      populatePublishedAt,
    ],
    afterChange: [revalidateWebinar],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
