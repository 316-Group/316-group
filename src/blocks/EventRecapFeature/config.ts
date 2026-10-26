import { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { fontSizeOptions, fontWeightOptions, spacingOptions } from '../CenteredContent/config'

export const EventRecapFeature: Block = {
  slug: 'eventRecapFeature',
  labels: {
    singular: 'Event Recap 2-Column Feature Section',
    plural: 'Event Recap 2-Column Feature Sections',
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
              defaultValue: 'FULFILMENT BY 316',
            },
            {
              name: 'heading',
              type: 'richText',
              label: 'Heading',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
              admin: {
                description: 'Main feature heading. Supports inline styling and line breaks.',
              },
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Description Copy',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
            },
            // Action Buttons
            {
              type: 'row',
              fields: [
                {
                  name: 'button1Text',
                  type: 'text',
                  label: 'Button 1 Text (Solid Pill)',
                  defaultValue: 'Book a meeting',
                  admin: { width: '50%' },
                },
                {
                  name: 'button1Link',
                  type: 'text',
                  label: 'Button 1 Link URL',
                  defaultValue: '',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'button2Text',
                  type: 'text',
                  label: 'Button 2 Text (Text Link)',
                  defaultValue: 'Learn more',
                  admin: { width: '50%' },
                },
                {
                  name: 'button2Link',
                  type: 'text',
                  label: 'Button 2 Link URL',
                  defaultValue: '',
                  admin: { width: '50%' },
                },
              ],
            },
            // Featured Card Image
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Featured Image (Right Column Card)',
            },
          ],
        },

        // ═══════════════════════════════════════════════════════════════════════
        // TAB 2: 🎨 INDIVIDUAL STYLING
        // ═══════════════════════════════════════════════════════════════════════
        {
          label: '🎨 Individual Styling',
          fields: [
            // Badge Styling
            {
              type: 'group',
              name: 'badgeStyles',
              label: '1. Pill Badge Styling',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'badgeBgColor',
                    label: 'Badge Background Color',
                    defaultValue: 'bg-white',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'badgeTextColor',
                    label: 'Badge Text Color',
                    defaultValue: 'text-[#0256FF]',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'marginBottomDesktop',
                      type: 'select',
                      label: 'Badge Margin Bottom (Desktop)',
                      defaultValue: 'mb-6',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'marginBottomMobile',
                      type: 'select',
                      label: 'Badge Margin Bottom (Mobile)',
                      defaultValue: 'mb-4',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // Heading Styling
            {
              type: 'group',
              name: 'headingStyles',
              label: '2. Heading Styling',
              fields: [
                textColorPickerAll({
                  overrides: {
                    name: 'textColor',
                    label: 'Heading Text Color',
                    defaultValue: 'text-gray-950',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'fontSizeDesktop',
                      type: 'select',
                      label: 'Font Size (Desktop)',
                      defaultValue: 'text-4xl md:text-5xl',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'fontSizeMobile',
                      type: 'select',
                      label: 'Font Size (Mobile)',
                      defaultValue: 'text-3xl',
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
                      defaultValue: 'mb-6',
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

            // Description Styling
            {
              type: 'group',
              name: 'descriptionStyles',
              label: '3. Description Styling',
              fields: [
                textColorPickerAll({
                  overrides: {
                    name: 'textColor',
                    label: 'Description Text Color',
                    defaultValue: 'text-slate-600',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'fontSizeDesktop',
                      type: 'select',
                      label: 'Font Size (Desktop)',
                      defaultValue: 'text-base md:text-lg',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'fontSizeMobile',
                      type: 'select',
                      label: 'Font Size (Mobile)',
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
                      defaultValue: 'mb-6',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // Button 1 Styling
            {
              type: 'group',
              name: 'button1Styles',
              label: '4. Button 1 (Solid Pill) Styling',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'bgColor',
                    label: 'Button 1 Background Color',
                    defaultValue: 'bg-[#0256FF]',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'textColor',
                    label: 'Button 1 Text Color',
                    defaultValue: 'text-white',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'iconColor',
                    label: 'Button 1 Icon Color',
                    defaultValue: 'text-white',
                  },
                }),
              ],
            },

            // Button 2 Styling
            {
              type: 'group',
              name: 'button2Styles',
              label: '5. Button 2 (Text Link) Styling',
              fields: [
                textColorPickerAll({
                  overrides: {
                    name: 'textColor',
                    label: 'Button 2 Text Color',
                    defaultValue: 'text-gray-950',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'iconColor',
                    label: 'Button 2 Icon Color',
                    defaultValue: 'text-[#0256FF]',
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
              label: 'Match Header Width (Container: Max 1,472px)',
              defaultValue: true,
            },
            bgColorPickerAll({
              overrides: {
                name: 'sectionBgColor',
                label: 'Section Background Color',
                defaultValue: 'bg-[#F4F6F9]',
              },
            }),
            {
              type: 'row',
              fields: [
                {
                  name: 'paddingTop',
                  type: 'text',
                  label: 'Padding Top (e.g. pt-20 md:pt-28)',
                  defaultValue: 'pt-20 md:pt-28',
                  admin: { width: '50%' },
                },
                {
                  name: 'paddingBottom',
                  type: 'text',
                  label: 'Padding Bottom (e.g. pb-20 md:pb-28)',
                  defaultValue: 'pb-20 md:pb-28',
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
