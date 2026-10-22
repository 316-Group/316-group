import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
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
  { label: 'None (0)', value: 'mb-0' },
  { label: 'Extra Small (mb-2)', value: 'mb-2' },
  { label: 'Small (mb-3)', value: 'mb-3' },
  { label: 'Responsive XS to S (mb-2 md:mb-3)', value: 'mb-2 md:mb-3' },
  { label: 'Responsive S to SM (mb-3 md:mb-4)', value: 'mb-3 md:mb-4' },
  { label: 'Small-Medium (mb-4)', value: 'mb-4' },
  { label: 'Medium (mb-6)', value: 'mb-6' },
  { label: 'Responsive S to M (mb-4 md:mb-6)', value: 'mb-4 md:mb-6' },
  { label: 'Large (mb-8)', value: 'mb-8' },
  { label: 'Responsive M to L (mb-6 md:mb-8)', value: 'mb-6 md:mb-8' },
  { label: 'Extra Large (mb-10)', value: 'mb-10' },
  { label: 'Responsive L to XL (mb-8 md:mb-10)', value: 'mb-8 md:mb-10' },
  { label: '2X Large (mb-10 md:mb-12)', value: 'mb-10 md:mb-12' },
  { label: '3X Large (mb-12 md:mb-16)', value: 'mb-12 md:mb-16' },
]

const dividerBorderWidthOptions = [
  { label: 'Thin (1px)', value: 'border-t' },
  { label: 'Medium (2px)', value: 'border-t-2' },
  { label: 'Thick (4px)', value: 'border-t-4' },
]

const dividerColorOptions = [
  { label: 'White / 20% (Default)', value: 'border-white/20' },
  { label: 'White / 40%', value: 'border-white/40' },
  { label: 'Cyan (#00D2FF)', value: 'border-[#00D2FF]' },
  { label: 'Slate 200', value: 'border-slate-200' },
  { label: 'Brand Blue (#0256FF)', value: 'border-[#0256FF]' },
]

export const eventConversationFormFields: Field[] = [
  {
    type: 'tabs',
    tabs: [
      // ═══════════════════════════════════════════════════════════════════════════
      // TAB 1: 📝 CONTENT & MEDIA (Non-technical users - Zero Styling Controls)
      // ═══════════════════════════════════════════════════════════════════════════
      {
        label: '📝 Content & Media',
        fields: [
          // ─── Left Column: Context & Next Steps Roadmap ──────────────────────
          {
            name: 'leftColumn',
            type: 'group',
            label: 'Left Column: Context & Next Steps Roadmap',
            fields: [
              // Kicker
              {
                name: 'kickerGroup',
                type: 'group',
                label: '1. Kicker / Subheading Tag',
                fields: [
                  {
                    name: 'showKicker',
                    type: 'checkbox',
                    label: 'Show Subheading',
                    defaultValue: true,
                  },
                  {
                    name: 'text',
                    type: 'text',
                    label: 'Subheading Text',
                    defaultValue: "LET'S START A CONVERSATION",
                    admin: {
                      condition: (_, siblingData) => Boolean(siblingData?.showKicker),
                    },
                  },
                ],
              },

              // Heading Group
              {
                name: 'headingGroup',
                type: 'group',
                label: '2. Main Heading',
                fields: [
                  {
                    name: 'heading',
                    type: 'textarea',
                    label: 'Heading Text (supports inline HTML e.g. <span style="color:#00D2FF">, <br/>)',
                    defaultValue: 'Your next\nconnection starts\nhere.',
                  },
                ],
              },

              // Description Group
              {
                name: 'descriptionGroup',
                type: 'group',
                label: '3. Description Text',
                fields: [
                  {
                    name: 'description',
                    type: 'textarea',
                    label: 'Description Text (supports inline HTML)',
                    defaultValue:
                      "Tell us a little about yourself and what you'd like to discuss. We'll be in touch to explore a suitable time to meet during ESMO 2026.",
                  },
                ],
              },

              // Steps Title ("What happens next?")
              {
                name: 'stepsTitle',
                type: 'group',
                label: '4. Roadmap Section Title',
                fields: [
                  {
                    name: 'text',
                    type: 'text',
                    label: 'Title Text',
                    defaultValue: 'What happens next?',
                  },
                ],
              },

              // Steps Array
              {
                name: 'steps',
                type: 'array',
                label: 'Roadmap Process Steps (01, 02, 03...)',
                minRows: 1,
                defaultValue: [
                  {
                    numberText: '01',
                    text: 'Share your interests and availability.',
                  },
                  {
                    numberText: '02',
                    text: "We'll follow up to shape the conversation.",
                  },
                  {
                    numberText: '03',
                    text: 'Confirm a time and place together.',
                  },
                ],
                fields: [
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'numberText',
                        type: 'text',
                        label: 'Step Number',
                        defaultValue: '01',
                        admin: { width: '30%' },
                      },
                      {
                        name: 'text',
                        type: 'text',
                        label: 'Step Description',
                        defaultValue: 'Share your interests and availability.',
                        admin: { width: '70%' },
                      },
                    ],
                  },
                ],
              },

              // Bottom Decorative Icon / Matrix
              {
                name: 'bottomIcon',
                type: 'group',
                label: '5. Bottom Decorative Graphic',
                fields: [
                  {
                    name: 'showBottomIcon',
                    type: 'checkbox',
                    label: 'Show Bottom Graphic',
                    defaultValue: true,
                  },
                  {
                    name: 'iconType',
                    type: 'select',
                    label: 'Graphic Type',
                    defaultValue: 'matrix3x3',
                    options: [
                      { label: '3x3 Cyan Square Matrix (Default)', value: 'matrix3x3' },
                      { label: 'Custom Vector / Image Upload', value: 'upload' },
                    ],
                    admin: {
                      condition: (_, siblingData) => Boolean(siblingData?.showBottomIcon),
                    },
                  },
                  {
                    name: 'customIcon',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Upload Custom Vector Graphic',
                    admin: {
                      condition: (_, siblingData) =>
                        Boolean(siblingData?.showBottomIcon) && siblingData?.iconType === 'upload',
                    },
                  },
                ],
              },
            ],
          },

          // ─── Right Column: Meeting Request Form Card ────────────────────────
          {
            name: 'rightColumn',
            type: 'group',
            label: 'Right Column: Meeting Request Form',
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'formTitle',
                    type: 'text',
                    label: 'Form Title',
                    defaultValue: 'Request a meeting',
                    admin: { width: '50%' },
                  },
                  {
                    name: 'requiredNote',
                    type: 'text',
                    label: 'Required Indicator Note',
                    defaultValue: '* Required fields',
                    admin: { width: '50%' },
                  },
                ],
              },

              // Field Configurations
              {
                name: 'fieldsConfig',
                type: 'group',
                label: 'Form Field Labels & Options',
                fields: [
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'firstNameLabel',
                        type: 'text',
                        label: 'First Name Label',
                        defaultValue: 'First name',
                        admin: { width: '25%' },
                      },
                      {
                        name: 'firstNamePlaceholder',
                        type: 'text',
                        label: 'First Name Placeholder',
                        defaultValue: 'Your first name',
                        admin: { width: '25%' },
                      },
                      {
                        name: 'lastNameLabel',
                        type: 'text',
                        label: 'Last Name Label',
                        defaultValue: 'Last name',
                        admin: { width: '25%' },
                      },
                      {
                        name: 'lastNamePlaceholder',
                        type: 'text',
                        label: 'Last Name Placeholder',
                        defaultValue: 'Your last name',
                        admin: { width: '25%' },
                      },
                    ],
                  },
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'emailLabel',
                        type: 'text',
                        label: 'Work Email Label',
                        defaultValue: 'Work email',
                        admin: { width: '50%' },
                      },
                      {
                        name: 'emailPlaceholder',
                        type: 'text',
                        label: 'Work Email Placeholder',
                        defaultValue: 'you@organisation.com',
                        admin: { width: '50%' },
                      },
                    ],
                  },
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'organisationLabel',
                        type: 'text',
                        label: 'Organisation Label',
                        defaultValue: 'Organisation',
                        admin: { width: '25%' },
                      },
                      {
                        name: 'organisationPlaceholder',
                        type: 'text',
                        label: 'Organisation Placeholder',
                        defaultValue: 'Organisation name',
                        admin: { width: '25%' },
                      },
                      {
                        name: 'jobTitleLabel',
                        type: 'text',
                        label: 'Job Title Label',
                        defaultValue: 'Job title',
                        admin: { width: '25%' },
                      },
                      {
                        name: 'jobTitlePlaceholder',
                        type: 'text',
                        label: 'Job Title Placeholder',
                        defaultValue: 'Your role',
                        admin: { width: '25%' },
                      },
                    ],
                  },
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'discussionTopicLabel',
                        type: 'text',
                        label: 'Discussion Topic Label',
                        defaultValue: 'What would you like to discuss?',
                        admin: { width: '50%' },
                      },
                      {
                        name: 'discussionTopicPlaceholder',
                        type: 'text',
                        label: 'Discussion Topic Placeholder',
                        defaultValue: 'Select a discussion topic',
                        admin: { width: '50%' },
                      },
                    ],
                  },
                  {
                    name: 'discussionTopicOptions',
                    type: 'array',
                    label: 'Discussion Topic Dropdown Options',
                    defaultValue: [
                      { option: 'Connecting technology to clinical reality' },
                      { option: 'Data that actually serves clinicians' },
                      { option: 'Cross-border learning, local impact' },
                      { option: "Preparing for what's next in oncology" },
                      { option: 'Other / General exploratory meeting' },
                    ],
                    fields: [
                      {
                        name: 'option',
                        type: 'text',
                        label: 'Option Label',
                        required: true,
                      },
                    ],
                  },
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'preferredDayLabel',
                        type: 'text',
                        label: 'Preferred Day Label',
                        defaultValue: 'Preferred day',
                        admin: { width: '50%' },
                      },
                      {
                        name: 'preferredDayPlaceholder',
                        type: 'text',
                        label: 'Preferred Day Placeholder',
                        defaultValue: 'Select 23–27 October',
                        admin: { width: '50%' },
                      },
                    ],
                  },
                  {
                    name: 'preferredDayOptions',
                    type: 'array',
                    label: 'Preferred Day Options',
                    defaultValue: [
                      { option: 'Friday, 23 October 2026' },
                      { option: 'Saturday, 24 October 2026' },
                      { option: 'Sunday, 25 October 2026' },
                      { option: 'Monday, 26 October 2026' },
                      { option: 'Tuesday, 27 October 2026' },
                      { option: 'Flexible / Any day' },
                    ],
                    fields: [
                      {
                        name: 'option',
                        type: 'text',
                        label: 'Option Label',
                        required: true,
                      },
                    ],
                  },
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'meetingFormatLabel',
                        type: 'text',
                        label: 'Meeting Format Label',
                        defaultValue: 'Meeting format',
                        admin: { width: '50%' },
                      },
                      {
                        name: 'meetingFormatPlaceholder',
                        type: 'text',
                        label: 'Meeting Format Placeholder',
                        defaultValue: 'Select a preference',
                        admin: { width: '50%' },
                      },
                    ],
                  },
                  {
                    name: 'meetingFormatOptions',
                    type: 'array',
                    label: 'Meeting Format Options',
                    defaultValue: [
                      { option: 'One-to-one exchange' },
                      { option: 'Team discussion' },
                      { option: 'Informal coffee chat' },
                      { option: 'Virtual meeting post-congress' },
                    ],
                    fields: [
                      {
                        name: 'option',
                        type: 'text',
                        label: 'Option Label',
                        required: true,
                      },
                    ],
                  },
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'notesLabel',
                        type: 'text',
                        label: 'Notes / Textarea Label',
                        defaultValue: "Anything else you'd like us to know?",
                        admin: { width: '50%' },
                      },
                      {
                        name: 'notesPlaceholder',
                        type: 'text',
                        label: 'Notes Placeholder',
                        defaultValue:
                          'Share your priorities or availability. Please do not include patient or sensitive health information.',
                        admin: { width: '50%' },
                      },
                    ],
                  },
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'consentLabel',
                        type: 'text',
                        label: 'Consent Label',
                        defaultValue:
                          'I agree that 316 Group may use these details to contact me about this meeting request.',
                        admin: { width: '50%' },
                      },
                      {
                        name: 'privacyLinkText',
                        type: 'text',
                        label: 'Privacy Link Text',
                        defaultValue: 'See our Privacy notice.',
                        admin: { width: '25%' },
                      },
                      {
                        name: 'privacyLinkUrl',
                        type: 'text',
                        label: 'Privacy Link URL',
                        defaultValue: '/privacy-policy',
                        admin: { width: '25%' },
                      },
                    ],
                  },
                  {
                    name: 'submitButtonText',
                    type: 'text',
                    label: 'Submit Button Text',
                    defaultValue: 'Request a meeting',
                  },
                  {
                    name: 'disclaimerText',
                    type: 'text',
                    label: 'Disclaimer Text Below Button',
                    defaultValue:
                      'Submitting a request does not confirm a meeting. Your details are used to coordinate your enquiry, not to register you for the congress.',
                  },
                ],
              },
            ],
          },
        ],
      },

      // ═══════════════════════════════════════════════════════════════════════════
      // TAB 2: 🎨 INDIVIDUAL STYLING (Element-by-Element Design Controls)
      // ═══════════════════════════════════════════════════════════════════════════
      {
        label: '🎨 Individual Styling',
        fields: [
          // ─── 1. Left Kicker Styling ───────────────────────────────────────
          {
            name: 'kickerStyles',
            type: 'group',
            label: '1. Left Kicker Styling',
            fields: [
              {
                type: 'row',
                fields: [
                  bgColorPickerAll({
                    overrides: {
                      name: 'boxBgColor',
                      label: 'Square Accent Color',
                      defaultValue: 'bg-[#00D2FF]',
                      admin: { width: '33.33%' },
                    },
                  }),
                  {
                    name: 'squareSize',
                    type: 'select',
                    label: 'Square Size',
                    defaultValue: 'w-2.5 h-2.5',
                    validate: allowAnySelect,
                    options: [
                      { label: 'Small (w-2 h-2)', value: 'w-2 h-2' },
                      { label: 'Medium (w-2.5 h-2.5 - Default)', value: 'w-2.5 h-2.5' },
                      { label: 'Large (w-3 h-3)', value: 'w-3 h-3' },
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
                fields: [
                  {
                    name: 'fontSize',
                    type: 'select',
                    label: 'Desktop Font Size',
                    defaultValue: 'text-xs md:text-sm',
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontSizeMobile',
                    type: 'select',
                    label: 'Mobile Font Size',
                    defaultValue: 'text-xs md:text-sm',
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontWeight',
                    type: 'select',
                    label: 'Desktop Font Weight',
                    defaultValue: 'font-semibold',
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'fontWeightMobile',
                    type: 'select',
                    label: 'Mobile Font Weight',
                    defaultValue: 'font-semibold',
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
                    label: 'Desktop Margin Bottom',
                    defaultValue: 'mb-4 md:mb-6',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                  {
                    name: 'marginBottomMobile',
                    type: 'select',
                    label: 'Mobile Margin Bottom',
                    defaultValue: '',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                ],
              },
            ],
          },

          // ─── 2. Left Heading Styling ──────────────────────────────────────
          {
            name: 'headingStyles',
            type: 'group',
            label: '2. Left Heading Styling',
            fields: [
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'headingColor',
                      label: 'Heading Color',
                      defaultValue: 'text-white',
                      admin: { width: '100%' },
                    },
                  }),
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'headingFontSize',
                    type: 'select',
                    label: 'Desktop Font Size',
                    defaultValue: 'text-4xl md:text-5xl lg:text-6xl',
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'headingFontSizeMobile',
                    type: 'select',
                    label: 'Mobile Font Size',
                    defaultValue: 'text-4xl md:text-5xl lg:text-6xl',
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'headingFontWeight',
                    type: 'select',
                    label: 'Desktop Font Weight',
                    defaultValue: 'font-bold',
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'headingFontWeightMobile',
                    type: 'select',
                    label: 'Mobile Font Weight',
                    defaultValue: 'font-bold',
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
                    label: 'Desktop Margin Bottom',
                    defaultValue: 'mb-6 md:mb-8',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                  {
                    name: 'marginBottomMobile',
                    type: 'select',
                    label: 'Mobile Margin Bottom',
                    defaultValue: '',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                ],
              },
            ],
          },

          // ─── 3. Left Description Styling ──────────────────────────────────
          {
            name: 'descriptionStyles',
            type: 'group',
            label: '3. Left Description Styling',
            fields: [
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'descriptionColor',
                      label: 'Text Color',
                      defaultValue: 'text-white/90',
                      admin: { width: '100%' },
                    },
                  }),
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'descriptionFontSize',
                    type: 'select',
                    label: 'Desktop Font Size',
                    defaultValue: 'text-base md:text-lg',
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'descriptionFontSizeMobile',
                    type: 'select',
                    label: 'Mobile Font Size',
                    defaultValue: 'text-base md:text-lg',
                    options: fontSizeOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'descriptionFontWeight',
                    type: 'select',
                    label: 'Desktop Font Weight',
                    defaultValue: 'font-normal',
                    options: fontWeightOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'descriptionFontWeightMobile',
                    type: 'select',
                    label: 'Mobile Font Weight',
                    defaultValue: 'font-normal',
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
                    label: 'Desktop Margin Bottom',
                    defaultValue: 'mb-8 md:mb-10',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                  {
                    name: 'marginBottomMobile',
                    type: 'select',
                    label: 'Mobile Margin Bottom',
                    defaultValue: '',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                ],
              },
            ],
          },

          // ─── 4. Left Roadmap Steps Styling ────────────────────────────────
          {
            name: 'roadmapStyles',
            type: 'group',
            label: '4. Left Roadmap Steps Styling',
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'showDivider',
                    type: 'checkbox',
                    label: 'Show Divider Line (<hr>)',
                    defaultValue: true,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'borderColor',
                    type: 'select',
                    label: 'Divider Line Color',
                    defaultValue: 'border-white/20',
                    validate: allowAnySelect,
                    options: dividerColorOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'borderWidth',
                    type: 'select',
                    label: 'Divider Line Thickness',
                    defaultValue: 'border-t',
                    validate: allowAnySelect,
                    options: dividerBorderWidthOptions,
                    admin: { width: '25%' },
                  },
                  {
                    name: 'dividerMarginBottom',
                    type: 'select',
                    label: 'Divider Margin Bottom',
                    defaultValue: 'mb-6 md:mb-8',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '25%' },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'stepsTitleColor',
                      label: 'Roadmap Title Color',
                      defaultValue: 'text-white',
                      admin: { width: '33.33%' },
                    },
                  }),
                  {
                    name: 'stepsTitleFontSize',
                    type: 'select',
                    label: 'Roadmap Title Font Size',
                    defaultValue: 'text-base md:text-lg',
                    options: fontSizeOptions,
                    admin: { width: '33.33%' },
                  },
                  {
                    name: 'stepsTitleFontWeight',
                    type: 'select',
                    label: 'Roadmap Title Font Weight',
                    defaultValue: 'font-semibold',
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
                      name: 'stepNumberColor',
                      label: 'Step Numbers Color (e.g. 01)',
                      defaultValue: 'text-[#00D2FF]',
                      admin: { width: '33.33%' },
                    },
                  }),
                  textColorPickerAll({
                    overrides: {
                      name: 'stepTextColor',
                      label: 'Step Text Color',
                      defaultValue: 'text-white',
                      admin: { width: '33.33%' },
                    },
                  }),
                  bgColorPickerAll({
                    overrides: {
                      name: 'matrixColor',
                      label: 'Matrix Squares Color',
                      defaultValue: 'bg-[#00D2FF]',
                      admin: { width: '33.33%' },
                    },
                  }),
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'stepFontSize',
                    type: 'select',
                    label: 'Step Font Size',
                    defaultValue: 'text-sm md:text-base',
                    options: fontSizeOptions,
                    admin: { width: '50%' },
                  },
                  {
                    name: 'stepFontWeight',
                    type: 'select',
                    label: 'Step Font Weight',
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
                    name: 'listMarginBottom',
                    type: 'select',
                    label: 'Margin Bottom After Full List',
                    defaultValue: 'mb-10 md:mb-12',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                  {
                    name: 'listMarginBottomMobile',
                    type: 'select',
                    label: 'Mobile Margin Bottom After Full List',
                    defaultValue: '',
                    validate: allowAnySelect,
                    options: marginBottomOptions,
                    admin: { width: '50%' },
                  },
                ],
              },
            ],
          },

          // ─── 5. Right Form Card Styling ───────────────────────────────────
          {
            name: 'formCardStyles',
            type: 'group',
            label: '5. Right Form Card Styling',
            fields: [
              {
                type: 'row',
                fields: [
                  bgColorPickerAll({
                    overrides: {
                      name: 'formCardBgColor',
                      label: 'Form Card Background Color',
                      defaultValue: 'bg-white',
                      admin: { width: '33.33%' },
                    },
                  }),
                  bgColorPickerAll({
                    overrides: {
                      name: 'submitButtonBgColor',
                      label: 'Submit Button Background',
                      defaultValue: 'bg-[#0256FF]',
                      admin: { width: '33.33%' },
                    },
                  }),
                  textColorPickerAll({
                    overrides: {
                      name: 'submitButtonTextColor',
                      label: 'Submit Button Text Color',
                      defaultValue: 'text-white',
                      admin: { width: '33.33%' },
                    },
                  }),
                ],
              },
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'disclaimerTextColor',
                      label: 'Disclaimer Text Color',
                      defaultValue: 'text-slate-500',
                      admin: { width: '100%' },
                    },
                  }),
                ],
              },
            ],
          },
        ],
      },

      // ═══════════════════════════════════════════════════════════════════════════
      // TAB 3: ⚙️ SECTION LAYOUT & SPACING (Global Section Outer Container)
      // ═══════════════════════════════════════════════════════════════════════════
      {
        label: '⚙️ Section Layout & Spacing',
        fields: [
          // ─── 1. Layout & Header Width Alignment ─────────────────────────────
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

          // ─── 2. Section Background & Vertical Paddings ──────────────────────
          {
            type: 'row',
            fields: [
              bgColorPickerAll({
                overrides: {
                  name: 'sectionBgColor',
                  label: 'Section Background Color',
                  defaultValue: 'bg-[#0000FF]',
                  admin: { width: '33.33%' },
                },
              }),
              {
                name: 'paddingTop',
                type: 'select',
                label: 'Top Padding',
                defaultValue: 'pt-20 md:pt-28',
                validate: allowAnySelect,
                options: [
                  { label: 'None (0)', value: 'pt-0' },
                  { label: 'Small (pt-12)', value: 'pt-12' },
                  { label: 'Medium (pt-16)', value: 'pt-16' },
                  { label: 'Standard (pt-20 md:pt-28 - Default)', value: 'pt-20 md:pt-28' },
                  { label: 'Large (pt-24 md:pt-32)', value: 'pt-24 md:pt-32' },
                  { label: 'Extra Large (pt-32 md:pt-40)', value: 'pt-32 md:pt-40' },
                ],
                admin: { width: '33.33%' },
              },
              {
                name: 'paddingBottom',
                type: 'select',
                label: 'Bottom Padding',
                defaultValue: 'pb-20 md:pb-28',
                validate: allowAnySelect,
                options: [
                  { label: 'None (0)', value: 'pb-0' },
                  { label: 'Small (pb-12)', value: 'pb-12' },
                  { label: 'Medium (pb-16)', value: 'pb-16' },
                  { label: 'Standard (pb-20 md:pb-28 - Default)', value: 'pb-20 md:pb-28' },
                  { label: 'Large (pb-24 md:pb-32)', value: 'pb-24 md:pb-32' },
                  { label: 'Extra Large (pb-32 md:pb-40)', value: 'pb-32 md:pb-40' },
                ],
                admin: { width: '33.33%' },
              },
            ],
          },
        ],
      },
    ],
  },
]

export const EventConversationForm: Block = {
  slug: 'eventConversationForm',
  interfaceName: 'EventConversationFormBlock',
  labels: {
    singular: 'Event Conversation Form',
    plural: 'Event Conversation Form Blocks',
  },
  fields: eventConversationFormFields,
}
