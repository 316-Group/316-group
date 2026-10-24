export interface WebinarHeroSpeaker {
  id?: string
  name?: string
  role?: string
  image?: any
  flag?: string
}

export const defaultWebinarHeroData = {
  // Section Layout & Spacing
  bgColor: 'bg-[#0000FF]',
  matchHeaderPillWidth: true,
  paddingTopDesktop: 'pt-24',
  paddingTopMobile: 'pt-20',
  paddingBottomDesktop: 'pb-24',
  paddingBottomMobile: 'pb-20',
  paddingLeftDesktop: 'pl-12',
  paddingLeftMobile: 'pl-4',
  paddingRightDesktop: 'pr-12',
  paddingRightMobile: 'pr-4',

  // Left Column Content
  kickerText: '316 GROUP AT ESMO 2026',
  heading: 'Translating oncology innovation into real-world impact',
  description:
    "A shared ambition. A meaningful conversation. Join 316 Group in Madrid to explore what's next for healthcare.",
  dateText: '23–27 October 2026',
  locationText: 'Madrid, Spain',
  button1Text: 'Request a meeting',
  button1Link: '#meeting',
  button2Text: 'Explore the conversations ↓',
  button2Link: '#conversations',

  // Right Column Showcase Card Content
  cardSubText: '316group',
  cardHeading: 'We back disruptive products and founders in retail',
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
  ] as WebinarHeroSpeaker[],
}
