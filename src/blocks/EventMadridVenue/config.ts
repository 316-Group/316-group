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

export const eventMadridVenueFields: Field[] = [
  {
    type: 'tabs',
    tabs: [
      {
        label: '📝 Content & Media',
        fields: [
          // ─── 3. Left Column: Venue Details Stack ─────────────────────────────────
          {
            name: 'leftColumn',
            type: 'group',
            label: 'Left Column: Venue Details & Action',
            fields: [
      // Kicker
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
                defaultValue: 'SEE YOU IN MADRID',
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
            defaultValue: 'One city.\nA world of perspectives.',
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

      // Primary Description
      {
        name: 'descriptionGroup',
        type: 'group',
        label: 'Primary Description',
        fields: [
          {
            name: 'description',
            type: 'textarea',
            label: 'Description (Supports inline styling)',
            defaultValue:
              "ESMO brings the global oncology community together in one place. We're proud to be part of the conversation.",
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

      // Venue Location Row (Vector Icon + Bold Title)
      {
        name: 'venueLocation',
        type: 'group',
        label: 'Venue Location Callout (Vector Icon & Name)',
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'iconType',
                type: 'select',
                label: 'Icon Source',
                defaultValue: 'mapPin',
                options: [
                  { label: 'Map Pin Vector Icon (Default)', value: 'mapPin' },
                  { label: 'Custom Vector Upload', value: 'upload' },
                ],
                admin: { width: '50%' },
              },
              textColorPickerAll({
                overrides: {
                  name: 'iconColor',
                  label: 'Vector Icon Color',
                  defaultValue: 'text-[#0256FF]',
                  admin: { width: '50%' },
                },
              }),
            ],
          },
          {
            name: 'customIcon',
            type: 'upload',
            relationTo: 'media',
            label: 'Custom Vector / SVG Icon',
            admin: {
              condition: (_, siblingData) => siblingData?.iconType === 'upload',
            },
          },
          {
            type: 'row',
            fields: [
              {
                name: 'venueName',
                type: 'text',
                label: 'Venue Name',
                defaultValue: 'The Westin Palace, Madrid',
                admin: { width: '50%' },
              },
              textColorPickerAll({
                overrides: {
                  name: 'venueColor',
                  label: 'Venue Text Color',
                  defaultValue: 'text-black',
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
                defaultValue: 'text-lg md:text-xl',
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
                defaultValue: 'font-bold',
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
                defaultValue: 'mb-2 md:mb-3',
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

      // Secondary Description
      {
        name: 'secondaryDescription',
        type: 'group',
        label: 'Secondary Description / Meeting Note',
        fields: [
          {
            name: 'text',
            type: 'textarea',
            label: 'Note Text (Supports inline styling)',
            defaultValue:
              "Just minutes from the congress venue. We're hosting meetings throughout ESMO 2026.",
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'textColor',
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
                defaultValue: 'font-normal',
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

      // Transparent Link CTA
      {
        name: 'ctaLink',
        type: 'group',
        label: 'Website Link (Transparent button with arrow)',
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'showLink',
                type: 'checkbox',
                label: 'Show Link',
                defaultValue: true,
                admin: { width: '30%' },
              },
              {
                name: 'text',
                type: 'text',
                label: 'Link Text',
                defaultValue: 'Visit venue website',
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
                description: 'Destination URL (e.g. hotel or venue website)',
              },
            },
          }),
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'textColor',
                  label: 'Text & Arrow Color',
                  defaultValue: 'text-[#0256FF]',
                  admin: { width: '100%' },
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
        ],
      },
    ],
  },

  // ─── 4. Right Column: Venue Image ────────────────────────────────────────
  {
    name: 'rightColumn',
    type: 'group',
    label: 'Right Column: Venue Facade Image',
    fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Hotel Exterior / Venue Image (Strictly no border, no shadow)',
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
              { label: 'Cover (Default)', value: 'cover' },
              { label: 'Contain', value: 'contain' },
            ],
            admin: { width: '50%' },
          },
          {
            name: 'imageRounded',
            type: 'select',
            label: 'Image Corners',
            defaultValue: 'rounded-none',
            validate: allowAnySelect,
            options: [
              { label: 'Square (rounded-none - Default)', value: 'rounded-none' },
              { label: 'Rounded Medium (rounded-lg)', value: 'rounded-lg' },
              { label: 'Rounded Large (rounded-2xl)', value: 'rounded-2xl' },
            ],
            admin: { width: '50%' },
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

export const EventMadridVenue: Block = {
  slug: 'eventMadridVenue',
  interfaceName: 'EventMadridVenueBlock',
  labels: {
    singular: 'Event Madrid Venue',
    plural: 'Event Madrid Venue Blocks',
  },
  fields: eventMadridVenueFields,
}
