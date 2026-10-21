import { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { link } from '@/fields/link'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const allowAnySelect = (() => true as const) as any

const alignmentOptions = [
  { label: 'Center (Default)', value: 'center' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
  { label: 'Justified', value: 'justify' },
]

const marginBottomOptions = [
  { label: 'None (0px)', value: 'mb-0' },
  { label: 'Tiny (4px)', value: 'mb-1' },
  { label: 'Extra Small (8px)', value: 'mb-2' },
  { label: 'Small (12px)', value: 'mb-3' },
  { label: 'Medium-Sm (16px)', value: 'mb-4' },
  { label: 'Medium (24px)', value: 'mb-6' },
  { label: 'Large (32px)', value: 'mb-8' },
  { label: 'Extra Large (40px)', value: 'mb-10' },
  { label: 'Huge (48px)', value: 'mb-12' },
  { label: 'Massive (64px)', value: 'mb-16' },
  { label: 'Gigantic (80px)', value: 'mb-20' },
]

export const getCenteredButtonFields = ({
  isColumn = false,
}: { isColumn?: boolean } = {}): Field[] => [
  // ─── 1. Alignment & Width Controls ───────────────────────────────────────
  {
    type: 'row',
    fields: [
      {
        name: 'alignment',
        type: 'select',
        label: 'Content Alignment',
        defaultValue: 'center',
        validate: allowAnySelect,
        options: alignmentOptions,
        admin: { width: '50%' },
      },
      {
        name: 'maxWidth',
        type: 'select',
        label: 'Max Container Width (Desktop & Tablet)',
        defaultValue: 'max-w-4xl',
        validate: allowAnySelect,
        options: [
          { label: 'Narrow (max-w-2xl)', value: 'max-w-2xl' },
          { label: 'Medium (max-w-3xl)', value: 'max-w-3xl' },
          { label: 'Standard (max-w-4xl - Default)', value: 'max-w-4xl' },
          { label: 'Wide (max-w-5xl)', value: 'max-w-5xl' },
          { label: 'Extra Wide (max-w-6xl)', value: 'max-w-6xl' },
          { label: '7XL (max-w-7xl)', value: 'max-w-7xl' },
          { label: 'Full Width', value: 'max-w-full' },
        ],
        admin: {
          width: '50%',
          description: 'Maximum width constraint for text content container.',
        },
      },
    ],
  },

  // ─── 2. Mobile View Width & Padding ───────────────────────────────────────
  {
    type: 'row',
    fields: [
      {
        name: 'mobileWidthMode',
        type: 'select',
        label: 'Mobile View Width Mode',
        defaultValue: 'default',
        validate: allowAnySelect,
        options: [
          { label: 'Default Mobile Container (Standard 16px Padding)', value: 'default' },
          { label: 'Full Width (0px Screen Bleed)', value: 'fullWidth' },
          { label: 'Custom Mobile Horizontal Padding', value: 'customPadding' },
        ],
        admin: {
          width: '50%',
          description:
            'Choose whether content on mobile takes standard margins, spans full edge-to-edge width, or uses custom padding.',
        },
      },
      {
        name: 'mobilePaddingX',
        type: 'select',
        label: 'Mobile Horizontal Padding',
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
          { label: '40px', value: '40px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: {
          width: '25%',
          condition: (_, siblingData) => siblingData?.mobileWidthMode === 'customPadding',
        },
      },
      {
        name: 'mobilePaddingXCustom',
        type: 'text',
        label: 'Custom Mobile Padding (e.g. 14px)',
        admin: {
          width: '25%',
          condition: (_, siblingData) =>
            siblingData?.mobileWidthMode === 'customPadding' &&
            siblingData?.mobilePaddingX === 'custom',
        },
      },
    ],
  },

  // ─── 3. Section Spacing & Background ─────────────────────────────────────
  {
    type: 'row',
    fields: [
      bgColorPickerAll({
        overrides: {
          name: 'sectionBgColor',
          label: isColumn ? 'Content Background Color' : 'Section Background Color',
          defaultValue: isColumn ? 'bg-transparent' : 'bg-transparent',
          validate: allowAnySelect,
          admin: {
            width: '33.33%',
            description:
              'Defaults to transparent so layout media/image backgrounds show through cleanly.',
          },
        },
      }),
      {
        name: 'paddingTop',
        type: 'select',
        label: 'Padding Top',
        defaultValue: isColumn ? 'pt-0' : 'pt-16',
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
        defaultValue: isColumn ? 'pb-0' : 'pb-16',
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

  // ─── 4. Pill Badge ───────────────────────────────────────────────────────
  {
    name: 'badge',
    type: 'group',
    label: 'Badge / Pill Tag',
    fields: [
      {
        name: 'enableBadge',
        type: 'checkbox',
        label: 'Enable Badge',
        defaultValue: true,
        admin: {
          description: 'If disabled, the badge is not shown and occupies zero vertical space.',
        },
      },
      {
        name: 'badgeText',
        type: 'text',
        label: 'Badge Text',
        defaultValue: 'Ready to grow?',
        admin: {
          condition: (_, siblingData) => siblingData?.enableBadge !== false,
          description: 'Text shown inside the pill badge.',
        },
      },
      {
        type: 'row',
        admin: {
          condition: (_, siblingData) => siblingData?.enableBadge !== false,
        },
        fields: [
          bgColorPickerAll({
            overrides: {
              name: 'badgeBgColor',
              label: 'Badge Background Color',
              defaultValue: 'bg-[#0256FF]',
              validate: allowAnySelect,
              admin: { width: '50%' },
            },
          }),
          textColorPickerAll({
            overrides: {
              name: 'badgeTextColor',
              label: 'Badge Text Color',
              defaultValue: 'text-white',
              validate: allowAnySelect,
              admin: { width: '50%' },
            },
          }),
        ],
      },
      {
        type: 'row',
        admin: {
          condition: (_, siblingData) => siblingData?.enableBadge !== false,
        },
        fields: [
          {
            name: 'badgeFontSize',
            type: 'select',
            label: 'Badge Font Size (Desktop)',
            defaultValue: 'text-sm',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontSizeOptions,
          },
          {
            name: 'badgeFontWeight',
            type: 'select',
            label: 'Badge Font Weight (Desktop)',
            defaultValue: 'font-medium',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontWeightOptions,
          },
          {
            name: 'badgeFontSizeMobile',
            type: 'select',
            label: 'Badge Font Size (Mobile)',
            defaultValue: 'text-xs',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontSizeOptions,
          },
          {
            name: 'badgeFontWeightMobile',
            type: 'select',
            label: 'Badge Font Weight (Mobile)',
            defaultValue: 'font-medium',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontWeightOptions,
          },
        ],
      },
      {
        name: 'badgeMarginBottom',
        type: 'select',
        label: 'Badge Margin Bottom',
        defaultValue: 'mb-8 md:mb-10',
        validate: allowAnySelect,
        admin: {
          condition: (_, siblingData) => siblingData?.enableBadge !== false,
        },
        options: [
          ...marginBottomOptions,
          {
            label: 'Spacious (mb-8 md:mb-10 - Default)',
            value: 'mb-8 md:mb-10',
          },
        ],
      },
    ],
  },

  // ─── 5. Heading ──────────────────────────────────────────────────────────
  {
    name: 'headingGroup',
    type: 'group',
    label: 'Heading (RichText with Inline HTML)',
    fields: [
      {
        name: 'heading',
        type: 'richText',
        label: 'Heading Text Content',
        admin: {
          description:
            'Display heading. Supports inline HTML like <br /> to break lines without showing raw tags.',
        },
        editor: lexicalEditor({
          features: ({ rootFeatures }) => [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ],
        }),
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'headingColor',
              label: 'Heading Text Color',
              defaultValue: 'text-white',
              validate: allowAnySelect,
              admin: { width: '50%' },
            },
          }),
          {
            name: 'headingMarginBottom',
            type: 'select',
            label: 'Heading Margin Bottom',
            defaultValue: 'mb-6',
            validate: allowAnySelect,
            admin: { width: '50%' },
            options: marginBottomOptions,
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'headingFontSize',
            type: 'select',
            label: 'Heading Font Size (Desktop)',
            defaultValue: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: [
              ...fontSizeOptions,
              {
                label: 'Display Large (text-3xl sm:text-4xl md:text-5xl lg:text-6xl)',
                value: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
              },
            ],
          },
          {
            name: 'headingFontWeight',
            type: 'select',
            label: 'Heading Font Weight (Desktop)',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontWeightOptions,
          },
          {
            name: 'headingFontSizeMobile',
            type: 'select',
            label: 'Heading Font Size (Mobile)',
            defaultValue: 'text-2xl sm:text-3xl',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: [
              ...fontSizeOptions,
              {
                label: 'Mobile Display (text-2xl sm:text-3xl)',
                value: 'text-2xl sm:text-3xl',
              },
            ],
          },
          {
            name: 'headingFontWeightMobile',
            type: 'select',
            label: 'Heading Font Weight (Mobile)',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontWeightOptions,
          },
        ],
      },
    ],
  },

  // ─── 6. Description ──────────────────────────────────────────────────────
  {
    name: 'descriptionGroup',
    type: 'group',
    label: 'Description (RichText with Inline HTML)',
    fields: [
      {
        name: 'description',
        type: 'richText',
        label: 'Description Content',
        admin: {
          description:
            'Centered description below the heading. Supports inline HTML and paragraph formatting.',
        },
        editor: lexicalEditor({
          features: ({ rootFeatures }) => [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ],
        }),
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'descriptionColor',
              label: 'Description Text Color',
              defaultValue: 'text-white/90',
              validate: allowAnySelect,
              admin: { width: '50%' },
            },
          }),
          {
            name: 'descriptionMarginBottom',
            type: 'select',
            label: 'Description Margin Bottom (Spacing to Button)',
            defaultValue: 'mb-8 md:mb-10',
            validate: allowAnySelect,
            admin: { width: '50%' },
            options: [
              ...marginBottomOptions,
              {
                label: 'Spacious (mb-8 md:mb-10 - Default)',
                value: 'mb-8 md:mb-10',
              },
            ],
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'descriptionFontSize',
            type: 'select',
            label: 'Description Font Size (Desktop)',
            defaultValue: 'text-base md:text-lg',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontSizeOptions,
          },
          {
            name: 'descriptionFontWeight',
            type: 'select',
            label: 'Description Font Weight (Desktop)',
            defaultValue: 'font-normal',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontWeightOptions,
          },
          {
            name: 'descriptionFontSizeMobile',
            type: 'select',
            label: 'Description Font Size (Mobile)',
            defaultValue: 'text-sm md:text-base',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontSizeOptions,
          },
          {
            name: 'descriptionFontWeightMobile',
            type: 'select',
            label: 'Description Font Weight (Mobile)',
            defaultValue: 'font-normal',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontWeightOptions,
          },
        ],
      },
    ],
  },

  // ─── 7. Action Button ────────────────────────────────────────────────────
  {
    name: 'buttonGroup',
    type: 'group',
    label: 'Action Button (Capsule with Circle Arrow)',
    fields: [
      {
        name: 'buttonText',
        type: 'text',
        label: 'Button Text',
        defaultValue: 'Talk to our experts',
        admin: {
          description:
            'Text shown on the capsule button. If left empty, the button will not render.',
        },
      },
      link({
        required: false,
        disableLabel: true,
        appearances: false,
        overrides: {
          name: 'buttonLink',
          label: 'Button Destination Link (Optional)',
          admin: {
            description:
              'Optional destination. If left blank, clicking the button remains on the current page.',
          },
        },
      }),
      {
        type: 'row',
        fields: [
          bgColorPickerAll({
            overrides: {
              name: 'buttonBgColor',
              label: 'Button Background Color',
              defaultValue: 'bg-white',
              validate: allowAnySelect,
              admin: { width: '50%' },
            },
          }),
          textColorPickerAll({
            overrides: {
              name: 'buttonTextColor',
              label: 'Button Text Color',
              defaultValue: 'text-[#0256FF]',
              validate: allowAnySelect,
              admin: { width: '50%' },
            },
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          bgColorPickerAll({
            overrides: {
              name: 'iconCircleBgColor',
              label: 'Arrow Circle Background Color',
              defaultValue: 'bg-[#0256FF]',
              validate: allowAnySelect,
              admin: { width: '50%' },
            },
          }),
          textColorPickerAll({
            overrides: {
              name: 'iconArrowColor',
              label: 'Arrow Icon Color',
              defaultValue: 'text-white',
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
            name: 'buttonFontSize',
            type: 'select',
            label: 'Button Font Size (Desktop)',
            defaultValue: 'text-sm md:text-base',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontSizeOptions,
          },
          {
            name: 'buttonFontWeight',
            type: 'select',
            label: 'Button Font Weight (Desktop)',
            defaultValue: 'font-semibold',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontWeightOptions,
          },
          {
            name: 'buttonFontSizeMobile',
            type: 'select',
            label: 'Button Font Size (Mobile)',
            defaultValue: 'text-xs md:text-sm',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontSizeOptions,
          },
          {
            name: 'buttonFontWeightMobile',
            type: 'select',
            label: 'Button Font Weight (Mobile)',
            defaultValue: 'font-semibold',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontWeightOptions,
          },
        ],
      },
    ],
  },
]

export const centeredButtonFields: Field[] = getCenteredButtonFields({ isColumn: false })
export const centeredButtonColumnFields: Field[] = getCenteredButtonFields({ isColumn: true })

export const CenteredButton: Block = {
  slug: 'centeredButton',
  interfaceName: 'CenteredButtonBlock',
  labels: {
    singular: 'Centered Button',
    plural: 'Centered Buttons',
  },
  fields: centeredButtonFields,
}

export default CenteredButton
