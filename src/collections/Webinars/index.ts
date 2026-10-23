import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateWebinar } from './hooks/revalidateWebinar'
import { defaultWebinarTemplateLayout } from './defaults/webinarTemplateLayout'

export { defaultWebinarTemplateLayout }

// Blocks
import { WebinarHero } from '@/blocks/WebinarHero/config'
import { WebinarAbout } from '@/blocks/WebinarAbout/config'
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
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
    beforeChange: [populatePublishedAt],
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
