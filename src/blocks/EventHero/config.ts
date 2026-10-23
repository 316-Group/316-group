import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { link } from '@/fields/link'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const allowAnySelect = (() => true as const) as any

const desktopPaddingOptions = [
  { label: '0px (Full Bleed)', value: '0px' },
  { label: '8px', value: '8px' },
  { label: '16px', value: '16px' },
  { label: '24px', value: '24px' },
  { label: '32px', value: '32px' },
  { label: '40px', value: '40px' },
  { label: '48px (Default)', value: '48px' },
  { label: '60px', value: '60px' },
  { label: '80px', value: '80px' },
  { label: '100px', value: '100px' },
  { label: '120px', value: '120px' },
  { label: 'Custom Value', value: 'custom' },
]

const mobilePaddingOptions = [
  { label: '0px (Full Bleed)', value: '0px' },
  { label: '8px', value: '8px' },
  { label: '12px', value: '12px' },
  { label: '16px (Default)', value: '16px' },
  { label: '20px', value: '20px' },
  { label: '24px', value: '24px' },
  { label: '32px', value: '32px' },
  { label: 'Custom Value', value: 'custom' },
]

const marginBottomOptions = [
  { label: 'Inherit / Default', value: '' },
  { label: 'None (0)', value: 'mb-0' },
  { label: 'Extra Small (mb-2)', value: 'mb-2' },
  { label: 'Small (mb-3)', value: 'mb-3' },
  { label: 'Responsive XS to S (mb-2 md:mb-3)', value: 'mb-2 md:mb-3' },
  { label: 'Responsive S to SM (mb-3 md:mb-4)', value: 'mb-3 md:mb-4' },
  { label: 'Small-Medium (mb-4)', value: 'mb-4' },
  { label: 'Medium (mb-6)', value: 'mb-6' },
  { label: 'Responsive S to M (mb-4 md:mb-6)', value: 'mb-4 md:mb-6' },
  { label: 'Large (mb-8)', value: 'mb-8' },
  { label: 'Responsive M to L (mb-6 md:mb-8 - Default)', value: 'mb-6 md:mb-8' },
  { label: 'Extra Large (mb-10)', value: 'mb-10' },
  { label: 'Responsive L to XL (mb-8 md:mb-10)', value: 'mb-8 md:mb-10' },
  { label: '2X Large (mb-12 md:mb-16)', value: 'mb-12 md:mb-16' },
]

export const eventHeroFields: Field[] = [
  {
    type: 'tabs',
    tabs: [
      // ═══════════════════════════════════════════════════════════════════════════
      // TAB 1: 📝 CONTENT & MEDIA (STRICTLY PURE CONTENT FOR NON-TECHNICAL USERS)
      // ═══════════════════════════════════════════════════════════════════════════
      {
        label: '📝 Content & Media',
        fields: [
          // 1. Kicker / Subheading Tag (Pure Content)
          {
            name: 'kickerGroup',
            type: 'group',
            label: '1. Kicker / Subheading Tag',
            admin: {
              description: 'Top kicker tag introducing the event.',
            },
            fields: [
              {
                name: 'text',
                type: 'text',
                label: 'Subheading Text',
                defaultValue: '316 GROUP AT ESMO 2026',
              },
            ],
          },

          // 2. Main Heading (Pure Content)
          {
            name: 'headingGroup',
            type: 'group',
            label: '2. Main Heading',
            admin: {
              description: 'Primary hero headline. Supports line breaks and inline HTML tags.',
            },
            fields: [
              {
                name: 'heading',
                type: 'textarea',
                label: 'Heading Text',
                defaultValue: 'Connecting people,\ndata and better\nhealthcare.',
              },
            ],
          },

          // 3. Description (Pure Content)
          {
            name: 'descriptionGroup',
            type: 'group',
            label: '3. Description',
            admin: {
              description: 'Introductory hero summary paragraph.',
            },
            fields: [
              {
                name: 'description',
                type: 'textarea',
                label: 'Description Text',
                defaultValue:
                  "A shared ambition. A meaningful conversation. Join 316 Group in Madrid to explore what's next for healthcare.",
              },
            ],
          },

          // 4. Date & Location Metadata (Pure Content)
          {
            name: 'metadataGroup',
            type: 'group',
            label: '4. Date & Location',
            admin: {
              description: 'Display text for event date and city venue.',
            },
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'dateText',
                    type: 'text',
                    label: 'Event Dates Display Text',
                    defaultValue: '23–27 October 2026',
                    admin: { width: '50%' },
                  },
                  {
                    name: 'locationText',
                    type: 'text',
                    label: 'Location / Venue Display Text',
                    defaultValue: 'Madrid, Spain',
                    admin: { width: '50%' },
                  },
                ],
              },
            ],
          },

          // 5. Action Buttons (Pure Content)
          {
            name: 'buttonsGroup',
            type: 'group',
            label: '5. Action Buttons',
            admin: {
              description: 'Primary and secondary call-to-action buttons.',
            },
            fields: [
              {
                name: 'button1',
                type: 'group',
                label: 'Primary Button',
                fields: [
                  {
                    name: 'text',
                    type: 'text',
                    label: 'Button 1 Text',
                    defaultValue: 'Request a meeting',
                  },
                  link({
                    overrides: {
                      name: 'link',
                      label: 'Button 1 Link',
                    },
                    required: false,
                  }),
                ],
              },
              {
                name: 'button2',
                type: 'group',
                label: 'Secondary Button',
                fields: [
                  {
                    name: 'text',
                    type: 'text',
                    label: 'Button 2 Text',
                    defaultValue: 'Explore the conversations ↓',
                  },
                  link({
                    overrides: {
                      name: 'link',
                      label: 'Button 2 Link',
                    },
                    required: false,
                  }),
                ],
              },
            ],
          },

          // 6. Featured Event Image (Pure Content)
          {
            name: 'imageColumn',
            type: 'group',
            label: '6. Featured Event Image (Right Column)',
            admin: {
              description: 'Hero featured graphic or congress photography.',
            },
            fields: [
              {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
                label: 'Featured Event Image Upload',
              },
            ],
          },

          // 7. Footer Metadata Items (Pure Content)
          {
            name: 'footerBar',
            type: 'group',
            label: '7. Footer Metadata Bar',
            admin: {
              description: 'Three key congress takeaway pillars in the bottom bar.',
            },
            fields: [
              {
                name: 'items',
                type: 'array',
                label: 'Footer Items (Max 3)',
                maxRows: 3,
                defaultValue: [
                  {
                    iconType: 'calendar',
                    subheading: 'THE CONGRESS',
                    heading: '23–27 October 2026',
                  },
                  {
                    iconType: 'mapPin',
                    subheading: 'THE CITY',
                    heading: 'Madrid, Spain',
                  },
                  {
                    iconType: 'messageSquare',
                    subheading: 'THE OPPORTUNITY',
                    heading: "Let's move healthcare forward",
                  },
                ],
                fields: [
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'iconType',
                        type: 'select',
                        label: 'Icon Type',
                        defaultValue: 'calendar',
                        options: [
                          { label: 'Calendar / Congress', value: 'calendar' },
                          { label: 'Map Pin / City', value: 'mapPin' },
                          { label: 'Message / Opportunity', value: 'messageSquare' },
                          { label: 'Clock / Time', value: 'clock' },
                          { label: 'Users / Attendees', value: 'users' },
                          { label: 'Globe / World', value: 'globe' },
                          { label: 'Ticket / Pass', value: 'ticket' },
                          { label: 'Custom Uploaded Media', value: 'customMedia' },
                          { label: 'None', value: 'none' },
                        ],
                        admin: { width: '33.33%' },
                      },
                      {
                        name: 'subheading',
                        type: 'text',
                        label: 'Subheading Label',
                        admin: { width: '33.33%' },
                      },
                      {
                        name: 'heading',
                        type: 'text',
                        label: 'Heading Title',
                        admin: { width: '33.33%' },
                      },
                    ],
                  },
                  {
                    name: 'customIconMedia',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Custom Icon Upload (Optional)',
                    admin: {
                      condition: (_, siblingData) => siblingData?.iconType === 'customMedia',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },

      // ═══════════════════════════════════════════════════════════════════════════
      // TAB 2: 🎨 INDIVIDUAL STYLING (TYPOGRAPHY, COLORS, MARGINS FOR EACH NUMBER)
      // ═══════════════════════════════════════════════════════════════════════════
      {
        label: '🎨 Individual Styling',
        fields: [
          // 1. Kicker Styling
          {
            name: 'kickerStyles',
            type: 'group',
            label: '1. Kicker / Subheading Tag Styling',
            fields: [
              {
                name: 'showKicker',
                type: 'checkbox',
                label: 'Show Kicker',
                defaultValue: true,
              },
              {
                type: 'row',
                admin: {
                  condition: (_, siblingData) => Boolean(siblingData?.showKicker),
                },
                fields: [
                  {
                    name: 'squareColor',
                    type: 'text',
                    label: 'Accent Square Color (Tailwind or Hex)',
                    defaultValue: 'bg-[#00D2FF]',
                    admin: { width: '33.33%' },
                  },
                  {
                    name: 'squareSize',
                    type: 'select',
                    label: 'Accent Square Size',
                    defaultValue: 'w-2.5 h-2.5',
                    validate: allowAnySelect,
                    options: [
                      { label: 'Small (8px)', value: 'w-2 h-2' },
                      { label: 'Standard (10px - Default)', value: 'w-2.5 h-2.5' },
                      { label: 'Medium (12px)', value: 'w-3 h-3' },
                      { label: 'Large (14px)', value: 'w-3.5 h-3.5' },
                    ],
                    admin: { width: '33.33%' },
                  },
                  textColorPickerAll({
                    overrides: {
                      name: 'textColor',
                      label: 'Text Color',
                      defaultValue: 'text-white',
                      admin: { width: '33.33%' },
                    },
                  }),
                ],
              },
              {
                type: 'row',
                admin: {
                  condition: (_, siblingData) => Boolean(siblingData?.showKicker),
                },
                fields: [
                  {
                    name: 'fontSize',
                    type: 'select',
                    label: 'Font Size',
                    defaultValue: 'text-xs md:text-sm',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontSizeMobile',
                    type: 'select',
                    label: 'Font Size Mobile',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontWeight',
                    type: 'select',
                    label: 'Font Weight',
                    defaultValue: 'font-semibold',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontWeightMobile',
                    type: 'select',
                    label: 'Font Weight Mobile',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                ],
              },
              {
                type: 'row',
                admin: {
                  condition: (_, siblingData) => Boolean(siblingData?.showKicker),
                },
                fields: [
                  {
                    name: 'marginBottom',
                    type: 'select',
                    label: 'Margin Bottom',
                    defaultValue: 'mb-4',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                  {
                    name: 'marginBottomMobile',
                    type: 'select',
                    label: 'Margin Bottom Mobile',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                ],
              },
            ],
          },

          // 2. Main Heading Styling
          {
            name: 'headingStyles',
            type: 'group',
            label: '2. Main Heading Styling',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'headingColor',
                  label: 'Heading Text Color',
                  defaultValue: 'text-white',
                },
              }),
              {
                type: 'row',
                fields: [
                  {
                    name: 'headingFontSize',
                    type: 'select',
                    label: 'Font Size',
                    defaultValue: 'text-4xl sm:text-5xl lg:text-6xl',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'headingFontSizeMobile',
                    type: 'select',
                    label: 'Font Size Mobile',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'headingFontWeight',
                    type: 'select',
                    label: 'Font Weight',
                    defaultValue: 'font-bold',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'headingFontWeightMobile',
                    type: 'select',
                    label: 'Font Weight Mobile',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'marginBottom',
                    type: 'select',
                    label: 'Margin Bottom',
                    defaultValue: 'mb-6 md:mb-8',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                  {
                    name: 'marginBottomMobile',
                    type: 'select',
                    label: 'Margin Bottom Mobile',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                ],
              },
            ],
          },

          // 3. Description Styling
          {
            name: 'descriptionStyles',
            type: 'group',
            label: '3. Description Styling',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'descriptionColor',
                  label: 'Description Text Color',
                  defaultValue: 'text-white/90',
                },
              }),
              {
                type: 'row',
                fields: [
                  {
                    name: 'descriptionFontSize',
                    type: 'select',
                    label: 'Font Size',
                    defaultValue: 'text-base md:text-lg lg:text-xl',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'descriptionFontSizeMobile',
                    type: 'select',
                    label: 'Font Size Mobile',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'descriptionFontWeight',
                    type: 'select',
                    label: 'Font Weight',
                    defaultValue: 'font-normal',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'descriptionFontWeightMobile',
                    type: 'select',
                    label: 'Font Weight Mobile',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'marginBottom',
                    type: 'select',
                    label: 'Margin Bottom',
                    defaultValue: 'mb-8 md:mb-10',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                  {
                    name: 'marginBottomMobile',
                    type: 'select',
                    label: 'Margin Bottom Mobile',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                ],
              },
            ],
          },

          // 4. Date & Location Styling
          {
            name: 'metadataStyles',
            type: 'group',
            label: '4. Date & Location Styling',
            fields: [
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'textColor',
                      label: 'Text Color',
                      defaultValue: 'text-white',
                      admin: { width: '50%' },
                    },
                  }),
                  {
                    name: 'dividerColor',
                    type: 'text',
                    label: 'Divider Line Color (e.g. bg-white/40)',
                    defaultValue: 'bg-white/40',
                    admin: { width: '50%' },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
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
                    name: 'fontSizeMobile',
                    type: 'select',
                    label: 'Font Size Mobile',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontWeight',
                    type: 'select',
                    label: 'Font Weight',
                    defaultValue: 'font-medium',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontWeightMobile',
                    type: 'select',
                    label: 'Font Weight Mobile',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'marginBottom',
                    type: 'select',
                    label: 'Margin Bottom',
                    defaultValue: 'mb-8 md:mb-10',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                  {
                    name: 'marginBottomMobile',
                    type: 'select',
                    label: 'Margin Bottom Mobile',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                ],
              },
            ],
          },

          // 5. Action Buttons Styling
          {
            name: 'buttonStyles',
            type: 'group',
            label: '5. Action Buttons Styling',
            fields: [
              {
                type: 'row',
                fields: [
                  bgColorPickerAll({
                    overrides: {
                      name: 'button1BgColor',
                      label: 'Button 1 Background Color',
                      defaultValue: 'bg-white',
                      admin: { width: '33.33%' },
                    },
                  }),
                  textColorPickerAll({
                    overrides: {
                      name: 'button1TextColor',
                      label: 'Button 1 Text Color',
                      defaultValue: 'text-[#0256FF]',
                      admin: { width: '33.33%' },
                    },
                  }),
                  textColorPickerAll({
                    overrides: {
                      name: 'button1IconColor',
                      label: 'Button 1 Icon Color',
                      defaultValue: 'text-[#0256FF]',
                      admin: { width: '33.33%' },
                    },
                  }),
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'button1BorderRadius',
                    type: 'select',
                    label: 'Button 1 Rounded',
                    defaultValue: 'rounded-lg',
                    validate: allowAnySelect,
                    options: [
                      { label: 'Square (rounded-none)', value: 'rounded-none' },
                      { label: 'Medium (rounded-md)', value: 'rounded-md' },
                      { label: 'Large (rounded-lg - Default)', value: 'rounded-lg' },
                      { label: 'Pill (rounded-full)', value: 'rounded-full' },
                    ],
                    admin: { width: '33.33%' },
                  },
                  {
                    name: 'button1FontSize',
                    type: 'select',
                    label: 'Button 1 Font Size',
                    defaultValue: 'text-sm md:text-base',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '33.33%' },
                  },
                  {
                    name: 'button1FontWeight',
                    type: 'select',
                    label: 'Button 1 Font Weight',
                    defaultValue: 'font-semibold',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '33.33%' },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'button2TextColor',
                      label: 'Button 2 Text Color',
                      defaultValue: 'text-white',
                      admin: { width: '33.33%' },
                    },
                  }),
                  textColorPickerAll({
                    overrides: {
                      name: 'button2IconColor',
                      label: 'Button 2 Icon Color',
                      defaultValue: 'text-white',
                      admin: { width: '33.33%' },
                    },
                  }),
                  {
                    name: 'button2FontWeight',
                    type: 'select',
                    label: 'Button 2 Font Weight',
                    defaultValue: 'font-medium',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '33.33%' },
                  },
                ],
              },
            ],
          },

          // 6. Featured Image Styling
          {
            name: 'imageStyles',
            type: 'group',
            label: '6. Featured Event Image Styling',
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'imageFit',
                    type: 'select',
                    label: 'Image Fit',
                    defaultValue: 'cover',
                    options: [
                      { label: 'Cover (Default)', value: 'cover' },
                      { label: 'Contain', value: 'contain' },
                    ],
                    admin: { width: '33.33%' },
                  },
                  {
                    name: 'imageRounded',
                    type: 'select',
                    label: 'Rounded Corners',
                    defaultValue: 'rounded-none',
                    options: [
                      { label: 'None (Default - Mockup Style)', value: 'rounded-none' },
                      { label: 'Rounded 2XL (rounded-2xl)', value: 'rounded-2xl' },
                      { label: 'Rounded 3XL (rounded-3xl)', value: 'rounded-3xl' },
                    ],
                    admin: { width: '33.33%' },
                  },
                  {
                    name: 'gridBottomSpacing',
                    type: 'select',
                    label: 'Bottom Spacing Mobile',
                    defaultValue: 'mb-0',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '33.33%' },
                  },
                ],
              },
            ],
          },

          // 7. Footer Metadata Bar Styling
          {
            name: 'footerStyles',
            type: 'group',
            label: '7. Footer Metadata Bar Styling',
            fields: [
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'iconColor',
                      label: 'Icon Color',
                      defaultValue: 'text-[#0256FF]',
                      admin: { width: '33.33%' },
                    },
                  }),
                  {
                    name: 'iconSize',
                    type: 'select',
                    label: 'Icon Size',
                    defaultValue: 'w-6 h-6',
                    validate: allowAnySelect,
                    options: [
                      { label: 'Small (20px)', value: 'w-5 h-5' },
                      { label: 'Standard (24px - Default)', value: 'w-6 h-6' },
                      { label: 'Medium (28px)', value: 'w-7 h-7' },
                      { label: 'Large (32px)', value: 'w-8 h-8' },
                    ],
                    admin: { width: '33.33%' },
                  },
                  {
                    name: 'iconTextGap',
                    type: 'select',
                    label: 'Icon to Text Gap',
                    defaultValue: 'gap-3 md:gap-4',
                    validate: allowAnySelect,
                    options: [
                      { label: 'Compact (gap-2)', value: 'gap-2' },
                      { label: 'Standard (gap-3 md:gap-4)', value: 'gap-3 md:gap-4' },
                      { label: 'Spacious (gap-4 md:gap-6)', value: 'gap-4 md:gap-6' },
                    ],
                    admin: { width: '33.33%' },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'subheadingColor',
                      label: 'Subheading Color',
                      defaultValue: 'text-gray-500',
                      admin: { width: '33.33%' },
                    },
                  }),
                  {
                    name: 'subheadingFontSize',
                    type: 'select',
                    label: 'Subheading Font Size',
                    defaultValue: 'text-[11px] md:text-xs',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '33.33%' },
                  },
                  {
                    name: 'subheadingFontWeight',
                    type: 'select',
                    label: 'Subheading Font Weight',
                    defaultValue: 'font-medium',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '33.33%' },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'headingColor',
                      label: 'Heading Color',
                      defaultValue: 'text-gray-950',
                      admin: { width: '33.33%' },
                    },
                  }),
                  {
                    name: 'headingFontSize',
                    type: 'select',
                    label: 'Heading Font Size',
                    defaultValue: 'text-base md:text-lg',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: { width: '33.33%' },
                  },
                  {
                    name: 'headingFontWeight',
                    type: 'select',
                    label: 'Heading Font Weight',
                    defaultValue: 'font-semibold',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: { width: '33.33%' },
                  },
                ],
              },
            ],
          },
        ],
      },

      // ═══════════════════════════════════════════════════════════════════════════
      // TAB 3: ⚙️ SECTION LAYOUT & SPACING (GLOBAL SECTION SHELL CONTROLS)
      // ═══════════════════════════════════════════════════════════════════════════
      {
        label: '⚙️ Section Layout & Spacing',
        fields: [
          // ─── 1. Layout & Header Width Matching ─────────────────────────────────────
          {
            type: 'row',
            fields: [
              {
                name: 'matchHeaderPillWidth',
                type: 'checkbox',
                label: 'Match Header Width (Align with Logo & Nav, Max 1472px)',
                defaultValue: true,
                admin: {
                  width: '50%',
                  description:
                    'Locks inner content to 1,472px (max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8) matching the site header logo and nav.',
                },
              },
              {
                name: 'paddingMode',
                type: 'select',
                label: 'Horizontal Padding Mode',
                defaultValue: 'default',
                validate: allowAnySelect,
                options: [
                  { label: 'Default Responsive Padding', value: 'default' },
                  { label: 'No Padding / Full Screen Bleed (0px)', value: 'none' },
                  { label: 'Custom Horizontal Padding', value: 'custom' },
                ],
                admin: {
                  width: '50%',
                  condition: (_, siblingData) => !siblingData?.matchHeaderPillWidth,
                },
              },
            ],
          },
          {
            type: 'row',
            admin: {
              condition: (_, siblingData) =>
                !siblingData?.matchHeaderPillWidth && siblingData?.paddingMode === 'custom',
            },
            fields: [
              {
                name: 'paddingXDesktop',
                type: 'select',
                label: 'Desktop Lateral Padding',
                defaultValue: '48px',
                validate: allowAnySelect,
                options: desktopPaddingOptions,
                admin: { width: '25%' },
              },
              {
                name: 'paddingXDesktopCustom',
                type: 'text',
                label: 'Custom Desktop Padding (e.g. 50px)',
                admin: {
                  width: '25%',
                  condition: (_, siblingData) => siblingData?.paddingXDesktop === 'custom',
                },
              },
              {
                name: 'paddingXMobile',
                type: 'select',
                label: 'Mobile Lateral Padding',
                defaultValue: '16px',
                validate: allowAnySelect,
                options: mobilePaddingOptions,
                admin: { width: '25%' },
              },
              {
                name: 'paddingXMobileCustom',
                type: 'text',
                label: 'Custom Mobile Padding (e.g. 16px)',
                admin: {
                  width: '25%',
                  condition: (_, siblingData) => siblingData?.paddingXMobile === 'custom',
                },
              },
            ],
          },

          // ─── 2. Vertical Padding Controls ──────────────────────────────────────────
          {
            type: 'row',
            fields: [
              {
                name: 'paddingTop',
                type: 'select',
                label: 'Body Top Padding',
                defaultValue: 'pt-16',
                validate: allowAnySelect,
                options: [
                  { label: 'None (0)', value: 'pt-0' },
                  { label: 'Small (pt-8)', value: 'pt-8' },
                  { label: 'Medium (pt-12)', value: 'pt-12' },
                  { label: 'Standard (pt-16 - Default)', value: 'pt-16' },
                  { label: 'Large (pt-20)', value: 'pt-20' },
                  { label: 'Extra Large (pt-24)', value: 'pt-24' },
                  { label: '2X Large (pt-32)', value: 'pt-32' },
                ],
                admin: { width: '25%' },
              },
              {
                name: 'bodyPaddingBottom',
                type: 'select',
                label: 'Body Bottom Padding',
                defaultValue: 'pb-16',
                validate: allowAnySelect,
                options: [
                  { label: 'None (0)', value: 'pb-0' },
                  { label: 'Small (pb-8)', value: 'pb-8' },
                  { label: 'Medium (pb-12)', value: 'pb-12' },
                  { label: 'Standard (pb-16 - Default)', value: 'pb-16' },
                  { label: 'Large (pb-20)', value: 'pb-20' },
                  { label: 'Extra Large (pb-24)', value: 'pb-24' },
                  { label: '2X Large (pb-32)', value: 'pb-32' },
                ],
                admin: { width: '25%' },
              },
              {
                name: 'footerPaddingTop',
                type: 'select',
                label: 'Footer Top Padding',
                defaultValue: 'pt-6',
                validate: allowAnySelect,
                options: [
                  { label: 'None (0)', value: 'pt-0' },
                  { label: 'Small (pt-4)', value: 'pt-4' },
                  { label: 'Standard (pt-6 - Default)', value: 'pt-6' },
                  { label: 'Medium (pt-8)', value: 'pt-8' },
                  { label: 'Large (pt-10)', value: 'pt-10' },
                  { label: 'Extra Large (pt-12)', value: 'pt-12' },
                ],
                admin: { width: '25%' },
              },
              {
                name: 'footerPaddingBottom',
                type: 'select',
                label: 'Footer Bottom Padding',
                defaultValue: 'pb-6',
                validate: allowAnySelect,
                options: [
                  { label: 'None (0)', value: 'pb-0' },
                  { label: 'Small (pb-4)', value: 'pb-4' },
                  { label: 'Standard (pb-6 - Default)', value: 'pb-6' },
                  { label: 'Medium (pb-8)', value: 'pb-8' },
                  { label: 'Large (pb-10)', value: 'pb-10' },
                  { label: 'Extra Large (pb-12)', value: 'pb-12' },
                ],
                admin: { width: '25%' },
              },
            ],
          },

          // ─── 3. Background Controls (Body & Footer) ────────────────────────────────
          {
            type: 'row',
            fields: [
              {
                name: 'backgroundType',
                type: 'select',
                label: 'Body Background Type',
                defaultValue: 'color',
                options: [
                  { label: 'Solid Color (Default)', value: 'color' },
                  { label: 'Media / Image', value: 'media' },
                ],
                admin: { width: '33.33%' },
              },
              bgColorPickerAll({
                overrides: {
                  name: 'bodyBgColor',
                  label: 'Body Background Color',
                  defaultValue: 'bg-[#0000FF]',
                  admin: {
                    width: '33.33%',
                    condition: (_, { backgroundType }) => backgroundType === 'color',
                  },
                },
              }),
              bgColorPickerAll({
                overrides: {
                  name: 'footerBgColor',
                  label: 'Footer Background Color',
                  defaultValue: 'bg-[#F4F6F9]',
                  admin: { width: '33.33%' },
                },
              }),
            ],
          },
          {
            type: 'row',
            admin: {
              condition: (_, { backgroundType }) => backgroundType === 'media',
            },
            fields: [
              {
                name: 'bodyBgMedia',
                type: 'upload',
                relationTo: 'media',
                label: 'Body Background Image',
                admin: { width: '50%' },
              },
              {
                name: 'bodyBgOverlay',
                type: 'select',
                label: 'Background Overlay',
                defaultValue: 'medium',
                options: [
                  { label: 'Vignette', value: 'vignette' },
                  { label: 'Subtle (30%)', value: 'subtle' },
                  { label: 'Medium (50% - Default)', value: 'medium' },
                  { label: 'Heavy (75%)', value: 'heavy' },
                  { label: 'None', value: 'none' },
                ],
                admin: { width: '50%' },
              },
            ],
          },
        ],
      },
    ],
  },
]

export const EventHero: Block = {
  slug: 'eventHero',
  interfaceName: 'EventHeroBlock',
  fields: eventHeroFields,
}
