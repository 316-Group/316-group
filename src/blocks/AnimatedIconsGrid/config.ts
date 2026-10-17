import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { link } from '@/fields/link'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const alignmentOptions = [
  { label: 'Left', value: 'left' },
  { label: 'Center (Default)', value: 'center' },
  { label: 'Right', value: 'right' },
]

export const AnimatedIconsGrid: Block = {
  slug: 'animatedIconsGrid',
  labels: {
    singular: 'Animated Icons Grid',
    plural: 'Animated Icons Grid Blocks',
  },
  fields: [
    // ─── 1. Section Spacing & Background ─────────────────────────────────────
    {
      type: 'row',
      fields: [
        bgColorPickerAll({
          overrides: {
            name: 'sectionBgColor',
            label: 'Section Background Color',
            defaultValue: 'bg-[#F4F6FB]',
            admin: { width: '33.33%' },
          },
        }),
        {
          name: 'paddingTop',
          type: 'select',
          label: 'Padding Top',
          defaultValue: 'pt-20',
          admin: { width: '33.33%' },
          options: [
            { label: 'None (0)', value: 'pt-0' },
            { label: 'Small (pt-12)', value: 'pt-12' },
            { label: 'Medium (pt-16)', value: 'pt-16' },
            { label: 'Large (pt-20 - Default)', value: 'pt-20' },
            { label: 'Extra Large (pt-28)', value: 'pt-28' },
          ],
        },
        {
          name: 'paddingBottom',
          type: 'select',
          label: 'Padding Bottom',
          defaultValue: 'pb-20',
          admin: { width: '33.33%' },
          options: [
            { label: 'None (0)', value: 'pb-0' },
            { label: 'Small (pb-12)', value: 'pb-12' },
            { label: 'Medium (pb-16)', value: 'pb-16' },
            { label: 'Large (pb-20 - Default)', value: 'pb-20' },
            { label: 'Extra Large (pb-28)', value: 'pb-28' },
          ],
        },
      ],
    },

    // ─── 2. Main Heading Group ───────────────────────────────────────────────
    {
      name: 'headingGroup',
      type: 'group',
      label: 'Main Heading Settings',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading Text',
          defaultValue: 'Access <style="color:#0256FF">50+ Connectors</style>',
          admin: {
            description:
              'Supports inline styles such as <style="color:#0256FF">50+ Connectors</style> or <strong>bold</strong>.',
          },
        },
        {
          type: 'row',
          fields: [
            textColorPickerAll({
              overrides: {
                name: 'headingColor',
                label: 'Base Heading Color',
                defaultValue: 'text-gray-950',
                admin: { width: '25%' },
              },
            }),
            {
              name: 'headingFontSize',
              type: 'select',
              label: 'Font Size',
              defaultValue: 'text-4xl md:text-5xl lg:text-6xl',
              options: fontSizeOptions,
              admin: { width: '25%' },
            },
            {
              name: 'headingFontWeight',
              type: 'select',
              label: 'Font Weight',
              defaultValue: 'font-bold',
              options: fontWeightOptions,
              admin: { width: '25%' },
            },
            {
              name: 'headingAlignment',
              type: 'select',
              label: 'Alignment',
              defaultValue: 'center',
              options: alignmentOptions,
              admin: { width: '25%' },
            },
          ],
        },
      ],
    },

    // ─── 3. Description Group ────────────────────────────────────────────────
    {
      name: 'descriptionGroup',
      type: 'group',
      label: 'Description Text Settings',
      fields: [
        {
          name: 'description',
          type: 'textarea',
          label: 'Description Text',
          defaultValue:
            "Fintech Connect ships with pre-built connectors to the world's leading banking, payments, compliance, and crypto infrastructure providers.",
        },
        {
          type: 'row',
          fields: [
            textColorPickerAll({
              overrides: {
                name: 'descriptionColor',
                label: 'Description Color',
                defaultValue: 'text-gray-700',
                admin: { width: '25%' },
              },
            }),
            {
              name: 'descriptionFontSize',
              type: 'select',
              label: 'Font Size',
              defaultValue: 'text-base md:text-lg',
              options: fontSizeOptions,
              admin: { width: '25%' },
            },
            {
              name: 'descriptionFontWeight',
              type: 'select',
              label: 'Font Weight',
              defaultValue: 'font-normal',
              options: fontWeightOptions,
              admin: { width: '25%' },
            },
            {
              name: 'descriptionAlignment',
              type: 'select',
              label: 'Alignment',
              defaultValue: 'center',
              options: alignmentOptions,
              admin: { width: '25%' },
            },
          ],
        },
      ],
    },

    // ─── 4. Button / CTA Group ───────────────────────────────────────────────
    {
      name: 'buttonGroup',
      type: 'group',
      label: 'Button / Link Settings',
      fields: [
        {
          name: 'enableButton',
          type: 'checkbox',
          label: 'Enable Button',
          defaultValue: true,
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'Explore FintecConnect',
          admin: { condition: (_, s) => s?.enableButton !== false },
        },
        link({
          overrides: {
            name: 'buttonLink',
            label: 'Button Destination',
            admin: { condition: (_, s) => s?.enableButton !== false },
          },
        }),
        {
          type: 'row',
          admin: { condition: (_, s) => s?.enableButton !== false },
          fields: [
            bgColorPickerAll({
              overrides: {
                name: 'buttonBgColor',
                label: 'Button Background',
                defaultValue: 'bg-[#1D4ED8]',
                admin: { width: '25%' },
              },
            }),
            textColorPickerAll({
              overrides: {
                name: 'buttonTextColor',
                label: 'Text Color',
                defaultValue: 'text-white',
                admin: { width: '25%' },
              },
            }),
            bgColorPickerAll({
              overrides: {
                name: 'iconCircleBg',
                label: 'Icon Circle BG',
                defaultValue: 'bg-white',
                admin: { width: '25%' },
              },
            }),
            textColorPickerAll({
              overrides: {
                name: 'iconColor',
                label: 'Icon Arrow Color',
                defaultValue: 'text-[#1D4ED8]',
                admin: { width: '25%' },
              },
            }),
          ],
        },
        {
          type: 'row',
          admin: { condition: (_, s) => s?.enableButton !== false },
          fields: [
            {
              name: 'buttonAlignment',
              type: 'select',
              label: 'Button Alignment',
              defaultValue: 'center',
              options: alignmentOptions,
              admin: { width: '33.33%' },
            },
            {
              name: 'buttonFontSize',
              type: 'select',
              label: 'Button Font Size',
              defaultValue: 'text-sm md:text-base',
              options: fontSizeOptions,
              admin: { width: '33.33%' },
            },
            {
              name: 'buttonFontWeight',
              type: 'select',
              label: 'Button Font Weight',
              defaultValue: 'font-semibold',
              options: fontWeightOptions,
              admin: { width: '33.33%' },
            },
          ],
        },
      ],
    },

    // ─── 5. Small Cards Array (PNG Image Cards) ──────────────────────────────
    {
      name: 'cards',
      type: 'array',
      label: 'Small Card Items (Up to 21 on Desktop)',
      minRows: 0,
      maxRows: 21,
      admin: {
        description:
          'Add items with PNG/SVG images. Cards without an image render as subtle empty rounded cards as seen in the mockup.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Icon / Logo Image (PNG/SVG)',
          required: false,
        },
        {
          name: 'altText',
          type: 'text',
          label: 'Alt / Brand Label',
          required: false,
        },
        {
          name: 'cardBgColor',
          type: 'text',
          label: 'Custom Card Background (optional)',
          admin: {
            description: 'Leave blank for default frosted white card.',
          },
        },
      ],
    },
  ],
}
