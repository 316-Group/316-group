import { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const allowAnySelect = (() => true as const) as any

const alignmentOptions = [
  { label: 'Left (Default)', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
]

export const getTimelineAccordionFields = ({
  isColumn = false,
}: { isColumn?: boolean } = {}): Field[] => [
  // ─── 1. Section Spacing & Background ─────────────────────────────────────
  {
    type: 'row',
    fields: [
      bgColorPickerAll({
        overrides: {
          name: 'sectionBgColor',
          label: isColumn ? 'Content Background Color' : 'Section Background Color',
          defaultValue: isColumn ? 'bg-transparent' : 'bg-[#F7F8F4]',
          validate: allowAnySelect,
          admin: {
            width: '33.33%',
            description: isColumn
              ? 'Defaults to "Transparent" so it automatically uses the Column Background Color.'
              : 'Choose background color for this section (default: #F7F8F4 as in mockup).',
          },
        },
      }),
      {
        name: 'paddingTop',
        type: 'select',
        label: 'Padding Top',
        defaultValue: isColumn ? 'pt-0' : 'pt-20',
        validate: allowAnySelect,
        admin: { width: '33.33%' },
        options: [
          { label: 'None (0px) - pt-0', value: 'pt-0' },
          { label: 'Tiny (8px) - pt-2', value: 'pt-2' },
          { label: 'Extra Small (16px) - pt-4', value: 'pt-4' },
          { label: 'Small (24px) - pt-6', value: 'pt-6' },
          { label: 'Small-Med (32px) - pt-8', value: 'pt-8' },
          { label: 'Medium-Sm (40px) - pt-10', value: 'pt-10' },
          { label: 'Medium (48px) - pt-12', value: 'pt-12' },
          { label: 'Medium-Lg (64px) - pt-16', value: 'pt-16' },
          { label: 'Large (80px - Default) - pt-20', value: 'pt-20' },
          { label: 'Extra Large (96px) - pt-24', value: 'pt-24' },
          { label: 'Huge (112px) - pt-28', value: 'pt-28' },
          { label: 'Massive (128px) - pt-32', value: 'pt-32' },
          { label: 'Custom Value', value: 'custom' },
        ],
      },
      {
        name: 'paddingBottom',
        type: 'select',
        label: 'Padding Bottom',
        defaultValue: isColumn ? 'pb-0' : 'pb-20',
        validate: allowAnySelect,
        admin: { width: '33.33%' },
        options: [
          { label: 'None (0px) - pb-0', value: 'pb-0' },
          { label: 'Tiny (8px) - pb-2', value: 'pb-2' },
          { label: 'Extra Small (16px) - pb-4', value: 'pb-4' },
          { label: 'Small (24px) - pb-6', value: 'pb-6' },
          { label: 'Small-Med (32px) - pb-8', value: 'pb-8' },
          { label: 'Medium-Sm (40px) - pb-10', value: 'pb-10' },
          { label: 'Medium (48px) - pb-12', value: 'pb-12' },
          { label: 'Medium-Lg (64px) - pb-16', value: 'pb-16' },
          { label: 'Large (80px - Default) - pb-20', value: 'pb-20' },
          { label: 'Extra Large (96px) - pb-24', value: 'pb-24' },
          { label: 'Huge (112px) - pb-28', value: 'pb-28' },
          { label: 'Massive (128px) - pb-32', value: 'pb-32' },
          { label: 'Custom Value', value: 'custom' },
        ],
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'paddingTopCustom',
        type: 'text',
        label: 'Custom Padding Top (e.g. 90px, 6rem)',
        admin: {
          width: '50%',
          condition: (_, s) => s?.paddingTop === 'custom',
        },
      },
      {
        name: 'paddingBottomCustom',
        type: 'text',
        label: 'Custom Padding Bottom (e.g. 90px, 6rem)',
        admin: {
          width: '50%',
          condition: (_, s) => s?.paddingBottom === 'custom',
        },
      },
    ],
  },

  // ─── 2. Horizontal Padding Controls ───────────────────────────────────────
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
          { label: 'Default Padding (Responsive Container max-w-7xl)', value: 'default' },
          { label: 'No Padding / Full Screen Bleed (0px)', value: 'none' },
          { label: 'Custom Horizontal Padding', value: 'custom' },
        ],
        admin: {
          width: '50%',
          description: 'Set custom padding to adjust container margins for desktop and mobile.',
        },
      },
      {
        name: 'paddingSide',
        type: 'select',
        label: 'Padding Target Side',
        defaultValue: 'both',
        validate: allowAnySelect,
        admin: {
          width: '50%',
          condition: (_, s) => s?.paddingMode === 'custom',
          description: 'Apply to both sides, left only, right only, or set separate values.',
        },
        options: [
          { label: 'Both Sides (Left & Right Together)', value: 'both' },
          { label: 'Left Side Only', value: 'left' },
          { label: 'Right Side Only', value: 'right' },
          { label: 'Separate Left & Right (Split)', value: 'split' },
        ],
      },
    ],
  },
  {
    type: 'row',
    admin: {
      condition: (_, s) =>
        s?.paddingMode === 'custom' && (!s?.paddingSide || s?.paddingSide === 'both'),
    },
    fields: [
      {
        name: 'paddingXDesktop',
        type: 'select',
        label: 'Desktop Padding (Left & Right)',
        defaultValue: '48px',
        validate: allowAnySelect,
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '16px', value: '16px' },
          { label: '24px', value: '24px' },
          { label: '32px', value: '32px' },
          { label: '40px', value: '40px' },
          { label: '48px (Default)', value: '48px' },
          { label: '60px', value: '60px' },
          { label: '80px', value: '80px' },
          { label: '100px', value: '100px' },
          { label: '120px', value: '120px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: { width: '50%' },
      },
      {
        name: 'paddingXDesktopCustom',
        type: 'text',
        label: 'Custom Desktop Padding (e.g. 50px)',
        admin: {
          width: '50%',
          condition: (_, s) => s?.paddingXDesktop === 'custom',
        },
      },
    ],
  },
  {
    type: 'row',
    admin: {
      condition: (_, s) =>
        s?.paddingMode === 'custom' && (!s?.paddingSide || s?.paddingSide === 'both'),
    },
    fields: [
      {
        name: 'paddingXMobile',
        type: 'select',
        label: 'Mobile Padding (Left & Right)',
        defaultValue: '16px',
        validate: allowAnySelect,
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '8px', value: '8px' },
          { label: '12px', value: '12px' },
          { label: '16px (Default Mobile)', value: '16px' },
          { label: '20px', value: '20px' },
          { label: '24px', value: '24px' },
          { label: '32px', value: '32px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: { width: '50%' },
      },
      {
        name: 'paddingXMobileCustom',
        type: 'text',
        label: 'Custom Mobile Padding (e.g. 14px)',
        admin: {
          width: '50%',
          condition: (_, s) => s?.paddingXMobile === 'custom',
        },
      },
    ],
  },
  {
    type: 'row',
    admin: {
      condition: (_, s) =>
        s?.paddingMode === 'custom' && (s?.paddingSide === 'left' || s?.paddingSide === 'split'),
    },
    fields: [
      {
        name: 'paddingLeftDesktop',
        type: 'select',
        label: 'Desktop Padding Left',
        defaultValue: '48px',
        validate: allowAnySelect,
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '16px', value: '16px' },
          { label: '24px', value: '24px' },
          { label: '32px', value: '32px' },
          { label: '40px', value: '40px' },
          { label: '48px (Default)', value: '48px' },
          { label: '60px', value: '60px' },
          { label: '80px', value: '80px' },
          { label: '100px', value: '100px' },
          { label: '120px', value: '120px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: { width: '50%' },
      },
      {
        name: 'paddingLeftDesktopCustom',
        type: 'text',
        label: 'Custom Desktop Padding Left',
        admin: {
          width: '50%',
          condition: (_, s) => s?.paddingLeftDesktop === 'custom',
        },
      },
    ],
  },
  {
    type: 'row',
    admin: {
      condition: (_, s) =>
        s?.paddingMode === 'custom' && (s?.paddingSide === 'left' || s?.paddingSide === 'split'),
    },
    fields: [
      {
        name: 'paddingLeftMobile',
        type: 'select',
        label: 'Mobile Padding Left',
        defaultValue: '16px',
        validate: allowAnySelect,
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '8px', value: '8px' },
          { label: '12px', value: '12px' },
          { label: '16px (Default Mobile)', value: '16px' },
          { label: '20px', value: '20px' },
          { label: '24px', value: '24px' },
          { label: '32px', value: '32px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: { width: '50%' },
      },
      {
        name: 'paddingLeftMobileCustom',
        type: 'text',
        label: 'Custom Mobile Padding Left',
        admin: {
          width: '50%',
          condition: (_, s) => s?.paddingLeftMobile === 'custom',
        },
      },
    ],
  },
  {
    type: 'row',
    admin: {
      condition: (_, s) =>
        s?.paddingMode === 'custom' && (s?.paddingSide === 'right' || s?.paddingSide === 'split'),
    },
    fields: [
      {
        name: 'paddingRightDesktop',
        type: 'select',
        label: 'Desktop Padding Right',
        defaultValue: '48px',
        validate: allowAnySelect,
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '16px', value: '16px' },
          { label: '24px', value: '24px' },
          { label: '32px', value: '32px' },
          { label: '40px', value: '40px' },
          { label: '48px (Default)', value: '48px' },
          { label: '60px', value: '60px' },
          { label: '80px', value: '80px' },
          { label: '100px', value: '100px' },
          { label: '120px', value: '120px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: { width: '50%' },
      },
      {
        name: 'paddingRightDesktopCustom',
        type: 'text',
        label: 'Custom Desktop Padding Right',
        admin: {
          width: '50%',
          condition: (_, s) => s?.paddingRightDesktop === 'custom',
        },
      },
    ],
  },
  {
    type: 'row',
    admin: {
      condition: (_, s) =>
        s?.paddingMode === 'custom' && (s?.paddingSide === 'right' || s?.paddingSide === 'split'),
    },
    fields: [
      {
        name: 'paddingRightMobile',
        type: 'select',
        label: 'Mobile Padding Right',
        defaultValue: '16px',
        validate: allowAnySelect,
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '8px', value: '8px' },
          { label: '12px', value: '12px' },
          { label: '16px (Default Mobile)', value: '16px' },
          { label: '20px', value: '20px' },
          { label: '24px', value: '24px' },
          { label: '32px', value: '32px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: { width: '50%' },
      },
      {
        name: 'paddingRightMobileCustom',
        type: 'text',
        label: 'Custom Mobile Padding Right',
        admin: {
          width: '50%',
          condition: (_, s) => s?.paddingRightMobile === 'custom',
        },
      },
    ],
  },

  // ─── 3. Left Column Content (Editorial / Context) ─────────────────────────
  {
    name: 'leftColumn',
    type: 'group',
    label: 'Left Column Content',
    fields: [
      // ── Pill Badge Group ──
      {
        name: 'badgeGroup',
        type: 'group',
        label: 'Pill Badge Settings',
        fields: [
          {
            name: 'showBadge',
            type: 'checkbox',
            label: 'Show Badge',
            defaultValue: true,
          },
          {
            name: 'badgeText',
            type: 'text',
            label: 'Badge Text',
            defaultValue: 'Our Solutions',
            admin: {
              condition: (_, s) => Boolean(s?.showBadge),
              description: 'Text displayed inside the pill badge. If empty, the badge will not show.',
            },
          },
          {
            type: 'row',
            admin: {
              condition: (_, s) => Boolean(s?.showBadge),
            },
            fields: [
              bgColorPickerAll({
                overrides: {
                  name: 'badgeBgColor',
                  label: 'Badge Background Overlay',
                  defaultValue: 'bg-[#EFF1F8]',
                  validate: allowAnySelect,
                  admin: {
                    width: '50%',
                    description: 'Defaults to Soft Blue Gray (#EFF1F8) as seen in mockup.',
                  },
                },
              }),
              textColorPickerAll({
                overrides: {
                  name: 'badgeTextColor',
                  label: 'Badge Text Color',
                  defaultValue: 'text-[#0256FF]',
                  validate: allowAnySelect,
                  admin: {
                    width: '50%',
                    description: 'Defaults to Brand Blue (#0256FF) as seen in mockup.',
                  },
                },
              }),
            ],
          },
          {
            type: 'row',
            admin: {
              condition: (_, s) => Boolean(s?.showBadge),
            },
            fields: [
              {
                name: 'badgeFontSize',
                type: 'select',
                label: 'Desktop Font Size',
                defaultValue: 'text-xs md:text-sm',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'badgeFontWeight',
                type: 'select',
                label: 'Desktop Font Weight',
                defaultValue: 'font-semibold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'badgeFontSizeMobile',
                type: 'select',
                label: 'Mobile Font Size',
                defaultValue: 'text-xs',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'badgeFontWeightMobile',
                type: 'select',
                label: 'Mobile Font Weight',
                defaultValue: 'font-semibold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
            ],
          },
          {
            name: 'badgeMarginBottom',
            type: 'select',
            label: 'Badge Margin Bottom (Space Before Heading)',
            defaultValue: 'mb-8 md:mb-12',
            validate: allowAnySelect,
            options: [
              { label: 'None (mb-0)', value: 'mb-0' },
              { label: 'Small (mb-4)', value: 'mb-4' },
              { label: 'Medium (mb-6 md:mb-8)', value: 'mb-6 md:mb-8' },
              { label: 'Large (mb-8 md:mb-12 - Default)', value: 'mb-8 md:mb-12' },
              { label: 'Extra Large (mb-12 md:mb-16)', value: 'mb-12 md:mb-16' },
            ],
            admin: {
              condition: (_, s) => Boolean(s?.showBadge),
              width: '50%',
            },
          },
        ],
      },

      // ── Main Heading Area ──
      {
        name: 'headingGroup',
        type: 'group',
        label: 'Heading Settings',
        fields: [
          {
            name: 'heading',
            type: 'richText',
            label: 'Heading',
            admin: {
              description: 'Heading with rich text and inline CSS support. Leave blank to hide.',
            },
            editor: lexicalEditor({
              features: ({ rootFeatures }) => [
                ...rootFeatures,
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ],
            }),
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'headingColor',
                  label: 'Heading Text Color',
                  defaultValue: 'text-slate-900',
                  validate: allowAnySelect,
                  admin: { width: '50%' },
                },
              }),
              {
                name: 'headingMarginBottom',
                type: 'select',
                label: 'Heading Margin Bottom',
                defaultValue: 'mb-6 md:mb-8',
                validate: allowAnySelect,
                options: [
                  { label: 'None (mb-0)', value: 'mb-0' },
                  { label: 'Small (mb-3 md:mb-4)', value: 'mb-3 md:mb-4' },
                  { label: 'Medium (mb-6 md:mb-8 - Default)', value: 'mb-6 md:mb-8' },
                  { label: 'Large (mb-8 md:mb-10)', value: 'mb-8 md:mb-10' },
                  { label: 'Extra Large (mb-12)', value: 'mb-12' },
                ],
                admin: { width: '50%' },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'headingFontSize',
                type: 'select',
                label: 'Desktop Font Size',
                defaultValue: 'text-3xl md:text-4xl lg:text-5xl',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'headingFontWeight',
                type: 'select',
                label: 'Desktop Font Weight',
                defaultValue: 'font-bold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'headingFontSizeMobile',
                type: 'select',
                label: 'Mobile Font Size',
                defaultValue: 'text-2xl md:text-3xl',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'headingFontWeightMobile',
                type: 'select',
                label: 'Mobile Font Weight',
                defaultValue: 'font-bold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
            ],
          },
        ],
      },

      // ── Description Area ──
      {
        name: 'descriptionGroup',
        type: 'group',
        label: 'Description Settings',
        fields: [
          {
            name: 'description',
            type: 'richText',
            label: 'Description',
            admin: {
              description: 'Multi-paragraph body text with inline CSS support. Leave blank to hide.',
            },
            editor: lexicalEditor({
              features: ({ rootFeatures }) => [
                ...rootFeatures,
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ],
            }),
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'descriptionColor',
                  label: 'Description Text Color',
                  defaultValue: 'text-slate-600',
                  validate: allowAnySelect,
                  admin: { width: '50%' },
                },
              }),
              {
                name: 'descriptionMarginBottom',
                type: 'select',
                label: 'Description Margin Bottom',
                defaultValue: 'mb-0',
                validate: allowAnySelect,
                options: [
                  { label: 'None (mb-0 - Default)', value: 'mb-0' },
                  { label: 'Small (mb-4)', value: 'mb-4' },
                  { label: 'Medium (mb-6)', value: 'mb-6' },
                  { label: 'Large (mb-8)', value: 'mb-8' },
                ],
                admin: { width: '50%' },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'descriptionFontSize',
                type: 'select',
                label: 'Desktop Font Size',
                defaultValue: 'text-base md:text-lg',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'descriptionFontWeight',
                type: 'select',
                label: 'Desktop Font Weight',
                defaultValue: 'font-normal',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'descriptionFontSizeMobile',
                type: 'select',
                label: 'Mobile Font Size',
                defaultValue: 'text-sm md:text-base',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'descriptionFontWeightMobile',
                type: 'select',
                label: 'Mobile Font Weight',
                defaultValue: 'font-normal',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── 4. Right Column: Timeline & Accordion Items ──────────────────────────
  {
    name: 'timelineSettings',
    type: 'group',
    label: 'Timeline Axis & Bullet Styling',
    fields: [
      {
        type: 'row',
        fields: [
          bgColorPickerAll({
            overrides: {
              name: 'timelineLineColor',
              label: 'Timeline Axis Line Color',
              defaultValue: 'bg-[#0256FF]',
              validate: allowAnySelect,
              admin: {
                width: '50%',
                description: 'Continuous vertical timeline axis line (default: Brand Blue #0256FF).',
              },
            },
          }),
          bgColorPickerAll({
            overrides: {
              name: 'timelineDotColor',
              label: 'Timeline Bullet Dot Color',
              defaultValue: 'bg-[#0256FF]',
              validate: allowAnySelect,
              admin: {
                width: '50%',
                description: 'Solid circular node on the timeline line (default: Brand Blue #0256FF).',
              },
            },
          }),
        ],
      },
    ],
  },
  {
    name: 'items',
    type: 'array',
    label: 'Timeline Accordion Items',
    labels: {
      singular: 'Accordion Item',
      plural: 'Accordion Items',
    },
    fields: [
      // ── Year / Text Field ──
      {
        type: 'row',
        fields: [
          {
            name: 'yearOrText',
            type: 'text',
            label: 'Year or Start Text (e.g. 2018, 2020, Whats Next ?)',
            defaultValue: '2018',
            admin: { width: '50%' },
          },
          textColorPickerAll({
            overrides: {
              name: 'yearTextColor',
              label: 'Year / Text Color',
              defaultValue: 'text-[#0256FF]',
              validate: allowAnySelect,
              admin: { width: '50%' },
            },
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'yearFontSize',
            type: 'select',
            label: 'Year Desktop Font Size',
            defaultValue: 'text-xl md:text-2xl',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'yearFontWeight',
            type: 'select',
            label: 'Year Desktop Font Weight',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
          {
            name: 'yearFontSizeMobile',
            type: 'select',
            label: 'Year Mobile Font Size',
            defaultValue: 'text-lg',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'yearFontWeightMobile',
            type: 'select',
            label: 'Year Mobile Font Weight',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
        ],
      },

      // ── Title Field ──
      {
        type: 'row',
        fields: [
          {
            name: 'title',
            type: 'text',
            label: 'Title Text (e.g. Where it all began)',
            defaultValue: 'Where it all began',
            admin: {
              width: '50%',
              description:
                'Shows when active, OR if this is the last accordion item (as in mockup UI).',
            },
          },
          textColorPickerAll({
            overrides: {
              name: 'titleTextColor',
              label: 'Title Text Color',
              defaultValue: 'text-slate-900',
              validate: allowAnySelect,
              admin: { width: '50%' },
            },
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'titleFontSize',
            type: 'select',
            label: 'Title Desktop Font Size',
            defaultValue: 'text-xl md:text-2xl',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'titleFontWeight',
            type: 'select',
            label: 'Title Desktop Font Weight',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
          {
            name: 'titleFontSizeMobile',
            type: 'select',
            label: 'Title Mobile Font Size',
            defaultValue: 'text-lg',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'titleFontWeightMobile',
            type: 'select',
            label: 'Title Mobile Font Weight',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
        ],
      },

      // ── Description Field (Active State) ──
      {
        name: 'description',
        type: 'richText',
        label: 'Description (Shows when active)',
        admin: {
          description:
            'Expanded description with inline CSS support. Only renders when accordion is active.',
        },
        editor: lexicalEditor({
          features: ({ rootFeatures }) => [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ],
        }),
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'descriptionTextColor',
              label: 'Description Text Color',
              defaultValue: 'text-slate-600',
              validate: allowAnySelect,
              admin: { width: '100%' },
            },
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'descriptionFontSize',
            type: 'select',
            label: 'Description Desktop Font Size',
            defaultValue: 'text-sm md:text-base',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'descriptionFontWeight',
            type: 'select',
            label: 'Description Desktop Font Weight',
            defaultValue: 'font-normal',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
          {
            name: 'descriptionFontSizeMobile',
            type: 'select',
            label: 'Description Mobile Font Size',
            defaultValue: 'text-sm',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'descriptionFontWeightMobile',
            type: 'select',
            label: 'Description Mobile Font Weight',
            defaultValue: 'font-normal',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
        ],
      },

      // ── End Year / End Text (Optional with Vertical Connector Line) ──
      {
        type: 'row',
        fields: [
          {
            name: 'endYearOrText',
            type: 'text',
            label: 'End Year / End Text (Optional, e.g. 2023)',
            admin: {
              width: '50%',
              description:
                'If populated and active, links the start year to this end year with a vertical line, and places description beside it.',
            },
          },
          textColorPickerAll({
            overrides: {
              name: 'endYearTextColor',
              label: 'End Year Text Color',
              defaultValue: 'text-[#0256FF]',
              validate: allowAnySelect,
              admin: {
                width: '50%',
                condition: (_, s) => Boolean(s?.endYearOrText),
              },
            },
          }),
        ],
      },
      {
        type: 'row',
        admin: {
          condition: (_, s) => Boolean(s?.endYearOrText),
        },
        fields: [
          {
            name: 'endYearFontSize',
            type: 'select',
            label: 'End Year Desktop Font Size',
            defaultValue: 'text-xl md:text-2xl',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'endYearFontWeight',
            type: 'select',
            label: 'End Year Desktop Font Weight',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
          {
            name: 'endYearFontSizeMobile',
            type: 'select',
            label: 'End Year Mobile Font Size',
            defaultValue: 'text-lg',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'endYearFontWeightMobile',
            type: 'select',
            label: 'End Year Mobile Font Weight',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
        ],
      },
      {
        type: 'row',
        admin: {
          condition: (_, s) => Boolean(s?.endYearOrText),
        },
        fields: [
          bgColorPickerAll({
            overrides: {
              name: 'connectorLineColor',
              label: 'Connector Line Color (between Year & End Year)',
              defaultValue: 'bg-[#0256FF]',
              validate: allowAnySelect,
              admin: {
                width: '50%',
                description: 'Color of the vertical line linking the start year to end year.',
              },
            },
          }),
        ],
      },

      // ── Bottom HR Line Divider ──
      {
        type: 'row',
        fields: [
          {
            name: 'hrLineColor',
            type: 'select',
            label: 'Divider Line Color (Inactive)',
            defaultValue: 'border-slate-200',
            validate: allowAnySelect,
            options: [
              { label: 'Subtle Slate 200 (border-slate-200 - Default)', value: 'border-slate-200' },
              { label: 'Subtle Slate 100 (border-slate-100)', value: 'border-slate-100' },
              { label: 'White (border-white)', value: 'border-white' },
              { label: 'White Translucent (border-white/20)', value: 'border-white/20' },
              { label: 'Brand Blue (border-[#0256FF])', value: 'border-[#0256FF]' },
              { label: 'Transparent (border-transparent)', value: 'border-transparent' },
            ],
            admin: { width: '33.33%' },
          },
          {
            name: 'hrActiveColor',
            type: 'select',
            label: 'Divider Line Color (Active)',
            defaultValue: 'border-[#0256FF]',
            validate: allowAnySelect,
            options: [
              { label: 'Brand Blue (border-[#0256FF] - Default)', value: 'border-[#0256FF]' },
              { label: 'Subtle Slate 200 (border-slate-200)', value: 'border-slate-200' },
              { label: 'White (border-white)', value: 'border-white' },
              { label: 'Transparent (border-transparent)', value: 'border-transparent' },
            ],
            admin: { width: '33.33%' },
          },
          {
            name: 'hrBorderWidth',
            type: 'select',
            label: 'Divider Line Width/Thickness',
            defaultValue: 'border-t',
            validate: allowAnySelect,
            options: [
              { label: 'Thin 1px (border-t - Default)', value: 'border-t' },
              { label: 'Medium 2px (border-t-2)', value: 'border-t-2' },
              { label: 'Thick 3px (border-t-[3px])', value: 'border-t-[3px]' },
              { label: 'Heavy 4px (border-t-4)', value: 'border-t-4' },
            ],
            admin: { width: '33.33%' },
          },
        ],
      },
    ],
  },
]

export const timelineAccordionFields: Field[] = getTimelineAccordionFields({ isColumn: false })
export const timelineAccordionColumnFields: Field[] = getTimelineAccordionFields({ isColumn: true })

export const TimelineAccordion: Block = {
  slug: 'timelineAccordion',
  interfaceName: 'TimelineAccordionBlock',
  labels: {
    singular: 'Timeline Accordion',
    plural: 'Timeline Accordion Blocks',
  },
  fields: timelineAccordionFields,
}
