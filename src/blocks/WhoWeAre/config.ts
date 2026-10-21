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

export const whoWeAreFields: Field[] = [
  // ─── 1. Section Spacing & Background ─────────────────────────────────────
  {
    type: 'row',
    fields: [
      bgColorPickerAll({
        overrides: {
          name: 'sectionBgColor',
          label: 'Section Background Color',
          defaultValue: 'bg-[#0256FF]',
          validate: allowAnySelect,
          admin: { width: '33.33%' },
        },
      }),
      {
        name: 'paddingTop',
        type: 'select',
        label: 'Padding Top',
        defaultValue: 'pt-20',
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
        defaultValue: 'pb-20',
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

  // ─── 3. Left Column Content ───────────────────────────────────────────────
  {
    name: 'leftColumn',
    type: 'group',
    label: 'Left Column Content',
    fields: [
      // ── Badge Group ──
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
            defaultValue: 'Who we are',
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
                  defaultValue: 'bg-white/10',
                  validate: allowAnySelect,
                  admin: { width: '25%' },
                },
              }),
              textColorPickerAll({
                overrides: {
                  name: 'badgeTextColor',
                  label: 'Badge Text Color',
                  defaultValue: 'text-white',
                  validate: allowAnySelect,
                  admin: { width: '25%' },
                },
              }),
              {
                name: 'badgeFontSize',
                type: 'select',
                label: 'Badge Font Size',
                defaultValue: 'text-xs md:text-sm',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'badgeFontWeight',
                type: 'select',
                label: 'Badge Font Weight',
                defaultValue: 'font-medium',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
            ],
          },
          {
            name: 'badgeMarginBottom',
            type: 'select',
            label: 'Badge Margin Bottom',
            defaultValue: 'mb-4 md:mb-6',
            validate: allowAnySelect,
            options: [
              { label: 'Small (mb-2)', value: 'mb-2' },
              { label: 'Medium (mb-4 md:mb-6 - Default)', value: 'mb-4 md:mb-6' },
              { label: 'Large (mb-6 md:mb-8)', value: 'mb-6 md:mb-8' },
              { label: 'Extra Large (mb-8 md:mb-12)', value: 'mb-8 md:mb-12' },
            ],
            admin: {
              condition: (_, s) => Boolean(s?.showBadge),
              width: '50%',
            },
          },
        ],
      },

      // ── Sub-Heading ("We are" / "Connected") ──
      {
        name: 'subHeading',
        type: 'text',
        label: 'Sub-Heading Text',
        defaultValue: 'We are',
        admin: {
          description:
            'Introductory sub-heading (e.g. "We are" or "Connected"). Supports <style="color:#fff">inline styles</style>. Leave blank to hide.',
        },
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'subHeadingColor',
              label: 'Sub-Heading Color',
              defaultValue: 'text-white',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          {
            name: 'subHeadingFontSize',
            type: 'select',
            label: 'Sub-Heading Font Size',
            defaultValue: 'text-3xl md:text-4xl lg:text-5xl',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'subHeadingFontWeight',
            type: 'select',
            label: 'Sub-Heading Font Weight',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
          {
            name: 'subHeadingMarginBottom',
            type: 'select',
            label: 'Sub-Heading Margin Bottom',
            defaultValue: 'mb-1 md:mb-2',
            validate: allowAnySelect,
            options: [
              { label: 'None (0)', value: 'mb-0' },
              { label: 'Tight (mb-1 md:mb-2 - Default)', value: 'mb-1 md:mb-2' },
              { label: 'Normal (mb-2 md:mb-3)', value: 'mb-2 md:mb-3' },
              { label: 'Spacious (mb-4 md:mb-6)', value: 'mb-4 md:mb-6' },
            ],
            admin: { width: '25%' },
          },
        ],
      },

      // ── Main Heading ("316 Group" / "across markets.") ──
      {
        name: 'heading',
        type: 'text',
        label: 'Main Heading Text',
        defaultValue: '316 Group',
        admin: {
          description:
            'Primary heading (e.g. "316 Group" or "across markets."). Supports inline styling. Leave blank to hide.',
        },
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'headingColor',
              label: 'Main Heading Color',
              defaultValue: 'text-white',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          {
            name: 'headingFontSize',
            type: 'select',
            label: 'Main Heading Font Size',
            defaultValue: 'text-4xl md:text-5xl lg:text-6xl',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'headingFontWeight',
            type: 'select',
            label: 'Main Heading Font Weight',
            defaultValue: 'font-extrabold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
          {
            name: 'headingMarginBottom',
            type: 'select',
            label: 'Main Heading Margin Bottom',
            defaultValue: 'mb-6 md:mb-8',
            validate: allowAnySelect,
            options: [
              { label: 'Small (mb-4)', value: 'mb-4' },
              { label: 'Medium (mb-6 md:mb-8 - Default)', value: 'mb-6 md:mb-8' },
              { label: 'Large (mb-8 md:mb-10)', value: 'mb-8 md:mb-10' },
              { label: 'Extra Large (mb-12)', value: 'mb-12' },
            ],
            admin: { width: '25%' },
          },
        ],
      },

      // ── Description ──
      {
        name: 'description',
        type: 'textarea',
        label: 'Description Text',
        defaultValue:
          'We bring together specialist businesses, products and people under one connected ecosystem — combining practical expertise with an ambition to make everyday experiences simpler, smarter and more accessible.',
        admin: {
          description:
            'Description text below headings. Supports inline styling. Leave blank to hide.',
        },
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'descriptionColor',
              label: 'Description Color',
              defaultValue: 'text-white/80',
              validate: allowAnySelect,
              admin: { width: '33.33%' },
            },
          }),
          {
            name: 'descriptionFontSize',
            type: 'select',
            label: 'Description Font Size',
            defaultValue: 'text-base md:text-lg',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '33.33%' },
          },
          {
            name: 'descriptionFontWeight',
            type: 'select',
            label: 'Description Font Weight',
            defaultValue: 'font-normal',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '33.33%' },
          },
        ],
      },

      // ── Spacing Below Description ──
      {
        type: 'row',
        fields: [
          {
            name: 'spacingBelowDescription',
            type: 'select',
            label: 'Spacing Below Description',
            defaultValue: 'mb-10 md:mb-12',
            validate: allowAnySelect,
            options: [
              { label: 'Small (mb-6)', value: 'mb-6' },
              { label: 'Medium (mb-8 md:mb-10)', value: 'mb-8 md:mb-10' },
              { label: 'Large (mb-10 md:mb-12 - Default)', value: 'mb-10 md:mb-12' },
              { label: 'Extra Large (mb-14 md:mb-16)', value: 'mb-14 md:mb-16' },
              { label: 'Custom Value', value: 'custom' },
            ],
            admin: { width: '50%' },
          },
          {
            name: 'spacingBelowDescriptionCustom',
            type: 'text',
            label: 'Custom Spacing (e.g. 50px)',
            admin: {
              width: '50%',
              condition: (_, s) => s?.spacingBelowDescription === 'custom',
            },
          },
        ],
      },

      // ── Bottom Content Mode Selector (Buttons vs Offices vs None) ──
      {
        name: 'bottomContentMode',
        type: 'select',
        label: 'Left Column Bottom Mode',
        defaultValue: 'buttons',
        validate: allowAnySelect,
        options: [
          { label: 'Action Buttons (Variation A - Default)', value: 'buttons' },
          { label: 'Offices / Locations Strip (Variation B)', value: 'offices' },
          { label: 'None (Hidden)', value: 'none' },
        ],
        admin: {
          description:
            'Choose whether to display side-by-side action buttons, the offices strip with circular flags/avatars, or nothing.',
        },
      },

      // ── Mode A: Action Buttons ──
      {
        name: 'buttonsGroup',
        type: 'group',
        label: 'Action Buttons Settings',
        admin: {
          condition: (_, s) => s?.bottomContentMode === 'buttons',
        },
        fields: [
          // Button 1 (Filled Pill Button)
          {
            name: 'enableButton1',
            type: 'checkbox',
            label: 'Enable Button 1 ("See our journey")',
            defaultValue: true,
          },
          {
            type: 'row',
            admin: {
              condition: (_, s) => Boolean(s?.enableButton1 !== false),
            },
            fields: [
              {
                name: 'button1Text',
                type: 'text',
                label: 'Button 1 Text',
                defaultValue: 'See our journey',
                admin: { width: '50%' },
              },
              bgColorPickerAll({
                overrides: {
                  name: 'button1BgColor',
                  label: 'Button 1 Background',
                  defaultValue: 'bg-white',
                  validate: allowAnySelect,
                  admin: { width: '25%' },
                },
              }),
              textColorPickerAll({
                overrides: {
                  name: 'button1TextColor',
                  label: 'Button 1 Text Color',
                  defaultValue: 'text-[#0256FF]',
                  validate: allowAnySelect,
                  admin: { width: '25%' },
                },
              }),
            ],
          },
          link({
            appearances: false,
            disableLabel: true,
            required: false,
            overrides: {
              name: 'button1Link',
              label: 'Button 1 Link (Optional)',
              admin: {
                condition: (_, s) => Boolean(s?.enableButton1 !== false),
                description:
                  'Optional link. If omitted, the button renders and clicking acts as a safe no-op.',
              },
            },
          }),
          {
            type: 'row',
            admin: {
              condition: (_, s) => Boolean(s?.enableButton1 !== false),
            },
            fields: [
              {
                name: 'button1FontSize',
                type: 'select',
                label: 'Button 1 Font Size',
                defaultValue: 'text-sm md:text-base',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '50%' },
              },
              {
                name: 'button1FontWeight',
                type: 'select',
                label: 'Button 1 Font Weight',
                defaultValue: 'font-semibold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '50%' },
              },
            ],
          },

          // Button 2 (Ghost Button with Vector Arrow Circle)
          {
            name: 'enableButton2',
            type: 'checkbox',
            label: 'Enable Button 2 ("See Open roles")',
            defaultValue: true,
          },
          {
            type: 'row',
            admin: {
              condition: (_, s) => Boolean(s?.enableButton2 !== false),
            },
            fields: [
              {
                name: 'button2Text',
                type: 'text',
                label: 'Button 2 Text',
                defaultValue: 'See Open roles',
                admin: { width: '50%' },
              },
              textColorPickerAll({
                overrides: {
                  name: 'button2TextColor',
                  label: 'Button 2 Text Color',
                  defaultValue: 'text-white',
                  validate: allowAnySelect,
                  admin: { width: '50%' },
                },
              }),
            ],
          },
          link({
            appearances: false,
            disableLabel: true,
            required: false,
            overrides: {
              name: 'button2Link',
              label: 'Button 2 Link (Optional)',
              admin: {
                condition: (_, s) => Boolean(s?.enableButton2 !== false),
                description:
                  'Optional link. If omitted, the button renders and clicking acts as a safe no-op.',
              },
            },
          }),
          {
            type: 'row',
            admin: {
              condition: (_, s) => Boolean(s?.enableButton2 !== false),
            },
            fields: [
              bgColorPickerAll({
                overrides: {
                  name: 'button2IconBgColor',
                  label: 'Vector Arrow Circle Background',
                  defaultValue: 'bg-white',
                  validate: allowAnySelect,
                  admin: { width: '25%' },
                },
              }),
              textColorPickerAll({
                overrides: {
                  name: 'button2IconColor',
                  label: 'Vector Arrow Color',
                  defaultValue: 'text-[#0256FF]',
                  validate: allowAnySelect,
                  admin: { width: '25%' },
                },
              }),
              {
                name: 'button2FontSize',
                type: 'select',
                label: 'Button 2 Font Size',
                defaultValue: 'text-sm md:text-base',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'button2FontWeight',
                type: 'select',
                label: 'Button 2 Font Weight',
                defaultValue: 'font-semibold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
            ],
          },
        ],
      },

      // ── Mode B: Offices / Locations Strip ──
      {
        name: 'officesGroup',
        type: 'group',
        label: 'Offices / Locations Settings',
        admin: {
          condition: (_, s) => s?.bottomContentMode === 'offices',
        },
        fields: [
          {
            name: 'officesHeading',
            type: 'text',
            label: 'Offices Heading',
            defaultValue: 'Our offices around the world',
            admin: {
              description: 'Small title above office items. Supports inline styling. Leave blank to hide.',
            },
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'officesHeadingColor',
                  label: 'Offices Heading Color',
                  defaultValue: 'text-[#0256FF]',
                  validate: allowAnySelect,
                  admin: { width: '25%' },
                },
              }),
              {
                name: 'officesHeadingFontSize',
                type: 'select',
                label: 'Offices Heading Font Size',
                defaultValue: 'text-base md:text-lg',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'officesHeadingFontWeight',
                type: 'select',
                label: 'Offices Heading Font Weight',
                defaultValue: 'font-bold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'officesHeadingMarginBottom',
                type: 'select',
                label: 'Heading Margin Bottom',
                defaultValue: 'mb-4',
                validate: allowAnySelect,
                options: [
                  { label: 'Small (mb-2)', value: 'mb-2' },
                  { label: 'Medium (mb-4 - Default)', value: 'mb-4' },
                  { label: 'Large (mb-6)', value: 'mb-6' },
                ],
                admin: { width: '25%' },
              },
            ],
          },
          {
            name: 'officeItems',
            type: 'array',
            label: 'Office Items (Max 3 Per Row)',
            defaultValue: [
              { label: 'London' },
              { label: 'Lagos' },
              { label: 'Nairobi' },
            ],
            fields: [
              {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
                label: 'Flag / Location Avatar Image',
                admin: {
                  description: 'Circular flag or avatar icon.',
                },
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'label',
                    type: 'text',
                    label: 'Location Name (e.g. London)',
                    defaultValue: 'London',
                    admin: { width: '25%' },
                  },
                  textColorPickerAll({
                    overrides: {
                      name: 'labelColor',
                      label: 'Label Color',
                      defaultValue: 'text-gray-950',
                      validate: allowAnySelect,
                      admin: { width: '25%' },
                    },
                  }),
                  {
                    name: 'labelFontSize',
                    type: 'select',
                    label: 'Label Font Size',
                    defaultValue: 'text-xs md:text-sm',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'labelFontWeight',
                    type: 'select',
                    label: 'Label Font Weight',
                    defaultValue: 'font-semibold',
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
    ],
  },

  // ─── 4. Right Column Content ──────────────────────────────────────────────
  {
    name: 'rightColumn',
    type: 'group',
    label: 'Right Column Content',
    fields: [
      {
        name: 'subHeading',
        type: 'text',
        label: 'Right Column Sub-Heading (Optional)',
        admin: {
          description: 'Optional sub-heading above description. Supports inline styling. Leave blank to hide.',
        },
      },
      {
        type: 'row',
        admin: {
          condition: (_, s) => Boolean(s?.subHeading),
        },
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'subHeadingColor',
              label: 'Sub-Heading Color',
              defaultValue: 'text-white',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          {
            name: 'subHeadingFontSize',
            type: 'select',
            label: 'Sub-Heading Font Size',
            defaultValue: 'text-lg md:text-xl',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'subHeadingFontWeight',
            type: 'select',
            label: 'Sub-Heading Font Weight',
            defaultValue: 'font-semibold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
          {
            name: 'subHeadingMarginBottom',
            type: 'select',
            label: 'Sub-Heading Margin Bottom',
            defaultValue: 'mb-2 md:mb-3',
            validate: allowAnySelect,
            options: [
              { label: 'None (0)', value: 'mb-0' },
              { label: 'Small (mb-2 md:mb-3)', value: 'mb-2 md:mb-3' },
              { label: 'Large (mb-4)', value: 'mb-4' },
            ],
            admin: { width: '25%' },
          },
        ],
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Right Column Description',
        defaultValue:
          'A technology-first group connecting finance, commerce, media and digital innovation to create meaningful opportunities for people and businesses.',
        admin: {
          description:
            'Right column description text. Supports inline styling. Leave blank to hide.',
        },
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'descriptionColor',
              label: 'Description Color',
              defaultValue: 'text-white',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          {
            name: 'descriptionFontSize',
            type: 'select',
            label: 'Description Font Size',
            defaultValue: 'text-base md:text-lg',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'descriptionFontWeight',
            type: 'select',
            label: 'Description Font Weight',
            defaultValue: 'font-normal',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
          {
            name: 'descriptionMarginBottom',
            type: 'select',
            label: 'Description Margin Bottom',
            defaultValue: 'mb-6 md:mb-8',
            validate: allowAnySelect,
            options: [
              { label: 'Small (mb-4)', value: 'mb-4' },
              { label: 'Medium (mb-6 md:mb-8 - Default)', value: 'mb-6 md:mb-8' },
              { label: 'Large (mb-10)', value: 'mb-10' },
            ],
            admin: { width: '25%' },
          },
        ],
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Right Column Image / Graphic',
        admin: {
          description:
            'Upload the abstract glowing wave graphic (Mockup 1) or dotted world map (Mockup 2). Optional.',
        },
      },
      {
        type: 'row',
        fields: [
          {
            name: 'imageRadius',
            type: 'select',
            label: 'Image Corner Radius',
            defaultValue: 'rounded-2xl',
            validate: allowAnySelect,
            options: [
              { label: 'None (Square)', value: 'rounded-none' },
              { label: 'Small (rounded-lg)', value: 'rounded-lg' },
              { label: 'Medium (rounded-xl)', value: 'rounded-xl' },
              { label: 'Large (rounded-2xl - Default)', value: 'rounded-2xl' },
              { label: 'Extra Large (rounded-3xl)', value: 'rounded-3xl' },
            ],
            admin: { width: '50%' },
          },
          {
            name: 'imageFit',
            type: 'select',
            label: 'Image Object Fit',
            defaultValue: 'object-cover',
            validate: allowAnySelect,
            options: [
              { label: 'Cover (Fill container)', value: 'object-cover' },
              { label: 'Contain (Show full image)', value: 'object-contain' },
            ],
            admin: { width: '50%' },
          },
        ],
      },
    ],
  },

  // ─── 5. Divider / HR Line Settings ────────────────────────────────────────
  {
    name: 'dividerSettings',
    type: 'group',
    label: 'Divider / HR Line Settings',
    fields: [
      {
        name: 'enableDivider',
        type: 'checkbox',
        label: 'Enable Divider Line',
        defaultValue: true,
      },
      {
        type: 'row',
        admin: {
          condition: (_, s) => Boolean(s?.enableDivider),
        },
        fields: [
          {
            name: 'dividerLayout',
            type: 'select',
            label: 'Divider Layout Mode',
            defaultValue: 'full',
            validate: allowAnySelect,
            options: [
              { label: 'Full Width (Spans entire container - Default)', value: 'full' },
              { label: 'Split (2 separate lines: Left Col & Right Col)', value: 'split' },
            ],
            admin: { width: '50%' },
          },
          {
            name: 'dividerColor',
            type: 'select',
            label: 'Divider Color',
            defaultValue: 'border-white/20',
            validate: allowAnySelect,
            options: [
              { label: 'White Low Opacity (border-white/20 - Default)', value: 'border-white/20' },
              { label: 'White Medium Opacity (border-white/40)', value: 'border-white/40' },
              { label: 'Light Gray (border-gray-200)', value: 'border-gray-200' },
              { label: 'Soft Blue Gray (#EFF1F8 border)', value: 'border-[#EFF1F8]' },
              { label: 'Dark Slate (border-slate-800)', value: 'border-slate-800' },
            ],
            admin: { width: '50%' },
          },
        ],
      },
      {
        type: 'row',
        admin: {
          condition: (_, s) => Boolean(s?.enableDivider),
        },
        fields: [
          {
            name: 'dividerSpacingTop',
            type: 'select',
            label: 'Spacing Above Divider',
            defaultValue: 'mt-12 md:mt-16',
            validate: allowAnySelect,
            options: [
              { label: 'Small (mt-8)', value: 'mt-8' },
              { label: 'Medium (mt-12 md:mt-16 - Default)', value: 'mt-12 md:mt-16' },
              { label: 'Large (mt-16 md:mt-20)', value: 'mt-16 md:mt-20' },
              { label: 'Extra Large (mt-20 md:mt-28)', value: 'mt-20 md:mt-28' },
            ],
            admin: { width: '50%' },
          },
          {
            name: 'dividerSpacingBottom',
            type: 'select',
            label: 'Spacing Below Divider',
            defaultValue: 'mb-12 md:mb-16',
            validate: allowAnySelect,
            options: [
              { label: 'Small (mb-8)', value: 'mb-8' },
              { label: 'Medium (mb-12 md:mb-16 - Default)', value: 'mb-12 md:mb-16' },
              { label: 'Large (mb-16 md:mb-20)', value: 'mb-16 md:mb-20' },
              { label: 'Extra Large (mb-20 md:mb-28)', value: 'mb-20 md:mb-28' },
            ],
            admin: { width: '50%' },
          },
        ],
      },
    ],
  },

  // ─── 6. Stat Items Section (Below HR Line, Mockup 2) ──────────────────────
  {
    name: 'statsGroup',
    type: 'group',
    label: 'Stat Items Settings (Below Divider)',
    fields: [
      {
        name: 'enableStats',
        type: 'checkbox',
        label: 'Enable Stat Items Section',
        defaultValue: false,
        admin: {
          description:
            'Toggles the bottom stat counter row (e.g. 04 Core industry pillars, UK Group base). Default off.',
        },
      },
      {
        name: 'stats',
        type: 'array',
        label: 'Stat Items',
        defaultValue: [
          { statValue: '04', statLabel: 'Core industry pillars' },
          { statValue: 'UK', statLabel: 'Group base' },
          { statValue: 'EU + AF', statLabel: 'Markets of focus' },
          { statValue: '316', statLabel: 'One connected group' },
        ],
        admin: {
          condition: (_, s) => Boolean(s?.enableStats),
        },
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'statValue',
                type: 'text',
                label: 'Stat Value / Number (e.g. "04")',
                defaultValue: '04',
                admin: { width: '50%' },
              },
              {
                name: 'statLabel',
                type: 'text',
                label: 'Stat Label (e.g. "Core industry pillars")',
                defaultValue: 'Core industry pillars',
                admin: { width: '50%' },
              },
            ],
          },
        ],
      },
      {
        type: 'row',
        admin: {
          condition: (_, s) => Boolean(s?.enableStats),
        },
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'statValueColor',
              label: 'Stat Value Color',
              defaultValue: 'text-gray-950',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          {
            name: 'statValueFontSize',
            type: 'select',
            label: 'Stat Value Font Size',
            defaultValue: 'text-4xl md:text-5xl lg:text-6xl',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          textColorPickerAll({
            overrides: {
              name: 'statLabelColor',
              label: 'Stat Label Color',
              defaultValue: 'text-gray-700',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          {
            name: 'statLabelFontSize',
            type: 'select',
            label: 'Stat Label Font Size',
            defaultValue: 'text-sm md:text-base',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
        ],
      },
    ],
  },
]

export const WhoWeAre: Block = {
  slug: 'whoWeAre',
  labels: {
    singular: 'Who We Are',
    plural: 'Who We Are Blocks',
  },
  fields: whoWeAreFields,
}
