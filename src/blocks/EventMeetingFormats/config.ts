import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { link } from '@/fields/link'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const allowAnySelect = (() => true as const) as any

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

const rightPaddingOptions = [
  { label: 'None (0)', value: 'py-0' },
  { label: 'Small (py-12)', value: 'py-12' },
  { label: 'Medium (py-16)', value: 'py-16' },
  { label: 'Standard (pt-16 md:pt-24 pb-16 md:pb-24 - Default)', value: 'pt-16 md:pt-24' },
  { label: 'Large (pt-20 md:pt-32)', value: 'pt-20 md:pt-32' },
  { label: 'Extra Large (pt-24 md:pt-40)', value: 'pt-24 md:pt-40' },
]

export const eventMeetingFormatsFields: Field[] = [
  {
    type: 'tabs',
    tabs: [
      {
        label: '📝 Content & Media',
        fields: [
          // ─── 2. Left Column: Full-Bleed Image & Cyan Badge ────────────────────────
          {
            name: 'leftColumn',
            type: 'group',
            label: 'Left Column: Image & Badge',
            fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Meeting Photo (Flush full-bleed, strictly no border or shadow)',
      },
      {
        type: 'row',
        fields: [
          {
            name: 'imageFit',
            type: 'select',
            label: 'Image Fit',
            defaultValue: 'cover',
            validate: allowAnySelect,
            options: [
              { label: 'Cover (Fill full height - Default)', value: 'cover' },
              { label: 'Contain', value: 'contain' },
            ],
            admin: { width: '50%' },
          },
          {
            name: 'minHeight',
            type: 'select',
            label: 'Minimum Desktop Height',
            defaultValue: 'min-h-[540px] lg:min-h-[640px]',
            validate: allowAnySelect,
            options: [
              { label: 'Compact (480px)', value: 'min-h-[480px]' },
              { label: 'Standard (min-h-[540px] lg:min-h-[640px] - Default)', value: 'min-h-[540px] lg:min-h-[640px]' },
              { label: 'Tall (min-h-[600px] lg:min-h-[720px])', value: 'min-h-[600px] lg:min-h-[720px]' },
              { label: 'Full Screen Viewport (100vh)', value: 'min-h-screen' },
            ],
            admin: { width: '50%' },
          },
        ],
      },
      // Cyan Accent Badge (3x3 Dots)
      {
        name: 'badge',
        type: 'group',
        label: 'Cyan Accent Badge (3x3 Dot Matrix)',
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'showBadge',
                type: 'checkbox',
                label: 'Show Accent Badge on Image',
                defaultValue: true,
                admin: { width: '30%' },
              },
              bgColorPickerAll({
                overrides: {
                  name: 'badgeBgColor',
                  label: 'Badge Background Color',
                  defaultValue: 'bg-[#00D2FF]',
                  admin: { width: '35%' },
                },
              }),
              bgColorPickerAll({
                overrides: {
                  name: 'dotColor',
                  label: '3x3 Dots Color',
                  defaultValue: 'bg-[#0256FF]',
                  admin: { width: '35%' },
                },
              }),
            ],
          },
        ],
      },
    ],
  },

  // ─── 3. Right Column: Padded Content Stack ───────────────────────────────
  {
    name: 'rightColumn',
    type: 'group',
    label: 'Right Column: Padded Content Stack',
    fields: [
      // Column Padding Controls
      {
        type: 'row',
        fields: [
          {
            name: 'paddingTop',
            type: 'select',
            label: 'Top Padding',
            defaultValue: 'pt-16 md:pt-24',
            validate: allowAnySelect,
            options: [
              { label: 'None (0)', value: 'pt-0' },
              { label: 'Small (pt-10 md:pt-16)', value: 'pt-10 md:pt-16' },
              { label: 'Medium (pt-14 md:pt-20)', value: 'pt-14 md:pt-20' },
              { label: 'Standard (pt-16 md:pt-24 - Default)', value: 'pt-16 md:pt-24' },
              { label: 'Large (pt-20 md:pt-32)', value: 'pt-20 md:pt-32' },
            ],
            admin: { width: '50%' },
          },
          {
            name: 'paddingBottom',
            type: 'select',
            label: 'Bottom Padding',
            defaultValue: 'pb-16 md:pb-24',
            validate: allowAnySelect,
            options: [
              { label: 'None (0)', value: 'pb-0' },
              { label: 'Small (pb-10 md:pb-16)', value: 'pb-10 md:pb-16' },
              { label: 'Medium (pb-14 md:pb-20)', value: 'pb-14 md:pb-20' },
              { label: 'Standard (pb-16 md:pb-24 - Default)', value: 'pb-16 md:pb-24' },
              { label: 'Large (pb-20 md:pb-32)', value: 'pb-20 md:pb-32' },
            ],
            admin: { width: '50%' },
          },
        ],
      },

      // Subheading (Kicker Group)
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
                defaultValue: 'MAKE TIME TO CONNECT',
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
            label: 'Heading (Supports inline styling / HTML)',
            defaultValue: 'A conversation built\naround you.',
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'headingColor',
                  label: 'Heading Color',
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

      // Description Group
      {
        name: 'descriptionGroup',
        type: 'group',
        label: 'Description',
        fields: [
          {
            name: 'description',
            type: 'textarea',
            label: 'Description (Supports inline styling)',
            defaultValue:
              "Whether you have twenty minutes between sessions or want to dive deeper over coffee, we'd welcome the chance to hear what you're working on and share how we might help.",
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

      // Format Points Array
      {
        name: 'points',
        type: 'array',
        label: 'Conversation Formats (Bullet points with small boxes)',
        minRows: 1,
        defaultValue: [
          { label: 'One-to-one exchange' },
          { label: 'Team discussion' },
        ],
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'label',
                type: 'text',
                label: 'Point Label',
                defaultValue: 'One-to-one exchange',
                admin: { width: '35%' },
              },
              bgColorPickerAll({
                overrides: {
                  name: 'boxBgColor',
                  label: 'Square Color',
                  defaultValue: 'bg-[#0256FF]',
                  admin: { width: '35%' },
                },
              }),
              textColorPickerAll({
                overrides: {
                  name: 'textColor',
                  label: 'Text Color',
                  defaultValue: 'text-slate-900',
                  admin: { width: '30%' },
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
                defaultValue: 'font-medium',
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
                  admin: { width: '33.33%' },
                },
              }),
              textColorPickerAll({
                overrides: {
                  name: 'textColor',
                  label: 'Button Text Color',
                  defaultValue: 'text-white',
                  admin: { width: '33.33%' },
                },
              }),
              textColorPickerAll({
                overrides: {
                  name: 'arrowColor',
                  label: 'Arrow Color',
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

      // Disclaimer Group
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
        ],
      },
      {
        label: '⚙️ Advanced Styling & Layout',
        fields: [
          // ─── 1. Section Background & Column Layout ────────────────────────────────
          {
            type: 'row',
            fields: [
              bgColorPickerAll({
                overrides: {
                  name: 'sectionBgColor',
                  label: 'Section Background Color',
                  defaultValue: 'bg-white',
                  admin: { width: '50%' },
                },
              }),
              {
                name: 'reverseColumns',
                type: 'checkbox',
                label: 'Reverse Column Order (Content on Left, Image on Right)',
                defaultValue: false,
                admin: { width: '50%' },
              },
            ],
          },
        ],
      },
    ],
  },
]

export const EventMeetingFormats: Block = {
  slug: 'eventMeetingFormats',
  interfaceName: 'EventMeetingFormatsBlock',
  labels: {
    singular: 'Event Meeting Formats',
    plural: 'Event Meeting Formats Blocks',
  },
  fields: eventMeetingFormatsFields,
}
