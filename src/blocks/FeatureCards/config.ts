import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const allowAnySelect = (() => true as const) as any

const alignmentOptions = [
  { label: 'Left (Default)', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
]

export const featureCardsFields: Field[] = [
  // ─── 1. Section Spacing & Background ─────────────────────────────────────
  {
    type: 'row',
    fields: [
      bgColorPickerAll({
        overrides: {
          name: 'sectionBgColor',
          label: 'Section Background Color',
          defaultValue: 'bg-transparent',
          validate: allowAnySelect,
          admin: { width: '33.33%' },
        },
      }),
      {
        name: 'paddingTop',
        type: 'select',
        label: 'Padding Top',
        defaultValue: 'pt-16',
        validate: allowAnySelect,
        admin: { width: '33.33%' },
        options: [
          { label: 'None (0)', value: 'pt-0' },
          { label: 'Small (pt-12)', value: 'pt-12' },
          { label: 'Medium (pt-16 - Default)', value: 'pt-16' },
          { label: 'Large (pt-20)', value: 'pt-20' },
          { label: 'Extra Large (pt-28)', value: 'pt-28' },
        ],
      },
      {
        name: 'paddingBottom',
        type: 'select',
        label: 'Padding Bottom',
        defaultValue: 'pb-16',
        validate: allowAnySelect,
        admin: { width: '33.33%' },
        options: [
          { label: 'None (0)', value: 'pb-0' },
          { label: 'Small (pb-12)', value: 'pb-12' },
          { label: 'Medium (pb-16 - Default)', value: 'pb-16' },
          { label: 'Large (pb-20)', value: 'pb-20' },
          { label: 'Extra Large (pb-28)', value: 'pb-28' },
        ],
      },
    ],
  },

  // ─── Horizontal Padding Controls ──────────────────────────────────────────
  {
    type: 'row',
    fields: [
      {
        name: 'paddingMode',
        type: 'select',
        label: 'Horizontal Padding Mode',
        defaultValue: 'default',
        validate: allowAnySelect,
        options: [
          { label: 'Default Padding (Responsive 16px - 48px, Max-Width 1280px)', value: 'default' },
          { label: 'No Padding / Full Width Column Bleed (0px)', value: 'none' },
          { label: 'Custom Horizontal Padding', value: 'custom' },
        ],
        admin: {
          width: '33.33%',
          description: 'Set to "No Padding" to let the cards span the full available width of the column.',
        },
      },
      {
        name: 'paddingXDesktop',
        type: 'select',
        label: 'Desktop Padding Left / Right',
        defaultValue: '48px',
        validate: allowAnySelect,
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '10px', value: '10px' },
          { label: '16px', value: '16px' },
          { label: '24px', value: '24px' },
          { label: '32px', value: '32px' },
          { label: '40px', value: '40px' },
          { label: '48px (Default XL)', value: '48px' },
          { label: '60px', value: '60px' },
          { label: '80px', value: '80px' },
          { label: '100px', value: '100px' },
          { label: '120px', value: '120px' },
          { label: '150px', value: '150px' },
          { label: '180px', value: '180px' },
          { label: '200px', value: '200px' },
          { label: '250px', value: '250px' },
          { label: '300px', value: '300px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: {
          width: '33.33%',
          condition: (_, siblingData) => siblingData?.paddingMode === 'custom',
        },
      },
      {
        name: 'paddingXMobile',
        type: 'select',
        label: 'Mobile Padding Left / Right',
        defaultValue: '16px',
        validate: allowAnySelect,
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '8px', value: '8px' },
          { label: '10px', value: '10px' },
          { label: '16px (Default Mobile)', value: '16px' },
          { label: '20px', value: '20px' },
          { label: '24px', value: '24px' },
          { label: '32px', value: '32px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: {
          width: '33.33%',
          condition: (_, siblingData) => siblingData?.paddingMode === 'custom',
        },
      },
    ],
  },
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) => siblingData?.paddingMode === 'custom',
    },
    fields: [
      {
        name: 'paddingXDesktopCustom',
        type: 'text',
        label: 'Custom Desktop Padding (e.g. 50px)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.paddingXDesktop === 'custom',
        },
      },
      {
        name: 'paddingXMobileCustom',
        type: 'text',
        label: 'Custom Mobile Padding (e.g. 15px)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.paddingXMobile === 'custom',
        },
      },
    ],
  },

  // ─── Slider Carousel Controls ─────────────────────────────────────────────
  {
    name: 'enableSlider',
    type: 'checkbox',
    label: 'Enable Slider Carousel (Slide cards instead of static grid)',
    defaultValue: false,
    admin: {
      description: 'When enabled, feature cards display as a swipeable/sliding carousel with configurable controls.',
    },
  },
  {
    name: 'sliderSettings',
    type: 'group',
    label: 'Slider Carousel Settings',
    admin: {
      condition: (_, siblingData) => Boolean(siblingData?.enableSlider),
      description: 'Configure slides to show, scroll steps, autoplay, direction, indicators, and arrows.',
    },
    fields: [
      // 1. Visible Cards Count (Desktop & Mobile)
      {
        type: 'row',
        fields: [
          {
            name: 'slidesToShowDesktop',
            type: 'select',
            label: 'Desktop: Cards to Show',
            defaultValue: '4',
            validate: allowAnySelect,
            options: [
              { label: '4 Cards (Default)', value: '4' },
              { label: '3 Cards', value: '3' },
              { label: '2 Cards', value: '2' },
              { label: '1 Card', value: '1' },
              { label: 'Custom', value: 'custom' },
            ],
            admin: {
              width: '25%',
              description: 'Number of cards visible at once on desktop (screen width >= 1024px).',
            },
          },
          {
            name: 'slidesToShowDesktopCustom',
            type: 'number',
            label: 'Custom Desktop Cards Count',
            defaultValue: 4,
            min: 1,
            max: 8,
            admin: {
              width: '25%',
              condition: (_, siblingData) => siblingData?.slidesToShowDesktop === 'custom',
            },
          },
          {
            name: 'slidesToShowMobile',
            type: 'select',
            label: 'Mobile: Cards to Show',
            defaultValue: '1',
            validate: allowAnySelect,
            options: [
              { label: '1 Card (Default)', value: '1' },
              { label: '1.2 Cards (Peek next card)', value: '1.2' },
              { label: '1.5 Cards', value: '1.5' },
              { label: '2 Cards', value: '2' },
              { label: 'Custom', value: 'custom' },
            ],
            admin: {
              width: '25%',
              description: 'Number of cards visible at once on mobile.',
            },
          },
          {
            name: 'slidesToShowMobileCustom',
            type: 'number',
            label: 'Custom Mobile Cards Count',
            defaultValue: 1,
            min: 1,
            max: 4,
            admin: {
              width: '25%',
              condition: (_, siblingData) => siblingData?.slidesToShowMobile === 'custom',
            },
          },
        ],
      },

      // 2. Slides to Scroll (Step)
      {
        type: 'row',
        fields: [
          {
            name: 'slidesToScrollDesktop',
            type: 'select',
            label: 'Desktop: Cards to Slide Over Per Step',
            defaultValue: '1',
            validate: allowAnySelect,
            options: [
              { label: '1 Card at a time (Default)', value: '1' },
              { label: '2 Cards at a time', value: '2' },
              { label: '3 Cards at a time', value: '3' },
              { label: '4 Cards at a time (Full page flip)', value: '4' },
            ],
            admin: {
              width: '50%',
              description: 'How many cards to advance when sliding on desktop.',
            },
          },
          {
            name: 'slidesToScrollMobile',
            type: 'select',
            label: 'Mobile: Cards to Slide Over Per Step',
            defaultValue: '1',
            validate: allowAnySelect,
            options: [
              { label: '1 Card at a time (Default)', value: '1' },
              { label: '2 Cards at a time', value: '2' },
            ],
            admin: {
              width: '50%',
              description: 'How many cards to advance when sliding on mobile.',
            },
          },
        ],
      },

      // 3. Autoplay & Direction
      {
        type: 'row',
        fields: [
          {
            name: 'autoSlide',
            type: 'checkbox',
            label: 'Enable Auto Slider (Autoplay)',
            defaultValue: false,
            admin: {
              width: '33.33%',
              description: 'Automatically advance to the next slide at timed intervals.',
            },
          },
          {
            name: 'autoSlideInterval',
            type: 'number',
            label: 'Auto Slide Delay / Interval (ms)',
            defaultValue: 4000,
            min: 1000,
            max: 30000,
            admin: {
              width: '33.33%',
              condition: (_, siblingData) => Boolean(siblingData?.autoSlide),
              description: 'Time in milliseconds between auto transitions (Default: 4000ms = 4 seconds).',
            },
          },
          {
            name: 'slideDirection',
            type: 'select',
            label: 'Slider Movement Direction',
            defaultValue: 'ltr',
            validate: allowAnySelect,
            options: [
              { label: 'Left to Right (Standard Forward - Default)', value: 'ltr' },
              { label: 'Right to Left (Reverse Direction)', value: 'rtl' },
            ],
            admin: {
              width: '33.33%',
              description: 'Direction in which the slider advances.',
            },
          },
        ],
      },

      // 4. Navigation Arrows & Footer Indicators
      {
        type: 'row',
        fields: [
          {
            name: 'showArrows',
            type: 'checkbox',
            label: 'Show Navigation Arrows (Positioned at right end)',
            defaultValue: true,
            admin: {
              width: '50%',
              description: 'Displays Left & Right arrow buttons at the top-right end above the cards.',
            },
          },
          {
            name: 'showIndicators',
            type: 'checkbox',
            label: 'Show Footer Indicators (Clickable pagination dots)',
            defaultValue: true,
            admin: {
              width: '50%',
              description: 'Displays clickable dots at the bottom to jump directly to any slide.',
            },
          },
        ],
      },
    ],
  },

  // ─── Cards Array ──────────────────────────────────────────────────────────
  {
    name: 'cards',
    type: 'array',
    label: 'Feature Cards (Max 3 Per Row)',
    minRows: 1,
    defaultValue: [
      {
        headingGroup: {
          heading: 'AES-256 Encryption',
          headingColor: 'text-gray-950',
          headingFontSize: 'text-2xl md:text-[1.65rem]',
          headingFontWeight: 'font-bold',
          headingAlignment: 'left',
        },
        descriptionGroup: {
          description:
            'All data at rest is encrypted with AES-256. All data in transit is protected with TLS 1.3. Cryptographic keys are managed via HSM with automatic rotation.',
          descriptionColor: 'text-gray-600',
          descriptionFontSize: 'text-sm md:text-base',
          descriptionFontWeight: 'font-normal',
          descriptionAlignment: 'left',
        },
        iconGroup: {
          iconCardBgColor: 'bg-[#EFF2FE]',
          iconAlignment: 'left',
        },
        cardBgColor: 'bg-white',
      },
      {
        headingGroup: {
          heading: 'MPC Crypto Custody',
          headingColor: 'text-gray-950',
          headingFontSize: 'text-2xl md:text-[1.65rem]',
          headingFontWeight: 'font-bold',
          headingAlignment: 'left',
        },
        descriptionGroup: {
          description:
            'Digital assets are secured with Multi-Party Computation (MPC) technology. No single point of key compromise. Hot/cold storage tiering with institutional-grade custody controls.',
          descriptionColor: 'text-gray-600',
          descriptionFontSize: 'text-sm md:text-base',
          descriptionFontWeight: 'font-normal',
          descriptionAlignment: 'left',
        },
        iconGroup: {
          iconCardBgColor: 'bg-[#EFF2FE]',
          iconAlignment: 'left',
        },
        cardBgColor: 'bg-white',
      },
      {
        headingGroup: {
          heading: 'Banking Rails',
          headingColor: 'text-gray-950',
          headingFontSize: 'text-2xl md:text-[1.65rem]',
          headingFontWeight: 'font-bold',
          headingAlignment: 'left',
        },
        descriptionGroup: {
          description:
            'Continuous SIEM monitoring, automated vulnerability scanning, and a dedicated security operations centre (SOC) watching your platform around the clock.',
          descriptionColor: 'text-gray-600',
          descriptionFontSize: 'text-sm md:text-base',
          descriptionFontWeight: 'font-normal',
          descriptionAlignment: 'left',
        },
        iconGroup: {
          iconCardBgColor: 'bg-[#EFF2FE]',
          iconAlignment: 'left',
        },
        cardBgColor: 'bg-white',
      },
    ],
    fields: [
      // ── Card Container Style ──
      bgColorPickerAll({
        overrides: {
          name: 'cardBgColor',
          label: 'Card Background Color',
          defaultValue: 'bg-white',
          validate: allowAnySelect,
        },
      }),

      // ── Icon Area Settings ──
      {
        name: 'iconGroup',
        type: 'group',
        label: 'Icon Area Settings',
        fields: [
          {
            name: 'icon',
            type: 'upload',
            relationTo: 'media',
            label: 'Upload Icon Image (SVG / PNG)',
            required: false,
          },
          {
            type: 'row',
            fields: [
              bgColorPickerAll({
                overrides: {
                  name: 'iconCardBgColor',
                  label: 'Icon Badge Background',
                  defaultValue: 'bg-[#EFF2FE]',
                  validate: allowAnySelect,
                  admin: { width: '50%' },
                },
              }),
              {
                name: 'iconAlignment',
                type: 'select',
                label: 'Icon Badge Alignment',
                defaultValue: 'left',
                validate: allowAnySelect,
                options: alignmentOptions,
                admin: { width: '50%' },
              },
            ],
          },
        ],
      },

      // ── Subtitle / Pre-Heading Settings ──
      {
        name: 'subtitleGroup',
        type: 'group',
        label: 'Subtitle / Pre-Heading Settings',
        fields: [
          {
            name: 'subtitle',
            type: 'text',
            label: 'Subtitle / Tagline Text',
            required: false,
            admin: {
              description:
                'Optional text shown under the icon and above the heading (e.g. "Future proof"). Supports inline styling.',
            },
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'subtitleColor',
                  label: 'Text Color',
                  defaultValue: 'text-gray-950',
                  validate: allowAnySelect,
                  admin: { width: '25%' },
                },
              }),
              {
                name: 'subtitleFontSize',
                type: 'select',
                label: 'Font Size',
                defaultValue: 'text-base',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'subtitleFontWeight',
                type: 'select',
                label: 'Font Weight',
                defaultValue: 'font-normal',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'subtitleAlignment',
                type: 'select',
                label: 'Alignment',
                defaultValue: 'left',
                validate: allowAnySelect,
                options: alignmentOptions,
                admin: { width: '25%' },
              },
            ],
          },
        ],
      },

      // ── Heading Settings ──
      {
        name: 'headingGroup',
        type: 'group',
        label: 'Heading Settings',
        fields: [
          {
            name: 'heading',
            type: 'text',
            label: 'Heading Text',
            required: true,
            defaultValue: 'Feature Title',
            admin: {
              description:
                'Supports inline styling like <style="color:#0256FF">highlighted text</style>.',
            },
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'headingColor',
                  label: 'Heading Color',
                  defaultValue: 'text-gray-950',
                  validate: allowAnySelect,
                  admin: { width: '25%' },
                },
              }),
              {
                name: 'headingFontSize',
                type: 'select',
                label: 'Font Size',
                defaultValue: 'text-2xl md:text-[1.65rem]',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'headingFontWeight',
                type: 'select',
                label: 'Font Weight',
                defaultValue: 'font-bold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'headingAlignment',
                type: 'select',
                label: 'Alignment',
                defaultValue: 'left',
                validate: allowAnySelect,
                options: alignmentOptions,
                admin: { width: '25%' },
              },
            ],
          },
        ],
      },

      // ── Description Settings ──
      {
        name: 'descriptionGroup',
        type: 'group',
        label: 'Description Settings',
        fields: [
          {
            name: 'description',
            type: 'textarea',
            label: 'Description Text',
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'descriptionColor',
                  label: 'Description Color',
                  defaultValue: 'text-gray-600',
                  validate: allowAnySelect,
                  admin: { width: '25%' },
                },
              }),
              {
                name: 'descriptionFontSize',
                type: 'select',
                label: 'Font Size',
                defaultValue: 'text-sm md:text-base',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'descriptionFontWeight',
                type: 'select',
                label: 'Font Weight',
                defaultValue: 'font-normal',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'descriptionAlignment',
                type: 'select',
                label: 'Alignment',
                defaultValue: 'left',
                validate: allowAnySelect,
                options: alignmentOptions,
                admin: { width: '25%' },
              },
            ],
          },
        ],
      },
    ],
  },
]

export const FeatureCards: Block = {
  slug: 'featureCards',
  labels: {
    singular: 'Feature Cards',
    plural: 'Feature Cards Blocks',
  },
  fields: featureCardsFields,
}
