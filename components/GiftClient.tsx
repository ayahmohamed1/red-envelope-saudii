'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import type { GiftData } from '@/lib/giftData'
import SwanBackground from './SwanBackground'

interface Props {
  data: GiftData
}

type Stage = 'initial_envelope' | 'initial_message' | 'activity_envelope' | 'activity_message'

export default function GiftClient({ data }: Props) {
  const [isMounted, setIsMounted] = useState(false)
  const [stage, setStage] = useState<Stage>('initial_envelope')
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0)
  const [isOpeningEnvelope, setIsOpeningEnvelope] = useState(false)

  // مساعدة لتنسيق النصوص سواء كُتبت كنص متعدد الأسطر أو مصفوفة
  const formatText = (text: string | string[] | undefined): string => {
    if (!text) return ''
    if (Array.isArray(text)) return text.join('\n')
    return text
  }

  // قائمة الأنشطة (6 خطوات)
  const activities = data.activities || []
  const totalActivities = activities.length > 0 ? activities.length : 6

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // التعامل مع فتح الظرف الأول
  const handleOpenInitialEnvelope = useCallback(() => {
    if (stage !== 'initial_envelope' || isOpeningEnvelope) return
    setIsOpeningEnvelope(true)
    setTimeout(() => {
      setStage('initial_message')
      setIsOpeningEnvelope(false)
    }, 450)
  }, [stage, isOpeningEnvelope])

  // عند الضغط على زر "what we gonna do"
  const handleWhatWeGonnaDo = useCallback(() => {
    setCurrentActivityIndex(0)
    setStage('activity_envelope')
  }, [])

  // التعامل مع فتح ظرف الخطوة الحالية
  const handleOpenActivityEnvelope = useCallback(() => {
    if (stage !== 'activity_envelope' || isOpeningEnvelope) return
    setIsOpeningEnvelope(true)
    setTimeout(() => {
      setStage('activity_message')
      setIsOpeningEnvelope(false)
    }, 450)
  }, [stage, isOpeningEnvelope])

  // عند الضغط على زر "next" في صفحة الرسالة
  const handleNextActivity = useCallback(() => {
    if (currentActivityIndex < totalActivities - 1) {
      setCurrentActivityIndex((prev) => prev + 1)
      setStage('activity_envelope')
    }
  }, [currentActivityIndex, totalActivities])

  // إعادة البدء من الأول (زرار start over)
  const handleRestart = useCallback(() => {
    setCurrentActivityIndex(0)
    setStage('initial_envelope')
  }, [])

  if (!isMounted) {
    return null
  }

  const currentActivity = activities[currentActivityIndex] || {
    text: 'A special surprise for you!',
  }

  const isLastActivity = currentActivityIndex === totalActivities - 1

  return (
    <div className="gift-page pink-theme">
      {/* 🦢 خلفية البجعات المتحركة */}
      <SwanBackground />

      {/* ── 1. الظرف الأول ── */}
      {stage === 'initial_envelope' && (
        <div
          className={`screen envelope-screen visible ${isOpeningEnvelope ? 'exit' : 'fade-enter'}`}
          onClick={handleOpenInitialEnvelope}
        >
          <div className="envelope-content">
            <p className="handwritten text-xl top-title">hey jojo!</p>
            <div className="envelope-wrapper">
              <Image
                src={data.envelopeImage}
                alt="Envelope"
                width={290}
                height={210}
                className="envelope-img-unfiltered"
                priority
              />
            </div>
            <p className="handwritten text-xl bottom-title">you've got a surprise</p>
            <p className="click-hint">(tap to open 💌)</p>
          </div>
        </div>
      )}

      {/* ── 2. الرسالة الأولى (فقط تظهر في مرحلتها لمنع أي تداخل مع الرسائل التالية) ── */}
      {stage === 'initial_message' && (
        <div className="screen message-screen visible fade-enter">
          <div className="message-card-wrapper">
            <div className="message-card">
              <div className="message-card-inner">
                <div className="message-frame-box">
                  <p className="handwritten message-paragraph" dir="auto">
                    {formatText(data.initialMessageText || data.birthdayText)}
                  </p>
                </div>

                <div className="action-button-wrapper">
                  <button
                    id="what-we-gonna-do-btn"
                    className="pink-pill-btn handwritten"
                    onClick={handleWhatWeGonnaDo}
                  >
                    what we gonna do ✨
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. أظرف الأنشطة (يتكرر 6 مرات) ── */}
      {stage === 'activity_envelope' && (
        <div
          key={`envelope-${currentActivityIndex}`}
          className={`screen envelope-screen visible ${isOpeningEnvelope ? 'exit' : 'fade-enter'}`}
          onClick={handleOpenActivityEnvelope}
        >
          <div className="envelope-content">
            <span className="step-counter-badge">
              {currentActivityIndex + 1} / {totalActivities}
            </span>
            <p className="handwritten text-xl top-title">For {data.receiverName}</p>
            <div className="envelope-wrapper">
              <Image
                src={data.envelopeImage}
                alt={`Envelope ${currentActivityIndex + 1}`}
                width={290}
                height={210}
                className="envelope-img-unfiltered"
                priority
              />
            </div>
            <p className="handwritten text-xl bottom-title">tap to reveal</p>
            <p className="click-hint">(click the envelope 💌)</p>
          </div>
        </div>
      )}

      {/* ── 4. رسائل الأنشطة (في آخر رسالة يظهر زرار start over بدلاً من next) ── */}
      {stage === 'activity_message' && (
        <div key={`message-${currentActivityIndex}`} className="screen message-screen visible fade-enter">
          <div className="message-card-wrapper">
            <div className="message-card">
              <div className="message-card-inner">
                <div className="message-frame-box">
                  <p className="handwritten message-paragraph" dir="auto">
                    {formatText(currentActivity.text)}
                  </p>
                </div>

                <div className="action-button-wrapper">
                  {isLastActivity ? (
                    <button
                      id="start-over-btn"
                      className="pink-pill-btn handwritten restart-btn"
                      onClick={handleRestart}
                    >
                      start over ↺
                    </button>
                  ) : (
                    <button
                      id="next-activity-btn"
                      className="pink-pill-btn handwritten"
                      onClick={handleNextActivity}
                    >
                      next →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}