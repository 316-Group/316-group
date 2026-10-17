import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'

export const fontSizeOptions = [
  { label: 'Extra Small (xs - 12px)', value: 'text-xs' },
  { label: 'Small (sm - 14px)', value: 'text-sm' },
  { label: 'Base (base - 16px)', value: 'text-base' },
  { label: 'Large (lg - 18px)', value: 'text-lg' },
  { label: 'Extra Large (xl - 20px)', value: 'text-xl' },
  { label: '2X Large (2xl - 24px)', value: 'text-2xl' },
  { label: '3X Large (3xl - 30px)', value: 'text-3xl' },
  { label: '4X Large (4xl - 36px)', value: 'text-4xl' },
  { label: '5X Large (5xl - 48px)', value: 'text-5xl' },
  { label: '6X Large (6xl - 60px)', value: 'text-6xl' },
  { label: '7X Large (7xl - 72px)', value: 'text-7xl' },
  { label: '8X Large (8xl - 96px)', value: 'text-8xl' },
  { label: 'Responsive Base to Large', value: 'text-base md:text-lg' },
  { label: 'Responsive Base to XL', value: 'text-base md:text-lg lg:text-xl' },
  { label: 'Responsive Large to 2XL', value: 'text-lg md:text-xl lg:text-2xl' },
  { label: 'Responsive 2XL to 3XL', value: 'text-2xl md:text-3xl' },
  { label: 'Responsive 3XL to 4XL', value: 'text-3xl md:text-4xl' },
  { label: 'Responsive 3XL to 5XL', value: 'text-3xl md:text-4xl lg:text-5xl' },
  { label: 'Responsive 4XL to 6XL (Display)', value: 'text-4xl md:text-5xl lg:text-6xl' },
  { label: 'Responsive 5XL to 7XL (Hero)', value: 'text-5xl md:text-6xl lg:text-7xl' },
  { label: 'Responsive 6XL to 8XL (Giant)', value: 'text-6xl md:text-7xl lg:text-8xl' },
]

export const fontWeightOptions = [
  { label: 'Light (300)', value: 'font-light' },
  { label: 'Normal / Regular (400)', value: 'font-normal' },
  { label: 'Medium (500)', value: 'font-medium' },
  { label: 'Semibold (600)', value: 'font-semibold' },
  { label: 'Bold (700)', value: 'font-bold' },
  { label: 'Extrabold (800)', value: 'font-extrabold' },
]

export const centeredContentFields: Field[] = [
  // ─── Alignment & Layout ──────────────────────────────────────────────────
  {
    type: 'row',
    fields: [
      {
        name: 'alignment',
        type: 'select',
        label: 'Content Alignment',
        defaultValue: 'center',
        options: [
          { label: 'Center (Default)', value: 'center' },
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
          { label: 'Justified', value: 'justify' },
        ],
        admin: {
          width: '50%',
        },
      },
      {
        name: 'maxWidth',
        type: 'select',
        label: 'Max Container Width',
        defaultValue: 'max-w-4xl',
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
        },
      },
    ],
  },

  // ─── Section Background & Spacing ────────────────────────────────────────
  {
    type: 'row',
    fields: [
      bgColorPickerAll({
        overrides: {
          name: 'sectionBgColor',
          label: 'Section Background Color',
          defaultValue: 'bg-white',
          admin: {
            width: '33.33%',
          },
        },
      }),
      {
        name: 'paddingTop',
        type: 'select',
        label: 'Padding Top',
        defaultValue: 'pt-16',
        options: [
          { label: 'None (0)', value: 'pt-0' },
          { label: 'Extra Small (pt-4)', value: 'pt-4' },
          { label: 'Small (pt-8)', value: 'pt-8' },
          { label: 'Medium (pt-12)', value: 'pt-12' },
          { label: 'Standard (pt-16 - Default)', value: 'pt-16' },
          { label: 'Large (pt-20)', value: 'pt-20' },
          { label: 'Extra Large (pt-24)', value: 'pt-24' },
          { label: '2X Large (pt-32)', value: 'pt-32' },
        ],
        admin: {
          width: '33.33%',
        },
      },
      {
        name: 'paddingBottom',
        type: 'select',
        label: 'Padding Bottom',
        defaultValue: 'pb-16',
        options: [
          { label: 'None (0)', value: 'pb-0' },
          { label: 'Extra Small (pb-4)', value: 'pb-4' },
          { label: 'Small (pb-8)', value: 'pb-8' },
          { label: 'Medium (pb-12)', value: 'pb-12' },
          { label: 'Standard (pb-16 - Default)', value: 'pb-16' },
          { label: 'Large (pb-20)', value: 'pb-20' },
          { label: 'Extra Large (pb-24)', value: 'pb-24' },
          { label: '2X Large (pb-32)', value: 'pb-32' },
        ],
        admin: {
          width: '33.33%',
        },
      },
    ],
  },

  // ─── Badge Section ───────────────────────────────────────────────────────
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
      },
      {
        name: 'badgeText',
        type: 'text',
        label: 'Badge Text',
        defaultValue: 'Industries',
        admin: {
          condition: (_, siblingData) => siblingData?.enableBadge !== false,
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
              defaultValue: 'bg-[#EFF1F8]',
              admin: {
                width: '50%',
              },
            },
          }),
          textColorPickerAll({
            overrides: {
              name: 'badgeTextColor',
              label: 'Badge Text Color',
              defaultValue: 'text-[#3F5AC9]',
              admin: {
                width: '50%',
              },
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
            label: 'Badge Font Size',
            defaultValue: 'text-sm',
            options: fontSizeOptions,
            admin: {
              width: '50%',
            },
          },
          {
            name: 'badgeFontWeight',
            type: 'select',
            label: 'Badge Font Weight',
            defaultValue: 'font-medium',
            options: fontWeightOptions,
            admin: {
              width: '50%',
            },
          },
        ],
      },
    ],
  },

  // ─── Heading Line 1 ──────────────────────────────────────────────────────
  {
    name: 'heading1',
    type: 'group',
    label: 'Heading Line 1 (e.g. Building across)',
    fields: [
      {
        name: 'text',
        type: 'text',
        label: 'Heading Line 1 Text (supports inline HTML like <style="color:red"> or <span style="...">)',
        defaultValue: 'Building across',
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'color',
              label: 'Line 1 Color',
              defaultValue: 'text-gray-900',
              admin: {
                width: '33.33%',
              },
            },
          }),
          {
            name: 'fontSize',
            type: 'select',
            label: 'Line 1 Font Size',
            defaultValue: 'text-4xl md:text-5xl lg:text-6xl',
            options: fontSizeOptions,
            admin: {
              width: '33.33%',
            },
          },
          {
            name: 'fontWeight',
            type: 'select',
            label: 'Line 1 Font Weight',
            defaultValue: 'font-normal',
            options: fontWeightOptions,
            admin: {
              width: '33.33%',
            },
          },
        ],
      },
    ],
  },

  // ─── Heading Line 2 ──────────────────────────────────────────────────────
  {
    name: 'heading2',
    type: 'group',
    label: 'Heading Line 2 (e.g. the industries that matter.)',
    fields: [
      {
        name: 'text',
        type: 'text',
        label: 'Heading Line 2 Text (supports inline HTML like <style="color:red">, <strong>, or <span style="...">)',
        defaultValue: 'the industries <strong>that matter.</strong>',
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'color',
              label: 'Line 2 Color',
              defaultValue: 'text-gray-900',
              admin: {
                width: '33.33%',
              },
            },
          }),
          {
            name: 'fontSize',
            type: 'select',
            label: 'Line 2 Font Size',
            defaultValue: 'text-4xl md:text-5xl lg:text-6xl',
            options: fontSizeOptions,
            admin: {
              width: '33.33%',
            },
          },
          {
            name: 'fontWeight',
            type: 'select',
            label: 'Line 2 Font Weight',
            defaultValue: 'font-normal',
            options: fontWeightOptions,
            admin: {
              width: '33.33%',
            },
          },
        ],
      },
    ],
  },

  // ─── Heading Tag Option ──────────────────────────────────────────────────
  {
    name: 'headingTag',
    type: 'select',
    label: 'Heading HTML Tag',
    defaultValue: 'h2',
    options: [
      { label: 'H1', value: 'h1' },
      { label: 'H2 (Default)', value: 'h2' },
      { label: 'H3', value: 'h3' },
      { label: 'H4', value: 'h4' },
      { label: 'P', value: 'p' },
      { label: 'Div', value: 'div' },
    ],
  },

  // ─── Description Paragraph ───────────────────────────────────────────────
  {
    name: 'descriptionGroup',
    type: 'group',
    label: 'Description',
    fields: [
      {
        name: 'description',
        type: 'textarea',
        label: 'Description Text (supports inline HTML like <style="color:red"> or <span style="...">)',
        defaultValue:
          'We provide purpose-built expertise across key industries, connected through the 316 ecosystem to drive innovation, empower businesses and unlock new opportunities for growth.',
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'color',
              label: 'Description Color',
              defaultValue: 'text-gray-700',
              admin: {
                width: '33.33%',
              },
            },
          }),
          {
            name: 'fontSize',
            type: 'select',
            label: 'Description Font Size',
            defaultValue: 'text-base md:text-lg lg:text-xl',
            options: fontSizeOptions,
            admin: {
              width: '33.33%',
            },
          },
          {
            name: 'fontWeight',
            type: 'select',
            label: 'Description Font Weight',
            defaultValue: 'font-normal',
            options: fontWeightOptions,
            admin: {
              width: '33.33%',
            },
          },
        ],
      },
    ],
  },
]

export const CenteredContent: Block = {
  slug: 'centeredContent',
  interfaceName: 'CenteredContentBlock',
  labels: {
    singular: 'Centered Content',
    plural: 'Centered Contents',
  },
  fields: centeredContentFields,
}
