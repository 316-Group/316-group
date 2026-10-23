import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const allowAnySelect = (() => true as const) as any

const desktopPaddingOptions = [
  { label: '0px (Full Bleed)', value: '0px' },
  { label: '8px', value: '8px' },
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
]

const mobilePaddingOptions = [
  { label: '0px (Full Bleed)', value: '0px' },
  { label: '8px', value: '8px' },
  { label: '12px', value: '12px' },
  { label: '16px (Default)', value: '16px' },
  { label: '20px', value: '20px' },
  { label: '24px', value: '24px' },
  { label: '32px', value: '32px' },
  { label: 'Custom Value', value: 'custom' },
]

export const eventWhyConnectFields: Field[] = [
  {
    type: 'tabs',
    tabs: [
      // ═══════════════════════════════════════════════════════════════════════════
      // TAB 1: 📝 CONTENT & MEDIA (Non-technical users - Zero Styling Controls)
      // ═══════════════════════════════════════════════════════════════════════════
      {
        label: '📝 Content & Media',
        fields: [
          // ─── Top 2-Column Header Content ──────────────────────────────────
          {
            name: 'topGrid',
            type: 'group',
            label: 'Top 2-Column Header Content',
            fields: [
              // Kicker
              {
                name: 'kickerGroup',
                type: 'group',
                label: '1. Kicker / Subheading Tag',
                fields: [
                  {
                    name: 'showKicker',
                    type: 'checkbox',
                    label: 'Show Kicker',
                    defaultValue: true,
                  },
                  {
                    name: 'text',
                    type: 'text',
                    label: 'Subheading Text',
                    defaultValue: 'WHY CONNECT WITH US',
                    admin: {
                      condition: (_, siblingData) => Boolean(siblingData?.showKicker),
                    },
                  },
                ],
              },

              // Main Heading (Left Column)
              {
                name: 'headingGroup',
                type: 'group',
                label: '2. Main Heading (Left Column)',
                fields: [
                  {
                    name: 'heading',
                    type: 'textarea',
                    label: 'Heading Text (supports inline HTML e.g. <span style="color:#00D2FF">, <br/>)',
                    defaultValue: 'Different perspectives.\nMore possibilities.',
                  },
                ],
              },

              // Description (Right Column)
              {
                name: 'descriptionGroup',
                type: 'group',
                label: '3. Description Text (Right Column)',
                fields: [
                  {
                    name: 'description',
                    type: 'textarea',
                    label: 'Description Text (supports inline HTML)',
                    defaultValue:
                      'Make space in a busy congress week for a focused exchange about your priorities — and where we might go together.',
                  },
                ],
              },
            ],
          },

          // ─── Feature Items Row (Max 3 Items) ──────────────────────────────
          {
            name: 'items',
            type: 'array',
            label: 'Feature Items (Max 3 Per Row)',
            maxRows: 3,
            defaultValue: [
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
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'iconType',
                    type: 'select',
                    label: 'Icon Selector',
                    defaultValue: 'messageSquare',
                    options: [
                      { label: 'Message / Chat Bubble', value: 'messageSquare' },
                      { label: 'Network / Connected Nodes', value: 'network' },
                      { label: 'Arrow Up-Right', value: 'arrowUpRight' },
                      { label: 'Calendar', value: 'calendar' },
                      { label: 'Map Pin', value: 'mapPin' },
                      { label: 'Clock', value: 'clock' },
                      { label: 'Users', value: 'users' },
                      { label: 'Globe', value: 'globe' },
                      { label: 'Ticket', value: 'ticket' },
                      { label: 'Custom Uploaded Media', value: 'customMedia' },
                      { label: 'None', value: 'none' },
                    ],
                    admin: { width: '50%' },
                  },
                  {
                    name: 'numberText',
                    type: 'text',
                    label: 'Indicator Number (e.g. 01)',
                    defaultValue: '01',
                    admin: { width: '50%' },
                  },
                ],
              },
              {
                name: 'customIconMedia',
                type: 'upload',
                relationTo: 'media',
                label: 'Custom Icon Upload (Optional)',
                admin: {
                  condition: (_, siblingData) => siblingData?.iconType === 'customMedia',
                },
              },
              {
                name: 'heading',
                type: 'text',
                label: 'Feature Heading Text',
                defaultValue: 'Exchange ideas',
              },
              {
                name: 'description',
                type: 'textarea',
                label: 'Feature Description Text',
                defaultValue:
                  'Share the questions shaping your work and hear a fresh perspective on healthcare’s evolving needs.',
              },
            ],
          },
        ],
      },

      // ═══════════════════════════════════════════════════════════════════════════
      // TAB 2: 🎨 INDIVIDUAL STYLING (Element-by-Element Design Controls)
      // ═══════════════════════════════════════════════════════════════════════════
      {
        label: '🎨 Individual Styling',
        fields: [
          // ─── 1. Header Kicker Tag Styling ──────────────────────────────────
          {
            name: 'kickerStyles',
            type: 'group',
            label: '1. Header Kicker Tag Styling',
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'squareColor',
                    type: 'text',
                    label: 'Accent Square Color (Tailwind class or hex, e.g. bg-white)',
                    defaultValue: 'bg-white',
                    admin: { width: '33.33%' },
                  },
                  {
                    name: 'squareSize',
                    type: 'select',
                    label: 'Accent Square Size',
                    defaultValue: 'w-2.5 h-2.5',
                    validate: allowAnySelect,
                    options: [
                      { label: 'Small (8px)', value: 'w-2 h-2' },
                      { label: 'Standard (10px - Default)', value: 'w-2.5 h-2.5' },
                      { label: 'Medium (12px)', value: 'w-3 h-3' },
                      { label: 'Large (14px)', value: 'w-3.5 h-3.5' },
                    ],
                    admin: { width: '33.33%' },
                  },
                  textColorPickerAll({
                    overrides: {
                      name: 'textColor',
                      label: 'Text Color',
                      defaultValue: 'text-white',
                      admin: { width: '33.33%' },
                    },
                  }),
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'fontSize',
                    type: 'select',
                    label: 'Font Size',
                    defaultValue: 'text-xs md:text-sm',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontSizeMobile',
                    type: 'select',
                    label: 'Font Size Mobile',
                    defaultValue: 'text-xs md:text-sm',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontWeight',
                    type: 'select',
                    label: 'Font Weight',
                    defaultValue: 'font-semibold',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontWeightMobile',
                    type: 'select',
                    label: 'Font Weight Mobile',
                    defaultValue: 'font-semibold',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'marginBottom',
                    type: 'select',
                    label: 'Margin Bottom',
                    defaultValue: 'mb-4',
                    validate: allowAnySelect,
                    options: [
                      { label: 'None (0)', value: 'mb-0' },
                      { label: 'Small (mb-2)', value: 'mb-2' },
                      { label: 'Medium (mb-4 - Default)', value: 'mb-4' },
                      { label: 'Large (mb-6)', value: 'mb-6' },
                    ],
                    admin: { width: '50%' },
                  },
                  {
                    name: 'marginBottomMobile',
                    type: 'select',
                    label: 'Margin Bottom Mobile',
                    defaultValue: '',
                    validate: allowAnySelect,
                    options: [
                      { label: 'Inherit Desktop', value: '' },
                      { label: 'None (0)', value: 'mb-0' },
                      { label: 'Small (mb-2)', value: 'mb-2' },
                      { label: 'Medium (mb-4)', value: 'mb-4' },
                    ],
                    admin: { width: '50%' },
                  },
                ],
              },
            ],
          },

          // ─── 2. Header Heading Styling ────────────────────────────────────
          {
            name: 'headingStyles',
            type: 'group',
            label: '2. Header Heading Styling',
            fields: [
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'headingColor',
                      label: 'Heading Color',
                      defaultValue: 'text-white',
                      admin: { width: '20%' },
                    },
                  }),
                  {
                    name: 'headingFontSize',
                    type: 'select',
                    label: 'Font Size',
                    defaultValue: 'text-3xl sm:text-4xl lg:text-5xl',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '20%' },
                  },
                  {
                    name: 'headingFontSizeMobile',
                    type: 'select',
                    label: 'Font Size Mobile',
                    defaultValue: 'text-3xl sm:text-4xl lg:text-5xl',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '20%' },
                  },
                  {
                    name: 'headingFontWeight',
                    type: 'select',
                    label: 'Font Weight',
                    defaultValue: 'font-bold',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '20%' },
                  },
                  {
                    name: 'headingFontWeightMobile',
                    type: 'select',
                    label: 'Font Weight Mobile',
                    defaultValue: 'font-bold',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '20%' },
                  },
                ],
              },
            ],
          },

          // ─── 3. Header Description Styling ────────────────────────────────
          {
            name: 'descriptionStyles',
            type: 'group',
            label: '3. Header Description Styling',
            fields: [
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'descriptionColor',
                      label: 'Text Color',
                      defaultValue: 'text-white/90',
                      admin: { width: '20%' },
                    },
                  }),
                  {
                    name: 'descriptionFontSize',
                    type: 'select',
                    label: 'Font Size',
                    defaultValue: 'text-base md:text-lg lg:text-xl',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '20%' },
                  },
                  {
                    name: 'descriptionFontSizeMobile',
                    type: 'select',
                    label: 'Font Size Mobile',
                    defaultValue: 'text-base md:text-lg lg:text-xl',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '20%' },
                  },
                  {
                    name: 'descriptionFontWeight',
                    type: 'select',
                    label: 'Font Weight',
                    defaultValue: 'font-normal',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '20%' },
                  },
                  {
                    name: 'descriptionFontWeightMobile',
                    type: 'select',
                    label: 'Font Weight Mobile',
                    defaultValue: 'font-normal',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '20%' },
                  },
                ],
              },
            ],
          },

          // ─── 4. 2-Column Header Grid Spacing ──────────────────────────────
          {
            name: 'headerGridStyles',
            type: 'group',
            label: '4. 2-Column Header Grid Spacing',
            fields: [
              {
                name: 'gridBottomSpacing',
                type: 'select',
                label: 'Spacing Below 2-Column Grid (Distance to Feature Cards)',
                defaultValue: 'mb-12 md:mb-16',
                validate: allowAnySelect,
                options: [
                  { label: 'Small (mb-8)', value: 'mb-8' },
                  { label: 'Medium (mb-12 md:mb-16 - Default)', value: 'mb-12 md:mb-16' },
                  { label: 'Large (mb-16 md:mb-20)', value: 'mb-16 md:mb-20' },
                  { label: 'Extra Large (mb-20 md:mb-24)', value: 'mb-20 md:mb-24' },
                ],
              },
            ],
          },

          // ─── 5. Feature Items Styling ──────────────────────────────────────
          {
            name: 'featureCardStyles',
            type: 'group',
            label: '5. Feature Items Styling (Applied across all 3 items)',
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'iconColor',
                    type: 'text',
                    label: 'Icon Color (e.g. text-white or hex)',
                    defaultValue: 'text-white',
                    admin: { width: '50%' },
                  },
                  {
                    name: 'iconSize',
                    type: 'select',
                    label: 'Icon Size',
                    defaultValue: 'w-6 h-6',
                    validate: allowAnySelect,
                    options: [
                      { label: 'Small (20px)', value: 'w-5 h-5' },
                      { label: 'Standard (24px - Default)', value: 'w-6 h-6' },
                      { label: 'Medium (28px)', value: 'w-7 h-7' },
                      { label: 'Large (32px)', value: 'w-8 h-8' },
                    ],
                    admin: { width: '50%' },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'numberColor',
                      label: 'Number Color',
                      defaultValue: 'text-white/80',
                      admin: { width: '50%' },
                    },
                  }),
                  {
                    name: 'numberFontSize',
                    type: 'select',
                    label: 'Number Font Size',
                    defaultValue: 'text-sm md:text-base',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '50%' },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'headerMarginBottom',
                    type: 'select',
                    label: 'Header Margin Bottom (Distance to HR Line)',
                    defaultValue: 'mb-4 md:mb-5',
                    validate: allowAnySelect,
                    options: [
                      { label: 'Small (mb-3)', value: 'mb-3' },
                      { label: 'Standard (mb-4 md:mb-5 - Default)', value: 'mb-4 md:mb-5' },
                      { label: 'Medium (mb-6)', value: 'mb-6' },
                    ],
                    admin: { width: '33.33%' },
                  },
                  {
                    name: 'hrColor',
                    type: 'text',
                    label: 'Divider Line Color',
                    defaultValue: 'border-white/30',
                    admin: { width: '33.33%' },
                  },
                  {
                    name: 'hrMarginBottom',
                    type: 'select',
                    label: 'Divider Line Margin Bottom',
                    defaultValue: 'mb-6 md:mb-8',
                    validate: allowAnySelect,
                    options: [
                      { label: 'Small (mb-4)', value: 'mb-4' },
                      { label: 'Standard (mb-6 md:mb-8 - Default)', value: 'mb-6 md:mb-8' },
                      { label: 'Large (mb-10)', value: 'mb-10' },
                    ],
                    admin: { width: '33.33%' },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'headingColor',
                      label: 'Item Heading Color',
                      defaultValue: 'text-white',
                      admin: { width: '25%' },
                    },
                  }),
                  {
                    name: 'headingFontSize',
                    type: 'select',
                    label: 'Item Heading Font Size',
                    defaultValue: 'text-xl md:text-2xl',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'headingFontWeight',
                    type: 'select',
                    label: 'Item Heading Font Weight',
                    defaultValue: 'font-bold',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'headingMarginBottom',
                    type: 'select',
                    label: 'Item Heading Margin Bottom',
                    defaultValue: 'mb-3 md:mb-4',
                    validate: allowAnySelect,
                    options: [
                      { label: 'Small (mb-2)', value: 'mb-2' },
                      { label: 'Standard (mb-3 md:mb-4 - Default)', value: 'mb-3 md:mb-4' },
                      { label: 'Large (mb-6)', value: 'mb-6' },
                    ],
                    admin: { width: '25%' },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'descriptionColor',
                      label: 'Item Description Color',
                      defaultValue: 'text-white/80',
                      admin: { width: '33.33%' },
                    },
                  }),
                  {
                    name: 'descriptionFontSize',
                    type: 'select',
                    label: 'Item Description Font Size',
                    defaultValue: 'text-sm md:text-base',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '33.33%' },
                  },
                  {
                    name: 'descriptionFontWeight',
                    type: 'select',
                    label: 'Item Description Font Weight',
                    defaultValue: 'font-normal',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '33.33%' },
                  },
                ],
              },
            ],
          },
        ],
      },

      // ═══════════════════════════════════════════════════════════════════════════
      // TAB 3: ⚙️ SECTION LAYOUT & SPACING (Global Section Outer Container)
      // ═══════════════════════════════════════════════════════════════════════════
      {
        label: '⚙️ Section Layout & Spacing',
        fields: [
          // ─── 1. Layout & Header Width Alignment ─────────────────────────────
          {
            type: 'row',
            fields: [
              {
                name: 'matchHeaderPillWidth',
                type: 'checkbox',
                label: 'Match Header Width (Align with Logo & Nav, Max 1472px)',
                defaultValue: true,
                admin: {
                  width: '50%',
                  description:
                    'Locks inner content to 1,472px (max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8) matching the site header logo and nav.',
                },
              },
              {
                name: 'paddingMode',
                type: 'select',
                label: 'Horizontal Padding Mode',
                defaultValue: 'default',
                validate: allowAnySelect,
                options: [
                  { label: 'Default Responsive Padding', value: 'default' },
                  { label: 'No Padding / Full Screen Bleed (0px)', value: 'none' },
                  { label: 'Custom Horizontal Padding', value: 'custom' },
                ],
                admin: {
                  width: '50%',
                  condition: (_, siblingData) => !siblingData?.matchHeaderPillWidth,
                },
              },
            ],
          },
          {
            type: 'row',
            admin: {
              condition: (_, siblingData) =>
                !siblingData?.matchHeaderPillWidth && siblingData?.paddingMode === 'custom',
            },
            fields: [
              {
                name: 'paddingXDesktop',
                type: 'select',
                label: 'Desktop Lateral Padding',
                defaultValue: '48px',
                validate: allowAnySelect,
                options: desktopPaddingOptions,
                admin: { width: '25%' },
              },
              {
                name: 'paddingXDesktopCustom',
                type: 'text',
                label: 'Custom Desktop Padding (e.g. 50px)',
                admin: {
                  width: '25%',
                  condition: (_, siblingData) => siblingData?.paddingXDesktop === 'custom',
                },
              },
              {
                name: 'paddingXMobile',
                type: 'select',
                label: 'Mobile Lateral Padding',
                defaultValue: '16px',
                validate: allowAnySelect,
                options: mobilePaddingOptions,
                admin: { width: '25%' },
              },
              {
                name: 'paddingXMobileCustom',
                type: 'text',
                label: 'Custom Mobile Padding (e.g. 16px)',
                admin: {
                  width: '25%',
                  condition: (_, siblingData) => siblingData?.paddingXMobile === 'custom',
                },
              },
            ],
          },

          // ─── 2. Section Background & Vertical Paddings ──────────────────────
          {
            type: 'row',
            fields: [
              bgColorPickerAll({
                overrides: {
                  name: 'sectionBgColor',
                  label: 'Section Background Color',
                  defaultValue: 'bg-[#0000FF]',
                  admin: { width: '33.33%' },
                },
              }),
              {
                name: 'paddingTop',
                type: 'select',
                label: 'Top Padding',
                defaultValue: 'pt-20 md:pt-28',
                validate: allowAnySelect,
                options: [
                  { label: 'None (0)', value: 'pt-0' },
                  { label: 'Small (pt-12)', value: 'pt-12' },
                  { label: 'Medium (pt-16)', value: 'pt-16' },
                  { label: 'Standard (pt-20 md:pt-28 - Default)', value: 'pt-20 md:pt-28' },
                  { label: 'Large (pt-24 md:pt-32)', value: 'pt-24 md:pt-32' },
                  { label: 'Extra Large (pt-32 md:pt-40)', value: 'pt-32 md:pt-40' },
                ],
                admin: { width: '33.33%' },
              },
              {
                name: 'paddingBottom',
                type: 'select',
                label: 'Bottom Padding',
                defaultValue: 'pb-24 md:pb-32',
                validate: allowAnySelect,
                options: [
                  { label: 'None (0)', value: 'pb-0' },
                  { label: 'Small (pb-12)', value: 'pb-12' },
                  { label: 'Medium (pb-16)', value: 'pb-16' },
                  { label: 'Standard (pb-24 md:pb-32 - Default)', value: 'pb-24 md:pb-32' },
                  { label: 'Large (pb-28 md:pb-36)', value: 'pb-28 md:pb-36' },
                  { label: 'Extra Large (pb-32 md:pb-40)', value: 'pb-32 md:pb-40' },
                ],
                admin: { width: '33.33%' },
              },
            ],
          },
        ],
      },
    ],
  },
]

export const EventWhyConnect: Block = {
  slug: 'eventWhyConnect',
  interfaceName: 'EventWhyConnectBlock',
  fields: eventWhyConnectFields,
}
