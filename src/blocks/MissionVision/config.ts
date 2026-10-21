import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const allowAnySelect = (() => true as const) as any

const marginBottomOptions = [
  { label: 'None (0px) - mb-0', value: 'mb-0' },
  { label: 'Extra Small (8px) - mb-2', value: 'mb-2' },
  { label: 'Small (12px) - mb-3', value: 'mb-3' },
  { label: 'Medium-Sm (16px) - mb-4', value: 'mb-4' },
  { label: 'Medium (20px) - mb-5', value: 'mb-5' },
  { label: 'Medium-Lg (24px) - mb-6', value: 'mb-6' },
  { label: 'Large (32px) - mb-8', value: 'mb-8' },
  { label: 'Extra Large (40px) - mb-10', value: 'mb-10' },
]

export const getMissionVisionFields = ({
  isColumn = false,
}: { isColumn?: boolean } = {}): Field[] => [
  // ─── 1. Background & Top Spacing ──────────────────────────────────────────
  {
    type: 'row',
    fields: [
      bgColorPickerAll({
        overrides: {
          name: 'sectionBgColor',
          label: isColumn ? 'Content Background Color' : 'Section Background Color',
          defaultValue: isColumn ? 'bg-transparent' : 'bg-[#0256FF]',
          validate: allowAnySelect,
          admin: {
            width: '50%',
            description: isColumn
              ? 'Defaults to "Transparent" to use parent column background.'
              : 'Choose background color for this section (Default: Brand Blue).',
          },
        },
      }),
      {
        name: 'spacingAboveItems',
        type: 'select',
        label: 'Spacing Above Items',
        defaultValue: 'pt-0',
        validate: allowAnySelect,
        options: [
          { label: 'None (0px) - pt-0 (Default)', value: 'pt-0' },
          { label: 'Extra Small (16px) - pt-4', value: 'pt-4' },
          { label: 'Small (24px) - pt-6', value: 'pt-6' },
          { label: 'Small-Med (32px) - pt-8', value: 'pt-8' },
          { label: 'Medium (48px) - pt-12', value: 'pt-12' },
          { label: 'Large (64px) - pt-16', value: 'pt-16' },
          { label: 'Extra Large (80px) - pt-20', value: 'pt-20' },
          { label: 'Massive (112px) - pt-28', value: 'pt-28' },
        ],
        admin: {
          width: '50%',
          description: 'Modify spacing at the top before items show up.',
        },
      },
    ],
  },

  // ─── 2. Section Padding Controls (Desktop & Mobile) ────────────────────────
  {
    type: 'collapsible',
    label: 'Section Padding Settings (Desktop & Mobile)',
    admin: {
      initCollapsed: true,
    },
    fields: [
      {
        name: 'paddingMode',
        type: 'select',
        label: 'Padding Mode',
        defaultValue: isColumn ? 'none' : 'default',
        validate: allowAnySelect,
        options: [
          { label: 'Default Container Padding', value: 'default' },
          { label: 'Custom Padding (Desktop & Mobile)', value: 'custom' },
          { label: 'No Padding (Edge to edge)', value: 'none' },
        ],
      },
      {
        type: 'row',
        admin: {
          condition: (_, s) => s?.paddingMode === 'custom',
        },
        fields: [
          {
            name: 'paddingTopDesktop',
            type: 'text',
            label: 'Padding Top Desktop (e.g. 60px)',
            defaultValue: '60px',
            admin: { width: '25%' },
          },
          {
            name: 'paddingBottomDesktop',
            type: 'text',
            label: 'Padding Bottom Desktop (e.g. 60px)',
            defaultValue: '60px',
            admin: { width: '25%' },
          },
          {
            name: 'paddingLeftDesktop',
            type: 'text',
            label: 'Padding Left Desktop (e.g. 48px)',
            defaultValue: '48px',
            admin: { width: '25%' },
          },
          {
            name: 'paddingRightDesktop',
            type: 'text',
            label: 'Padding Right Desktop (e.g. 48px)',
            defaultValue: '48px',
            admin: { width: '25%' },
          },
        ],
      },
      {
        type: 'row',
        admin: {
          condition: (_, s) => s?.paddingMode === 'custom',
        },
        fields: [
          {
            name: 'paddingTopMobile',
            type: 'text',
            label: 'Padding Top Mobile (e.g. 32px)',
            defaultValue: '32px',
            admin: { width: '25%' },
          },
          {
            name: 'paddingBottomMobile',
            type: 'text',
            label: 'Padding Bottom Mobile (e.g. 32px)',
            defaultValue: '32px',
            admin: { width: '25%' },
          },
          {
            name: 'paddingLeftMobile',
            type: 'text',
            label: 'Padding Left Mobile (e.g. 20px)',
            defaultValue: '20px',
            admin: { width: '25%' },
          },
          {
            name: 'paddingRightMobile',
            type: 'text',
            label: 'Padding Right Mobile (e.g. 20px)',
            defaultValue: '20px',
            admin: { width: '25%' },
          },
        ],
      },
    ],
  },

  // ─── 3. Items Array (Max 2 Columns per Row) ────────────────────────────────
  {
    name: 'items',
    type: 'array',
    label: 'Statements (Max 2 Columns Per Row)',
    labels: {
      singular: 'Statement Item',
      plural: 'Statement Items',
    },
    defaultValue: [
      {
        subHeading: 'Mission',
        subHeadingColor: 'text-[#00E5FF]',
        subHeadingFontSize: 'text-lg md:text-xl',
        subHeadingFontSizeMobile: 'text-base',
        subHeadingFontWeight: 'font-semibold',
        subHeadingFontWeightMobile: 'font-semibold',
        subHeadingMarginBottom: 'mb-4',
        heading: 'Make opportunity more accessible.',
        headingColor: 'text-white',
        headingFontSize: 'text-3xl md:text-4xl lg:text-5xl',
        headingFontSizeMobile: 'text-2xl',
        headingFontWeight: 'font-bold',
        headingFontWeightMobile: 'font-bold',
        headingMarginBottom: 'mb-6',
        description:
          'To develop connected products, services and infrastructure that help individuals manage everyday needs and enable businesses to operate, innovate and grow.',
        descriptionColor: 'text-white/90',
        descriptionFontSize: 'text-base md:text-lg',
        descriptionFontSizeMobile: 'text-sm',
        descriptionFontWeight: 'font-normal',
        descriptionFontWeightMobile: 'font-normal',
      },
      {
        subHeading: 'Vision',
        subHeadingColor: 'text-[#00E5FF]',
        subHeadingFontSize: 'text-lg md:text-xl',
        subHeadingFontSizeMobile: 'text-base',
        subHeadingFontWeight: 'font-semibold',
        subHeadingFontWeightMobile: 'font-semibold',
        subHeadingMarginBottom: 'mb-4',
        heading: 'Progress through connection.',
        headingColor: 'text-white',
        headingFontSize: 'text-3xl md:text-4xl lg:text-5xl',
        headingFontSizeMobile: 'text-2xl',
        headingFontWeight: 'font-bold',
        headingFontWeightMobile: 'font-bold',
        headingMarginBottom: 'mb-6',
        description:
          'To build an interconnected ecosystem where technology, commerce and creative expertise work together to unlock meaningful opportunities across markets.',
        descriptionColor: 'text-white/90',
        descriptionFontSize: 'text-base md:text-lg',
        descriptionFontSizeMobile: 'text-sm',
        descriptionFontWeight: 'font-normal',
        descriptionFontWeightMobile: 'font-normal',
      },
    ],
    fields: [
      // ─── Sub-Heading Settings ───
      {
        type: 'collapsible',
        label: 'Sub-Heading Settings (e.g. "Mission")',
        admin: { initCollapsed: false },
        fields: [
          {
            name: 'subHeading',
            type: 'text',
            label: 'Sub-Heading Text',
            defaultValue: 'Mission',
            admin: {
              description:
                'Supports inline HTML formatting (e.g. <span class="...">word</span> or <em>emphasis</em>).',
            },
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'subHeadingColor',
                  label: 'Sub-Heading Color',
                  defaultValue: 'text-[#00E5FF]',
                  validate: allowAnySelect,
                  admin: {
                    width: '50%',
                    description: 'Default is Vibrant Cyan (#00E5FF).',
                  },
                },
              }),
              {
                name: 'subHeadingMarginBottom',
                type: 'select',
                label: 'Sub-Heading Margin Bottom',
                defaultValue: 'mb-4',
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
                name: 'subHeadingFontSize',
                type: 'select',
                label: 'Desktop Font Size',
                defaultValue: 'text-lg md:text-xl',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'subHeadingFontWeight',
                type: 'select',
                label: 'Desktop Font Weight',
                defaultValue: 'font-semibold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'subHeadingFontSizeMobile',
                type: 'select',
                label: 'Mobile Font Size',
                defaultValue: 'text-base',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'subHeadingFontWeightMobile',
                type: 'select',
                label: 'Mobile Font Weight',
                defaultValue: 'font-semibold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
            ],
          },
        ],
      },

      // ─── Main Heading Settings ───
      {
        type: 'collapsible',
        label: 'Heading Settings (e.g. "Make opportunity more accessible.")',
        admin: { initCollapsed: false },
        fields: [
          {
            name: 'heading',
            type: 'text',
            label: 'Heading Text',
            defaultValue: 'Make opportunity more accessible.',
            admin: {
              description: 'Supports inline HTML formatting and line breaks.',
            },
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'headingColor',
                  label: 'Heading Color',
                  defaultValue: 'text-white',
                  validate: allowAnySelect,
                  admin: {
                    width: '50%',
                    description: 'Default is solid white.',
                  },
                },
              }),
              {
                name: 'headingMarginBottom',
                type: 'select',
                label: 'Heading Margin Bottom',
                defaultValue: 'mb-6',
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
                name: 'headingFontSize',
                type: 'select',
                label: 'Desktop Font Size',
                defaultValue: 'text-3xl md:text-4xl lg:text-5xl',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'headingFontWeight',
                type: 'select',
                label: 'Desktop Font Weight',
                defaultValue: 'font-bold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'headingFontSizeMobile',
                type: 'select',
                label: 'Mobile Font Size',
                defaultValue: 'text-2xl',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'headingFontWeightMobile',
                type: 'select',
                label: 'Mobile Font Weight',
                defaultValue: 'font-bold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
            ],
          },
        ],
      },

      // ─── Description Settings ───
      {
        type: 'collapsible',
        label: 'Description Settings',
        admin: { initCollapsed: false },
        fields: [
          {
            name: 'description',
            type: 'textarea',
            label: 'Description Text',
            defaultValue:
              'To develop connected products, services and infrastructure that help individuals manage everyday needs and enable businesses to operate, innovate and grow.',
            admin: {
              description: 'Supports inline HTML formatting and custom styling.',
            },
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'descriptionColor',
                  label: 'Description Color',
                  defaultValue: 'text-white/90',
                  validate: allowAnySelect,
                  admin: { width: '50%' },
                },
              }),
              {
                name: 'descriptionMarginBottom',
                type: 'select',
                label: 'Description Margin Bottom',
                defaultValue: 'mb-0',
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
                name: 'descriptionFontSize',
                type: 'select',
                label: 'Desktop Font Size',
                defaultValue: 'text-base md:text-lg',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'descriptionFontWeight',
                type: 'select',
                label: 'Desktop Font Weight',
                defaultValue: 'font-normal',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'descriptionFontSizeMobile',
                type: 'select',
                label: 'Mobile Font Size',
                defaultValue: 'text-sm',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'descriptionFontWeightMobile',
                type: 'select',
                label: 'Mobile Font Weight',
                defaultValue: 'font-normal',
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
]

export const missionVisionFields: Field[] = getMissionVisionFields({ isColumn: false })
export const missionVisionColumnFields: Field[] = getMissionVisionFields({ isColumn: true })

export const MissionVision: Block = {
  slug: 'missionVision',
  interfaceName: 'MissionVisionBlock',
  labels: {
    singular: 'Mission & Vision',
    plural: 'Mission & Vision Blocks',
  },
  fields: missionVisionFields,
}
