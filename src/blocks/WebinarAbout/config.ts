import { Block } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { fontSizeOptions, fontWeightOptions, spacingOptions } from '../CenteredContent/config'

const marginTopOptions = [
  { label: 'None (0)', value: 'mt-0' },
  { label: 'Small (mt-4)', value: 'mt-4' },
  { label: 'Medium (mt-6)', value: 'mt-6' },
  { label: 'Large (mt-8)', value: 'mt-8' },
  { label: 'Responsive Large to 2X Large (mt-8 md:mt-12)', value: 'mt-8 md:mt-12' },
  { label: 'Extra Large (mt-10)', value: 'mt-10' },
  { label: '2X Large (mt-12 md:mt-16)', value: 'mt-12 md:mt-16' },
]

export const WebinarAbout: Block = {
  slug: 'webinarAbout',
  labels: {
    singular: 'Webinar About Section',
    plural: 'Webinar About Sections',
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
            // Zone 1: Top Bar Content
            {
              type: 'group',
              name: 'topBar',
              label: '1. Top Bar Header',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Top Bar Title',
                      defaultValue: 'About this webinar',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'meta',
                      type: 'text',
                      label: 'Top Bar Right Metadata (Date / Time)',
                      defaultValue: 'January Nov 24, 2026. 10:30AM BST',
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // Zone 3: Introduction Group Content
            {
              type: 'group',
              name: 'intro',
              label: '2. Introduction Group',
              fields: [
                {
                  name: 'kickerText',
                  type: 'text',
                  label: 'Kicker Tag Text',
                  defaultValue: 'INTRODUCTION',
                },
                {
                  name: 'heading',
                  type: 'textarea',
                  label: 'Main Heading (Supports linebreaks & inline HTML)',
                  defaultValue: 'Why this is important',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description Summary Copy',
                  defaultValue:
                    "Hiring internationally shouldn't mean setting up an entity, stitching together local vendors, or carrying the compliance risk yourself. In this live 30-minute session, see how G-P Employer of Record makes it possible to hire, onboard, and manage employees in 180+ countries without any of that complexity.",
                },
              ],
            },

            // Zone 4: "What We Will Cover" Curriculum Content
            {
              type: 'group',
              name: 'coverage',
              label: '3. "What We Will Cover" Curriculum',
              fields: [
                {
                  name: 'kickerText',
                  type: 'text',
                  label: 'Kicker Tag Text',
                  defaultValue: 'WHAT WE WILL COVER',
                },
                {
                  name: 'heading',
                  type: 'textarea',
                  label: 'Curriculum Heading',
                  defaultValue: "We'll walk you through FintecConnect and cover:",
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Curriculum List Items',
                  minRows: 1,
                  maxRows: 12,
                  fields: [
                    {
                      name: 'boldPrefix',
                      type: 'text',
                      label: 'Bold Lead Title (Optional)',
                      admin: {
                        description: 'Bold text shown at start of item (e.g. "How FintecConnect works.")',
                      },
                    },
                    {
                      name: 'text',
                      type: 'textarea',
                      label: 'Item Body Copy',
                      required: true,
                    },
                  ],
                },
              ],
            },

            // Zone 5: Concluding Narrative Content
            {
              type: 'group',
              name: 'concluding',
              label: '4. Concluding Narrative & Stakeholder Takeaways',
              fields: [
                {
                  name: 'text',
                  type: 'textarea',
                  label: 'Concluding Text (Supports paragraph breaks & inline HTML)',
                  defaultValue:
                    "G-P also supports the wider global employment journey with G-P Gia for instant compliance answers and Contractor for international contractor management, so as your needs evolve, our Global Employment Platform evolves with you.\n\nBring your HR, finance, and legal stakeholders. Come with questions. Leave with a clear view of what global hiring looks like when it's done right.",
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
            // Top Bar Styles
            {
              type: 'group',
              name: 'topBarStyles',
              label: '1. Top Bar Styling',
              fields: [
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
                      defaultValue: 'text-2xl md:text-3xl lg:text-4xl',
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
                textColorPickerAll({
                  overrides: {
                    name: 'metaColor',
                    label: 'Right Metadata Text Color',
                    defaultValue: 'text-gray-500',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'metaFontSizeDesktop',
                      type: 'select',
                      label: 'Metadata Font Size (Desktop)',
                      defaultValue: 'text-xs sm:text-sm',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'metaFontSizeMobile',
                      type: 'select',
                      label: 'Metadata Font Size (Mobile)',
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
                      name: 'metaFontWeightDesktop',
                      type: 'select',
                      label: 'Metadata Font Weight (Desktop)',
                      defaultValue: 'font-normal',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'metaFontWeightMobile',
                      type: 'select',
                      label: 'Metadata Font Weight (Mobile)',
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
                      label: 'Top Bar Margin Bottom (Desktop)',
                      defaultValue: 'mb-4 md:mb-6',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'marginBottomMobile',
                      type: 'select',
                      label: 'Top Bar Margin Bottom (Mobile)',
                      defaultValue: 'mb-4',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // HR Line Styles
            {
              type: 'group',
              name: 'hrStyles',
              label: '2. Horizontal Divider Line Styling',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'lineColor',
                    label: 'Divider Line Color',
                    defaultValue: 'bg-slate-300',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'lineHeight',
                      type: 'select',
                      label: 'Line Height / Thickness',
                      defaultValue: 'h-px',
                      options: [
                        { label: 'Thin (1px)', value: 'h-px' },
                        { label: 'Medium (2px)', value: 'h-[2px]' },
                        { label: 'Thick (3px)', value: 'h-[3px]' },
                      ],
                      admin: { width: '50%' },
                    },
                    {
                      name: 'marginBottomDesktop',
                      type: 'select',
                      label: 'Divider Margin Bottom (Desktop)',
                      defaultValue: 'mb-8 md:mb-12',
                      options: spacingOptions,
                      admin: { width: '25%' },
                    },
                    {
                      name: 'marginBottomMobile',
                      type: 'select',
                      label: 'Divider Margin Bottom (Mobile)',
                      defaultValue: 'mb-6',
                      options: spacingOptions,
                      admin: { width: '25%' },
                    },
                  ],
                },
              ],
            },

            // Introduction Styles
            {
              type: 'group',
              name: 'introStyles',
              label: '3. Introduction Styling',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'squareColor',
                    label: 'Accent Square Color',
                    defaultValue: 'bg-[#0056FF]',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'kickerColor',
                    label: 'Kicker Text Color',
                    defaultValue: 'text-[#0056FF]',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'kickerFontSizeDesktop',
                      type: 'select',
                      label: 'Kicker Font Size (Desktop)',
                      defaultValue: 'text-xs md:text-sm',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'kickerFontSizeMobile',
                      type: 'select',
                      label: 'Kicker Font Size (Mobile)',
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
                      name: 'kickerFontWeightDesktop',
                      type: 'select',
                      label: 'Kicker Font Weight (Desktop)',
                      defaultValue: 'font-semibold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'kickerFontWeightMobile',
                      type: 'select',
                      label: 'Kicker Font Weight (Mobile)',
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
                      name: 'kickerMarginBottomDesktop',
                      type: 'select',
                      label: 'Kicker Margin Bottom (Desktop)',
                      defaultValue: 'mb-3 md:mb-4',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'kickerMarginBottomMobile',
                      type: 'select',
                      label: 'Kicker Margin Bottom (Mobile)',
                      defaultValue: 'mb-3',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                textColorPickerAll({
                  overrides: {
                    name: 'headingColor',
                    label: 'Heading Text Color',
                    defaultValue: 'text-gray-950',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'headingFontSizeDesktop',
                      type: 'select',
                      label: 'Heading Font Size (Desktop)',
                      defaultValue: 'text-3xl md:text-4xl lg:text-5xl',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'headingFontSizeMobile',
                      type: 'select',
                      label: 'Heading Font Size (Mobile)',
                      defaultValue: 'text-2xl sm:text-3xl',
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
                      label: 'Heading Font Weight (Desktop)',
                      defaultValue: 'font-bold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'headingFontWeightMobile',
                      type: 'select',
                      label: 'Heading Font Weight (Mobile)',
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
                      label: 'Heading Margin Bottom (Desktop)',
                      defaultValue: 'mb-4 md:mb-6',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'headingMarginBottomMobile',
                      type: 'select',
                      label: 'Heading Margin Bottom (Mobile)',
                      defaultValue: 'mb-4',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                textColorPickerAll({
                  overrides: {
                    name: 'descColor',
                    label: 'Description Text Color',
                    defaultValue: 'text-gray-700',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'descFontSizeDesktop',
                      type: 'select',
                      label: 'Description Font Size (Desktop)',
                      defaultValue: 'text-base md:text-lg',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'descFontSizeMobile',
                      type: 'select',
                      label: 'Description Font Size (Mobile)',
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
                      name: 'descFontWeightDesktop',
                      type: 'select',
                      label: 'Description Font Weight (Desktop)',
                      defaultValue: 'font-normal',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'descFontWeightMobile',
                      type: 'select',
                      label: 'Description Font Weight (Mobile)',
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
                      name: 'descMarginBottomDesktop',
                      type: 'select',
                      label: 'Description Margin Bottom (Desktop)',
                      defaultValue: 'mb-10 md:mb-14',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'descMarginBottomMobile',
                      type: 'select',
                      label: 'Description Margin Bottom (Mobile)',
                      defaultValue: 'mb-8',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // Coverage Styles
            {
              type: 'group',
              name: 'coverageStyles',
              label: '4. "What We Will Cover" Curriculum Styling',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'squareColor',
                    label: 'Kicker Accent Square Color',
                    defaultValue: 'bg-[#0056FF]',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'kickerColor',
                    label: 'Kicker Text Color',
                    defaultValue: 'text-[#0056FF]',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'kickerFontSizeDesktop',
                      type: 'select',
                      label: 'Kicker Font Size (Desktop)',
                      defaultValue: 'text-xs md:text-sm',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'kickerFontSizeMobile',
                      type: 'select',
                      label: 'Kicker Font Size (Mobile)',
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
                      name: 'kickerFontWeightDesktop',
                      type: 'select',
                      label: 'Kicker Font Weight (Desktop)',
                      defaultValue: 'font-semibold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'kickerFontWeightMobile',
                      type: 'select',
                      label: 'Kicker Font Weight (Mobile)',
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
                      name: 'kickerMarginBottomDesktop',
                      type: 'select',
                      label: 'Kicker Margin Bottom (Desktop)',
                      defaultValue: 'mb-3 md:mb-4',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'kickerMarginBottomMobile',
                      type: 'select',
                      label: 'Kicker Margin Bottom (Mobile)',
                      defaultValue: 'mb-3',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                textColorPickerAll({
                  overrides: {
                    name: 'headingColor',
                    label: 'Heading Text Color',
                    defaultValue: 'text-gray-950',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'headingFontSizeDesktop',
                      type: 'select',
                      label: 'Heading Font Size (Desktop)',
                      defaultValue: 'text-3xl md:text-4xl lg:text-5xl',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'headingFontSizeMobile',
                      type: 'select',
                      label: 'Heading Font Size (Mobile)',
                      defaultValue: 'text-2xl sm:text-3xl',
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
                      label: 'Heading Font Weight (Desktop)',
                      defaultValue: 'font-bold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'headingFontWeightMobile',
                      type: 'select',
                      label: 'Heading Font Weight (Mobile)',
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
                      label: 'Heading Margin Bottom (Desktop)',
                      defaultValue: 'mb-6 md:mb-8',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'headingMarginBottomMobile',
                      type: 'select',
                      label: 'Heading Margin Bottom (Mobile)',
                      defaultValue: 'mb-5',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                bgColorPickerAll({
                  overrides: {
                    name: 'bulletBoxColor',
                    label: 'List Bullet Box Color',
                    defaultValue: 'bg-[#0056FF]',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'itemTextColor',
                    label: 'List Item Text Color',
                    defaultValue: 'text-gray-800',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'itemFontSizeDesktop',
                      type: 'select',
                      label: 'Item Font Size (Desktop)',
                      defaultValue: 'text-base md:text-lg',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'itemFontSizeMobile',
                      type: 'select',
                      label: 'Item Font Size (Mobile)',
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
                      name: 'itemFontWeightDesktop',
                      type: 'select',
                      label: 'Item Font Weight (Desktop)',
                      defaultValue: 'font-normal',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'itemFontWeightMobile',
                      type: 'select',
                      label: 'Item Font Weight (Mobile)',
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
                      name: 'itemMarginBottomDesktop',
                      type: 'select',
                      label: 'Item Margin Bottom (Desktop)',
                      defaultValue: 'mb-4 md:mb-6',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'itemMarginBottomMobile',
                      type: 'select',
                      label: 'Item Margin Bottom (Mobile)',
                      defaultValue: 'mb-4',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // Concluding Narrative Styles
            {
              type: 'group',
              name: 'concludingStyles',
              label: '5. Concluding Narrative Styling',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'marginTopDesktop',
                      type: 'select',
                      label: 'Margin Top (Desktop)',
                      defaultValue: 'mt-8 md:mt-12',
                      options: marginTopOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'marginTopMobile',
                      type: 'select',
                      label: 'Margin Top (Mobile)',
                      defaultValue: 'mt-6',
                      options: marginTopOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                textColorPickerAll({
                  overrides: {
                    name: 'textColor',
                    label: 'Concluding Text Color',
                    defaultValue: 'text-gray-700',
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
                defaultValue: 'bg-white',
              },
            }),
            {
              type: 'row',
              fields: [
                {
                  name: 'paddingTop',
                  type: 'text',
                  label: 'Section Padding Top (e.g. pt-16 md:pt-24)',
                  defaultValue: 'pt-16 md:pt-24',
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
          ],
        },
      ],
    },
  ],
}
