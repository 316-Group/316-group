import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const allowAnySelect = (() => true as const) as any

export const splitTextFields: Field[] = [
  // ─── Section Background & Spacing ──────────────────────────────────────────
  {
    type: 'row',
    fields: [
      bgColorPickerAll({
        overrides: {
          name: 'sectionBgColor',
          label: 'Background Color',
          defaultValue: 'bg-transparent',
          validate: allowAnySelect,
          admin: { width: '33.33%' },
        },
      }),
      {
        name: 'paddingTop',
        type: 'select',
        label: 'Padding Top',
        defaultValue: 'pt-8',
        validate: allowAnySelect,
        options: [
          { label: 'None (0)', value: 'pt-0' },
          { label: 'Extra Small (pt-4)', value: 'pt-4' },
          { label: 'Small (pt-8)', value: 'pt-8' },
          { label: 'Medium (pt-12)', value: 'pt-12' },
          { label: 'Standard (pt-16)', value: 'pt-16' },
          { label: 'Large (pt-20)', value: 'pt-20' },
        ],
        admin: { width: '33.33%' },
      },
      {
        name: 'paddingBottom',
        type: 'select',
        label: 'Padding Bottom',
        defaultValue: 'pb-8',
        validate: allowAnySelect,
        options: [
          { label: 'None (0)', value: 'pb-0' },
          { label: 'Extra Small (pb-4)', value: 'pb-4' },
          { label: 'Small (pb-8)', value: 'pb-8' },
          { label: 'Medium (pb-12)', value: 'pb-12' },
          { label: 'Standard (pb-16)', value: 'pb-16' },
          { label: 'Large (pb-20)', value: 'pb-20' },
        ],
        admin: { width: '33.33%' },
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
          { label: 'Default Padding (Matches Mockup Margins)', value: 'default' },
          { label: 'No Padding / Full Column Width (0px)', value: 'none' },
          { label: 'Custom Horizontal Padding', value: 'custom' },
        ],
        admin: {
          width: '33.33%',
          description: 'Set to "No Padding" to let this split text block occupy the full width of the column.',
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
          { label: '16px (Default)', value: '16px' },
          { label: '24px', value: '24px' },
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
        label: 'Custom Mobile Padding (e.g. 12px)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.paddingXMobile === 'custom',
        },
      },
    ],
  },

  // ─── Left Column (Badge + Spacing + Heading) ──────────────────────────────
  {
    name: 'leftColumn',
    type: 'group',
    label: 'Left Column (Badge & Heading)',
    fields: [
      // Badge
      {
        name: 'badgeGroup',
        type: 'group',
        label: 'Top Badge (e.g. Who we work with)',
        fields: [
          {
            name: 'text',
            type: 'text',
            label: 'Badge Text (leave empty to hide badge completely)',
            defaultValue: 'Who we work with',
          },
          {
            type: 'row',
            fields: [
              bgColorPickerAll({
                overrides: {
                  name: 'bgColor',
                  label: 'Badge Background Color',
                  defaultValue: 'bg-[#EFF1F8]',
                  validate: allowAnySelect,
                  admin: { width: '50%' },
                },
              }),
              textColorPickerAll({
                overrides: {
                  name: 'textColor',
                  label: 'Badge Text Color',
                  defaultValue: 'text-[#3F5AC9]',
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
                name: 'fontSize',
                type: 'select',
                label: 'Font Size',
                defaultValue: 'text-sm',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '50%' },
              },
              {
                name: 'fontWeight',
                type: 'select',
                label: 'Font Weight',
                defaultValue: 'font-medium',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '50%' },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'fontSizeMobile',
                type: 'select',
                label: 'Badge Font Size (Mobile < 768px)',
                defaultValue: '',
                validate: allowAnySelect,
                options: [
                  { label: 'Inherit / Auto Responsive', value: '' },
                  ...fontSizeOptions,
                ],
                admin: { width: '50%' },
              },
              {
                name: 'fontWeightMobile',
                type: 'select',
                label: 'Badge Font Weight (Mobile < 768px)',
                defaultValue: '',
                validate: allowAnySelect,
                options: [
                  { label: 'Inherit / Default', value: '' },
                  ...fontWeightOptions,
                ],
                admin: { width: '50%' },
              },
            ],
          },
        ],
      },

      // Spacing before heading
      {
        type: 'row',
        fields: [
          {
            name: 'spacingBeforeHeading',
            type: 'select',
            label: 'Spacing Before Heading',
            defaultValue: '16px',
            validate: allowAnySelect,
            options: [
              { label: '0px (No Spacing)', value: '0px' },
              { label: '8px', value: '8px' },
              { label: '12px', value: '12px' },
              { label: '16px (Default)', value: '16px' },
              { label: '20px', value: '20px' },
              { label: '24px', value: '24px' },
              { label: '32px', value: '32px' },
              { label: 'Custom (px)', value: 'custom' },
            ],
            admin: {
              width: '50%',
              description: 'Spacing between top badge and heading below it. Choose 0px to remove.',
            },
          },
          {
            name: 'spacingBeforeHeadingCustom',
            type: 'text',
            label: 'Custom Spacing (e.g. 18px)',
            admin: {
              width: '50%',
              condition: (_, siblingData) => siblingData?.spacingBeforeHeading === 'custom',
            },
          },
        ],
      },

      // Heading
      {
        name: 'headingGroup',
        type: 'group',
        label: 'Heading',
        fields: [
          {
            name: 'text',
            type: 'text',
            label: 'Heading Text (supports inline HTML & style attributes)',
            defaultValue: 'Built for enterprises, institutions, and consumers.',
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'color',
                  label: 'Heading Color',
                  defaultValue: 'text-gray-950',
                  validate: allowAnySelect,
                  admin: { width: '33.33%' },
                },
              }),
              {
                name: 'fontSize',
                type: 'select',
                label: 'Font Size',
                defaultValue: 'text-3xl md:text-4xl lg:text-5xl',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '33.33%' },
              },
              {
                name: 'fontWeight',
                type: 'select',
                label: 'Font Weight',
                defaultValue: 'font-semibold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '33.33%' },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'fontSizeMobile',
                type: 'select',
                label: 'Heading Font Size (Mobile < 768px)',
                defaultValue: '',
                validate: allowAnySelect,
                options: [
                  { label: 'Inherit / Auto Responsive', value: '' },
                  ...fontSizeOptions,
                ],
                admin: { width: '50%' },
              },
              {
                name: 'fontWeightMobile',
                type: 'select',
                label: 'Heading Font Weight (Mobile < 768px)',
                defaultValue: '',
                validate: allowAnySelect,
                options: [
                  { label: 'Inherit / Default', value: '' },
                  ...fontWeightOptions,
                ],
                admin: { width: '50%' },
              },
            ],
          },
          {
            name: 'tag',
            type: 'select',
            label: 'HTML Tag',
            defaultValue: 'h2',
            validate: allowAnySelect,
            options: [
              { label: 'H1', value: 'h1' },
              { label: 'H2 (Default)', value: 'h2' },
              { label: 'H3', value: 'h3' },
              { label: 'Div', value: 'div' },
            ],
          },
        ],
      },
    ],
  },

  // ─── Right Column (Description Aligned Horizontally with Heading) ─────────
  {
    name: 'rightColumn',
    type: 'group',
    label: 'Right Column (Description Text)',
    fields: [
      {
        name: 'text',
        type: 'textarea',
        label: 'Description Text (supports inline HTML & styles)',
        defaultValue:
          'From global organizations needing robust cross-border financial systems to individuals looking for seamless money management, 316 Group powers transformative financial technology.',
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'color',
              label: 'Text Color',
              defaultValue: 'text-gray-600',
              validate: allowAnySelect,
              admin: { width: '33.33%' },
            },
          }),
          {
            name: 'fontSize',
            type: 'select',
            label: 'Font Size',
            defaultValue: 'text-base md:text-lg',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '33.33%' },
          },
          {
            name: 'fontWeight',
            type: 'select',
            label: 'Font Weight',
            defaultValue: 'font-normal',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '33.33%' },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'fontSizeMobile',
            type: 'select',
            label: 'Description Font Size (Mobile < 768px)',
            defaultValue: '',
            validate: allowAnySelect,
            options: [
              { label: 'Inherit / Auto Responsive', value: '' },
              ...fontSizeOptions,
            ],
            admin: { width: '50%' },
          },
          {
            name: 'fontWeightMobile',
            type: 'select',
            label: 'Description Font Weight (Mobile < 768px)',
            defaultValue: '',
            validate: allowAnySelect,
            options: [
              { label: 'Inherit / Default', value: '' },
              ...fontWeightOptions,
            ],
            admin: { width: '50%' },
          },
        ],
      },
    ],
  },
]

export const SplitText: Block = {
  slug: 'splitText',
  interfaceName: 'SplitTextBlock',
  fields: splitTextFields,
}
