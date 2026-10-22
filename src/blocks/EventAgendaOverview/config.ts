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
      {
        label: '📝 Content & Media',
        fields: [
          // ─── 3. Left Column: Context & Action Stack ──────────────────────────────
          {
            name: 'leftColumn',
            type: 'group',
            label: 'Left Column: Context & Action Stack',
            fields: [
      // Kicker Group
      {
        name: 'kickerGroup',
        type: 'group',
        label: 'Subheading (Kicker)',
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'showKicker',
                type: 'checkbox',
                label: 'Show Subheading',
                defaultValue: true,
                admin: { width: '30%' },
              },
              bgColorPickerAll({
                overrides: {
                  name: 'boxBgColor',
                  label: 'Square Accent Color',
                  defaultValue: 'bg-[#0256FF]',
                  admin: { width: '35%' },
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
                admin: { width: '35%' },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'text',
                type: 'text',
                label: 'Subheading Text',
                defaultValue: 'ON THE AGENDA',
                admin: { width: '50%' },
              },
              textColorPickerAll({
                overrides: {
                  name: 'textColor',
                  label: 'Text Color',
                  defaultValue: 'text-[#0256FF]',
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
                defaultValue: 'text-xs md:text-sm',
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'fontSizeMobile',
                type: 'select',
                label: 'Mobile Font Size',
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
                validate: allowAnySelect,
                options: marginBottomOptions,
                admin: { width: '50%' },
              },
            ],
          },
        ],
      },

      // Heading Group
      {
        name: 'headingGroup',
        type: 'group',
        label: 'Heading',
        fields: [
          {
            name: 'heading',
            type: 'textarea',
            label: 'Heading (Supports inline styling / HTML like <span> or <mark>)',
            defaultValue: 'Big questions.\nOpen conversations.',
          },
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
                validate: allowAnySelect,
                options: marginBottomOptions,
                admin: { width: '50%' },
              },
            ],
          },
        ],
      },

      // Description Group
      {
        name: 'descriptionGroup',
        type: 'group',
        label: 'Description',
        fields: [
          {
            name: 'description',
            type: 'textarea',
            label: 'Description Text (Supports inline styling)',
            defaultValue:
              "Healthcare doesn't change through one-size-fits-all solutions. It changes through focused conversations, shared experience and the courage to look at challenges differently. Here's what we're talking about in Madrid:",
          },
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
                validate: allowAnySelect,
                options: marginBottomOptions,
                admin: { width: '50%' },
              },
            ],
          },
        ],
      },

      // Button (CTA)
      {
        name: 'ctaButton',
        type: 'group',
        label: 'Action Button (CTA)',
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'showButton',
                type: 'checkbox',
                label: 'Show Button',
                defaultValue: true,
                admin: { width: '30%' },
              },
              {
                name: 'text',
                type: 'text',
                label: 'Button Text',
                defaultValue: 'Request a meeting',
                admin: { width: '40%' },
              },
              {
                name: 'showArrow',
                type: 'checkbox',
                label: 'Show Arrow (↗)',
                defaultValue: true,
                admin: { width: '30%' },
              },
            ],
          },
          link({
            appearances: false,
            overrides: {
              admin: {
                description: 'Destination URL or internal document link',
              },
            },
          }),
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
                validate: allowAnySelect,
                options: marginBottomOptions,
                admin: { width: '50%' },
              },
            ],
          },
        ],
      },

      // Disclaimer Text
      {
        name: 'disclaimerGroup',
        type: 'group',
        label: 'Disclaimer Text Below Button',
        fields: [
          {
            name: 'text',
            type: 'text',
            label: 'Disclaimer Text',
            defaultValue: '*Advance booking recommended due to limited on-site availability.',
          },
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
                options: fontWeightOptions,
                admin: { width: '50%' },
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── 4. Right Column: Numbered Agenda Items ──────────────────────────────
  {
    name: 'rightColumn',
    type: 'group',
    label: 'Right Column: Numbered Agenda Items',
    fields: [
      // Top Divider Line
      {
        name: 'topDivider',
        type: 'group',
        label: 'Top Divider Line (<hr>)',
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'showTopDivider',
                type: 'checkbox',
                label: 'Show Top Divider',
                defaultValue: true,
                admin: { width: '25%' },
              },
              {
                name: 'borderColor',
                type: 'select',
                label: 'Border Color',
                defaultValue: 'border-slate-200',
                validate: allowAnySelect,
                options: dividerColorOptions,
                admin: { width: '25%' },
              },
              {
                name: 'borderWidth',
                type: 'select',
                label: 'Border Thickness',
                defaultValue: 'border-t',
                validate: allowAnySelect,
                options: dividerBorderWidthOptions,
                admin: { width: '25%' },
              },
              {
                name: 'marginBottom',
                type: 'select',
                label: 'Desktop Margin Bottom',
                defaultValue: 'mb-6 md:mb-8',
                validate: allowAnySelect,
                options: marginBottomOptions,
                admin: { width: '25%' },
              },
            ],
          },
          {
            name: 'marginBottomMobile',
            type: 'select',
            label: 'Mobile Margin Bottom',
            validate: allowAnySelect,
            options: marginBottomOptions,
            admin: { width: '50%' },
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
            admin: { width: '50%' },
          },
          {
            name: 'showCategory',
            type: 'checkbox',
            label: 'Show Category Subheading on Items',
            defaultValue: true,
            admin: { width: '50%' },
          },
        ],
      },

      // Items Array
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
          // Row 1: Number Controls
          {
            type: 'row',
            fields: [
              {
                name: 'numberText',
                type: 'text',
                label: 'Custom Number (Leave blank to auto-generate: 01, 02...)',
                admin: { width: '25%' },
              },
              textColorPickerAll({
                overrides: {
                  name: 'numberColor',
                  label: 'Number Color',
                  defaultValue: 'text-slate-400',
                  admin: { width: '25%' },
                },
              }),
              {
                name: 'numberFontSize',
                type: 'select',
                label: 'Desktop Number Size',
                defaultValue: 'text-base md:text-lg',
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'numberFontSizeMobile',
                type: 'select',
                label: 'Mobile Number Size',
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'numberFontWeight',
                type: 'select',
                label: 'Desktop Number Weight',
                defaultValue: 'font-semibold',
                options: fontWeightOptions,
                admin: { width: '50%' },
              },
              {
                name: 'numberFontWeightMobile',
                type: 'select',
                label: 'Mobile Number Weight',
                options: fontWeightOptions,
                admin: { width: '50%' },
              },
            ],
          },

          // Row 2: Category Tag
          {
            type: 'row',
            fields: [
              {
                name: 'category',
                type: 'text',
                label: 'Category Subheading',
                defaultValue: 'INNOVATION & INFRASTRUCTURE',
                admin: { width: '50%' },
              },
              textColorPickerAll({
                overrides: {
                  name: 'categoryColor',
                  label: 'Category Text Color',
                  defaultValue: 'text-slate-500',
                  admin: { width: '50%' },
                },
              }),
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'categoryFontSize',
                type: 'select',
                label: 'Desktop Category Size',
                defaultValue: 'text-xs md:text-sm',
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'categoryFontSizeMobile',
                type: 'select',
                label: 'Mobile Category Size',
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'categoryFontWeight',
                type: 'select',
                label: 'Desktop Category Weight',
                defaultValue: 'font-semibold',
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'categoryFontWeightMobile',
                type: 'select',
                label: 'Mobile Category Weight',
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'categoryMarginBottom',
                type: 'select',
                label: 'Desktop Category Margin Bottom',
                defaultValue: 'mb-2 md:mb-3',
                validate: allowAnySelect,
                options: marginBottomOptions,
                admin: { width: '50%' },
              },
              {
                name: 'categoryMarginBottomMobile',
                type: 'select',
                label: 'Mobile Category Margin Bottom',
                validate: allowAnySelect,
                options: marginBottomOptions,
                admin: { width: '50%' },
              },
            ],
          },

          // Row 3: Heading
          {
            name: 'heading',
            type: 'textarea',
            label: 'Item Heading (Supports inline styling)',
            defaultValue: 'Connecting technology to clinical reality',
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'headingColor',
                  label: 'Heading Color',
                  defaultValue: 'text-black',
                  admin: { width: '50%' },
                },
              }),
              {
                name: 'headingFontSize',
                type: 'select',
                label: 'Desktop Font Size',
                defaultValue: 'text-xl md:text-2xl',
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'headingFontSizeMobile',
                type: 'select',
                label: 'Mobile Font Size',
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
            ],
          },
          {
            type: 'row',
            fields: [
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
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'headingMarginBottom',
                type: 'select',
                label: 'Desktop Margin Bottom',
                defaultValue: 'mb-3 md:mb-4',
                validate: allowAnySelect,
                options: marginBottomOptions,
                admin: { width: '25%' },
              },
              {
                name: 'headingMarginBottomMobile',
                type: 'select',
                label: 'Mobile Margin Bottom',
                validate: allowAnySelect,
                options: marginBottomOptions,
                admin: { width: '25%' },
              },
            ],
          },

          // Row 4: Description
          {
            name: 'description',
            type: 'textarea',
            label: 'Item Description (Supports inline styling)',
            defaultValue:
              'How do we bridge the gap between innovative tools and the complex systems healthcare teams rely on every day?',
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'descriptionColor',
                  label: 'Description Color',
                  defaultValue: 'text-slate-600',
                  admin: { width: '50%' },
                },
              }),
              {
                name: 'descriptionFontSize',
                type: 'select',
                label: 'Desktop Font Size',
                defaultValue: 'text-sm md:text-base',
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'descriptionFontSizeMobile',
                type: 'select',
                label: 'Mobile Font Size',
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
            ],
          },
          {
            type: 'row',
            fields: [
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
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'descriptionMarginBottom',
                type: 'select',
                label: 'Desktop Margin Bottom',
                defaultValue: 'mb-6 md:mb-8',
                validate: allowAnySelect,
                options: marginBottomOptions,
                admin: { width: '25%' },
              },
              {
                name: 'descriptionMarginBottomMobile',
                type: 'select',
                label: 'Mobile Margin Bottom',
                validate: allowAnySelect,
                options: marginBottomOptions,
                admin: { width: '25%' },
              },
            ],
          },

          // Row 5: Arrow & Divider Controls
          {
            type: 'row',
            fields: [
              {
                name: 'showArrow',
                type: 'checkbox',
                label: 'Show Top Right Arrow (↗)',
                defaultValue: true,
                admin: { width: '25%' },
              },
              textColorPickerAll({
                overrides: {
                  name: 'arrowColor',
                  label: 'Arrow Color',
                  defaultValue: 'text-slate-400',
                  admin: { width: '25%' },
                },
              }),
              {
                name: 'showDivider',
                type: 'checkbox',
                label: 'Show Bottom Divider (<hr>)',
                defaultValue: true,
                admin: { width: '25%' },
              },
              {
                name: 'dividerColor',
                type: 'select',
                label: 'Bottom Divider Color',
                defaultValue: 'border-slate-200',
                validate: allowAnySelect,
                options: dividerColorOptions,
                admin: { width: '25%' },
              },
            ],
          },
        ],
      },
    ],
  },
        ],
      },
      {
        label: '⚙️ Advanced Styling & Layout',
        fields: [
          // ─── 1. Layout & Header Width Alignment ──────────────────────────────────
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

          // ─── 2. Section Background & Vertical Paddings ───────────────────────────
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
