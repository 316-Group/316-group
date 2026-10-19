import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { link } from '@/fields/link'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const allowAnySelect = (() => true as const) as any

const alignmentOptions = [
  { label: 'Center (Default)', value: 'center' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
]

const spacingOptions = [
  { label: 'None (0px)', value: '0px' },
  { label: '8px', value: '8px' },
  { label: '12px', value: '12px' },
  { label: '16px', value: '16px' },
  { label: '20px', value: '20px' },
  { label: '24px (Default)', value: '24px' },
  { label: '32px', value: '32px' },
  { label: '40px', value: '40px' },
  { label: '48px', value: '48px' },
  { label: 'Custom Value', value: 'custom' },
]

export const readyToGrowFields: Field[] = [
  // ─── 1. Section Spacing & Background ───────────────────────────────────────
  {
    type: 'row',
    fields: [
      bgColorPickerAll({
        overrides: {
          name: 'sectionBgColor',
          label: 'Section Background Color',
          defaultValue: 'bg-blue-600',
          validate: allowAnySelect,
          admin: {
            width: '33.33%',
            description:
              'Default is royal blue (bg-blue-600). Can be changed to any color or bg-transparent.',
          },
        },
      }),
      {
        name: 'paddingTop',
        type: 'select',
        label: 'Padding Top',
        defaultValue: 'pt-20',
        validate: allowAnySelect,
        options: [
          { label: 'Extra Small (pt-8)', value: 'pt-8' },
          { label: 'Small (pt-12)', value: 'pt-12' },
          { label: 'Medium (pt-16)', value: 'pt-16' },
          { label: 'Large (pt-20 - Default)', value: 'pt-20' },
          { label: 'Extra Large (pt-24)', value: 'pt-24' },
          { label: '2X Large (pt-32)', value: 'pt-32' },
        ],
        admin: { width: '33.33%' },
      },
      {
        name: 'paddingMode',
        type: 'select',
        label: 'Horizontal Padding Mode',
        defaultValue: 'default',
        validate: allowAnySelect,
        options: [
          { label: 'Default (Contained with Container Margins)', value: 'default' },
          { label: 'No Padding / Full Column Width (0px)', value: 'none' },
          { label: 'Custom Horizontal Padding', value: 'custom' },
        ],
        admin: {
          width: '33.33%',
          description: 'Set to "No Padding" to let the blue section take full width of the column.',
        },
      },
    ],
  },
  {
    type: 'row',
    admin: { condition: (_, s) => s?.paddingMode === 'custom' },
    fields: [
      {
        name: 'paddingXDesktop',
        type: 'select',
        label: 'Desktop Padding Left / Right',
        defaultValue: '48px',
        validate: allowAnySelect,
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '16px', value: '16px' },
          { label: '24px', value: '24px' },
          { label: '32px', value: '32px' },
          { label: '48px (Default)', value: '48px' },
          { label: '60px', value: '60px' },
          { label: '80px', value: '80px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: { width: '50%' },
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
        admin: { width: '50%' },
      },
    ],
  },
  {
    type: 'row',
    admin: { condition: (_, s) => s?.paddingMode === 'custom' },
    fields: [
      {
        name: 'paddingXDesktopCustom',
        type: 'text',
        label: 'Custom Desktop Padding (e.g. 50px)',
        admin: {
          width: '50%',
          condition: (_, s) => s?.paddingXDesktop === 'custom',
        },
      },
      {
        name: 'paddingXMobileCustom',
        type: 'text',
        label: 'Custom Mobile Padding (e.g. 12px)',
        admin: {
          width: '50%',
          condition: (_, s) => s?.paddingXMobile === 'custom',
        },
      },
    ],
  },

  // ─── 2. Top Badge ("Ready to grow?") ───────────────────────────────────────
  {
    name: 'badgeGroup',
    type: 'group',
    label: 'Top Badge ("Ready to grow?")',
    fields: [
      {
        name: 'text',
        type: 'text',
        label: 'Badge Text',
        defaultValue: 'Ready to grow?',
      },
      {
        type: 'row',
        fields: [
          bgColorPickerAll({
            overrides: {
              name: 'bgColor',
              label: 'Badge Background Color',
              defaultValue: 'bg-blue-700',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          textColorPickerAll({
            overrides: {
              name: 'textColor',
              label: 'Badge Text Color',
              defaultValue: 'text-white',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          {
            name: 'fontSize',
            type: 'select',
            label: 'Font Size',
            defaultValue: 'text-sm md:text-base',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'alignment',
            type: 'select',
            label: 'Alignment',
            defaultValue: 'center',
            validate: allowAnySelect,
            options: alignmentOptions,
            admin: { width: '25%' },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'spacingBottom',
            type: 'select',
            label: 'Spacing Below Badge (before Heading)',
            defaultValue: '24px',
            validate: allowAnySelect,
            options: spacingOptions,
            admin: { width: '50%' },
          },
          {
            name: 'spacingBottomCustom',
            type: 'text',
            label: 'Custom Spacing Below Badge (e.g. 28px)',
            admin: {
              width: '50%',
              condition: (_, s) => s?.spacingBottom === 'custom',
            },
          },
        ],
      },
    ],
  },

  // ─── 3. Main Heading Settings ──────────────────────────────────────────────
  {
    name: 'headingGroup',
    type: 'group',
    label: 'Main Heading',
    fields: [
      {
        name: 'text',
        type: 'text',
        label: 'Heading Text',
        defaultValue: "Let's build what comes next, together.",
        admin: {
          description:
            'Supports inline styling, e.g. <style="color:#ADE2FF">highlight</style> or <span> tags.',
        },
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'color',
              label: 'Heading Color',
              defaultValue: 'text-white',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          {
            name: 'fontSize',
            type: 'select',
            label: 'Font Size',
            defaultValue: 'text-4xl md:text-5xl lg:text-6xl',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'fontWeight',
            type: 'select',
            label: 'Font Weight',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
          {
            name: 'alignment',
            type: 'select',
            label: 'Alignment',
            defaultValue: 'center',
            validate: allowAnySelect,
            options: alignmentOptions,
            admin: { width: '25%' },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'spacingBottom',
            type: 'select',
            label: 'Spacing Below Heading (before Description)',
            defaultValue: '20px',
            validate: allowAnySelect,
            options: spacingOptions,
            admin: { width: '50%' },
          },
          {
            name: 'spacingBottomCustom',
            type: 'text',
            label: 'Custom Spacing Below Heading (e.g. 22px)',
            admin: {
              width: '50%',
              condition: (_, s) => s?.spacingBottom === 'custom',
            },
          },
        ],
      },
    ],
  },

  // ─── 4. Description Settings ───────────────────────────────────────────────
  {
    name: 'descriptionGroup',
    type: 'group',
    label: 'Description',
    fields: [
      {
        name: 'text',
        type: 'textarea',
        label: 'Description Text',
        defaultValue:
          'Explore solutions, discuss partnerships or connect with one of our specialist businesses.',
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'color',
              label: 'Description Color',
              defaultValue: 'text-white',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          {
            name: 'fontSize',
            type: 'select',
            label: 'Font Size',
            defaultValue: 'text-base md:text-lg lg:text-xl',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'fontWeight',
            type: 'select',
            label: 'Font Weight',
            defaultValue: 'font-normal',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
          {
            name: 'alignment',
            type: 'select',
            label: 'Alignment',
            defaultValue: 'center',
            validate: allowAnySelect,
            options: alignmentOptions,
            admin: { width: '25%' },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'spacingBottom',
            type: 'select',
            label: 'Spacing Below Description (before Button)',
            defaultValue: '32px',
            validate: allowAnySelect,
            options: spacingOptions,
            admin: { width: '50%' },
          },
          {
            name: 'spacingBottomCustom',
            type: 'text',
            label: 'Custom Spacing Below Description (e.g. 36px)',
            admin: {
              width: '50%',
              condition: (_, s) => s?.spacingBottom === 'custom',
            },
          },
        ],
      },
    ],
  },

  // ─── 5. Action Button Settings ─────────────────────────────────────────────
  {
    name: 'buttonGroup',
    type: 'group',
    label: 'Action Button',
    fields: [
      {
        name: 'text',
        type: 'text',
        label: 'Button Text',
        defaultValue: 'Talk to our experts',
      },
      link({
        appearances: false,
        disableLabel: true,
        required: false,
        overrides: {
          name: 'link',
          label: 'Button Destination Link',
        },
      }),
      {
        type: 'row',
        fields: [
          bgColorPickerAll({
            overrides: {
              name: 'bgColor',
              label: 'Button Background Color',
              defaultValue: 'bg-white',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          textColorPickerAll({
            overrides: {
              name: 'textColor',
              label: 'Button Text Color',
              defaultValue: 'text-gray-950',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          {
            name: 'fontSize',
            type: 'select',
            label: 'Font Size',
            defaultValue: 'text-sm md:text-base',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'alignment',
            type: 'select',
            label: 'Alignment',
            defaultValue: 'center',
            validate: allowAnySelect,
            options: alignmentOptions,
            admin: { width: '25%' },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          bgColorPickerAll({
            overrides: {
              name: 'iconCircleBg',
              label: 'Circle Icon Background Color',
              defaultValue: 'bg-blue-600',
              validate: allowAnySelect,
              admin: { width: '50%' },
            },
          }),
          textColorPickerAll({
            overrides: {
              name: 'iconColor',
              label: 'Arrow Icon Color',
              defaultValue: 'text-white',
              validate: allowAnySelect,
              admin: { width: '50%' },
            },
          }),
        ],
      },
    ],
  },

  // ─── 6. The 4 Capsule / Arch Bottom Images ─────────────────────────────────
  {
    name: 'imagesGroup',
    type: 'group',
    label: 'Bottom Arch Images (4 Slots)',
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'spacingTop',
            type: 'select',
            label: 'Spacing Above Images (from Button)',
            defaultValue: '48px',
            validate: allowAnySelect,
            options: [
              { label: '24px', value: '24px' },
              { label: '32px', value: '32px' },
              { label: '40px', value: '40px' },
              { label: '48px (Default)', value: '48px' },
              { label: '64px', value: '64px' },
              { label: '80px', value: '80px' },
            ],
            admin: { width: '50%' },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'image1',
            type: 'upload',
            relationTo: 'media',
            label: 'Image 1 - Left Outer Capsule (Full Pill)',
            required: false,
            admin: {
              width: '50%',
              description: 'Upright stadium/capsule shape on the far left. Visible fully.',
            },
          },
          {
            name: 'image2',
            type: 'upload',
            relationTo: 'media',
            label: 'Image 2 - Left Inner Arch (Half Dome)',
            required: false,
            admin: {
              width: '50%',
              description: 'Large dome arch; top half visible, bottom half cropped at section bottom.',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'image3',
            type: 'upload',
            relationTo: 'media',
            label: 'Image 3 - Right Inner Arch (Quarter Dome)',
            required: false,
            admin: {
              width: '50%',
              description: 'Large dome arch; top quarter visible, 3/4 cropped at section bottom.',
            },
          },
          {
            name: 'image4',
            type: 'upload',
            relationTo: 'media',
            label: 'Image 4 - Right Outer Capsule (Full Pill)',
            required: false,
            admin: {
              width: '50%',
              description: 'Upright stadium/capsule shape on the far right. Matches Image 1.',
            },
          },
        ],
      },
    ],
  },
]

export const ReadyToGrow: Block = {
  slug: 'readyToGrow',
  interfaceName: 'ReadyToGrowBlock',
  fields: readyToGrowFields,
}
