import { Block } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const spacingOptions = [
  { label: 'None (0)', value: 'mb-0' },
  { label: 'Extra Small (mb-1)', value: 'mb-1' },
  { label: 'Small (mb-2)', value: 'mb-2' },
  { label: 'Small-Medium (mb-3)', value: 'mb-3' },
  { label: 'Medium (mb-4)', value: 'mb-4' },
  { label: 'Medium-Large (mb-5)', value: 'mb-5' },
  { label: 'Large (mb-6)', value: 'mb-6' },
  { label: 'Extra Large (mb-8)', value: 'mb-8' },
  { label: '2X Large (mb-10)', value: 'mb-10' },
  { label: '3X Large (mb-12 md:mb-16)', value: 'mb-12 md:mb-16' },
]

export const WebinarCTA: Block = {
  slug: 'webinarCTA',
  labels: {
    singular: 'Webinar Section 4: Concluding CTA',
    plural: 'Webinar Section 4: Concluding CTAs',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ═══════════════════════════════════════════════════════════════════════
        // TAB 1: 📝 CONTENT & MEDIA
        // ═══════════════════════════════════════════════════════════════════════
        {
          label: '📝 Content & Media',
          fields: [
            {
              name: 'badgeText',
              type: 'text',
              label: 'Pill Badge Text',
              defaultValue: 'Ready to grow?',
            },
            {
              name: 'heading',
              type: 'textarea',
              label: 'Main Heading Display Text',
              defaultValue: "Let's build what comes next, together.",
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description Copy (Supports inline styling and line breaks)',
              defaultValue:
                'Explore solutions, discuss partnerships or connect with\none of our specialist businesses.',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'buttonText',
                  type: 'text',
                  label: 'Action Button Label',
                  defaultValue: 'Talk to our experts',
                  admin: { width: '50%' },
                },
                {
                  name: 'buttonLink',
                  type: 'text',
                  label: 'Action Button Link URL',
                  defaultValue: '/contact',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // TAB 2: 🎨 INDIVIDUAL STYLING
        // ═══════════════════════════════════════════════════════════════════════
        {
          label: '🎨 Individual Styling',
          fields: [
            // 1. Pill Badge Styling
            {
              type: 'group',
              name: 'badgeStyles',
              label: '1. Pill Badge Styling',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'bgColor',
                    label: 'Badge Background Color',
                    defaultValue: 'bg-blue-600/50',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'textColor',
                    label: 'Badge Text Color',
                    defaultValue: 'text-white',
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
                      defaultValue: 'font-semibold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'fontWeightMobile',
                      type: 'select',
                      label: 'Font Weight (Mobile)',
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
                      name: 'marginBottomDesktop',
                      type: 'select',
                      label: 'Margin Bottom (Desktop)',
                      defaultValue: 'mb-6 md:mb-8',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'marginBottomMobile',
                      type: 'select',
                      label: 'Margin Bottom (Mobile)',
                      defaultValue: 'mb-5',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // 2. Main Heading Styling
            {
              type: 'group',
              name: 'headingStyles',
              label: '2. Main Heading Styling',
              fields: [
                textColorPickerAll({
                  overrides: {
                    name: 'textColor',
                    label: 'Heading Text Color',
                    defaultValue: 'text-white',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'fontSizeDesktop',
                      type: 'select',
                      label: 'Font Size (Desktop)',
                      defaultValue: 'text-4xl sm:text-5xl lg:text-6xl',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'fontSizeMobile',
                      type: 'select',
                      label: 'Font Size (Mobile)',
                      defaultValue: 'text-3xl sm:text-4xl',
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
                      defaultValue: 'font-bold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'fontWeightMobile',
                      type: 'select',
                      label: 'Font Weight (Mobile)',
                      defaultValue: 'font-bold',
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
                      label: 'Margin Bottom (Desktop)',
                      defaultValue: 'mb-5 md:mb-6',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'marginBottomMobile',
                      type: 'select',
                      label: 'Margin Bottom (Mobile)',
                      defaultValue: 'mb-4',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // 3. Description Copy Styling
            {
              type: 'group',
              name: 'descriptionStyles',
              label: '3. Description Copy Styling',
              fields: [
                textColorPickerAll({
                  overrides: {
                    name: 'textColor',
                    label: 'Description Text Color',
                    defaultValue: 'text-white/90',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'fontSizeDesktop',
                      type: 'select',
                      label: 'Font Size (Desktop)',
                      defaultValue: 'text-base sm:text-lg md:text-xl',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'fontSizeMobile',
                      type: 'select',
                      label: 'Font Size (Mobile)',
                      defaultValue: 'text-base',
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
                      label: 'Margin Bottom (Desktop)',
                      defaultValue: 'mb-8 md:mb-10',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'marginBottomMobile',
                      type: 'select',
                      label: 'Margin Bottom (Mobile)',
                      defaultValue: 'mb-8',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // 4. Action Button Styling
            {
              type: 'group',
              name: 'buttonStyles',
              label: '4. Action Button Styling',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'bgColor',
                    label: 'Button Background Color',
                    defaultValue: 'bg-white',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'textColor',
                    label: 'Button Text Color',
                    defaultValue: 'text-gray-950',
                  },
                }),
                bgColorPickerAll({
                  overrides: {
                    name: 'iconBgColor',
                    label: 'Circular Icon Badge Background Color',
                    defaultValue: 'bg-[#0000FF]',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'iconColor',
                    label: 'Arrow Icon Color',
                    defaultValue: 'text-white',
                  },
                }),
              ],
            },
          ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // TAB 3: ⚙️ SECTION LAYOUT & SPACING
        // ═══════════════════════════════════════════════════════════════════════
        {
          label: '⚙️ Section Layout & Spacing',
          fields: [
            {
              name: 'matchHeaderPillWidth',
              type: 'checkbox',
              label: 'Match Header Width (Align with Logo & Nav, Max 1472px)',
              defaultValue: true,
              admin: {
                description:
                  'Locks content width to 1,472px (max-w-screen-2xl) aligning with the global site header.',
              },
            },
            bgColorPickerAll({
              overrides: {
                name: 'sectionBgColor',
                label: 'Section Background Color',
                defaultValue: 'bg-[#0000FF]',
              },
            }),
            {
              type: 'row',
              fields: [
                {
                  name: 'paddingTop',
                  type: 'text',
                  label: 'Padding Top (e.g. pt-20 md:pt-32)',
                  defaultValue: 'pt-20 md:pt-32',
                  admin: { width: '50%' },
                },
                {
                  name: 'paddingBottom',
                  type: 'text',
                  label: 'Padding Bottom (e.g. pb-20 md:pb-32)',
                  defaultValue: 'pb-20 md:pb-32',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              admin: {
                condition: (_, siblingData) => !siblingData?.matchHeaderPillWidth,
              },
              fields: [
                {
                  name: 'paddingLeft',
                  type: 'text',
                  label: 'Padding Left (when header match is off)',
                  defaultValue: 'pl-6 md:pl-12',
                  admin: { width: '50%' },
                },
                {
                  name: 'paddingRight',
                  type: 'text',
                  label: 'Padding Right (when header match is off)',
                  defaultValue: 'pr-6 md:pr-12',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
