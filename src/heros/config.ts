import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { textClasses } from '@/fields/textClasses'
import { buttonClasses } from '@/fields/buttonClasses'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { fontSizeOptions, fontWeightOptions } from '@/blocks/CenteredContent/config'

const eventHeroMarginBottomOptions = [
  { label: 'None (0)', value: 'mb-0' },
  { label: 'Extra Small (mb-2)', value: 'mb-2' },
  { label: 'Small (mb-3)', value: 'mb-3' },
  { label: 'Small-Medium (mb-4)', value: 'mb-4' },
  { label: 'Medium (mb-6)', value: 'mb-6' },
  { label: 'Large (mb-8)', value: 'mb-8' },
  { label: 'Extra Large (mb-10)', value: 'mb-10' },
  { label: '2X Large (mb-12)', value: 'mb-12' },
  { label: 'Custom Value', value: 'custom' },
]

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Special Home Hero',
          value: 'specialHero',
        },
        {
          label: 'Group Home Hero V2',
          value: 'groupHeroV2',
        },
        {
          label: 'Product Page Hero 1',
          value: 'productHero',
        },
        {
          label: 'Product Page Hero 2',
          value: 'productHero2',
        },
        {
          label: 'Product Page Hero About',
          value: 'productHeroAbout',
        },
        {
          label: 'Services Page Hero',
          value: 'servicesHero',
        },
        {
          label: 'Swiper Hero',
          value: 'swiperHero',
        },
        {
          label: 'Event Hero',
          value: 'eventHero',
        },
        {
          //no hero
          label: 'No Hero',
          value: 'noHero',
        },
      ],
      required: true,
    },

    {
      name: 'heroTitle',
      type: 'text',
      admin: {
        condition: (_, { type }) =>
          ['productHero2', 'productHeroAbout', 'productHero', 'servicesHero', 'swiperHero'].includes(type),
      },
    },
    buttonClasses({
      overrides: {
        name: 'heroTitleClasses',
        label: 'Hero Title Classes',
        admin: {
          condition: (_, { type }) =>
            ['productHero2', 'productHeroAbout', 'productHero', 'servicesHero', 'swiperHero'].includes(type),
        },
        defaultValue: [
          'mt-4',
          'md:mt-10',
          'bg-transparent',
          'text-black',
          'border',
          'border-black',
          'py-4',
          'px-8',
          'rounded-xl',
        ],
      },
    }),
    {
      name: 'title',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) =>
          ['productHero', 'productHero2', 'productHeroAbout', 'servicesHero', 'swiperHero'].includes(type),
      },
      required: true,
      defaultValue:
        'We back <span class="text-green-500"> disruptive</span> <br class="hidden lg:block " /> products and founders<br class="hidden lg:block " /> in retail',
    },
    textClasses({
      overrides: {
        name: 'titleClasses',
        label: 'Title Classes',
        admin: {
          condition: (_, { type }) =>
            ['productHero', 'productHero2', 'productHeroAbout', 'servicesHero', 'swiperHero'].includes(type),
        },
        defaultValue: ['text-4xl', 'md:text-6xl', 'font-bold', 'text-white'],
      },
    }),
    {
      name: 'subTitle',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) =>
          ['productHero', 'productHero2', 'productHeroAbout', 'servicesHero'].includes(type),
      },
    },
    textClasses({
      overrides: {
        name: 'subTitleClasses',
        label: 'Sub Title Classes',
        admin: {
          condition: (_, { type }) =>
            ['productHero', 'productHero2', 'productHeroAbout', 'servicesHero'].includes(type),
        },
      },
    }),

    {
      name: 'descriptionText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      admin: {
        condition: (_, { type } = {}) =>
          ['productHero', 'productHero2', 'productHeroAbout', 'servicesHero', 'swiperHero', 'groupHeroV2'].includes(
            type,
          ),
      },
    },
    textClasses({
      overrides: {
        name: 'descriptionClasses',
        label: 'Description Classes',
        admin: {
          condition: (_, { type }) =>
            ['productHero', 'productHero2', 'productHeroAbout', 'servicesHero', 'swiperHero'].includes(type),
        },
      },
    }),
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      admin: {
        condition: (_, { type } = {}) =>
          [
            'highImpact',
            'mediumImpact',
            'lowImpact',
            'specialHero',
            'productHero',
            'productHero2',
            'productHeroAbout',
            'servicesHero',
            'groupHeroV2',
          ].includes(type),
      },
    },

    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { type } = {}) =>
            [
              'highImpact',
              'mediumImpact',
              'lowImpact',
              'specialHero',
              'productHero',
              'productHero2',
              'productHeroAbout',
              'servicesHero',
              'swiperHero',
              'groupHeroV2',
            ].includes(type),
        },
      },
    }),

    {
      name: 'media',
      label: 'Hero Background Image / Video',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) =>
          [
            'highImpact',
            'mediumImpact',
            'specialHero',
            'productHero',
            'productHero2',
            'productHeroAbout',
            'servicesHero',
            'groupHeroV2',
          ].includes(type),
      },
      relationTo: 'media',
      required: false,
    },

    {
      name: 'mediaMobile',
      label: 'Hero Background Image for Mobile View',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) =>
          ['productHero', 'productHero2', 'productHeroAbout', 'servicesHero'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    bgColorPickerAll({
      overrides: {
        name: 'bgColor',
        label: 'Background Color',
        admin: {
          condition: (_, { type }) =>
            ['productHero2', 'productHeroAbout', 'servicesHero', 'swiperHero'].includes(type),
        },
        defaultValue: 'bg-sky-800',
      },
    }),
    {
      name: 'heroGraphic',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) =>
          ['productHero', 'productHero2', 'productHeroAbout', 'servicesHero'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'heroGraphicPlain',
      label: 'Use Plain Hero Graphic (No border radius or shadow)',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: (_, { type } = {}) =>
          ['productHero', 'productHero2', 'productHeroAbout', 'servicesHero'].includes(type),
      },
    },
    {
      name: 'includeStoreLinks',
      type: 'checkbox',
      admin: {
        condition: (_, { type } = {}) =>
          ['productHero', 'productHero2', 'productHeroAbout', 'specialHero', 'servicesHero'].includes(type),
      },
    },
    {
      name: 'padTop',
      type: 'checkbox',
      label: 'Pad page Top?',
      defaultValue: true,
      admin: {
        condition: (_, { type } = {}) =>
          ['productHero', 'productHero2', 'productHeroAbout', 'specialHero', 'servicesHero'].includes(type),
      },
    },
    {
      name: 'overlayText',
      type: 'text',
      admin: {
        condition: (_, { type }) => type === 'swiperHero',
      },
      defaultValue: '316 Retail Fund',
    },
    textClasses({
      overrides: {
        name: 'overlayTextClasses',
        label: 'Overlay Text Classes',
        admin: {
          condition: (_, { type }) => type === 'swiperHero',
        },
        defaultValue: [
          'text-6xl',
          'md:text-8xl',
          'font-bold',
          'text-white',
          'text-center',
          'xl:text-11xl',
        ],
      },
    }),

    {
      name: 'images',
      type: 'array',
      admin: {
        condition: (_, { type }) => type === 'swiperHero',
      },
      minRows: 2,
      maxRows: 5,
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    // ─── Group Hero V2 fields ─────────────────────────────────────────────────

    bgColorPickerAll({
      overrides: {
        name: 'heroBgColor',
        label: 'Hero Zone Background Color',
        admin: {
          condition: (_, { type }) => type === 'groupHeroV2',
          description:
            'Background color for the entire top hero zone (including where the header floats).',
        },
        defaultValue: 'bg-blue-custom',
      },
    }),

    {
      name: 'heroRounded',
      type: 'checkbox',
      label: 'Rounded Hero Zone Border',
      defaultValue: true,
      admin: {
        condition: (_, { type }) => type === 'groupHeroV2',
        description: 'When enabled the hero zone background gets a large rounded corner (rounded-[2rem]). Uncheck for sharp edges.',
      },
    },

    {
      name: 'heroBoxMargin',
      type: 'select',
      label: 'Hero Box Horizontal Margin',
      defaultValue: 'mx-[5px]',
      admin: {
        condition: (_, { type }) => type === 'groupHeroV2',
        description: 'Outer horizontal margin for the hero card and ecosystem strip.',
      },
      options: [
        { label: 'No Margin (0px - Full Bleed)', value: 'mx-0' },
        { label: '5px (Default)', value: 'mx-[5px]' },
        { label: '8px', value: 'mx-2' },
        { label: '10px', value: 'mx-[10px]' },
        { label: '12px', value: 'mx-3' },
        { label: '16px', value: 'mx-4' },
        { label: '20px', value: 'mx-5' },
        { label: '24px', value: 'mx-6' },
        { label: '32px', value: 'mx-8' },
        { label: 'Custom Margin', value: 'custom' },
      ],
    },
    {
      name: 'heroBoxMarginCustom',
      type: 'text',
      label: 'Custom Margin Value (e.g. 15px)',
      admin: {
        condition: (_, { type, heroBoxMargin }) =>
          type === 'groupHeroV2' && heroBoxMargin === 'custom',
        description: 'Specify a custom CSS margin value (e.g., 15px, 2.5rem).',
      },
    },

    {
      name: 'headerContentSpacing',
      type: 'select',
      label: 'Header to Content Spacing',
      defaultValue: 'default',
      admin: {
        condition: (_, { type }) => type === 'groupHeroV2',
        description:
          'Vertical spacing between the header navigation and the hero title/content. Pushes content down and expands total container height.',
      },
      options: [
        { label: 'Default (~24px)', value: 'default' },
        { label: 'Extra Small (30px)', value: '30px' },
        { label: 'Small (50px)', value: '50px' },
        { label: 'Medium (75px)', value: '75px' },
        { label: 'Standard (100px)', value: '100px' },
        { label: 'Large (125px)', value: '125px' },
        { label: 'Extra Large (150px)', value: '150px' },
        { label: 'Custom Spacing', value: 'custom' },
      ],
    },
    {
      name: 'headerContentSpacingCustom',
      type: 'text',
      label: 'Custom Spacing Value (e.g. 80px or 120px)',
      admin: {
        condition: (_, { type, headerContentSpacing }) =>
          type === 'groupHeroV2' && headerContentSpacing === 'custom',
        description: 'Specify a custom pixel or rem value (e.g., 80px, 120px).',
      },
    },

    // ─── GroupHeroV2 Text Colour Pickers ─────────────────────────────────────

    textColorPickerAll({
      overrides: {
        name: 'headingTextColor',
        label: 'Heading Text Color',
        admin: {
          condition: (_, { type }) => type === 'groupHeroV2',
        },
        defaultValue: 'text-white',
      },
    }),

    textColorPickerAll({
      overrides: {
        name: 'descriptionTextColor',
        label: 'Description Text Color',
        admin: {
          condition: (_, { type }) => type === 'groupHeroV2',
        },
        defaultValue: 'text-white',
      },
    }),

    textColorPickerAll({
      overrides: {
        name: 'glanceHeadingTextColor',
        label: 'Glance Heading Text Color',
        admin: {
          condition: (_, { type }) => type === 'groupHeroV2',
        },
        defaultValue: 'text-white',
      },
    }),

    textColorPickerAll({
      overrides: {
        name: 'glanceDescriptionTextColor',
        label: 'Glance Description Text Color',
        admin: {
          condition: (_, { type }) => type === 'groupHeroV2',
        },
        defaultValue: 'text-white',
      },
    }),

    textColorPickerAll({
      overrides: {
        name: 'statValueTextColor',
        label: 'Stat Value Text Color',
        admin: {
          condition: (_, { type }) => type === 'groupHeroV2',
        },
        defaultValue: 'text-white',
      },
    }),

    textColorPickerAll({
      overrides: {
        name: 'statLabelTextColor',
        label: 'Stat Label Text Color',
        admin: {
          condition: (_, { type }) => type === 'groupHeroV2',
        },
        defaultValue: 'text-white',
      },
    }),

    textColorPickerAll({
      overrides: {
        name: 'ecosystemTitleTextColor',
        label: 'Ecosystem Title Text Color',
        admin: {
          condition: (_, { type }) => type === 'groupHeroV2',
        },
        defaultValue: 'text-current',
      },
    }),

    textColorPickerAll({
      overrides: {
        name: 'ecosystemItemsTextColor',
        label: 'Ecosystem Items Text Color',
        admin: {
          condition: (_, { type }) => type === 'groupHeroV2',
        },
        defaultValue: 'text-current',
      },
    }),

    // ─── GroupHeroV2 Entrance Animation ───────────────────────────────────────
    {
      name: 'entranceAnimation',
      type: 'group',
      label: 'Entrance Animation',
      admin: {
        condition: (_, { type }) => type === 'groupHeroV2',
        description: 'Controls the animated entrance when the page loads.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Entrance Animation',
          defaultValue: true,
        },
        {
          name: 'type',
          type: 'select',
          label: 'Animation Type',
          defaultValue: 'fade-up',
          admin: { condition: (_, s) => s.enabled !== false },
          options: [
            { label: 'Fade Up (default)', value: 'fade-up' },
            { label: 'Fade Down', value: 'fade-down' },
            { label: 'Fade In (no movement)', value: 'fade-in' },
            { label: 'Fade Left (slide from right)', value: 'fade-left' },
            { label: 'Fade Right (slide from left)', value: 'fade-right' },
            { label: 'Zoom In', value: 'zoom-in' },
            { label: 'Slide Up', value: 'slide-up' },
          ],
        },
        {
          name: 'speed',
          type: 'select',
          label: 'Animation Speed',
          defaultValue: 'normal',
          admin: { condition: (_, s) => s.enabled !== false },
          options: [
            { label: 'Fast (350ms)', value: 'fast' },
            { label: 'Normal (650ms)', value: 'normal' },
            { label: 'Slow (1000ms)', value: 'slow' },
          ],
        },
        {
          name: 'headingDelay',
          type: 'select',
          label: 'Heading Delay',
          defaultValue: '0',
          admin: { condition: (_, s) => s.enabled !== false },
          options: [
            { label: 'No delay', value: '0' },
            { label: '100ms', value: '100' },
            { label: '150ms', value: '150' },
            { label: '200ms', value: '200' },
            { label: '300ms', value: '300' },
          ],
        },
        {
          name: 'descriptionDelay',
          type: 'select',
          label: 'Description Delay',
          defaultValue: '150',
          admin: { condition: (_, s) => s.enabled !== false },
          options: [
            { label: 'No delay', value: '0' },
            { label: '100ms', value: '100' },
            { label: '150ms', value: '150' },
            { label: '200ms', value: '200' },
            { label: '300ms', value: '300' },
            { label: '400ms', value: '400' },
          ],
        },
        {
          name: 'mediaDelay',
          type: 'select',
          label: 'Media / Image Delay',
          defaultValue: '300',
          admin: { condition: (_, s) => s.enabled !== false },
          options: [
            { label: 'No delay', value: '0' },
            { label: '150ms', value: '150' },
            { label: '200ms', value: '200' },
            { label: '300ms', value: '300' },
            { label: '400ms', value: '400' },
            { label: '500ms', value: '500' },
            { label: '600ms', value: '600' },
          ],
        },
        {
          name: 'statsDelay',
          type: 'select',
          label: 'Stats Section Delay',
          defaultValue: '400',
          admin: { condition: (_, s) => s.enabled !== false },
          options: [
            { label: 'No delay', value: '0' },
            { label: '200ms', value: '200' },
            { label: '300ms', value: '300' },
            { label: '400ms', value: '400' },
            { label: '500ms', value: '500' },
            { label: '600ms', value: '600' },
            { label: '800ms', value: '800' },
          ],
        },
      ],
    },


    {
      name: 'badgeText',
      type: 'text',
      label: 'Badge Text',
      admin: {
        condition: (_, { type }) => type === 'groupHeroV2',
        description: 'Short pill/badge label, e.g. "The group at a glance".',
      },
    },


    bgColorPickerAll({
      overrides: {
        name: 'badgeBgColor',
        label: 'Badge Background Color',
        admin: {
          condition: (_, { type }) => type === 'groupHeroV2',
        },
        defaultValue: 'bg-white',
      },
    }),

    {
      name: 'glanceHeading',
      type: 'richText',
      label: 'Glance Heading (Left Column)',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      admin: {
        condition: (_, { type }) => type === 'groupHeroV2',
        description: 'Large heading in left column of the "at a glance" section.',
      },
    },

    {
      name: 'glanceDescription',
      type: 'richText',
      label: 'Glance Description (Right Column)',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      admin: {
        condition: (_, { type }) => type === 'groupHeroV2',
        description: 'Paragraph text in right column, aligned with the glance heading.',
      },
    },

    {
      name: 'dividerColor',
      type: 'select',
      label: 'Divider Line Color',
      admin: {
        condition: (_, { type }) => type === 'groupHeroV2',
      },
      defaultValue: 'border-white/30',
      options: [
        { label: 'White (30% opacity)', value: 'border-white/30' },
        { label: 'White (60% opacity)', value: 'border-white/60' },
        { label: 'White (full)', value: 'border-white' },
        { label: 'Black (30% opacity)', value: 'border-black/30' },
        { label: 'Black (60% opacity)', value: 'border-black/60' },
        { label: 'Black (full)', value: 'border-black' },
        { label: 'Gray 300', value: 'border-gray-300' },
        { label: 'Gray 500', value: 'border-gray-500' },
        { label: 'Gray 700', value: 'border-gray-700' },
        { label: 'Custom Blue', value: 'border-blue-custom' },
        { label: 'Transparent', value: 'border-transparent' },
      ],
    },

    {
      name: 'dividerWidth',
      type: 'select',
      label: 'Divider Width',
      admin: {
        condition: (_, { type }) => type === 'groupHeroV2',
      },
      defaultValue: 'w-full',
      options: [
        { label: 'Full Width', value: 'w-full' },
        { label: '11/12', value: 'w-11/12' },
        { label: '4/5', value: 'w-4/5' },
        { label: '3/4', value: 'w-3/4' },
        { label: '1/2', value: 'w-1/2' },
      ],
    },

    {
      name: 'statItems',
      type: 'array',
      label: 'Stat Items (max 4)',
      admin: {
        condition: (_, { type }) => type === 'groupHeroV2',
        description:
          'Each item shows a large bold value (e.g. "04") with a smaller label below. Max 4 shown per row.',
      },
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'statValue',
          type: 'text',
          label: 'Value',
          required: true,
        },
        {
          name: 'statLabel',
          type: 'text',
          label: 'Label',
          required: true,
        },
      ],
    },

    // ─── Group Hero V2 — Ecosystem Strip ─────────────────────────────────────

    {
      name: 'ecosystemTitle',
      type: 'text',
      label: 'Ecosystem Section Title',
      admin: {
        condition: (_, { type }) => type === 'groupHeroV2',
        description: 'Label shown on the left of the ecosystem strip, e.g. "OUR CONNECTED ECOSYSTEM".',
      },
    },

    bgColorPickerAll({
      overrides: {
        name: 'ecosystemBgColor',
        label: 'Ecosystem Strip Background Color',
        admin: {
          condition: (_, { type }) => type === 'groupHeroV2',
          description:
            'Background of the bottom ecosystem strip. Use bg-transparent for no background.',
        },
        defaultValue: 'bg-transparent',
      },
    }),

    {
      name: 'ecosystemItems',
      type: 'array',
      label: 'Ecosystem Items',
      admin: {
        condition: (_, { type }) => type === 'groupHeroV2',
        description:
          'Each item is a brand name. Add as many as needed — up to 5 will display per row. Use the Bold button to bold part of the text (e.g. bold "Connect" in "FintecConnect").',
      },
      fields: [
        {
          name: 'itemText',
          type: 'richText',
          label: 'Brand Name',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          required: true,
        },
      ],
    },

    // ─── Event Hero Fields ───────────────────────────────────────────────────

    bgColorPickerAll({
      overrides: {
        name: 'eventHeroBgColor',
        label: 'Event Hero Background Color',
        defaultValue: 'bg-[#0000FF]',
        admin: {
          condition: (_, { type }) => type === 'eventHero',
          description: 'Background color of the full-height Event Hero. Defaults to the royal blue in mockup (#0000FF).',
        },
      },
    }),

    {
      name: 'eventHeroMatchHeaderPillWidth',
      type: 'checkbox',
      label: 'Match Header Pill Width (Container)',
      defaultValue: true,
      admin: {
        condition: (_, { type }) => type === 'eventHero',
        description:
          'When checked, hero content container matches the site header (max 1,472px centered). Uncheck to set custom horizontal padding.',
      },
    },

    // Vertical Padding: Top and Bottom individually for desktop & mobile
    {
      type: 'row',
      admin: {
        condition: (_, { type }) => type === 'eventHero',
      },
      fields: [
        {
          name: 'eventHeroPaddingTopDesktop',
          type: 'text',
          label: 'Desktop Padding Top (e.g. pt-24 or 96px)',
          defaultValue: 'pt-24',
          admin: { width: '50%' },
        },
        {
          name: 'eventHeroPaddingTopMobile',
          type: 'text',
          label: 'Mobile Padding Top (e.g. pt-16 or 64px)',
          defaultValue: 'pt-16',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      admin: {
        condition: (_, { type }) => type === 'eventHero',
      },
      fields: [
        {
          name: 'eventHeroPaddingBottomDesktop',
          type: 'text',
          label: 'Desktop Padding Bottom (e.g. pb-24 or 96px)',
          defaultValue: 'pb-24',
          admin: { width: '50%' },
        },
        {
          name: 'eventHeroPaddingBottomMobile',
          type: 'text',
          label: 'Mobile Padding Bottom (e.g. pb-16 or 64px)',
          defaultValue: 'pb-16',
          admin: { width: '50%' },
        },
      ],
    },

    // Horizontal Padding: Enabled only if matchHeaderPillWidth is false
    {
      type: 'row',
      admin: {
        condition: (_, { type, eventHeroMatchHeaderPillWidth }) =>
          type === 'eventHero' && eventHeroMatchHeaderPillWidth === false,
      },
      fields: [
        {
          name: 'eventHeroPaddingLeftDesktop',
          type: 'text',
          label: 'Desktop Padding Left (e.g. pl-12 or 50px)',
          defaultValue: 'pl-12',
          admin: { width: '50%' },
        },
        {
          name: 'eventHeroPaddingLeftMobile',
          type: 'text',
          label: 'Mobile Padding Left (e.g. pl-4 or 16px)',
          defaultValue: 'pl-4',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      admin: {
        condition: (_, { type, eventHeroMatchHeaderPillWidth }) =>
          type === 'eventHero' && eventHeroMatchHeaderPillWidth === false,
      },
      fields: [
        {
          name: 'eventHeroPaddingRightDesktop',
          type: 'text',
          label: 'Desktop Padding Right (e.g. pr-12 or 50px)',
          defaultValue: 'pr-12',
          admin: { width: '50%' },
        },
        {
          name: 'eventHeroPaddingRightMobile',
          type: 'text',
          label: 'Mobile Padding Right (e.g. pr-4 or 16px)',
          defaultValue: 'pr-4',
          admin: { width: '50%' },
        },
      ],
    },

    // Sub Header
    {
      name: 'eventHeroSubHeader',
      type: 'text',
      label: 'Sub Header Text',
      defaultValue: 'EVENTS & CONNECTIONS',
      admin: {
        condition: (_, { type }) => type === 'eventHero',
      },
    },
    textColorPickerAll({
      overrides: {
        name: 'eventHeroSubHeaderTextColor',
        label: 'Sub Header Text Color',
        defaultValue: 'text-white',
        admin: {
          condition: (_, { type }) => type === 'eventHero',
        },
      },
    }),
    {
      type: 'row',
      admin: { condition: (_, { type }) => type === 'eventHero' },
      fields: [
        {
          name: 'eventHeroSubHeaderFontSizeDesktop',
          type: 'select',
          label: 'Sub Header Font Size (Desktop)',
          defaultValue: 'text-sm',
          options: fontSizeOptions,
          admin: { width: '50%' },
        },
        {
          name: 'eventHeroSubHeaderFontSizeMobile',
          type: 'select',
          label: 'Sub Header Font Size (Mobile)',
          defaultValue: 'text-xs',
          options: fontSizeOptions,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      admin: { condition: (_, { type }) => type === 'eventHero' },
      fields: [
        {
          name: 'eventHeroSubHeaderFontWeightDesktop',
          type: 'select',
          label: 'Sub Header Font Weight (Desktop)',
          defaultValue: 'font-semibold',
          options: fontWeightOptions,
          admin: { width: '50%' },
        },
        {
          name: 'eventHeroSubHeaderFontWeightMobile',
          type: 'select',
          label: 'Sub Header Font Weight (Mobile)',
          defaultValue: 'font-semibold',
          options: fontWeightOptions,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      admin: { condition: (_, { type }) => type === 'eventHero' },
      fields: [
        {
          name: 'eventHeroSubHeaderMarginBottomDesktop',
          type: 'select',
          label: 'Sub Header Margin Bottom (Desktop)',
          defaultValue: 'mb-4',
          options: eventHeroMarginBottomOptions,
          admin: { width: '50%' },
        },
        {
          name: 'eventHeroSubHeaderMarginBottomMobile',
          type: 'select',
          label: 'Sub Header Margin Bottom (Mobile)',
          defaultValue: 'mb-3',
          options: eventHeroMarginBottomOptions,
          admin: { width: '50%' },
        },
      ],
    },

    // Heading
    {
      name: 'eventHeroHeading',
      type: 'richText',
      label: 'Main Heading (Supports RichText & Inline Styling)',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      admin: {
        condition: (_, { type }) => type === 'eventHero',
        description: 'Main heading for the Event Hero. Supports inline text styling, colors, bolding, and line breaks.',
      },
    },
    textColorPickerAll({
      overrides: {
        name: 'eventHeroHeadingTextColor',
        label: 'Heading Text Color',
        defaultValue: 'text-white',
        admin: {
          condition: (_, { type }) => type === 'eventHero',
        },
      },
    }),
    {
      type: 'row',
      admin: { condition: (_, { type }) => type === 'eventHero' },
      fields: [
        {
          name: 'eventHeroHeadingFontSizeDesktop',
          type: 'select',
          label: 'Heading Font Size (Desktop)',
          defaultValue: 'text-6xl',
          options: fontSizeOptions,
          admin: { width: '50%' },
        },
        {
          name: 'eventHeroHeadingFontSizeMobile',
          type: 'select',
          label: 'Heading Font Size (Mobile)',
          defaultValue: 'text-3xl',
          options: fontSizeOptions,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      admin: { condition: (_, { type }) => type === 'eventHero' },
      fields: [
        {
          name: 'eventHeroHeadingFontWeightDesktop',
          type: 'select',
          label: 'Heading Font Weight (Desktop)',
          defaultValue: 'font-bold',
          options: fontWeightOptions,
          admin: { width: '50%' },
        },
        {
          name: 'eventHeroHeadingFontWeightMobile',
          type: 'select',
          label: 'Heading Font Weight (Mobile)',
          defaultValue: 'font-bold',
          options: fontWeightOptions,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      admin: { condition: (_, { type }) => type === 'eventHero' },
      fields: [
        {
          name: 'eventHeroHeadingMarginBottomDesktop',
          type: 'select',
          label: 'Heading Margin Bottom (Desktop)',
          defaultValue: 'mb-6',
          options: eventHeroMarginBottomOptions,
          admin: { width: '50%' },
        },
        {
          name: 'eventHeroHeadingMarginBottomMobile',
          type: 'select',
          label: 'Heading Margin Bottom (Mobile)',
          defaultValue: 'mb-4',
          options: eventHeroMarginBottomOptions,
          admin: { width: '50%' },
        },
      ],
    },

    // Description
    {
      name: 'eventHeroDescription',
      type: 'richText',
      label: 'Description (Supports RichText & Inline Styling)',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      admin: {
        condition: (_, { type }) => type === 'eventHero',
        description: 'Description paragraph. Supports inline styling and preserves paragraph spacing.',
      },
    },
    textColorPickerAll({
      overrides: {
        name: 'eventHeroDescriptionTextColor',
        label: 'Description Text Color',
        defaultValue: 'text-white/90',
        admin: {
          condition: (_, { type }) => type === 'eventHero',
        },
      },
    }),
    {
      type: 'row',
      admin: { condition: (_, { type }) => type === 'eventHero' },
      fields: [
        {
          name: 'eventHeroDescriptionFontSizeDesktop',
          type: 'select',
          label: 'Description Font Size (Desktop)',
          defaultValue: 'text-lg md:text-xl',
          options: fontSizeOptions,
          admin: { width: '50%' },
        },
        {
          name: 'eventHeroDescriptionFontSizeMobile',
          type: 'select',
          label: 'Description Font Size (Mobile)',
          defaultValue: 'text-base',
          options: fontSizeOptions,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      admin: { condition: (_, { type }) => type === 'eventHero' },
      fields: [
        {
          name: 'eventHeroDescriptionFontWeightDesktop',
          type: 'select',
          label: 'Description Font Weight (Desktop)',
          defaultValue: 'font-normal',
          options: fontWeightOptions,
          admin: { width: '50%' },
        },
        {
          name: 'eventHeroDescriptionFontWeightMobile',
          type: 'select',
          label: 'Description Font Weight (Mobile)',
          defaultValue: 'font-normal',
          options: fontWeightOptions,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      admin: { condition: (_, { type }) => type === 'eventHero' },
      fields: [
        {
          name: 'eventHeroDescriptionMarginBottomDesktop',
          type: 'select',
          label: 'Description Margin Bottom (Desktop)',
          defaultValue: 'mb-8',
          options: eventHeroMarginBottomOptions,
          admin: { width: '50%' },
        },
        {
          name: 'eventHeroDescriptionMarginBottomMobile',
          type: 'select',
          label: 'Description Margin Bottom (Mobile)',
          defaultValue: 'mb-6',
          options: eventHeroMarginBottomOptions,
          admin: { width: '50%' },
        },
      ],
    },

    // Right Column Image
    {
      name: 'eventHeroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Right Column Image',
      required: false,
      admin: {
        condition: (_, { type }) => type === 'eventHero',
        description: 'Upload right column image. Rendered without borders or shadows. Fallback placeholder used if none uploaded.',
      },
    },
  ],

  label: false,
}
