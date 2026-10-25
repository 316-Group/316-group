import { Block } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { fontSizeOptions, fontWeightOptions, spacingOptions } from '../CenteredContent/config'

export const defaultWebinarRecapAccessLayout = {
  blockType: 'webinarRecapAccess',
  topHeadingText: 'Access the recording',
  topMetaText: 'ON DEMAND',
  leadDescriptionText:
    "Register below to get instant access to the full replay of our FinNext 2026 webinar. Complete your details and we'll send a direct link to your inbox.",
  kickerText: "LET'S START A CONVERSATION",
  headingText: 'Your next\nconnection starts\nhere.',
  descriptionText:
    "Tell us a little about yourself and what you'd like to discuss. We'll be in touch to explore a suitable time to meet during ESMO 2026.",
  stepsSubheadingText: 'What happens next?',
  steps: [
    { numberText: '01', text: 'Share your interests and availability.' },
    { numberText: '02', text: "We'll follow up to shape the conversation." },
    { numberText: '03', text: 'Confirm a time and place together.' },
  ],
  showBottomIcon: true,
  submitButtonText: 'Access the recording',
  requiredNoteText: '* Required field',
  sectionBgColor: 'bg-[#0000FF]',
  matchHeaderPillWidth: true,
  paddingTopDesktop: '80px',
  paddingTopMobile: '48px',
  paddingBottomDesktop: '80px',
  paddingBottomMobile: '48px',
  paddingLeftDesktop: '32px',
  paddingLeftMobile: '16px',
  paddingRightDesktop: '32px',
  paddingRightMobile: '16px',
}

export const WebinarRecapAccess: Block = {
  slug: 'webinarRecapAccess',
  labels: {
    singular: 'Webinar Recap On-Demand Access & Form',
    plural: 'Webinar Recap On-Demand Access & Form Sections',
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
            // ── 1. Top Bar Header & Lead Text ─────────────────────────────────
            {
              type: 'group',
              name: 'topHeader',
              label: '1. Top Bar Header & Lead Description',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'topHeadingText',
                      type: 'text',
                      label: 'Top Left Heading',
                      defaultValue: 'Access the recording',
                      required: false,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'topMetaText',
                      type: 'text',
                      label: 'Top Right Meta Tag',
                      defaultValue: 'ON DEMAND',
                      required: false,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'leadDescriptionText',
                  type: 'textarea',
                  label: 'Lead Description Paragraph (Supports inline HTML)',
                  defaultValue:
                    "Register below to get instant access to the full replay of our FinNext 2026 webinar. Complete your details and we'll send a direct link to your inbox.",
                  required: false,
                },
              ],
            },

            // ── 2. Left Column Content ────────────────────────────────────────
            {
              type: 'group',
              name: 'leftColumn',
              label: '2. Left Column: Context & Roadmap',
              fields: [
                {
                  name: 'kickerText',
                  type: 'text',
                  label: 'Subheading Kicker Text',
                  defaultValue: "LET'S START A CONVERSATION",
                  required: false,
                },
                {
                  name: 'headingText',
                  type: 'textarea',
                  label: 'Main Heading (Supports line breaks & inline HTML)',
                  defaultValue: 'Your next\nconnection starts\nhere.',
                  required: false,
                },
                {
                  name: 'descriptionText',
                  type: 'textarea',
                  label: 'Narrative Description Copy',
                  defaultValue:
                    "Tell us a little about yourself and what you'd like to discuss. We'll be in touch to explore a suitable time to meet during ESMO 2026.",
                  required: false,
                },
                {
                  name: 'stepsSubheadingText',
                  type: 'text',
                  label: 'Roadmap Subheading',
                  defaultValue: 'What happens next?',
                  required: false,
                },
                {
                  name: 'steps',
                  type: 'array',
                  label: 'Roadmap Steps (01, 02, 03...)',
                  minRows: 0,
                  defaultValue: [
                    { numberText: '01', text: 'Share your interests and availability.' },
                    { numberText: '02', text: "We'll follow up to shape the conversation." },
                    { numberText: '03', text: 'Confirm a time and place together.' },
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
                {
                  name: 'showBottomIcon',
                  type: 'checkbox',
                  label: 'Show Bottom 3x3 Cyan Matrix Graphic',
                  defaultValue: true,
                },
              ],
            },

            // ── 3. Right Column: Form Fields Configuration ─────────────────────
            {
              type: 'group',
              name: 'formFields',
              label: '3. Right Column: Form Fields & Options',
              fields: [
                // Row 1: First Name & Last Name
                {
                  type: 'group',
                  name: 'firstName',
                  label: 'First Name Field',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'enabled',
                          type: 'checkbox',
                          label: 'Enable First Name',
                          defaultValue: true,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'isRequired',
                          type: 'checkbox',
                          label: 'Required (*)',
                          defaultValue: true,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'label',
                          type: 'text',
                          label: 'Field Label',
                          defaultValue: 'First name',
                          admin: { width: '25%' },
                        },
                        {
                          name: 'placeholder',
                          type: 'text',
                          label: 'Placeholder Text',
                          defaultValue: 'Your first name',
                          admin: { width: '25%' },
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'group',
                  name: 'lastName',
                  label: 'Last Name Field',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'enabled',
                          type: 'checkbox',
                          label: 'Enable Last Name',
                          defaultValue: true,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'isRequired',
                          type: 'checkbox',
                          label: 'Required (*)',
                          defaultValue: true,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'label',
                          type: 'text',
                          label: 'Field Label',
                          defaultValue: 'Last name',
                          admin: { width: '25%' },
                        },
                        {
                          name: 'placeholder',
                          type: 'text',
                          label: 'Placeholder Text',
                          defaultValue: 'Your last name',
                          admin: { width: '25%' },
                        },
                      ],
                    },
                  ],
                },

                // Row 2: Work Email
                {
                  type: 'group',
                  name: 'workEmail',
                  label: 'Work Email Field',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'enabled',
                          type: 'checkbox',
                          label: 'Enable Work Email',
                          defaultValue: true,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'isRequired',
                          type: 'checkbox',
                          label: 'Required (*)',
                          defaultValue: true,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'label',
                          type: 'text',
                          label: 'Field Label',
                          defaultValue: 'Work email',
                          admin: { width: '25%' },
                        },
                        {
                          name: 'placeholder',
                          type: 'text',
                          label: 'Placeholder Text',
                          defaultValue: 'you@organisation.com',
                          admin: { width: '25%' },
                        },
                      ],
                    },
                  ],
                },

                // Row 3: Organisation & Job Title
                {
                  type: 'group',
                  name: 'organisation',
                  label: 'Organisation Field',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'enabled',
                          type: 'checkbox',
                          label: 'Enable Organisation',
                          defaultValue: true,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'isRequired',
                          type: 'checkbox',
                          label: 'Required (*)',
                          defaultValue: true,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'label',
                          type: 'text',
                          label: 'Field Label',
                          defaultValue: 'Organisation',
                          admin: { width: '25%' },
                        },
                        {
                          name: 'placeholder',
                          type: 'text',
                          label: 'Placeholder Text',
                          defaultValue: 'Organisation name',
                          admin: { width: '25%' },
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'group',
                  name: 'jobTitle',
                  label: 'Job Title Field',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'enabled',
                          type: 'checkbox',
                          label: 'Enable Job Title',
                          defaultValue: true,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'isRequired',
                          type: 'checkbox',
                          label: 'Required (*)',
                          defaultValue: false,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'label',
                          type: 'text',
                          label: 'Field Label',
                          defaultValue: 'Job title',
                          admin: { width: '25%' },
                        },
                        {
                          name: 'placeholder',
                          type: 'text',
                          label: 'Placeholder Text',
                          defaultValue: 'Your role',
                          admin: { width: '25%' },
                        },
                      ],
                    },
                  ],
                },

                // Row 4: Sector Dropdown
                {
                  type: 'group',
                  name: 'sector',
                  label: 'Sector Dropdown Field',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'enabled',
                          type: 'checkbox',
                          label: 'Enable Sector',
                          defaultValue: true,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'isRequired',
                          type: 'checkbox',
                          label: 'Required (*)',
                          defaultValue: true,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'label',
                          type: 'text',
                          label: 'Field Label',
                          defaultValue: 'Sector',
                          admin: { width: '25%' },
                        },
                        {
                          name: 'placeholder',
                          type: 'text',
                          label: 'Placeholder Text',
                          defaultValue: 'Select your sector',
                          admin: { width: '25%' },
                        },
                      ],
                    },
                    {
                      name: 'helperText',
                      type: 'text',
                      label: 'Helper Text Under Dropdown',
                      defaultValue:
                        'e.g. Banking, Payments, InsurTech, RegTech, Investment, Other',
                    },
                    {
                      name: 'options',
                      type: 'array',
                      label: 'Sector Dropdown Options',
                      defaultValue: [
                        { label: 'Banking' },
                        { label: 'Payments & Processing' },
                        { label: 'InsurTech' },
                        { label: 'RegTech & Compliance' },
                        { label: 'Investment & Wealth Management' },
                        { label: 'eCommerce & Retail' },
                        { label: 'Technology Advisory' },
                        { label: 'Other' },
                      ],
                      fields: [
                        {
                          name: 'label',
                          type: 'text',
                          label: 'Option Label',
                          required: false,
                        },
                      ],
                    },
                  ],
                },

                // Row 5: What topics are most relevant to you?
                {
                  type: 'group',
                  name: 'discussionTopic',
                  label: 'Discussion Topic Dropdown Field',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'enabled',
                          type: 'checkbox',
                          label: 'Enable Topic Field',
                          defaultValue: true,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'isRequired',
                          type: 'checkbox',
                          label: 'Required (*)',
                          defaultValue: true,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'label',
                          type: 'text',
                          label: 'Field Label',
                          defaultValue: 'What topics are most relevant to you?',
                          admin: { width: '50%' },
                        },
                        {
                          name: 'placeholder',
                          type: 'text',
                          label: 'Placeholder Text',
                          defaultValue: 'Select a discussion topic',
                          admin: { width: '50%' },
                        },
                      ],
                    },
                    {
                      name: 'options',
                      type: 'array',
                      label: 'Topic Options',
                      defaultValue: [
                        { label: 'Cross-border Payments & FX Infrastructure' },
                        { label: 'Embedded Finance & Banking-as-a-Service (BaaS)' },
                        { label: 'Regulatory Compliance & AML / KYC Modernization' },
                        { label: 'Data & Identity Intelligence' },
                        { label: 'Digital Assets, Treasury & Liquidity Management' },
                        { label: 'Platform Scaling & Enterprise Architecture' },
                        { label: 'General Partnership Inquiry' },
                      ],
                      fields: [
                        {
                          name: 'label',
                          type: 'text',
                          label: 'Option Label',
                          required: false,
                        },
                      ],
                    },
                  ],
                },

                // Row 6: Preferred viewing time & Follow-up preference
                {
                  type: 'group',
                  name: 'viewingTime',
                  label: 'Preferred Viewing Time Dropdown',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'enabled',
                          type: 'checkbox',
                          label: 'Enable Field',
                          defaultValue: true,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'isRequired',
                          type: 'checkbox',
                          label: 'Required (*)',
                          defaultValue: false,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'label',
                          type: 'text',
                          label: 'Field Label',
                          defaultValue: 'Preferred viewing time',
                          admin: { width: '25%' },
                        },
                        {
                          name: 'placeholder',
                          type: 'text',
                          label: 'Placeholder Text',
                          defaultValue: 'Select a time',
                          admin: { width: '25%' },
                        },
                      ],
                    },
                    {
                      name: 'options',
                      type: 'array',
                      label: 'Viewing Time Options',
                      defaultValue: [
                        { label: 'Immediately (Instant replay access)' },
                        { label: 'This morning' },
                        { label: 'This afternoon' },
                        { label: 'This evening / After hours' },
                        { label: 'Weekend viewing' },
                      ],
                      fields: [
                        {
                          name: 'label',
                          type: 'text',
                          label: 'Option Label',
                          required: false,
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'group',
                  name: 'followUpPreference',
                  label: 'Follow-up Preference Dropdown',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'enabled',
                          type: 'checkbox',
                          label: 'Enable Field',
                          defaultValue: true,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'isRequired',
                          type: 'checkbox',
                          label: 'Required (*)',
                          defaultValue: false,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'label',
                          type: 'text',
                          label: 'Field Label',
                          defaultValue: 'Follow-up preference',
                          admin: { width: '25%' },
                        },
                        {
                          name: 'placeholder',
                          type: 'text',
                          label: 'Placeholder Text',
                          defaultValue: 'Select a preference',
                          admin: { width: '25%' },
                        },
                      ],
                    },
                    {
                      name: 'options',
                      type: 'array',
                      label: 'Follow-up Options',
                      defaultValue: [
                        { label: 'Email recording link & recap only' },
                        { label: 'Schedule a 15-minute briefing with an expert' },
                        { label: 'Request an enterprise solution demo' },
                        { label: 'No additional follow-up required' },
                      ],
                      fields: [
                        {
                          name: 'label',
                          type: 'text',
                          label: 'Option Label',
                          required: false,
                        },
                      ],
                    },
                  ],
                },

                // Row 7: Anything else you'd like us to know?
                {
                  type: 'group',
                  name: 'notes',
                  label: 'Additional Notes Textarea',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'enabled',
                          type: 'checkbox',
                          label: 'Enable Notes Field',
                          defaultValue: true,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'isRequired',
                          type: 'checkbox',
                          label: 'Required (*)',
                          defaultValue: false,
                          admin: { width: '25%' },
                        },
                        {
                          name: 'label',
                          type: 'text',
                          label: 'Field Label',
                          defaultValue: "Anything else you'd like us to know?",
                          admin: { width: '50%' },
                        },
                      ],
                    },
                    {
                      name: 'placeholder',
                      type: 'textarea',
                      label: 'Placeholder Text',
                      defaultValue:
                        'Share your priorities, questions or areas of interest. Please do not include sensitive financial or personal information.',
                    },
                  ],
                },

                // Consent Agreement Checkbox
                {
                  type: 'group',
                  name: 'consent',
                  label: 'Consent Agreement Checkbox',
                  fields: [
                    {
                      name: 'enabled',
                      type: 'checkbox',
                      label: 'Enable Consent Checkbox',
                      defaultValue: true,
                    },
                    {
                      name: 'consentLabel',
                      type: 'textarea',
                      label: 'Consent Label (Supports HTML link to Privacy Policy)',
                      defaultValue:
                        'I agree that 316 Group may use these details to send me access to the webinar recording and relevant updates. * See our <a href="/privacy" class="text-blue-600 underline hover:text-blue-800">Privacy Policy</a> for details on how we handle your data.',
                    },
                  ],
                },

                // Action Row
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'submitButtonText',
                      type: 'text',
                      label: 'Submit Button Label',
                      defaultValue: 'Access the recording',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'requiredNoteText',
                      type: 'text',
                      label: 'Required Footnote Text',
                      defaultValue: '* Required field',
                      admin: { width: '50%' },
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
            // Top Bar Styles
            {
              type: 'group',
              name: 'topHeaderStyles',
              label: '1. Top Bar Header Styling',
              fields: [
                textColorPickerAll({
                  overrides: {
                    name: 'topHeadingColor',
                    label: 'Heading Text Color',
                    defaultValue: 'text-white',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'topHeadingFontSizeDesktop',
                      type: 'select',
                      label: 'Heading Font Size (Desktop)',
                      defaultValue: 'text-3xl md:text-4xl lg:text-5xl',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'topHeadingFontSizeMobile',
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
                      name: 'topHeadingFontWeightDesktop',
                      type: 'select',
                      label: 'Heading Font Weight (Desktop)',
                      defaultValue: 'font-semibold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'topHeadingFontWeightMobile',
                      type: 'select',
                      label: 'Heading Font Weight (Mobile)',
                      defaultValue: 'font-semibold',
                      options: fontWeightOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
                textColorPickerAll({
                  overrides: {
                    name: 'topMetaColor',
                    label: 'Meta Tag Text Color',
                    defaultValue: 'text-white',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'topMetaFontSizeDesktop',
                      type: 'select',
                      label: 'Meta Font Size (Desktop)',
                      defaultValue: 'text-xs sm:text-sm',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'topMetaFontSizeMobile',
                      type: 'select',
                      label: 'Meta Font Size (Mobile)',
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
                      name: 'topHeaderMarginBottomDesktop',
                      type: 'select',
                      label: 'Top Header Margin Bottom (Desktop)',
                      defaultValue: 'mb-4 md:mb-6',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'topHeaderMarginBottomMobile',
                      type: 'select',
                      label: 'Top Header Margin Bottom (Mobile)',
                      defaultValue: 'mb-4',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // Top Divider Line Styles
            {
              type: 'group',
              name: 'topHrStyles',
              label: '2. Top Divider Line (<hr>) Styling',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'topHrColor',
                    label: 'Divider Line Color',
                    defaultValue: 'bg-white/30',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'topHrHeight',
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
                      name: 'topHrMarginBottomDesktop',
                      type: 'select',
                      label: 'Divider Margin Bottom (Desktop)',
                      defaultValue: 'mb-6 md:mb-8',
                      options: spacingOptions,
                      admin: { width: '33%' },
                    },
                    {
                      name: 'topHrMarginBottomMobile',
                      type: 'select',
                      label: 'Divider Margin Bottom (Mobile)',
                      defaultValue: 'mb-5',
                      options: spacingOptions,
                      admin: { width: '33%' },
                    },
                  ],
                },
              ],
            },

            // Lead Description Styles
            {
              type: 'group',
              name: 'leadDescriptionStyles',
              label: '3. Lead Description Copy Styling',
              fields: [
                textColorPickerAll({
                  overrides: {
                    name: 'leadDescriptionColor',
                    label: 'Description Text Color',
                    defaultValue: 'text-white/90',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'leadDescriptionFontSizeDesktop',
                      type: 'select',
                      label: 'Font Size (Desktop)',
                      defaultValue: 'text-lg md:text-xl',
                      options: fontSizeOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'leadDescriptionFontSizeMobile',
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
                      name: 'leadDescriptionMarginBottomDesktop',
                      type: 'select',
                      label: 'Margin Bottom (Desktop)',
                      defaultValue: 'mb-12 md:mb-16',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'leadDescriptionMarginBottomMobile',
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

            // Left Column Styles
            {
              type: 'group',
              name: 'leftColumnStyles',
              label: '4. Left Column Context & Roadmap Styling',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'kickerSquareColor',
                    label: 'Kicker Accent Square Color',
                    defaultValue: 'bg-[#00D2FF]',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'kickerTextColor',
                    label: 'Kicker Text Color',
                    defaultValue: 'text-white',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'headingColor',
                    label: 'Main Heading Color',
                    defaultValue: 'text-white',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'descriptionColor',
                    label: 'Description Text Color',
                    defaultValue: 'text-white/90',
                  },
                }),
                bgColorPickerAll({
                  overrides: {
                    name: 'columnHrColor',
                    label: 'Mid-Column Divider Color',
                    defaultValue: 'bg-white/20',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'stepsSubheadingColor',
                    label: 'Steps Subheading Color',
                    defaultValue: 'text-white',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'stepNumberColor',
                    label: 'Step Numbers Color (01, 02...)',
                    defaultValue: 'text-[#38BDF8]',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'stepTextColor',
                    label: 'Step Description Color',
                    defaultValue: 'text-white',
                  },
                }),
                bgColorPickerAll({
                  overrides: {
                    name: 'matrixColor',
                    label: '3x3 Square Matrix Color',
                    defaultValue: 'bg-[#00D2FF]',
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'stepsContainerMarginBottomDesktop',
                      type: 'select',
                      label: 'Steps Box Bottom Margin (Desktop)',
                      defaultValue: 'mb-10 md:mb-14',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'stepsContainerMarginBottomMobile',
                      type: 'select',
                      label: 'Steps Box Bottom Margin (Mobile)',
                      defaultValue: 'mb-8',
                      options: spacingOptions,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },

            // Right Column: Form Card Styles
            {
              type: 'group',
              name: 'formCardStyles',
              label: '5. Right Column Form Card Styling',
              fields: [
                bgColorPickerAll({
                  overrides: {
                    name: 'formCardBgColor',
                    label: 'Card Background Color',
                    defaultValue: 'bg-white',
                  },
                }),
                bgColorPickerAll({
                  overrides: {
                    name: 'submitButtonBgColor',
                    label: 'Submit Button Background Color',
                    defaultValue: 'bg-[#0000FF]',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'submitButtonTextColor',
                    label: 'Submit Button Text / Arrow Color',
                    defaultValue: 'text-white',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'requiredAsteriskColor',
                    label: 'Required Asterisk (*) Color',
                    defaultValue: 'text-[#0000FF]',
                  },
                }),
                textColorPickerAll({
                  overrides: {
                    name: 'requiredNoteColor',
                    label: 'Required Footnote Text Color',
                    defaultValue: 'text-gray-500',
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
            bgColorPickerAll({
              overrides: {
                name: 'sectionBgColor',
                label: 'Section Background Color',
                defaultValue: 'bg-[#0000FF]',
              },
            }),
            {
              type: 'checkbox',
              name: 'matchHeaderPillWidth',
              label: 'Match Header Width (Align with Logo & Nav, Max 1472px)',
              defaultValue: true,
              admin: {
                description:
                  'Constrains content container to max-w-[1472px] aligning with the website header.',
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
                description: 'Anchor identifier for navigation (e.g. "access-recording")',
              },
            },
          ],
        },
      ],
    },
  ],
}
