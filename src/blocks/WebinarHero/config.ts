import { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { fontSizeOptions, fontWeightOptions, spacingOptions } from '../CenteredContent/config'

export const WebinarHero: Block = {
  slug: 'webinarHero',
  labels: {
    singular: 'Webinar Hero Section',
    plural: 'Webinar Hero Sections',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ═══════════════════════════════════════════════════════════════════════
        // TAB 1: 📝 CONTENT & MEDIA (STRICTLY PURE CONTENT)
        // ═══════════════════════════════════════════════════════════════════════
        {
          label: '📝 Content & Media',
          fields: [
            // Left Column Content
            {
              type: 'group',
              name: 'leftCol',
              label: 'Left Column Content',
              fields: [
                {
                  name: 'kickerText',
                  type: 'text',
                  label: 'Sub-Header / Kicker Tag',
                  defaultValue: '316 GROUP AT ESMO 2026',
                },
                {
                  name: 'heading',
                  type: 'textarea',
                  label: 'Main Heading (Supports linebreaks & inline HTML)',
                  defaultValue: 'Translating oncology\ninnovation into real-world\nimpact',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description Summary Copy',
                  defaultValue:
                    "A shared ambition. A meaningful conversation. Join 316 Group in Madrid to explore what's next for healthcare.",
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'dateText',
                      type: 'text',
                      label: 'Date Display Text',
                      defaultValue: '23 October 2026, 10:30am BST',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'locationText',
                      type: 'text',
                      label: 'Location / Format Text',
                      defaultValue: 'Online Webinar',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'button1Text',
                      type: 'text',
                      label: 'Button 1 Text (Solid Pill)',
                      defaultValue: 'Register',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'button1Link',
                      type: 'text',
                      label: 'Button 1 URL',
                      defaultValue: '#register',
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
                      label: 'Button 2 Text (Transparent Link)',
                      defaultValue: 'See what you will gain!',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'button2Link',
                      type: 'text',
                      label: 'Button 2 URL',
                      defaultValue: '#gain',
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // Right Column Card Content
            {
              type: 'group',
              name: 'cardCol',
              label: 'Right Column Dual-Section Card Content',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'cardIcon',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Card Brand Icon / Logo (Optional SVG/PNG)',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'cardSubText',
                      type: 'text',
                      label: 'Card Brand Subtext',
                      defaultValue: '316group',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'cardHeading',
                  type: 'textarea',
                  label: 'Card Heading Text',
                  defaultValue: 'We back disruptive\nproducts and founders in retail',
                },
                {
                  name: 'speakers',
                  type: 'array',
                  label: 'Card Speakers / Highlight Items (Up to 3)',
                  minRows: 1,
                  maxRows: 6,
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Speaker Photo / Avatar',
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'name',
                          type: 'text',
                          label: 'Speaker Name / Subhead',
                          defaultValue: 'John Flanery',
                          admin: { width: '50%' },
                        },
                        {
                          name: 'flag',
                          type: 'select',
                          label: 'Country Flag Badge',
                          defaultValue: 'uk',
                          options: [
                            { label: 'United Kingdom (UK)', value: 'uk' },
                            { label: 'Kenya (KE)', value: 'ke' },
                            { label: 'United States (US)', value: 'us' },
                            { label: 'European Union (EU)', value: 'eu' },
                            { label: 'Germany (DE)', value: 'de' },
                            { label: 'Spain (ES)', value: 'es' },
                            { label: 'None', value: 'none' },
                          ],
                          admin: { width: '50%' },
                        },
                      ],
                    },
                    {
                      name: 'role',
                      type: 'text',
                      label: 'Speaker Role / Position',
                      defaultValue: 'Senior Sales Manager',
                    },
                  ],
                },
                {
                  name: 'featuredCardImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Right Part Featured Lifestyle Photo (Founders / Smartphone)',
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
            // Left Column: Kicker Styling
            {
              type: 'group',
              name: 'kickerStyles',
              label: '1. Left Column: Kicker Sub-Header Styling',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'squareColor',
                    label: 'Accent Graphic Square Color',
                    defaultValue: 'bg-[#00F0FF]',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'textColor',
                    label: 'Kicker Text Color',
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
                      defaultValue: 'mb-4 md:mb-5',
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

            // Left Column: Heading Styling
            {
              type: 'group',
              name: 'headingStyles',
              label: '2. Left Column: Main Heading Styling',
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
                      defaultValue: 'mb-6 md:mb-8',
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

            // Left Column: Description Styling
            {
              type: 'group',
              name: 'descriptionStyles',
              label: '3. Left Column: Description Styling',
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

            // Left Column: Date & Location Styling
            {
              type: 'group',
              name: 'metadataStyles',
              label: '4. Left Column: Date & Location Row Styling',
              fields: [
                {
                  type: 'row',
                  fields: [
                    textColorPickerAll({
                      overrides: {
                        name: 'dateTextColor',
                        label: 'Date Text Color',
                        defaultValue: 'text-white',
                        admin: { width: '33%' },
                      },
                    }),
                    bgColorPickerAll({
                      overrides: {
                        name: 'dividerColor',
                        label: 'Vertical Divider Color',
                        defaultValue: 'bg-white/40',
                        admin: { width: '33%' },
                      },
                    }),
                    textColorPickerAll({
                      overrides: {
                        name: 'locationTextColor',
                        label: 'Location Text Color',
                        defaultValue: 'text-white',
                        admin: { width: '34%' },
                      },
                    }),
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'fontSizeDesktop',
                      type: 'select',
                      label: 'Font Size (Desktop)',
                      defaultValue: 'text-sm md:text-base',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'fontSizeMobile',
                      type: 'select',
                      label: 'Font Size (Mobile)',
                      defaultValue: 'text-xs sm:text-sm',
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

            // Left Column: Buttons Styling
            {
              type: 'group',
              name: 'buttonsStyles',
              label: '5. Left Column: Action Buttons Styling',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'button1BgColor',
                    label: 'Button 1 Background Color',
                    defaultValue: 'bg-white',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'button1TextColor',
                    label: 'Button 1 Text Color',
                    defaultValue: 'text-[#0256FF]',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'button1IconColor',
                    label: 'Button 1 Icon Color',
                    defaultValue: 'text-[#0256FF]',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'button2TextColor',
                    label: 'Button 2 Text Color (Transparent Link)',
                    defaultValue: 'text-white',
                  },
                }),
              ],
            },

            // Right Column Card: Sub-Header & Heading Styling
            {
              type: 'group',
              name: 'cardStyles',
              label: '6. Right Column: Card Subhead & Heading Styling',
              fields: [
                textColorPickerAll({
                  overrides: {
                    name: 'subTextColor',
                    label: 'Subtext Color',
                    defaultValue: 'text-white',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'subTextFontSizeDesktop',
                      type: 'select',
                      label: 'Subtext Font Size (Desktop)',
                      defaultValue: 'text-sm md:text-base',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'subTextFontSizeMobile',
                      type: 'select',
                      label: 'Subtext Font Size (Mobile)',
                      defaultValue: 'text-xs sm:text-sm',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'subTextMarginBottomDesktop',
                      type: 'select',
                      label: 'Subtext Margin Bottom (Desktop)',
                      defaultValue: 'mb-6 md:mb-8',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'subTextMarginBottomMobile',
                      type: 'select',
                      label: 'Subtext Margin Bottom (Mobile)',
                      defaultValue: 'mb-4',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                textColorPickerAll({
                  overrides: {
                    name: 'headingTextColor',
                    label: 'Card Heading Color',
                    defaultValue: 'text-white',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'headingFontSizeDesktop',
                      type: 'select',
                      label: 'Card Heading Font Size (Desktop)',
                      defaultValue: 'text-2xl sm:text-3xl lg:text-4xl',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'headingFontSizeMobile',
                      type: 'select',
                      label: 'Card Heading Font Size (Mobile)',
                      defaultValue: 'text-xl sm:text-2xl',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'headingFontWeightDesktop',
                      type: 'select',
                      label: 'Card Heading Font Weight (Desktop)',
                      defaultValue: 'font-bold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'headingFontWeightMobile',
                      type: 'select',
                      label: 'Card Heading Font Weight (Mobile)',
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
                      name: 'headingMarginBottomDesktop',
                      type: 'select',
                      label: 'Card Heading Margin Bottom (Desktop)',
                      defaultValue: 'mb-8 md:mb-10',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'headingMarginBottomMobile',
                      type: 'select',
                      label: 'Card Heading Margin Bottom (Mobile)',
                      defaultValue: 'mb-6',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // Right Column Card: Speakers Highlight Styling
            {
              type: 'group',
              name: 'speakerStyles',
              label: '7. Right Column: Speakers Typography & Spacing',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'imageMarginBottomDesktop',
                      type: 'select',
                      label: 'Avatar Margin Bottom (Desktop)',
                      defaultValue: 'mb-3',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'imageMarginBottomMobile',
                      type: 'select',
                      label: 'Avatar Margin Bottom (Mobile)',
                      defaultValue: 'mb-2',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                textColorPickerAll({
                  overrides: {
                    name: 'nameTextColor',
                    label: 'Speaker Name Color',
                    defaultValue: 'text-white',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'nameFontSizeDesktop',
                      type: 'select',
                      label: 'Speaker Name Font Size (Desktop)',
                      defaultValue: 'text-sm md:text-base',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'nameFontSizeMobile',
                      type: 'select',
                      label: 'Speaker Name Font Size (Mobile)',
                      defaultValue: 'text-xs sm:text-sm',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'nameFontWeightDesktop',
                      type: 'select',
                      label: 'Speaker Name Font Weight (Desktop)',
                      defaultValue: 'font-semibold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'nameFontWeightMobile',
                      type: 'select',
                      label: 'Speaker Name Font Weight (Mobile)',
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
                      name: 'nameMarginBottomDesktop',
                      type: 'select',
                      label: 'Speaker Name Margin Bottom (Desktop)',
                      defaultValue: 'mb-1',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'nameMarginBottomMobile',
                      type: 'select',
                      label: 'Speaker Name Margin Bottom (Mobile)',
                      defaultValue: 'mb-0.5',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                textColorPickerAll({
                  overrides: {
                    name: 'roleTextColor',
                    label: 'Speaker Role Text Color',
                    defaultValue: 'text-slate-400',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'roleFontSizeDesktop',
                      type: 'select',
                      label: 'Speaker Role Font Size (Desktop)',
                      defaultValue: 'text-xs md:text-sm',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'roleFontSizeMobile',
                      type: 'select',
                      label: 'Speaker Role Font Size (Mobile)',
                      defaultValue: 'text-xs',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
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
                  'Locks content container to max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8, aligning with the global site header.',
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
                  label: 'Section Padding Top (e.g. pt-16 md:pt-20)',
                  defaultValue: 'pt-16 md:pt-20',
                  admin: { width: '50%' },
                },
                {
                  name: 'paddingBottom',
                  type: 'text',
                  label: 'Section Padding Bottom (e.g. pb-16 md:pb-24)',
                  defaultValue: 'pb-16 md:pb-24',
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
                  label: 'Custom Section Padding Left (when Match Header is off)',
                  defaultValue: 'pl-6 md:pl-12',
                  admin: { width: '50%' },
                },
                {
                  name: 'paddingRight',
                  type: 'text',
                  label: 'Custom Section Padding Right (when Match Header is off)',
                  defaultValue: 'pr-6 md:pr-12',
                  admin: { width: '50%' },
                },
              ],
            },
            // Card Internal Padding Controls
            {
              type: 'group',
              name: 'cardInnerPadding',
              label: 'Dual-Section Card Internal Padding',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'cardPaddingTop',
                      type: 'text',
                      label: 'Card Padding Top (e.g. pt-6 md:pt-8)',
                      defaultValue: 'pt-6 md:pt-8',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'cardPaddingBottom',
                      type: 'text',
                      label: 'Card Padding Bottom (e.g. pb-6 md:pb-8)',
                      defaultValue: 'pb-6 md:pb-8',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'cardPaddingLeft',
                      type: 'text',
                      label: 'Card Padding Left (e.g. pl-6 md:pl-8)',
                      defaultValue: 'pl-6 md:pl-8',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'cardPaddingRight',
                      type: 'text',
                      label: 'Card Padding Right (e.g. pr-6 md:pr-8)',
                      defaultValue: 'pr-6 md:pr-8',
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
