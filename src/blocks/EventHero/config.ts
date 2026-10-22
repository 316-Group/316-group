import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { link } from '@/fields/link'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const allowAnySelect = (() => true as const) as any

const alignmentOptions = [
  { label: 'Left (Default)', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
]

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

export const eventHeroFields: Field[] = [
  // ─── 1. Layout & Header Width Matching ─────────────────────────────────────
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

  // ─── 2. Vertical Padding Controls ──────────────────────────────────────────
  {
    type: 'row',
    fields: [
      {
        name: 'paddingTop',
        type: 'select',
        label: 'Body Top Padding',
        defaultValue: 'pt-16',
        validate: allowAnySelect,
        options: [
          { label: 'None (0)', value: 'pt-0' },
          { label: 'Small (pt-8)', value: 'pt-8' },
          { label: 'Medium (pt-12)', value: 'pt-12' },
          { label: 'Standard (pt-16 - Default)', value: 'pt-16' },
          { label: 'Large (pt-20)', value: 'pt-20' },
          { label: 'Extra Large (pt-24)', value: 'pt-24' },
          { label: '2X Large (pt-32)', value: 'pt-32' },
        ],
        admin: { width: '25%' },
      },
      {
        name: 'bodyPaddingBottom',
        type: 'select',
        label: 'Body Bottom Padding',
        defaultValue: 'pb-16',
        validate: allowAnySelect,
        options: [
          { label: 'None (0)', value: 'pb-0' },
          { label: 'Small (pb-8)', value: 'pb-8' },
          { label: 'Medium (pb-12)', value: 'pb-12' },
          { label: 'Standard (pb-16 - Default)', value: 'pb-16' },
          { label: 'Large (pb-20)', value: 'pb-20' },
          { label: 'Extra Large (pb-24)', value: 'pb-24' },
          { label: '2X Large (pb-32)', value: 'pb-32' },
        ],
        admin: { width: '25%' },
      },
      {
        name: 'footerPaddingTop',
        type: 'select',
        label: 'Footer Top Padding',
        defaultValue: 'pt-6',
        validate: allowAnySelect,
        options: [
          { label: 'None (0)', value: 'pt-0' },
          { label: 'Small (pt-4)', value: 'pt-4' },
          { label: 'Standard (pt-6 - Default)', value: 'pt-6' },
          { label: 'Medium (pt-8)', value: 'pt-8' },
          { label: 'Large (pt-10)', value: 'pt-10' },
          { label: 'Extra Large (pt-12)', value: 'pt-12' },
        ],
        admin: { width: '25%' },
      },
      {
        name: 'footerPaddingBottom',
        type: 'select',
        label: 'Footer Bottom Padding',
        defaultValue: 'pb-6',
        validate: allowAnySelect,
        options: [
          { label: 'None (0)', value: 'pb-0' },
          { label: 'Small (pb-4)', value: 'pb-4' },
          { label: 'Standard (pb-6 - Default)', value: 'pb-6' },
          { label: 'Medium (pb-8)', value: 'pb-8' },
          { label: 'Large (pb-10)', value: 'pb-10' },
          { label: 'Extra Large (pb-12)', value: 'pb-12' },
        ],
        admin: { width: '25%' },
      },
    ],
  },

  // ─── 3. Background Controls (Body & Footer) ────────────────────────────────
  {
    type: 'row',
    fields: [
      {
        name: 'backgroundType',
        type: 'select',
        label: 'Body Background Type',
        defaultValue: 'color',
        options: [
          { label: 'Solid Color (Default)', value: 'color' },
          { label: 'Media / Image', value: 'media' },
        ],
        admin: { width: '33.33%' },
      },
      bgColorPickerAll({
        overrides: {
          name: 'bodyBgColor',
          label: 'Body Background Color',
          defaultValue: 'bg-[#0000FF]',
          admin: {
            width: '33.33%',
            condition: (_, { backgroundType }) => backgroundType === 'color',
          },
        },
      }),
      bgColorPickerAll({
        overrides: {
          name: 'footerBgColor',
          label: 'Footer Background Color',
          defaultValue: 'bg-[#F4F6F9]',
          admin: { width: '33.33%' },
        },
      }),
    ],
  },
  {
    type: 'row',
    admin: {
      condition: (_, { backgroundType }) => backgroundType === 'media',
    },
    fields: [
      {
        name: 'bodyBgMedia',
        type: 'upload',
        relationTo: 'media',
        label: 'Body Background Image',
        admin: { width: '50%' },
      },
      {
        name: 'bodyBgOverlay',
        type: 'select',
        label: 'Background Overlay',
        defaultValue: 'medium',
        options: [
          { label: 'Vignette', value: 'vignette' },
          { label: 'Subtle (30%)', value: 'subtle' },
          { label: 'Medium (50% - Default)', value: 'medium' },
          { label: 'Heavy (75%)', value: 'heavy' },
          { label: 'None', value: 'none' },
        ],
        admin: { width: '50%' },
      },
    ],
  },

  // ─── 4. Left Column Content Stack (All Optional) ───────────────────────────
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
            label: 'Accent Square Color (Tailwind class or hex, e.g. bg-[#00D2FF])',
            defaultValue: 'bg-[#00D2FF]',
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
        name: 'text',
        type: 'text',
        label: 'Subheading Text',
        defaultValue: '316 GROUP AT ESMO 2026',
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
            defaultValue: 'mb-4',
            validate: allowAnySelect,
            options: [
              { label: 'None (0)', value: 'mb-0' },
              { label: 'Extra Small (mb-2)', value: 'mb-2' },
              { label: 'Small (mb-3)', value: 'mb-3' },
              { label: 'Standard (mb-4 - Default)', value: 'mb-4' },
              { label: 'Medium (mb-6)', value: 'mb-6' },
              { label: 'Large (mb-8)', value: 'mb-8' },
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
              { label: 'Extra Small (mb-2)', value: 'mb-2' },
              { label: 'Small (mb-3)', value: 'mb-3' },
              { label: 'Medium (mb-4)', value: 'mb-4' },
            ],
            admin: { width: '50%' },
          },
        ],
      },
    ],
  },

  // ─── Main Heading ──────────────────────────────────────────────────────────
  {
    name: 'headingGroup',
    type: 'group',
    label: '2. Main Heading (Supports Inline HTML)',
    fields: [
      {
        name: 'heading',
        type: 'textarea',
        label: 'Heading Text (supports inline HTML e.g. <span style="color:#00D2FF">, <strong>, <br/>)',
        defaultValue: 'Connecting people,\ndata and better\nhealthcare.',
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'headingColor',
              label: 'Heading Text Color',
              defaultValue: 'text-white',
              admin: { width: '20%' },
            },
          }),
          {
            name: 'headingFontSize',
            type: 'select',
            label: 'Font Size',
            defaultValue: 'text-4xl sm:text-5xl lg:text-6xl',
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

  // ─── Description ───────────────────────────────────────────────────────────
  {
    name: 'descriptionGroup',
    type: 'group',
    label: '3. Description',
    fields: [
      {
        name: 'description',
        type: 'textarea',
        label: 'Description Text',
        defaultValue:
          "A shared ambition. A meaningful conversation. Join 316 Group in Madrid to explore what's next for healthcare.",
      },
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

  // ─── Date & Location Metadata ──────────────────────────────────────────────
  {
    name: 'metadataGroup',
    type: 'group',
    label: '4. Date & Location Metadata Row',
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'dateText',
            type: 'text',
            label: 'Date Text',
            defaultValue: '23–27 October 2026',
            admin: { width: '40%' },
          },
          {
            name: 'dividerColor',
            type: 'text',
            label: 'Vertical Divider Color (e.g. bg-white/40 or #FFFFFF)',
            defaultValue: 'bg-white/40',
            admin: { width: '20%' },
          },
          {
            name: 'locationText',
            type: 'text',
            label: 'Location Text',
            defaultValue: 'Madrid, Spain',
            admin: { width: '40%' },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'textColor',
              label: 'Metadata Text Color',
              defaultValue: 'text-white',
              admin: { width: '20%' },
            },
          }),
          {
            name: 'fontSize',
            type: 'select',
            label: 'Font Size',
            defaultValue: 'text-sm md:text-base',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '20%' },
          },
          {
            name: 'fontSizeMobile',
            type: 'select',
            label: 'Font Size Mobile',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '20%' },
          },
          {
            name: 'fontWeight',
            type: 'select',
            label: 'Font Weight',
            defaultValue: 'font-medium',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '20%' },
          },
          {
            name: 'fontWeightMobile',
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

  // ─── Action Buttons ────────────────────────────────────────────────────────
  {
    name: 'buttonsGroup',
    type: 'group',
    label: '5. Action Buttons (Primary & Secondary)',
    fields: [
      {
        name: 'button1',
        type: 'group',
        label: 'Primary Button (Solid Rounded Pill)',
        fields: [
          {
            name: 'text',
            type: 'text',
            label: 'Button Text',
            defaultValue: 'Request a meeting',
          },
          {
            type: 'row',
            fields: [
              bgColorPickerAll({
                overrides: {
                  name: 'bgColor',
                  label: 'Button Background',
                  defaultValue: 'bg-white',
                  admin: { width: '25%' },
                },
              }),
              textColorPickerAll({
                overrides: {
                  name: 'textColor',
                  label: 'Button Text Color',
                  defaultValue: 'text-[#0256FF]',
                  admin: { width: '25%' },
                },
              }),
              textColorPickerAll({
                overrides: {
                  name: 'iconColor',
                  label: 'Arrow Icon Color',
                  defaultValue: 'text-[#0256FF]',
                  admin: { width: '25%' },
                },
              }),
              {
                name: 'borderRadius',
                type: 'select',
                label: 'Rounded Corners',
                defaultValue: 'rounded-lg',
                options: [
                  { label: 'Small (rounded-md)', value: 'rounded-md' },
                  { label: 'Standard (rounded-lg - Default)', value: 'rounded-lg' },
                  { label: 'Large (rounded-xl)', value: 'rounded-xl' },
                  { label: 'Extra Large (rounded-2xl)', value: 'rounded-2xl' },
                  { label: 'Full Pill (rounded-full)', value: 'rounded-full' },
                ],
                admin: { width: '25%' },
              },
            ],
          },
          {
            type: 'row',
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
              label: 'Button Link',
            },
          }),
        ],
      },
      {
        name: 'button2',
        type: 'group',
        label: 'Secondary Button (Transparent with Down Arrow)',
        fields: [
          {
            name: 'text',
            type: 'text',
            label: 'Button Text',
            defaultValue: 'Explore the conversations ↓',
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'textColor',
                  label: 'Text Color',
                  defaultValue: 'text-white',
                  admin: { width: '50%' },
                },
              }),
              textColorPickerAll({
                overrides: {
                  name: 'iconColor',
                  label: 'Icon Color',
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
                defaultValue: 'font-medium',
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
              label: 'Button Link',
            },
          }),
        ],
      },
    ],
  },

  // ─── 5. Right Column (Featured Event Image - No Border, No Shadow) ─────────
  {
    name: 'imageColumn',
    type: 'group',
    label: '6. Featured Event Image (Right Column)',
    fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Featured Event Image',
        admin: {
          description:
            'Upload your hero graphic. Per specification, this image renders without border or box-shadow.',
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
            admin: { width: '33.33%' },
          },
          {
            name: 'imageRounded',
            type: 'select',
            label: 'Rounded Corners',
            defaultValue: 'rounded-none',
            options: [
              { label: 'None (Default - Mockup Style)', value: 'rounded-none' },
              { label: 'Rounded 2XL (rounded-2xl)', value: 'rounded-2xl' },
              { label: 'Rounded 3XL (rounded-3xl)', value: 'rounded-3xl' },
            ],
            admin: { width: '33.33%' },
          },
          {
            name: 'gridBottomSpacing',
            type: 'select',
            label: 'Spacing Below Body Grid (Desktop & Mobile)',
            defaultValue: 'mb-0',
            validate: allowAnySelect,
            options: [
              { label: 'None (0)', value: 'mb-0' },
              { label: 'Small (mb-4)', value: 'mb-4' },
              { label: 'Medium (mb-8)', value: 'mb-8' },
              { label: 'Large (mb-12)', value: 'mb-12' },
              { label: 'Extra Large (mb-16)', value: 'mb-16' },
            ],
            admin: { width: '33.33%' },
          },
        ],
      },
    ],
  },

  // ─── 6. Footer Metadata Bar (Band 2 - Max 3 Items Flex Between) ────────────
  {
    name: 'footerBar',
    type: 'group',
    label: '7. Footer Metadata Bar (Max 3 Items Flex Between)',
    fields: [
      // Global styling for all footer items
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'iconColor',
              label: 'Icons Color',
              defaultValue: 'text-[#0256FF]',
              admin: { width: '25%' },
            },
          }),
          {
            name: 'iconSize',
            type: 'select',
            label: 'Icons Size',
            defaultValue: 'w-6 h-6',
            validate: allowAnySelect,
            options: [
              { label: 'Small (20px)', value: 'w-5 h-5' },
              { label: 'Standard (24px - Default)', value: 'w-6 h-6' },
              { label: 'Medium (28px)', value: 'w-7 h-7' },
              { label: 'Large (32px)', value: 'w-8 h-8' },
            ],
            admin: { width: '25%' },
          },
          {
            name: 'iconTextGap',
            type: 'select',
            label: 'Distance Between Icon and Text',
            defaultValue: 'gap-3 md:gap-4',
            validate: allowAnySelect,
            options: [
              { label: 'Tight (gap-2)', value: 'gap-2' },
              { label: 'Standard (gap-3 md:gap-4 - Default)', value: 'gap-3 md:gap-4' },
              { label: 'Spacious (gap-5)', value: 'gap-5' },
            ],
            admin: { width: '25%' },
          },
          {
            name: 'subheadingHeadingGap',
            type: 'select',
            label: 'Distance: Subheading & Heading',
            defaultValue: 'gap-0.5',
            validate: allowAnySelect,
            options: [
              { label: 'Tight (gap-0.5 - Default)', value: 'gap-0.5' },
              { label: 'Standard (gap-1)', value: 'gap-1' },
              { label: 'Medium (gap-2)', value: 'gap-2' },
            ],
            admin: { width: '25%' },
          },
        ],
      },
      // Subheading & Heading typography
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'subheadingColor',
              label: 'Subheading Color',
              defaultValue: 'text-gray-500',
              admin: { width: '25%' },
            },
          }),
          {
            name: 'subheadingFontSize',
            type: 'select',
            label: 'Subheading Font Size',
            defaultValue: 'text-[11px] md:text-xs',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'subheadingFontSizeMobile',
            type: 'select',
            label: 'Subheading Font Size Mobile',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'subheadingFontWeight',
            type: 'select',
            label: 'Subheading Font Weight',
            defaultValue: 'font-medium',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'headingColor',
              label: 'Heading Color',
              defaultValue: 'text-gray-950',
              admin: { width: '25%' },
            },
          }),
          {
            name: 'headingFontSize',
            type: 'select',
            label: 'Heading Font Size',
            defaultValue: 'text-base md:text-lg',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'headingFontSizeMobile',
            type: 'select',
            label: 'Heading Font Size Mobile',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'headingFontWeight',
            type: 'select',
            label: 'Heading Font Weight',
            defaultValue: 'font-semibold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
        ],
      },
      // Footer Items (Max 3)
      {
        name: 'items',
        type: 'array',
        label: 'Footer Items (Max 3)',
        maxRows: 3,
        defaultValue: [
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
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'iconType',
                type: 'select',
                label: 'Icon',
                defaultValue: 'calendar',
                options: [
                  { label: 'Calendar / Congress', value: 'calendar' },
                  { label: 'Map Pin / City', value: 'mapPin' },
                  { label: 'Message / Opportunity', value: 'messageSquare' },
                  { label: 'Clock / Time', value: 'clock' },
                  { label: 'Users / Attendees', value: 'users' },
                  { label: 'Globe / World', value: 'globe' },
                  { label: 'Ticket / Pass', value: 'ticket' },
                  { label: 'Custom Uploaded Media', value: 'customMedia' },
                  { label: 'None', value: 'none' },
                ],
                admin: { width: '33.33%' },
              },
              {
                name: 'subheading',
                type: 'text',
                label: 'Subheading',
                admin: { width: '33.33%' },
              },
              {
                name: 'heading',
                type: 'text',
                label: 'Heading',
                admin: { width: '33.33%' },
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
        ],
      },
    ],
  },
]

export const EventHero: Block = {
  slug: 'eventHero',
  interfaceName: 'EventHeroBlock',
  fields: eventHeroFields,
}
