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

export const eventSharedPurposeFields: Field[] = [
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

  // ─── 3. Left Column: Image & Floating Cyan Callout ───────────────────────
  {
    name: 'imageColumn',
    type: 'group',
    label: 'Left Column: Image & Callout Badge',
    fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Featured Event / Lab Image',
        admin: {
          description: 'Upload your image. Per specification, this image renders without border or box-shadow.',
        },
      },
      {
        type: 'row',
        fields: [
          {
            name: 'imageFit',
            type: 'select',
            label: 'Image Fit',
            defaultValue: 'cover',
            options: [
              { label: 'Cover (Default)', value: 'cover' },
              { label: 'Contain', value: 'contain' },
            ],
            admin: { width: '50%' },
          },
          {
            name: 'imageRounded',
            type: 'select',
            label: 'Image Rounded Corners',
            defaultValue: 'rounded-none',
            options: [
              { label: 'None (Default - Mockup Style)', value: 'rounded-none' },
              { label: 'Rounded Large (rounded-xl)', value: 'rounded-xl' },
              { label: 'Rounded 2XL (rounded-2xl)', value: 'rounded-2xl' },
            ],
            admin: { width: '50%' },
          },
        ],
      },
      // Callout Badge (Cyan Floating Box)
      {
        name: 'showCalloutBadge',
        type: 'checkbox',
        label: 'Show Overlapping Callout Badge',
        defaultValue: true,
      },
      {
        type: 'row',
        admin: {
          condition: (_, siblingData) => Boolean(siblingData?.showCalloutBadge),
        },
        fields: [
          {
            name: 'calloutText',
            type: 'text',
            label: 'Callout Text',
            defaultValue: 'Progress starts with connection.',
            admin: { width: '50%' },
          },
          {
            name: 'calloutBgColor',
            type: 'text',
            label: 'Badge Background Color (e.g. bg-[#00D2FF] or hex)',
            defaultValue: 'bg-[#00D2FF]',
            admin: { width: '25%' },
          },
          {
            name: 'calloutTextColor',
            type: 'text',
            label: 'Badge Text Color (e.g. text-[#002B49] or hex)',
            defaultValue: 'text-[#002B49]',
            admin: { width: '25%' },
          },
        ],
      },
      {
        type: 'row',
        admin: {
          condition: (_, siblingData) => Boolean(siblingData?.showCalloutBadge),
        },
        fields: [
          {
            name: 'showDotGrid',
            type: 'checkbox',
            label: 'Show 3x3 Dot Grid Decorative Icon',
            defaultValue: true,
            admin: { width: '50%' },
          },
          {
            name: 'dotGridColor',
            type: 'text',
            label: 'Dot Grid Color (e.g. bg-[#0000FF])',
            defaultValue: 'bg-[#0000FF]',
            admin: {
              width: '50%',
              condition: (_, siblingData) => Boolean(siblingData?.showDotGrid),
            },
          },
        ],
      },
    ],
  },

  // ─── 4. Right Column: Content Stack ──────────────────────────────────────
  {
    name: 'contentStack',
    type: 'group',
    label: 'Right Column: Content Stack',
    fields: [
      // Kicker / Subheader
      {
        name: 'kickerGroup',
        type: 'group',
        label: '1. Kicker / Subheading Tag (Square Accent + Text)',
        fields: [
          {
            name: 'showKicker',
            type: 'checkbox',
            label: 'Show Kicker',
            defaultValue: true,
          },
          {
            type: 'row',
            admin: {
              condition: (_, siblingData) => Boolean(siblingData?.showKicker),
            },
            fields: [
              {
                name: 'squareColor',
                type: 'text',
                label: 'Accent Square Color (Tailwind class or hex, e.g. bg-[#0000FF])',
                defaultValue: 'bg-[#0000FF]',
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
                  defaultValue: 'text-[#0000FF]',
                  admin: { width: '33.33%' },
                },
              }),
            ],
          },
          {
            name: 'text',
            type: 'text',
            label: 'Subheading Text',
            defaultValue: 'A SHARED PURPOSE',
            admin: {
              condition: (_, siblingData) => Boolean(siblingData?.showKicker),
            },
          },
          {
            type: 'row',
            admin: {
              condition: (_, siblingData) => Boolean(siblingData?.showKicker),
            },
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
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
            ],
          },
          {
            type: 'row',
            admin: {
              condition: (_, siblingData) => Boolean(siblingData?.showKicker),
            },
            fields: [
              {
                name: 'marginBottom',
                type: 'select',
                label: 'Margin Bottom',
                defaultValue: 'mb-4 md:mb-5',
                validate: allowAnySelect,
                options: [
                  { label: 'None (0)', value: 'mb-0' },
                  { label: 'Small (mb-2)', value: 'mb-2' },
                  { label: 'Medium (mb-4 md:mb-5 - Default)', value: 'mb-4 md:mb-5' },
                  { label: 'Large (mb-6)', value: 'mb-6' },
                  { label: 'Extra Large (mb-8)', value: 'mb-8' },
                ],
                admin: { width: '50%' },
              },
              {
                name: 'marginBottomMobile',
                type: 'select',
                label: 'Margin Bottom Mobile',
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

      // Main Heading
      {
        name: 'headingGroup',
        type: 'group',
        label: '2. Main Heading (Supports Inline HTML)',
        fields: [
          {
            name: 'heading',
            type: 'textarea',
            label: 'Heading Text (supports inline HTML e.g. <span style="color:#0256FF">, <strong>, <br/>)',
            defaultValue: 'Better healthcare is a team effort.',
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'headingColor',
                  label: 'Heading Color',
                  defaultValue: 'text-gray-950',
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
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '20%' },
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
                defaultValue: 'mb-6 md:mb-8',
                validate: allowAnySelect,
                options: [
                  { label: 'None (0)', value: 'mb-0' },
                  { label: 'Small (mb-4)', value: 'mb-4' },
                  { label: 'Standard (mb-6 md:mb-8 - Default)', value: 'mb-6 md:mb-8' },
                  { label: 'Large (mb-10)', value: 'mb-10' },
                  { label: 'Extra Large (mb-12)', value: 'mb-12' },
                ],
                admin: { width: '50%' },
              },
              {
                name: 'marginBottomMobile',
                type: 'select',
                label: 'Margin Bottom Mobile',
                validate: allowAnySelect,
                options: [
                  { label: 'Inherit Desktop', value: '' },
                  { label: 'None (0)', value: 'mb-0' },
                  { label: 'Small (mb-4)', value: 'mb-4' },
                  { label: 'Medium (mb-6)', value: 'mb-6' },
                ],
                admin: { width: '50%' },
              },
            ],
          },
        ],
      },

      // Description (Multi-paragraph, supports inline HTML)
      {
        name: 'descriptionGroup',
        type: 'group',
        label: '3. Description Text (Supports Inline HTML & Multiple Paragraphs)',
        fields: [
          {
            name: 'description',
            type: 'textarea',
            label: 'Description Text (supports double line break for paragraphs and inline HTML)',
            defaultValue:
              'ESMO brings the oncology community together to exchange ideas and look ahead. It’s a chance to connect different perspectives around a common goal: better care for people.\n\nAt 316 Group, we believe meaningful progress begins with listening. We’re inviting conversations with healthcare, research and life-sciences teams about the challenges that matter to them.',
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'descriptionColor',
                  label: 'Text Color',
                  defaultValue: 'text-gray-600',
                  admin: { width: '20%' },
                },
              }),
              {
                name: 'descriptionFontSize',
                type: 'select',
                label: 'Font Size',
                defaultValue: 'text-base md:text-lg',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '20%' },
              },
              {
                name: 'descriptionFontSizeMobile',
                type: 'select',
                label: 'Font Size Mobile',
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
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '20%' },
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
                defaultValue: 'mb-8 md:mb-10',
                validate: allowAnySelect,
                options: [
                  { label: 'None (0)', value: 'mb-0' },
                  { label: 'Small (mb-4)', value: 'mb-4' },
                  { label: 'Medium (mb-6)', value: 'mb-6' },
                  { label: 'Standard (mb-8 md:mb-10 - Default)', value: 'mb-8 md:mb-10' },
                  { label: 'Large (mb-12)', value: 'mb-12' },
                ],
                admin: { width: '50%' },
              },
              {
                name: 'marginBottomMobile',
                type: 'select',
                label: 'Margin Bottom Mobile',
                validate: allowAnySelect,
                options: [
                  { label: 'Inherit Desktop', value: '' },
                  { label: 'None (0)', value: 'mb-0' },
                  { label: 'Small (mb-4)', value: 'mb-4' },
                  { label: 'Medium (mb-6)', value: 'mb-6' },
                ],
                admin: { width: '50%' },
              },
            ],
          },
        ],
      },

      // Button / Text Link
      {
        name: 'buttonGroup',
        type: 'group',
        label: '4. Action Link / Button (Clean Borderless Text Link)',
        fields: [
          {
            name: 'showButton',
            type: 'checkbox',
            label: 'Show Action Link',
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
                label: 'Link Text',
                defaultValue: 'Bring your perspective to the conversation',
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
            admin: {
              condition: (_, siblingData) => Boolean(siblingData?.showButton),
            },
            fields: [
              {
                name: 'fontSize',
                type: 'select',
                label: 'Font Size',
                defaultValue: 'text-sm md:text-base',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'fontSizeMobile',
                type: 'select',
                label: 'Font Size Mobile',
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
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
            ],
          },
          link({
            overrides: {
              name: 'link',
              label: 'Link Destination',
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.showButton),
              },
            },
          }),
        ],
      },
    ],
  },
]

export const EventSharedPurpose: Block = {
  slug: 'eventSharedPurpose',
  interfaceName: 'EventSharedPurposeBlock',
  fields: eventSharedPurposeFields,
}
