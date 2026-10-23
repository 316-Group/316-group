import { Block } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const spacingOptions = [
  { label: 'None (0)', value: 'mb-0' },
  { label: 'Extra Small (mb-1 - 4px)', value: 'mb-1' },
  { label: 'Small (mb-2 - 8px)', value: 'mb-2' },
  { label: 'Small-Medium (mb-3 - 12px)', value: 'mb-3' },
  { label: 'Medium (mb-4 - 16px)', value: 'mb-4' },
  { label: 'Medium-Large (mb-5 - 20px)', value: 'mb-5' },
  { label: 'Large (mb-6 - 24px)', value: 'mb-6' },
  { label: 'Extra Large (mb-8 - 32px)', value: 'mb-8' },
  { label: '2X Large (mb-10 - 40px)', value: 'mb-10' },
  { label: '3X Large (mb-12 - 48px)', value: 'mb-12' },
  { label: '4X Large (mb-14 - 56px)', value: 'mb-14' },
  { label: '5X Large (mb-16 - 64px)', value: 'mb-16' },
]

export const defaultWebinarRecapAboutLayout = {
  blockType: 'webinarRecapAbout',
  aboutHeading: 'About this webinar',
  recordedDateText: 'Recorded 18 September 2026',
  introSubheading: 'INTRODUCTION',
  introHeading: 'Why this moment matters for fintech',
  introDescription:
    'Financial technology is redefining how the world manages, moves and grows money. But scaling a fintech product in a regulated environment demands far more than a good idea. It requires robust evidence, cross-sector collaboration, and a deep understanding of compliance, consumer trust and the evolving expectations of financial institutions worldwide.',
  learnSubheading: "WHAT YOU'LL LEARN",
  learnHeading: 'We explored the path from innovation to impact in financial services:',
  learningItems: [
    {
      boxBgColor: 'bg-[#0000FF]',
      boldPrefix: 'From regulatory friction to competitive advantage:',
      text: 'how forward-thinking fintech teams turn compliance requirements into opportunities to build trust, differentiate their products and accelerate sustainable growth in global markets.',
    },
    {
      boxBgColor: 'bg-[#0000FF]',
      boldPrefix: 'Data-driven decision-making at scale:',
      text: 'why fit-for-purpose financial data and behavioural insight matter, and how to build a richer understanding of user journeys, payment flows and product performance beyond the pilot stage.',
    },
    {
      boxBgColor: 'bg-[#0000FF]',
      boldPrefix: 'Building partnerships across the financial ecosystem:',
      text: 'what fintech innovators, established banks, regulators and consumer advocates can learn from each other to tackle shared challenges and unlock real change together.',
    },
    {
      boxBgColor: 'bg-[#0000FF]',
      boldPrefix: 'Turning strategy into measurable outcomes:',
      text: 'practical frameworks for connecting product evidence, commercial strategy and stakeholder communication — with a focus on responsible innovation and long-term financial inclusion.',
    },
  ],
  concludingText:
    'Catch up on a candid, expert-led conversation about the forces reshaping global financial services. The replay brings together practical perspectives for fintech founders, product leaders, compliance teams and investors navigating a rapidly evolving landscape.\n\nMissed the live session, or want to revisit a key insight? Watch the full recording at your own pace and share the conversation with your wider team.',
  aboutHeadingColor: 'text-gray-950',
  aboutHeadingFontSizeDesktop: 'text-2xl md:text-3xl lg:text-4xl',
  aboutHeadingFontSizeMobile: 'text-2xl',
  aboutHeadingFontWeightDesktop: 'font-semibold',
  aboutHeadingFontWeightMobile: 'font-semibold',
  recordedDateColor: 'text-gray-500',
  recordedDateFontSizeDesktop: 'text-xs sm:text-sm',
  recordedDateFontSizeMobile: 'text-xs',
  recordedDateFontWeightDesktop: 'font-normal',
  recordedDateFontWeightMobile: 'font-normal',
  metaRowMarginBottomDesktop: 'mb-4 md:mb-6',
  metaRowMarginBottomMobile: 'mb-4',
  hrColor: 'bg-slate-300',
  hrHeight: 'h-px',
  hrMarginBottomDesktop: 'mb-8 md:mb-12',
  hrMarginBottomMobile: 'mb-6',
  introSubheadingColor: 'text-[#0000FF]',
  introSubheadingFontSizeDesktop: 'text-xs md:text-sm',
  introSubheadingFontSizeMobile: 'text-xs',
  introSubheadingFontWeightDesktop: 'font-semibold',
  introSubheadingFontWeightMobile: 'font-semibold',
  introSubheadingMarginBottomDesktop: 'mb-3 md:mb-4',
  introSubheadingMarginBottomMobile: 'mb-3',
  introHeadingColor: 'text-gray-950',
  introHeadingFontSizeDesktop: 'text-3xl md:text-4xl lg:text-5xl',
  introHeadingFontSizeMobile: 'text-2xl sm:text-3xl',
  introHeadingFontWeightDesktop: 'font-semibold',
  introHeadingFontWeightMobile: 'font-semibold',
  introHeadingMarginBottomDesktop: 'mb-4 md:mb-6',
  introHeadingMarginBottomMobile: 'mb-4',
  introDescriptionColor: 'text-gray-700',
  introDescriptionFontSizeDesktop: 'text-base md:text-lg',
  introDescriptionFontSizeMobile: 'text-sm md:text-base',
  introDescriptionFontWeightDesktop: 'font-normal',
  introDescriptionFontWeightMobile: 'font-normal',
  introDescriptionMarginBottomDesktop: 'mb-10 md:mb-14',
  introDescriptionMarginBottomMobile: 'mb-8',
  learnSubheadingColor: 'text-[#0000FF]',
  learnSubheadingFontSizeDesktop: 'text-xs md:text-sm',
  learnSubheadingFontSizeMobile: 'text-xs',
  learnSubheadingFontWeightDesktop: 'font-semibold',
  learnSubheadingFontWeightMobile: 'font-semibold',
  learnSubheadingMarginBottomDesktop: 'mb-3 md:mb-4',
  learnSubheadingMarginBottomMobile: 'mb-3',
  learnHeadingColor: 'text-gray-950',
  learnHeadingFontSizeDesktop: 'text-3xl md:text-4xl lg:text-5xl',
  learnHeadingFontSizeMobile: 'text-2xl sm:text-3xl',
  learnHeadingFontWeightDesktop: 'font-semibold',
  learnHeadingFontWeightMobile: 'font-semibold',
  learnHeadingMarginBottomDesktop: 'mb-6 md:mb-8',
  learnHeadingMarginBottomMobile: 'mb-5',
  listItemTextColor: 'text-gray-800',
  listItemFontSizeDesktop: 'text-base md:text-lg',
  listItemFontSizeMobile: 'text-sm md:text-base',
  listItemFontWeightDesktop: 'font-normal',
  listItemFontWeightMobile: 'font-normal',
  listItemMarginBottomDesktop: 'mb-5 md:mb-7',
  listItemMarginBottomMobile: 'mb-4',
  listContainerMarginBottomDesktop: 'mb-10 md:mb-14',
  listContainerMarginBottomMobile: 'mb-8',
  concludingTextColor: 'text-gray-700',
  concludingFontSizeDesktop: 'text-base md:text-lg',
  concludingFontSizeMobile: 'text-sm md:text-base',
  concludingFontWeightDesktop: 'font-normal',
  concludingFontWeightMobile: 'font-normal',
  concludingMarginBottomDesktop: 'mb-0',
  concludingMarginBottomMobile: 'mb-0',
  sectionBgColor: 'bg-white',
  paddingTopDesktop: '80px',
  paddingTopMobile: '48px',
  paddingBottomDesktop: '80px',
  paddingBottomMobile: '48px',
  paddingLeftDesktop: '32px',
  paddingLeftMobile: '16px',
  paddingRightDesktop: '32px',
  paddingRightMobile: '16px',
  matchHeaderPillWidth: true,
}

export const WebinarRecapAbout: Block = {
  slug: 'webinarRecapAbout',
  labels: {
    singular: 'Webinar Recap Overview & Takeaways',
    plural: 'Webinar Recap Overview & Takeaways Sections',
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
            // Top Meta Row
            {
              type: 'group',
              name: 'metaRow',
              label: '1. Top Meta Header',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'aboutHeading',
                      type: 'text',
                      label: 'About Heading Text',
                      defaultValue: 'About this webinar',
                      required: false,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'recordedDateText',
                      type: 'text',
                      label: 'Recording Date Text',
                      defaultValue: 'Recorded 18 September 2026',
                      required: false,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // Introduction Group Content
            {
              type: 'group',
              name: 'intro',
              label: '2. Introduction Group',
              fields: [
                {
                  name: 'introSubheading',
                  type: 'text',
                  label: 'Subheading (Uppercase kicker)',
                  defaultValue: 'INTRODUCTION',
                  required: false,
                },
                {
                  name: 'introHeading',
                  type: 'textarea',
                  label: 'Main Heading (Supports inline HTML)',
                  defaultValue: 'Why this moment matters for fintech',
                  required: false,
                },
                {
                  name: 'introDescription',
                  type: 'textarea',
                  label: 'Narrative Description Copy',
                  defaultValue:
                    'Financial technology is redefining how the world manages, moves and grows money. But scaling a fintech product in a regulated environment demands far more than a good idea. It requires robust evidence, cross-sector collaboration, and a deep understanding of compliance, consumer trust and the evolving expectations of financial institutions worldwide.',
                  required: false,
                },
              ],
            },

            // What You'll Learn Group Content
            {
              type: 'group',
              name: 'takeaways',
              label: "3. What You'll Learn & Takeaways",
              fields: [
                {
                  name: 'learnSubheading',
                  type: 'text',
                  label: 'Subheading (Uppercase kicker)',
                  defaultValue: "WHAT YOU'LL LEARN",
                  required: false,
                },
                {
                  name: 'learnHeading',
                  type: 'textarea',
                  label: 'Curriculum Heading (Supports inline HTML)',
                  defaultValue:
                    'We explored the path from innovation to impact in financial services:',
                  required: false,
                },
                {
                  name: 'learningItems',
                  type: 'array',
                  label: 'Key Takeaways List Items',
                  minRows: 0,
                  fields: [
                    bgColorPickerAll({
                      overrides: {
                        name: 'boxBgColor',
                        label: 'Accent Box Background Color',
                        defaultValue: 'bg-[#0000FF]',
                      },
                    }),
                    {
                      name: 'boldPrefix',
                      type: 'text',
                      label: 'Bold Lead Title (Optional prefix)',
                      required: false,
                      admin: {
                        description:
                          'Bold lead-in title with colon (e.g. "From regulatory friction to competitive advantage:")',
                      },
                    },
                    {
                      name: 'text',
                      type: 'textarea',
                      label: 'Item Body Copy (Supports inline HTML)',
                      required: false,
                    },
                  ],
                },
              ],
            },

            // Concluding Narrative
            {
              type: 'group',
              name: 'concluding',
              label: '4. Concluding Narrative & Next Steps',
              fields: [
                {
                  name: 'concludingText',
                  type: 'textarea',
                  label: 'Concluding Summary Text (Supports paragraph breaks & inline HTML)',
                  defaultValue:
                    'Catch up on a candid, expert-led conversation about the forces reshaping global financial services. The replay brings together practical perspectives for fintech founders, product leaders, compliance teams and investors navigating a rapidly evolving landscape.\n\nMissed the live session, or want to revisit a key insight? Watch the full recording at your own pace and share the conversation with your wider team.',
                  required: false,
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
            // Top Meta Row Styles
            {
              type: 'group',
              name: 'metaRowStyles',
              label: '1. Top Meta Header Styling',
              fields: [
                textColorPickerAll({
                  overrides: {
                    name: 'aboutHeadingColor',
                    label: 'About Heading Text Color',
                    defaultValue: 'text-gray-950',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'aboutHeadingFontSizeDesktop',
                      type: 'select',
                      label: 'About Heading Font Size (Desktop)',
                      defaultValue: 'text-2xl md:text-3xl lg:text-4xl',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'aboutHeadingFontSizeMobile',
                      type: 'select',
                      label: 'About Heading Font Size (Mobile)',
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
                      name: 'aboutHeadingFontWeightDesktop',
                      type: 'select',
                      label: 'About Heading Font Weight (Desktop)',
                      defaultValue: 'font-semibold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'aboutHeadingFontWeightMobile',
                      type: 'select',
                      label: 'About Heading Font Weight (Mobile)',
                      defaultValue: 'font-semibold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                textColorPickerAll({
                  overrides: {
                    name: 'recordedDateColor',
                    label: 'Recording Date Text Color',
                    defaultValue: 'text-gray-500',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'recordedDateFontSizeDesktop',
                      type: 'select',
                      label: 'Recording Date Font Size (Desktop)',
                      defaultValue: 'text-xs sm:text-sm',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'recordedDateFontSizeMobile',
                      type: 'select',
                      label: 'Recording Date Font Size (Mobile)',
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
                      name: 'recordedDateFontWeightDesktop',
                      type: 'select',
                      label: 'Recording Date Font Weight (Desktop)',
                      defaultValue: 'font-normal',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'recordedDateFontWeightMobile',
                      type: 'select',
                      label: 'Recording Date Font Weight (Mobile)',
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
                      name: 'metaRowMarginBottomDesktop',
                      type: 'select',
                      label: 'Top Meta Row Margin Bottom (Desktop)',
                      defaultValue: 'mb-4 md:mb-6',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'metaRowMarginBottomMobile',
                      type: 'select',
                      label: 'Top Meta Row Margin Bottom (Mobile)',
                      defaultValue: 'mb-4',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // Divider Line Styles
            {
              type: 'group',
              name: 'hrStyles',
              label: '2. Horizontal Divider Line (<hr>) Styling',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'hrColor',
                    label: 'Divider Line Color',
                    defaultValue: 'bg-slate-300',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'hrHeight',
                      type: 'select',
                      label: 'Line Height / Thickness',
                      defaultValue: 'h-px',
                      options: [
                        { label: 'Thin (1px)', value: 'h-px' },
                        { label: 'Medium (2px)', value: 'h-[2px]' },
                        { label: 'Thick (3px)', value: 'h-[3px]' },
                      ],
                      admin: { width: '34%' },
                    },
                    {
                      name: 'hrMarginBottomDesktop',
                      type: 'select',
                      label: 'Divider Margin Bottom (Desktop)',
                      defaultValue: 'mb-8 md:mb-12',
                      options: spacingOptions,
                      admin: { width: '33%' },
                    },
                    {
                      name: 'hrMarginBottomMobile',
                      type: 'select',
                      label: 'Divider Margin Bottom (Mobile)',
                      defaultValue: 'mb-6',
                      options: spacingOptions,
                      admin: { width: '33%' },
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
                textColorPickerAll({
                  overrides: {
                    name: 'introSubheadingColor',
                    label: 'Subheading Text Color',
                    defaultValue: 'text-[#0000FF]',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'introSubheadingFontSizeDesktop',
                      type: 'select',
                      label: 'Subheading Font Size (Desktop)',
                      defaultValue: 'text-xs md:text-sm',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'introSubheadingFontSizeMobile',
                      type: 'select',
                      label: 'Subheading Font Size (Mobile)',
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
                      name: 'introSubheadingFontWeightDesktop',
                      type: 'select',
                      label: 'Subheading Font Weight (Desktop)',
                      defaultValue: 'font-semibold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'introSubheadingFontWeightMobile',
                      type: 'select',
                      label: 'Subheading Font Weight (Mobile)',
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
                      name: 'introSubheadingMarginBottomDesktop',
                      type: 'select',
                      label: 'Subheading Margin Bottom (Desktop)',
                      defaultValue: 'mb-3 md:mb-4',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'introSubheadingMarginBottomMobile',
                      type: 'select',
                      label: 'Subheading Margin Bottom (Mobile)',
                      defaultValue: 'mb-3',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                textColorPickerAll({
                  overrides: {
                    name: 'introHeadingColor',
                    label: 'Main Heading Text Color',
                    defaultValue: 'text-gray-950',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'introHeadingFontSizeDesktop',
                      type: 'select',
                      label: 'Main Heading Font Size (Desktop)',
                      defaultValue: 'text-3xl md:text-4xl lg:text-5xl',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'introHeadingFontSizeMobile',
                      type: 'select',
                      label: 'Main Heading Font Size (Mobile)',
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
                      name: 'introHeadingFontWeightDesktop',
                      type: 'select',
                      label: 'Main Heading Font Weight (Desktop)',
                      defaultValue: 'font-semibold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'introHeadingFontWeightMobile',
                      type: 'select',
                      label: 'Main Heading Font Weight (Mobile)',
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
                      name: 'introHeadingMarginBottomDesktop',
                      type: 'select',
                      label: 'Main Heading Margin Bottom (Desktop)',
                      defaultValue: 'mb-4 md:mb-6',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'introHeadingMarginBottomMobile',
                      type: 'select',
                      label: 'Main Heading Margin Bottom (Mobile)',
                      defaultValue: 'mb-4',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                textColorPickerAll({
                  overrides: {
                    name: 'introDescriptionColor',
                    label: 'Description Text Color',
                    defaultValue: 'text-gray-700',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'introDescriptionFontSizeDesktop',
                      type: 'select',
                      label: 'Description Font Size (Desktop)',
                      defaultValue: 'text-base md:text-lg',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'introDescriptionFontSizeMobile',
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
                      name: 'introDescriptionFontWeightDesktop',
                      type: 'select',
                      label: 'Description Font Weight (Desktop)',
                      defaultValue: 'font-normal',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'introDescriptionFontWeightMobile',
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
                      name: 'introDescriptionMarginBottomDesktop',
                      type: 'select',
                      label: 'Description Margin Bottom (Desktop)',
                      defaultValue: 'mb-10 md:mb-14',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'introDescriptionMarginBottomMobile',
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

            // What You'll Learn & Takeaways Styling
            {
              type: 'group',
              name: 'takeawaysStyles',
              label: "4. What You'll Learn & List Items Styling",
              fields: [
                textColorPickerAll({
                  overrides: {
                    name: 'learnSubheadingColor',
                    label: 'Subheading Text Color',
                    defaultValue: 'text-[#0000FF]',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'learnSubheadingFontSizeDesktop',
                      type: 'select',
                      label: 'Subheading Font Size (Desktop)',
                      defaultValue: 'text-xs md:text-sm',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'learnSubheadingFontSizeMobile',
                      type: 'select',
                      label: 'Subheading Font Size (Mobile)',
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
                      name: 'learnSubheadingFontWeightDesktop',
                      type: 'select',
                      label: 'Subheading Font Weight (Desktop)',
                      defaultValue: 'font-semibold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'learnSubheadingFontWeightMobile',
                      type: 'select',
                      label: 'Subheading Font Weight (Mobile)',
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
                      name: 'learnSubheadingMarginBottomDesktop',
                      type: 'select',
                      label: 'Subheading Margin Bottom (Desktop)',
                      defaultValue: 'mb-3 md:mb-4',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'learnSubheadingMarginBottomMobile',
                      type: 'select',
                      label: 'Subheading Margin Bottom (Mobile)',
                      defaultValue: 'mb-3',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                textColorPickerAll({
                  overrides: {
                    name: 'learnHeadingColor',
                    label: 'Heading Text Color',
                    defaultValue: 'text-gray-950',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'learnHeadingFontSizeDesktop',
                      type: 'select',
                      label: 'Heading Font Size (Desktop)',
                      defaultValue: 'text-3xl md:text-4xl lg:text-5xl',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'learnHeadingFontSizeMobile',
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
                      name: 'learnHeadingFontWeightDesktop',
                      type: 'select',
                      label: 'Heading Font Weight (Desktop)',
                      defaultValue: 'font-semibold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'learnHeadingFontWeightMobile',
                      type: 'select',
                      label: 'Heading Font Weight (Mobile)',
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
                      name: 'learnHeadingMarginBottomDesktop',
                      type: 'select',
                      label: 'Heading Margin Bottom (Desktop)',
                      defaultValue: 'mb-6 md:mb-8',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'learnHeadingMarginBottomMobile',
                      type: 'select',
                      label: 'Heading Margin Bottom (Mobile)',
                      defaultValue: 'mb-5',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                textColorPickerAll({
                  overrides: {
                    name: 'listItemTextColor',
                    label: 'List Items Text Color',
                    defaultValue: 'text-gray-800',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'listItemFontSizeDesktop',
                      type: 'select',
                      label: 'List Items Font Size (Desktop)',
                      defaultValue: 'text-base md:text-lg',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'listItemFontSizeMobile',
                      type: 'select',
                      label: 'List Items Font Size (Mobile)',
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
                      name: 'listItemFontWeightDesktop',
                      type: 'select',
                      label: 'List Items Font Weight (Desktop)',
                      defaultValue: 'font-normal',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'listItemFontWeightMobile',
                      type: 'select',
                      label: 'List Items Font Weight (Mobile)',
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
                      name: 'listItemMarginBottomDesktop',
                      type: 'select',
                      label: 'Margin Bottom per List Item (Desktop)',
                      defaultValue: 'mb-5 md:mb-7',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'listItemMarginBottomMobile',
                      type: 'select',
                      label: 'Margin Bottom per List Item (Mobile)',
                      defaultValue: 'mb-4',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'listContainerMarginBottomDesktop',
                      type: 'select',
                      label: 'Overall List Container Spacing Below (Desktop)',
                      defaultValue: 'mb-10 md:mb-14',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'listContainerMarginBottomMobile',
                      type: 'select',
                      label: 'Overall List Container Spacing Below (Mobile)',
                      defaultValue: 'mb-8',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // Concluding Narrative Styling
            {
              type: 'group',
              name: 'concludingStyles',
              label: '5. Concluding Narrative Styling',
              fields: [
                textColorPickerAll({
                  overrides: {
                    name: 'concludingTextColor',
                    label: 'Concluding Text Color',
                    defaultValue: 'text-gray-700',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'concludingFontSizeDesktop',
                      type: 'select',
                      label: 'Concluding Font Size (Desktop)',
                      defaultValue: 'text-base md:text-lg',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'concludingFontSizeMobile',
                      type: 'select',
                      label: 'Concluding Font Size (Mobile)',
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
                      name: 'concludingFontWeightDesktop',
                      type: 'select',
                      label: 'Concluding Font Weight (Desktop)',
                      defaultValue: 'font-normal',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'concludingFontWeightMobile',
                      type: 'select',
                      label: 'Concluding Font Weight (Mobile)',
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
                      name: 'concludingMarginBottomDesktop',
                      type: 'select',
                      label: 'Concluding Margin Bottom (Desktop)',
                      defaultValue: 'mb-0',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'concludingMarginBottomMobile',
                      type: 'select',
                      label: 'Concluding Margin Bottom (Mobile)',
                      defaultValue: 'mb-0',
                      options: spacingOptions,
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
            bgColorPickerAll({
              overrides: {
                name: 'sectionBgColor',
                label: 'Section Background Color',
                defaultValue: 'bg-white',
              },
            }),
            {
              type: 'checkbox',
              name: 'matchHeaderPillWidth',
              label: 'Match Header Width (Align with Logo & Nav, Max 1472px)',
              defaultValue: true,
              admin: {
                description:
                  'Constrains the content container to max-w-[1472px] aligning with the website header.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'paddingTopDesktop',
                  type: 'text',
                  label: 'Vertical Padding Top (Desktop)',
                  defaultValue: '80px',
                  admin: { width: '50%' },
                },
                {
                  name: 'paddingTopMobile',
                  type: 'text',
                  label: 'Vertical Padding Top (Mobile)',
                  defaultValue: '48px',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'paddingBottomDesktop',
                  type: 'text',
                  label: 'Vertical Padding Bottom (Desktop)',
                  defaultValue: '80px',
                  admin: { width: '50%' },
                },
                {
                  name: 'paddingBottomMobile',
                  type: 'text',
                  label: 'Vertical Padding Bottom (Mobile)',
                  defaultValue: '48px',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'paddingLeftDesktop',
                  type: 'text',
                  label: 'Horizontal Padding Left (Desktop)',
                  defaultValue: '32px',
                  admin: { width: '50%' },
                },
                {
                  name: 'paddingLeftMobile',
                  type: 'text',
                  label: 'Horizontal Padding Left (Mobile)',
                  defaultValue: '16px',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'paddingRightDesktop',
                  type: 'text',
                  label: 'Horizontal Padding Right (Desktop)',
                  defaultValue: '32px',
                  admin: { width: '50%' },
                },
                {
                  name: 'paddingRightMobile',
                  type: 'text',
                  label: 'Horizontal Padding Right (Mobile)',
                  defaultValue: '16px',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'customSectionId',
              type: 'text',
              label: 'Custom HTML Anchor ID (Optional)',
              admin: {
                description: 'Anchor identifier for navigation (e.g. "about-webinar-recap")',
              },
            },
          ],
        },
      ],
    },
  ],
}
