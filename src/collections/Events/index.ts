import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { EventHero } from '@/blocks/EventHero/config'
import { EventSharedPurpose } from '@/blocks/EventSharedPurpose/config'
import { EventWhyConnect } from '@/blocks/EventWhyConnect/config'
import { EventAgendaOverview } from '@/blocks/EventAgendaOverview/config'
import { EventMeetingFormats } from '@/blocks/EventMeetingFormats/config'
import { EventMadridVenue } from '@/blocks/EventMadridVenue/config'
import { EventConversationForm } from '@/blocks/EventConversationForm/config'
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
import { EventUpcoming } from '@/blocks/EventUpcoming/config'
import { PastEvent } from '@/blocks/PastEvent/config'
import { EventRecapArticle } from '@/blocks/EventRecapArticle/config'
import { EventRecapFeature } from '@/blocks/EventRecapFeature/config'
import { defaultEventRecapLayout } from './defaults/recapLayout'

export { defaultEventRecapLayout }

import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateEvent } from './hooks/revalidateEvent'
import { populateEventSEO } from './hooks/populateEventSEO'
import {
  ensureRecapLayoutAfterRead,
  ensureRecapLayoutBeforeChange,
} from './hooks/ensureRecapLayout'
import { getServerSideURL } from '@/utilities/getURL'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const defaultEventTemplateLayout = [
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

  // Block 4: On The Agenda (Phase 3 - Section 3)
  {
    blockType: 'eventAgendaOverview',
    matchHeaderPillWidth: true,
    sectionBgColor: 'bg-white',
    paddingTop: 'pt-20 md:pt-28',
    paddingBottom: 'pb-20 md:pb-28',
    leftColumn: {
      kickerGroup: {
        showKicker: true,
        boxBgColor: 'bg-[#0256FF]',
        squareSize: 'w-2.5 h-2.5',
        text: 'ON THE AGENDA',
        textColor: 'text-[#0256FF]',
        fontSize: 'text-xs md:text-sm',
        fontWeight: 'font-semibold',
        marginBottom: 'mb-4 md:mb-6',
      },
      headingGroup: {
        heading: 'Big questions.\nOpen conversations.',
        headingColor: 'text-black',
        headingFontSize: 'text-3xl md:text-4xl lg:text-5xl',
        headingFontWeight: 'font-bold',
        marginBottom: 'mb-6 md:mb-8',
      },
      descriptionGroup: {
        description:
          "Healthcare doesn't change through one-size-fits-all solutions. It changes through focused conversations, shared experience and the courage to look at challenges differently. Here's what we're talking about in Madrid:",
        descriptionColor: 'text-slate-600',
        descriptionFontSize: 'text-base md:text-lg',
        descriptionFontWeight: 'font-normal',
        marginBottom: 'mb-8 md:mb-10',
      },
      ctaButton: {
        showButton: true,
        text: 'Request a meeting',
        showArrow: true,
        arrowColor: 'text-white',
        bgColor: 'bg-[#0256FF]',
        textColor: 'text-white',
        fontSize: 'text-sm md:text-base',
        fontWeight: 'font-semibold',
        marginBottom: 'mb-3 md:mb-4',
      },
      disclaimerGroup: {
        text: '*Advance booking recommended due to limited on-site availability.',
        textColor: 'text-slate-400',
        fontSize: 'text-xs md:text-sm',
        fontWeight: 'font-normal',
      },
    },
    rightColumn: {
      topDivider: {
        showTopDivider: true,
        borderColor: 'border-slate-200',
        borderWidth: 'border-t',
        marginBottom: 'mb-6 md:mb-8',
      },
      items: [
        {
          numberText: '01',
          numberColor: 'text-slate-400',
          numberFontSize: 'text-base md:text-lg',
          numberFontWeight: 'font-semibold',
          category: 'INNOVATION & INFRASTRUCTURE',
          categoryColor: 'text-slate-500',
          categoryFontSize: 'text-xs md:text-sm',
          categoryFontWeight: 'font-semibold',
          categoryMarginBottom: 'mb-2 md:mb-3',
          heading: 'Connecting technology to clinical reality',
          headingColor: 'text-black',
          headingFontSize: 'text-xl md:text-2xl',
          headingFontWeight: 'font-bold',
          headingMarginBottom: 'mb-3 md:mb-4',
          description:
            'How do we bridge the gap between innovative tools and the complex systems healthcare teams rely on every day?',
          descriptionColor: 'text-slate-600',
          descriptionFontSize: 'text-sm md:text-base',
          descriptionFontWeight: 'font-normal',
          descriptionMarginBottom: 'mb-6 md:mb-8',
          showArrow: true,
          arrowColor: 'text-slate-400',
          showDivider: true,
          dividerColor: 'border-slate-200',
          dividerWidth: 'border-t',
        },
        {
          numberText: '02',
          numberColor: 'text-slate-400',
          numberFontSize: 'text-base md:text-lg',
          numberFontWeight: 'font-semibold',
          category: 'DATA & INTEGRATION',
          categoryColor: 'text-slate-500',
          categoryFontSize: 'text-xs md:text-sm',
          categoryFontWeight: 'font-semibold',
          categoryMarginBottom: 'mb-2 md:mb-3',
          heading: 'Data that actually serves clinicians',
          headingColor: 'text-black',
          headingFontSize: 'text-xl md:text-2xl',
          headingFontWeight: 'font-bold',
          headingMarginBottom: 'mb-3 md:mb-4',
          description:
            'From fragmentation to clarity: turning complex health data into actionable insights at the point of care.',
          descriptionColor: 'text-slate-600',
          descriptionFontSize: 'text-sm md:text-base',
          descriptionFontWeight: 'font-normal',
          descriptionMarginBottom: 'mb-6 md:mb-8',
          showArrow: true,
          arrowColor: 'text-slate-400',
          showDivider: true,
          dividerColor: 'border-slate-200',
          dividerWidth: 'border-t',
        },
        {
          numberText: '03',
          numberColor: 'text-slate-400',
          numberFontSize: 'text-base md:text-lg',
          numberFontWeight: 'font-semibold',
          category: 'COLLABORATION',
          categoryColor: 'text-slate-500',
          categoryFontSize: 'text-xs md:text-sm',
          categoryFontWeight: 'font-semibold',
          categoryMarginBottom: 'mb-2 md:mb-3',
          heading: 'Cross-border learning, local impact',
          headingColor: 'text-black',
          headingFontSize: 'text-xl md:text-2xl',
          headingFontWeight: 'font-bold',
          headingMarginBottom: 'mb-3 md:mb-4',
          description:
            'What can oncology teams in one market teach another? Lessons from healthcare systems navigating rapid change.',
          descriptionColor: 'text-slate-600',
          descriptionFontSize: 'text-sm md:text-base',
          descriptionFontWeight: 'font-normal',
          descriptionMarginBottom: 'mb-6 md:mb-8',
          showArrow: true,
          arrowColor: 'text-slate-400',
          showDivider: true,
          dividerColor: 'border-slate-200',
          dividerWidth: 'border-t',
        },
        {
          numberText: '04',
          numberColor: 'text-slate-400',
          numberFontSize: 'text-base md:text-lg',
          numberFontWeight: 'font-semibold',
          category: 'FUTURE OF CARE',
          categoryColor: 'text-slate-500',
          categoryFontSize: 'text-xs md:text-sm',
          categoryFontWeight: 'font-semibold',
          categoryMarginBottom: 'mb-2 md:mb-3',
          heading: "Preparing for what's next in oncology",
          headingColor: 'text-black',
          headingFontSize: 'text-xl md:text-2xl',
          headingFontWeight: 'font-bold',
          headingMarginBottom: 'mb-3 md:mb-4',
          description:
            'Where the science is going, and the operational capabilities organizations need to keep pace.',
          descriptionColor: 'text-slate-600',
          descriptionFontSize: 'text-sm md:text-base',
          descriptionFontWeight: 'font-normal',
          descriptionMarginBottom: 'mb-6 md:mb-8',
          showArrow: true,
          arrowColor: 'text-slate-400',
          showDivider: true,
          dividerColor: 'border-slate-200',
          dividerWidth: 'border-t',
        },
      ],
    },
  },

  // Block 5: Make Time To Connect (Phase 3 - Section 4)
  {
    blockType: 'eventMeetingFormats',
    sectionBgColor: 'bg-white',
    leftColumn: {
      imageFit: 'cover',
      minHeight: 'min-h-[540px] lg:min-h-[640px]',
      badge: {
        showBadge: true,
        badgeBgColor: 'bg-[#00D2FF]',
        dotColor: 'bg-[#0256FF]',
      },
    },
    rightColumn: {
      paddingTop: 'pt-16 md:pt-24',
      paddingBottom: 'pb-16 md:pb-24',
      kickerGroup: {
        showKicker: true,
        boxBgColor: 'bg-[#0256FF]',
        squareSize: 'w-2.5 h-2.5',
        text: 'MAKE TIME TO CONNECT',
        textColor: 'text-[#0256FF]',
        fontSize: 'text-xs md:text-sm',
        fontWeight: 'font-semibold',
        marginBottom: 'mb-4 md:mb-6',
      },
      headingGroup: {
        heading: 'A conversation built\naround you.',
        headingColor: 'text-black',
        headingFontSize: 'text-3xl md:text-4xl lg:text-5xl',
        headingFontWeight: 'font-bold',
        marginBottom: 'mb-4 md:mb-6',
      },
      descriptionGroup: {
        description:
          "Whether you have twenty minutes between sessions or want to dive deeper over coffee, we'd welcome the chance to hear what you're working on and share how we might help.",
        descriptionColor: 'text-slate-600',
        descriptionFontSize: 'text-base md:text-lg',
        descriptionFontWeight: 'font-normal',
        marginBottom: 'mb-6 md:mb-8',
      },
      points: [
        {
          label: 'One-to-one exchange',
          boxBgColor: 'bg-[#0256FF]',
          textColor: 'text-slate-900',
          fontSize: 'text-sm md:text-base',
          fontWeight: 'font-medium',
          marginBottom: 'mb-3 md:mb-4',
        },
        {
          label: 'Team discussion',
          boxBgColor: 'bg-[#0256FF]',
          textColor: 'text-slate-900',
          fontSize: 'text-sm md:text-base',
          fontWeight: 'font-medium',
          marginBottom: 'mb-3 md:mb-4',
        },
      ],
      ctaButton: {
        showButton: true,
        text: 'Request a meeting',
        showArrow: true,
        arrowColor: 'text-white',
        bgColor: 'bg-[#0256FF]',
        textColor: 'text-white',
        fontSize: 'text-sm md:text-base',
        fontWeight: 'font-semibold',
        marginBottom: 'mb-3 md:mb-4',
      },
      disclaimerGroup: {
        text: '*Advance booking recommended due to limited on-site availability.',
        textColor: 'text-slate-400',
        fontSize: 'text-xs md:text-sm',
        fontWeight: 'font-normal',
      },
    },
  },

  // Block 6: See You In Madrid (Phase 3 - Section 5)
  {
    blockType: 'eventMadridVenue',
    matchHeaderPillWidth: true,
    sectionBgColor: 'bg-white',
    paddingTop: 'pt-20 md:pt-28',
    paddingBottom: 'pb-20 md:pb-28',
    leftColumn: {
      kickerGroup: {
        showKicker: true,
        boxBgColor: 'bg-[#0256FF]',
        squareSize: 'w-2.5 h-2.5',
        text: 'SEE YOU IN MADRID',
        textColor: 'text-[#0256FF]',
        fontSize: 'text-xs md:text-sm',
        fontWeight: 'font-semibold',
        marginBottom: 'mb-4 md:mb-6',
      },
      headingGroup: {
        heading: 'One city.\nA world of perspectives.',
        headingColor: 'text-black',
        headingFontSize: 'text-3xl md:text-4xl lg:text-5xl',
        headingFontWeight: 'font-bold',
        marginBottom: 'mb-4 md:mb-6',
      },
      descriptionGroup: {
        description:
          "ESMO brings the global oncology community together in one place. We're proud to be part of the conversation.",
        descriptionColor: 'text-slate-600',
        descriptionFontSize: 'text-base md:text-lg',
        descriptionFontWeight: 'font-normal',
        marginBottom: 'mb-6 md:mb-8',
      },
      venueLocation: {
        iconType: 'mapPin',
        iconColor: 'text-[#0256FF]',
        venueName: 'The Westin Palace, Madrid',
        venueColor: 'text-black',
        fontSize: 'text-lg md:text-xl',
        fontWeight: 'font-bold',
        marginBottom: 'mb-2 md:mb-3',
      },
      secondaryDescription: {
        text: "Just minutes from the congress venue. We're hosting meetings throughout ESMO 2026.",
        textColor: 'text-slate-600',
        fontSize: 'text-sm md:text-base',
        fontWeight: 'font-normal',
        marginBottom: 'mb-6 md:mb-8',
      },
      ctaLink: {
        showLink: true,
        text: 'Visit venue website',
        showArrow: true,
        textColor: 'text-[#0256FF]',
        fontSize: 'text-sm md:text-base',
        fontWeight: 'font-semibold',
      },
    },
    rightColumn: {
      imageFit: 'cover',
      imageRounded: 'rounded-none',
    },
  },

  // Block 7: Let's Start A Conversation / Form (Phase 4 - Section 6)
  {
    blockType: 'eventConversationForm',
    matchHeaderPillWidth: true,
    sectionBgColor: 'bg-[#0000FF]',
    paddingTop: 'pt-20 md:pt-28',
    paddingBottom: 'pb-20 md:pb-28',
    leftColumn: {
      kickerGroup: {
        showKicker: true,
        boxBgColor: 'bg-[#00D2FF]',
        squareSize: 'w-2.5 h-2.5',
        text: "LET'S START A CONVERSATION",
        textColor: 'text-white',
        fontSize: 'text-xs md:text-sm',
        fontWeight: 'font-semibold',
        marginBottom: 'mb-4 md:mb-6',
      },
      headingGroup: {
        heading: 'Your next\nconnection starts\nhere.',
        headingColor: 'text-white',
        headingFontSize: 'text-4xl md:text-5xl lg:text-6xl',
        headingFontWeight: 'font-bold',
        marginBottom: 'mb-6 md:mb-8',
      },
      descriptionGroup: {
        description:
          "Tell us a little about yourself and what you'd like to discuss. We'll be in touch to explore a suitable time to meet during ESMO 2026.",
        descriptionColor: 'text-white/90',
        descriptionFontSize: 'text-base md:text-lg',
        descriptionFontWeight: 'font-normal',
        marginBottom: 'mb-8 md:mb-10',
      },
      divider: {
        showDivider: true,
        borderColor: 'border-white/20',
        borderWidth: 'border-t',
        marginBottom: 'mb-6 md:mb-8',
      },
      stepsTitle: {
        text: 'What happens next?',
        textColor: 'text-white',
        fontSize: 'text-base md:text-lg',
        fontWeight: 'font-semibold',
        marginBottom: 'mb-4 md:mb-6',
      },
      steps: [
        {
          numberText: '01',
          numberColor: 'text-[#00D2FF]',
          text: 'Share your interests and availability.',
          textColor: 'text-white',
          fontSize: 'text-sm md:text-base',
          fontWeight: 'font-normal',
        },
        {
          numberText: '02',
          numberColor: 'text-[#00D2FF]',
          text: "We'll follow up to shape the conversation.",
          textColor: 'text-white',
          fontSize: 'text-sm md:text-base',
          fontWeight: 'font-normal',
        },
        {
          numberText: '03',
          numberColor: 'text-[#00D2FF]',
          text: 'Confirm a time and place together.',
          textColor: 'text-white',
          fontSize: 'text-sm md:text-base',
          fontWeight: 'font-normal',
        },
      ],
      listMarginBottom: 'mb-10 md:mb-12',
      bottomIcon: {
        showBottomIcon: true,
        iconType: 'matrix3x3',
        matrixColor: 'bg-[#00D2FF]',
      },
    },
    rightColumn: {
      formCardBgColor: 'bg-white',
      formTitle: 'Request a meeting',
      requiredNote: '* Required fields',
      fieldsConfig: {
        firstNameLabel: 'First name',
        firstNamePlaceholder: 'Your first name',
        lastNameLabel: 'Last name',
        lastNamePlaceholder: 'Your last name',
        emailLabel: 'Work email',
        emailPlaceholder: 'you@organisation.com',
        organisationLabel: 'Organisation',
        organisationPlaceholder: 'Organisation name',
        jobTitleLabel: 'Job title',
        jobTitlePlaceholder: 'Your role',
        discussionTopicLabel: 'What would you like to discuss?',
        discussionTopicPlaceholder: 'Select a discussion topic',
        discussionTopicOptions: [
          { option: 'Connecting technology to clinical reality' },
          { option: 'Data that actually serves clinicians' },
          { option: 'Cross-border learning, local impact' },
          { option: "Preparing for what's next in oncology" },
          { option: 'Other / General exploratory meeting' },
        ],
        preferredDayLabel: 'Preferred day',
        preferredDayPlaceholder: 'Select 23–27 October',
        preferredDayOptions: [
          { option: 'Friday, 23 October 2026' },
          { option: 'Saturday, 24 October 2026' },
          { option: 'Sunday, 25 October 2026' },
          { option: 'Monday, 26 October 2026' },
          { option: 'Tuesday, 27 October 2026' },
          { option: 'Flexible / Any day' },
        ],
        meetingFormatLabel: 'Meeting format',
        meetingFormatPlaceholder: 'Select a preference',
        meetingFormatOptions: [
          { option: 'One-to-one exchange' },
          { option: 'Team discussion' },
          { option: 'Informal coffee chat' },
          { option: 'Virtual meeting post-congress' },
        ],
        notesLabel: "Anything else you'd like us to know?",
        notesPlaceholder:
          'Share your priorities or availability. Please do not include patient or sensitive health information.',
        consentLabel:
          'I agree that 316 Group may use these details to contact me about this meeting request.',
        privacyLinkText: 'See our Privacy notice.',
        privacyLinkUrl: '/privacy-policy',
        submitButtonText: 'Request a meeting',
        submitButtonBgColor: 'bg-[#0256FF]',
        submitButtonTextColor: 'text-white',
        disclaimerText:
          'Submitting a request does not confirm a meeting. Your details are used to coordinate your enquiry, not to register you for the congress.',
        disclaimerTextColor: 'text-slate-500',
      },
    },
  },

  // Block 8: Before We Meet / FAQ (Phase 4 - Section 7)
  {
    blockType: 'eventAgendaOverview',
    matchHeaderPillWidth: true,
    sectionBgColor: 'bg-white',
    paddingTop: 'pt-20 md:pt-28',
    paddingBottom: 'pb-20 md:pb-28',
    leftColumn: {
      kickerGroup: {
        showKicker: true,
        boxBgColor: 'bg-[#0256FF]',
        squareSize: 'w-2.5 h-2.5',
        text: 'BEFORE WE MEET',
        textColor: 'text-[#0256FF]',
        fontSize: 'text-xs md:text-sm',
        fontWeight: 'font-semibold',
        marginBottom: 'mb-4 md:mb-6',
      },
      headingGroup: {
        heading: 'A few useful\ndetails.',
        headingColor: 'text-black',
        headingFontSize: 'text-3xl md:text-4xl lg:text-5xl',
        headingFontWeight: 'font-bold',
        marginBottom: 'mb-6 md:mb-8',
      },
      descriptionGroup: {
        description: '',
      },
      ctaButton: {
        showButton: false,
      },
      disclaimerGroup: {
        text: '',
      },
    },
    rightColumn: {
      showNumbers: false,
      showCategory: false,
      topDivider: {
        showTopDivider: true,
        borderColor: 'border-slate-200',
        borderWidth: 'border-t',
        marginBottom: 'mb-6 md:mb-8',
      },
      items: [
        {
          heading: 'Is this part of the official ESMO programme?',
          headingColor: 'text-black',
          headingFontSize: 'text-xl md:text-2xl',
          headingFontWeight: 'font-bold',
          headingMarginBottom: 'mb-3 md:mb-4',
          description:
            'These are independent 316 Group meeting opportunities, not official congress sessions. Congress registration is managed separately by ESMO.',
          descriptionColor: 'text-slate-600',
          descriptionFontSize: 'text-sm md:text-base',
          descriptionFontWeight: 'font-normal',
          descriptionMarginBottom: 'mb-6 md:mb-8',
          showArrow: false,
          showDivider: true,
          dividerColor: 'border-slate-200',
          dividerWidth: 'border-t',
        },
        {
          heading: 'Where will we meet?',
          headingColor: 'text-black',
          headingFontSize: 'text-xl md:text-2xl',
          headingFontWeight: 'font-bold',
          headingMarginBottom: 'mb-3 md:mb-4',
          description:
            "We'll agree a convenient time and location with you directly. Please wait for confirmation before adding a meeting to your plans.",
          descriptionColor: 'text-slate-600',
          descriptionFontSize: 'text-sm md:text-base',
          descriptionFontWeight: 'font-normal',
          descriptionMarginBottom: 'mb-6 md:mb-8',
          showArrow: false,
          showDivider: true,
          dividerColor: 'border-slate-200',
          dividerWidth: 'border-t',
        },
        {
          heading: 'Can I suggest a different topic?',
          headingColor: 'text-black',
          headingFontSize: 'text-xl md:text-2xl',
          headingFontWeight: 'font-bold',
          headingMarginBottom: 'mb-3 md:mb-4',
          description:
            "Absolutely. Use the meeting-request form to tell us what matters to your team and what you'd like to explore together.",
          descriptionColor: 'text-slate-600',
          descriptionFontSize: 'text-sm md:text-base',
          descriptionFontWeight: 'font-normal',
          descriptionMarginBottom: 'mb-6 md:mb-8',
          showArrow: false,
          showDivider: true,
          dividerColor: 'border-slate-200',
          dividerWidth: 'border-t',
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
    schedule: true,
    recapConfig: true,
    _status: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'eventStatus', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const slug = typeof data?.slug === 'string' && data.slug.trim() ? data.slug : 'preview'
        const path = generatePreviewPath({
          slug,
          collection: 'events',
        })

        return `${getServerSideURL()}${path}`
      },
    },
    preview: (data) => {
      const slug = typeof data?.slug === 'string' && data.slug.trim() ? data.slug : 'preview'
      const path = generatePreviewPath({
        slug,
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
      name: 'eventStatus',
      type: 'ui',
      label: 'Event Status',
      admin: {
        position: 'sidebar',
        components: {
          Cell: '/collections/Events/components/EventStatusCell#EventStatusCell',
          Field: '/collections/Events/components/EventStatusField#EventStatusField',
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Template & Content',
          fields: [
            {
              type: 'group',
              name: 'schedule',
              label: 'Event Operational Schedule (Required to Publish)',
              admin: {
                description:
                  'Backend dates used for event status filtering (Active, Upcoming, Ended) and gating meeting request form submissions. These dates are stored in the backend and do not alter the visual styling on the Hero section.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'startDate',
                      type: 'date',
                      label: 'Event Start Date',
                      required: true,
                      admin: {
                        width: '50%',
                        date: {
                          pickerAppearance: 'dayAndTime',
                          displayFormat: 'd MMM yyyy, HH:mm',
                        },
                        description: 'Exact date and time the event begins.',
                      },
                    },
                    {
                      name: 'endDate',
                      type: 'date',
                      label: 'Event End Date',
                      required: true,
                      validate: (value: any, { siblingData }: any) => {
                        if (
                          value &&
                          siblingData?.startDate &&
                          new Date(value) < new Date(siblingData.startDate)
                        ) {
                          return 'Event End Date must be after the Start Date.'
                        }
                        return true
                      },
                      admin: {
                        width: '50%',
                        date: {
                          pickerAppearance: 'dayAndTime',
                          displayFormat: 'd MMM yyyy, HH:mm',
                        },
                        description:
                          'Exact date and time the event concludes. After this date, meeting requests are blocked.',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                EventHero,
                EventSharedPurpose,
                EventWhyConnect,
                EventAgendaOverview,
                EventMeetingFormats,
                EventMadridVenue,
                EventConversationForm,
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
                EventUpcoming,
                PastEvent,
                EventRecapArticle,
                EventRecapFeature,
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
        {
          label: '🏁 End Event Recap',
          fields: [
            {
              type: 'group',
              name: 'recapConfig',
              label: 'End Event Recap Configuration',
              admin: {
                description:
                  'When this event has concluded and you publish this recap, the public event page will display this recap layout below the hero, and the Past Events list block will display "View recap →".',
              },
              fields: [
                {
                  name: 'isPublished',
                  type: 'checkbox',
                  label: 'Publish End Event Recap',
                  defaultValue: false,
                  admin: {
                    description:
                      'Check this box and publish the event document to activate the recap on the website.',
                  },
                },
                {
                  name: 'recapHeroNotice',
                  type: 'ui',
                  admin: {
                    components: {
                      Field: '/collections/Events/components/RecapHeroNotice#RecapHeroNotice',
                    },
                  },
                },
                {
                  name: 'recapLayout',
                  type: 'blocks',
                  label: 'Recap Sections (Sequential layout below Event Hero)',
                  defaultValue: defaultEventRecapLayout,
                  blocks: [
                    EventRecapArticle,
                    EventRecapFeature,
                    Content,
                    MediaBlock,
                    CardGrid,
                    CenteredContent,
                  ],
                  admin: {
                    description:
                      'The recap automatically keeps this event\'s Hero at the top, and renders these sections below it.',
                  },
                },
              ],
            },
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
    afterRead: [ensureRecapLayoutAfterRead],
    beforeChange: [ensureRecapLayoutBeforeChange, populatePublishedAt, populateEventSEO],
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
