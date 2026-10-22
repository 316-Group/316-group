'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { resolveTypography } from '@/utilities/resolveTypography'

export interface EventConversationFormProps {
  matchHeaderPillWidth?: boolean | null
  paddingMode?: 'default' | 'none' | 'custom' | null
  paddingXDesktop?: string | null
  paddingXDesktopCustom?: string | null
  paddingXMobile?: string | null
  paddingXMobileCustom?: string | null

  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingBottom?: string | null

  leftColumn?: {
    kickerGroup?: {
      showKicker?: boolean | null
      boxBgColor?: string | null
      squareSize?: string | null
      text?: string | null
      textColor?: string | null
      fontSize?: string | null
      fontSizeMobile?: string | null
      fontWeight?: string | null
      fontWeightMobile?: string | null
      marginBottom?: string | null
      marginBottomMobile?: string | null
    } | null

    headingGroup?: {
      heading?: string | null
      headingColor?: string | null
      headingFontSize?: string | null
      headingFontSizeMobile?: string | null
      headingFontWeight?: string | null
      headingFontWeightMobile?: string | null
      marginBottom?: string | null
      marginBottomMobile?: string | null
    } | null

    descriptionGroup?: {
      description?: string | null
      descriptionColor?: string | null
      descriptionFontSize?: string | null
      descriptionFontSizeMobile?: string | null
      descriptionFontWeight?: string | null
      descriptionFontWeightMobile?: string | null
      marginBottom?: string | null
      marginBottomMobile?: string | null
    } | null

    divider?: {
      showDivider?: boolean | null
      borderColor?: string | null
      borderWidth?: string | null
      marginBottom?: string | null
      marginBottomMobile?: string | null
    } | null

    stepsTitle?: {
      text?: string | null
      textColor?: string | null
      fontSize?: string | null
      fontSizeMobile?: string | null
      fontWeight?: string | null
      fontWeightMobile?: string | null
      marginBottom?: string | null
      marginBottomMobile?: string | null
    } | null

    steps?: Array<{
      id?: string | null
      numberText?: string | null
      numberColor?: string | null
      text?: string | null
      textColor?: string | null
      fontSize?: string | null
      fontSizeMobile?: string | null
      fontWeight?: string | null
      fontWeightMobile?: string | null
    }> | null

    listMarginBottom?: string | null
    listMarginBottomMobile?: string | null

    bottomIcon?: {
      showBottomIcon?: boolean | null
      iconType?: 'matrix3x3' | 'upload' | null
      matrixColor?: string | null
      customIcon?: MediaType | string | null
    } | null
  } | null

  rightColumn?: {
    formCardBgColor?: string | null
    formTitle?: string | null
    requiredNote?: string | null

    fieldsConfig?: {
      firstNameLabel?: string | null
      firstNamePlaceholder?: string | null
      lastNameLabel?: string | null
      lastNamePlaceholder?: string | null

      emailLabel?: string | null
      emailPlaceholder?: string | null

      organisationLabel?: string | null
      organisationPlaceholder?: string | null
      jobTitleLabel?: string | null
      jobTitlePlaceholder?: string | null

      discussionTopicLabel?: string | null
      discussionTopicPlaceholder?: string | null
      discussionTopicOptions?: Array<{ id?: string | null; option: string }> | null

      preferredDayLabel?: string | null
      preferredDayPlaceholder?: string | null
      preferredDayOptions?: Array<{ id?: string | null; option: string }> | null

      meetingFormatLabel?: string | null
      meetingFormatPlaceholder?: string | null
      meetingFormatOptions?: Array<{ id?: string | null; option: string }> | null

      notesLabel?: string | null
      notesPlaceholder?: string | null

      consentLabel?: string | null
      privacyLinkText?: string | null
      privacyLinkUrl?: string | null

      submitButtonText?: string | null
      submitButtonBgColor?: string | null
      submitButtonTextColor?: string | null

      disclaimerText?: string | null
      disclaimerTextColor?: string | null
    } | null
  } | null

  // Tab 2 Individual Styling Groups
  kickerStyles?: {
    boxBgColor?: string | null
    squareSize?: string | null
    textColor?: string | null
    fontSize?: string | null
    fontSizeMobile?: string | null
    fontWeight?: string | null
    fontWeightMobile?: string | null
    marginBottom?: string | null
    marginBottomMobile?: string | null
  } | null

  headingStyles?: {
    headingColor?: string | null
    headingFontSize?: string | null
    headingFontSizeMobile?: string | null
    headingFontWeight?: string | null
    headingFontWeightMobile?: string | null
    marginBottom?: string | null
    marginBottomMobile?: string | null
  } | null

  descriptionStyles?: {
    descriptionColor?: string | null
    descriptionFontSize?: string | null
    descriptionFontSizeMobile?: string | null
    descriptionFontWeight?: string | null
    descriptionFontWeightMobile?: string | null
    marginBottom?: string | null
    marginBottomMobile?: string | null
  } | null

  roadmapStyles?: {
    showDivider?: boolean | null
    borderColor?: string | null
    borderWidth?: string | null
    dividerMarginBottom?: string | null
    dividerMarginBottomMobile?: string | null
    stepsTitleColor?: string | null
    stepsTitleFontSize?: string | null
    stepsTitleFontSizeMobile?: string | null
    stepsTitleFontWeight?: string | null
    stepsTitleFontWeightMobile?: string | null
    stepsTitleMarginBottom?: string | null
    stepsTitleMarginBottomMobile?: string | null
    stepNumberColor?: string | null
    stepTextColor?: string | null
    stepFontSize?: string | null
    stepFontSizeMobile?: string | null
    stepFontWeight?: string | null
    stepFontWeightMobile?: string | null
    listMarginBottom?: string | null
    listMarginBottomMobile?: string | null
    matrixColor?: string | null
  } | null

  formCardStyles?: {
    formCardBgColor?: string | null
    submitButtonBgColor?: string | null
    submitButtonTextColor?: string | null
    disclaimerTextColor?: string | null
  } | null

  className?: string
}

function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
    .replace(/\n\n/g, '</p><p class="mt-4">')
    .replace(/\n/g, '<br />')
}

export const EventConversationFormBlock: React.FC<EventConversationFormProps> = (props) => {
  const {
    matchHeaderPillWidth = true,
    paddingMode = 'default',
    paddingXDesktop = '48px',
    paddingXDesktopCustom,
    paddingXMobile = '16px',
    paddingXMobileCustom,
    sectionBgColor = 'bg-[#0000FF]',
    paddingTop = 'pt-20 md:pt-28',
    paddingBottom = 'pb-20 md:pb-28',
    leftColumn,
    rightColumn,
    kickerStyles,
    headingStyles,
    descriptionStyles,
    roadmapStyles,
    formCardStyles,
    className,
  } = props

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    organisation: '',
    jobTitle: '',
    discussionTopic: '',
    preferredDay: '',
    meetingFormat: '',
    notes: '',
    consentAccepted: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Horizontal Padding Calculation
  let horizontalPaddingStyle: React.CSSProperties = {}
  let horizontalPaddingClass = ''

  if (matchHeaderPillWidth) {
    horizontalPaddingClass = 'max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'
  } else if (paddingMode === 'none') {
    horizontalPaddingClass = 'w-full px-0'
  } else if (paddingMode === 'custom') {
    const dVal =
      paddingXDesktop === 'custom' && paddingXDesktopCustom ? paddingXDesktopCustom : paddingXDesktop || '48px'
    const mVal =
      paddingXMobile === 'custom' && paddingXMobileCustom ? paddingXMobileCustom : paddingXMobile || '16px'

    horizontalPaddingStyle = {
      paddingLeft: `var(--section-pl, ${dVal})`,
      paddingRight: `var(--section-pr, ${dVal})`,
    }
  } else {
    horizontalPaddingClass = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
  }

  // Left Column Content
  const kicker = leftColumn?.kickerGroup
  const heading = leftColumn?.headingGroup
  const description = leftColumn?.descriptionGroup
  const divider = leftColumn?.divider
  const stepsTitle = leftColumn?.stepsTitle
  const steps = leftColumn?.steps || []
  const bottomIcon = leftColumn?.bottomIcon

  // Right Column Content with Fallback Cascades
  const formCardBgColor = formCardStyles?.formCardBgColor || rightColumn?.formCardBgColor || 'bg-white'
  const formTitle = rightColumn?.formTitle || 'Request a meeting'
  const requiredNote = rightColumn?.requiredNote || '* Required fields'
  const fields = rightColumn?.fieldsConfig

  // Left Column Typography with Fallback Cascades
  const kickerTypo = resolveTypography(
    kickerStyles?.fontSize || kicker?.fontSize || 'text-xs md:text-sm',
    kickerStyles?.fontSizeMobile || kicker?.fontSizeMobile,
    kickerStyles?.fontWeight || kicker?.fontWeight || 'font-semibold',
    kickerStyles?.fontWeightMobile || kicker?.fontWeightMobile,
  )

  const headingTypo = resolveTypography(
    headingStyles?.headingFontSize || heading?.headingFontSize || 'text-4xl md:text-5xl lg:text-6xl',
    headingStyles?.headingFontSizeMobile || heading?.headingFontSizeMobile,
    headingStyles?.headingFontWeight || heading?.headingFontWeight || 'font-bold',
    headingStyles?.headingFontWeightMobile || heading?.headingFontWeightMobile,
  )

  const descTypo = resolveTypography(
    descriptionStyles?.descriptionFontSize || description?.descriptionFontSize || 'text-base md:text-lg',
    descriptionStyles?.descriptionFontSizeMobile || description?.descriptionFontSizeMobile,
    descriptionStyles?.descriptionFontWeight || description?.descriptionFontWeight || 'font-normal',
    descriptionStyles?.descriptionFontWeightMobile || description?.descriptionFontWeightMobile,
  )

  const stepsTitleTypo = resolveTypography(
    roadmapStyles?.stepsTitleFontSize || stepsTitle?.fontSize || 'text-base md:text-lg',
    roadmapStyles?.stepsTitleFontSizeMobile || stepsTitle?.fontSizeMobile,
    roadmapStyles?.stepsTitleFontWeight || stepsTitle?.fontWeight || 'font-semibold',
    roadmapStyles?.stepsTitleFontWeightMobile || stepsTitle?.fontWeightMobile,
  )

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.workEmail.trim() ||
      !formData.organisation.trim() ||
      !formData.discussionTopic.trim()
    ) {
      setErrorMessage('Please fill in all required fields indicated with an asterisk (*).')
      return
    }

    if (!formData.consentAccepted) {
      setErrorMessage('Please accept the privacy policy to submit your meeting request.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/event-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          workEmail: formData.workEmail,
          organisation: formData.organisation,
          jobTitle: formData.jobTitle,
          discussionTopic: formData.discussionTopic,
          preferredDay: formData.preferredDay,
          meetingFormat: formData.meetingFormat,
          notes: formData.notes,
          consentAccepted: formData.consentAccepted,
          sourceEventTitle: '316 Group Event',
          sourceEventSlug:
            typeof window !== 'undefined'
              ? window.location.pathname.split('/').filter(Boolean).pop() || 'esmo-2026'
              : 'esmo-2026',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to submit inquiry.')
      }

      setSubmitSuccess(true)
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const showDivider = roadmapStyles?.showDivider ?? (divider?.showDivider !== false)

  return (
    <section
      className={cn('w-full relative transition-colors duration-300', sectionBgColor || 'bg-[#0000FF]', className)}
    >
      <div
        className={cn('w-full', paddingTop || 'pt-20 md:pt-28', paddingBottom || 'pb-20 md:pb-28')}
        style={horizontalPaddingStyle}
      >
        <div className={cn('w-full', horizontalPaddingClass)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* ─── LEFT COLUMN: CONTEXT & NEXT STEPS ROADMAP ─── */}
            <div className="lg:col-span-5 flex flex-col justify-start">
              {/* Kicker / Subheading */}
              {kicker?.showKicker !== false && kicker?.text && (
                <div
                  className={cn(
                    'flex items-center gap-2.5',
                    kickerStyles?.marginBottom || kicker.marginBottom || 'mb-4 md:mb-6',
                    (kickerStyles?.marginBottomMobile || kicker.marginBottomMobile) &&
                      `max-md:${kickerStyles?.marginBottomMobile || kicker.marginBottomMobile}`,
                  )}
                >
                  <span
                    className={cn(
                      'inline-block flex-shrink-0',
                      kickerStyles?.squareSize || kicker.squareSize || 'w-2.5 h-2.5',
                      kickerStyles?.boxBgColor || kicker.boxBgColor || 'bg-[#00D2FF]',
                    )}
                  />
                  <span
                    className={cn(
                      'uppercase tracking-wider',
                      kickerTypo.combined,
                      kickerStyles?.textColor || kicker.textColor || 'text-white',
                    )}
                  >
                    {kicker.text}
                  </span>
                </div>
              )}

              {/* Heading */}
              {heading?.heading && (
                <h2
                  className={cn(
                    'leading-[1.1] tracking-tight',
                    headingTypo.combined,
                    headingStyles?.headingColor || heading.headingColor || 'text-white',
                    headingStyles?.marginBottom || heading.marginBottom || 'mb-6 md:mb-8',
                    (headingStyles?.marginBottomMobile || heading.marginBottomMobile) &&
                      `max-md:${headingStyles?.marginBottomMobile || heading.marginBottomMobile}`,
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(heading.heading) }}
                />
              )}

              {/* Description */}
              {description?.description && (
                <div
                  className={cn(
                    'leading-relaxed',
                    descTypo.combined,
                    descriptionStyles?.descriptionColor || description.descriptionColor || 'text-white/90',
                    descriptionStyles?.marginBottom || description.marginBottom || 'mb-8 md:mb-10',
                    (descriptionStyles?.marginBottomMobile || description.marginBottomMobile) &&
                      `max-md:${descriptionStyles?.marginBottomMobile || description.marginBottomMobile}`,
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(description.description) }}
                />
              )}

              {/* Divider Line */}
              {showDivider && (
                <hr
                  className={cn(
                    'w-full border-0',
                    roadmapStyles?.borderWidth || divider?.borderWidth || 'border-t',
                    roadmapStyles?.borderColor || divider?.borderColor || 'border-white/20',
                    roadmapStyles?.dividerMarginBottom || divider?.marginBottom || 'mb-6 md:mb-8',
                    (roadmapStyles?.dividerMarginBottomMobile || divider?.marginBottomMobile) &&
                      `max-md:${roadmapStyles?.dividerMarginBottomMobile || divider?.marginBottomMobile}`,
                  )}
                />
              )}

              {/* Steps Title */}
              {stepsTitle?.text && (
                <h3
                  className={cn(
                    'tracking-tight',
                    stepsTitleTypo.combined,
                    roadmapStyles?.stepsTitleColor || stepsTitle.textColor || 'text-white',
                    roadmapStyles?.stepsTitleMarginBottom || stepsTitle.marginBottom || 'mb-4 md:mb-6',
                    (roadmapStyles?.stepsTitleMarginBottomMobile || stepsTitle.marginBottomMobile) &&
                      `max-md:${roadmapStyles?.stepsTitleMarginBottomMobile || stepsTitle.marginBottomMobile}`,
                  )}
                >
                  {stepsTitle.text}
                </h3>
              )}

              {/* Steps Array */}
              {steps.length > 0 && (
                <div
                  className={cn(
                    'flex flex-col gap-4 sm:gap-5',
                    roadmapStyles?.listMarginBottom || leftColumn?.listMarginBottom || 'mb-10 md:mb-12',
                    (roadmapStyles?.listMarginBottomMobile || leftColumn?.listMarginBottomMobile) &&
                      `max-md:${roadmapStyles?.listMarginBottomMobile || leftColumn?.listMarginBottomMobile}`,
                  )}
                >
                  {steps.map((step, index) => {
                    const stepNumber =
                      step.numberText && step.numberText.trim()
                        ? step.numberText
                        : String(index + 1).padStart(2, '0')

                    const stepTypo = resolveTypography(
                      roadmapStyles?.stepFontSize || step.fontSize || 'text-sm md:text-base',
                      roadmapStyles?.stepFontSizeMobile || step.fontSizeMobile,
                      roadmapStyles?.stepFontWeight || step.fontWeight || 'font-normal',
                      roadmapStyles?.stepFontWeightMobile || step.fontWeightMobile,
                    )

                    return (
                      <div key={step.id || index} className="flex items-start gap-4">
                        <span
                          className={cn(
                            'font-mono font-semibold select-none flex-shrink-0 tabular-nums min-w-[24px]',
                            roadmapStyles?.stepNumberColor || step.numberColor || 'text-[#00D2FF]',
                            stepTypo.combined,
                          )}
                        >
                          {stepNumber}
                        </span>
                        <span
                          className={cn(
                            'leading-relaxed',
                            stepTypo.combined,
                            roadmapStyles?.stepTextColor || step.textColor || 'text-white',
                          )}
                        >
                          {step.text}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Bottom Decorative Icon / 3x3 Matrix */}
              {bottomIcon?.showBottomIcon !== false && (
                <div className="pt-2">
                  {bottomIcon?.iconType === 'upload' && bottomIcon.customIcon ? (
                    <div className="w-10 h-10 flex-shrink-0">
                      <Media
                        resource={bottomIcon.customIcon}
                        className="w-10 h-10"
                        imgClassName="w-10 h-10 object-contain"
                      />
                    </div>
                  ) : (
                    /* 3x3 Cyan Square Matrix */
                    <div className="grid grid-cols-3 gap-2 w-8 h-8">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            'w-2 h-2 rounded-[1px]',
                            roadmapStyles?.matrixColor || bottomIcon?.matrixColor || 'bg-[#00D2FF]',
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ─── RIGHT COLUMN: MEETING REQUEST FORM CARD ─── */}
            <div className="lg:col-span-7 w-full flex justify-center">
              <div
                className={cn(
                  'w-full max-w-2xl rounded-2xl p-6 sm:p-10 lg:p-12 shadow-2xl transition-all duration-300',
                  formCardBgColor,
                )}
              >
                {submitSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle2 className="w-16 h-16 text-[#0256FF] mb-4" />
                    <h3 className="text-2xl sm:text-3xl font-bold text-black mb-3">
                      Meeting request received
                    </h3>
                    <p className="text-slate-600 max-w-md leading-relaxed mb-6">
                      Thank you for getting in touch. A member of the 316 Group oncology team will review
                      your details and reach out shortly to coordinate an exchange during ESMO 2026.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitSuccess(false)
                        setFormData({
                          firstName: '',
                          lastName: '',
                          workEmail: '',
                          organisation: '',
                          jobTitle: '',
                          discussionTopic: '',
                          preferredDay: '',
                          meetingFormat: '',
                          notes: '',
                          consentAccepted: false,
                        })
                      }}
                      className="px-6 py-2.5 rounded-full border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
                    {/* Header: Title + Required Note */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-slate-100 pb-4">
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
                        {formTitle}
                      </h3>
                      <span className="text-xs text-slate-400 font-medium">
                        {requiredNote}
                      </span>
                    </div>

                    {errorMessage && (
                      <div className="flex items-center gap-2 p-3.5 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Row 1: First & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs sm:text-sm font-semibold text-slate-900">
                          {fields?.firstNameLabel || 'First name'}{' '}
                          <span className="text-[#0256FF]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder={fields?.firstNamePlaceholder || 'Your first name'}
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs sm:text-sm font-semibold text-slate-900">
                          {fields?.lastNameLabel || 'Last name'}{' '}
                          <span className="text-[#0256FF]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder={fields?.lastNamePlaceholder || 'Your last name'}
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Work Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs sm:text-sm font-semibold text-slate-900">
                        {fields?.emailLabel || 'Work email'}{' '}
                        <span className="text-[#0256FF]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder={fields?.emailPlaceholder || 'you@organisation.com'}
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Row 3: Organisation & Role */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs sm:text-sm font-semibold text-slate-900">
                          {fields?.organisationLabel || 'Organisation'}{' '}
                          <span className="text-[#0256FF]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.organisation}
                          onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                          placeholder={fields?.organisationPlaceholder || 'Organisation name'}
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs sm:text-sm font-semibold text-slate-900">
                          {fields?.jobTitleLabel || 'Job title'}
                        </label>
                        <input
                          type="text"
                          value={formData.jobTitle}
                          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                          placeholder={fields?.jobTitlePlaceholder || 'Your role'}
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 4: Discussion Topic */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs sm:text-sm font-semibold text-slate-900">
                        {fields?.discussionTopicLabel || 'What would you like to discuss?'}{' '}
                        <span className="text-[#0256FF]">*</span>
                      </label>
                      <select
                        required
                        value={formData.discussionTopic}
                        onChange={(e) => setFormData({ ...formData, discussionTopic: e.target.value })}
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-lg border border-slate-200 text-slate-900 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all"
                      >
                        <option value="">
                          {fields?.discussionTopicPlaceholder || 'Select a discussion topic'}
                        </option>
                        {fields?.discussionTopicOptions?.map((item, idx) => (
                          <option key={item.id || idx} value={item.option}>
                            {item.option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Row 5: Preferred Day & Format */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs sm:text-sm font-semibold text-slate-900">
                          {fields?.preferredDayLabel || 'Preferred day'}
                        </label>
                        <select
                          value={formData.preferredDay}
                          onChange={(e) => setFormData({ ...formData, preferredDay: e.target.value })}
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-lg border border-slate-200 text-slate-900 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all"
                        >
                          <option value="">
                            {fields?.preferredDayPlaceholder || 'Select 23–27 October'}
                          </option>
                          {fields?.preferredDayOptions?.map((item, idx) => (
                            <option key={item.id || idx} value={item.option}>
                              {item.option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs sm:text-sm font-semibold text-slate-900">
                          {fields?.meetingFormatLabel || 'Meeting format'}
                        </label>
                        <select
                          value={formData.meetingFormat}
                          onChange={(e) => setFormData({ ...formData, meetingFormat: e.target.value })}
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-lg border border-slate-200 text-slate-900 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all"
                        >
                          <option value="">
                            {fields?.meetingFormatPlaceholder || 'Select a preference'}
                          </option>
                          {fields?.meetingFormatOptions?.map((item, idx) => (
                            <option key={item.id || idx} value={item.option}>
                              {item.option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 6: Additional Information */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs sm:text-sm font-semibold text-slate-900">
                        {fields?.notesLabel || "Anything else you'd like us to know?"}
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder={
                          fields?.notesPlaceholder ||
                          'Share your priorities or availability. Please do not include patient or sensitive health information.'
                        }
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    {/* Row 7: Consent Checkbox */}
                    <div className="flex items-start gap-3 pt-1">
                      <input
                        type="checkbox"
                        id="consent-checkbox"
                        required
                        checked={formData.consentAccepted}
                        onChange={(e) => setFormData({ ...formData, consentAccepted: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-[#0256FF] focus:ring-[#0256FF]"
                      />
                      <label htmlFor="consent-checkbox" className="text-xs sm:text-sm text-slate-600 leading-normal">
                        {fields?.consentLabel ||
                          'I agree that 316 Group may use these details to contact me about this meeting request.'}{' '}
                        <Link
                          href={fields?.privacyLinkUrl || '/privacy-policy'}
                          className="text-[#0256FF] underline font-medium hover:opacity-80"
                        >
                          {fields?.privacyLinkText || 'See our Privacy notice.'}
                        </Link>
                      </label>
                    </div>

                    {/* Row 8: Submit CTA Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                          'w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none',
                          formCardStyles?.submitButtonBgColor || fields?.submitButtonBgColor || 'bg-[#0256FF]',
                          formCardStyles?.submitButtonTextColor || fields?.submitButtonTextColor || 'text-white',
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending request...</span>
                          </>
                        ) : (
                          <>
                            <span>{fields?.submitButtonText || 'Request a meeting'}</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Row 9: Disclaimer */}
                    <p
                      className={cn(
                        'text-xs leading-relaxed pt-2 border-t border-slate-100',
                        formCardStyles?.disclaimerTextColor || fields?.disclaimerTextColor || 'text-slate-500',
                      )}
                    >
                      {fields?.disclaimerText ||
                        'Submitting a request does not confirm a meeting. Your details are used to coordinate your enquiry, not to register you for the congress.'}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
