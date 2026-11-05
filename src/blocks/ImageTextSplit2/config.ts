import { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { link } from '@/fields/link'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const allowAnySelect = (() => true as const) as any

const marginBottomOptions = [
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
]

export const getImageTextSplit2Fields = ({
  isColumn = false,
}: { isColumn?: boolean } = {}): Field[] => [
  // ─── 1. Section Spacing & Background ─────────────────────────────────────
  {
    type: 'row',
    fields: [
      bgColorPickerAll({
        overrides: {
          name: 'sectionBgColor',
          label: isColumn ? 'Content Background Color' : 'Section Background Color',
          defaultValue: isColumn ? 'bg-transparent' : 'bg-transparent',
          validate: allowAnySelect,
          admin: {
            width: '33.33%',
            description: isColumn
              ? 'Defaults to "Transparent" to inherit the Column Background Color.'
              : 'Choose background color behind the card section.',
          },
        },
      }),
      {
        name: 'paddingTop',
        type: 'select',
        label: 'Section Padding Top',
        defaultValue: isColumn ? 'pt-0' : 'pt-12',
        validate: allowAnySelect,
        admin: { width: '33.33%' },
        options: [
          { label: 'None (0px) - pt-0', value: 'pt-0' },
          { label: 'Tiny (8px) - pt-2', value: 'pt-2' },
          { label: 'Extra Small (16px) - pt-4', value: 'pt-4' },
          { label: 'Small (24px) - pt-6', value: 'pt-6' },
          { label: 'Small-Med (32px) - pt-8', value: 'pt-8' },
          { label: 'Medium-Sm (40px) - pt-10', value: 'pt-10' },
          { label: 'Medium (48px) - pt-12', value: 'pt-12' },
          { label: 'Medium-Lg (64px) - pt-16', value: 'pt-16' },
          { label: 'Large (80px) - pt-20', value: 'pt-20' },
          { label: 'Extra Large (96px) - pt-24', value: 'pt-24' },
          { label: 'Custom Value', value: 'custom' },
        ],
      },
      {
        name: 'paddingBottom',
        type: 'select',
        label: 'Section Padding Bottom',
        defaultValue: isColumn ? 'pb-0' : 'pb-12',
        validate: allowAnySelect,
        admin: { width: '33.33%' },
        options: [
          { label: 'None (0px) - pb-0', value: 'pb-0' },
          { label: 'Tiny (8px) - pb-2', value: 'pb-2' },
          { label: 'Extra Small (16px) - pb-4', value: 'pb-4' },
          { label: 'Small (24px) - pb-6', value: 'pb-6' },
          { label: 'Small-Med (32px) - pb-8', value: 'pb-8' },
          { label: 'Medium-Sm (40px) - pb-10', value: 'pb-10' },
          { label: 'Medium (48px) - pb-12', value: 'pb-12' },
          { label: 'Medium-Lg (64px) - pb-16', value: 'pb-16' },
          { label: 'Large (80px) - pb-20', value: 'pb-20' },
          { label: 'Extra Large (96px) - pb-24', value: 'pb-24' },
          { label: 'Custom Value', value: 'custom' },
        ],
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'paddingTopCustom',
        type: 'text',
        label: 'Custom Section Padding Top (e.g. 90px, 6rem)',
        admin: {
          width: '50%',
          condition: (_, s) => s?.paddingTop === 'custom',
        },
      },
      {
        name: 'paddingBottomCustom',
        type: 'text',
        label: 'Custom Section Padding Bottom (e.g. 90px, 6rem)',
        admin: {
          width: '50%',
          condition: (_, s) => s?.paddingBottom === 'custom',
        },
      },
    ],
  },

  // ─── 2. Layout Direction & Card Container Styling ─────────────────────────
  {
    type: 'row',
    fields: [
      {
        name: 'imagePosition',
        type: 'select',
        label: 'Image Position / Side',
        defaultValue: 'imageLeft',
        validate: allowAnySelect,
        admin: {
          width: '33.33%',
          description: 'Switch which side has the image and which side has text on desktop.',
        },
        options: [
          { label: 'Image Left, Text Right (Default)', value: 'imageLeft' },
          { label: 'Image Right, Text Left', value: 'imageRight' },
        ],
      },
      {
        name: 'cardBorderRadius',
        type: 'select',
        label: 'Card Rounded Corners',
        defaultValue: 'rounded-none',
        validate: allowAnySelect,
        admin: {
          width: '33.33%',
          description: 'Default is sharp unrounded corners (rounded-none). You can choose rounded corners if desired.',
        },
        options: [
          { label: 'None (0px) - rounded-none (Default)', value: 'rounded-none' },
          { label: 'Small (8px) - rounded-lg', value: 'rounded-lg' },
          { label: 'Medium (12px) - rounded-xl', value: 'rounded-xl' },
          { label: 'Large (16px) - rounded-2xl', value: 'rounded-2xl' },
          { label: 'Extra Large (24px) - rounded-3xl', value: 'rounded-3xl' },
          { label: 'Huge (32px) - rounded-[32px]', value: 'rounded-[32px]' },
          { label: 'Massive (40px) - rounded-[40px]', value: 'rounded-[40px]' },
        ],
      },
      bgColorPickerAll({
        overrides: {
          name: 'cardBgColor',
          label: 'Card Background Color',
          defaultValue: 'bg-white',
          validate: allowAnySelect,
          admin: {
            width: '33.33%',
            description: 'Background color of the card container (default: White #FFFFFF).',
          },
        },
      }),
    ],
  },

  // ─── 3. Image Settings ───────────────────────────────────────────────────
  {
    name: 'imageGroup',
    type: 'group',
    label: 'Image Settings',
    fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Image Asset',
        admin: {
          description: 'Uploaded image filling the entire height and width of the image half.',
        },
      },
      {
        type: 'row',
        fields: [
          {
            name: 'imageAlt',
            type: 'text',
            label: 'Image Alt Text (Optional override)',
            admin: { width: '50%' },
          },
          {
            name: 'mobileImageHeight',
            type: 'select',
            label: 'Mobile Image Height (Stacked view)',
            defaultValue: 'h-72 sm:h-96',
            validate: allowAnySelect,
            admin: { width: '50%' },
            options: [
              { label: 'Compact (220px) - h-[220px]', value: 'h-[220px]' },
              { label: 'Small (260px) - h-[260px]', value: 'h-[260px]' },
              { label: 'Standard (h-72 / sm:h-96 - Default)', value: 'h-72 sm:h-96' },
              { label: 'Medium (h-80 / sm:h-[420px])', value: 'h-80 sm:h-[420px]' },
              { label: 'Tall (h-96 / sm:h-[480px])', value: 'h-96 sm:h-[480px]' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 4. Text Column Padding & Spacing Controls ───────────────────────────
  {
    name: 'textColumnPadding',
    type: 'group',
    label: 'Text Column: Padding Controls (Desktop & Mobile)',
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'paddingTopDesktop',
            type: 'select',
            label: 'Desktop Padding Top',
            defaultValue: 'pt-12',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: [
              { label: 'None (0px)', value: 'pt-0' },
              { label: 'Small (24px) - pt-6', value: 'pt-6' },
              { label: 'Medium (32px) - pt-8', value: 'pt-8' },
              { label: 'Large (48px - Default) - pt-12', value: 'pt-12' },
              { label: 'Extra Large (64px) - pt-16', value: 'pt-16' },
              { label: 'Huge (80px) - pt-20', value: 'pt-20' },
              { label: 'Custom', value: 'custom' },
            ],
          },
          {
            name: 'paddingBottomDesktop',
            type: 'select',
            label: 'Desktop Padding Bottom',
            defaultValue: 'pb-12',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: [
              { label: 'None (0px)', value: 'pb-0' },
              { label: 'Small (24px) - pb-6', value: 'pb-6' },
              { label: 'Medium (32px) - pb-8', value: 'pb-8' },
              { label: 'Large (48px - Default) - pb-12', value: 'pb-12' },
              { label: 'Extra Large (64px) - pb-16', value: 'pb-16' },
              { label: 'Huge (80px) - pb-20', value: 'pb-20' },
              { label: 'Custom', value: 'custom' },
            ],
          },
          {
            name: 'paddingLeftDesktop',
            type: 'select',
            label: 'Desktop Padding Left',
            defaultValue: 'pl-10',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: [
              { label: 'None (0px)', value: 'pl-0' },
              { label: 'Small (24px) - pl-6', value: 'pl-6' },
              { label: 'Medium (32px) - pl-8', value: 'pl-8' },
              { label: 'Large (40px - Default) - pl-10', value: 'pl-10' },
              { label: 'Extra Large (48px) - pl-12', value: 'pl-12' },
              { label: 'Huge (64px) - pl-16', value: 'pl-16' },
              { label: 'Custom', value: 'custom' },
            ],
          },
          {
            name: 'paddingRightDesktop',
            type: 'select',
            label: 'Desktop Padding Right',
            defaultValue: 'pr-10',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: [
              { label: 'None (0px)', value: 'pr-0' },
              { label: 'Small (24px) - pr-6', value: 'pr-6' },
              { label: 'Medium (32px) - pr-8', value: 'pr-8' },
              { label: 'Large (40px - Default) - pr-10', value: 'pr-10' },
              { label: 'Extra Large (48px) - pr-12', value: 'pr-12' },
              { label: 'Huge (64px) - pr-16', value: 'pr-16' },
              { label: 'Custom', value: 'custom' },
            ],
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'paddingTopDesktopCustom',
            type: 'text',
            label: 'Custom Desktop Padding Top',
            admin: {
              width: '25%',
              condition: (_, s) => s?.textColumnPadding?.paddingTopDesktop === 'custom',
            },
          },
          {
            name: 'paddingBottomDesktopCustom',
            type: 'text',
            label: 'Custom Desktop Padding Bottom',
            admin: {
              width: '25%',
              condition: (_, s) => s?.textColumnPadding?.paddingBottomDesktop === 'custom',
            },
          },
          {
            name: 'paddingLeftDesktopCustom',
            type: 'text',
            label: 'Custom Desktop Padding Left',
            admin: {
              width: '25%',
              condition: (_, s) => s?.textColumnPadding?.paddingLeftDesktop === 'custom',
            },
          },
          {
            name: 'paddingRightDesktopCustom',
            type: 'text',
            label: 'Custom Desktop Padding Right',
            admin: {
              width: '25%',
              condition: (_, s) => s?.textColumnPadding?.paddingRightDesktop === 'custom',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'paddingTopMobile',
            type: 'select',
            label: 'Mobile Padding Top',
            defaultValue: 'pt-8',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: [
              { label: 'None (0px)', value: 'pt-0' },
              { label: 'Small (16px) - pt-4', value: 'pt-4' },
              { label: 'Medium (24px) - pt-6', value: 'pt-6' },
              { label: 'Standard (32px - Default) - pt-8', value: 'pt-8' },
              { label: 'Large (40px) - pt-10', value: 'pt-10' },
              { label: 'Extra Large (48px) - pt-12', value: 'pt-12' },
            ],
          },
          {
            name: 'paddingBottomMobile',
            type: 'select',
            label: 'Mobile Padding Bottom',
            defaultValue: 'pb-8',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: [
              { label: 'None (0px)', value: 'pb-0' },
              { label: 'Small (16px) - pb-4', value: 'pb-4' },
              { label: 'Medium (24px) - pb-6', value: 'pb-6' },
              { label: 'Standard (32px - Default) - pb-8', value: 'pb-8' },
              { label: 'Large (40px) - pb-10', value: 'pb-10' },
              { label: 'Extra Large (48px) - pb-12', value: 'pb-12' },
            ],
          },
          {
            name: 'paddingLeftMobile',
            type: 'select',
            label: 'Mobile Padding Left',
            defaultValue: 'pl-6',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: [
              { label: 'None (0px)', value: 'pl-0' },
              { label: 'Small (16px) - pl-4', value: 'pl-4' },
              { label: 'Standard (24px - Default) - pl-6', value: 'pl-6' },
              { label: 'Large (32px) - pl-8', value: 'pl-8' },
            ],
          },
          {
            name: 'paddingRightMobile',
            type: 'select',
            label: 'Mobile Padding Right',
            defaultValue: 'pr-6',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: [
              { label: 'None (0px)', value: 'pr-0' },
              { label: 'Small (16px) - pr-4', value: 'pr-4' },
              { label: 'Standard (24px - Default) - pr-6', value: 'pr-6' },
              { label: 'Large (32px) - pr-8', value: 'pr-8' },
            ],
          },
        ],
      },
    ],
  },

  // ─── 5. Optional Subheading / Pill Badge ─────────────────────────────────
  {
    name: 'subheadingGroup',
    type: 'group',
    label: 'Optional Subheading / Pill Badge',
    fields: [
      {
        name: 'subheadingText',
        type: 'text',
        label: 'Subheading Text (Optional)',
        defaultValue: '',
        admin: {
          description: 'Optional text shown above the heading. If left empty, nothing renders.',
        },
      },
      {
        type: 'row',
        fields: [
          {
            name: 'subheadingStyle',
            type: 'select',
            label: 'Subheading Presentation',
            defaultValue: 'badge',
            validate: allowAnySelect,
            admin: { width: '33.33%' },
            options: [
              { label: 'Pill Badge (Rounded pill background)', value: 'badge' },
              { label: 'Clean Text (No background)', value: 'text' },
            ],
          },
          bgColorPickerAll({
            overrides: {
              name: 'subheadingBgColor',
              label: 'Pill Badge Background Color',
              defaultValue: 'bg-[#F0F5FF]',
              validate: allowAnySelect,
              admin: {
                width: '33.33%',
                condition: (_, s) => s?.subheadingGroup?.subheadingStyle === 'badge',
              },
            },
          }),
          textColorPickerAll({
            overrides: {
              name: 'subheadingTextColor',
              label: 'Subheading Text Color',
              defaultValue: 'text-[#0256FF]',
              validate: allowAnySelect,
              admin: { width: '33.33%' },
            },
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'subheadingFontSize',
            type: 'select',
            label: 'Font Size (Desktop)',
            defaultValue: 'text-xs md:text-sm',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontSizeOptions,
          },
          {
            name: 'subheadingFontWeight',
            type: 'select',
            label: 'Font Weight (Desktop)',
            defaultValue: 'font-medium',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontWeightOptions,
          },
          {
            name: 'subheadingFontSizeMobile',
            type: 'select',
            label: 'Font Size (Mobile)',
            defaultValue: 'text-xs',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontSizeOptions,
          },
          {
            name: 'subheadingFontWeightMobile',
            type: 'select',
            label: 'Font Weight (Mobile)',
            defaultValue: 'font-medium',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontWeightOptions,
          },
        ],
      },
      {
        name: 'subheadingMarginBottom',
        type: 'select',
        label: 'Subheading Margin Bottom',
        defaultValue: 'mb-6',
        validate: allowAnySelect,
        options: marginBottomOptions,
      },
    ],
  },

  // ─── 6. Main Heading (Enabled by Default) ─────────────────────────────────
  {
    name: 'headingGroup',
    type: 'group',
    label: 'Main Heading (RichText with Inline HTML)',
    fields: [
      {
        name: 'heading',
        type: 'richText',
        label: 'Heading Content',
        admin: {
          description:
            'Heading text (defaults to "We embody our values" if empty). Supports inline HTML such as <br /> to break lines cleanly.',
        },
        editor: lexicalEditor({
          features: ({ rootFeatures }) => [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ],
        }),
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'headingColor',
              label: 'Heading Text Color',
              defaultValue: 'text-slate-950',
              validate: allowAnySelect,
              admin: { width: '50%' },
            },
          }),
          {
            name: 'headingMarginBottom',
            type: 'select',
            label: 'Heading Margin Bottom',
            defaultValue: 'mb-6',
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
            defaultValue: 'text-2xl sm:text-3xl lg:text-4xl',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: [
              ...fontSizeOptions,
              {
                label: 'Display Split (text-3xl sm:text-4xl md:text-5xl lg:text-[54px])',
                value: 'text-3xl sm:text-4xl md:text-5xl lg:text-[54px]',
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
            defaultValue: 'text-2xl',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontSizeOptions,
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

  // ─── 7. Description / Body Copy (Enabled by Default) ───────────────────────
  {
    name: 'descriptionGroup',
    type: 'group',
    label: 'Description / Body Copy (RichText with Inline HTML)',
    fields: [
      {
        name: 'description',
        type: 'richText',
        label: 'Description Content',
        admin: {
          description:
            'Body copy below the heading (defaults to 316 Group values paragraph if empty). Supports inline HTML and formatting.',
        },
        editor: lexicalEditor({
          features: ({ rootFeatures }) => [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ],
        }),
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'descriptionColor',
              label: 'Description Text Color',
              defaultValue: 'text-slate-700',
              validate: allowAnySelect,
              admin: { width: '50%' },
            },
          }),
          {
            name: 'descriptionMarginBottom',
            type: 'select',
            label: 'Description Margin Bottom',
            defaultValue: 'mb-8',
            validate: allowAnySelect,
            admin: { width: '50%' },
            options: [
              ...marginBottomOptions,
              {
                label: 'Spacious (mb-8 md:mb-10)',
                value: 'mb-8 md:mb-10',
              },
            ],
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
            defaultValue: 'text-base lg:text-lg',
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
            defaultValue: 'text-sm sm:text-base',
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

  // ─── 8. Optional Action Button ───────────────────────────────────────────
  {
    name: 'buttonGroup',
    type: 'group',
    label: 'Optional Action Button',
    fields: [
      {
        name: 'buttonText',
        type: 'text',
        label: 'Button Text (Optional)',
        defaultValue: '',
        admin: {
          description:
            'Text shown on the button. If left empty, no button will render.',
        },
      },
      link({
        required: false,
        disableLabel: true,
        appearances: false,
        overrides: {
          name: 'buttonLink',
          label: 'Button Destination Link (Optional)',
          admin: {
            description:
              'Optional destination. If left blank, clicking the button remains on the current page.',
          },
        },
      }),
      {
        type: 'row',
        fields: [
          {
            name: 'buttonStyle',
            type: 'select',
            label: 'Button Style',
            defaultValue: 'capsuleArrow',
            validate: allowAnySelect,
            admin: { width: '33.33%' },
            options: [
              { label: 'Capsule with Circle Arrow', value: 'capsuleArrow' },
              { label: 'Standard Rounded Button', value: 'standard' },
            ],
          },
          bgColorPickerAll({
            overrides: {
              name: 'buttonBgColor',
              label: 'Button Background Color',
              defaultValue: 'bg-[#0256FF]',
              validate: allowAnySelect,
              admin: { width: '33.33%' },
            },
          }),
          textColorPickerAll({
            overrides: {
              name: 'buttonTextColor',
              label: 'Button Text Color',
              defaultValue: 'text-white',
              validate: allowAnySelect,
              admin: { width: '33.33%' },
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
              label: 'Arrow Circle Background Color',
              defaultValue: 'bg-white',
              validate: allowAnySelect,
              admin: {
                width: '50%',
                condition: (_, s) => s?.buttonGroup?.buttonStyle === 'capsuleArrow',
              },
            },
          }),
          textColorPickerAll({
            overrides: {
              name: 'iconArrowColor',
              label: 'Arrow Icon Color',
              defaultValue: 'text-[#0256FF]',
              validate: allowAnySelect,
              admin: {
                width: '50%',
                condition: (_, s) => s?.buttonGroup?.buttonStyle === 'capsuleArrow',
              },
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
            defaultValue: 'text-xs md:text-sm',
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

export const imageTextSplit2Fields: Field[] = getImageTextSplit2Fields({ isColumn: false })
export const imageTextSplit2ColumnFields: Field[] = getImageTextSplit2Fields({ isColumn: true })

export const ImageTextSplit2: Block = {
  slug: 'imageTextSplit2',
  interfaceName: 'ImageTextSplit2Block',
  labels: {
    singular: 'Image Text Split 2',
    plural: 'Image Text Splits 2',
  },
  fields: imageTextSplit2Fields,
}

export default ImageTextSplit2

