/**
 * Default Layout Template for End Event Recap (Sequential sections below Event Hero)
 * Pre-populates 5 sections matching group ui/ mockups (end-event.png, end-event-3.png, end-event-1.png, end-event-4.png, end-event-5.png)
 */

export function createLexicalHeading(
  lines: string[],
  tag: 'h1' | 'h2' | 'h3' | 'h4' = 'h2',
) {
  const children: any[] = []

  lines.forEach((line, index) => {
    children.push({
      detail: 0,
      format: 0,
      mode: 'normal',
      style: '',
      text: line,
      type: 'text',
      version: 1,
    })
    if (index < lines.length - 1) {
      children.push({
        type: 'linebreak',
        version: 1,
      })
    }
  })

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: [
        {
          type: 'heading',
          tag,
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children,
        },
      ],
    },
  }
}

export function createLexicalParagraphs(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            version: 1,
          },
        ],
      })),
    },
  }
}

// ─── SECTION 1: NARRATIVE ARTICLE (group ui/end-event.png) ────────────────────────
export const defaultRecapHeading1 = createLexicalHeading(['The RAS revolution'])
export const defaultRecapDesc1 = createLexicalParagraphs([
  "The headliner at the conference was daraxonrasib, the first multi-selective RAS(ON) inhibitor - meaning it targets RAS proteins in their active, GTP-bound state - for previously treated metastatic pancreatic ductal adenocarcinoma (mPDAC). For decades, the RAS pathway was oncology's archetypal 'undruggable' target. KRAS G12C inhibitors like sotorasib and adagrasib chipped away at that reputation, but they only hit a single mutation. Daraxonrasib is different. In the phase 3 RASolute 302 trial, once-daily oral daraxonrasib nearly doubled median overall survival versus standard chemotherapy (13.2 vs 6.6 months; HR 0.40), with fewer severe adverse events.",
  "For a disease that has humbled oncology for decades, those numbers deserve the standing ovation they drew at the Plenary. The potential significance of this breakthrough extends beyond the study population: by validating multi-selective RAS(ON) as a broad therapeutic platform, daraxonrasib opens the door for other RAS-driven tumors, including colorectal cancer and NSCLC. The translation question this study raises isn't whether the drug works - it plainly does - but how quickly the paradigm scales. That is a question of trial design and real-world deployment, as much as biology.",
])

// ─── SECTION 2: NARRATIVE ARTICLE (group ui/end-event-3.png) ──────────────────────
export const defaultRecapHeading2 = createLexicalHeading(['Better healthcare is a team effort.'])
export const defaultRecapDesc2 = createLexicalParagraphs([
  'ASCO 2026 delivered no shortage of headline-making data, positive trials and new strategies across tumor types, much of it genuinely practice-changing. But treatment efficacy in a trial is only the first thing worth knowing. What comes after matters just as much: who will benefit most, when it should be used, how it fits into an evolving landscape, and whether those results hold up to the patient sitting across from you.',
  "That challenge was reflected in ASCO's 2026 theme, 'The science and practice of translation: improving cancer outcomes worldwide.' The meeting showcased important scientific advances. But as an oncologist, I know that whether a treatment works in a trial is rarely where the questions end. Many of the most consequential conversations centered on implementation: how physicians, researchers, and health systems will turn promising clinical evidence into better decisions and outcomes for patients.",
  "Three developments stood out to me - not only for their scientific significance, but for the questions I expect they'll raise as they move from the trial setting into real-world care.",
])

// ─── SECTION 3: 2-COLUMN FEATURE (group ui/end-event-1.png) ───────────────────────
export const defaultRecapHeading3 = createLexicalHeading([
  'Increase your retail ROI',
  'Choose Fulfilment By 316',
])
export const defaultRecapDesc3 = createLexicalParagraphs([
  "A quick introduction, a focused discussion or the beginning of a new collaboration. Tell us what you'd like to explore and we'll work with you to find the right format.",
])

// ─── SECTION 4: NARRATIVE ARTICLE (group ui/end-event-4.png) ──────────────────────
export const defaultRecapHeading4 = createLexicalHeading([
  'Connecting clinical evidence to practical reality.',
])
export const defaultRecapDesc4 = createLexicalParagraphs([
  'Beyond the headline drug trials, the deeper conversations at the congress challenged how we bridge the gap between academic innovation and bedside reality. Across global health systems, disparities in genomic testing access and real-world implementation remain the greatest hurdles to equitable cancer care.',
  'Our discussions throughout the week with hospital networks, research institutes, and technology partners emphasized an urgent priority: building agile data pipelines and collaborative care pathways that move therapies from phase 3 validation into clinical practice without unnecessary delays.',
])

// ─── SECTION 5: NARRATIVE ARTICLE (group ui/end-event-5.png) ──────────────────────
export const defaultRecapHeading5 = createLexicalHeading(['Looking ahead: What comes next.'])
export const defaultRecapDesc5 = createLexicalParagraphs([
  'As we reflect on the milestones achieved during this congress, our focus turns to sustaining momentum. Real clinical progress is never an isolated moment on a plenary stage - it is the cumulative result of continuous cross-disciplinary dialogue, data integrity, and shared vision.',
  'We thank every clinician, investigator, and industry partner who shared their time and perspectives with us. We invite you to stay connected, continue the conversation, and join us as we prepare for the next chapter in oncology innovation.',
])

export const defaultEventRecapLayout = [
  // Block 1: Recap Article (Mockup: end-event.png)
  {
    blockType: 'eventRecapArticle',
    kickerText: 'A SHARED PURPOSE',
    kickerStyles: {
      boxBgColor: 'bg-[#0256FF]',
      textColor: 'text-[#0256FF]',
      fontSizeDesktop: 'text-xs md:text-sm',
      fontSizeMobile: 'text-xs',
      fontWeightDesktop: 'font-semibold',
      fontWeightMobile: 'font-semibold',
      marginBottomDesktop: 'mb-4 md:mb-5',
      marginBottomMobile: 'mb-4',
    },
    heading: defaultRecapHeading1,
    headingStyles: {
      textColor: 'text-gray-950',
      fontSizeDesktop: 'text-4xl md:text-5xl lg:text-6xl',
      fontSizeMobile: 'text-3xl',
      fontWeightDesktop: 'font-bold',
      fontWeightMobile: 'font-bold',
      marginBottomDesktop: 'mb-6 md:mb-8',
      marginBottomMobile: 'mb-4',
    },
    description: defaultRecapDesc1,
    descriptionStyles: {
      textColor: 'text-slate-600',
      fontSizeDesktop: 'text-base md:text-lg',
      fontSizeMobile: 'text-sm md:text-base',
      fontWeightDesktop: 'font-normal',
      fontWeightMobile: 'font-normal',
      marginBottomDesktop: 'mb-8 md:mb-10',
      marginBottomMobile: 'mb-6',
    },
    buttonText: 'Bring your perspective to the conversation',
    buttonLink: '',
    buttonStyles: {
      textColor: 'text-[#0256FF]',
      fontSizeDesktop: 'text-sm md:text-base',
      fontSizeMobile: 'text-sm',
      fontWeightDesktop: 'font-medium',
      fontWeightMobile: 'font-medium',
    },
    matchHeaderPillWidth: true,
    sectionBgColor: 'bg-white',
    paddingTop: 'pt-16 md:pt-24',
    paddingBottom: 'pb-16 md:pb-24',
  },

  // Block 2: Recap Article (Mockup: end-event-3.png)
  {
    blockType: 'eventRecapArticle',
    kickerText: 'A SHARED PURPOSE',
    kickerStyles: {
      boxBgColor: 'bg-[#0256FF]',
      textColor: 'text-[#0256FF]',
      fontSizeDesktop: 'text-xs md:text-sm',
      fontSizeMobile: 'text-xs',
      fontWeightDesktop: 'font-semibold',
      fontWeightMobile: 'font-semibold',
      marginBottomDesktop: 'mb-4 md:mb-5',
      marginBottomMobile: 'mb-4',
    },
    heading: defaultRecapHeading2,
    headingStyles: {
      textColor: 'text-gray-950',
      fontSizeDesktop: 'text-4xl md:text-5xl lg:text-6xl',
      fontSizeMobile: 'text-3xl',
      fontWeightDesktop: 'font-bold',
      fontWeightMobile: 'font-bold',
      marginBottomDesktop: 'mb-6 md:mb-8',
      marginBottomMobile: 'mb-4',
    },
    description: defaultRecapDesc2,
    descriptionStyles: {
      textColor: 'text-slate-600',
      fontSizeDesktop: 'text-base md:text-lg',
      fontSizeMobile: 'text-sm md:text-base',
      fontWeightDesktop: 'font-normal',
      fontWeightMobile: 'font-normal',
      marginBottomDesktop: 'mb-8 md:mb-10',
      marginBottomMobile: 'mb-6',
    },
    buttonText: 'Bring your perspective to the conversation',
    buttonLink: '',
    buttonStyles: {
      textColor: 'text-[#0256FF]',
      fontSizeDesktop: 'text-sm md:text-base',
      fontSizeMobile: 'text-sm',
      fontWeightDesktop: 'font-medium',
      fontWeightMobile: 'font-medium',
    },
    matchHeaderPillWidth: true,
    sectionBgColor: 'bg-white',
    paddingTop: 'pt-16 md:pt-24',
    paddingBottom: 'pb-16 md:pb-24',
  },

  // Block 3: Recap 2-Column Feature Showcase (Mockup: end-event-1.png)
  {
    blockType: 'eventRecapFeature',
    badgeText: 'FULFILMENT BY 316',
    badgeStyles: {
      badgeBgColor: 'bg-white',
      badgeTextColor: 'text-[#0256FF]',
      marginBottomDesktop: 'mb-6',
      marginBottomMobile: 'mb-4',
    },
    heading: defaultRecapHeading3,
    headingStyles: {
      textColor: 'text-gray-950',
      fontSizeDesktop: 'text-4xl md:text-5xl',
      fontSizeMobile: 'text-3xl',
      fontWeightDesktop: 'font-bold',
      fontWeightMobile: 'font-bold',
      marginBottomDesktop: 'mb-6',
      marginBottomMobile: 'mb-4',
    },
    description: defaultRecapDesc3,
    descriptionStyles: {
      textColor: 'text-slate-600',
      fontSizeDesktop: 'text-base md:text-lg',
      fontSizeMobile: 'text-sm md:text-base',
      fontWeightDesktop: 'font-normal',
      fontWeightMobile: 'font-normal',
      marginBottomDesktop: 'mb-8 md:mb-10',
      marginBottomMobile: 'mb-6',
    },
    button1Text: 'Book a meeting',
    button1Link: '',
    button1Styles: {
      bgColor: 'bg-[#0256FF]',
      textColor: 'text-white',
      iconColor: 'text-white',
    },
    button2Text: 'Learn more',
    button2Link: '',
    button2Styles: {
      textColor: 'text-gray-950',
      iconColor: 'text-[#0256FF]',
    },
    matchHeaderPillWidth: true,
    sectionBgColor: 'bg-[#F4F6F9]',
    paddingTop: 'pt-20 md:pt-28',
    paddingBottom: 'pb-20 md:pb-28',
  },

  // Block 4: Recap Article (Mockup: end-event-4.png)
  {
    blockType: 'eventRecapArticle',
    kickerText: 'A SHARED PURPOSE',
    kickerStyles: {
      boxBgColor: 'bg-[#0256FF]',
      textColor: 'text-[#0256FF]',
      fontSizeDesktop: 'text-xs md:text-sm',
      fontSizeMobile: 'text-xs',
      fontWeightDesktop: 'font-semibold',
      fontWeightMobile: 'font-semibold',
      marginBottomDesktop: 'mb-4 md:mb-5',
      marginBottomMobile: 'mb-4',
    },
    heading: defaultRecapHeading4,
    headingStyles: {
      textColor: 'text-gray-950',
      fontSizeDesktop: 'text-4xl md:text-5xl lg:text-6xl',
      fontSizeMobile: 'text-3xl',
      fontWeightDesktop: 'font-bold',
      fontWeightMobile: 'font-bold',
      marginBottomDesktop: 'mb-6 md:mb-8',
      marginBottomMobile: 'mb-4',
    },
    description: defaultRecapDesc4,
    descriptionStyles: {
      textColor: 'text-slate-600',
      fontSizeDesktop: 'text-base md:text-lg',
      fontSizeMobile: 'text-sm md:text-base',
      fontWeightDesktop: 'font-normal',
      fontWeightMobile: 'font-normal',
      marginBottomDesktop: 'mb-8 md:mb-10',
      marginBottomMobile: 'mb-6',
    },
    buttonText: 'Bring your perspective to the conversation',
    buttonLink: '',
    buttonStyles: {
      textColor: 'text-[#0256FF]',
      fontSizeDesktop: 'text-sm md:text-base',
      fontSizeMobile: 'text-sm',
      fontWeightDesktop: 'font-medium',
      fontWeightMobile: 'font-medium',
    },
    matchHeaderPillWidth: true,
    sectionBgColor: 'bg-white',
    paddingTop: 'pt-16 md:pt-24',
    paddingBottom: 'pb-16 md:pb-24',
  },

  // Block 5: Recap Article (Mockup: end-event-5.png)
  {
    blockType: 'eventRecapArticle',
    kickerText: 'A SHARED PURPOSE',
    kickerStyles: {
      boxBgColor: 'bg-[#0256FF]',
      textColor: 'text-[#0256FF]',
      fontSizeDesktop: 'text-xs md:text-sm',
      fontSizeMobile: 'text-xs',
      fontWeightDesktop: 'font-semibold',
      fontWeightMobile: 'font-semibold',
      marginBottomDesktop: 'mb-4 md:mb-5',
      marginBottomMobile: 'mb-4',
    },
    heading: defaultRecapHeading5,
    headingStyles: {
      textColor: 'text-gray-950',
      fontSizeDesktop: 'text-4xl md:text-5xl lg:text-6xl',
      fontSizeMobile: 'text-3xl',
      fontWeightDesktop: 'font-bold',
      fontWeightMobile: 'font-bold',
      marginBottomDesktop: 'mb-6 md:mb-8',
      marginBottomMobile: 'mb-4',
    },
    description: defaultRecapDesc5,
    descriptionStyles: {
      textColor: 'text-slate-600',
      fontSizeDesktop: 'text-base md:text-lg',
      fontSizeMobile: 'text-sm md:text-base',
      fontWeightDesktop: 'font-normal',
      fontWeightMobile: 'font-normal',
      marginBottomDesktop: 'mb-8 md:mb-10',
      marginBottomMobile: 'mb-6',
    },
    buttonText: 'Bring your perspective to the conversation',
    buttonLink: '',
    buttonStyles: {
      textColor: 'text-[#0256FF]',
      fontSizeDesktop: 'text-sm md:text-base',
      fontSizeMobile: 'text-sm',
      fontWeightDesktop: 'font-medium',
      fontWeightMobile: 'font-medium',
    },
    matchHeaderPillWidth: true,
    sectionBgColor: 'bg-white',
    paddingTop: 'pt-16 md:pt-24',
    paddingBottom: 'pb-16 md:pb-24',
  },
]
