import { Block, Field } from 'payload'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { fontSizeOptions, fontWeightOptions, spacingOptions } from '../CenteredContent/config'

export const featuredWebinarColumnFields: Field[] = [
  // ─── Header Row ────────────────────────────────────────────────────────────
  {
    type: 'group',
    name: 'headerRow',
    label: 'Header Row (Title & Dynamic Date Range)',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Featured Webinars Title',
        defaultValue: 'Featured webinars',
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
        type: 'row',
        fields: [
          {
            name: 'dateRangeColor',
            type: 'select',
            label: 'Date Range Text Color',
            defaultValue: 'text-gray-600',
            options: [
              { label: 'Gray 600 (Default)', value: 'text-gray-600' },
              { label: 'Gray 500', value: 'text-gray-500' },
              { label: 'Gray 900', value: 'text-gray-900' },
              { label: 'Brand Blue', value: 'text-[#0256FF]' },
            ],
            admin: { width: '50%' },
          },
          {
            name: 'dateRangeFontSize',
            type: 'select',
            label: 'Date Range Font Size',
            defaultValue: 'text-sm md:text-base',
            options: fontSizeOptions,
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
            defaultValue: 'mb-4',
            options: spacingOptions,
            admin: { width: '50%' },
          },
          {
            name: 'marginBottomMobile',
            type: 'select',
            label: 'Divider Margin Bottom (Mobile)',
            defaultValue: 'mb-3',
            options: spacingOptions,
            admin: { width: '50%' },
          },
        ],
      },
    ],
  },

  // ─── Description & Filter Row ──────────────────────────────────────────────
  {
    type: 'group',
    name: 'description',
    label: 'Description Text (Left of Filters)',
    fields: [
      {
        name: 'text',
        type: 'textarea',
        label: 'Description Text',
        defaultValue:
          'Illustrative event schedule · All upcoming and past listings are examples, not confirmed 316 Group commitments or attendance.',
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
            name: 'fontSizeDesktop',
            type: 'select',
            label: 'Font Size (Desktop)',
            defaultValue: 'text-xs md:text-sm',
            options: fontSizeOptions,
            admin: { width: '50%' },
          },
          {
            name: 'fontSizeMobile',
            type: 'select',
            label: 'Font Size (Mobile)',
            defaultValue: 'text-xs',
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
            defaultValue: 'font-normal',
            options: fontWeightOptions,
            admin: { width: '50%' },
          },
          {
            name: 'fontWeightMobile',
            type: 'select',
            label: 'Font Weight (Mobile)',
            defaultValue: 'font-normal',
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
            label: 'Row Margin Bottom (Desktop)',
            defaultValue: 'mb-8 md:mb-10',
            options: spacingOptions,
            admin: { width: '50%' },
          },
          {
            name: 'marginBottomMobile',
            type: 'select',
            label: 'Row Margin Bottom (Mobile)',
            defaultValue: 'mb-6',
            options: spacingOptions,
            admin: { width: '50%' },
          },
        ],
      },
    ],
  },

  // ─── Filter & Pagination Settings ──────────────────────────────────────────
  {
    type: 'group',
    name: 'filterSettings',
    label: 'Filters & Pagination',
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'defaultSort',
            type: 'select',
            label: 'Default Sort Order',
            defaultValue: 'desc',
            options: [
              { label: 'Newest First (Descending)', value: 'desc' },
              { label: 'Oldest First (Ascending)', value: 'asc' },
            ],
            admin: { width: '50%' },
          },
          {
            name: 'limit',
            type: 'number',
            label: 'Webinars Per Page (Max 3 Recommended)',
            defaultValue: 3,
            min: 1,
            max: 12,
            admin: { width: '50%' },
          },
        ],
      },
      {
        name: 'emptyStateText',
        type: 'text',
        label: 'Empty State Notice',
        defaultValue: 'No active webinars are currently scheduled. Check back soon.',
      },
    ],
  },
]

export const FeaturedWebinar: Block = {
  slug: 'featuredWebinar',
  labels: {
    singular: 'Featured Webinars',
    plural: 'Featured Webinars Blocks',
  },
  fields: featuredWebinarColumnFields,
}
