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

const itemGapOptions = [
  { label: 'Small (gap-6 md:gap-8)', value: 'gap-6 md:gap-8' },
  { label: 'Medium (gap-8 md:gap-12)', value: 'gap-8 md:gap-12' },
  { label: 'Large (gap-12 md:gap-16)', value: 'gap-12 md:gap-16' },
  { label: 'Extra Large (gap-16 md:gap-20)', value: 'gap-16 md:gap-20' },
]

export const WebinarMore: Block = {
  slug: 'webinarMore',
  labels: {
    singular: 'Webinar Section 3: More Webinars',
    plural: 'Webinar Section 3: More Webinars',
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
              name: 'sectionTitle',
              type: 'text',
              label: 'Section Header Title',
              defaultValue: 'More Webinars that may interest you',
            },
            {
              name: 'emptyStateText',
              type: 'text',
              label: 'Empty State Message (When no webinars found)',
              defaultValue: 'No upcoming webinars yet.',
            },
            {
              name: 'maxWebinars',
              type: 'number',
              label: 'Maximum Webinars to Display',
              defaultValue: 2,
              min: 1,
              max: 6,
              admin: {
                description: 'Default is 2 webinars matching the mockup design.',
              },
            },
            {
              name: 'fallbackItems',
              type: 'array',
              label: 'Fallback Mockup Items (Used when database has fewer active webinars)',
              labels: {
                singular: 'Fallback Webinar Item',
                plural: 'Fallback Webinar Items',
              },
              defaultValue: [
                {
                  kickerText: 'AI',
                  heading: 'Cut through the AI hype and reclaim strategic time',
                  dateText: 'Monday 20th Nov. at 10:30',
                  registerLink: '#register',
                  cardSubText: '316group',
                  cardHeading: 'We back disruptive\nproducts and founders in\nretail',
                  speakers: [
                    {
                      name: 'John Flanery',
                      role: 'Senior Software Engineer',
                      flag: 'uk',
                    },
                    {
                      name: 'John Flanery',
                      role: 'Senior Sales Manager',
                      flag: 'ke',
                    },
                  ],
                },
                {
                  kickerText: 'AI',
                  heading: 'Cut through the AI hype and reclaim strategic time',
                  dateText: 'Monday 20th Nov. at 10:30',
                  registerLink: '#register',
                  cardSubText: '316group',
                  cardHeading: 'We back disruptive\nproducts and founders in\nretail',
                  speakers: [
                    {
                      name: 'John Flanery',
                      role: 'Senior Software Engineer',
                      flag: 'uk',
                    },
                    {
                      name: 'John Flanery',
                      role: 'Senior Sales Manager',
                      flag: 'ke',
                    },
                  ],
                },
              ],
              fields: [
                {
                  name: 'kickerText',
                  type: 'text',
                  label: 'Kicker Tag Text',
                  defaultValue: 'AI',
                },
                {
                  name: 'heading',
                  type: 'textarea',
                  label: 'Webinar Heading / Title',
                  defaultValue: 'Cut through the AI hype and reclaim strategic time',
                },
                {
                  name: 'dateText',
                  type: 'text',
                  label: 'Date & Time Text',
                  defaultValue: 'Monday 20th Nov. at 10:30',
                },
                {
                  name: 'registerLink',
                  type: 'text',
                  label: 'Register Target Link URL',
                  defaultValue: '#register',
                },
                {
                  name: 'cardSubText',
                  type: 'text',
                  label: 'Left Card Brand Subtext',
                  defaultValue: '316group',
                },
                {
                  name: 'cardHeading',
                  type: 'textarea',
                  label: 'Left Card Heading',
                  defaultValue: 'We back disruptive\nproducts and founders in\nretail',
                },
                {
                  name: 'speakers',
                  type: 'array',
                  label: 'Left Card Speakers',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      label: 'Speaker Name',
                      defaultValue: 'John Flanery',
                    },
                    {
                      name: 'role',
                      type: 'text',
                      label: 'Speaker Role',
                      defaultValue: 'Senior Software Engineer',
                    },
                    {
                      name: 'photo',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Speaker Photo (Optional)',
                    },
                    {
                      name: 'flag',
                      type: 'select',
                      label: 'Country Flag Badge',
                      defaultValue: 'uk',
                      options: [
                        { label: 'United Kingdom (🇬🇧)', value: 'uk' },
                        { label: 'Kenya (🇰🇪)', value: 'ke' },
                        { label: 'United States (🇺🇸)', value: 'us' },
                        { label: 'Nigeria (🇳🇬)', value: 'ng' },
                        { label: 'European Union (🇪🇺)', value: 'eu' },
                        { label: 'Spain (🇪🇸)', value: 'es' },
                      ],
                    },
                  ],
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
            // 1. Top Section Title Styling
            {
              type: 'group',
              name: 'titleStyles',
              label: '1. Section Title Styling',
              fields: [
                textColorPickerAll({
                  overrides: {
                    name: 'textColor',
                    label: 'Title Text Color',
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
                      defaultValue: 'text-2xl md:text-3xl lg:text-4xl',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'fontSizeMobile',
                      type: 'select',
                      label: 'Font Size (Mobile)',
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
                      defaultValue: 'mb-4 md:mb-6',
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

            // 2. Horizontal Rule Divider Styling
            {
              type: 'group',
              name: 'hrStyles',
              label: '2. Horizontal Rule Divider Styling',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'lineColor',
                    label: 'Divider Line Color',
                    defaultValue: 'bg-slate-300',
                  },
                }),
                {
                  name: 'lineHeight',
                  type: 'select',
                  label: 'Line Thickness',
                  defaultValue: 'h-px',
                  options: [
                    { label: 'Hairline (1px)', value: 'h-px' },
                    { label: 'Medium (2px)', value: 'h-0.5' },
                    { label: 'Thick (3px)', value: 'h-[3px]' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'marginBottomDesktop',
                      type: 'select',
                      label: 'Divider Margin Bottom (Desktop)',
                      defaultValue: 'mb-10 md:mb-14',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'marginBottomMobile',
                      type: 'select',
                      label: 'Divider Margin Bottom (Mobile)',
                      defaultValue: 'mb-8',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // 3. Left Hero Card Styling
            {
              type: 'group',
              name: 'cardStyles',
              label: '3. Left Dark Card Styling',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'cardBgColor',
                    label: 'Card Background Color',
                    defaultValue: 'bg-[#1C202C]',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'subTextColor',
                    label: 'Card Brand Subtext Color',
                    defaultValue: 'text-white',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'headingColor',
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
                      label: 'Card Heading Size (Desktop)',
                      defaultValue: 'text-xl sm:text-2xl',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'headingFontSizeMobile',
                      type: 'select',
                      label: 'Card Heading Size (Mobile)',
                      defaultValue: 'text-lg sm:text-xl',
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
                      label: 'Card Heading Weight (Desktop)',
                      defaultValue: 'font-bold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'headingFontWeightMobile',
                      type: 'select',
                      label: 'Card Heading Weight (Mobile)',
                      defaultValue: 'font-bold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                textColorPickerAll({
                  overrides: {
                    name: 'speakerNameColor',
                    label: 'Speaker Name Color',
                    defaultValue: 'text-white',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'speakerRoleColor',
                    label: 'Speaker Role Color',
                    defaultValue: 'text-slate-400',
                  },
                }),
              ],
            },

            // 4. Right Detail Column Styling
            {
              type: 'group',
              name: 'detailStyles',
              label: '4. Right Detail Column Styling',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'squareColor',
                    label: 'Blue Accent Dot Color',
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
                textColorPickerAll({
                  overrides: {
                    name: 'headingColor',
                    label: 'Title Text Color',
                    defaultValue: 'text-gray-950',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'headingFontSizeDesktop',
                      type: 'select',
                      label: 'Title Font Size (Desktop)',
                      defaultValue: 'text-2xl sm:text-3xl lg:text-4xl',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'headingFontSizeMobile',
                      type: 'select',
                      label: 'Title Font Size (Mobile)',
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
                      label: 'Title Font Weight (Desktop)',
                      defaultValue: 'font-bold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'headingFontWeightMobile',
                      type: 'select',
                      label: 'Title Font Weight (Mobile)',
                      defaultValue: 'font-bold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                textColorPickerAll({
                  overrides: {
                    name: 'calendarIconColor',
                    label: 'Calendar Icon Color',
                    defaultValue: 'text-[#0056FF]',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'dateColor',
                    label: 'Date Text Color',
                    defaultValue: 'text-gray-700',
                  },
                }),
                bgColorPickerAll({
                  overrides: {
                    name: 'dividerColor',
                    label: 'Small Divider Line Color',
                    defaultValue: 'bg-slate-200',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'registerTextColor',
                    label: 'Register Today Link Color',
                    defaultValue: 'text-[#0056FF]',
                  },
                }),
                {
                  name: 'itemGap',
                  type: 'select',
                  label: 'Spacing Between Webinar Rows',
                  defaultValue: 'gap-12 md:gap-16',
                  options: itemGapOptions,
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
                  'Locks content width to 1,472px (max-w-screen-2xl) with responsive padding.',
              },
            },
            bgColorPickerAll({
              overrides: {
                name: 'sectionBgColor',
                label: 'Section Outer Background Color',
                defaultValue: 'bg-white',
              },
            }),
            {
              type: 'row',
              fields: [
                {
                  name: 'paddingTop',
                  type: 'text',
                  label: 'Padding Top (e.g. pt-16 md:pt-24)',
                  defaultValue: 'pt-16 md:pt-24',
                  admin: { width: '50%' },
                },
                {
                  name: 'paddingBottom',
                  type: 'text',
                  label: 'Padding Bottom (e.g. pb-16 md:pb-24)',
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
