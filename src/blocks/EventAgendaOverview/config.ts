import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { link } from '@/fields/link'
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

const marginBottomOptions = [
  { label: 'Inherit / Default', value: '' },
  { label: 'None (0)', value: 'mb-0' },
  { label: 'Extra Small (mb-2)', value: 'mb-2' },
  { label: 'Small (mb-3)', value: 'mb-3' },
  { label: 'Responsive XS to S (mb-2 md:mb-3)', value: 'mb-2 md:mb-3' },
  { label: 'Responsive S to SM (mb-3 md:mb-4)', value: 'mb-3 md:mb-4' },
  { label: 'Small-Medium (mb-4)', value: 'mb-4' },
  { label: 'Medium (mb-6)', value: 'mb-6' },
  { label: 'Responsive S to M (mb-4 md:mb-6)', value: 'mb-4 md:mb-6' },
  { label: 'Large (mb-8)', value: 'mb-8' },
  { label: 'Responsive M to L (mb-6 md:mb-8)', value: 'mb-6 md:mb-8' },
  { label: 'Extra Large (mb-10)', value: 'mb-10' },
  { label: 'Responsive L to XL (mb-8 md:mb-10)', value: 'mb-8 md:mb-10' },
  { label: '2X Large (mb-12 md:mb-16)', value: 'mb-12 md:mb-16' },
]

const dividerBorderWidthOptions = [
  { label: 'Thin (1px)', value: 'border-t' },
  { label: 'Medium (2px)', value: 'border-t-2' },
  { label: 'Thick (4px)', value: 'border-t-4' },
]

const dividerColorOptions = [
  { label: 'Slate 200 (Default)', value: 'border-slate-200' },
  { label: 'Slate 100', value: 'border-slate-100' },
  { label: 'Slate 300', value: 'border-slate-300' },
  { label: 'Gray 200', value: 'border-gray-200' },
  { label: 'Brand Blue (#0256FF)', value: 'border-[#0256FF]' },
  { label: 'White / 20%', value: 'border-white/20' },
  { label: 'White / 40%', value: 'border-white/40' },
]

export const eventAgendaOverviewFields: Field[] = [
  {
    type: 'tabs',
    tabs: [
      // ═══════════════════════════════════════════════════════════════════════════
      // TAB 1: 📝 CONTENT & MEDIA (Non-technical users - Zero Styling Controls)
      // ═══════════════════════════════════════════════════════════════════════════
      {
        label: '📝 Content & Media',
        fields: [
          // ─── Left Column: Context & Action Stack ────────────────────────────
          {
            name: 'leftColumn',
            type: 'group',
            label: 'Left Column: Context & Action Stack',
            fields: [
              // Kicker Group
              {
                name: 'kickerGroup',
                type: 'group',
                label: '1. Kicker / Subheading Tag',
                fields: [
                  {
                    name: 'showKicker',
                    type: 'checkbox',
                    label: 'Show Subheading',
                    defaultValue: true,
                  },
                  {
                    name: 'text',
                    type: 'text',
                    label: 'Subheading Text',
                    defaultValue: 'ON THE AGENDA',
                    admin: {
                      condition: (_, siblingData) => Boolean(siblingData?.showKicker),
                    },
                  },
                ],
              },

              // Heading Group
              {
                name: 'headingGroup',
                type: 'group',
                label: '2. Main Heading',
                fields: [
                  {
                    name: 'heading',
                    type: 'textarea',
                    label: 'Heading Text (supports inline HTML e.g. <span style="color:#0256FF">, <strong>, <br/>)',
                    defaultValue: 'Big questions.\nOpen conversations.',
                  },
                ],
              },

              // Description Group
              {
                name: 'descriptionGroup',
                type: 'group',
                label: '3. Description Text',
                fields: [
                  {
                    name: 'description',
                    type: 'textarea',
                    label: 'Description Text (supports inline HTML)',
                    defaultValue:
                      "Healthcare doesn't change through one-size-fits-all solutions. It changes through focused conversations, shared experience and the courage to look at challenges differently. Here's what we're talking about in Madrid:",
                  },
                ],
              },

              // Action CTA Button
              {
                name: 'ctaButton',
                type: 'group',
                label: '4. Action Button (CTA)',
                fields: [
                  {
                    name: 'showButton',
                    type: 'checkbox',
                    label: 'Show Button',
                    defaultValue: true,
                  },
                  {
                    type: 'row',
                    admin: {
                      condition: (_, siblingData) => Boolean(siblingData?.showButton),
                    },
                    fields: [
                      {
                        name: 'text',
                        type: 'text',
                        label: 'Button Text',
                        defaultValue: 'Request a meeting',
                        admin: { width: '50%' },
                      },
                      {
                        name: 'showArrow',
                        type: 'checkbox',
                        label: 'Show Arrow Icon (↗)',
                        defaultValue: true,
                        admin: { width: '50%' },
                      },
                    ],
                  },
                  link({
                    appearances: false,
                    overrides: {
                      admin: {
                        condition: (_, siblingData) => Boolean(siblingData?.showButton),
                        description: 'Destination URL or internal document link',
                      },
                    },
                  }),
                ],
              },

              // Disclaimer Text
              {
                name: 'disclaimerGroup',
                type: 'group',
                label: '5. Capacity / Disclaimer Text Below Button',
                fields: [
                  {
                    name: 'showDisclaimer',
                    type: 'checkbox',
                    label: 'Show Disclaimer Text',
                    defaultValue: true,
                  },
                  {
                    name: 'text',
                    type: 'text',
                    label: 'Disclaimer Text',
                    defaultValue: '*Advance booking recommended due to limited on-site availability.',
                    admin: {
                      condition: (_, siblingData) => Boolean(siblingData?.showDisclaimer),
                    },
                  },
                ],
              },
            ],
          },

          // ─── Right Column: Numbered Agenda Items ────────────────────────────
          {
            name: 'rightColumn',
            type: 'group',
            label: 'Right Column: Numbered Agenda Items',
            fields: [
              {
                name: 'items',
                type: 'array',
                label: 'Agenda / Details Items',
                minRows: 1,
                defaultValue: [
                  {
                    numberText: '01',
                    category: 'INNOVATION & INFRASTRUCTURE',
                    heading: 'Connecting technology to clinical reality',
                    description:
                      'How do we bridge the gap between innovative tools and the complex systems healthcare teams rely on every day?',
                  },
                  {
                    numberText: '02',
                    category: 'DATA & INTEGRATION',
                    heading: 'Data that actually serves clinicians',
                    description:
                      'From fragmentation to clarity: turning complex health data into actionable insights at the point of care.',
                  },
                  {
                    numberText: '03',
                    category: 'COLLABORATION',
                    heading: 'Cross-border learning, local impact',
                    description:
                      'What can oncology teams in one market teach another? Lessons from healthcare systems navigating rapid change.',
                  },
                  {
                    numberText: '04',
                    category: 'FUTURE OF CARE',
                    heading: "Preparing for what's next in oncology",
                    description:
                      'Where the science is going, and the operational capabilities organizations need to keep pace.',
                  },
                ],
                fields: [
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'numberText',
                        type: 'text',
                        label: 'Custom Number (e.g. 01)',
                        admin: { width: '50%' },
                      },
                      {
                        name: 'category',
                        type: 'text',
                        label: 'Category Subheading',
                        defaultValue: 'INNOVATION & INFRASTRUCTURE',
                        admin: { width: '50%' },
                      },
                    ],
                  },
                  {
                    name: 'heading',
                    type: 'textarea',
                    label: 'Topic Heading Text',
                    defaultValue: 'Connecting technology to clinical reality',
                  },
                  {
                    name: 'description',
                    type: 'textarea',
                    label: 'Topic Description Text',
                    defaultValue:
                      'How do we bridge the gap between innovative tools and the complex systems healthcare teams rely on every day?',
                  },
                ],
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
          // ─── 1. Left Kicker Styling ───────────────────────────────────────
          {
            name: 'kickerStyles',
            type: 'group',
            label: '1. Left Kicker Styling',
            fields: [
              {
                type: 'row',
                fields: [
                  bgColorPickerAll({
                    overrides: {
                      name: 'boxBgColor',
                      label: 'Square Accent Color',
                      defaultValue: 'bg-[#0256FF]',
                      admin: { width: '33.33%' },
                    },
                  }),
                  {
                    name: 'squareSize',
                    type: 'select',
                    label: 'Square Size',
                    defaultValue: 'w-2.5 h-2.5',
                    validate: allowAnySelect,
                    options: [
                      { label: 'Small (w-2 h-2)', value: 'w-2 h-2' },
                      { label: 'Medium (w-2.5 h-2.5 - Default)', value: 'w-2.5 h-2.5' },
                      { label: 'Large (w-3 h-3)', value: 'w-3 h-3' },
                    ],
                    admin: { width: '33.33%' },
                  },
                  textColorPickerAll({
                    overrides: {
                      name: 'textColor',
                      label: 'Text Color',
                      defaultValue: 'text-[#0256FF]',
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
                    label: 'Desktop Font Size',
                    defaultValue: 'text-xs md:text-sm',
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontSizeMobile',
                    type: 'select',
                    label: 'Mobile Font Size',
                    defaultValue: 'text-xs md:text-sm',
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontWeight',
                    type: 'select',
                    label: 'Desktop Font Weight',
                    defaultValue: 'font-semibold',
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontWeightMobile',
                    type: 'select',
                    label: 'Mobile Font Weight',
                    defaultValue: 'font-semibold',
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
                    label: 'Desktop Margin Bottom',
                    defaultValue: 'mb-4 md:mb-6',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                  {
                    name: 'marginBottomMobile',
                    type: 'select',
                    label: 'Mobile Margin Bottom',
                    defaultValue: '',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                ],
              },
            ],
          },

          // ─── 2. Left Heading Styling ──────────────────────────────────────
          {
            name: 'headingStyles',
            type: 'group',
            label: '2. Left Heading Styling',
            fields: [
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'headingColor',
                      label: 'Heading Text Color',
                      defaultValue: 'text-black',
                      admin: { width: '100%' },
                    },
                  }),
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
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'headingFontSizeMobile',
                    type: 'select',
                    label: 'Mobile Font Size',
                    defaultValue: 'text-3xl md:text-4xl lg:text-5xl',
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'headingFontWeight',
                    type: 'select',
                    label: 'Desktop Font Weight',
                    defaultValue: 'font-bold',
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'headingFontWeightMobile',
                    type: 'select',
                    label: 'Mobile Font Weight',
                    defaultValue: 'font-bold',
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
                    label: 'Desktop Margin Bottom',
                    defaultValue: 'mb-6 md:mb-8',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                  {
                    name: 'marginBottomMobile',
                    type: 'select',
                    label: 'Mobile Margin Bottom',
                    defaultValue: '',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                ],
              },
            ],
          },

          // ─── 3. Left Description Styling ──────────────────────────────────
          {
            name: 'descriptionStyles',
            type: 'group',
            label: '3. Left Description Styling',
            fields: [
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'descriptionColor',
                      label: 'Text Color',
                      defaultValue: 'text-slate-600',
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
                    label: 'Desktop Font Size',
                    defaultValue: 'text-base md:text-lg',
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'descriptionFontSizeMobile',
                    type: 'select',
                    label: 'Mobile Font Size',
                    defaultValue: 'text-base md:text-lg',
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'descriptionFontWeight',
                    type: 'select',
                    label: 'Desktop Font Weight',
                    defaultValue: 'font-normal',
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'descriptionFontWeightMobile',
                    type: 'select',
                    label: 'Mobile Font Weight',
                    defaultValue: 'font-normal',
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
                    label: 'Desktop Margin Bottom',
                    defaultValue: 'mb-8 md:mb-10',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                  {
                    name: 'marginBottomMobile',
                    type: 'select',
                    label: 'Mobile Margin Bottom',
                    defaultValue: '',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                ],
              },
            ],
          },

          // ─── 4. Action Button Styling ─────────────────────────────────────
          {
            name: 'buttonStyles',
            type: 'group',
            label: '4. Action Button Styling',
            fields: [
              {
                type: 'row',
                fields: [
                  bgColorPickerAll({
                    overrides: {
                      name: 'bgColor',
                      label: 'Button Background Color',
                      defaultValue: 'bg-[#0256FF]',
                      admin: { width: '50%' },
                    },
                  }),
                  textColorPickerAll({
                    overrides: {
                      name: 'textColor',
                      label: 'Button Text Color',
                      defaultValue: 'text-white',
                      admin: { width: '50%' },
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
                    label: 'Desktop Font Size',
                    defaultValue: 'text-sm md:text-base',
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontSizeMobile',
                    type: 'select',
                    label: 'Mobile Font Size',
                    defaultValue: 'text-sm md:text-base',
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontWeight',
                    type: 'select',
                    label: 'Desktop Font Weight',
                    defaultValue: 'font-semibold',
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontWeightMobile',
                    type: 'select',
                    label: 'Mobile Font Weight',
                    defaultValue: 'font-semibold',
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
                    label: 'Desktop Margin Bottom',
                    defaultValue: 'mb-3 md:mb-4',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                  {
                    name: 'marginBottomMobile',
                    type: 'select',
                    label: 'Mobile Margin Bottom',
                    defaultValue: '',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                ],
              },
            ],
          },

          // ─── 5. Disclaimer Text Styling ───────────────────────────────────
          {
            name: 'disclaimerStyles',
            type: 'group',
            label: '5. Disclaimer Text Styling',
            fields: [
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'textColor',
                      label: 'Text Color',
                      defaultValue: 'text-slate-400',
                      admin: { width: '50%' },
                    },
                  }),
                  {
                    name: 'fontSize',
                    type: 'select',
                    label: 'Desktop Font Size',
                    defaultValue: 'text-xs md:text-sm',
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontSizeMobile',
                    type: 'select',
                    label: 'Mobile Font Size',
                    defaultValue: 'text-xs md:text-sm',
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'fontWeight',
                    type: 'select',
                    label: 'Desktop Font Weight',
                    defaultValue: 'font-normal',
                    options: fontWeightOptions,
                    admin: { width: '50%' },
                  },
                  {
                    name: 'fontWeightMobile',
                    type: 'select',
                    label: 'Mobile Font Weight',
                    defaultValue: 'font-normal',
                    options: fontWeightOptions,
                    admin: { width: '50%' },
                  },
                ],
              },
            ],
          },

          // ─── 6. Agenda Row & List Styling ─────────────────────────────────
          {
            name: 'agendaRowStyles',
            type: 'group',
            label: '6. Agenda Row & List Styling (Applied to All Items)',
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'showTopDivider',
                    type: 'checkbox',
                    label: 'Show Top Divider (<hr>)',
                    defaultValue: true,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'topDividerColor',
                    type: 'select',
                    label: 'Top Divider Color',
                    defaultValue: 'border-slate-200',
                    validate: allowAnySelect,
                    options: dividerColorOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'topDividerWidth',
                    type: 'select',
                    label: 'Top Divider Thickness',
                    defaultValue: 'border-t',
                    validate: allowAnySelect,
                    options: dividerBorderWidthOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'topDividerMarginBottom',
                    type: 'select',
                    label: 'Top Divider Margin Bottom',
                    defaultValue: 'mb-6 md:mb-8',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '25%' },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'showNumbers',
                    type: 'checkbox',
                    label: 'Show Number Badges on Items (01, 02...)',
                    defaultValue: true,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'showCategory',
                    type: 'checkbox',
                    label: 'Show Category Subheading on Items',
                    defaultValue: true,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'showArrow',
                    type: 'checkbox',
                    label: 'Show Top Right Arrow (↗)',
                    defaultValue: true,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'showDivider',
                    type: 'checkbox',
                    label: 'Show Bottom Divider Line (<hr>)',
                    defaultValue: true,
                    admin: { width: '25%' },
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
                      defaultValue: 'text-slate-400',
                      admin: { width: '33.33%' },
                    },
                  }),
                  {
                    name: 'numberFontSize',
                    type: 'select',
                    label: 'Number Font Size',
                    defaultValue: 'text-base md:text-lg',
                    options: fontSizeOptions,
                    admin: { width: '33.33%' },
                  },
                  {
                    name: 'numberFontWeight',
                    type: 'select',
                    label: 'Number Font Weight',
                    defaultValue: 'font-semibold',
                    options: fontWeightOptions,
                    admin: { width: '33.33%' },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'categoryColor',
                      label: 'Category Text Color',
                      defaultValue: 'text-slate-500',
                      admin: { width: '33.33%' },
                    },
                  }),
                  {
                    name: 'categoryFontSize',
                    type: 'select',
                    label: 'Category Font Size',
                    defaultValue: 'text-xs md:text-sm',
                    options: fontSizeOptions,
                    admin: { width: '33.33%' },
                  },
                  {
                    name: 'categoryFontWeight',
                    type: 'select',
                    label: 'Category Font Weight',
                    defaultValue: 'font-semibold',
                    options: fontWeightOptions,
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
                      defaultValue: 'text-black',
                      admin: { width: '33.33%' },
                    },
                  }),
                  {
                    name: 'headingFontSize',
                    type: 'select',
                    label: 'Item Heading Font Size',
                    defaultValue: 'text-xl md:text-2xl',
                    options: fontSizeOptions,
                    admin: { width: '33.33%' },
                  },
                  {
                    name: 'headingFontWeight',
                    type: 'select',
                    label: 'Item Heading Font Weight',
                    defaultValue: 'font-bold',
                    options: fontWeightOptions,
                    admin: { width: '33.33%' },
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
                      defaultValue: 'text-slate-600',
                      admin: { width: '33.33%' },
                    },
                  }),
                  {
                    name: 'descriptionFontSize',
                    type: 'select',
                    label: 'Item Description Font Size',
                    defaultValue: 'text-sm md:text-base',
                    options: fontSizeOptions,
                    admin: { width: '33.33%' },
                  },
                  {
                    name: 'descriptionFontWeight',
                    type: 'select',
                    label: 'Item Description Font Weight',
                    defaultValue: 'font-normal',
                    options: fontWeightOptions,
                    admin: { width: '33.33%' },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'arrowColor',
                      label: 'Arrow Color',
                      defaultValue: 'text-slate-400',
                      admin: { width: '50%' },
                    },
                  }),
                  {
                    name: 'dividerColor',
                    type: 'select',
                    label: 'Bottom Divider Color',
                    defaultValue: 'border-slate-200',
                    validate: allowAnySelect,
                    options: dividerColorOptions,
                    admin: { width: '50%' },
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
                  defaultValue: 'bg-white',
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
                defaultValue: 'pb-20 md:pb-28',
                validate: allowAnySelect,
                options: [
                  { label: 'None (0)', value: 'pb-0' },
                  { label: 'Small (pb-12)', value: 'pb-12' },
                  { label: 'Medium (pb-16)', value: 'pb-16' },
                  { label: 'Standard (pb-20 md:pb-28 - Default)', value: 'pb-20 md:pb-28' },
                  { label: 'Large (pb-24 md:pb-32)', value: 'pb-24 md:pb-32' },
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

export const EventAgendaOverview: Block = {
  slug: 'eventAgendaOverview',
  interfaceName: 'EventAgendaOverviewBlock',
  labels: {
    singular: 'Event Agenda Overview',
    plural: 'Event Agenda Overview Blocks',
  },
  fields: eventAgendaOverviewFields,
}
