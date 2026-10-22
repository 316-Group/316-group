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

  // Right Column Content
  const formCardBgColor = rightColumn?.formCardBgColor || 'bg-white'
  const formTitle = rightColumn?.formTitle || 'Request a meeting'
  const requiredNote = rightColumn?.requiredNote || '* Required fields'
  const fields = rightColumn?.fieldsConfig

  // Left Column Typography
  const kickerTypo = resolveTypography(
    kicker?.fontSize || 'text-xs md:text-sm',
    kicker?.fontSizeMobile,
    kicker?.fontWeight || 'font-semibold',
    kicker?.fontWeightMobile,
  )

  const headingTypo = resolveTypography(
    heading?.headingFontSize || 'text-4xl md:text-5xl lg:text-6xl',
    heading?.headingFontSizeMobile,
    heading?.headingFontWeight || 'font-bold',
    heading?.headingFontWeightMobile,
  )

  const descTypo = resolveTypography(
    description?.descriptionFontSize || 'text-base md:text-lg',
    description?.descriptionFontSizeMobile,
    description?.descriptionFontWeight || 'font-normal',
    description?.descriptionFontWeightMobile,
  )

  const stepsTitleTypo = resolveTypography(
    stepsTitle?.fontSize || 'text-base md:text-lg',
    stepsTitle?.fontSizeMobile,
    stepsTitle?.fontWeight || 'font-semibold',
    stepsTitle?.fontWeightMobile,
  )

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.workEmail.trim() || !formData.organisation.trim() || !formData.discussionTopic.trim()) {
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
          sourceEventTitle: '316 Group at ESMO 2026',
          sourceEventSlug: 'esmo-2026',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request.')
      }

      setSubmitSuccess(true)
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className={cn('w-full relative transition-colors duration-300', sectionBgColor || 'bg-[#0000FF]', className)}
    >
      <div
        className={cn('w-full', paddingTop || 'pt-20 md:pt-28', paddingBottom || 'pb-20 md:pb-28')}
        style={horizontalPaddingStyle}
      >
        <div className={cn('w-full', horizontalPaddingClass)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* ─── LEFT COLUMN: CONTEXT & PROCESS ROADMAP ─── */}
            <div className="lg:col-span-5 flex flex-col">
              {/* Kicker / Subheading */}
              {kicker?.showKicker !== false && kicker?.text && (
                <div
                  className={cn(
                    'flex items-center gap-2.5',
                    kicker.marginBottom || 'mb-4 md:mb-6',
                    kicker.marginBottomMobile && `max-md:${kicker.marginBottomMobile}`,
                  )}
                >
                  <span
                    className={cn(
                      'inline-block flex-shrink-0',
                      kicker.squareSize || 'w-2.5 h-2.5',
                      kicker.boxBgColor || 'bg-[#00D2FF]',
                    )}
                  />
                  <span
                    className={cn(
                      'uppercase tracking-wider',
                      kickerTypo.combined,
                      kicker.textColor || 'text-white',
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
                    'leading-[1.15] tracking-tight',
                    headingTypo.combined,
                    heading.headingColor || 'text-white',
                    heading.marginBottom || 'mb-6 md:mb-8',
                    heading.marginBottomMobile && `max-md:${heading.marginBottomMobile}`,
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
                    description.descriptionColor || 'text-white/90',
                    description.marginBottom || 'mb-8 md:mb-10',
                    description.marginBottomMobile && `max-md:${description.marginBottomMobile}`,
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(description.description) }}
                />
              )}

              {/* Divider Line */}
              {divider?.showDivider !== false && (
                <hr
                  className={cn(
                    'w-full border-0',
                    divider?.borderWidth || 'border-t',
                    divider?.borderColor || 'border-white/20',
                    divider?.marginBottom || 'mb-6 md:mb-8',
                    divider?.marginBottomMobile && `max-md:${divider.marginBottomMobile}`,
                  )}
                />
              )}

              {/* Steps Title */}
              {stepsTitle?.text && (
                <h3
                  className={cn(
                    'leading-snug',
                    stepsTitleTypo.combined,
                    stepsTitle.textColor || 'text-white',
                    stepsTitle.marginBottom || 'mb-4 md:mb-6',
                    stepsTitle.marginBottomMobile && `max-md:${stepsTitle.marginBottomMobile}`,
                  )}
                >
                  {stepsTitle.text}
                </h3>
              )}

              {/* Numbered Steps */}
              {steps.length > 0 && (
                <div
                  className={cn(
                    'flex flex-col gap-3 md:gap-4',
                    leftColumn?.listMarginBottom || 'mb-10 md:mb-12',
                    leftColumn?.listMarginBottomMobile && `max-md:${leftColumn.listMarginBottomMobile}`,
                  )}
                >
                  {steps.map((step, index) => {
                    const stepNum =
                      step.numberText && step.numberText.trim()
                        ? step.numberText
                        : String(index + 1).padStart(2, '0')

                    const stepTypo = resolveTypography(
                      step.fontSize || 'text-sm md:text-base',
                      step.fontSizeMobile,
                      step.fontWeight || 'font-normal',
                      step.fontWeightMobile,
                    )

                    return (
                      <div key={step.id || index} className="flex items-start gap-3.5 sm:gap-4">
                        <span
                          className={cn(
                            'select-none flex-shrink-0 tabular-nums font-semibold tracking-wide pt-0.5',
                            step.numberColor || 'text-[#00D2FF]',
                          )}
                        >
                          {stepNum}
                        </span>
                        <span
                          className={cn(
                            'leading-relaxed',
                            stepTypo.combined,
                            step.textColor || 'text-white',
                          )}
                        >
                          {step.text}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Bottom Decorative Graphic (3x3 Cyan Matrix) */}
              {bottomIcon?.showBottomIcon !== false && (
                <div className="pt-2">
                  {bottomIcon?.iconType === 'upload' && bottomIcon?.customIcon ? (
                    <div className="w-9 h-9">
                      <Media resource={bottomIcon.customIcon} className="w-9 h-9 object-contain" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-1.5 w-8 h-8">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            'w-2 h-2 rounded-[2px]',
                            bottomIcon?.matrixColor || 'bg-[#00D2FF]',
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ─── RIGHT COLUMN: MEETING REQUEST FORM CARD ─── */}
            <div className="lg:col-span-7 w-full">
              <div
                className={cn(
                  'w-full rounded-2xl shadow-2xl p-6 sm:p-10 lg:p-12 text-slate-900 transition-all duration-300',
                  formCardBgColor || 'bg-white',
                )}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8 pb-2 border-b border-slate-100">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                    {formTitle}
                  </h3>
                  {requiredNote && (
                    <span className="text-xs sm:text-sm text-slate-400 font-medium">
                      {requiredNote}
                    </span>
                  )}
                </div>

                {submitSuccess ? (
                  <div className="py-12 px-4 text-center flex flex-col items-center">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4 animate-in zoom-in-75 duration-300" />
                    <h4 className="text-2xl font-bold text-slate-900 mb-2">Thank you!</h4>
                    <p className="text-base text-slate-600 max-w-md leading-relaxed mb-6">
                      Your meeting request has been submitted successfully. We have sent a confirmation email to{' '}
                      <span className="font-semibold text-slate-900">{formData.workEmail}</span> with your meeting preferences.
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
                      className="px-6 py-2.5 rounded-full text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Error Banner */}
                    {errorMessage && (
                      <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Row 1: First Name & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                          {fields?.firstNameLabel || 'First name'} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder={fields?.firstNamePlaceholder || 'Your first name'}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                          {fields?.lastNameLabel || 'Last name'} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder={fields?.lastNamePlaceholder || 'Your last name'}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Work Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                        {fields?.emailLabel || 'Work email'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder={fields?.emailPlaceholder || 'you@organisation.com'}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Row 3: Organisation & Job Title */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                          {fields?.organisationLabel || 'Organisation'} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.organisation}
                          onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                          placeholder={fields?.organisationPlaceholder || 'Organisation name'}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                          {fields?.jobTitleLabel || 'Job title'}
                        </label>
                        <input
                          type="text"
                          value={formData.jobTitle}
                          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                          placeholder={fields?.jobTitlePlaceholder || 'Your role'}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 4: What would you like to discuss? */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                        {fields?.discussionTopicLabel || 'What would you like to discuss?'} <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.discussionTopic}
                        onChange={(e) => setFormData({ ...formData, discussionTopic: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all"
                      >
                        <option value="" disabled>
                          {fields?.discussionTopicPlaceholder || 'Select a discussion topic'}
                        </option>
                        {(fields?.discussionTopicOptions || [
                          { option: 'Connecting technology to clinical reality' },
                          { option: 'Data that actually serves clinicians' },
                          { option: 'Cross-border learning, local impact' },
                          { option: "Preparing for what's next in oncology" },
                          { option: 'Other / General exploratory meeting' },
                        ]).map((opt, i) => (
                          <option key={opt.id || i} value={opt.option}>
                            {opt.option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Row 5: Preferred Day & Meeting Format */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                          {fields?.preferredDayLabel || 'Preferred day'}
                        </label>
                        <select
                          value={formData.preferredDay}
                          onChange={(e) => setFormData({ ...formData, preferredDay: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all"
                        >
                          <option value="">
                            {fields?.preferredDayPlaceholder || 'Select 23–27 October'}
                          </option>
                          {(fields?.preferredDayOptions || [
                            { option: 'Friday, 23 October 2026' },
                            { option: 'Saturday, 24 October 2026' },
                            { option: 'Sunday, 25 October 2026' },
                            { option: 'Monday, 26 October 2026' },
                            { option: 'Tuesday, 27 October 2026' },
                            { option: 'Flexible / Any day' },
                          ]).map((opt, i) => (
                            <option key={opt.id || i} value={opt.option}>
                              {opt.option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                          {fields?.meetingFormatLabel || 'Meeting format'}
                        </label>
                        <select
                          value={formData.meetingFormat}
                          onChange={(e) => setFormData({ ...formData, meetingFormat: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all"
                        >
                          <option value="">
                            {fields?.meetingFormatPlaceholder || 'Select a preference'}
                          </option>
                          {(fields?.meetingFormatOptions || [
                            { option: 'One-to-one exchange' },
                            { option: 'Team discussion' },
                            { option: 'Informal coffee chat' },
                            { option: 'Virtual meeting post-congress' },
                          ]).map((opt, i) => (
                            <option key={opt.id || i} value={opt.option}>
                              {opt.option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 6: Additional Information / Notes */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
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
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0256FF] focus:border-transparent transition-all resize-y"
                      />
                    </div>

                    {/* Row 7: Consent Checkbox */}
                    <div className="flex items-start gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="event-consent"
                        required
                        checked={formData.consentAccepted}
                        onChange={(e) => setFormData({ ...formData, consentAccepted: e.target.checked })}
                        className="w-4 h-4 mt-1 rounded border-slate-300 text-[#0256FF] focus:ring-[#0256FF] cursor-pointer"
                      />
                      <label htmlFor="event-consent" className="text-xs text-slate-600 leading-relaxed cursor-pointer select-none">
                        {fields?.consentLabel ||
                          'I agree that 316 Group may use these details to contact me about this meeting request.'}{' '}
                        <Link
                          href={fields?.privacyLinkUrl || '/privacy-policy'}
                          target="_blank"
                          className="underline hover:text-slate-900 transition-colors"
                        >
                          {fields?.privacyLinkText || 'See our Privacy notice.'}
                        </Link>
                      </label>
                    </div>

                    {/* Row 8: Submit Button */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                          'w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold transition-all duration-200 shadow-md flex items-center justify-center gap-2 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none',
                          fields?.submitButtonBgColor || 'bg-[#0256FF]',
                          fields?.submitButtonTextColor || 'text-white',
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting request...</span>
                          </>
                        ) : (
                          <>
                            <span>{fields?.submitButtonText || 'Request a meeting'}</span>
                            <ArrowUpRight className="w-4 h-4 flex-shrink-0" />
                          </>
                        )}
                      </button>

                      {/* Disclaimer Text */}
                      {fields?.disclaimerText !== null && (
                        <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                          {fields?.disclaimerText ||
                            'Submitting a request does not confirm a meeting. Your details are used to coordinate your enquiry, not to register you for the congress.'}
                        </p>
                      )}
                    </div>
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
