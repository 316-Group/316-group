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

const spacingOptions = [
  { label: 'None (0)', value: 'pt-0' },
  { label: 'Extra Small (4)', value: 'pt-4' },
  { label: 'Small (6)', value: 'pt-6' },
  { label: 'Medium (8 - Default)', value: 'pt-8' },
  { label: 'Large (12)', value: 'pt-12' },
  { label: 'Extra Large (16)', value: 'pt-16' },
  { label: '2X Large (20)', value: 'pt-20' },
  { label: '3X Large (24)', value: 'pt-24' },
]

const paddingBottomOptions = [
  { label: 'None (0)', value: 'pb-0' },
  { label: 'Extra Small (4)', value: 'pb-4' },
  { label: 'Small (6)', value: 'pb-6' },
  { label: 'Medium (8 - Default)', value: 'pb-8' },
  { label: 'Large (12)', value: 'pb-12' },
  { label: 'Extra Large (16)', value: 'pb-16' },
  { label: '2X Large (20)', value: 'pb-20' },
  { label: '3X Large (24)', value: 'pb-24' },
]

export const verticalCTAv2Fields: Field[] = [
  // ─── 1. Section Spacing & Background ─────────────────────────────────────
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
        options: spacingOptions,
        admin: { width: '33.33%' },
      },
      {
        name: 'paddingBottom',
        type: 'select',
        label: 'Padding Bottom',
        defaultValue: 'pb-8',
        validate: allowAnySelect,
        options: paddingBottomOptions,
        admin: { width: '33.33%' },
      },
    ],
  },

  // ─── 2. Heading Settings ────────────────────────────────────────────────
  {
    name: 'headingGroup',
    type: 'group',
    label: 'Heading Settings',
    fields: [
      {
        name: 'heading',
        type: 'text',
        label: 'Heading Text',
        defaultValue: 'Technology that moves businesses forward',
        required: true,
        admin: {
          description: 'Supports inline styling, e.g. <style="color:#0256FF">highlighted</style> or <strong>bold</strong>.',
        },
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'headingColor',
              label: 'Heading Color',
              defaultValue: 'text-gray-950',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          {
            name: 'headingFontSize',
            type: 'select',
            label: 'Font Size (Desktop)',
            defaultValue: 'text-3xl md:text-4xl lg:text-5xl',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '20%' },
          },
          {
            name: 'headingFontSizeMobile',
            type: 'select',
            label: 'Font Size (Mobile)',
            defaultValue: 'text-2xl',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '20%' },
          },
          {
            name: 'headingFontWeight',
            type: 'select',
            label: 'Font Weight (Desktop)',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '20%' },
          },
          {
            name: 'headingFontWeightMobile',
            type: 'select',
            label: 'Font Weight (Mobile)',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '20%' },
          },
          {
            name: 'headingAlignment',
            type: 'select',
            label: 'Alignment',
            defaultValue: 'left',
            validate: allowAnySelect,
            options: alignmentOptions,
            admin: { width: '20%' },
          },
        ],
      },
    ],
  },

  // ─── 3. Description Settings ────────────────────────────────────────────
  {
    name: 'descriptionGroup',
    type: 'group',
    label: 'Description Settings',
    fields: [
      {
        name: 'description',
        type: 'textarea',
        label: 'Description Text',
        defaultValue:
          "316 Group's Digital Advisory service helps businesses navigate the complexities of the digital economy. Whether you're scaling a startup, transforming your operations, or exploring new revenue streams by leveraging technology and AI, our experts provide the insights and direction to turn your vision into reality.",
        admin: {
          description: 'Supports inline styling, e.g. <style="color:#0256FF">highlighted</style>.',
        },
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'descriptionColor',
              label: 'Description Color',
              defaultValue: 'text-gray-800',
              validate: allowAnySelect,
              admin: { width: '20%' },
            },
          }),
          {
            name: 'descriptionFontSize',
            type: 'select',
            label: 'Font Size (Desktop)',
            defaultValue: 'text-base md:text-lg',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '20%' },
          },
          {
            name: 'descriptionFontSizeMobile',
            type: 'select',
            label: 'Font Size (Mobile)',
            defaultValue: 'text-sm',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '20%' },
          },
          {
            name: 'descriptionFontWeight',
            type: 'select',
            label: 'Font Weight (Desktop)',
            defaultValue: 'font-normal',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '20%' },
          },
          {
            name: 'descriptionFontWeightMobile',
            type: 'select',
            label: 'Font Weight (Mobile)',
            defaultValue: 'font-normal',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '20%' },
          },
        ],
      },
      {
        name: 'descriptionAlignment',
        type: 'select',
        label: 'Alignment',
        defaultValue: 'left',
        validate: allowAnySelect,
        options: alignmentOptions,
      },
    ],
  },

  // ─── 4. Button / Link Settings ──────────────────────────────────────────
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
        label: 'Button Text',
        defaultValue: 'Explore our digital advisory solutions',
        admin: { condition: (_, s) => s?.enableButton !== false },
      },
      link({
        appearances: false,
        disableLabel: true,
        required: false,
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
          textColorPickerAll({
            overrides: {
              name: 'buttonTextColor',
              label: 'Button Text Color',
              defaultValue: 'text-gray-950',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          bgColorPickerAll({
            overrides: {
              name: 'iconCircleBg',
              label: 'Icon Circle Background',
              defaultValue: 'bg-[#1D4ED8]',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          textColorPickerAll({
            overrides: {
              name: 'iconColor',
              label: 'Arrow Icon Color',
              defaultValue: 'text-white',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          {
            name: 'buttonAlignment',
            type: 'select',
            label: 'Alignment',
            defaultValue: 'left',
            validate: allowAnySelect,
            options: alignmentOptions,
            admin: { width: '25%' },
          },
        ],
      },
      {
        type: 'row',
        admin: { condition: (_, s) => s?.enableButton !== false },
        fields: [
          {
            name: 'buttonFontSize',
            type: 'select',
            label: 'Font Size (Desktop)',
            defaultValue: 'text-lg md:text-xl lg:text-2xl',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'buttonFontSizeMobile',
            type: 'select',
            label: 'Font Size (Mobile)',
            defaultValue: 'text-base',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'buttonFontWeight',
            type: 'select',
            label: 'Font Weight (Desktop)',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
          {
            name: 'buttonFontWeightMobile',
            type: 'select',
            label: 'Font Weight (Mobile)',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
        ],
      },
    ],
  },

  // ─── 5. Divider Line (HR) Settings ──────────────────────────────────────
  {
    name: 'dividerGroup',
    type: 'group',
    label: 'Divider Line (HR) Settings',
    fields: [
      {
        name: 'enableDivider',
        type: 'checkbox',
        label: 'Enable Bottom Divider Line',
        defaultValue: true,
      },
      {
        type: 'row',
        admin: { condition: (_, s) => s?.enableDivider !== false },
        fields: [
          {
            name: 'dividerColor',
            type: 'select',
            label: 'Divider Color',
            defaultValue: 'border-gray-200 dark:border-gray-800',
            validate: allowAnySelect,
            options: [
              { label: 'Subtle Gray (Default)', value: 'border-gray-200 dark:border-gray-800' },
              { label: 'Light Gray', value: 'border-gray-100 dark:border-gray-900' },
              { label: 'Medium Gray', value: 'border-gray-300 dark:border-gray-700' },
              { label: 'Brand Blue', value: 'border-blue-600' },
              { label: 'Transparent / Hidden', value: 'border-transparent' },
            ],
            admin: { width: '50%' },
          },
          {
            name: 'dividerMarginTop',
            type: 'select',
            label: 'Divider Top Margin',
            defaultValue: 'mt-8 md:mt-10',
            validate: allowAnySelect,
            options: [
              { label: 'Small (mt-6)', value: 'mt-6' },
              { label: 'Medium (mt-8 md:mt-10 - Default)', value: 'mt-8 md:mt-10' },
              { label: 'Large (mt-12 md:mt-14)', value: 'mt-12 md:mt-14' },
              { label: 'Extra Large (mt-16)', value: 'mt-16' },
            ],
            admin: { width: '50%' },
          },
        ],
      },
    ],
  },
]

export const VerticalCTAv2: Block = {
  slug: 'verticalCTAv2',
  interfaceName: 'VerticalCTAv2Block',
  labels: {
    singular: 'Vertical CTA v2',
    plural: 'Vertical CTA v2 Blocks',
  },
  fields: verticalCTAv2Fields,
}
