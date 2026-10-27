import { useMemo, useState, useRef } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { KakaoStatusBar, lineProps } from '../../common/kakaoCommon.tsx'
import {
    TITLE, YEAR, FIRST_MONTH, LAST_MONTH,
    FRIEND_AVATAR_URL, MY_AVATAR_URL, FRIEND_NAME, MY_NAME,
    getSlotsOfDay, hasUploadOnDay, TIME_SLOTS,
    type SingleLog,
} from '../../data/setlogdata.ts'
import '../../css/setlog/setlogCss.css'

const availableDays = [...new Set(TIME_SLOTS.map(({ month, day }) => `${month}-${day}`))]
    .map((date) => {
        const [month, day] = date.split('-').map(Number)
        return { month, day }
    })
    .sort((a, b) => a.month - b.month || a.day - b.day)

const getChronologicalSlots = (month: number, day: number) =>
    getSlotsOfDay(month, day).sort((a, b) => {
        const [aHours, aMinutes] = a.time.split(':').map(Number)
        const [bHours, bMinutes] = b.time.split(':').map(Number)
        return aHours * 60 + aMinutes - (bHours * 60 + bMinutes)
    })

/* ===================== 아이콘 ===================== */
const Smile = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 18 18">
        <circle cx="9" cy="9" r="9" fill="#f08a5d" />
        <ellipse cx="6.4" cy="7.4" rx="1" ry="1.3" fill="#2a1408" />
        <ellipse cx="11.6" cy="7.4" rx="1" ry="1.3" fill="#2a1408" />
        <path d="M5.6 10.6q3.4 3.2 6.8 0" fill="none" stroke="#2a1408" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
)

/* 프로필 사진 링크를 사용하는 아바타 컴포넌트 */
const Avatar = ({ tone }: { tone: 'friend' | 'me' }) => {
    const src = tone === 'friend' ? FRIEND_AVATAR_URL : MY_AVATAR_URL
    return (
        <img 
            src={src} 
            alt={tone} 
            className="sl-avatar" 
            style={{ borderRadius: '50%', objectFit: 'cover' }} 
        />
    )
}

const IconBack = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2.4">
        <polyline points="15 4 7 12 15 20" />
    </svg>
)
const IconShare = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <path d="M12 15V3M7.5 7.5L12 3l4.5 4.5" />
        <path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8" />
    </svg>
)
const IconChevronRight = () => (
    <svg viewBox="0 0 9 15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1.5 1.5 7.5 7.5 1.5 13.5" />
    </svg>
)
const IconCalendar = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="3.5" />
        <path d="M3 9.5h18" strokeWidth="3" />
        {[0, 1, 2].map((r) => [0, 1, 2, 3, 4].map((c) => (
            <circle key={`${r}-${c}`} cx={6.8 + c * 2.6} cy={13 + r * 2.6} r="0.7" fill="currentColor" stroke="none" />
        )))}
    </svg>
)
const IconChat = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <path d="M12 4C6.8 4 2.8 7.2 2.8 11.2c0 2.1 1.1 4 2.9 5.3l-.9 3.3c-.1.4.3.7.70.5l3.9-2.2c.8.2 1.7.3 2.6.3 5.2 0 9.2-3.2 9.2-7.2S17.2 4 12 4z" />
    </svg>
)
const IconReact = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <circle cx="12" cy="12" r="9.5" />
        <circle cx="9" cy="10.5" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="15" cy="10.5" r="0.8" fill="currentColor" stroke="none" />
        <path d="M8.8 14.8q3.2 2 6.4 0" />
    </svg>
)
const IconReply = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <path d="M9 14L4 9l5-5" />
        <path d="M4 9h10a6 6 0 0 1 6 6v3" />
    </svg>
)
const IconHeart = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <path d="M12 20.5C5 15.5 2.8 12.2 2.8 8.8 2.8 6 4.9 4 7.4 4c1.9 0 3.6 1 4.6 2.8C13 5 14.7 4 16.6 4c2.5 0 4.6 2 4.6 4.8 0 3.4-2.2 6.7-9.2 11.7z" />
    </svg>
)
const IconDots = () => (
    <svg viewBox="0 0 28 28" fill="currentColor">
        <circle cx="5" cy="14" r="2.3" />
        <circle cx="14" cy="14" r="2.3" />
        <circle cx="23" cy="14" r="2.3" />
    </svg>
)
const IconSmallRight = () => (
    <svg viewBox="0 0 7 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 1 6 6 1 11" />
    </svg>
)
const IconNavLeft = () => (
    <svg viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="10 2 2 10 10 18" />
    </svg>
)
const IconNavRight = () => (
    <svg viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2 2 10 10 2 18" />
    </svg>
)

/* 2초 제한 비디오 컴포넌트 */
const VideoCardMedia = ({ src }: { src?: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    const handleTimeUpdate = () => {
        if (videoRef.current && videoRef.current.currentTime >= 2.0) {
            videoRef.current.currentTime = 0
        }
    }

    if (!src) return null

    return (
        <video
            ref={videoRef}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
    )
}

/* ===================== 셋로그 페이지 ===================== */
export const SetlogMain = () => {
    const navigate = useNavigate()

    /* 선택된 날짜 ({ m, d } 또는 초기 null) */
    const [sel, setSel] = useState<{ m: number; d: number } | null>(null)
    /* 선택된 날짜 내 시간대 인덱스 (0부터 시작) */
    const [timeIndex, setTimeIndex] = useState<number>(0)
    const [open, setOpen] = useState(false)
    const [calMonth, setCalMonth] = useState(10)

    /* 선택된 날짜에 해당되는 시간대 목록만 필터링 */
    const currentDaySlots = useMemo(() => {
        if (!sel) return []
        return getChronologicalSlots(sel.m, sel.d)
    }, [sel])

    const currentSlot = currentDaySlots[timeIndex] || null

    const openCalendar = () => {
        setOpen(true)
    }

    /* 이전/다음 시간대(도트)로 이동 */
    const shiftSlot = (dir: number) => {
        if (!sel || currentDaySlots.length === 0) return

        const nextIdx = timeIndex + dir
        if (nextIdx >= 0 && nextIdx < currentDaySlots.length) {
            setTimeIndex(nextIdx)
            return
        }

        const currentDay = sel.m * 32 + sel.d
        const adjacentDay = dir > 0
            ? availableDays.find(({ month, day }) => month * 32 + day > currentDay)
            : [...availableDays].reverse().find(({ month, day }) => month * 32 + day < currentDay)

        if (!adjacentDay) return

        const adjacentSlots = getChronologicalSlots(adjacentDay.month, adjacentDay.day)
        setSel({ m: adjacentDay.month, d: adjacentDay.day })
        setTimeIndex(dir > 0 ? 0 : adjacentSlots.length - 1)
    }

    /* 달력 날짜 클릭 시: 날짜 지정 및 무조건 첫 번째 도트(index 0)부터 보여줌 */
    const pickCalendarDay = (m: number, d: number) => {
        if (getSlotsOfDay(m, d).length > 0) {
            setSel({ m, d })
            setTimeIndex(0) // 무조건 첫 번째 도트부터!
        } else {
            setSel(null)
            setTimeIndex(0)
        }
        setOpen(false)
    }

    /* 달력 주 단위 셀 생성 */
    const rows = useMemo(() => {
        const first = new Date(YEAR, calMonth - 1, 1).getDay()
        const days = new Date(YEAR, calMonth, 0).getDate()
        const cells: (number | null)[] = [
            ...Array.from({ length: first }, () => null),
            ...Array.from({ length: days }, (_, i) => i + 1),
        ]
        while (cells.length % 7 !== 0) cells.push(null)
        return Array.from({ length: cells.length / 7 }, (_, r) => cells.slice(r * 7, r * 7 + 7))
    }, [calMonth])

    const renderCard = (
        log: SingleLog | undefined, 
        name: string, 
        isMine: boolean, 
        meComment?: string, 
        friendComment?: string
    ): ReactNode => {
        if (!log) {
            return (
                <div className="sl-card sl-card-empty">
                    <div className="sl-user">
                        <Avatar tone={isMine ? 'me' : 'friend'} />
                        <span>{name}</span>
                    </div>
                </div>
            )
        }
        return (
            <div className="sl-card" style={{ background: log.bg }}>
                <VideoCardMedia src={log.videoUrl} />
                <div className="sl-user">
                    <Avatar tone={isMine ? 'me' : 'friend'} />
                    <span>{name}</span>
                </div>
                <div className="sl-center">
                    <span className="sl-time">{log.time}</span>
                    <span className="sl-caption">{log.caption}</span>
                </div>

                {isMine ? (
                    <>
                        {/* 내 카드에는 친구가 단 댓글(meComment) 표시 */}
                        {meComment && (
                            <div className="sl-comment">
                                <Avatar tone="friend" />
                                <span className="sl-bubble">{meComment}</span>
                            </div>
                        )}
                        <button className="sl-more"><IconDots /></button>
                    </>
                ) : (
                    <>
                        {/* 친구 카드에는 내가 단 댓글(friendComment) 표시 */}
                        {friendComment && (
                            <div className="sl-comment">
                                <Avatar tone="me" />
                                <span className="sl-bubble">{friendComment}</span>
                            </div>
                        )}
                        <div className="sl-side">
                            <button><IconReact /></button>
                            <button><IconReply /></button>
                            <button><IconHeart /></button>
                        </div>
                    </>
                )}
            </div>
        )
    }

    return (
        <div className="kk-wrapper sl-wrapper">
            <div className="sl-frame">
                {/* 상단 버튼 영역 */}
                <div className="sl-top">
                    <button className="sl-back sl-glass" onClick={() => navigate(-1)}><IconBack /></button>
                    <button className="sl-share"><IconShare /></button>
                    <button className="sl-title">
                        <span>{TITLE}</span>
                        <IconChevronRight />
                    </button>
                    <div className="sl-tools sl-glass">
                        <button onClick={openCalendar}><IconCalendar /></button>
                        <button><IconChat /></button>
                    </div>
                </div>

                {/* 시간 단위 도트 (해당 날짜에 등록된 타임슬롯들을 표시) */}
                <div className="sl-dots">
                    {!sel || currentDaySlots.length === 0 ? (
                        /* 처음 진입 시 또는 미업로드 날짜: 회색 도트 1개만 표시 */
                        <button className="sl-dot none on" aria-label="기본 도트" />
                    ) : (
                        currentDaySlots.map((slot, idx) => {
                            const isSelected = idx === timeIndex
                            const both = !!(slot.friendLog?.videoUrl && slot.myLog?.videoUrl)

                            if (both) {
                                return (
                                    <button
                                        key={idx}
                                        className={`sl-dot smile ${isSelected ? 'on' : ''}`}
                                        onClick={() => setTimeIndex(idx)}
                                    >
                                        <Smile className="sl-smile" />
                                    </button>
                                )
                            }
                            return (
                                <button
                                    key={idx}
                                    className={`sl-dot none faint ${isSelected ? 'on' : ''}`}
                                    onClick={() => setTimeIndex(idx)}
                                />
                            )
                        })
                    )}
                </div>

                {/* 게시물 카드 영역 */}
                <div className="sl-cards">
                    {currentSlot ? (
                        <>
                            {renderCard(currentSlot.friendLog, FRIEND_NAME, false, currentSlot.meComment, currentSlot.friendComment)}
                            {renderCard(currentSlot.myLog, MY_NAME, true, currentSlot.meComment, currentSlot.friendComment)}
                        </>
                    ) : (
                        <>
                    <div className="sl-card" style={{ background: '#e4e4e4' }} aria-hidden="true">
                        <div className="sl-user">
                        <Avatar tone={'friend'} />
                        <span>{FRIEND_NAME}</span>
                    </div>
                    <div className="sl-center">
                        <span className="sl-time">16:00</span>
                    </div>

                    </div>
                        <div className="sl-card" style={{ background: '#e4e4e4' }} aria-hidden="true">
                            <div className="sl-user">
                            <Avatar tone={'me'} />
                            <span>{MY_NAME}</span>
                        </div>
                        <div className="sl-center">
                           <span className="sl-time">16:00</span>
                        </div>
                      </div>
                        </>
                    )}
                </div>

                {/* 전체 화면 터치/클릭을 통한 이전/다음 시간대 이동 */}
                <button className="sl-nav sl-nav-prev" onClick={() => shiftSlot(-1)} aria-label="이전 시간" />
                <button className="sl-nav sl-nav-next" onClick={() => shiftSlot(1)} aria-label="다음 시간" />

                {/* 달력 팝업 */}
                <div className={`sl-dim ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
                <div className={`sl-sheet ${open ? 'show' : ''}`}>
                    <div className="sl-grabber" />
                    <div className="sl-cal-head">
                        <span className="sl-cal-month">
                            {YEAR}년 {calMonth}월
                            <IconSmallRight />
                        </span>
                        <div className="sl-cal-nav">
                            <button disabled={calMonth <= FIRST_MONTH} onClick={() => setCalMonth(calMonth - 1)}><IconNavLeft /></button>
                            <button disabled={calMonth >= LAST_MONTH} onClick={() => setCalMonth(calMonth + 1)}><IconNavRight /></button>
                        </div>
                    </div>
                    <div className="sl-cal-weekdays">
                        {['일', '월', '화', '수', '목', '금', '토'].map((w) => <span key={w}>{w}</span>)}
                    </div>
                    {rows.map((row, ri) => {
                        const rowHasSmile = row.some((d) => d !== null && hasUploadOnDay(calMonth, d))
                        const isLast = ri === rows.length - 1
                        return (
                            <div key={ri} className={`sl-cal-row ${rowHasSmile ? 'has' : 'plain'} ${isLast ? 'last' : ''}`}>
                                {row.map((d, i) => {
                                    if (d === null) return <div key={i} />
                                    const hasSmile = hasUploadOnDay(calMonth, d)
                                    return (
                                        <button
                                            key={i}
                                            className={`sl-cal-cell ${hasSmile ? '' : 'empty'}`}
                                            onClick={() => pickCalendarDay(calMonth, d)}
                                        >
                                            <span className="sl-cal-num">{d}</span>
                                            {hasSmile && <Smile className="sl-cal-smile" />}
                                        </button>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* 카카오 공통 상태바 */}
            <KakaoStatusBar time="4:23" battery={74} />
        </div>
    )
}

export default SetlogMain