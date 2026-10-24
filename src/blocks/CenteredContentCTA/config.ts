import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { link } from '@/fields/link'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const allowAnySelect = (() => true as const) as any

export const marginBottomOptions = [
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
  { label: 'Responsive Small (mb-3 md:mb-4)', value: 'mb-3 md:mb-4' },
  { label: 'Responsive Medium-Small (mb-4 md:mb-6)', value: 'mb-4 md:mb-6' },
  { label: 'Responsive Medium-Large (mb-6 md:mb-8)', value: 'mb-6 md:mb-8' },
  { label: 'Responsive Spacious (mb-8 md:mb-10)', value: 'mb-8 md:mb-10' },
]

export const paddingVerticalOptions = [
  { label: 'None (0px)', value: 'py-0' },
  { label: 'Compact (py-12 md:py-16)', value: 'py-12 md:py-16' },
  { label: 'Standard (py-16 md:py-24 - Default)', value: 'py-16 md:py-24' },
  { label: 'Spacious (py-20 md:py-28 lg:py-32)', value: 'py-20 md:py-28 lg:py-32' },
  { label: 'Extra Spacious (py-24 md:py-36)', value: 'py-24 md:py-36' },
]

export const borderRadiusOptions = [
  { label: 'Large (rounded-2xl md:rounded-3xl - Default)', value: 'rounded-2xl md:rounded-3xl' },
  { label: 'Extra Large (rounded-3xl md:rounded-[2.5rem])', value: 'rounded-3xl md:rounded-[2.5rem]' },
  { label: 'Medium (rounded-xl md:rounded-2xl)', value: 'rounded-xl md:rounded-2xl' },
  { label: 'Small (rounded-lg)', value: 'rounded-lg' },
  { label: 'None (rounded-none)', value: 'rounded-none' },
]

export const centeredContentCTAFields: Field[] = [
  // ─── 1. Container & Box Styling ──────────────────────────────────────────
  {
    type: 'collapsible',
    label: '1. Container & Box Geometry (Royal Blue Box)',
    admin: {
      initCollapsed: false,
    },
    fields: [
      {
        type: 'row',
        fields: [
          bgColorPickerAll({
            overrides: {
              name: 'boxBgColor',
              label: 'Box Background Color',
              defaultValue: 'bg-[#0000FF]',
              validate: allowAnySelect,
              admin: {
                width: '50%',
                description: 'Default is royal blue (#0000FF) as in mockup.',
              },
            },
          }),
          {
            name: 'containerBorderRadius',
            type: 'select',
            label: 'Box Border Radius',
            defaultValue: 'rounded-2xl md:rounded-3xl',
            validate: allowAnySelect,
            options: borderRadiusOptions,
            admin: {
              width: '50%',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'paddingVertical',
            type: 'select',
            label: 'Vertical Padding (Top & Bottom)',
            defaultValue: 'py-16 md:py-24',
            validate: allowAnySelect,
            options: paddingVerticalOptions,
            admin: { width: '50%' },
          },
          {
            name: 'matchHeaderPillWidth',
            type: 'checkbox',
            label: 'Match Header Pill Width (Align with Navigation Pill)',
            defaultValue: true,
            admin: {
              width: '50%',
              description: 'When enabled, container aligns with max-w-screen-2xl header pill geometry.',
            },
          },
        ],
      },
    ],
  },

  // ─── 2. Pill Badge ───────────────────────────────────────────────────────
  {
    name: 'badge',
    type: 'group',
    label: '2. Pill Badge ("Ready to grow?")',
    admin: {
      description: 'Top pill badge with customizable text, colors, responsive typography, and spacing.',
    },
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
        defaultValue: 'Ready to grow?',
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
              defaultValue: 'bg-white/10',
              validate: allowAnySelect,
              admin: {
                width: '50%',
                description: 'Semi-translucent light blue glass pill (bg-white/10) by default.',
              },
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
        label: 'Badge Margin Bottom (Space below badge)',
        defaultValue: 'mb-6 md:mb-8',
        validate: allowAnySelect,
        admin: {
          condition: (_, siblingData) => siblingData?.enableBadge !== false,
        },
        options: marginBottomOptions,
      },
    ],
  },

  // ─── 3. Heading ──────────────────────────────────────────────────────────
  {
    name: 'headingGroup',
    type: 'group',
    label: '3. Main Heading ("Let\'s build what comes next, together.")',
    fields: [
      {
        name: 'heading',
        type: 'textarea',
        label: 'Heading Text Content',
        defaultValue: "Let's build what comes next, together.",
        admin: {
          description:
            'Accepts inline styling (e.g. <style="color:#ADE2FF">...</style>) and line breaks (<br />).',
        },
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
            defaultValue: 'mb-4 md:mb-6',
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

  // ─── 4. Description ──────────────────────────────────────────────────────
  {
    name: 'descriptionGroup',
    type: 'group',
    label: '4. Description ("Explore solutions, discuss partnerships...")',
    fields: [
      {
        name: 'description',
        type: 'textarea',
        label: 'Description Text Content',
        defaultValue:
          'Explore solutions, discuss partnerships or connect with\none of our specialist businesses.',
        admin: {
          description:
            'Centered description. Accepts inline styling and line breaks (<br />).',
        },
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
            options: marginBottomOptions,
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
            defaultValue: 'text-base md:text-lg lg:text-xl',
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

  // ─── 5. Action Button ────────────────────────────────────────────────────
  {
    name: 'buttonGroup',
    type: 'group',
    label: '5. Action Button ("Talk to our experts" Capsule with Icon)',
    fields: [
      {
        name: 'buttonText',
        type: 'text',
        label: 'Button Text',
        defaultValue: 'Talk to our experts',
        admin: {
          description: 'Text shown on capsule button. If empty, the button is not rendered.',
        },
      },
      link({
        disableLabel: true,
        appearances: false,
        required: false,
        overrides: {
          name: 'buttonLink',
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
              defaultValue: 'text-[#0000FF]',
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
              label: 'Circle Icon Background Color',
              defaultValue: 'bg-[#0000FF]',
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
            defaultValue: 'text-xs sm:text-sm',
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

export const CenteredContentCTA: Block = {
  slug: 'centeredContentCTA',
  interfaceName: 'CenteredContentCTABlock',
  labels: {
    singular: 'Centered Content CTA',
    plural: 'Centered Content CTAs',
  },
  fields: centeredContentCTAFields,
}
