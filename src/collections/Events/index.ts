import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { EventHero } from '@/blocks/EventHero/config'
import { EventSharedPurpose } from '@/blocks/EventSharedPurpose/config'
import { EventWhyConnect } from '@/blocks/EventWhyConnect/config'
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

const defaultEventTemplateLayout = [
  // Block 1: Event Hero (Phase 1)
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

  // Block 2: A Shared Purpose (Phase 2 - Section 1)
  {
    blockType: 'eventSharedPurpose',
    matchHeaderPillWidth: true,
    sectionBgColor: 'bg-white',
    paddingTop: 'pt-20 md:pt-28',
    paddingBottom: 'pb-20 md:pb-28',
    imageColumn: {
      imageFit: 'cover',
      imageRounded: 'rounded-none',
      showCalloutBadge: true,
      calloutText: 'Progress starts with connection.',
      calloutBgColor: 'bg-[#00D2FF]',
      calloutTextColor: 'text-[#002B49]',
      showDotGrid: true,
      dotGridColor: 'bg-[#0000FF]',
    },
    contentStack: {
      kickerGroup: {
        showKicker: true,
        squareColor: 'bg-[#0000FF]',
        squareSize: 'w-2.5 h-2.5',
        text: 'A SHARED PURPOSE',
        textColor: 'text-[#0000FF]',
        fontSize: 'text-xs md:text-sm',
        fontWeight: 'font-semibold',
        marginBottom: 'mb-4 md:mb-5',
      },
      headingGroup: {
        heading: 'Better healthcare is a team effort.',
        headingColor: 'text-gray-950',
        headingFontSize: 'text-3xl sm:text-4xl lg:text-5xl',
        headingFontWeight: 'font-bold',
        marginBottom: 'mb-6 md:mb-8',
      },
      descriptionGroup: {
        description:
          'ESMO brings the oncology community together to exchange ideas and look ahead. It’s a chance to connect different perspectives around a common goal: better care for people.\n\nAt 316 Group, we believe meaningful progress begins with listening. We’re inviting conversations with healthcare, research and life-sciences teams about the challenges that matter to them.',
        descriptionColor: 'text-gray-600',
        descriptionFontSize: 'text-base md:text-lg',
        descriptionFontWeight: 'font-normal',
        marginBottom: 'mb-8 md:mb-10',
      },
      buttonGroup: {
        showButton: true,
        text: 'Bring your perspective to the conversation',
        textColor: 'text-[#0256FF]',
        fontSize: 'text-sm md:text-base',
        fontWeight: 'font-semibold',
      },
    },
  },

  // Block 3: Why Connect With Us (Phase 2 - Section 2)
  {
    blockType: 'eventWhyConnect',
    matchHeaderPillWidth: true,
    sectionBgColor: 'bg-[#0000FF]',
    paddingTop: 'pt-20 md:pt-28',
    paddingBottom: 'pb-24 md:pb-32',
    topGrid: {
      kickerGroup: {
        showKicker: true,
        squareColor: 'bg-white',
        squareSize: 'w-2.5 h-2.5',
        text: 'WHY CONNECT WITH US',
        textColor: 'text-white',
        fontSize: 'text-xs md:text-sm',
        fontWeight: 'font-semibold',
        marginBottom: 'mb-4',
      },
      headingGroup: {
        heading: 'Different perspectives.\nMore possibilities.',
        headingColor: 'text-white',
        headingFontSize: 'text-3xl sm:text-4xl lg:text-5xl',
        headingFontWeight: 'font-bold',
      },
      descriptionGroup: {
        description:
          'Make space in a busy congress week for a focused exchange about your priorities — and where we might go together.',
        descriptionColor: 'text-white/90',
        descriptionFontSize: 'text-base md:text-lg lg:text-xl',
        descriptionFontWeight: 'font-normal',
      },
      gridBottomSpacing: 'mb-12 md:mb-16',
    },
    items: [
      {
        iconType: 'messageSquare',
        numberText: '01',
        heading: 'Exchange ideas',
        description:
          'Share the questions shaping your work and hear a fresh perspective on healthcare’s evolving needs.',
      },
      {
        iconType: 'network',
        numberText: '02',
        heading: 'Find common ground',
        description:
          'Explore where people, data and technology can come together to support more connected care.',
      },
      {
        iconType: 'arrowUpRight',
        numberText: '03',
        heading: 'Explore what’s next',
        description:
          'Discuss a challenge, consider a collaboration and identify a practical next step beyond the congress.',
      },
    ],
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
                EventSharedPurpose,
                EventWhyConnect,
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
              defaultValue: defaultEventTemplateLayout,
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
