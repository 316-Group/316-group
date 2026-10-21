import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const allowAnySelect = (() => true as const) as any

export const getNumberedGridFields = ({ isColumn = false }: { isColumn?: boolean } = {}): Field[] => [
  // ─── 1. Section Spacing & Background ─────────────────────────────────────
  {
    type: 'row',
    fields: [
      bgColorPickerAll({
        overrides: {
          name: 'sectionBgColor',
          label: isColumn ? 'Content Background Color' : 'Section Background Color',
          defaultValue: isColumn ? 'bg-transparent' : 'bg-white',
          validate: allowAnySelect,
          admin: {
            width: '33.33%',
            description: isColumn
              ? 'Defaults to "Transparent" so it automatically uses the Column Background Color.'
              : 'Choose background color for this section.',
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

  // ─── 3. Global Item Typography & Styling ──────────────────────────────────
  {
    name: 'styling',
    type: 'group',
    label: 'Global Item Typography & Colors',
    fields: [
      // Number / Heading Styling
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'numberColor',
              label: 'Number Color',
              defaultValue: 'text-[#0256FF]',
              validate: allowAnySelect,
              admin: { width: '20%' },
            },
          }),
          {
            name: 'numberFontSize',
            type: 'select',
            label: 'Number Font Size (Desktop)',
            defaultValue: 'text-5xl md:text-6xl lg:text-7xl',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '20%' },
          },
          {
            name: 'numberFontSizeMobile',
            type: 'select',
            label: 'Number Font Size (Mobile)',
            defaultValue: 'text-4xl',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '20%' },
          },
          {
            name: 'numberFontWeight',
            type: 'select',
            label: 'Number Font Weight (Desktop)',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '20%' },
          },
          {
            name: 'numberFontWeightMobile',
            type: 'select',
            label: 'Number Font Weight (Mobile)',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '20%' },
          },
        ],
      },
      {
        name: 'numberMarginBottom',
        type: 'select',
        label: 'Number Margin Bottom',
        defaultValue: 'mb-3 md:mb-4',
        validate: allowAnySelect,
        options: [
          { label: 'None (0)', value: 'mb-0' },
          { label: 'Tight (mb-2)', value: 'mb-2' },
          { label: 'Medium (mb-3 md:mb-4 - Default)', value: 'mb-3 md:mb-4' },
          { label: 'Large (mb-5 md:mb-6)', value: 'mb-5 md:mb-6' },
        ],
      },
      // Sub-Heading Styling
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'subHeadingColor',
              label: 'Sub-Heading Color',
              defaultValue: 'text-gray-950',
              validate: allowAnySelect,
              admin: { width: '20%' },
            },
          }),
          {
            name: 'subHeadingFontSize',
            type: 'select',
            label: 'Sub-Heading Font Size (Desktop)',
            defaultValue: 'text-xl md:text-2xl',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '20%' },
          },
          {
            name: 'subHeadingFontSizeMobile',
            type: 'select',
            label: 'Sub-Heading Font Size (Mobile)',
            defaultValue: 'text-lg',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '20%' },
          },
          {
            name: 'subHeadingFontWeight',
            type: 'select',
            label: 'Sub-Heading Font Weight (Desktop)',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '20%' },
          },
          {
            name: 'subHeadingFontWeightMobile',
            type: 'select',
            label: 'Sub-Heading Font Weight (Mobile)',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '20%' },
          },
        ],
      },
      {
        name: 'subHeadingMarginBottom',
        type: 'select',
        label: 'Sub-Heading Margin Bottom',
        defaultValue: 'mb-3 md:mb-4',
        validate: allowAnySelect,
        options: [
          { label: 'None (0)', value: 'mb-0' },
          { label: 'Tight (mb-2)', value: 'mb-2' },
          { label: 'Medium (mb-3 md:mb-4 - Default)', value: 'mb-3 md:mb-4' },
          { label: 'Large (mb-5 md:mb-6)', value: 'mb-5 md:mb-6' },
        ],
      },
      // Description Styling
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'descriptionColor',
              label: 'Description Color',
              defaultValue: 'text-gray-600',
              validate: allowAnySelect,
              admin: { width: '20%' },
            },
          }),
          {
            name: 'descriptionFontSize',
            type: 'select',
            label: 'Description Font Size (Desktop)',
            defaultValue: 'text-sm md:text-base',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '20%' },
          },
          {
            name: 'descriptionFontSizeMobile',
            type: 'select',
            label: 'Description Font Size (Mobile)',
            defaultValue: 'text-sm',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '20%' },
          },
          {
            name: 'descriptionFontWeight',
            type: 'select',
            label: 'Description Font Weight (Desktop)',
            defaultValue: 'font-normal',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '20%' },
          },
          {
            name: 'descriptionFontWeightMobile',
            type: 'select',
            label: 'Description Font Weight (Mobile)',
            defaultValue: 'font-normal',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '20%' },
          },
        ],
      },
    ],
  },

  // ─── 4. Numbered Items Array (3 per row on desktop) ──────────────────────
  {
    name: 'items',
    type: 'array',
    label: 'Numbered Grid Items (3 Per Row on Desktop)',
    defaultValue: [
      {
        number: '1',
        subHeading: 'Built around real customer needs',
        description:
          'We start with the people and businesses we serve, listening closely to their challenges and creating practical solutions that make everyday experiences simpler and more effective.',
      },
      {
        number: '2',
        subHeading: 'One connected ecosystem',
        description:
          'Our businesses bring finance, commerce, media and technology together, making it easier to access complementary capabilities and discover new opportunities through one group.',
      },
      {
        number: '3',
        subHeading: 'Global outlook, local understanding',
        description:
          'With a focus on opportunities across Europe and Africa, we combine an international perspective with an understanding of the different markets and communities we aim to support.',
      },
      {
        number: '4',
        subHeading: 'Practical expertise across industries',
        description:
          'Our specialist teams connect product thinking, operational experience and technical delivery to help organisations move from promising ideas to solutions that work in the real world.',
      },
      {
        number: '5',
        subHeading: 'Ambition to keep evolving',
        description:
          'We embrace changing needs and emerging technologies, continually exploring better ways to build, collaborate and create lasting value for the people who rely on our products and services.',
      },
      {
        number: '6',
        subHeading: 'Partnerships built for the long term',
        description:
          'We believe meaningful progress comes from trust, integrity and shared ambition. That is why we focus on relationships that create sustainable value, not simply short-term transactions.',
      },
    ],
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'number',
            type: 'text',
            label: 'Number / Heading (e.g. "1")',
            defaultValue: '1',
            admin: {
              width: '33.33%',
              description: 'Large digit or prefix. Leave blank to hide.',
            },
          },
          textColorPickerAll({
            overrides: {
              name: 'customNumberColor',
              label: 'Custom Number Color (Optional override)',
              validate: allowAnySelect,
              admin: {
                width: '33.33%',
                description: 'Override global number color for this specific item.',
              },
            },
          }),
          {
            name: 'subHeading',
            type: 'text',
            label: 'Sub-Heading / Title',
            defaultValue: 'Built around real customer needs',
            admin: {
              width: '33.33%',
              description: 'Bold title below the number. Supports inline HTML/CSS.',
            },
          },
        ],
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Description Text',
        defaultValue:
          'We start with the people and businesses we serve, listening closely to their challenges and creating practical solutions that make everyday experiences simpler and more effective.',
        admin: {
          description: 'Description paragraph. Supports inline HTML/CSS. Leave blank to hide.',
        },
      },
    ],
  },
]

export const numberedGridFields: Field[] = getNumberedGridFields({ isColumn: false })
export const numberedGridColumnFields: Field[] = getNumberedGridFields({ isColumn: true })

export const NumberedGrid: Block = {
  slug: 'numberedGrid',
  labels: {
    singular: 'Numbered Grid',
    plural: 'Numbered Grid Blocks',
  },
  fields: numberedGridFields,
}
