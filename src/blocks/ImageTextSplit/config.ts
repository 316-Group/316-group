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

export const getImageTextSplitFields = ({
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
              ? 'Defaults to "Transparent" so it automatically uses the Column Background Color.'
              : 'Choose background color behind the card section.',
          },
        },
      }),
      {
        name: 'paddingTop',
        type: 'select',
        label: 'Section Padding Top',
        defaultValue: isColumn ? 'pt-0' : 'pt-16',
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
          { label: 'Huge (112px) - pt-28', value: 'pt-28' },
          { label: 'Massive (128px) - pt-32', value: 'pt-32' },
          { label: 'Custom Value', value: 'custom' },
        ],
      },
      {
        name: 'paddingBottom',
        type: 'select',
        label: 'Section Padding Bottom',
        defaultValue: isColumn ? 'pb-0' : 'pb-16',
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
          { label: 'Huge (112px) - pb-28', value: 'pb-28' },
          { label: 'Massive (128px) - pb-32', value: 'pb-32' },
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

  // ─── 2. Outer Card Styling ───────────────────────────────────────────────
  {
    type: 'row',
    fields: [
      bgColorPickerAll({
        overrides: {
          name: 'cardBgColor',
          label: 'Card Background Color',
          defaultValue: 'bg-[#F8FAFC]',
          validate: allowAnySelect,
          admin: {
            width: '50%',
            description: 'Background color of the card container (default: Soft Off-White #F8FAFC).',
          },
        },
      }),
      {
        name: 'cardBorderRadius',
        type: 'select',
        label: 'Card Rounded Corners',
        defaultValue: 'rounded-[32px]',
        validate: allowAnySelect,
        admin: { width: '50%' },
        options: [
          { label: 'None (0px) - rounded-none', value: 'rounded-none' },
          { label: 'Small (8px) - rounded-lg', value: 'rounded-lg' },
          { label: 'Medium (12px) - rounded-xl', value: 'rounded-xl' },
          { label: 'Large (16px) - rounded-2xl', value: 'rounded-2xl' },
          { label: 'Extra Large (24px) - rounded-3xl', value: 'rounded-3xl' },
          { label: 'Huge 32px (Default) - rounded-[32px]', value: 'rounded-[32px]' },
          { label: 'Massive 40px - rounded-[40px]', value: 'rounded-[40px]' },
        ],
      },
    ],
  },

  // ─── 3. Left Column: Image Settings ──────────────────────────────────────
  {
    name: 'leftImageGroup',
    type: 'group',
    label: 'Left Column: Image Settings',
    fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Left Column Image',
        admin: {
          description: 'Uploaded image filling the entire height and width of the left card section.',
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

  // ─── 4. Right Column: Padding & Spacing Controls ─────────────────────────
  {
    name: 'rightColumnPadding',
    type: 'group',
    label: 'Right Column: Padding Controls (Desktop & Mobile)',
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'paddingTopDesktop',
            type: 'select',
            label: 'Desktop Padding Top',
            defaultValue: 'pt-16',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: [
              { label: 'None (0px)', value: 'pt-0' },
              { label: 'Small (24px) - pt-6', value: 'pt-6' },
              { label: 'Medium (32px) - pt-8', value: 'pt-8' },
              { label: 'Medium-Lg (48px) - pt-12', value: 'pt-12' },
              { label: 'Large (64px - Default) - pt-16', value: 'pt-16' },
              { label: 'Extra Large (80px) - pt-20', value: 'pt-20' },
              { label: 'Huge (96px) - pt-24', value: 'pt-24' },
              { label: 'Custom', value: 'custom' },
            ],
          },
          {
            name: 'paddingBottomDesktop',
            type: 'select',
            label: 'Desktop Padding Bottom',
            defaultValue: 'pb-16',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: [
              { label: 'None (0px)', value: 'pb-0' },
              { label: 'Small (24px) - pb-6', value: 'pb-6' },
              { label: 'Medium (32px) - pb-8', value: 'pb-8' },
              { label: 'Medium-Lg (48px) - pb-12', value: 'pb-12' },
              { label: 'Large (64px - Default) - pb-16', value: 'pb-16' },
              { label: 'Extra Large (80px) - pb-20', value: 'pb-20' },
              { label: 'Huge (96px) - pb-24', value: 'pb-24' },
              { label: 'Custom', value: 'custom' },
            ],
          },
          {
            name: 'paddingLeftDesktop',
            type: 'select',
            label: 'Desktop Padding Left',
            defaultValue: 'pl-12',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: [
              { label: 'None (0px)', value: 'pl-0' },
              { label: 'Small (24px) - pl-6', value: 'pl-6' },
              { label: 'Medium (32px) - pl-8', value: 'pl-8' },
              { label: 'Large (48px - Default) - pl-12', value: 'pl-12' },
              { label: 'Extra Large (64px) - pl-16', value: 'pl-16' },
              { label: 'Huge (80px) - pl-20', value: 'pl-20' },
              { label: 'Custom', value: 'custom' },
            ],
          },
          {
            name: 'paddingRightDesktop',
            type: 'select',
            label: 'Desktop Padding Right',
            defaultValue: 'pr-16',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: [
              { label: 'None (0px)', value: 'pr-0' },
              { label: 'Small (24px) - pr-6', value: 'pr-6' },
              { label: 'Medium (32px) - pr-8', value: 'pr-8' },
              { label: 'Large (48px) - pr-12', value: 'pr-12' },
              { label: 'Extra Large (64px - Default) - pr-16', value: 'pr-16' },
              { label: 'Huge (80px) - pr-20', value: 'pr-20' },
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
              condition: (_, s) => s?.rightColumnPadding?.paddingTopDesktop === 'custom',
            },
          },
          {
            name: 'paddingBottomDesktopCustom',
            type: 'text',
            label: 'Custom Desktop Padding Bottom',
            admin: {
              width: '25%',
              condition: (_, s) => s?.rightColumnPadding?.paddingBottomDesktop === 'custom',
            },
          },
          {
            name: 'paddingLeftDesktopCustom',
            type: 'text',
            label: 'Custom Desktop Padding Left',
            admin: {
              width: '25%',
              condition: (_, s) => s?.rightColumnPadding?.paddingLeftDesktop === 'custom',
            },
          },
          {
            name: 'paddingRightDesktopCustom',
            type: 'text',
            label: 'Custom Desktop Padding Right',
            admin: {
              width: '25%',
              condition: (_, s) => s?.rightColumnPadding?.paddingRightDesktop === 'custom',
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

  // ─── 5. Right Column: Pill Badge ─────────────────────────────────────────
  {
    name: 'badgeGroup',
    type: 'group',
    label: 'Right Column: Pill Badge',
    fields: [
      {
        name: 'badgeText',
        type: 'text',
        label: 'Badge Text',
        defaultValue: 'Meet the team',
        admin: {
          description: 'Text shown inside the pill badge. If empty, the badge will not render.',
        },
      },
      {
        type: 'row',
        fields: [
          bgColorPickerAll({
            overrides: {
              name: 'badgeBgColor',
              label: 'Badge Background Color',
              defaultValue: 'bg-[#F0F5FF]',
              validate: allowAnySelect,
              admin: { width: '50%' },
            },
          }),
          textColorPickerAll({
            overrides: {
              name: 'badgeTextColor',
              label: 'Badge Text Color',
              defaultValue: 'text-[#0256FF]',
              validate: allowAnySelect,
              admin: { width: '50%' },
            },
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'badgeFontSize',
            type: 'select',
            label: 'Badge Font Size (Desktop)',
            defaultValue: 'text-xs md:text-sm',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontSizeOptions,
          },
          {
            name: 'badgeFontWeight',
            type: 'select',
            label: 'Badge Font Weight (Desktop)',
            defaultValue: 'font-medium',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontWeightOptions,
          },
          {
            name: 'badgeFontSizeMobile',
            type: 'select',
            label: 'Badge Font Size (Mobile)',
            defaultValue: 'text-xs',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontSizeOptions,
          },
          {
            name: 'badgeFontWeightMobile',
            type: 'select',
            label: 'Badge Font Weight (Mobile)',
            defaultValue: 'font-medium',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: fontWeightOptions,
          },
        ],
      },
      {
        name: 'badgeMarginBottom',
        type: 'select',
        label: 'Badge Margin Bottom',
        defaultValue: 'mb-8 md:mb-10',
        validate: allowAnySelect,
        options: [
          { label: 'Small (16px) - mb-4', value: 'mb-4' },
          { label: 'Medium (24px) - mb-6', value: 'mb-6' },
          { label: 'Large (32px) - mb-8', value: 'mb-8' },
          { label: 'Standard (32px / 40px - Default) - mb-8 md:mb-10', value: 'mb-8 md:mb-10' },
          { label: 'Extra Large (48px) - mb-12', value: 'mb-12' },
        ],
      },
    ],
  },

  // ─── 6. Right Column: Heading ────────────────────────────────────────────
  {
    name: 'headingGroup',
    type: 'group',
    label: 'Right Column: Heading (RichText with Inline HTML)',
    fields: [
      {
        name: 'heading',
        type: 'richText',
        label: 'Heading Content',
        admin: {
          description:
            'Heading text. Supports inline HTML such as <br /> to break lines cleanly without rendering raw tags.',
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
            defaultValue: 'text-3xl sm:text-4xl md:text-5xl lg:text-[54px]',
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
            defaultValue: 'text-2xl sm:text-3xl',
            validate: allowAnySelect,
            admin: { width: '25%' },
            options: [
              ...fontSizeOptions,
              {
                label: 'Mobile Display (text-2xl sm:text-3xl)',
                value: 'text-2xl sm:text-3xl',
              },
            ],
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

  // ─── 7. Right Column: Description ────────────────────────────────────────
  {
    name: 'descriptionGroup',
    type: 'group',
    label: 'Right Column: Description (RichText with Inline HTML)',
    fields: [
      {
        name: 'description',
        type: 'richText',
        label: 'Description Content',
        admin: {
          description:
            'Body copy below the heading. Supports inline HTML and paragraph formatting.',
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
              defaultValue: 'text-slate-600',
              validate: allowAnySelect,
              admin: { width: '50%' },
            },
          }),
          {
            name: 'descriptionMarginBottom',
            type: 'select',
            label: 'Description Margin Bottom (Spacing to Button)',
            defaultValue: 'mb-8 md:mb-10',
            validate: allowAnySelect,
            admin: { width: '50%' },
            options: [
              ...marginBottomOptions,
              {
                label: 'Spacious (mb-8 md:mb-10 - Default)',
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
            defaultValue: 'text-base md:text-lg',
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
            defaultValue: 'text-sm md:text-base',
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

  // ─── 8. Right Column: Action Button ──────────────────────────────────────
  {
    name: 'buttonGroup',
    type: 'group',
    label: 'Right Column: Action Button (Capsule with Circle Arrow)',
    fields: [
      {
        name: 'buttonText',
        type: 'text',
        label: 'Button Text',
        defaultValue: 'Meet the team',
        admin: {
          description:
            'Text shown on the capsule button. If left empty, the button will not render.',
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
          bgColorPickerAll({
            overrides: {
              name: 'buttonBgColor',
              label: 'Button Background Color',
              defaultValue: 'bg-[#0256FF]',
              validate: allowAnySelect,
              admin: { width: '50%' },
            },
          }),
          textColorPickerAll({
            overrides: {
              name: 'buttonTextColor',
              label: 'Button Text Color',
              defaultValue: 'text-white',
              validate: allowAnySelect,
              admin: { width: '50%' },
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
              admin: { width: '50%' },
            },
          }),
          textColorPickerAll({
            overrides: {
              name: 'iconArrowColor',
              label: 'Arrow Icon Color',
              defaultValue: 'text-[#0256FF]',
              validate: allowAnySelect,
              admin: { width: '50%' },
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

export const imageTextSplitFields: Field[] = getImageTextSplitFields({ isColumn: false })
export const imageTextSplitColumnFields: Field[] = getImageTextSplitFields({ isColumn: true })

export const ImageTextSplit: Block = {
  slug: 'imageTextSplit',
  interfaceName: 'ImageTextSplitBlock',
  labels: {
    singular: 'Image Text Split',
    plural: 'Image Text Splits',
  },
  fields: imageTextSplitFields,
}

export default ImageTextSplit
