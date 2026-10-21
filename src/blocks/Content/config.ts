import type { Block, Field } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { VerticalCTAFields } from '@/fields/vcta'
import { textClasses } from '@/fields/textClasses'
import { linkGroup } from '@/fields/linkGroup'
import { Testimonials } from '@/fields/testimonials'
import { Carousel } from '@/fields/carousel'
import { dimensionClasses } from '@/fields/dimensionClasses'
import { shadowClasses } from '@/fields/shadowClasses'
import { borderClasses } from '@/fields/borderClasses'
import { bgOpacityPicker } from '@/fields/bgOpacityPicker'
import { Banner } from '../Banner/config'
import { Code } from '../Code/config'
import { MediaBlock } from '../MediaBlock/config'
import { BusinessSlider } from '../BusinessSlider/config'
import { HoverSliderBlock } from '../HoverSlider/config'
import { colorPickerAll } from '@/fields/colorPicker'
import { icon } from '@/fields/icon'
import { gradientColorPicker } from '@/fields/gradientColorPicker'
import { link } from '@/fields/link'
import { centeredContentFields } from '../CenteredContent/config'
import { clickExpandFields } from '../ClickExpand/config'
import { gridColFields } from '../GridCol/config'
import { animatedIconsGridFields } from '../AnimatedIconsGrid/config'
import { featureCardsFields } from '../FeatureCards/config'
import { featureCardsV2Fields } from '../FeatureCardsV2/config'
import { verticalCTAv2Fields } from '../VerticalCTAv2/config'
import { solutionsAccordionLayoutFields } from '../SolutionsAccordion/config'
import { splitTextFields } from '../SplitText/config'
import { imageSliderFields } from '../ImageSlider/config'
import { blogPostUpdatedFields } from '../BlogPostUpdated/config'
import { readyToGrowFields } from '../ReadyToGrow/config'
import { whoWeAreFields, whoWeAreColumnFields } from '../WhoWeAre/config'
import { numberedGridFields, numberedGridColumnFields } from '../NumberedGrid/config'
import { missionVisionFields, missionVisionColumnFields } from '../MissionVision/config'
import { timelineAccordionFields, timelineAccordionColumnFields } from '../TimelineAccordion/config'
import { imageTextSplitColumnFields } from '../ImageTextSplit/config'
import { centeredButtonColumnFields } from '../CenteredButton/config'

const allowAnySelect = (() => true as const) as any

const desktopPaddingOptions = [
  { label: '0px (Full Bleed)', value: '0px' },
  { label: '8px', value: '8px' },
  { label: '10px', value: '10px' },
  { label: '16px', value: '16px' },
  { label: '20px', value: '20px' },
  { label: '24px', value: '24px' },
  { label: '30px', value: '30px' },
  { label: '40px', value: '40px' },
  { label: '50px (Default)', value: '50px' },
  { label: '60px', value: '60px' },
  { label: '80px', value: '80px' },
  { label: '100px', value: '100px' },
  { label: '120px', value: '120px' },
  { label: '150px', value: '150px' },
  { label: '180px', value: '180px' },
  { label: '200px', value: '200px' },
  { label: '250px', value: '250px' },
  { label: '300px', value: '300px' },
  { label: 'Custom Value', value: 'custom' },
]

const mobilePaddingOptions = [
  { label: '0px (Full Bleed)', value: '0px' },
  { label: '8px', value: '8px' },
  { label: '10px', value: '10px' },
  { label: '16px (Default / Standard Mobile)', value: '16px' },
  { label: '20px', value: '20px' },
  { label: '24px', value: '24px' },
  { label: '30px', value: '30px' },
  { label: '40px', value: '40px' },
  { label: '50px', value: '50px' },
  { label: '60px', value: '60px' },
  { label: '80px', value: '80px' },
  { label: '100px', value: '100px' },
  { label: 'Custom Value', value: 'custom' },
]

const columnFields: Field[] = [
  {
    name: 'matchHeaderPillWidth',
    type: 'checkbox',
    label: 'Match Header Pill Width',
    defaultValue: false,
    admin: {
      description:
        'Toggle ON to make this column width match the site header (Logo to Navigation, max 1,472px container, centered).',
    },
  },
  {
    name: 'widthMode',
    type: 'select',
    label: 'Column Width Mode',
    defaultValue: 'contained',
    admin: {
      condition: (_, siblingData) => !siblingData?.matchHeaderPillWidth,
      description:
        'Choose whether this column is contained within standard page margins or spans the full width of the screen.',
    },
    options: [
      { label: 'Contained (Default - Max 1376px Container)', value: 'contained' },
      { label: 'Full Width (Edge-to-Edge of Viewport)', value: 'fullWidth' },
    ],
  },
  {
    name: 'paddingMode',
    type: 'select',
    label: 'Column Content Horizontal Padding',
    defaultValue: 'default',
    validate: allowAnySelect,
    options: [
      { label: 'Default Padding', value: 'default' },
      { label: 'Match Header (Align with Logo & Navigation)', value: 'matchHeader' },
      { label: 'No Padding / Full Width Screen Bleed (0px)', value: 'none' },
      { label: 'Custom Horizontal Padding', value: 'custom' },
    ],
    admin: {
      condition: (_, siblingData) => !siblingData?.matchHeaderPillWidth,
      description:
        'Adjust horizontal padding, or choose Match Header to perfectly align content width with the site Logo and Navigation across all screen sizes.',
    },
  },
  {
    name: 'paddingSide',
    type: 'select',
    label: 'Padding Target Side',
    defaultValue: 'both',
    admin: {
      condition: (_, siblingData) => !siblingData?.matchHeaderPillWidth && siblingData?.paddingMode === 'custom',
      description:
        'Choose whether to apply padding to both sides together, left only, right only, or set separate left & right values.',
    },
    options: [
      { label: 'Both Sides (Left & Right Together)', value: 'both' },
      { label: 'Left Side Only', value: 'left' },
      { label: 'Right Side Only', value: 'right' },
      { label: 'Separate Left & Right', value: 'split' },
    ],
  },

  // ─── Both Sides (Left & Right Together) ──────────────────────────────────
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) =>
        !siblingData?.matchHeaderPillWidth &&
        siblingData?.paddingMode === 'custom' &&
        (!siblingData?.paddingSide || siblingData?.paddingSide === 'both'),
    },
    fields: [
      {
        name: 'paddingXDesktop',
        type: 'select',
        label: 'Desktop Padding (Left & Right)',
        defaultValue: '50px',
        options: desktopPaddingOptions,
        admin: { width: '50%' },
      },
      {
        name: 'paddingXDesktopCustom',
        type: 'text',
        label: 'Custom Desktop Padding (e.g. 75px)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.paddingXDesktop === 'custom',
        },
      },
    ],
  },
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) =>
        !siblingData?.matchHeaderPillWidth &&
        siblingData?.paddingMode === 'custom' &&
        (!siblingData?.paddingSide || siblingData?.paddingSide === 'both'),
    },
    fields: [
      {
        name: 'paddingXMobile',
        type: 'select',
        label: 'Mobile Padding (Left & Right)',
        defaultValue: '16px',
        options: mobilePaddingOptions,
        admin: { width: '50%' },
      },
      {
        name: 'paddingXMobileCustom',
        type: 'text',
        label: 'Custom Mobile Padding (e.g. 12px)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.paddingXMobile === 'custom',
        },
      },
    ],
  },

  // ─── Left Side (For 'left' or 'split') ────────────────────────────────────
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) =>
        !siblingData?.matchHeaderPillWidth &&
        siblingData?.paddingMode === 'custom' &&
        (siblingData?.paddingSide === 'left' || siblingData?.paddingSide === 'split'),
    },
    fields: [
      {
        name: 'paddingLeftDesktop',
        type: 'select',
        label: 'Desktop Padding Left',
        defaultValue: '50px',
        options: desktopPaddingOptions,
        admin: { width: '50%' },
      },
      {
        name: 'paddingLeftDesktopCustom',
        type: 'text',
        label: 'Custom Desktop Padding Left (e.g. 75px)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.paddingLeftDesktop === 'custom',
        },
      },
    ],
  },
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) =>
        !siblingData?.matchHeaderPillWidth &&
        siblingData?.paddingMode === 'custom' &&
        (siblingData?.paddingSide === 'left' || siblingData?.paddingSide === 'split'),
    },
    fields: [
      {
        name: 'paddingLeftMobile',
        type: 'select',
        label: 'Mobile Padding Left',
        defaultValue: '16px',
        options: mobilePaddingOptions,
        admin: { width: '50%' },
      },
      {
        name: 'paddingLeftMobileCustom',
        type: 'text',
        label: 'Custom Mobile Padding Left (e.g. 12px)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.paddingLeftMobile === 'custom',
        },
      },
    ],
  },

  // ─── Right Side (For 'right' or 'split') ───────────────────────────────────
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) =>
        !siblingData?.matchHeaderPillWidth &&
        siblingData?.paddingMode === 'custom' &&
        (siblingData?.paddingSide === 'right' || siblingData?.paddingSide === 'split'),
    },
    fields: [
      {
        name: 'paddingRightDesktop',
        type: 'select',
        label: 'Desktop Padding Right',
        defaultValue: '50px',
        options: desktopPaddingOptions,
        admin: { width: '50%' },
      },
      {
        name: 'paddingRightDesktopCustom',
        type: 'text',
        label: 'Custom Desktop Padding Right (e.g. 75px)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.paddingRightDesktop === 'custom',
        },
      },
    ],
  },
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) =>
        !siblingData?.matchHeaderPillWidth &&
        siblingData?.paddingMode === 'custom' &&
        (siblingData?.paddingSide === 'right' || siblingData?.paddingSide === 'split'),
    },
    fields: [
      {
        name: 'paddingRightMobile',
        type: 'select',
        label: 'Mobile Padding Right',
        defaultValue: '16px',
        options: mobilePaddingOptions,
        admin: { width: '50%' },
      },
      {
        name: 'paddingRightMobileCustom',
        type: 'text',
        label: 'Custom Mobile Padding Right (e.g. 12px)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.paddingRightMobile === 'custom',
        },
      },
    ],
  },
  {
    name: 'verticalPaddingMode',
    type: 'select',
    label: 'Column Content Vertical Padding',
    defaultValue: 'default',
    options: [
      { label: 'Default Padding', value: 'default' },
      { label: 'No Padding (0px Top & Bottom)', value: 'none' },
      { label: 'Custom Vertical Padding', value: 'custom' },
    ],
    admin: {
      description:
        'Adjust or remove top and bottom padding for the content in this column.',
    },
  },
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) => siblingData?.verticalPaddingMode === 'custom',
    },
    fields: [
      {
        name: 'columnPaddingTop',
        type: 'select',
        label: 'Column Padding Top',
        defaultValue: 'pt-0',
        options: [
          { label: '0px (None)', value: 'pt-0' },
          { label: '8px (pt-2)', value: 'pt-2' },
          { label: '16px (pt-4)', value: 'pt-4' },
          { label: '24px (pt-6)', value: 'pt-6' },
          { label: '32px (pt-8)', value: 'pt-8' },
          { label: '40px (pt-10)', value: 'pt-10' },
          { label: '48px (pt-12)', value: 'pt-12' },
          { label: '64px (pt-16)', value: 'pt-16' },
          { label: '80px (pt-20)', value: 'pt-20' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: { width: '50%' },
      },
      {
        name: 'columnPaddingTopCustom',
        type: 'text',
        label: 'Custom Column Padding Top (e.g. 15px, 2rem)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.columnPaddingTop === 'custom',
        },
      },
    ],
  },
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) => siblingData?.verticalPaddingMode === 'custom',
    },
    fields: [
      {
        name: 'columnPaddingBottom',
        type: 'select',
        label: 'Column Padding Bottom',
        defaultValue: 'pb-0',
        options: [
          { label: '0px (None)', value: 'pb-0' },
          { label: '8px (pb-2)', value: 'pb-2' },
          { label: '16px (pb-4)', value: 'pb-4' },
          { label: '24px (pb-6)', value: 'pb-6' },
          { label: '32px (pb-8)', value: 'pb-8' },
          { label: '40px (pb-10)', value: 'pb-10' },
          { label: '48px (pb-12)', value: 'pb-12' },
          { label: '64px (pb-16)', value: 'pb-16' },
          { label: '80px (pb-20)', value: 'pb-20' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: { width: '50%' },
      },
      {
        name: 'columnPaddingBottomCustom',
        type: 'text',
        label: 'Custom Column Padding Bottom (e.g. 15px, 2rem)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.columnPaddingBottom === 'custom',
        },
      },
    ],
  },
  {
    name: 'verticalMarginMode',
    type: 'select',
    label: 'Column Content Vertical Margin',
    defaultValue: 'none',
    options: [
      { label: 'No Margin (0px Top & Bottom)', value: 'none' },
      { label: 'Custom Vertical Margin', value: 'custom' },
    ],
    admin: {
      description:
        'Adjust top and bottom margin (outer space) for this column.',
    },
  },
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) => siblingData?.verticalMarginMode === 'custom',
    },
    fields: [
      {
        name: 'columnMarginTop',
        type: 'select',
        label: 'Column Margin Top',
        defaultValue: 'mt-0',
        options: [
          { label: '0px (None)', value: 'mt-0' },
          { label: '8px (mt-2)', value: 'mt-2' },
          { label: '16px (mt-4)', value: 'mt-4' },
          { label: '24px (mt-6)', value: 'mt-6' },
          { label: '32px (mt-8)', value: 'mt-8' },
          { label: '40px (mt-10)', value: 'mt-10' },
          { label: '48px (mt-12)', value: 'mt-12' },
          { label: '64px (mt-16)', value: 'mt-16' },
          { label: '80px (mt-20)', value: 'mt-20' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: { width: '50%' },
      },
      {
        name: 'columnMarginTopCustom',
        type: 'text',
        label: 'Custom Column Margin Top (e.g. 15px, 2rem)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.columnMarginTop === 'custom',
        },
      },
    ],
  },
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) => siblingData?.verticalMarginMode === 'custom',
    },
    fields: [
      {
        name: 'columnMarginBottom',
        type: 'select',
        label: 'Column Margin Bottom',
        defaultValue: 'mb-0',
        options: [
          { label: '0px (None)', value: 'mb-0' },
          { label: '8px (mb-2)', value: 'mb-2' },
          { label: '16px (mb-4)', value: 'mb-4' },
          { label: '24px (mb-6)', value: 'mb-6' },
          { label: '32px (mb-8)', value: 'mb-8' },
          { label: '40px (mb-10)', value: 'mb-10' },
          { label: '48px (mb-12)', value: 'mb-12' },
          { label: '64px (mb-16)', value: 'mb-16' },
          { label: '80px (mb-20)', value: 'mb-20' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: { width: '50%' },
      },
      {
        name: 'columnMarginBottomCustom',
        type: 'text',
        label: 'Custom Column Margin Bottom (e.g. 15px, 2rem)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.columnMarginBottom === 'custom',
        },
      },
    ],
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'full',
    admin: {
      condition: (_, siblingData) => !siblingData?.matchHeaderPillWidth,
    },
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'mobileOrder',
    type: 'number',
  },
  {
    name: 'alignment',
    type: 'select',
    defaultValue: 'left',
    options: [
      {
        label: 'Default',
        value: 'left',
      },
      {
        label: 'Center',
        value: 'center',
      },
    ],
  },
  bgColorPickerAll({
    overrides: {
      name: 'columnBgColor',
      label: 'Column Background Color',
      defaultValue: 'bg-transparent',
      admin: {
        description: 'Set a full width background color for this column.',
      },
    },
  }),
  {
    name: 'applyBgToContent',
    type: 'checkbox',
    label: 'Apply Column Background Color to Content Types',
    defaultValue: true,
    admin: {
      condition: (_, siblingData) =>
        Boolean(siblingData?.columnBgColor && siblingData.columnBgColor !== 'bg-transparent'),
      description:
        'When checked, the column background color will automatically apply to content blocks inside this column (overriding their inner background color).',
    },
  },
  {
    name: 'stretchContentHeight',
    type: 'checkbox',
    label: 'Stretch Content to Full Column Height (Equal Height Columns)',
    defaultValue: true,
    admin: {
      description:
        'When checked, content blocks inside this column expand to take 100% of the column height, eliminating dead space at the top or bottom.',
    },
  },
  {
    name: 'columnContent',
    type: 'array',
    label: 'Column Content',
    fields: [
      {
        name: 'contentType',
        type: 'select',
        required: true,
        defaultValue: 'richText',
        options: [
          { label: 'Rich Text', value: 'richText' },
          { label: 'Styled Heading', value: 'styledHeading' },
          { label: 'Media', value: 'media' },
          { label: 'Link', value: 'link' },
          { label: 'Vertical CTA', value: 'verticalCTA' },
          { label: 'Testimonials', value: 'testimonials' },
          { label: 'Image Carousel', value: 'carousel' },
          { label: 'Card Invert', value: 'cardInvert' },
          { label: 'Card with List', value: 'cardWithList' },
          { label: 'Auto Scroll Slider', value: 'autoScrollSlider' },
          { label: 'Styled Cards', value: 'styledCards' },
          { label: 'Swiper Images Slider', value: 'swiperSlider' },
          { label: 'Status Banner', value: 'statusBanner' },
          { label: 'Spacer', value: 'spacer' },
          { label: 'Modern Card', value: 'modernCard' },
          { label: 'Accordion', value: 'accordion' },
          { label: 'Case Study Slider', value: 'caseStudySlider' },
          { label: 'Image Text Split', value: 'imageTextSplit' },
          { label: 'Divider / Line', value: 'divider' },
          { label: 'Custom Job Action', value: 'customJobAction' },
          { label: 'Custom Button', value: 'customButton' },
          { label: 'Solutions Accordion', value: 'solutionsAccordion' },
          { label: 'Centered Content', value: 'centeredContent' },
          { label: 'Click Expand Cards', value: 'clickExpand' },
          { label: 'Grid Col Feature', value: 'gridCol' },
          { label: 'Animated Icons Grid', value: 'animatedIconsGrid' },
          { label: 'Feature Cards', value: 'featureCards' },
          { label: 'Feature Cards V2', value: 'featureCardsV2' },
          { label: 'Vertical CTA v2', value: 'verticalCTAv2' },
          { label: 'Split Text', value: 'splitText' },
          { label: 'Image Slider', value: 'imageSlider' },
          { label: 'Blog Post Updated', value: 'blogPostUpdated' },
          { label: 'Ready to Grow', value: 'readyToGrow' },
          { label: 'Who We Are', value: 'whoWeAre' },
          { label: 'Numbered Grid', value: 'numberedGrid' },
          { label: 'Mission & Vision', value: 'missionVision' },
          { label: 'Timeline Accordion', value: 'timelineAccordion' },
          { label: 'Centered Button', value: 'centeredButton' },
        ],
      },
      {
        name: 'spacer',
        type: 'group',
        fields: [
          {
            name: 'spacing',
            type: 'select',
            required: true,
            defaultValue: ['pb-0', 'md:pb-8', 'lg:pb-12', 'xl:pb-16', '2xl:pb-32'],
            hasMany: true,
            options: [
              { label: 'None', value: 'pb-0' },
              { label: 'Space 1', value: 'pb-1' },
              { label: 'Space 2', value: 'pb-2' },
              { label: 'Space 4', value: 'pb-4' },
              { label: 'Space 8', value: 'pb-8' },
              { label: 'Space 10', value: 'pb-10' },
              { label: 'Space 12', value: 'pb-12' },
              { label: 'Space 16', value: 'pb-16' },
              { label: 'Space 20', value: 'pb-20' },
              { label: 'Space 24', value: 'pb-24' },
              { label: 'Space 32', value: 'pb-32' },
              { label: 'Space 40', value: 'pb-40' },
              { label: 'Space 48', value: 'pb-48' },
              { label: 'Space 56', value: 'pb-56' },
              { label: 'Space 64', value: 'pb-64' },
              { label: 'Space 72', value: 'pb-72' },
              { label: 'Space 80', value: 'pb-80' },
              // add options for different screen sizes
              { label: 'md:None', value: 'md:pb-0' },
              { label: 'md:Space 1', value: 'md:pb-1' },
              { label: 'md:Space 2', value: 'md:pb-2' },
              { label: 'md:Space 4', value: 'md:pb-4' },
              { label: 'md:Space 8', value: 'md:pb-8' },
              { label: 'md:Space 10', value: 'md:pb-10' },
              { label: 'md:Space 12', value: 'md:pb-12' },
              { label: 'md:Space 16', value: 'md:pb-16' },
              { label: 'md:Space 20', value: 'md:pb-20' },
              { label: 'md:Space 24', value: 'md:pb-24' },
              { label: 'md:Space 32', value: 'md:pb-32' },
              { label: 'md:Space 40', value: 'md:pb-40' },
              { label: 'md:Space 48', value: 'md:pb-48' },
              { label: 'md:Space 56', value: 'md:pb-56' },
              { label: 'md:Space 64', value: 'md:pb-64' },
              { label: 'md:Space 72', value: 'md:pb-72' },
              { label: 'md:Space 80', value: 'md:pb-80' },

              { label: 'lg:None', value: 'lg:pb-0' },
              { label: 'lg:Space 1', value: 'lg:pb-1' },
              { label: 'lg:Space 2', value: 'lg:pb-2' },
              { label: 'lg:Space 4', value: 'lg:pb-4' },
              { label: 'lg:Space 8', value: 'lg:pb-8' },
              { label: 'lg:Space 10', value: 'lg:pb-10' },
              { label: 'lg:Space 12', value: 'lg:pb-12' },
              { label: 'lg:Space 16', value: 'lg:pb-16' },
              { label: 'lg:Space 20', value: 'lg:pb-20' },
              { label: 'lg:Space 24', value: 'lg:pb-24' },
              { label: 'lg:Space 32', value: 'lg:pb-32' },
              { label: 'lg:Space 40', value: 'lg:pb-40' },
              { label: 'lg:Space 48', value: 'lg:pb-48' },
              { label: 'lg:Space 56', value: 'lg:pb-56' },
              { label: 'lg:Space 64', value: 'lg:pb-64' },
              { label: 'lg:Space 72', value: 'lg:pb-72' },
              { label: 'lg:Space 80', value: 'lg:pb-80' },
              // XL options
              { label: 'xl:None', value: 'xl:pb-0' },
              { label: 'xl:Space 1', value: 'xl:pb-1' },
              { label: 'xl:Space 2', value: 'xl:pb-2' },
              { label: 'xl:Space 4', value: 'xl:pb-4' },
              { label: 'xl:Space 8', value: 'xl:pb-8' },
              { label: 'xl:Space 10', value: 'xl:pb-10' },
              { label: 'xl:Space 12', value: 'xl:pb-12' },
              { label: 'xl:Space 16', value: 'xl:pb-16' },
              { label: 'xl:Space 20', value: 'xl:pb-20' },
              { label: 'xl:Space 24', value: 'xl:pb-24' },
              { label: 'xl:Space 32', value: 'xl:pb-32' },
              { label: 'xl:Space 40', value: 'xl:pb-40' },
              { label: 'xl:Space 48', value: 'xl:pb-48' },
              { label: 'xl:Space 56', value: 'xl:pb-56' },
              { label: 'xl:Space 64', value: 'xl:pb-64' },
              { label: 'xl:Space 72', value: 'xl:pb-72' },
              { label: 'xl:Space 80', value: 'xl:pb-80' },
              // 2XL options
              { label: '2xl:None', value: '2xl:pb-0' },
              { label: '2xl:Space 1', value: '2xl:pb-1' },
              { label: '2xl:Space 2', value: '2xl:pb-2' },
              { label: '2xl:Space 4', value: '2xl:pb-4' },
              { label: '2xl:Space 8', value: '2xl:pb-8' },
              { label: '2xl:Space 10', value: '2xl:pb-10' },
              { label: '2xl:Space 12', value: '2xl:pb-12' },
              { label: '2xl:Space 16', value: '2xl:pb-16' },
              { label: '2xl:Space 20', value: '2xl:pb-20' },
              { label: '2xl:Space 24', value: '2xl:pb-24' },
              { label: '2xl:Space 32', value: '2xl:pb-32' },
              { label: '2xl:Space 40', value: '2xl:pb-40' },
              { label: '2xl:Space 48', value: '2xl:pb-48' },
              { label: '2xl:Space 56', value: '2xl:pb-56' },
              { label: '2xl:Space 64', value: '2xl:pb-64' },
              { label: '2xl:Space 72', value: '2xl:pb-72' },
              { label: '2xl:Space 80', value: '2xl:pb-80' },
              // 3XL options
              { label: '3xl:None', value: '3xl:pb-0' },
              { label: '3xl:Space 1', value: '3xl:pb-1' },
              { label: '3xl:Space 2', value: '3xl:pb-2' },
              { label: '3xl:Space 4', value: '3xl:pb-4' },
              { label: '3xl:Space 8', value: '3xl:pb-8' },
              { label: '3xl:Space 10', value: '3xl:pb-10' },
              { label: '3xl:Space 12', value: '3xl:pb-12' },
              { label: '3xl:Space 16', value: '3xl:pb-16' },
              { label: '3xl:Space 20', value: '3xl:pb-20' },
              { label: '3xl:Space 24', value: '3xl:pb-24' },
              { label: '3xl:Space 32', value: '3xl:pb-32' },
              { label: '3xl:Space 40', value: '3xl:pb-40' },
              { label: '3xl:Space 48', value: '3xl:pb-48' },
              { label: '3xl:Space 56', value: '3xl:pb-56' },
              { label: '3xl:Space 64', value: '3xl:pb-64' },
              { label: '3xl:Space 72', value: '3xl:pb-72' },
              { label: '3xl:Space 80', value: '3xl:pb-80' },
            ],
          },
          bgColorPickerAll({
            overrides: {
              defaultValue: 'bg-transparent',
            },
          }),
          {
            name: 'width',
            type: 'select',
            required: true,
            defaultValue: ['w-full'],
            hasMany: true,
            options: [
              { label: 'Full', value: 'w-full' },
              { label: 'Half', value: 'w-1/2' },
              { label: 'Third', value: 'w-1/3' },
              { label: 'Two Thirds', value: 'w-2/3' },
              { label: 'Quarter', value: 'w-1/4' },
              { label: 'Three Quarters', value: 'w-3/4' },
              { label: 'One Fifth', value: 'w-1/5' },
              { label: 'Two Fifths', value: 'w-2/5' },
              { label: 'Three Fifths', value: 'w-3/5' },
              { label: 'Four Fifths', value: 'w-4/5' },
              // add options for different screen sizes
              { label: 'md:Full', value: 'md:w-full' },
              { label: 'md:Half', value: 'md:w-1/2' },
              { label: 'md:Third', value: 'md:w-1/3' },
              { label: 'md:Two Thirds', value: 'md:w-2/3' },
              { label: 'md:Quarter', value: 'md:w-1/4' },
              { label: 'md:Three Quarters', value: 'md:w-3/4' },
              { label: 'md:One Fifth', value: 'md:w-1/5' },
              { label: 'md:Two Fifths', value: 'md:w-2/5' },
              { label: 'md:Three Fifths', value: 'md:w-3/5' },
              { label: 'md:Four Fifths', value: 'md:w-4/5' },
              { label: 'lg:Full', value: 'lg:w-full' },
              { label: 'lg:Half', value: 'lg:w-1/2' },
              { label: 'lg:Third', value: 'lg:w-1/3' },
              { label: 'lg:Two Thirds', value: 'lg:w-2/3' },
              { label: 'lg:Quarter', value: 'lg:w-1/4' },
              { label: 'lg:Three Quarters', value: 'lg:w-3/4' },
              { label: 'lg:One Fifth', value: 'lg:w-1/5' },
              { label: 'lg:Two Fifths', value: 'lg:w-2/5' },
              { label: 'lg:Three Fifths', value: 'lg:w-3/5' },
              { label: 'lg:Four Fifths', value: 'lg:w-4/5' },
              { label: 'xl:Full', value: 'xl:w-full' },
              { label: 'xl:Half', value: 'xl:w-1/2' },
              { label: 'xl:Third', value: 'xl:w-1/3' },
              { label: 'xl:Two Thirds', value: 'xl:w-2/3' },
              { label: 'xl:Quarter', value: 'xl:w-1/4' },
              { label: 'xl:Three Quarters', value: 'xl:w-3/4' },
              { label: 'xl:One Fifth', value: 'xl:w-1/5' },
              { label: 'xl:Two Fifths', value: 'xl:w-2/5' },
              { label: 'xl:Three Fifths', value: 'xl:w-3/5' },
              { label: 'xl:Four Fifths', value: 'xl:w-4/5' },
              { label: '2xl:Full', value: '2xl:w-full' },
              { label: '2xl:Half', value: '2xl:w-1/2' },
              { label: '2xl:Third', value: '2xl:w-1/3' },
              { label: '2xl:Two Thirds', value: '2xl:w-2/3' },
              { label: '2xl:Quarter', value: '2xl:w-1/4' },
              { label: '2xl:Three Quarters', value: '2xl:w-3/4' },
              { label: '2xl:One Fifth', value: '2xl:w-1/5' },
              { label: '2xl:Two Fifths', value: '2xl:w-2/5' },
              { label: '2xl:Three Fifths', value: '2xl:w-3/5' },
              { label: '2xl:Four Fifths', value: '2xl:w-4/5' },
            ],
          },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'spacer',
        },
      },
      {
        name: 'swiperImages',
        type: 'upload',
        relationTo: 'media',
        hasMany: true,
        admin: {
          condition: (_, { contentType }) => contentType === 'swiperSlider',
        },
      },
      {
        name: 'cardInvert',
        type: 'group',
        fields: [
          {
            name: 'cardTitle',

            type: 'text',
            required: true,
          },
          {
            name: 'cardDescription',
            type: 'text',
            required: true,
          },
          {
            name: 'cardImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
          },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'cardInvert',
        },
      },
      {
        name: 'richText',
        type: 'richText',
        editor: lexicalEditor({
          features: ({ rootFeatures }) => [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
            BlocksFeature({
              blocks: [Banner, Code, MediaBlock, BusinessSlider, HoverSliderBlock],
            }),
          ],
        }),
        admin: {
          condition: (_, { contentType }) => contentType === 'richText',
        },
      },
      textClasses({
        overrides: {
          name: 'richTextClasses',
          label: 'Rich Text Classes',
          defaultValue: [],
          admin: {
            condition: (_, { contentType }) => contentType === 'richText',
          },
        },
      }),
      {
        name: 'styledHeading',
        type: 'group',
        fields: [
          {
            name: 'heading',
            type: 'text',
            required: true,
            defaultValue: 'Going Further <br /> <span class="text-lime-300">Together</span>',
          },
          textClasses({
            overrides: {
              name: 'headingClasses',
              label: 'Heading Classes',
              defaultValue: ['text-5xl', 'md:text-7xl', 'lg:text-8xl', 'xl:text-9xl', 'font-bold'],
            },
          }),
          {
            name: 'leftBorderStyle',
            type: 'checkbox',
            defaultValue: true,
            admin: {
              description: 'Add a left border to the heading',
            },
          },
          colorPickerAll({
            overrides: {
              name: 'borderColor',
              label: 'Border Color',
              defaultValue: 'white',
            },
          }),
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'styledHeading',
        },
      },
      {
        name: 'media',
        type: 'upload',
        relationTo: 'media',
        admin: {
          condition: (_, { contentType }) => contentType === 'media',
        },
      },
      {
        name: 'mediaWidth',
        type: 'select',
        defaultValue: 'default',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Full Width', value: 'full' },
          { label: 'Fill Container', value: 'fill' },
          { label: 'Custom', value: 'custom' },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'media',
        },
      },
      {
        name: 'mediaCustomWidth',
        type: 'text',
        admin: {
          condition: (_, { contentType, mediaWidth }) =>
            contentType === 'media' && mediaWidth === 'custom',
          description: 'Enter a valid CSS width value (e.g. 500px, 50%, 20rem)',
        },
      },
      {
        name: 'mediaMobileCustomWidth',
        type: 'text',
        admin: {
          condition: (_, { contentType }) => contentType === 'media',
          description:
            'Optional: Override the width on mobile screens (max 768px). Enter a valid CSS value (e.g. 100%, 300px, 80vw). Leave blank to use the default width.',
        },
      },

      linkGroup({
        overrides: {
          maxRows: 3,
          admin: {
            condition: (_, { contentType }) => contentType === 'link',
          },
        },
      }),
      {
        name: 'linkAlignment',
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'link',
        },
        defaultValue: 'left',
      },
      {
        name: 'verticalCTA',
        type: 'group',
        fields: VerticalCTAFields,
        admin: {
          condition: (_, { contentType }) => contentType === 'verticalCTA',
        },
      },
      bgColorPickerAll({
        overrides: {
          name: 'verticalCTABgColor',
          label: 'Vertical CTA Background Color',
          admin: {
            condition: (_, { contentType }) => contentType === 'verticalCTA',
          },
        },
      }),
      bgOpacityPicker({
        overrides: {
          name: 'verticalCTABgOpacity',
          label: 'Vertical CTA Background Opacity',
          defaultValue: 'bg-opacity-50',
          admin: {
            condition: (_, { verticalCTABgColor }) => Boolean(verticalCTABgColor),
          },
        },
      }),
      {
        name: 'testimonials',
        type: 'array',
        minRows: 1,
        fields: Testimonials,
        admin: {
          condition: (_, { contentType }) => contentType === 'testimonials',
        },
      },
      {
        name: 'testimonialCustomizer',
        type: 'group',
        fields: [
          bgColorPickerAll({
            overrides: {
              name: 'cardBgColor',
              label: 'Card Background Color',
              defaultValue: 'bg-white',
            },
          }),
          textClasses({
            overrides: {
              name: 'textClasses',
              label: 'Text Classes',
              defaultValue: ['text-slate-900'],
            },
          }),
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'testimonials',
        },
      },
      {
        name: 'carousel',
        type: 'group',
        fields: Carousel,
        admin: {
          condition: (_, { contentType }) => contentType === 'carousel',
        },
      },
      {
        name: 'cardWithList',
        type: 'group',
        fields: [
          {
            name: 'cardTitle',
            type: 'text',
            required: true,
          },
          textClasses({
            overrides: {
              name: 'titleClasses',
              label: 'Title Classes',
              defaultValue: ['text-white', 'text-3xl', 'md:text-4xl', 'font-semibold'],
            },
          }),
          {
            name: 'listItems',
            type: 'array',
            fields: [
              {
                name: 'icon',
                type: 'upload',
                relationTo: 'media',
              },
              {
                name: 'text',
                type: 'text',
                required: true,
                defaultValue: 'Lorem ipsum dolor sit amet consectetur',
              },
              textClasses({
                overrides: {
                  name: 'textClasses',
                  label: 'Text Classes',
                  defaultValue: ['text-white', 'text-2xl', 'font-semibold'],
                },
              }),
            ],
          },
          bgColorPickerAll({
            overrides: {
              name: 'cardBgColor',
              label: 'Card Background Color',
              defaultValue: 'bg-slate-800',
            },
          }),
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'cardWithList',
        },
      },
      {
        name: 'autoScrollSlider',
        type: 'group',
        fields: [
          {
            name: 'images',
            type: 'array',
            fields: [
              {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
                required: true,
              },
            ],
          },
          dimensionClasses({
            overrides: {
              defaultValue: ['w-40', 'h-40', 'md:w-48', 'md:h-48'],
            },
          }),
          {
            name: 'speed',
            type: 'number',
            defaultValue: 5000,
            admin: {
              description: 'Speed in milliseconds (5000 = 5 seconds)',
            },
          },
          {
            name: 'showFadingEffect',
            type: 'checkbox',
            label: 'Show Edge Fading Effect',
            defaultValue: true,
            admin: {
              description: 'When enabled, adds a white gradient fade on the left and right edges of the slider.',
            },
          },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'autoScrollSlider',
        },
      },
      {
        name: 'styledCards',
        type: 'group',
        fields: [
          {
            name: 'cards',
            type: 'array',
            fields: [
              {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
                required: true,
              },
              {
                name: 'title',
                type: 'text',
                required: true,
              },
              {
                name: 'description',
                type: 'textarea',
                required: true,
              },
            ],
          },
          dimensionClasses({
            overrides: {
              name: 'imageClasses',
              label: 'Image Dimensions',
              defaultValue: ['w-8', 'h-8', 'md:w-12', 'md:h-12'],
            },
          }),
          {
            name: 'gapClasses',
            type: 'select',
            defaultValue: 'gap-6',
            options: [
              { label: 'Gap 4', value: 'gap-4' },
              { label: 'Gap 6', value: 'gap-6' },
              { label: 'Gap 8', value: 'gap-8' },
              { label: 'Gap 10', value: 'gap-10' },
              { label: 'Gap 12', value: 'gap-12' },
            ],
          },
          textClasses({
            overrides: {
              name: 'titleClasses',
              label: 'Title Text Classes',
              defaultValue: ['text-lg', 'font-semibold', 'text-slate-900'],
            },
          }),
          textClasses({
            overrides: {
              name: 'descriptionClasses',
              label: 'Description Text Classes',
              defaultValue: ['text-base', 'text-slate-600'],
            },
          }),
          shadowClasses({
            overrides: {
              defaultValue: ['shadow-md', 'hover:shadow-xl'],
            },
          }),
          bgColorPickerAll({
            overrides: {
              name: 'cardBgColor',
              label: 'Card Background Color',
              defaultValue: 'bg-white',
            },
          }),
          bgColorPickerAll({
            overrides: {
              name: 'cardHoverBgColor',
              label: 'Card Hover Background Color',
              admin: {
                description: 'Background color when hovering over the card',
              },
            },
          }),
          borderClasses({
            overrides: {
              name: 'borderClasses',
              label: 'Border Classes',
              defaultValue: ['border', 'border-gray-500'],
            },
          }),
          {
            name: 'cardsPerRow',
            type: 'select',
            defaultValue: '3',
            options: [
              { label: '2 Cards', value: '2' },
              { label: '3 Cards', value: '3' },
              { label: '4 Cards', value: '4' },
            ],
          },
          {
            name: 'marginSpace',
            type: 'select',
            defaultValue: 'my-0',
            options: [
              { label: 'None', value: 'my-0' },
              { label: 'Small', value: 'my-4' },
              { label: 'Medium', value: 'my-8' },
              { label: 'Large', value: 'my-12' },
              { label: 'Extra Large', value: 'my-16' },
            ],
          },
          {
            name: 'alignContent',
            type: 'select',
            defaultValue: 'left',
            options: [
              { label: 'Default', value: 'left' },
              { label: 'Center', value: 'center' },
            ],
          },
          {
            name: 'alignCardContent',
            type: 'select',
            defaultValue: 'left',
            options: [
              { label: 'Default (Left)', value: 'left' },
              { label: 'Center', value: 'center' },
            ],
          },
          {
            name: 'cardRounded',
            type: 'select',
            defaultValue: 'rounded-xl',
            options: [
              { label: 'None', value: 'rounded-none' },
              { label: 'Small', value: 'rounded-sm' },
              { label: 'Medium', value: 'rounded-md' },
              { label: 'Large', value: 'rounded-lg' },
              { label: 'Extra Large', value: 'rounded-xl' },
              { label: '2XL', value: 'rounded-2xl' },
              { label: 'Full', value: 'rounded-full' },
            ],
          },
          {
            name: 'descriptionAlign',
            type: 'select',
            defaultValue: 'inherit',
            admin: {
              description: 'Override description text alignment independently of the card content alignment.',
            },
            options: [
              { label: 'Follow Card Alignment', value: 'inherit' },
              { label: 'Left', value: 'left' },
              { label: 'Center', value: 'center' },
            ],
          },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'styledCards',
        },
      },
      {
        name: 'statusBanner',
        type: 'group',
        fields: [
          icon(),
          {
            name: 'content',
            type: 'text',
            required: true,
            defaultValue: '100% safe and secure • PCI DSS Compliant',
          },
          textClasses({
            overrides: {
              name: 'contentClasses',
              label: 'Content Text Classes',
              defaultValue: ['text-base', 'font-medium'],
            },
          }),
          {
            name: 'flavor',
            type: 'select',
            required: true,
            defaultValue: 'success',
            options: [
              { label: 'Success', value: 'success' },
              { label: 'Danger', value: 'danger' },
              { label: 'Warning', value: 'warning' },
              { label: 'Info', value: 'info' },
              { label: 'Primary', value: 'primary' },
              { label: 'Secondary', value: 'secondary' },
            ],
            admin: {
              description: 'Determines the background and text color theme',
            },
          },
          {
            name: 'alignment',
            type: 'select',
            required: true,
            defaultValue: 'center',
            options: [
              { label: 'Left', value: 'left' },
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'right' },
            ],
          },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'statusBanner',
        },
      },
      {
        name: 'modernCard',
        type: 'group',
        fields: [
          icon(),
          {
            name: 'title',
            type: 'text',
            required: true,
          },
          textClasses({
            overrides: {
              name: 'titleClasses',
              label: 'Title Classes',
              defaultValue: ['text-4xl', 'font-bold', 'text-slate-900', 'mb-2'],
            },
          }),
          {
            name: 'description',
            type: 'richText',
            editor: lexicalEditor({
              features: ({ rootFeatures }) => [
                ...rootFeatures,
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ],
            }),
          },
          textClasses({
            overrides: {
              name: 'descriptionClasses',
              label: 'Description Classes',
              defaultValue: ['text-lg', 'text-slate-700', 'mb-6'],
            },
          }),
          linkGroup({
            overrides: {
              maxRows: 2,
            },
          }),
          bgColorPickerAll({
            overrides: {
              name: 'cardBgColor',
              label: 'Card Background Color',
              defaultValue: 'bg-gray-100',
            },
          }),
          bgOpacityPicker({
            overrides: {
              name: 'cardBgOpacity',
              label: 'Card Background Opacity',
              defaultValue: 'bg-opacity-100',
              admin: {
                condition: (_, { cardBgColor }) => Boolean(cardBgColor),
              },
            },
          }),
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'modernCard',
        },
      },
      {
        name: 'accordion',
        type: 'group',
        fields: [
          textClasses({
            overrides: {
              name: 'titleClasses',
              label: 'Title Classes',
              defaultValue: ['text-xl', 'md:text-2xl', 'font-bold', 'uppercase'],
            },
          }),
          textClasses({
            overrides: {
              name: 'contentClasses',
              label: 'Content Classes',
              defaultValue: ['text-base'],
            },
          }),
          {
            name: 'items',
            type: 'array',
            fields: [
              {
                name: 'title',
                type: 'text',
                required: true,
              },
              {
                name: 'content',
                type: 'richText',
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
                name: 'media',
                type: 'upload',
                relationTo: 'media',
              },
              linkGroup({
                overrides: {
                  maxRows: 3,
                },
              }),
            ],
          },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'accordion',
        },
      },
      {
        name: 'caseStudySlider',
        type: 'group',
        fields: [
          {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue:"Explore our <span class='text-blue-500'>No code solutions </span>"
          },
          textClasses({
            overrides: {
              name: 'titleClasses',
              label: 'Title Classes',
            },
          }),
          {
            name: 'cards',
            type: 'array',
            fields: [
              {
                name: 'cardBgColor',
                type: 'select',
                options: [
                  { label: 'Red', value: 'red' },
                  { label: 'Orange', value: 'orange' },
                  { label: 'Amber', value: 'amber' },
                  { label: 'Yellow', value: 'yellow' },
                  { label: 'Lime', value: 'lime' },
                  { label: 'Green', value: 'green' },
                  { label: 'Emerald', value: 'emerald' },
                  { label: 'Teal', value: 'teal' },
                  { label: 'Cyan', value: 'cyan' },
                  { label: 'Sky', value: 'sky' },
                  { label: 'Blue', value: 'blue' },
                  { label: 'Indigo', value: 'indigo' },
                  { label: 'Violet', value: 'violet' },
                  { label: 'Purple', value: 'purple' },
                  { label: 'Fuchsia', value: 'fuchsia' },
                  { label: 'Pink', value: 'pink' },
                  { label: 'Rose', value: 'rose' },
                  { label: 'Slate', value: 'slate' },
                  { label: 'Gray', value: 'gray' },
                  { label: 'Zinc', value: 'zinc' },
                  { label: 'Neutral', value: 'neutral' },
                  { label: 'Stone', value: 'stone' },
                ],
                required: true,
              },
              {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
                required: true,
              },
              {
                name: 'industries',
                type: 'array',
                fields: [
                  {
                    name: 'text',
                    type: 'text',
                    required: true,
                  },
                ],
              },
              {
                name: 'content',
                type: 'textarea',
                required: true,
              },
              {
                name: 'person',
                type: 'group',
                fields: [
                  { name: 'name', type: 'text', required: true },
                  { name: 'position', type: 'text', required: true },
                ],
              },
              linkGroup({
                overrides: {
                  maxRows: 1,
                },
              }),
            ],
          },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'caseStudySlider',
        },
      },
      {
        name: 'imageTextSplit',
        type: 'group',
        label: 'Image Text Split Settings',
        admin: {
          condition: (_, { contentType }) => contentType === 'imageTextSplit',
        },
        fields: imageTextSplitColumnFields,
      },
      {
        name: 'divider',
        type: 'group',
        validate: (value, { siblingData }) => {
          const sibling = siblingData as Record<string, any>
          if (sibling?.contentType !== 'divider') {
            return true
          }
          return true
        },
        fields: [
          colorPickerAll({
            overrides: {
              name: 'color',
              label: 'Line Color',
              defaultValue: 'slate-300',
            },
          }),
          {
            name: 'thickness',
            type: 'select',
            defaultValue: 'border-t',
            options: [
              { label: 'Thin (1px)', value: 'border-t' },
              { label: 'Medium (2px)', value: 'border-t-2' },
              { label: 'Thick (4px)', value: 'border-t-4' },
              { label: 'Extra Thick (8px)', value: 'border-t-8' },
            ],
          },
          {
            name: 'width',
            type: 'select',
            defaultValue: 'w-full',
            options: [
              { label: 'Full Width', value: 'w-full' },
              { label: 'Three Quarters (75%)', value: 'w-3/4' },
              { label: 'Half (50%)', value: 'w-1/2' },
              { label: 'Quarter (25%)', value: 'w-1/4' },
            ],
          },
          {
            name: 'alignment',
            type: 'select',
            defaultValue: 'mx-auto',
            options: [
              { label: 'Left', value: 'mr-auto ml-0' },
              { label: 'Center', value: 'mx-auto' },
              { label: 'Right', value: 'ml-auto mr-0' },
              // Legacy value: existing DB documents saved with old 'center' default
              { label: 'Center (Legacy)', value: 'center' },
            ],
          },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'divider',
        },
      },
      {
        name: 'customJobAction',
        type: 'group',
        validate: () => true,
        fields: [
          link({
            appearances: false,
            required: false,
          }),
          {
            name: 'paddingX',
            type: 'select',
            defaultValue: 'px-6',
            options: [
              { label: 'Small (px-4)', value: 'px-4' },
              { label: 'Medium (px-6)', value: 'px-6' },
              { label: 'Large (px-8)', value: 'px-8' },
              { label: 'Extra Large (px-12)', value: 'px-12' },
            ],
          },
          {
            name: 'paddingY',
            type: 'select',
            defaultValue: 'py-3',
            options: [
              { label: 'Small (py-2)', value: 'py-2' },
              { label: 'Medium (py-3)', value: 'py-3' },
              { label: 'Large (py-4)', value: 'py-4' },
              { label: 'Extra Large (py-6)', value: 'py-6' },
            ],
          },
          {
            name: 'rounded',
            type: 'select',
            defaultValue: 'rounded-xl',
            options: [
              { label: 'None', value: 'rounded-none' },
              { label: 'Small', value: 'rounded-sm' },
              { label: 'Medium', value: 'rounded-md' },
              { label: 'Large', value: 'rounded-lg' },
              { label: 'Extra Large', value: 'rounded-xl' },
              { label: 'Full Rounded', value: 'rounded-full' },
            ],
          },
          {
            name: 'borderWidth',
            type: 'select',
            defaultValue: 'border',
            options: [
              { label: 'None', value: 'border-0' },
              { label: 'Thin (1px)', value: 'border' },
              { label: 'Medium (2px)', value: 'border-2' },
              { label: 'Thick (4px)', value: 'border-4' },
            ],
          },
          colorPickerAll({
            overrides: {
              name: 'borderColor',
              label: 'Border Color',
              defaultValue: 'slate-300',
            },
          }),
          bgColorPickerAll({
            overrides: {
              name: 'bgColor',
              label: 'Background Color',
              defaultValue: 'bg-transparent',
            },
          }),
          colorPickerAll({
            overrides: {
              name: 'textColor',
              label: 'Text Color',
              defaultValue: 'black',
            },
          }),
          {
            name: 'fontWeight',
            type: 'select',
            defaultValue: 'font-semibold',
            options: [
              { label: 'Light', value: 'font-light' },
              { label: 'Normal', value: 'font-normal' },
              { label: 'Medium', value: 'font-medium' },
              { label: 'Semi-bold', value: 'font-semibold' },
              { label: 'Bold', value: 'font-bold' },
              { label: 'Extra Bold', value: 'font-extrabold' },
            ],
          },
          {
            name: 'fontStyle',
            type: 'select',
            defaultValue: 'not-italic',
            options: [
              { label: 'Normal', value: 'not-italic' },
              { label: 'Italic', value: 'italic' },
            ],
          },
          {
            name: 'textSize',
            type: 'select',
            defaultValue: 'text-base',
            options: [
              { label: 'Extra Small', value: 'text-xs' },
              { label: 'Small', value: 'text-sm' },
              { label: 'Medium/Base', value: 'text-base' },
              { label: 'Large', value: 'text-lg' },
              { label: 'Extra Large', value: 'text-xl' },
              { label: 'Double Extra Large', value: 'text-2xl' },
            ],
          },
          {
            name: 'textTransform',
            type: 'select',
            defaultValue: 'normal-case',
            options: [
              { label: 'Normal', value: 'normal-case' },
              { label: 'Uppercase', value: 'uppercase' },
              { label: 'Lowercase', value: 'lowercase' },
              { label: 'Capitalize', value: 'capitalize' },
            ],
          },
          {
            name: 'nestedBadge',
            type: 'group',
            fields: [
              {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
              },
              {
                name: 'text',
                type: 'text',
              },
              bgColorPickerAll({
                overrides: {
                  name: 'bgColor',
                  label: 'Badge Background Color',
                  defaultValue: 'bg-slate-100',
                },
              }),
              colorPickerAll({
                overrides: {
                  name: 'textColor',
                  label: 'Badge Text Color',
                  defaultValue: 'slate-900',
                },
              }),
              {
                name: 'rounded',
                type: 'select',
                defaultValue: 'rounded-full',
                options: [
                  { label: 'None', value: 'rounded-none' },
                  { label: 'Small', value: 'rounded-sm' },
                  { label: 'Medium', value: 'rounded-md' },
                  { label: 'Large', value: 'rounded-lg' },
                  { label: 'Extra Large', value: 'rounded-xl' },
                  { label: 'Full Rounded', value: 'rounded-full' },
                ],
              },
            ],
          },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'customJobAction',
        },
      },
      {
        name: 'customButton',
        type: 'group',
        validate: () => true,
        fields: [
          link({
            appearances: false,
            required: false,
          }),
          {
            name: 'paddingX',
            type: 'select',
            defaultValue: 'px-6',
            options: [
              { label: 'Small (px-4)', value: 'px-4' },
              { label: 'Medium (px-6)', value: 'px-6' },
              { label: 'Large (px-8)', value: 'px-8' },
              { label: 'Extra Large (px-12)', value: 'px-12' },
            ],
          },
          {
            name: 'paddingY',
            type: 'select',
            defaultValue: 'py-3',
            options: [
              { label: 'Small (py-2)', value: 'py-2' },
              { label: 'Medium (py-3)', value: 'py-3' },
              { label: 'Large (py-4)', value: 'py-4' },
              { label: 'Extra Large (py-6)', value: 'py-6' },
            ],
          },
          {
            name: 'rounded',
            type: 'select',
            defaultValue: 'rounded-xl',
            options: [
              { label: 'None', value: 'rounded-none' },
              { label: 'Small', value: 'rounded-sm' },
              { label: 'Medium', value: 'rounded-md' },
              { label: 'Large', value: 'rounded-lg' },
              { label: 'Extra Large', value: 'rounded-xl' },
              { label: 'Full Rounded', value: 'rounded-full' },
            ],
          },
          {
            name: 'borderWidth',
            type: 'select',
            defaultValue: 'border',
            options: [
              { label: 'None', value: 'border-0' },
              { label: 'Thin (1px)', value: 'border' },
              { label: 'Medium (2px)', value: 'border-2' },
              { label: 'Thick (4px)', value: 'border-4' },
            ],
          },
          colorPickerAll({
            overrides: {
              name: 'borderColor',
              label: 'Border Color',
              defaultValue: 'slate-300',
            },
          }),
          bgColorPickerAll({
            overrides: {
              name: 'bgColor',
              label: 'Background Color',
              defaultValue: 'bg-transparent',
            },
          }),
          colorPickerAll({
            overrides: {
              name: 'textColor',
              label: 'Text Color',
              defaultValue: 'black',
            },
          }),
          {
            name: 'alignment',
            type: 'select',
            defaultValue: 'left',
            options: [
              { label: 'Left', value: 'left' },
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'right' },
            ],
          },
        ],
        admin: {
          condition: (_, { contentType }) => contentType === 'customButton',
        },
      },

      // ─── Solutions Accordion ──────────────────────────────────────────────────
      {
        name: 'solutionsAccordion',
        type: 'group',
        label: 'Solutions Accordion',
        admin: {
          condition: (_, { contentType }) => contentType === 'solutionsAccordion',
        },
        fields: [
          // Section bg
          bgColorPickerAll({
            overrides: {
              name: 'sectionBgColor',
              label: 'Section Background Color',
              defaultValue: 'bg-white',
            },
          }),

          ...solutionsAccordionLayoutFields,

          // ── Left Panel ────────────────────────────────────────────────────────
          {
            name: 'leftPanel',
            type: 'group',
            label: 'Left Panel',
            fields: [
              bgColorPickerAll({
                overrides: {
                  name: 'bgColor',
                  label: 'Left Column Background',
                  defaultValue: 'bg-white',
                },
              }),
              { name: 'badgeText', type: 'text', label: 'Badge Text', defaultValue: 'Our Solutions' },
              bgColorPickerAll({
                overrides: { name: 'badgeBgColor', label: 'Badge Background Color', defaultValue: 'bg-gray-100' },
              }),
              textClasses({
                overrides: { name: 'badgeTextClasses', label: 'Badge Text Classes', defaultValue: ['text-gray-800', 'text-sm'] },
              }),
              {
                name: 'heading',
                type: 'richText',
                label: 'Heading',
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ],
                }),
              },
              textClasses({
                overrides: { name: 'headingTextClasses', label: 'Heading Text Classes', defaultValue: ['text-black'] },
              }),
              { name: 'showSubBadge', type: 'checkbox', label: 'Show Sub-Badge / Button', defaultValue: true },
              {
                name: 'subBadgeText', type: 'text', label: 'Sub-Badge Text', defaultValue: 'Explore payments',
                admin: { condition: (_, s) => s.showSubBadge !== false },
              },
              bgColorPickerAll({
                overrides: {
                  name: 'subBadgeBgColor', label: 'Sub-Badge Background Color', defaultValue: 'bg-blue-custom',
                  admin: { condition: (_, s) => s.showSubBadge !== false },
                },
              }),
              textClasses({
                overrides: {
                  name: 'subBadgeTextClasses', label: 'Sub-Badge Text Classes', defaultValue: ['text-white', 'text-sm'],
                  admin: { condition: (_, s) => s.showSubBadge !== false },
                },
              }),
            ],
          },

          // ── Right Panel background ────────────────────────────────────────────
          bgColorPickerAll({
            overrides: { name: 'rightBgColor', label: 'Right Column Background', defaultValue: 'bg-white' },
          }),

          // ── Accordion Items ───────────────────────────────────────────────────
          {
            name: 'accordionItems',
            type: 'array',
            label: 'Accordion Items',
            minRows: 1,
            fields: [
              { name: 'title', type: 'text', label: 'Title', required: true },
              { name: 'icon', type: 'upload', relationTo: 'media', label: 'Icon (inactive)', required: false },
              { name: 'iconActive', type: 'upload', relationTo: 'media', label: 'Icon (active/white)', required: false },
              bgColorPickerAll({
                overrides: {
                  name: 'iconCardBgColor',
                  label: 'Icon Card Background (Inactive)',
                  defaultValue: 'bg-[#EFF2FE]',
                  validate: allowAnySelect,
                  admin: {
                    description:
                      'Background color of the small rounded card containing the inactive icon.',
                  },
                },
              }),
              bgColorPickerAll({
                overrides: {
                  name: 'activeIconCardBgColor',
                  label: 'Icon Card Background (Active/Open)',
                  defaultValue: 'bg-white/20',
                  validate: allowAnySelect,
                  admin: {
                    description:
                      'Background color of the small rounded card when active/open (e.g. translucent white).',
                  },
                },
              }),
              bgColorPickerAll({
                overrides: { name: 'activeBgColor', label: 'Active Card Background', defaultValue: 'bg-blue-custom' },
              }),
              {
                name: 'activeTitle',
                type: 'text',
                label: 'Active Title (shown when open beside icon)',
                required: false,
                admin: {
                  description:
                    'Optional custom title shown when this accordion item is active/open. If empty, Title is used.',
                },
              },
              { name: 'subHeading', type: 'text', label: 'Sub-Heading (shown when open)' },
              {
                name: 'bodyText',
                type: 'richText',
                label: 'Body Text (shown when open)',
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ],
                }),
              },
              { name: 'image', type: 'upload', relationTo: 'media', label: 'Left Column Image (active state)', required: false },

              // Image Overlay Badges (Three translucent cards at bottom-left of the image)
              {
                name: 'imageBadges',
                type: 'group',
                label: 'Image Overlay Badges (Bottom-Left Cards)',
                admin: {
                  description:
                    'Up to 3 frosted glass cards displayed at the bottom-left of this image (e.g. Wallets, Transfers, Fx). Only cards with content will display.',
                },
                fields: [
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'badge1',
                        type: 'text',
                        label: 'Card 1 Text',
                        defaultValue: 'Wallets',
                        required: false,
                        admin: { width: '33.33%', placeholder: 'e.g. Wallets' },
                      },
                      {
                        name: 'badge2',
                        type: 'text',
                        label: 'Card 2 Text',
                        defaultValue: 'Transfers',
                        required: false,
                        admin: { width: '33.33%', placeholder: 'e.g. Transfers' },
                      },
                      {
                        name: 'badge3',
                        type: 'text',
                        label: 'Card 3 Text',
                        defaultValue: 'Fx',
                        required: false,
                        admin: { width: '33.33%', placeholder: 'e.g. Fx' },
                      },
                    ],
                  },
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'badgeBgOverlay',
                        type: 'select',
                        label: 'Card Overlay Background',
                        defaultValue: 'bg-white/20 backdrop-blur-md border border-white/25',
                        validate: allowAnySelect,
                        options: [
                          {
                            label: 'Frosted Glass White - 20% (Default from mockup)',
                            value: 'bg-white/20 backdrop-blur-md border border-white/25',
                          },
                          {
                            label: 'Frosted Glass White - 30% (Slightly Stronger)',
                            value: 'bg-white/30 backdrop-blur-md border border-white/30',
                          },
                          {
                            label: 'Frosted Glass White - 15% (Subtle)',
                            value: 'bg-white/15 backdrop-blur-md border border-white/20',
                          },
                          {
                            label: 'Frosted Glass White - 40% (High Contrast)',
                            value: 'bg-white/40 backdrop-blur-md border border-white/40',
                          },
                          {
                            label: 'Frosted Dark Glass - 25% (Dark Overlay)',
                            value: 'bg-black/25 backdrop-blur-md border border-white/15',
                          },
                          {
                            label: 'Frosted Dark Glass - 40%',
                            value: 'bg-black/40 backdrop-blur-md border border-white/20',
                          },
                          {
                            label: 'Solid White (Clean Pill)',
                            value: 'bg-white border border-gray-100 shadow-md',
                          },
                          {
                            label: 'Brand Blue Glass',
                            value: 'bg-blue-600/30 backdrop-blur-md border border-blue-400/30',
                          },
                        ],
                        admin: { width: '50%' },
                      },
                      textColorPickerAll({
                        overrides: {
                          name: 'badgeTextColor',
                          label: 'Card Text Color',
                          defaultValue: 'text-white',
                          validate: allowAnySelect,
                          admin: { width: '50%' },
                        },
                      }),
                    ],
                  },
                ],
              },
              { name: 'showCTAButton', type: 'checkbox', label: 'Show CTA Button', defaultValue: true },
              {
                name: 'ctaLabel', type: 'text', label: 'CTA Label', defaultValue: 'Learn more',
                admin: { condition: (_, s) => s.showCTAButton !== false },
              },
              bgColorPickerAll({
                overrides: {
                  name: 'ctaBgColor', label: 'CTA Background', defaultValue: 'bg-white',
                  admin: { condition: (_, s) => s.showCTAButton !== false },
                },
              }),
              textClasses({
                overrides: {
                  name: 'ctaTextClasses', label: 'CTA Text Classes', defaultValue: ['text-blue-custom', 'text-sm'],
                  admin: { condition: (_, s) => s.showCTAButton !== false },
                },
              }),
            ],
          },

          // ── Scroll Animation ──────────────────────────────────────────────────
          {
            name: 'scrollAnimation',
            type: 'group',
            label: 'Scroll Entrance Animation',
            fields: [
              { name: 'enabled', type: 'checkbox', label: 'Enable Scroll Animation', defaultValue: true },
              {
                name: 'type', type: 'select', label: 'Animation Type', defaultValue: 'fade-up',
                admin: { condition: (_, s) => s.enabled !== false },
                options: [
                  { label: 'Fade Up', value: 'fade-up' },
                  { label: 'Fade Down', value: 'fade-down' },
                  { label: 'Fade In', value: 'fade-in' },
                  { label: 'Zoom In', value: 'zoom-in' },
                ],
              },
              {
                name: 'speed', type: 'select', label: 'Speed', defaultValue: 'normal',
                admin: { condition: (_, s) => s.enabled !== false },
                options: [
                  { label: 'Fast (350ms)', value: 'fast' },
                  { label: 'Normal (650ms)', value: 'normal' },
                  { label: 'Slow (1000ms)', value: 'slow' },
                ],
              },
            ],
          },
        ],
      },

      // ─── Centered Content ──────────────────────────────────────────────────
      {
        name: 'centeredContent',
        type: 'group',
        label: 'Centered Content',
        admin: {
          condition: (_, { contentType }) => contentType === 'centeredContent',
        },
        fields: centeredContentFields,
      },

      // ─── Centered Button ───────────────────────────────────────────────────
      {
        name: 'centeredButton',
        type: 'group',
        label: 'Centered Button',
        admin: {
          condition: (_, { contentType }) => contentType === 'centeredButton',
        },
        fields: centeredButtonColumnFields,
      },

      // ─── Click Expand Cards ────────────────────────────────────────────────
      {
        name: 'clickExpand',
        type: 'group',
        label: 'Click Expand Cards',
        admin: {
          condition: (_, { contentType }) => contentType === 'clickExpand',
        },
        fields: clickExpandFields,
      },

      // ─── Grid Col Feature ──────────────────────────────────────────────────
      {
        name: 'gridCol',
        type: 'group',
        label: 'Grid Col Feature',
        admin: {
          condition: (_, { contentType }) => contentType === 'gridCol',
        },
        fields: gridColFields,
      },

      // ─── Animated Icons Grid ───────────────────────────────────────────────
      {
        name: 'animatedIconsGrid',
        type: 'group',
        label: 'Animated Icons Grid',
        admin: {
          condition: (_, { contentType }) => contentType === 'animatedIconsGrid',
        },
        fields: animatedIconsGridFields,
      },

      // ─── Feature Cards ─────────────────────────────────────────────────────
      {
        name: 'featureCards',
        type: 'group',
        label: 'Feature Cards',
        admin: {
          condition: (_, { contentType }) => contentType === 'featureCards',
        },
        fields: featureCardsFields,
      },

      // ─── Feature Cards V2 ──────────────────────────────────────────────────
      {
        name: 'featureCardsV2',
        type: 'group',
        label: 'Feature Cards V2',
        admin: {
          condition: (_, { contentType }) => contentType === 'featureCardsV2',
        },
        fields: featureCardsV2Fields,
      },

      // ─── Vertical CTA v2 ──────────────────────────────────────────────────
      {
        name: 'verticalCTAv2',
        type: 'group',
        label: 'Vertical CTA v2',
        admin: {
          condition: (_, { contentType }) => contentType === 'verticalCTAv2',
        },
        fields: verticalCTAv2Fields,
      },

      // ─── Split Text ────────────────────────────────────────────────────────
      {
        name: 'splitText',
        type: 'group',
        label: 'Split Text',
        admin: {
          condition: (_, { contentType }) => contentType === 'splitText',
        },
        fields: splitTextFields,
      },

      // ─── Image Slider ──────────────────────────────────────────────────────
      {
        name: 'imageSlider',
        type: 'group',
        label: 'Image Slider',
        admin: {
          condition: (_, { contentType }) => contentType === 'imageSlider',
        },
        fields: imageSliderFields,
      },

      // ─── Blog Post Updated ──────────────────────────────────────────────────
      {
        name: 'blogPostUpdated',
        type: 'group',
        label: 'Blog Post Updated',
        admin: {
          condition: (_, { contentType }) => contentType === 'blogPostUpdated',
        },
        fields: blogPostUpdatedFields,
      },

      // ─── Ready to Grow ──────────────────────────────────────────────────────
      {
        name: 'readyToGrow',
        type: 'group',
        label: 'Ready to Grow',
        admin: {
          condition: (_, { contentType }) => contentType === 'readyToGrow',
        },
        fields: readyToGrowFields,
      },

      // ─── Who We Are ──────────────────────────────────────────────────────────
      {
        name: 'whoWeAre',
        type: 'group',
        label: 'Who We Are',
        admin: {
          condition: (_, { contentType }) => contentType === 'whoWeAre',
        },
        fields: whoWeAreColumnFields,
      },

      // ─── Numbered Grid ───────────────────────────────────────────────────────
      {
        name: 'numberedGrid',
        type: 'group',
        label: 'Numbered Grid',
        admin: {
          condition: (_, { contentType }) => contentType === 'numberedGrid',
        },
        fields: numberedGridColumnFields,
      },

      // ─── Mission & Vision ─────────────────────────────────────────────────────
      {
        name: 'missionVision',
        type: 'group',
        label: 'Mission & Vision',
        admin: {
          condition: (_, { contentType }) => contentType === 'missionVision',
        },
        fields: missionVisionColumnFields,
      },

      // ─── Timeline Accordion ───────────────────────────────────────────────────
      {
        name: 'timelineAccordion',
        type: 'group',
        label: 'Timeline Accordion',
        admin: {
          condition: (_, { contentType }) => contentType === 'timelineAccordion',
        },
        fields: timelineAccordionColumnFields,
      },
    ],
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: columnFields,
    },
    {
      name: 'backgroundType',
      type: 'select',
      defaultValue: 'color',
      options: [
        { label: 'Color', value: 'color' },
        { label: 'Gradient', value: 'gradient' },
        { label: 'Media', value: 'media' },
      ],
    },
    {
      name: 'paddingType',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'No Padding (0px)', value: 'noPadding' },
        { label: 'Custom Padding (Specify Values)', value: 'custom' },
        { label: 'Padding Both Added', value: 'paddingAdded' },
        { label: 'Padding Top Only', value: 'paddingTopOnly' },
        { label: 'Padding Bottom Only', value: 'paddingBottomOnly' },
        { label: 'Padding Top Only Added', value: 'paddingTopOnlyAdded' },
        { label: 'Padding Bottom Only Added', value: 'paddingBottomOnlyAdded' },
        { label: 'Padding Top Added', value: 'paddingTopAdded' },
        { label: 'Padding Bottom Added', value: 'paddingBottomAdded' },
      ],
    },
    {
      type: 'row',
      admin: {
        condition: (_, siblingData) => siblingData?.paddingType === 'custom',
      },
      fields: [
        {
          name: 'sectionPaddingTop',
          type: 'text',
          label: 'Section Padding Top (e.g. 10px, 2rem)',
          admin: { width: '33.33%' },
        },
        {
          name: 'sectionPaddingBottom',
          type: 'text',
          label: 'Section Padding Bottom (e.g. 10px, 2rem)',
          admin: { width: '33.33%' },
        },
        {
          name: 'sectionPaddingX',
          type: 'text',
          label: 'Section Padding Left & Right (e.g. 10px, 2rem)',
          admin: { width: '33.33%' },
        },
      ],
    },
    bgColorPickerAll({
      overrides: {
        label: 'Content Background Color',
        name: 'sectionBackgroundColor',
        admin: {
          condition: (_, { backgroundType }) => backgroundType === 'color',
        },
      },
    }),
    {
      name: 'gradientSettings',
      type: 'group',
      admin: {
        condition: (_, { backgroundType }) => backgroundType === 'gradient',
      },
      fields: [
        {
          name: 'gradientDirection',
          type: 'select',
          defaultValue: 'to-r',
          options: [
            { label: 'To Right', value: 'to-r' },
            { label: 'To Left', value: 'to-l' },
            { label: 'To Bottom', value: 'to-b' },
            { label: 'To Top', value: 'to-t' },
            { label: 'To Bottom Right', value: 'to-br' },
            { label: 'To Bottom Left', value: 'to-bl' },
            { label: 'To Top Right', value: 'to-tr' },
            { label: 'To Top Left', value: 'to-tl' },
          ],
        },
        {
          type: 'row',
          fields: [
            colorPickerAll({
              overrides: {
                label: 'Start Color',
                name: 'gradientStartColor',
              },
            }),
            {
              name: 'gradientStartPercentage',
              type: 'number',
              min: 0,
              max: 100,
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            colorPickerAll({
              overrides: {
                label: 'Via Color',
                name: 'gradientViaColor',
              },
            }),
            {
              name: 'gradientViaPercentage',
              type: 'number',
              min: 0,
              max: 100,
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            colorPickerAll({
              overrides: {
                label: 'Stop Color',
                name: 'gradientStopColor',
              },
            }),
            {
              name: 'gradientStopPercentage',
              type: 'number',
              min: 0,
              max: 100,
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'backgroundMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { backgroundType }) => backgroundType === 'media',
      },
    },
    {
      name: 'bgoverlay',
      type: 'checkbox',
      label: 'Background Overlay',
      defaultValue: false,
      admin: {
        condition: (_, { backgroundType }) => backgroundType === 'media',
      },
    },
  ],
}
