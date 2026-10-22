import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { EventHero } from '@/blocks/EventHero/config'
import { Content } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { FormBlock } from '@/blocks/Form/config'
import { CardGrid } from '@/blocks/CardGrid/config'
import { CenteredContent } from '@/blocks/CenteredContent/config'
import { SpacingBlock } from '@/blocks/SpacingBlock/config'
import { AnimatedIconsGrid } from '@/blocks/AnimatedIconsGrid/config'
import { FeatureCards } from '@/blocks/FeatureCards/config'
import { FeatureCardsV2 } from '@/blocks/FeatureCardsV2/config'
import { TimelineAccordion } from '@/blocks/TimelineAccordion/config'
import { TestimonialSlider } from '@/blocks/TestimonialSlider/config'
import { BrandSlider } from '@/blocks/BrandSlider/config'
import { CenteredButton } from '@/blocks/CenteredButton/config'

import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateEvent } from './hooks/revalidateEvent'
import { getServerSideURL } from '@/utilities/getURL'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

const defaultEventHeroLayout = [
  {
    blockType: 'eventHero',
    matchHeaderPillWidth: true,
    paddingTop: 'pt-16',
    bodyPaddingBottom: 'pb-16',
    footerPaddingTop: 'pt-6',
    footerPaddingBottom: 'pb-6',
    backgroundType: 'color',
    bodyBgColor: 'bg-[#0000FF]',
    footerBgColor: 'bg-[#F4F6F9]',
    kickerGroup: {
      showKicker: true,
      squareColor: 'bg-[#00D2FF]',
      squareSize: 'w-2.5 h-2.5',
      textColor: 'text-white',
      text: '316 GROUP AT ESMO 2026',
      fontSize: 'text-xs md:text-sm',
      fontWeight: 'font-semibold',
      marginBottom: 'mb-4',
    },
    headingGroup: {
      heading: 'Connecting people,\ndata and better\nhealthcare.',
      headingColor: 'text-white',
      headingFontSize: 'text-4xl sm:text-5xl lg:text-6xl',
      headingFontWeight: 'font-bold',
      marginBottom: 'mb-6 md:mb-8',
    },
    descriptionGroup: {
      description:
        "A shared ambition. A meaningful conversation. Join 316 Group in Madrid to explore what's next for healthcare.",
      descriptionColor: 'text-white/90',
      descriptionFontSize: 'text-base md:text-lg lg:text-xl',
      descriptionFontWeight: 'font-normal',
      marginBottom: 'mb-8 md:mb-10',
    },
    metadataGroup: {
      dateText: '23–27 October 2026',
      dividerColor: 'bg-white/40',
      locationText: 'Madrid, Spain',
      textColor: 'text-white',
      fontSize: 'text-sm md:text-base',
      fontWeight: 'font-medium',
      marginBottom: 'mb-8 md:mb-10',
    },
    buttonsGroup: {
      button1: {
        text: 'Request a meeting',
        bgColor: 'bg-white',
        textColor: 'text-[#0256FF]',
        iconColor: 'text-[#0256FF]',
        borderRadius: 'rounded-lg',
        fontSize: 'text-sm md:text-base',
        fontWeight: 'font-semibold',
      },
      button2: {
        text: 'Explore the conversations ↓',
        textColor: 'text-white',
        iconColor: 'text-white',
        fontSize: 'text-sm md:text-base',
        fontWeight: 'font-medium',
      },
    },
    imageColumn: {
      imageFit: 'cover',
      imageRounded: 'rounded-none',
      gridBottomSpacing: 'mb-0',
    },
    footerBar: {
      iconColor: 'text-[#0256FF]',
      iconSize: 'w-6 h-6',
      iconTextGap: 'gap-3 md:gap-4',
      subheadingHeadingGap: 'gap-0.5',
      subheadingColor: 'text-gray-500',
      subheadingFontSize: 'text-[11px] md:text-xs',
      subheadingFontWeight: 'font-medium',
      headingColor: 'text-gray-950',
      headingFontSize: 'text-base md:text-lg',
      headingFontWeight: 'font-semibold',
      items: [
        {
          iconType: 'calendar',
          subheading: 'THE CONGRESS',
          heading: '23–27 October 2026',
        },
        {
          iconType: 'mapPin',
          subheading: 'THE CITY',
          heading: 'Madrid, Spain',
        },
        {
          iconType: 'messageSquare',
          subheading: 'THE OPPORTUNITY',
          heading: "Let's move healthcare forward",
        },
      ],
    },
  },
]

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'events',
        })

        return `${getServerSideURL()}${path}`
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'events',
      })

      return `${getServerSideURL()}${path}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Template & Layout',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                EventHero,
                Content,
                MediaBlock,
                CallToAction,
                FormBlock,
                CardGrid,
                CenteredContent,
                SpacingBlock,
                AnimatedIconsGrid,
                FeatureCards,
                FeatureCardsV2,
                TimelineAccordion,
                TestimonialSlider,
                BrandSlider,
                CenteredButton,
              ],
              defaultValue: defaultEventHeroLayout,
              required: false,
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
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateEvent],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 10000,
      },
    },
    maxPerDoc: 50,
  },
}
