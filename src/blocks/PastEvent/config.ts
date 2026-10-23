import { Block, Field } from 'payload'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const spacingOptions = [
  { label: 'None (0)', value: 'mb-0' },
  { label: 'Extra Small (mb-2)', value: 'mb-2' },
  { label: 'Small (mb-3)', value: 'mb-3' },
  { label: 'Small-Medium (mb-4)', value: 'mb-4' },
  { label: 'Medium (mb-6)', value: 'mb-6' },
  { label: 'Large (mb-8)', value: 'mb-8' },
  { label: 'Extra Large (mb-10)', value: 'mb-10' },
  { label: '2X Large (mb-12)', value: 'mb-12' },
  { label: 'Custom Value', value: 'custom' },
]

export const pastEventColumnFields: Field[] = [
  // ─── Header Row ────────────────────────────────────────────────────────────
  {
    type: 'group',
    name: 'headerRow',
    label: 'Header Row (Title & Subtitle)',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Past Events Title',
        defaultValue: 'Past events',
      },
      textColorPickerAll({
        overrides: {
          name: 'titleColor',
          label: 'Title Text Color',
          defaultValue: 'text-gray-950',
        },
      }),
      {
        type: 'row',
        fields: [
          {
            name: 'titleFontSizeDesktop',
            type: 'select',
            label: 'Title Font Size (Desktop)',
            defaultValue: 'text-3xl md:text-4xl',
            options: fontSizeOptions,
            admin: { width: '50%' },
          },
          {
            name: 'titleFontSizeMobile',
            type: 'select',
            label: 'Title Font Size (Mobile)',
            defaultValue: 'text-2xl',
            options: fontSizeOptions,
            admin: { width: '50%' },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'titleFontWeightDesktop',
            type: 'select',
            label: 'Title Font Weight (Desktop)',
            defaultValue: 'font-semibold',
            options: fontWeightOptions,
            admin: { width: '50%' },
          },
          {
            name: 'titleFontWeightMobile',
            type: 'select',
            label: 'Title Font Weight (Mobile)',
            defaultValue: 'font-semibold',
            options: fontWeightOptions,
            admin: { width: '50%' },
          },
        ],
      },
      {
        name: 'subTitle',
        type: 'text',
        label: 'Subtitle (Right Side)',
        defaultValue: 'Earlier conversations, new perspectives',
      },
      textColorPickerAll({
        overrides: {
          name: 'subTitleColor',
          label: 'Subtitle Text Color',
          defaultValue: 'text-gray-500',
        },
      }),
      {
        type: 'row',
        fields: [
          {
            name: 'marginBottomDesktop',
            type: 'select',
            label: 'Header Row Margin Bottom (Desktop)',
            defaultValue: 'mb-6',
            options: spacingOptions,
            admin: { width: '50%' },
          },
          {
            name: 'marginBottomMobile',
            type: 'select',
            label: 'Header Row Margin Bottom (Mobile)',
            defaultValue: 'mb-4',
            options: spacingOptions,
            admin: { width: '50%' },
          },
        ],
      },
    ],
  },

  // ─── Divider Line ──────────────────────────────────────────────────────────
  {
    type: 'group',
    name: 'divider',
    label: 'Divider Line',
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'width',
            type: 'select',
            label: 'Divider Width',
            defaultValue: 'w-full',
            options: [
              { label: 'Full Width (100%)', value: 'w-full' },
              { label: '11/12 Width', value: 'w-11/12' },
              { label: '5/6 Width', value: 'w-5/6' },
              { label: '3/4 Width', value: 'w-3/4' },
            ],
            admin: { width: '50%' },
          },
          {
            name: 'color',
            type: 'select',
            label: 'Divider Color',
            defaultValue: 'border-gray-300',
            options: [
              { label: 'Gray 300 (Default)', value: 'border-gray-300' },
              { label: 'Gray 200', value: 'border-gray-200' },
              { label: 'Gray 400', value: 'border-gray-400' },
              { label: 'Slate 200', value: 'border-slate-200' },
              { label: 'Black (20% opacity)', value: 'border-black/20' },
              { label: 'Brand Blue', value: 'border-[#0256FF]' },
            ],
            admin: { width: '50%' },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'marginBottomDesktop',
            type: 'select',
            label: 'Divider Margin Bottom (Desktop)',
            defaultValue: 'mb-6',
            options: spacingOptions,
            admin: { width: '50%' },
          },
          {
            name: 'marginBottomMobile',
            type: 'select',
            label: 'Divider Margin Bottom (Mobile)',
            defaultValue: 'mb-4',
            options: spacingOptions,
            admin: { width: '50%' },
          },
        ],
      },
    ],
  },

  // ─── Description Text (Optional) ───────────────────────────────────────────
  {
    type: 'group',
    name: 'description',
    label: 'Description Text (Optional)',
    fields: [
      {
        name: 'text',
        type: 'textarea',
        label: 'Description Text',
        defaultValue: '',
      },
      textColorPickerAll({
        overrides: {
          name: 'textColor',
          label: 'Description Text Color',
          defaultValue: 'text-gray-500',
        },
      }),
      {
        type: 'row',
        fields: [
          {
            name: 'marginBottomDesktop',
            type: 'select',
            label: 'Margin Bottom (Desktop)',
            defaultValue: 'mb-8',
            options: spacingOptions,
            admin: { width: '50%' },
          },
          {
            name: 'marginBottomMobile',
            type: 'select',
            label: 'Margin Bottom (Mobile)',
            defaultValue: 'mb-6',
            options: spacingOptions,
            admin: { width: '50%' },
          },
        ],
      },
    ],
  },

  // ─── Column Table Headers Row ──────────────────────────────────────────────
  {
    type: 'group',
    name: 'columnHeaders',
    label: 'Table Column Headers (EVENT, ABOUT THE EVENT, DATES, LOCATION)',
    admin: {
      description: 'Labels are static according to mockups; colors and responsive typography are configurable.',
    },
    fields: [
      textColorPickerAll({
        overrides: {
          name: 'textColor',
          label: 'Headers Text Color',
          defaultValue: 'text-gray-500',
        },
      }),
      {
        type: 'row',
        fields: [
          {
            name: 'fontSizeDesktop',
            type: 'select',
            label: 'Font Size (Desktop)',
            defaultValue: 'text-xs',
            options: fontSizeOptions,
            admin: { width: '50%' },
          },
          {
            name: 'fontSizeMobile',
            type: 'select',
            label: 'Font Size (Mobile)',
            defaultValue: 'text-[11px]',
            options: fontSizeOptions,
            admin: { width: '50%' },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'fontWeightDesktop',
            type: 'select',
            label: 'Font Weight (Desktop)',
            defaultValue: 'font-medium',
            options: fontWeightOptions,
            admin: { width: '50%' },
          },
          {
            name: 'fontWeightMobile',
            type: 'select',
            label: 'Font Weight (Mobile)',
            defaultValue: 'font-medium',
            options: fontWeightOptions,
            admin: { width: '50%' },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'marginBottomDesktop',
            type: 'select',
            label: 'Headers Margin Bottom (Desktop)',
            defaultValue: 'mb-4',
            options: spacingOptions,
            admin: { width: '50%' },
          },
          {
            name: 'marginBottomMobile',
            type: 'select',
            label: 'Headers Margin Bottom (Mobile)',
            defaultValue: 'mb-3',
            options: spacingOptions,
            admin: { width: '50%' },
          },
        ],
      },
    ],
  },

  // ─── Card & Spacing Settings ───────────────────────────────────────────────
  {
    type: 'group',
    name: 'cardSettings',
    label: 'Past Event Cards Styling & Spacing',
    fields: [
      bgColorPickerAll({
        overrides: {
          name: 'cardBgColor',
          label: 'Card Background Color',
          defaultValue: 'bg-white',
        },
      }),
      {
        name: 'cardBorderColor',
        type: 'select',
        label: 'Card Border Color',
        defaultValue: 'border-gray-200/80',
        options: [
          { label: 'Subtle Gray (border-gray-200/80)', value: 'border-gray-200/80' },
          { label: 'Gray 200', value: 'border-gray-200' },
          { label: 'Slate 200', value: 'border-slate-200' },
          { label: 'Transparent', value: 'border-transparent' },
        ],
      },
      {
        name: 'cardGap',
        type: 'select',
        label: 'Gap Between Event Cards',
        defaultValue: 'gap-4',
        options: [
          { label: 'Small (gap-3)', value: 'gap-3' },
          { label: 'Medium (gap-4 - Default)', value: 'gap-4' },
          { label: 'Large (gap-6)', value: 'gap-6' },
          { label: 'Extra Large (gap-8)', value: 'gap-8' },
        ],
      },
    ],
  },
]

export const PastEvent: Block = {
  slug: 'pastEvent',
  labels: {
    singular: 'Past Event',
    plural: 'Past Event Blocks',
  },
  fields: pastEventColumnFields,
}
