/**
 * Default Layout Template for New Webinars
 * Pre-populates Block 1 (WebinarHero) with exact mockup copy from group ui/webinar-hero.png
 */

export const defaultWebinarHeroLayout = {
  blockType: 'webinarHero',

    // TAB 3: SECTION LAYOUT & SPACING
    matchHeaderPillWidth: true,
    sectionBgColor: 'bg-[#0000FF]',
    paddingTop: 'pt-16 md:pt-20',
    paddingBottom: 'pb-16 md:pb-24',
    paddingLeft: 'pl-6 md:pl-12',
    paddingRight: 'pr-6 md:pr-12',
    cardInnerPadding: {
      cardPaddingTop: 'pt-6 md:pt-8',
      cardPaddingBottom: 'pb-6 md:pb-8',
      cardPaddingLeft: 'pl-6 md:pl-8',
      cardPaddingRight: 'pr-6 md:pr-8',
    },

    // TAB 1: LEFT COLUMN CONTENT
    leftCol: {
      kickerText: '316 GROUP AT ESMO 2026',
      heading: 'Translating oncology\ninnovation into real-world\nimpact',
      description:
        "A shared ambition. A meaningful conversation. Join 316 Group in Madrid to explore what's next for healthcare.",
      dateText: '23 October 2026, 10:30am BST',
      locationText: 'Online Webinar',
      button1Text: 'Register',
      button1Link: '#register',
      button2Text: 'See what you will gain!',
      button2Link: '#gain',
    },

    // TAB 2: LEFT COLUMN STYLING
    kickerStyles: {
      squareColor: 'bg-[#00F0FF]',
      textColor: 'text-white',
      fontSizeDesktop: 'text-xs md:text-sm',
      fontSizeMobile: 'text-xs',
      fontWeightDesktop: 'font-semibold',
      fontWeightMobile: 'font-semibold',
      marginBottomDesktop: 'mb-4 md:mb-5',
      marginBottomMobile: 'mb-4',
    },

    headingStyles: {
      textColor: 'text-white',
      fontSizeDesktop: 'text-4xl sm:text-5xl lg:text-6xl',
      fontSizeMobile: 'text-3xl',
      fontWeightDesktop: 'font-bold',
      fontWeightMobile: 'font-bold',
      marginBottomDesktop: 'mb-6 md:mb-8',
      marginBottomMobile: 'mb-4',
    },

    descriptionStyles: {
      textColor: 'text-white/90',
      fontSizeDesktop: 'text-base md:text-lg',
      fontSizeMobile: 'text-sm md:text-base',
      fontWeightDesktop: 'font-normal',
      fontWeightMobile: 'font-normal',
      marginBottomDesktop: 'mb-6 md:mb-8',
      marginBottomMobile: 'mb-5',
    },

    metadataStyles: {
      dateTextColor: 'text-white',
      dividerColor: 'bg-white/40',
      locationTextColor: 'text-white',
      fontSizeDesktop: 'text-sm md:text-base',
      fontSizeMobile: 'text-xs sm:text-sm',
      fontWeightDesktop: 'font-medium',
      fontWeightMobile: 'font-medium',
      marginBottomDesktop: 'mb-8 md:mb-10',
      marginBottomMobile: 'mb-6',
    },

    buttonsStyles: {
      button1BgColor: 'bg-white',
      button1TextColor: 'text-[#0256FF]',
      button1IconColor: 'text-[#0256FF]',
      button2TextColor: 'text-white',
    },

    // TAB 1: RIGHT COLUMN CARD CONTENT
    cardCol: {
      cardSubText: '316group',
      cardHeading: 'We back disruptive\nproducts and founders in retail',
      speakers: [
        {
          name: 'John Flanery',
          role: 'Senior Sales Manager',
          flag: 'uk',
        },
        {
          name: 'John Flanery',
          role: 'Senior Sales Manager',
          flag: 'ke',
        },
        {
          name: 'John Flanery',
          role: 'Senior Software Engineer',
          flag: 'uk',
        },
      ],
    },

    // TAB 2: RIGHT COLUMN CARD STYLING
    cardStyles: {
      subTextColor: 'text-white',
      subTextFontSizeDesktop: 'text-sm md:text-base',
      subTextFontSizeMobile: 'text-xs sm:text-sm',
      subTextMarginBottomDesktop: 'mb-6 md:mb-8',
      subTextMarginBottomMobile: 'mb-4',
      headingTextColor: 'text-white',
      headingFontSizeDesktop: 'text-2xl sm:text-3xl lg:text-3xl',
      headingFontSizeMobile: 'text-xl sm:text-2xl',
      headingFontWeightDesktop: 'font-bold',
      headingFontWeightMobile: 'font-bold',
      headingMarginBottomDesktop: 'mb-8 md:mb-10',
      headingMarginBottomMobile: 'mb-6',
    },

    speakerStyles: {
      imageMarginBottomDesktop: 'mb-3',
      imageMarginBottomMobile: 'mb-2',
      nameTextColor: 'text-white',
      nameFontSizeDesktop: 'text-sm md:text-base',
      nameFontSizeMobile: 'text-xs sm:text-sm',
      nameFontWeightDesktop: 'font-semibold',
      nameFontWeightMobile: 'font-semibold',
      nameMarginBottomDesktop: 'mb-1',
      nameMarginBottomMobile: 'mb-0.5',
      roleTextColor: 'text-slate-400',
      roleFontSizeDesktop: 'text-xs md:text-sm',
      roleFontSizeMobile: 'text-xs',
      roleFontWeightDesktop: 'font-normal',
      roleFontWeightMobile: 'font-normal',
    },
  }

  // ── Block 2: About This Webinar (group ui/webinar-2.png) ───────────────────
  export const defaultWebinarAboutLayout = {
    blockType: 'webinarAbout',

    // TAB 3: SECTION LAYOUT & SPACING
    matchHeaderPillWidth: true,
    sectionBgColor: 'bg-white',
    paddingTop: 'pt-16 md:pt-24',
    paddingBottom: 'pb-16 md:pb-24',
    paddingLeft: 'pl-6 md:pl-12',
    paddingRight: 'pr-6 md:pr-12',

    // TAB 1: CONTENT & MEDIA
    topBar: {
      title: 'About this webinar',
      meta: 'January Nov 24, 2026. 10:30AM BST',
    },

    intro: {
      kickerText: 'INTRODUCTION',
      heading: 'Why this is important',
      description:
        "Hiring internationally shouldn't mean setting up an entity, stitching together local vendors, or carrying the compliance risk yourself. In this live 30-minute session, see how G-P Employer of Record makes it possible to hire, onboard, and manage employees in 180+ countries without any of that complexity.",
    },

    coverage: {
      kickerText: 'WHAT WE WILL COVER',
      heading: "We'll walk you through FintecConnect and cover:",
      items: [
        {
          boldPrefix: 'How FintecConnect works.',
          text: 'A clear walk-through of what G-P takes on, what stays with you, and where the compliance risk sits, so you and your buying committee know exactly how the relationship works.',
        },
        {
          boldPrefix: 'Onboard in minutes, not days:',
          text: 'Our AI-guided experience and Global Compliance Engine automatically applies real-time local labor laws and compliance requirements to every step— so your team can move fast without putting your business at risk.',
        },
        {
          boldPrefix: 'Full control, less friction:',
          text: 'Full control, less friction: Generate compliant contract in seconds, manage job changes, track onboarding progress, and access detailed financial reporting — all in one intuitive, self-serve platform.',
        },
        {
          boldPrefix: 'Technology when you want it, human when you need it:',
          text: 'G-P Assist delivers 24/7 expert, AI-powered answers built on our proprietary knowledge, and connects you to a live G-P team member when you need to talk to one of our local experts.',
        },
      ],
    },

    concluding: {
      text: "G-P also supports the wider global employment journey with G-P Gia for instant compliance answers and Contractor for international contractor management, so as your needs evolve, our Global Employment Platform evolves with you.\n\nBring your HR, finance, and legal stakeholders. Come with questions. Leave with a clear view of what global hiring looks like when it's done right.",
    },

    // TAB 2: INDIVIDUAL STYLING
    topBarStyles: {
      titleColor: 'text-gray-950',
      titleFontSizeDesktop: 'text-2xl md:text-3xl lg:text-4xl',
      titleFontSizeMobile: 'text-2xl',
      titleFontWeightDesktop: 'font-semibold',
      titleFontWeightMobile: 'font-semibold',
      metaColor: 'text-gray-500',
      metaFontSizeDesktop: 'text-xs sm:text-sm',
      metaFontSizeMobile: 'text-xs',
      metaFontWeightDesktop: 'font-normal',
      metaFontWeightMobile: 'font-normal',
      marginBottomDesktop: 'mb-4 md:mb-6',
      marginBottomMobile: 'mb-4',
    },

    hrStyles: {
      lineColor: 'bg-slate-300',
      lineHeight: 'h-px',
      marginBottomDesktop: 'mb-8 md:mb-12',
      marginBottomMobile: 'mb-6',
    },

    introStyles: {
      squareColor: 'bg-[#0056FF]',
      kickerColor: 'text-[#0056FF]',
      kickerFontSizeDesktop: 'text-xs md:text-sm',
      kickerFontSizeMobile: 'text-xs',
      kickerFontWeightDesktop: 'font-semibold',
      kickerFontWeightMobile: 'font-semibold',
      kickerMarginBottomDesktop: 'mb-3 md:mb-4',
      kickerMarginBottomMobile: 'mb-3',
      headingColor: 'text-gray-950',
      headingFontSizeDesktop: 'text-3xl md:text-4xl lg:text-5xl',
      headingFontSizeMobile: 'text-2xl sm:text-3xl',
      headingFontWeightDesktop: 'font-bold',
      headingFontWeightMobile: 'font-bold',
      headingMarginBottomDesktop: 'mb-4 md:mb-6',
      headingMarginBottomMobile: 'mb-4',
      descColor: 'text-gray-700',
      descFontSizeDesktop: 'text-base md:text-lg',
      descFontSizeMobile: 'text-sm md:text-base',
      descFontWeightDesktop: 'font-normal',
      descFontWeightMobile: 'font-normal',
      descMarginBottomDesktop: 'mb-10 md:mb-14',
      descMarginBottomMobile: 'mb-8',
    },

    coverageStyles: {
      squareColor: 'bg-[#0056FF]',
      kickerColor: 'text-[#0056FF]',
      kickerFontSizeDesktop: 'text-xs md:text-sm',
      kickerFontSizeMobile: 'text-xs',
      kickerFontWeightDesktop: 'font-semibold',
      kickerFontWeightMobile: 'font-semibold',
      kickerMarginBottomDesktop: 'mb-3 md:mb-4',
      kickerMarginBottomMobile: 'mb-3',
      headingColor: 'text-gray-950',
      headingFontSizeDesktop: 'text-3xl md:text-4xl lg:text-5xl',
      headingFontSizeMobile: 'text-2xl sm:text-3xl',
      headingFontWeightDesktop: 'font-bold',
      headingFontWeightMobile: 'font-bold',
      headingMarginBottomDesktop: 'mb-6 md:mb-8',
      headingMarginBottomMobile: 'mb-5',
      bulletBoxColor: 'bg-[#0056FF]',
      itemTextColor: 'text-gray-800',
      itemFontSizeDesktop: 'text-base md:text-lg',
      itemFontSizeMobile: 'text-sm md:text-base',
      itemFontWeightDesktop: 'font-normal',
      itemFontWeightMobile: 'font-normal',
      itemMarginBottomDesktop: 'mb-4 md:mb-6',
      itemMarginBottomMobile: 'mb-4',
    },

    concludingStyles: {
      marginTopDesktop: 'mt-8 md:mt-12',
      marginTopMobile: 'mt-6',
      textColor: 'text-gray-700',
      fontSizeDesktop: 'text-base md:text-lg',
      fontSizeMobile: 'text-sm md:text-base',
      fontWeightDesktop: 'font-normal',
      fontWeightMobile: 'font-normal',
    },
  }

  // ── Block 3: More Webinars That May Interest You (Mockup: webinar 3.png) ──
  export const defaultWebinarMoreLayout = {
    blockType: 'webinarMore',

    // TAB 3: SECTION LAYOUT & SPACING
    matchHeaderPillWidth: true,
    sectionBgColor: 'bg-white',
    paddingTop: 'pt-16 md:pt-24',
    paddingBottom: 'pb-16 md:pb-24',
    paddingLeft: 'pl-6 md:pl-12',
    paddingRight: 'pr-6 md:pr-12',

    // TAB 1: CONTENT & MEDIA
    sectionTitle: 'More Webinars that may interest you',
    emptyStateText: 'No upcoming webinars yet.',
    maxWebinars: 2,

    fallbackItems: [
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

    // TAB 2: INDIVIDUAL STYLING
    titleStyles: {
      textColor: 'text-gray-950',
      fontSizeDesktop: 'text-2xl md:text-3xl lg:text-4xl',
      fontSizeMobile: 'text-2xl',
      fontWeightDesktop: 'font-semibold',
      fontWeightMobile: 'font-semibold',
      marginBottomDesktop: 'mb-4 md:mb-6',
      marginBottomMobile: 'mb-4',
    },

    hrStyles: {
      lineColor: 'bg-slate-300',
      lineHeight: 'h-px',
      marginBottomDesktop: 'mb-10 md:mb-14',
      marginBottomMobile: 'mb-8',
    },

    cardStyles: {
      cardBgColor: 'bg-[#1C202C]',
      subTextColor: 'text-white',
      headingColor: 'text-white',
      headingFontSizeDesktop: 'text-xl sm:text-2xl',
      headingFontSizeMobile: 'text-lg sm:text-xl',
      headingFontWeightDesktop: 'font-bold',
      headingFontWeightMobile: 'font-bold',
      speakerNameColor: 'text-white',
      speakerRoleColor: 'text-slate-400',
    },

    detailStyles: {
      squareColor: 'bg-[#0056FF]',
      kickerColor: 'text-[#0056FF]',
      headingColor: 'text-gray-950',
      headingFontSizeDesktop: 'text-2xl sm:text-3xl lg:text-4xl',
      headingFontSizeMobile: 'text-xl sm:text-2xl',
      headingFontWeightDesktop: 'font-bold',
      headingFontWeightMobile: 'font-bold',
      calendarIconColor: 'text-[#0056FF]',
      dateColor: 'text-gray-700',
      dividerColor: 'bg-slate-200',
      registerTextColor: 'text-[#0056FF]',
      itemGap: 'gap-12 md:gap-16',
    },
  }

  // ── Block 4: Ready to Grow CTA (Mockup: webinar 4.png) ────────────────────
  export const defaultWebinarCTALayout = {
    blockType: 'webinarCTA',

    // TAB 3: SECTION LAYOUT & SPACING
    matchHeaderPillWidth: true,
    sectionBgColor: 'bg-[#0000FF]',
    paddingTop: 'pt-20 md:pt-32',
    paddingBottom: 'pb-20 md:pb-32',
    paddingLeft: 'pl-6 md:pl-12',
    paddingRight: 'pr-6 md:pr-12',

    // TAB 1: CONTENT & MEDIA
    badgeText: 'Ready to grow?',
    heading: "Let's build what comes next, together.",
    description:
      'Explore solutions, discuss partnerships or connect with\none of our specialist businesses.',
    buttonText: 'Talk to our experts',
    buttonLink: '/contact',

    // TAB 2: INDIVIDUAL STYLING
    badgeStyles: {
      bgColor: 'bg-blue-600/50',
      textColor: 'text-white',
      fontSizeDesktop: 'text-xs md:text-sm',
      fontSizeMobile: 'text-xs',
      fontWeightDesktop: 'font-semibold',
      fontWeightMobile: 'font-semibold',
      marginBottomDesktop: 'mb-6 md:mb-8',
      marginBottomMobile: 'mb-5',
    },

    headingStyles: {
      textColor: 'text-white',
      fontSizeDesktop: 'text-4xl sm:text-5xl lg:text-6xl',
      fontSizeMobile: 'text-3xl sm:text-4xl',
      fontWeightDesktop: 'font-bold',
      fontWeightMobile: 'font-bold',
      marginBottomDesktop: 'mb-5 md:mb-6',
      marginBottomMobile: 'mb-4',
    },

    descriptionStyles: {
      textColor: 'text-white/90',
      fontSizeDesktop: 'text-base sm:text-lg md:text-xl',
      fontSizeMobile: 'text-base',
      fontWeightDesktop: 'font-normal',
      fontWeightMobile: 'font-normal',
      marginBottomDesktop: 'mb-8 md:mb-10',
      marginBottomMobile: 'mb-8',
    },

    buttonStyles: {
      bgColor: 'bg-white',
      textColor: 'text-gray-950',
      iconBgColor: 'bg-[#0000FF]',
      iconColor: 'text-white',
    },
  }

export const defaultWebinarTemplateLayout = [
  defaultWebinarHeroLayout,
  defaultWebinarAboutLayout,
  defaultWebinarMoreLayout,
  defaultWebinarCTALayout,
]
